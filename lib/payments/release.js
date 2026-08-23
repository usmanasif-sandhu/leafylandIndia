import { prisma } from '@/lib/prisma'
import {
    isRazorpayXConfigured,
    ensureFundAccount,
    createXPayout,
    cancelXPayout,
    getBankDetails,
} from '@/lib/razorpayx'
import {
    notifyUsers,
    notifyAllAdmins,
    sendVendorEmail,
    rupees,
    payoutEmailHtml,
} from '@/lib/payments/notify'

function fail(message, status, extra = {}) {
    throw Object.assign(new Error(message), { status, ...extra })
}

/**
 * Release ALL currently-eligible DUE earnings for a store as one payout.
 * RAZORPAYX mode: gateway call first, then CAS claim; gateway payout cancelled if claim loses race.
 * MANUAL mode: reference/UTR required; everything settles immediately.
 */
export async function releaseStorePayout({ storeId, commissionPaiseOverride = null, reference = null }) {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
        include: { user: { select: { id: true, email: true } } },
    })
    if (!store) fail('Store not found', 404)

    const now = new Date()
    const due = await prisma.earning.findMany({
        where: { storeId, status: 'DUE', eligibleAt: { lte: now } },
        orderBy: { createdAt: 'asc' },
    })
    if (!due.length) fail('No eligible earnings to release for this store', 400)
    if (!getBankDetails(store)) fail('Vendor bank details are missing', 400, { code: 'BANK_DETAILS_MISSING' })

    const grossPaise = due.reduce((s, e) => s + e.grossPaise, 0)
    let commissionPaise = due.reduce((s, e) => s + e.commissionPaise, 0)
    let overridden = false
    if (commissionPaiseOverride != null) {
        if (!Number.isInteger(commissionPaiseOverride) || commissionPaiseOverride < 0 || commissionPaiseOverride > grossPaise) {
            fail('Commission override must be an integer between 0 and gross amount (in paise)', 400)
        }
        commissionPaise = commissionPaiseOverride
        overridden = true
    }
    const netPaise = grossPaise - commissionPaise
    if (netPaise < 100) fail('Net payout must be at least ₹1', 400)

    const method = isRazorpayXConfigured() ? 'RAZORPAYX' : 'MANUAL'
    const cleanRef = reference ? String(reference).trim() : null
    if (method === 'MANUAL' && (!cleanRef || cleanRef.length < 3)) {
        fail('A bank reference / UTR is required to record a manual transfer', 400)
    }

    let xPayout = null
    if (method === 'RAZORPAYX') {
        const { fundAccountId } = await ensureFundAccount(store)
        // Gateway call BEFORE claiming so a gateway failure persists nothing.
        xPayout = await createXPayout({ fundAccountId, amountPaise: netPaise, payoutDbId: `store_${storeId}` })
    }

    try {
        const payout = await prisma.$transaction(async (tx) => {
            const claimed = await tx.earning.updateMany({
                where: { id: { in: due.map((e) => e.id) }, status: 'DUE' },
                data: { status: method === 'MANUAL' ? 'PAID' : 'PROCESSING' },
            })
            if (claimed.count !== due.length) fail('Some earnings were just released elsewhere. Refresh and retry.', 409)

            return tx.payout.create({
                data: {
                    storeId,
                    status: method === 'MANUAL' ? 'PROCESSED' : 'PROCESSING',
                    grossPaise,
                    commissionPaise,
                    commissionOverride: overridden,
                    netPaise,
                    method,
                    razorpayPayoutId: xPayout?.id || null,
                    reference: cleanRef || xPayout?.id || null,
                    processedAt: method === 'MANUAL' ? new Date() : null,
                    earnings: { connect: due.map((e) => ({ id: e.id })) },
                },
                include: { earnings: true },
            })
        })

        const refLine = payout.reference ? ` (ref ${payout.reference})` : ''
        await notifyUsers([store.userId], {
            type: method === 'MANUAL' ? 'PAYOUT_PAID' : 'PAYOUT_RELEASED',
            title: method === 'MANUAL' ? 'Payout transferred' : 'Payout initiated',
            body:
                method === 'MANUAL'
                    ? `${rupees(netPaise)} has been transferred to your bank account${refLine}.`
                    : `${rupees(netPaise)} transfer to your bank account has been initiated${refLine}.`,
            link: '/store/payouts',
        })
        await sendVendorEmail(
            store,
            method === 'MANUAL' ? `Payout transferred: ${rupees(netPaise)}` : `Payout initiated: ${rupees(netPaise)}`,
            payoutEmailHtml({
                heading:
                    method === 'MANUAL'
                        ? `₹${rupees(netPaise).slice(1)} transferred to your bank account`
                        : `Transfer of ${rupees(netPaise)} to your bank account has been initiated`,
                lines: [
                    `Orders covered: ${due.length}`,
                    `Gross: ${rupees(grossPaise)}`,
                    `Commission deducted: ${rupees(commissionPaise)}${overridden ? ' (adjusted by LeafyLand)' : ''}`,
                    `Net paid: <strong>${rupees(netPaise)}</strong>`,
                    `Reference: ${payout.reference || '-'}`,
                ],
            }),
        )
        return payout
    } catch (e) {
        if (xPayout?.id) await cancelXPayout(xPayout.id)
        throw e
    }
}

/** Webhook: payout.processed */
export async function markPayoutProcessed(xPayoutId, entity = {}) {
    const payout = await prisma.payout.findUnique({
        where: { razorpayPayoutId: xPayoutId },
        include: { store: { include: { user: { select: { id: true, email: true } } } } },
    })
    if (!payout || payout.status === 'PROCESSED') return { changed: false }

    const updated = await prisma.$transaction(async (tx) => {
        const r = await tx.payout.updateMany({
            where: { id: payout.id, status: 'PROCESSING' },
            data: {
                status: 'PROCESSED',
                processedAt: entity.processed_at ? new Date(entity.processed_at * 1000) : new Date(),
                failureReason: null,
                reference: entity.utr || payout.reference,
            },
        })
        if (r.count === 0) return false
        await tx.earning.updateMany({
            where: { payoutId: payout.id, status: 'PROCESSING' },
            data: { status: 'PAID' },
        })
        return true
    })
    if (!updated) return { changed: false }

    await notifyUsers([payout.store.userId], {
        type: 'PAYOUT_PAID',
        title: 'Payout credited',
        body: `${rupees(payout.netPaise)} has been credited to your bank account (ref ${xPayoutId}).`,
        link: '/store/payouts',
    })
    await sendVendorEmail(
        payout.store,
        `Payout credited: ${rupees(payout.netPaise)}`,
        payoutEmailHtml({
            heading: `${rupees(payout.netPaise)} is now in your bank account`,
            lines: [`Payout id: ${xPayoutId}`, `UTR: ${entity.utr || '-'}`],
        }),
    )
    return { changed: true }
}

/** Webhook: payout.failed / reversed / cancelled */
export async function markPayoutFailed(xPayoutId, reason) {
    const payout = await prisma.payout.findUnique({
        where: { razorpayPayoutId: xPayoutId },
        include: { store: true },
    })
    if (!payout || payout.status !== 'PROCESSING') return { changed: false }

    const updated = await prisma.$transaction(async (tx) => {
        const r = await tx.payout.updateMany({
            where: { id: payout.id, status: 'PROCESSING' },
            data: { status: 'FAILED', failureReason: reason || 'Gateway reported failure' },
        })
        if (r.count === 0) return false
        // Earnings return to the due pool and join the next successful release.
        await tx.earning.updateMany({
            where: { payoutId: payout.id, status: 'PROCESSING' },
            data: { status: 'DUE' },
        })
        return true
    })
    if (!updated) return { changed: false }

    await notifyAllAdmins({
        type: 'PAYOUT_FAILED',
        title: 'Payout failed',
        body: `Payout ${xPayoutId} to ${payout.store.name} failed: ${reason || 'unknown reason'}. Earnings returned to due.`,
        link: '/admin/payouts',
    })
    return { changed: true }
}

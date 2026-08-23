import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError } from '@/lib/api'
import { getBankDetails, isRazorpayXConfigured } from '@/lib/razorpayx'
import { notifyAllAdmins } from '@/lib/payments/notify'

function serializePayout(p) {
    return {
        id: p.id,
        storeName: p.store?.name,
        status: p.status,
        grossPaise: p.grossPaise,
        commissionPaise: p.commissionPaise,
        commissionOverride: p.commissionOverride,
        netPaise: p.netPaise,
        method: p.method,
        reference: p.reference,
        failureReason: p.failureReason,
        processedAt: p.processedAt,
        createdAt: p.createdAt,
    }
}

export async function GET() {
    try {
        await requireAdmin()
        const now = new Date()

        // Lazy due-notification pass — runs once per earning (notifiedAt stamp).
        const newlyDue = await prisma.earning.findMany({
            where: { status: 'DUE', eligibleAt: { lte: now }, notifiedAt: null },
            include: { store: { select: { name: true } } },
        })
        if (newlyDue.length) {
            await notifyAllAdmins({
                type: 'PAYOUT_DUE',
                title: 'Vendor payouts due',
                body: `${newlyDue.length} order earning${newlyDue.length === 1 ? ' is' : 's are'} now due for release.`,
                link: '/admin/payouts',
            })
            await prisma.earning.updateMany({
                where: { id: { in: newlyDue.map((e) => e.id) } },
                data: { notifiedAt: new Date() },
            })
        }

        const [dueRows, payouts] = await Promise.all([
            prisma.earning.findMany({
                where: { status: 'DUE' },
                include: { store: { select: { id: true, name: true, email: true, settings: true } } },
            }),
            prisma.payout.findMany({
                orderBy: { createdAt: 'desc' },
                take: 100,
                include: { store: { select: { name: true } } },
            }),
        ])

        const netOf = (e) => Math.max(0, e.grossPaise - e.commissionPaise)
        const dueNowRows = dueRows.filter((e) => e.eligibleAt <= now)
        const upcomingRows = dueRows.filter((e) => e.eligibleAt > now)
        const sumNet = (rows) => rows.reduce((s, e) => s + netOf(e), 0)

        const processingPaise = payouts
            .filter((p) => p.status === 'PROCESSING')
            .reduce((s, p) => s + p.netPaise, 0)
        const paidPaise = payouts.filter((p) => p.status === 'PROCESSED').reduce((s, p) => s + p.netPaise, 0)

        const byStore = new Map()
        for (const e of dueNowRows) {
            const row =
                byStore.get(e.storeId) ||
                {
                    storeId: e.storeId,
                    storeName: e.store.name,
                    count: 0,
                    grossPaise: 0,
                    commissionPaise: 0,
                    netPaise: 0,
                    bankDetailsComplete: Boolean(getBankDetails(e.store)),
                }
            row.count += 1
            row.grossPaise += e.grossPaise
            row.commissionPaise += e.commissionPaise
            row.netPaise += netOf(e)
            byStore.set(e.storeId, row)
        }

        return json({
            summary: {
                dueNowPaise: sumNet(dueNowRows),
                upcomingPaise: sumNet(upcomingRows),
                processingPaise,
                paidPaise,
            },
            dueByStore: [...byStore.values()].sort((a, b) => b.netPaise - a.netPaise),
            history: payouts.map(serializePayout),
            gatewayMode: isRazorpayXConfigured() ? 'RAZORPAYX' : 'MANUAL',
        })
    } catch (e) {
        return handleApiError(e)
    }
}

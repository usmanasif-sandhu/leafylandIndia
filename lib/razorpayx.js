import 'server-only'
import { prisma } from '@/lib/prisma'

const X_API_BASE = 'https://api.razorpay.com/v1'
const IMPS_MAX_PAISE = 50000000 // ₹5,00,000

export function isRazorpayXConfigured() {
    return (
        process.env.RAZORPAYX_ENABLED === 'true' &&
        Boolean(process.env.RAZORPAY_KEY_ID?.trim()) &&
        Boolean(process.env.RAZORPAY_KEY_SECRET?.trim()) &&
        Boolean(process.env.RAZORPAYX_ACCOUNT_NUMBER?.trim())
    )
}

function authHeaders() {
    const token = Buffer.from(
        `${process.env.RAZORPAY_KEY_ID.trim()}:${process.env.RAZORPAY_KEY_SECRET.trim()}`,
    ).toString('base64')
    return { Authorization: `Basic ${token}`, 'Content-Type': 'application/json' }
}

async function xFetch(path, options = {}) {
    const res = await fetch(`${X_API_BASE}${path}`, {
        ...options,
        headers: { ...authHeaders(), ...(options.headers || {}) },
    })
    let body = null
    try {
        body = await res.json()
    } catch {}
    if (!res.ok) {
        const err = new Error(body?.error?.description || `RazorpayX request failed (${res.status})`)
        err.status = 502
        err.detail = body
        throw err
    }
    return body
}

export function pickXPayoutMode(amountPaise) {
    return amountPaise <= IMPS_MAX_PAISE ? 'IMPS' : 'NEFT'
}

/** Structured bank details from Store.settings JSON. Returns null when incomplete. */
export function getBankDetails(store) {
    const s = store.settings && typeof store.settings === 'object' ? store.settings : {}
    const bankAccount = String(s.bankAccount || '').trim()
    const ifscCode = String(s.ifscCode || '').trim()
    const accountName = String(s.accountName || '').trim() || store.name
    if (!bankAccount || !ifscCode) return null
    return { bankAccount, ifscCode, accountName }
}

/**
 * Lazily create a RazorpayX contact + bank fund account for a store.
 * Ids cached in store.settings (server-written keys, invisible to vendor whitelist).
 */
export async function ensureFundAccount(store) {
    const details = getBankDetails(store)
    if (!details) {
        const err = new Error('Vendor bank details are missing')
        err.status = 400
        err.code = 'BANK_DETAILS_MISSING'
        throw err
    }

    const settings = store.settings && typeof store.settings === 'object' ? store.settings : {}
    if (settings.razorpayFundAccountId && settings.razorpayContactId) {
        return { contactId: settings.razorpayContactId, fundAccountId: settings.razorpayFundAccountId }
    }

    const contact = await xFetch('/contacts', {
        method: 'POST',
        body: JSON.stringify({ name: details.accountName, type: 'vendor', notes: { store_id: store.id } }),
    })

    const fundAccount = await xFetch('/fund_accounts', {
        method: 'POST',
        body: JSON.stringify({
            contact_id: contact.id,
            account_type: 'bank_account',
            bank_account: {
                name: details.accountName,
                ifsc_code: details.ifscCode,
                account_number: details.bankAccount,
            },
        }),
    })

    await prisma.store.update({
        where: { id: store.id },
        data: { settings: { ...settings, razorpayContactId: contact.id, razorpayFundAccountId: fundAccount.id } },
    })
    return { contactId: contact.id, fundAccountId: fundAccount.id }
}

export async function createXPayout({ fundAccountId, amountPaise, payoutDbId }) {
    return xFetch('/payouts', {
        method: 'POST',
        body: JSON.stringify({
            account_number: process.env.RAZORPAYX_ACCOUNT_NUMBER.trim(),
            fund_account_id: fundAccountId,
            amount: amountPaise,
            currency: 'INR',
            mode: pickXPayoutMode(amountPaise),
            purpose: 'payout',
            narration: 'LeafyLand', // max 10 chars
            reference_id: payoutDbId,
        }),
    })
}

/** Best-effort cancel while queued; returns false when already processed. */
export async function cancelXPayout(xPayoutId) {
    try {
        await xFetch(`/payouts/${xPayoutId}/cancel`, { method: 'POST' })
        return true
    } catch {
        return false
    }
}

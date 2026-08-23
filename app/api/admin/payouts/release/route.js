import { json, error, requireAdmin, handleApiError } from '@/lib/api'
import { releaseStorePayout } from '@/lib/payments/release'

export async function POST(req) {
    try {
        await requireAdmin()
        const body = await req.json().catch(() => ({}))
        const { storeId, commissionPaise, reference } = body || {}
        if (!storeId || typeof storeId !== 'string') return error('storeId is required', 400)

        let override = null
        if (commissionPaise != null) {
            override = Number(commissionPaise)
            if (!Number.isInteger(override)) return error('commissionPaise must be an integer number of paise', 400)
        }

        const payout = await releaseStorePayout({
            storeId,
            commissionPaiseOverride: override,
            reference: reference != null ? String(reference) : null,
        })
        return json({ payout })
    } catch (e) {
        return handleApiError(e)
    }
}

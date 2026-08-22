import { error, json, getSessionUser } from '@/lib/api'
import { resolveCoupon } from '@/lib/coupons'

export async function POST(req) {
    try {
        const body = await req.json()
        const user = await getSessionUser()
        const storeIds = Array.isArray(body.storeIds) ? body.storeIds.filter(Boolean) : []

        const result = await resolveCoupon(body.code, {
            userId: user?.id,
            storeIds,
        })

        if (!result.ok) return error(result.error, result.status || 400)

        return json({
            valid: true,
            coupon: result.coupon,
        })
    } catch (e) {
        console.error(e)
        return error('Could not validate coupon', 500)
    }
}

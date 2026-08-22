import { prisma } from '@/lib/prisma'

/**
 * Shared coupon rules for validate API and order create.
 * Returns { ok: true, coupon } or { ok: false, error, status }.
 */
export async function resolveCoupon(code, { userId, storeIds = [] } = {}) {
    if (!code || typeof code !== 'string') {
        return { ok: false, error: 'Coupon code is required', status: 400 }
    }

    const coupon = await prisma.coupon.findUnique({
        where: { code: code.trim().toUpperCase() },
    })
    if (!coupon) return { ok: false, error: 'Coupon not found', status: 404 }
    if (coupon.expiresAt < new Date()) return { ok: false, error: 'Coupon has expired', status: 400 }
    if (!coupon.isPublic) return { ok: false, error: 'Coupon is not available', status: 400 }

    if (coupon.storeId) {
        if (!storeIds.length || !storeIds.includes(coupon.storeId)) {
            return { ok: false, error: 'Coupon is not valid for items in your cart', status: 400 }
        }
    }

    if (coupon.forNewUser && userId) {
        const prior = await prisma.order.count({ where: { userId } })
        if (prior > 0) {
            return { ok: false, error: 'Coupon is only for first-time buyers', status: 400 }
        }
    }

    if (coupon.forMember && userId) {
        const completed = await prisma.order.count({
            where: { userId, status: { in: ['DELIVERED', 'SHIPPED'] } },
        })
        if (completed < 1) {
            return { ok: false, error: 'Coupon is only for returning members', status: 400 }
        }
    }

    return {
        ok: true,
        coupon: {
            code: coupon.code,
            description: coupon.description,
            discount: coupon.discount,
            storeId: coupon.storeId,
            forNewUser: coupon.forNewUser,
            forMember: coupon.forMember,
        },
        raw: coupon,
    }
}

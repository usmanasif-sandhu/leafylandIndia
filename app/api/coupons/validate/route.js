import { prisma } from '@/lib/prisma'
import { error, json } from '@/lib/api'

export async function POST(req) {
    const { code } = await req.json()
    if (!code) return error('Coupon code is required')
    const coupon = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } })
    if (!coupon) return error('Coupon not found', 404)
    if (coupon.expiresAt < new Date()) return error('Coupon has expired')
    if (!coupon.isPublic) return error('Coupon is not public')
    return json(coupon)
}

import { prisma } from '@/lib/prisma'
import { error, json, requireStore, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const coupons = await prisma.coupon.findMany({
            where: { storeId: store.id },
            orderBy: { createdAt: 'desc' },
        })
        return json(coupons)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const { store } = await requireStore()
        const body = await req.json()
        const code = body.code?.toUpperCase()?.trim()
        if (!code || body.discount == null) return error('code and discount are required')

        const coupon = await prisma.coupon.create({
            data: {
                code,
                description: body.description || '',
                discount: Number(body.discount),
                forNewUser: Boolean(body.forNewUser),
                forMember: Boolean(body.forMember),
                isPublic: body.isPublic !== false,
                expiresAt: new Date(body.expiresAt || Date.now() + 365 * 24 * 60 * 60 * 1000),
                storeId: store.id,
            },
        })
        return json(coupon, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function DELETE(req) {
    try {
        const { store } = await requireStore()
        const { code } = await req.json()
        if (!code) return error('code is required')
        await prisma.coupon.deleteMany({ where: { code, storeId: store.id } })
        return json({ ok: true })
    } catch (e) {
        return handleApiError(e)
    }
}

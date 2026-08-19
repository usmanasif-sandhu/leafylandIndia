import { prisma } from '@/lib/prisma'
import { error, json, requireAdmin, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } })
        return json(coupons)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        await requireAdmin()
        const body = await req.json()
        const code = body.code?.toUpperCase()?.trim()
        if (!code) return error('code is required')
        const coupon = await prisma.coupon.create({
            data: {
                code,
                description: body.description || '',
                discount: Number(body.discount || 0),
                forNewUser: Boolean(body.forNewUser),
                forMember: Boolean(body.forMember),
                isPublic: body.isPublic !== false,
                expiresAt: new Date(body.expiresAt || Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        })
        return json(coupon, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function DELETE(req) {
    try {
        await requireAdmin()
        const { code } = await req.json()
        await prisma.coupon.delete({ where: { code } })
        return json({ ok: true })
    } catch (e) {
        return handleApiError(e)
    }
}

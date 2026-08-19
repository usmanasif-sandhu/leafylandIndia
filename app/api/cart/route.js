import { prisma } from '@/lib/prisma'
import { json, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { cart: true } })
        return json(dbUser.cart || {})
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PUT(req) {
    try {
        const user = await requireUser()
        const cart = await req.json()
        await prisma.user.update({
            where: { id: user.id },
            data: { cart: cart && typeof cart === 'object' ? cart : {} },
        })
        return json({ ok: true })
    } catch (e) {
        return handleApiError(e)
    }
}

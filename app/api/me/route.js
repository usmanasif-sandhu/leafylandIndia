import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const sessionUser = await requireUser()
        const user = await prisma.user.findUnique({
            where: { id: sessionUser.id },
            include: { store: true },
        })
        return json({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            cart: user.cart,
            store: user.store,
        })
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req) {
    try {
        const sessionUser = await requireUser()
        const body = await req.json()
        const data = {}
        if (typeof body.name === 'string') data.name = body.name
        if (typeof body.image === 'string') data.image = body.image
        if (body.cart && typeof body.cart === 'object') data.cart = body.cart
        const user = await prisma.user.update({
            where: { id: sessionUser.id },
            data,
            include: { store: true },
        })
        return json(user)
    } catch (e) {
        return handleApiError(e)
    }
}

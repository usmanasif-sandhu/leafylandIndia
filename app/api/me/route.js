import { prisma } from '@/lib/prisma'
import { json, requireUser, handleApiError } from '@/lib/api'

const publicUserSelect = {
    id: true,
    name: true,
    email: true,
    image: true,
    role: true,
    cart: true,
    store: true,
}

export async function GET() {
    try {
        const sessionUser = await requireUser()
        const user = await prisma.user.findUnique({
            where: { id: sessionUser.id },
            select: publicUserSelect,
        })
        return json(user)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req) {
    try {
        const sessionUser = await requireUser()
        const body = await req.json()
        const data = {}
        if (typeof body.name === 'string') data.name = body.name.trim()
        if (typeof body.image === 'string') data.image = body.image
        if (body.cart && typeof body.cart === 'object') data.cart = body.cart

        const user = await prisma.user.update({
            where: { id: sessionUser.id },
            data,
            select: publicUserSelect,
        })
        return json(user)
    } catch (e) {
        return handleApiError(e)
    }
}

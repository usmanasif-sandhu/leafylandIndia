import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const items = await prisma.wishlistItem.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        })
        return json(items)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { itemId, itemType } = await req.json()
        if (!itemId || !itemType) return error('itemId and itemType are required')
        const item = await prisma.wishlistItem.upsert({
            where: { userId_itemId_itemType: { userId: user.id, itemId, itemType } },
            update: {},
            create: { userId: user.id, itemId, itemType },
        })
        return json(item, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function DELETE(req) {
    try {
        const user = await requireUser()
        const { itemId, itemType } = await req.json()
        await prisma.wishlistItem.deleteMany({
            where: { userId: user.id, itemId, itemType },
        })
        return json({ ok: true })
    } catch (e) {
        return handleApiError(e)
    }
}

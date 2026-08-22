import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'
import {
    assertWishlistTarget,
    normalizeWishlistItemType,
    resolveWishlistItems,
} from '@/lib/wishlist'

export async function GET(req) {
    try {
        const user = await requireUser()
        const { searchParams } = new URL(req.url)
        const raw = searchParams.get('raw') === '1'

        const rows = await prisma.wishlistItem.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        })

        if (raw) return json(rows)

        const items = await resolveWishlistItems(prisma, rows)
        return json({ items, total: items.length })
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { itemId, itemType } = await req.json()
        if (!itemId || !itemType) return error('itemId and itemType are required')

        const normalized = normalizeWishlistItemType(itemType)
        if (!normalized) return error('itemType must be PRODUCT, PROPERTY, or SERVICE')

        const check = await assertWishlistTarget(prisma, itemId, normalized)
        if (!check.ok) return error(check.error, 404)

        const item = await prisma.wishlistItem.upsert({
            where: { userId_itemId_itemType: { userId: user.id, itemId, itemType: normalized } },
            update: {},
            create: { userId: user.id, itemId, itemType: normalized },
        })

        const [resolved] = await resolveWishlistItems(prisma, [item])
        return json(resolved || item, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function DELETE(req) {
    try {
        const user = await requireUser()
        const { itemId, itemType } = await req.json()
        const normalized = normalizeWishlistItemType(itemType)
        if (!itemId || !normalized) return error('itemId and itemType are required')

        await prisma.wishlistItem.deleteMany({
            where: { userId: user.id, itemId, itemType: normalized },
        })
        return json({ ok: true })
    } catch (e) {
        return handleApiError(e)
    }
}

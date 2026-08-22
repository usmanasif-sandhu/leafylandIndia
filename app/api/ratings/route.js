import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError, getSessionUser } from '@/lib/api'
import { parseRatingScore, serializeReview } from '@/lib/reviews'

export async function GET(req) {
    try {
        const user = await getSessionUser()
        if (!user) return json([])

        const { searchParams } = new URL(req.url)
        const productId = searchParams.get('productId')

        const rows = await prisma.rating.findMany({
            where: {
                ...(productId ? { productId } : { userId: user.id }),
            },
            include: { user: { select: { name: true, image: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(
            rows.map((r) => ({
                ...serializeReview(r),
                productId: r.productId,
                orderId: r.orderId,
            })),
        )
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { productId, orderId, rating, review } = await req.json()
        if (!productId || !orderId || rating == null) {
            return error('productId, orderId and rating are required')
        }
        const parsed = parseRatingScore(rating)
        if (!parsed.ok) return error(parsed.error)

        const order = await prisma.order.findFirst({
            where: { id: orderId, userId: user.id, status: 'DELIVERED' },
            include: { orderItems: { select: { productId: true } } },
        })
        if (!order) return error('You can only rate delivered orders you own', 403)
        if (!order.orderItems.some((i) => i.productId === productId)) {
            return error('Product was not part of this order', 400)
        }

        const existing = await prisma.rating.findUnique({
            where: {
                userId_productId_orderId: { userId: user.id, productId, orderId },
            },
        })
        if (existing) return error('You already rated this product for this order', 409)

        const created = await prisma.rating.create({
            data: {
                rating: parsed.score,
                review: typeof review === 'string' ? review.trim() : '',
                userId: user.id,
                productId,
                orderId,
            },
            include: { user: { select: { name: true, image: true } } },
        })
        return json(serializeReview(created), 201)
    } catch (e) {
        return handleApiError(e)
    }
}

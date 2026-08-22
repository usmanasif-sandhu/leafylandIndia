import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function POST(req) {
    try {
        const user = await requireUser()
        const { productId, orderId, rating, review } = await req.json()
        if (!productId || !orderId || rating == null) {
            return error('productId, orderId and rating are required')
        }
        const score = Number(rating)
        if (!Number.isInteger(score) || score < 1 || score > 5) {
            return error('Rating must be an integer from 1 to 5')
        }

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
                rating: score,
                review: typeof review === 'string' ? review.trim() : '',
                userId: user.id,
                productId,
                orderId,
            },
        })
        return json(created, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

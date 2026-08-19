import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function POST(req) {
    try {
        const user = await requireUser()
        const { productId, orderId, rating, review } = await req.json()
        if (!productId || !orderId || !rating) return error('productId, orderId and rating are required')
        const created = await prisma.rating.create({
            data: {
                rating: Number(rating),
                review: review || '',
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

import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError } from '@/lib/api'
import { serializeReview } from '@/lib/reviews'

export async function GET() {
    try {
        const { store } = await requireStore()
        const [productReviews, serviceReviews, propertyReviews] = await Promise.all([
            prisma.rating.findMany({
                where: { product: { storeId: store.id } },
                include: {
                    user: { select: { name: true, image: true } },
                    product: { select: { name: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.serviceRating.findMany({
                where: { service: { storeId: store.id } },
                include: {
                    user: { select: { name: true, image: true } },
                    service: { select: { name: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.propertyRating.findMany({
                where: { property: { storeId: store.id } },
                include: {
                    user: { select: { name: true, image: true } },
                    property: { select: { title: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
        ])

        const merged = [
            ...productReviews.map((r) => ({
                id: r.id,
                type: 'Product',
                customer: r.user?.name,
                avatar: r.user?.image,
                item: r.product?.name,
                rating: r.rating,
                review: r.review,
                date: r.createdAt,
            })),
            ...serviceReviews.map((r) => ({
                id: r.id,
                type: 'Service',
                customer: r.user?.name,
                avatar: r.user?.image,
                item: r.service?.name,
                rating: r.rating,
                review: r.review,
                date: r.createdAt,
            })),
            ...propertyReviews.map((r) => ({
                id: r.id,
                type: 'Property',
                customer: r.user?.name,
                avatar: r.user?.image,
                item: r.property?.title,
                rating: r.rating,
                review: r.review,
                date: r.createdAt,
            })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date))

        return json(merged)
    } catch (e) {
        return handleApiError(e)
    }
}

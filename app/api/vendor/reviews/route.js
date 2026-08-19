import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const reviews = await prisma.rating.findMany({
            where: { product: { storeId: store.id } },
            include: { user: { select: { name: true, image: true } }, product: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(reviews.map((r) => ({
            id: r.id,
            customer: r.user?.name,
            avatar: r.user?.image,
            product: r.product?.name,
            rating: r.rating,
            review: r.review,
            date: r.createdAt,
        })))
    } catch (e) {
        return handleApiError(e)
    }
}

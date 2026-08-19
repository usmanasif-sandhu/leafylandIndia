import { prisma } from '@/lib/prisma'
import { error, json, serializeProduct } from '@/lib/api'

export async function GET(_req, { params }) {
    const { username } = await params
    const store = await prisma.store.findUnique({
        where: { username },
        include: {
            Product: {
                where: { inStock: true },
                include: { rating: true, orderItems: { select: { quantity: true } }, store: true },
            },
        },
    })
    if (!store || store.status !== 'approved' || !store.isActive) {
        return error('Store not found', 404)
    }
    return json({
        ...store,
        products: store.Product.map(serializeProduct),
    })
}

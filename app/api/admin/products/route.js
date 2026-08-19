import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError, serializeProduct } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const products = await prisma.product.findMany({
            include: { store: true, rating: true, orderItems: { select: { quantity: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(products.map(serializeProduct))
    } catch (e) {
        return handleApiError(e)
    }
}

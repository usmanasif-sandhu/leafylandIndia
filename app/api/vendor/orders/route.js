import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError, serializeOrder } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const orders = await prisma.order.findMany({
            where: { storeId: store.id },
            include: {
                user: true,
                address: true,
                orderItems: { include: { product: true } },
            },
            orderBy: { createdAt: 'desc' },
        })
        return json(orders.map(serializeOrder))
    } catch (e) {
        return handleApiError(e)
    }
}

import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError, serializeOrder } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const orders = await prisma.order.findMany({
            include: { user: true, store: true, orderItems: { include: { product: true } }, address: true },
            orderBy: { createdAt: 'desc' },
        })
        return json(orders.map(serializeOrder))
    } catch (e) {
        return handleApiError(e)
    }
}

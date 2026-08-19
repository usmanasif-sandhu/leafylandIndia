import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const orders = await prisma.order.findMany({
            where: { storeId: store.id },
            include: { user: true, address: true },
            orderBy: { createdAt: 'desc' },
        })

        const map = new Map()
        for (const o of orders) {
            const id = o.userId
            const current = map.get(id) || {
                id,
                name: o.user?.name,
                email: o.user?.email,
                phone: o.address?.phone,
                city: o.address?.city,
                totalOrders: 0,
                totalSpent: 0,
                lastOrder: o.createdAt,
                joined: o.user ? undefined : o.createdAt,
            }
            current.totalOrders += 1
            current.totalSpent += o.total
            if (o.createdAt > current.lastOrder) current.lastOrder = o.createdAt
            map.set(id, current)
        }
        return json([...map.values()])
    } catch (e) {
        return handleApiError(e)
    }
}

import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const [userCount, storeCount, orders, pendingStores] = await Promise.all([
            prisma.user.count(),
            prisma.store.count({ where: { isActive: true, status: 'approved' } }),
            prisma.order.findMany({
                include: { user: true, store: true, orderItems: { include: { product: true } } },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.store.findMany({
                where: { status: 'pending' },
                include: { user: { select: { name: true, email: true } } },
                orderBy: { createdAt: 'desc' },
                take: 10,
            }),
        ])

        const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const weekMap = Object.fromEntries(days.map((d) => [d, { name: d, orders: 0 }]))
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        for (const o of orders.filter((o) => o.createdAt >= weekAgo)) {
            weekMap[days[o.createdAt.getDay()]].orders += 1
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const revenueChartData = months.map((name) => ({ name, revenue: 0 }))
        for (const o of orders) revenueChartData[o.createdAt.getMonth()].revenue += o.total

        return json({
            stats: {
                users: userCount,
                revenue: totalRevenue,
                orders: orders.length,
                stores: storeCount,
            },
            ordersChartData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((name) => weekMap[name]),
            revenueChartData,
            pendingStores,
            recentOrders: orders.slice(0, 8),
        })
    } catch (e) {
        return handleApiError(e)
    }
}

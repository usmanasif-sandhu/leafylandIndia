import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()

        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const [userCount, storeCount, orderCount, revenueAgg, orderDates, recentOrders, pendingStores] =
            await Promise.all([
                prisma.user.count(),
                prisma.store.count({ where: { isActive: true, status: 'approved' } }),
                prisma.order.count(),
                prisma.order.aggregate({ _sum: { total: true } }),
                prisma.order.findMany({
                    select: { total: true, createdAt: true },
                }),
                prisma.order.findMany({
                    select: {
                        id: true,
                        total: true,
                        status: true,
                        isPaid: true,
                        paymentMethod: true,
                        createdAt: true,
                        user: { select: { name: true, email: true } },
                        store: { select: { name: true } },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 8,
                }),
                prisma.store.findMany({
                    where: { status: 'pending' },
                    include: { user: { select: { name: true, email: true } } },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                }),
            ])

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const weekMap = Object.fromEntries(days.map((d) => [d, { name: d, orders: 0 }]))
        for (const o of orderDates) {
            if (o.createdAt >= weekAgo) {
                weekMap[days[o.createdAt.getDay()]].orders += 1
            }
        }

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const revenueChartData = months.map((name) => ({ name, revenue: 0 }))
        for (const o of orderDates) {
            revenueChartData[o.createdAt.getMonth()].revenue += o.total
        }

        return json({
            stats: {
                users: userCount,
                revenue: revenueAgg._sum.total || 0,
                orders: orderCount,
                stores: storeCount,
            },
            ordersChartData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((name) => weekMap[name]),
            revenueChartData,
            pendingStores,
            recentOrders,
        })
    } catch (e) {
        return handleApiError(e)
    }
}

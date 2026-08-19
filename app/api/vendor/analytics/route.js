import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError, serializeProduct } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const [orders, productRows, customerOrders] = await Promise.all([
            prisma.order.findMany({
                where: { storeId: store.id },
                include: { orderItems: true, user: true },
            }),
            prisma.product.findMany({
                where: { storeId: store.id },
                include: { rating: true, orderItems: { select: { quantity: true, price: true } }, store: true },
            }),
            prisma.order.findMany({
                where: { storeId: store.id },
                select: { userId: true },
            }),
        ])

        const products = productRows.map((p) => {
            const mapped = serializeProduct(p)
            mapped.revenue = (p.orderItems || []).reduce((s, i) => s + i.quantity * i.price, 0)
            mapped.rating = (p.rating || []).map((r) => r.rating)
            return mapped
        })

        const customerMap = new Map()
        for (const o of orders) {
            const cur = customerMap.get(o.userId) || { id: o.userId, totalOrders: 0, totalSpent: 0 }
            cur.totalOrders += 1
            cur.totalSpent += o.total
            customerMap.set(o.userId, cur)
        }

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const monthlyRevenueData = months.map((name) => ({ name, revenue: 0 }))
        for (const o of orders) monthlyRevenueData[o.createdAt.getMonth()].revenue += o.total

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const weekMap = Object.fromEntries(days.map((d) => [d, { name: d, revenue: 0, orders: 0 }]))
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        for (const o of orders.filter((o) => o.createdAt >= weekAgo)) {
            const name = days[o.createdAt.getDay()]
            weekMap[name].revenue += o.total
            weekMap[name].orders += 1
        }

        const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
        const customers = [...customerMap.values()]

        return json({
            totalRevenue,
            totalOrders: orders.length,
            totalProducts: products.length,
            totalCustomers: new Set(customerOrders.map((o) => o.userId)).size,
            avgOrderValue: orders.length ? Math.round(totalRevenue / orders.length) : 0,
            monthlyRevenueData,
            revenueChartData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((name) => weekMap[name]),
            products,
            customers,
        })
    } catch (e) {
        return handleApiError(e)
    }
}

import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError, serializeOrder } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()

        const [orders, products, reviews] = await Promise.all([
            prisma.order.findMany({
                where: { storeId: store.id },
                include: { user: true, orderItems: { include: { product: true } } },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.findMany({
                where: { storeId: store.id },
                include: { orderItems: { select: { quantity: true, price: true } }, rating: true },
            }),
            prisma.rating.findMany({
                where: { product: { storeId: store.id } },
            }),
        ])

        const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
        const avgRating = reviews.length
            ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
            : 0

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const weekMap = Object.fromEntries(days.map((d) => [d, { name: d, revenue: 0, orders: 0 }]))
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        for (const o of orders.filter((o) => o.createdAt >= weekAgo)) {
            const name = days[o.createdAt.getDay()]
            weekMap[name].revenue += o.total
            weekMap[name].orders += 1
        }

        const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
            star,
            count: reviews.filter((r) => r.rating === star).length,
        }))

        const inventoryAlerts = products
            .filter((p) => p.stock <= 5)
            .map((p) => ({
                id: p.id,
                name: p.name,
                stock: p.stock,
                category: p.category,
                status: p.stock <= 2 ? 'critical' : 'low',
            }))

        const topProducts = products
            .map((p) => ({
                ...p,
                totalSales: p.orderItems.reduce((s, i) => s + i.quantity, 0),
                revenue: p.orderItems.reduce((s, i) => s + i.quantity * i.price, 0),
            }))
            .sort((a, b) => b.totalSales - a.totalSales)
            .slice(0, 5)

        return json({
            store,
            stats: {
                totalRevenue,
                totalOrders: orders.length,
                totalProducts: products.length,
                avgRating: Number(avgRating.toFixed(1)),
                reviewCount: reviews.length,
            },
            recentOrders: orders.slice(0, 5).map(serializeOrder),
            topProducts,
            ratingDist,
            inventoryAlerts,
            recentReviews: reviews.slice(0, 5).map((r) => ({
                id: r.id,
                customer: r.userId,
                product: r.productId,
                rating: r.rating,
                review: r.review,
                date: r.createdAt,
            })),
            revenueChartData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((name) => weekMap[name] || { name, revenue: 0, orders: 0 }),
        })
    } catch (e) {
        return handleApiError(e)
    }
}

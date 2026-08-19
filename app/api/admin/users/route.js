import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const users = await prisma.user.findMany({
            include: { store: true, _count: { select: { buyerOrders: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
          role: u.role === 'ADMIN' ? 'admin' : u.store ? 'seller' : 'buyer',
            storeStatus: u.store?.status || null,
            storeActive: u.store?.isActive || false,
            joinDate: u.createdAt,
            totalOrders: u._count.buyerOrders,
            storeName: u.store?.name,
            image: u.image,
        })))
    } catch (e) {
        return handleApiError(e)
    }
}

import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const bookings = await prisma.booking.findMany({
            where: { storeId: store.id },
            include: {
                user: { select: { name: true, email: true } },
                service: { select: { id: true, name: true, category: true } },
            },
            orderBy: { createdAt: 'desc' },
        })
        return json(bookings)
    } catch (e) {
        return handleApiError(e)
    }
}

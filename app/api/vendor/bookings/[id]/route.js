import { prisma } from '@/lib/prisma'
import { error, json, requireStore, handleApiError } from '@/lib/api'

const allowed = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export async function PATCH(req, { params }) {
    try {
        const { store } = await requireStore()
        const { id } = await params
        const { status } = await req.json()
        if (!allowed.includes(status)) return error('Invalid status')

        const existing = await prisma.booking.findFirst({ where: { id, storeId: store.id } })
        if (!existing) return error('Booking not found', 404)

        const booking = await prisma.booking.update({
            where: { id },
            data: { status },
            include: {
                user: { select: { name: true, email: true } },
                service: { select: { id: true, name: true, category: true } },
            },
        })
        return json(booking)
    } catch (e) {
        return handleApiError(e)
    }
}

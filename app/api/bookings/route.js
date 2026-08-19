import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            include: { service: true, store: true },
            orderBy: { createdAt: 'desc' },
        })
        return json(bookings)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { serviceId, date, time, location, requirements } = await req.json()
        const service = await prisma.service.findUnique({ where: { id: serviceId } })
        if (!service || service.status !== 'approved') return error('Service not available', 404)

        const booking = await prisma.booking.create({
            data: {
                serviceId,
                userId: user.id,
                storeId: service.storeId,
                price: service.startingPrice,
                date: new Date(date),
                time: time || '10:00',
                location: location || service.location,
                requirements: requirements || null,
            },
            include: { service: true },
        })
        return json(booking, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

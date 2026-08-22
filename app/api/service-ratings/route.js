import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function POST(req) {
    try {
        const user = await requireUser()
        const { serviceId, bookingId, rating, review } = await req.json()
        if (!serviceId || !bookingId || rating == null) {
            return error('serviceId, bookingId and rating are required')
        }
        const score = Number(rating)
        if (!Number.isInteger(score) || score < 1 || score > 5) {
            return error('Rating must be an integer from 1 to 5')
        }

        const booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                userId: user.id,
                serviceId,
                status: 'COMPLETED',
            },
        })
        if (!booking) return error('You can only rate completed bookings you own', 403)

        const existing = await prisma.serviceRating.findUnique({
            where: {
                userId_serviceId_bookingId: { userId: user.id, serviceId, bookingId },
            },
        })
        if (existing) return error('Already rated', 409)

        const created = await prisma.serviceRating.create({
            data: {
                rating: score,
                review: typeof review === 'string' ? review.trim() : '',
                userId: user.id,
                serviceId,
                bookingId,
            },
        })
        return json(created, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError, getSessionUser } from '@/lib/api'
import { parseRatingScore, serializeReview } from '@/lib/reviews'

export async function GET(req) {
    try {
        const user = await getSessionUser()
        if (!user) return json([])

        const { searchParams } = new URL(req.url)
        const serviceId = searchParams.get('serviceId')

        const rows = await prisma.serviceRating.findMany({
            where: {
                ...(serviceId ? { serviceId } : { userId: user.id }),
            },
            include: { user: { select: { name: true, image: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(
            rows.map((r) => ({
                ...serializeReview(r),
                serviceId: r.serviceId,
                bookingId: r.bookingId,
            })),
        )
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { serviceId, bookingId, rating, review } = await req.json()
        if (!serviceId || !bookingId || rating == null) {
            return error('serviceId, bookingId and rating are required')
        }
        const parsed = parseRatingScore(rating)
        if (!parsed.ok) return error(parsed.error)

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
                rating: parsed.score,
                review: typeof review === 'string' ? review.trim() : '',
                userId: user.id,
                serviceId,
                bookingId,
            },
            include: { user: { select: { name: true, image: true } } },
        })
        return json(
            {
                ...serializeReview(created),
                serviceId: created.serviceId,
                bookingId: created.bookingId,
            },
            201,
        )
    } catch (e) {
        return handleApiError(e)
    }
}

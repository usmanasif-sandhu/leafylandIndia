import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError, getSessionUser } from '@/lib/api'
import { parseRatingScore, serializeReview } from '@/lib/reviews'

export async function GET(req) {
    try {
        const user = await getSessionUser()
        if (!user) return json([])

        const { searchParams } = new URL(req.url)
        const propertyId = searchParams.get('propertyId')

        const rows = await prisma.propertyRating.findMany({
            where: {
                ...(propertyId ? { propertyId } : { userId: user.id }),
            },
            include: { user: { select: { name: true, image: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(
            rows.map((r) => ({
                ...serializeReview(r),
                propertyId: r.propertyId,
                visitId: r.visitId,
            })),
        )
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { propertyId, visitId, rating, review } = await req.json()
        if (!propertyId || !visitId || rating == null) {
            return error('propertyId, visitId and rating are required')
        }
        const parsed = parseRatingScore(rating)
        if (!parsed.ok) return error(parsed.error)

        const visit = await prisma.visit.findFirst({
            where: {
                id: visitId,
                userId: user.id,
                propertyId,
                status: 'COMPLETED',
            },
        })
        if (!visit) return error('You can only rate completed visits you attended', 403)

        const existing = await prisma.propertyRating.findUnique({
            where: {
                userId_propertyId_visitId: { userId: user.id, propertyId, visitId },
            },
        })
        if (existing) return error('Already rated', 409)

        const created = await prisma.propertyRating.create({
            data: {
                rating: parsed.score,
                review: typeof review === 'string' ? review.trim() : '',
                userId: user.id,
                propertyId,
                visitId,
            },
            include: { user: { select: { name: true, image: true } } },
        })
        return json(
            {
                ...serializeReview(created),
                propertyId: created.propertyId,
                visitId: created.visitId,
            },
            201,
        )
    } catch (e) {
        return handleApiError(e)
    }
}

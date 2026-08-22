import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const visits = await prisma.visit.findMany({
            where: { userId: user.id },
            include: { property: { select: { id: true, title: true, location: true, images: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(visits)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { propertyId, name, phone, date, time, notes } = await req.json()
        const property = await prisma.property.findUnique({ where: { id: propertyId } })
        if (!property || property.status !== 'approved') return error('Property not available', 404)

        const visit = await prisma.visit.create({
            data: {
                propertyId,
                userId: user.id,
                name: name || user.name || 'Guest',
                phone: phone || '',
                date: new Date(date),
                time: time || '11:00',
                notes: notes || null,
            },
        })
        return json(visit, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

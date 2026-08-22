import { prisma } from '@/lib/prisma'
import { error, json, requireStore, handleApiError } from '@/lib/api'

const allowed = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export async function PATCH(req, { params }) {
    try {
        const { store } = await requireStore()
        const { id } = await params
        const { status } = await req.json()
        if (!allowed.includes(status)) return error('Invalid status')

        const existing = await prisma.visit.findFirst({
            where: { id, property: { storeId: store.id } },
        })
        if (!existing) return error('Visit not found', 404)

        const visit = await prisma.visit.update({
            where: { id },
            data: { status },
            include: {
                user: { select: { name: true, email: true } },
                property: { select: { id: true, title: true, location: true } },
            },
        })
        return json(visit)
    } catch (e) {
        return handleApiError(e)
    }
}

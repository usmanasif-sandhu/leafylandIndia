import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const visits = await prisma.visit.findMany({
            where: { property: { storeId: store.id } },
            include: {
                user: { select: { name: true, email: true } },
                property: { select: { id: true, title: true, location: true } },
            },
            orderBy: { createdAt: 'desc' },
        })
        return json(visits)
    } catch (e) {
        return handleApiError(e)
    }
}

import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const properties = await prisma.property.findMany({
            include: { store: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(properties)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req) {
    try {
        await requireAdmin()
        const { id, status } = await req.json()
        const property = await prisma.property.update({ where: { id }, data: { status } })
        return json(property)
    } catch (e) {
        return handleApiError(e)
    }
}

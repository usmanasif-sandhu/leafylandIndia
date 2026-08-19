import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const services = await prisma.service.findMany({
            include: { store: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(services)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req) {
    try {
        await requireAdmin()
        const { id, status } = await req.json()
        const service = await prisma.service.update({ where: { id }, data: { status } })
        return json(service)
    } catch (e) {
        return handleApiError(e)
    }
}

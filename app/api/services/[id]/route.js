import { prisma } from '@/lib/prisma'
import { error, json } from '@/lib/api'

export async function GET(_req, { params }) {
    const { id } = await params
    const service = await prisma.service.findUnique({
        where: { id },
        include: {
            store: { select: { id: true, name: true, username: true, logo: true } },
            rating: { include: { user: { select: { name: true, image: true } } } },
        },
    })
    if (!service) return error('Service not found', 404)
    return json(service)
}

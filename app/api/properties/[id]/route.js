import { prisma } from '@/lib/prisma'
import { error, json } from '@/lib/api'

export async function GET(_req, { params }) {
    const { id } = await params
    const property = await prisma.property.findUnique({
        where: { id },
        include: { store: true },
    })
    if (!property) return error('Property not found', 404)
    return json(property)
}

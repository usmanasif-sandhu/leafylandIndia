import { prisma } from '@/lib/prisma'
import { json } from '@/lib/api'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('search') || ''
    const type = searchParams.get('type')

    const properties = await prisma.property.findMany({
        where: {
            status: 'approved',
            store: { status: 'approved', isActive: true },
            ...(type && type !== 'All' ? { propertyType: type } : {}),
            ...(q
                ? {
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                        { location: { contains: q, mode: 'insensitive' } },
                    ],
                }
                : {}),
        },
        include: { store: { select: { name: true, username: true, logo: true } } },
        orderBy: { createdAt: 'desc' },
    })

    return json(properties)
}

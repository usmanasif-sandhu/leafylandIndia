import { prisma } from '@/lib/prisma'
import { json } from '@/lib/api'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('search') || ''
    const category = searchParams.get('category')

    const services = await prisma.service.findMany({
        where: {
            status: 'approved',
            store: { status: 'approved', isActive: true },
            ...(category && category !== 'All' ? { category } : {}),
            ...(q
                ? {
                    OR: [
                        { name: { contains: q, mode: 'insensitive' } },
                        { category: { contains: q, mode: 'insensitive' } },
                    ],
                }
                : {}),
        },
        include: {
            store: { select: { name: true, username: true } },
            rating: true,
        },
        orderBy: { createdAt: 'desc' },
    })

    return json(services)
}

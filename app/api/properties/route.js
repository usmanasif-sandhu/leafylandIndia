import { prisma } from '@/lib/prisma'

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
        include: {
            store: { select: { name: true, username: true, logo: true } },
            rating: { select: { rating: true } },
        },
        orderBy: { createdAt: 'desc' },
    })

    return new Response(JSON.stringify(properties), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'private, max-age=30, stale-while-revalidate=60',
        },
    })
}

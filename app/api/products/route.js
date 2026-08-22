import { prisma } from '@/lib/prisma'
import { json, serializeProduct } from '@/lib/api'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const storeId = searchParams.get('storeId')
    const ids = (searchParams.get('ids') || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

    const products = await prisma.product.findMany({
        where: {
            inStock: true,
            ...(ids.length ? { id: { in: ids } } : {}),
            store: { status: 'approved', isActive: true },
            ...(storeId ? { storeId } : {}),
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
            // List views only need rating numbers — skip reviews/user/orderItems
            rating: { select: { rating: true } },
        },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })

    const body = products.map(serializeProduct)
    return new Response(JSON.stringify(body), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'private, max-age=30, stale-while-revalidate=60',
        },
    })
}

import { prisma } from '@/lib/prisma'
import { json, serializeProduct } from '@/lib/api'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('search') || ''
    const category = searchParams.get('category')
    const storeId = searchParams.get('storeId')

    const products = await prisma.product.findMany({
        where: {
            inStock: true,
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
            rating: true,
            orderItems: { select: { quantity: true } },
        },
        orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })

    return json(products.map(serializeProduct))
}

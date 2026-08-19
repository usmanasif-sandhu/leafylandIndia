import { prisma } from '@/lib/prisma'
import { error, json, requireStore, handleApiError, serializeProduct } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const products = await prisma.product.findMany({
            where: { storeId: store.id },
            include: { rating: true, orderItems: { select: { quantity: true, price: true } }, store: true },
            orderBy: { createdAt: 'desc' },
        })
        return json(products.map(serializeProduct))
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const { store } = await requireStore()
        const body = await req.json()
        const { name, description, mrp, price, category, images, stock } = body
        if (!name || !description || !category || mrp == null || price == null) {
            return error('Missing product fields')
        }
        if (!Array.isArray(images) || images.length === 0) {
            return error('Upload at least one product photo')
        }
        const product = await prisma.product.create({
            data: {
                name,
                description,
                mrp: Number(mrp),
                price: Number(price),
                category,
                images: Array.isArray(images) && images.length ? images : [],
                stock: Number(stock || 0),
                inStock: Number(stock || 0) > 0,
                storeId: store.id,
            },
            include: { store: true, rating: true },
        })
        return json(serializeProduct(product), 201)
    } catch (e) {
        return handleApiError(e)
    }
}

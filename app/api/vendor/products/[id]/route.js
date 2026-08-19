import { prisma } from '@/lib/prisma'
import { error, json, requireStore, handleApiError, serializeProduct } from '@/lib/api'

export async function PATCH(req, { params }) {
    try {
        const { store } = await requireStore()
        const { id } = await params
        const existing = await prisma.product.findFirst({ where: { id, storeId: store.id } })
        if (!existing) return error('Product not found', 404)

        const body = await req.json()
        const data = {}
        for (const key of ['name', 'description', 'category']) {
            if (typeof body[key] === 'string') data[key] = body[key]
        }
        if (body.mrp != null) data.mrp = Number(body.mrp)
        if (body.price != null) data.price = Number(body.price)
        if (body.stock != null) {
            data.stock = Number(body.stock)
            data.inStock = Number(body.stock) > 0
        }
        if (typeof body.inStock === 'boolean') data.inStock = body.inStock
        if (Array.isArray(body.images)) data.images = body.images

        const product = await prisma.product.update({
            where: { id },
            data,
            include: { store: true, rating: true, orderItems: { select: { quantity: true } } },
        })
        return json(serializeProduct(product))
    } catch (e) {
        return handleApiError(e)
    }
}

export async function DELETE(_req, { params }) {
    try {
        const { store } = await requireStore()
        const { id } = await params
        const existing = await prisma.product.findFirst({ where: { id, storeId: store.id } })
        if (!existing) return error('Product not found', 404)
        await prisma.product.delete({ where: { id } })
        return json({ ok: true })
    } catch (e) {
        return handleApiError(e)
    }
}

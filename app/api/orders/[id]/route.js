import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError, serializeOrder } from '@/lib/api'

export async function GET(_req, { params }) {
    try {
        const user = await requireUser()
        const { id } = await params
        const order = await prisma.order.findFirst({
            where: { id, userId: user.id },
            include: {
                store: true,
                address: true,
                orderItems: { include: { product: true } },
            },
        })
        if (!order) return error('Order not found', 404)
        return json(serializeOrder(order))
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req, { params }) {
    try {
        const user = await requireUser()
        const { id } = await params
        const { action } = await req.json()
        if (action !== 'cancel') return error('Unsupported action')

        const order = await prisma.order.findFirst({
            where: { id, userId: user.id },
            include: { orderItems: true },
        })
        if (!order) return error('Order not found', 404)
        if (!['ORDER_PLACED', 'PROCESSING'].includes(order.status)) {
            return error('This order can no longer be cancelled')
        }

        const updated = await prisma.$transaction(async (tx) => {
            const stockWasFulfilled =
                order.paymentMethod === 'COD' ||
                (order.checkoutBatchId &&
                    (await tx.checkoutBatch.findUnique({
                        where: { id: order.checkoutBatchId },
                        select: { stockFulfilled: true },
                    }))?.stockFulfilled)

            if (stockWasFulfilled) {
                for (const item of order.orderItems) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: {
                            stock: { increment: item.quantity },
                            inStock: true,
                        },
                    })
                }
            }
            return tx.order.update({
                where: { id },
                data: { status: 'CANCELLED' },
                include: {
                    store: true,
                    address: true,
                    orderItems: { include: { product: true } },
                    user: true,
                },
            })
        })

        return json(serializeOrder(updated))
    } catch (e) {
        return handleApiError(e)
    }
}

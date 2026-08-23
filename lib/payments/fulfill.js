import { createEarningsForBatch } from '@/lib/payments/earnings'
import { prisma } from '@/lib/prisma'
import { fetchRazorpayOrder, fetchRazorpayPayment } from '@/lib/razorpay'

/**
 * Idempotently mark checkout batch paid and fulfill stock (exactly once).
 * @param {import('@prisma/client').Prisma.TransactionClient} tx
 * @param {{ batchId: string, razorpayPaymentId?: string, expectedAmountPaise?: number }} opts
 */
export async function fulfillCheckoutBatch(tx, opts) {
    const batch = await tx.checkoutBatch.findUnique({
        where: { id: opts.batchId },
        include: {
            orders: { include: { orderItems: true } },
        },
    })
    if (!batch) {
        const err = new Error('Checkout not found')
        err.status = 404
        throw err
    }

    if (batch.paymentStatus === 'CAPTURED') {
        return { batch, alreadyProcessed: true }
    }

    if (batch.paymentStatus === 'FAILED') {
        const err = new Error('Payment failed for this checkout')
        err.status = 400
        throw err
    }

    if (opts.expectedAmountPaise != null && batch.totalPaise !== opts.expectedAmountPaise) {
        const err = new Error('Payment amount mismatch')
        err.status = 400
        throw err
    }

    if (opts.razorpayPaymentId) {
        const clash = await tx.checkoutBatch.findFirst({
            where: {
                razorpayPaymentId: opts.razorpayPaymentId,
                id: { not: batch.id },
            },
        })
        if (clash) {
            const err = new Error('Duplicate payment')
            err.status = 409
            throw err
        }
    }

    const capturedAt = new Date()

    const updateResult = await tx.checkoutBatch.updateMany({
        where: { id: batch.id, paymentStatus: 'PENDING' },
        data: {
            paymentStatus: 'CAPTURED',
            capturedAt,
            ...(opts.razorpayPaymentId ? { razorpayPaymentId: opts.razorpayPaymentId } : {}),
        },
    })

    if (updateResult.count === 0) {
        const again = await tx.checkoutBatch.findUnique({
            where: { id: batch.id },
            include: {
                orders: {
                    include: {
                        orderItems: { include: { product: true } },
                        store: true,
                        address: true,
                    },
                },
            },
        })
        if (again?.paymentStatus === 'CAPTURED') {
            return { batch: again, alreadyProcessed: true }
        }
        const err = new Error('Could not update payment status')
        err.status = 409
        throw err
    }

    const updatedBatch = await tx.checkoutBatch.findUnique({ where: { id: batch.id } })

    if (!batch.stockFulfilled) {
        for (const order of batch.orders) {
            for (const item of order.orderItems) {
                const updated = await tx.product.updateMany({
                    where: {
                        id: item.productId,
                        stock: { gte: item.quantity },
                        inStock: true,
                    },
                    data: { stock: { decrement: item.quantity } },
                })
                if (updated.count !== 1) {
                    const err = new Error('Item out of stock during payment fulfillment')
                    err.status = 409
                    throw err
                }
                const fresh = await tx.product.findUnique({
                    where: { id: item.productId },
                    select: { stock: true },
                })
                if (fresh && fresh.stock <= 0) {
                    await tx.product.update({
                        where: { id: item.productId },
                        data: { inStock: false, stock: 0 },
                    })
                }
            }
        }
        await tx.checkoutBatch.update({
            where: { id: batch.id },
            data: { stockFulfilled: true },
        })
    }

    await tx.order.updateMany({
        where: { checkoutBatchId: batch.id },
        data: { isPaid: true, paymentStatus: 'CAPTURED' },
    })

    await createEarningsForBatch(tx, batch, capturedAt)

    if (batch.isCouponUsed && batch.coupon && typeof batch.coupon === 'object' && batch.coupon.code) {
        await tx.coupon.update({
            where: { code: batch.coupon.code },
            data: { usageCount: { increment: 1 } },
        })
    }

    await tx.user.update({
        where: { id: batch.userId },
        data: { cart: {} },
    })

    const finalBatch = await tx.checkoutBatch.findUnique({
        where: { id: batch.id },
        include: {
            orders: {
                include: {
                    orderItems: { include: { product: true } },
                    store: true,
                    address: true,
                },
            },
        },
    })

    return { batch: finalBatch, alreadyProcessed: false }
}

/** Server-side reconciliation with Razorpay API. */
export async function assertRazorpayPaymentSuccess(razorpayOrderId, razorpayPaymentId, expectedPaise) {
    const [order, payment] = await Promise.all([
        fetchRazorpayOrder(razorpayOrderId),
        fetchRazorpayPayment(razorpayPaymentId),
    ])

    if (order.currency !== 'INR' || payment.currency !== 'INR') {
        throw Object.assign(new Error('Invalid currency'), { status: 400 })
    }
    if (Number(order.amount) !== expectedPaise) {
        throw Object.assign(new Error('Razorpay order amount mismatch'), { status: 400 })
    }
    if (Number(payment.amount) !== expectedPaise) {
        throw Object.assign(new Error('Razorpay payment amount mismatch'), { status: 400 })
    }
    if (payment.order_id !== razorpayOrderId) {
        throw Object.assign(new Error('Payment order mismatch'), { status: 400 })
    }
    if (!['captured', 'authorized'].includes(payment.status)) {
        throw Object.assign(new Error('Payment not successful'), { status: 400 })
    }

    return { order, payment }
}

export async function findBatchByRazorpayOrderId(razorpayOrderId) {
    return prisma.checkoutBatch.findUnique({
        where: { razorpayOrderId },
        include: {
            orders: {
                include: { orderItems: { include: { product: true } }, store: true, address: true },
            },
        },
    })
}

import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError, serializeOrder } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const orders = await prisma.order.findMany({
            where: { userId: user.id },
            include: {
                store: true,
                address: true,
                orderItems: { include: { product: true } },
            },
            orderBy: { createdAt: 'desc' },
        })
        return json(orders.map(serializeOrder))
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { addressId, paymentMethod = 'COD', couponCode } = await req.json()
        const paidMethods = ['STRIPE', 'BANK_TRANSFER', 'UPI', 'CARD', 'WALLET']
        const method = paidMethods.includes(paymentMethod) ? paymentMethod : 'COD'

        const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
        const cart = dbUser.cart && typeof dbUser.cart === 'object' ? dbUser.cart : {}
        const productIds = Object.keys(cart)
        if (!productIds.length) return error('Cart is empty')

        const address = await prisma.address.findFirst({
            where: { id: addressId, userId: user.id },
        })
        if (!address) return error('Address not found', 404)

        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            include: { store: true },
        })

        const byStore = new Map()
        for (const product of products) {
            const qty = Number(cart[product.id] || 0)
            if (qty < 1) continue
            if (!product.inStock) return error(`${product.name} is out of stock`)
            const list = byStore.get(product.storeId) || []
            list.push({ product, qty, price: product.price })
            byStore.set(product.storeId, list)
        }

        let coupon = null
        if (couponCode) {
            coupon = await prisma.coupon.findUnique({ where: { code: couponCode.toUpperCase() } })
            if (!coupon || coupon.expiresAt < new Date()) return error('Invalid or expired coupon')
        }

        const created = []
        await prisma.$transaction(async (tx) => {
            for (const [storeId, items] of byStore.entries()) {
                let total = items.reduce((s, i) => s + i.price * i.qty, 0)
                if (coupon) total = Math.max(0, total - (total * coupon.discount) / 100)

                const order = await tx.order.create({
                    data: {
                        total,
                        userId: user.id,
                        storeId,
                        addressId: address.id,
                        isPaid: method !== 'COD',
                        paymentMethod: method,
                        isCouponUsed: Boolean(coupon),
                        coupon: coupon ? { code: coupon.code, discount: coupon.discount } : {},
                        orderItems: {
                            create: items.map((i) => ({
                                productId: i.product.id,
                                quantity: i.qty,
                                price: i.price,
                            })),
                        },
                    },
                    include: { orderItems: { include: { product: true } }, store: true, address: true },
                })

                for (const item of items) {
                    await tx.product.update({
                        where: { id: item.product.id },
                        data: { stock: { decrement: item.qty } },
                    })
                }
                created.push(order)
            }

            if (coupon) {
                await tx.coupon.update({
                    where: { code: coupon.code },
                    data: { usageCount: { increment: 1 } },
                })
            }

            await tx.user.update({ where: { id: user.id }, data: { cart: {} } })
        })

        return json({ orders: created.map(serializeOrder) }, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

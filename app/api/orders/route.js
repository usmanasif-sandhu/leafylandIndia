import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError, serializeOrder } from '@/lib/api'
import { resolveCoupon } from '@/lib/coupons'

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
        const body = await req.json()
        const { addressId, paymentMethod = 'COD', couponCode, cartItems } = body
        if (paymentMethod && paymentMethod !== 'COD') {
            return error('Only Cash on Delivery is available until online payments are enabled')
        }
        const method = 'COD'

        const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
        let cart = dbUser.cart && typeof dbUser.cart === 'object' ? { ...dbUser.cart } : {}
        if (cartItems && typeof cartItems === 'object' && !Array.isArray(cartItems)) {
            cart = { ...cartItems }
            await prisma.user.update({ where: { id: user.id }, data: { cart } })
        }
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
            if (!product.inStock || product.stock < qty) {
                return error(`${product.name} does not have enough stock`)
            }
            const list = byStore.get(product.storeId) || []
            list.push({ product, qty, price: product.price })
            byStore.set(product.storeId, list)
        }
        if (!byStore.size) return error('Cart is empty')

        let coupon = null
        let couponRaw = null
        if (couponCode) {
            const result = await resolveCoupon(couponCode, {
                userId: user.id,
                storeIds: [...byStore.keys()],
            })
            if (!result.ok) return error(result.error, result.status || 400)
            coupon = result.coupon
            couponRaw = result.raw
        }

        const created = []
        let platformCouponUsed = false
        await prisma.$transaction(async (tx) => {
            for (const [storeId, items] of byStore.entries()) {
                let total = items.reduce((s, i) => s + i.price * i.qty, 0)
                let applyCoupon = false
                if (coupon) {
                    if (coupon.storeId) {
                        applyCoupon = coupon.storeId === storeId
                    } else if (!platformCouponUsed) {
                        applyCoupon = true
                        platformCouponUsed = true
                    }
                }
                if (applyCoupon) total = Math.max(0, total - (total * coupon.discount) / 100)

                const order = await tx.order.create({
                    data: {
                        total,
                        userId: user.id,
                        storeId,
                        addressId: address.id,
                        isPaid: false,
                        paymentMethod: method,
                        isCouponUsed: Boolean(applyCoupon),
                        coupon: applyCoupon ? { code: coupon.code, discount: coupon.discount } : {},
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
                    const updated = await tx.product.updateMany({
                        where: {
                            id: item.product.id,
                            stock: { gte: item.qty },
                            inStock: true,
                        },
                        data: {
                            stock: { decrement: item.qty },
                        },
                    })
                    if (updated.count !== 1) {
                        const err = new Error(`${item.product.name} is out of stock`)
                        err.status = 400
                        throw err
                    }
                    const fresh = await tx.product.findUnique({
                        where: { id: item.product.id },
                        select: { stock: true },
                    })
                    if (fresh && fresh.stock <= 0) {
                        await tx.product.update({
                            where: { id: item.product.id },
                            data: { inStock: false, stock: 0 },
                        })
                    }
                }
                created.push(order)
            }

            if (couponRaw) {
                await tx.coupon.update({
                    where: { code: couponRaw.code },
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

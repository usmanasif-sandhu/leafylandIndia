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
        const body = await req.json()
        const { paymentMethod = 'COD' } = body

        if (paymentMethod === 'COD') {
            return error('Cash on Delivery is not available yet. Please pay online with Razorpay.', 403)
        }

        return error('Use Razorpay checkout to place orders', 400)
    } catch (e) {
        return handleApiError(e)
    }
}

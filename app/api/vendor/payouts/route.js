import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const orders = await prisma.order.findMany({ where: { storeId: store.id } })
        const gross = orders.filter((o) => o.status === 'DELIVERED').reduce((s, o) => s + o.total, 0)
        const commission = (gross * (store.commissionRate || 10)) / 100
        const pending = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').reduce((s, o) => s + o.total, 0)

        return json({
            available: Math.max(0, gross - commission),
            pending,
            commissionRate: store.commissionRate,
            payouts: [
                {
                    id: 'available',
                    amount: Math.max(0, gross - commission),
                    status: 'Completed',
                    method: 'Bank Transfer',
                    date: new Date(),
                    reference: 'NET-DELIVERED',
                },
            ],
        })
    } catch (e) {
        return handleApiError(e)
    }
}

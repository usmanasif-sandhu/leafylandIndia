import { rupeesToPaise } from '@/lib/money'
import { computeCommissionPaise, eligibilityDate } from '@/lib/payouts'

/**
 * Create one immutable Earning per order in a captured batch.
 * Idempotent: upsert keyed by unique orderId.
 * @param {import('@prisma/client').Prisma.TransactionClient} tx
 */
export async function createEarningsForBatch(tx, batch, capturedAt) {
    const storeIds = [...new Set(batch.orders.map((o) => o.storeId))]
    const stores = await tx.store.findMany({
        where: { id: { in: storeIds } },
        select: { id: true, commissionRate: true },
    })
    const rateById = new Map(stores.map((s) => [s.id, s.commissionRate ?? 10]))
    const eligibleAt = eligibilityDate(capturedAt)

    for (const order of batch.orders) {
        const grossPaise = rupeesToPaise(order.total)
        const rate = rateById.get(order.storeId)
        await tx.earning.upsert({
            where: { orderId: order.id },
            update: {},
            create: {
                orderId: order.id,
                storeId: order.storeId,
                grossPaise,
                commissionRate: rate,
                commissionPaise: computeCommissionPaise(grossPaise, rate),
                eligibleAt,
            },
        })
    }
}

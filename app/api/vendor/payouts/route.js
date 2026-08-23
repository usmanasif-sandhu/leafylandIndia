import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError } from '@/lib/api'
import { getBankDetails } from '@/lib/razorpayx'

export async function GET() {
    try {
        const { store } = await requireStore()
        const now = new Date()

        const [earnings, payouts] = await Promise.all([
            prisma.earning.findMany({
                where: { storeId: store.id },
                orderBy: { createdAt: 'desc' },
                take: 200,
            }),
            prisma.payout.findMany({
                where: { storeId: store.id },
                orderBy: { createdAt: 'desc' },
                take: 100,
            }),
        ])

        const netOf = (e) => Math.max(0, e.grossPaise - e.commissionPaise)
        const dueRows = earnings.filter((e) => e.status === 'DUE')
        const dueNow = dueRows.filter((e) => e.eligibleAt <= now)
        const upcoming = dueRows.filter((e) => e.eligibleAt > now)

        const wallet = {
            dueNowPaise: dueNow.reduce((s, e) => s + netOf(e), 0),
            upcomingPaise: upcoming.reduce((s, e) => s + netOf(e), 0),
            processingPaise: earnings
                .filter((e) => e.status === 'PROCESSING')
                .reduce((s, e) => s + netOf(e), 0),
            lifetimePaidPaise: payouts
                .filter((p) => p.status === 'PROCESSED')
                .reduce((s, p) => s + p.netPaise, 0),
        }

        return json({
            wallet,
            commissionRate: store.commissionRate,
            bankDetailsComplete: Boolean(getBankDetails(store)),
            earnings: earnings.map((e) => ({
                id: e.id,
                orderId: e.orderId,
                grossPaise: e.grossPaise,
                commissionRate: e.commissionRate,
                commissionPaise: e.commissionPaise,
                netPaise: netOf(e),
                status: e.status,
                eligibleAt: e.eligibleAt,
                createdAt: e.createdAt,
            })),
            payouts: payouts.map((p) => ({
                id: p.id,
                status: p.status,
                grossPaise: p.grossPaise,
                commissionPaise: p.commissionPaise,
                netPaise: p.netPaise,
                method: p.method,
                reference: p.reference,
                failureReason: p.failureReason,
                processedAt: p.processedAt,
                createdAt: p.createdAt,
            })),
        })
    } catch (e) {
        return handleApiError(e)
    }
}

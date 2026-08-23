import { prisma } from '@/lib/prisma'
import { json, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const [items, unread] = await Promise.all([
            prisma.notification.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' },
                take: 50,
            }),
            prisma.notification.count({ where: { userId: user.id, readAt: null } }),
        ])
        return json({ items, unread })
    } catch (e) {
        return handleApiError(e)
    }
}

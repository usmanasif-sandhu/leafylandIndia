import { prisma } from '@/lib/prisma'
import { json, requireUser, handleApiError } from '@/lib/api'

export async function POST(req) {
    try {
        const user = await requireUser()
        const body = await req.json().catch(() => ({}))
        const ids = Array.isArray(body?.ids) ? body.ids.filter((i) => typeof i === 'string').slice(0, 50) : null

        await prisma.notification.updateMany({
            where: { userId: user.id, readAt: null, ...(ids ? { id: { in: ids } } : {}) },
            data: { readAt: new Date() },
        })
        return json({ ok: true })
    } catch (e) {
        return handleApiError(e)
    }
}

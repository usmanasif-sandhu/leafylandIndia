import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const messages = await prisma.message.findMany({
            where: { userId: user.id },
            include: { store: { select: { id: true, name: true, username: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(
            messages.map((m) => ({
                id: m.id,
                body: m.body,
                reply: m.reply,
                read: m.read,
                createdAt: m.createdAt,
                store: m.store,
            })),
        )
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { storeId, body } = await req.json()
        if (!storeId || !body?.trim()) return error('storeId and body are required')

        const store = await prisma.store.findFirst({
            where: { id: storeId, status: 'approved', isActive: true },
        })
        if (!store) return error('Store not available', 404)

        const message = await prisma.message.create({
            data: { storeId, userId: user.id, body: body.trim() },
        })
        return json(message, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

import { prisma } from '@/lib/prisma'
import { error, json, requireStore, requireUser, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        const { store } = await requireStore()
        const messages = await prisma.message.findMany({
            where: { storeId: store.id },
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(messages.map((m) => ({
            id: m.id,
            customer: m.user?.name,
            message: m.body,
            reply: m.reply,
            date: m.createdAt,
            read: m.read,
        })))
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const { storeId, body } = await req.json()
        if (!storeId || !body) return error('storeId and body are required')
        const store = await prisma.store.findFirst({
            where: { id: storeId, status: 'approved', isActive: true },
        })
        if (!store) return error('Store not available', 404)
        const message = await prisma.message.create({
            data: { storeId, userId: user.id, body: String(body).trim() },
        })
        return json(message, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req) {
    try {
        const { store } = await requireStore()
        const { id, reply, read } = await req.json()
        const existing = await prisma.message.findFirst({ where: { id, storeId: store.id } })
        if (!existing) return error('Message not found', 404)
        const message = await prisma.message.update({
            where: { id },
            data: {
                ...(typeof reply === 'string' ? { reply } : {}),
                ...(typeof read === 'boolean' ? { read } : {}),
            },
        })
        return json(message)
    } catch (e) {
        return handleApiError(e)
    }
}

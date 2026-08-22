import { prisma } from '@/lib/prisma'
import { json, requireAdmin, handleApiError, error } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const items = await prisma.contactInquiry.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
        })
        return json(items)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req) {
    try {
        await requireAdmin()
        const { id, status } = await req.json()
        if (!id || !['NEW', 'READ', 'CLOSED'].includes(status)) {
            return error('Invalid status')
        }
        const item = await prisma.contactInquiry.update({
            where: { id },
            data: { status },
        })
        return json(item)
    } catch (e) {
        return handleApiError(e)
    }
}

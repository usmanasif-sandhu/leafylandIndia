import { prisma } from '@/lib/prisma'
import { error, json, requireAdmin, handleApiError } from '@/lib/api'

export async function PATCH(req, { params }) {
    try {
        await requireAdmin()
        const { id } = await params
        const body = await req.json()
        const data = {}
        if (typeof body.isActive === 'boolean') data.isActive = body.isActive
        if (typeof body.status === 'string') {
            data.status = body.status
            if (body.status === 'approved') {
                data.isActive = true
                data.isVerified = true
            }
            if (body.status === 'rejected') data.isActive = false
        }
        if (body.commissionRate != null) data.commissionRate = Number(body.commissionRate)
        const store = await prisma.store.update({
            where: { id },
            data,
            include: { user: { select: { name: true, email: true } } },
        })
        return json(store)
    } catch (e) {
        return handleApiError(e)
    }
}

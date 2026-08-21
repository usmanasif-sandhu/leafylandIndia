import { prisma } from '@/lib/prisma'
import { json, requireUser, handleApiError, error } from '@/lib/api'

export async function GET(req, { params }) {
    try {
        const user = await requireUser()
        const { id } = await params
        const address = await prisma.address.findFirst({
            where: { id, userId: user.id },
        })
        if (!address) return error('Address not found', 404)
        return json(address)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PUT(req, { params }) {
    try {
        const user = await requireUser()
        const { id } = await params
        const body = await req.json()
        const existing = await prisma.address.findFirst({ where: { id, userId: user.id } })
        if (!existing) return error('Address not found', 404)

        const address = await prisma.$transaction(async (tx) => {
            if (body.isDefault) {
                await tx.address.updateMany({
                    where: { userId: user.id, isDefault: true },
                    data: { isDefault: false },
                })
            }
            return tx.address.update({
                where: { id },
                data: {
                    name: body.name ?? existing.name,
                    email: body.email ?? existing.email,
                    street: body.street ?? existing.street,
                    city: body.city ?? existing.city,
                    state: body.state ?? existing.state,
                    zip: body.zip ?? existing.zip,
                    country: body.country ?? existing.country,
                    phone: body.phone ?? existing.phone,
                    label: body.label !== undefined ? body.label || null : existing.label,
                    isDefault: body.isDefault !== undefined ? Boolean(body.isDefault) : existing.isDefault,
                    latitude: body.latitude !== undefined ? (body.latitude != null ? Number(body.latitude) : null) : existing.latitude,
                    longitude: body.longitude !== undefined ? (body.longitude != null ? Number(body.longitude) : null) : existing.longitude,
                },
            })
        })
        return json(address)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function DELETE(req, { params }) {
    try {
        const user = await requireUser()
        const { id } = await params
        const existing = await prisma.address.findFirst({ where: { id, userId: user.id } })
        if (!existing) return error('Address not found', 404)

        await prisma.$transaction(async (tx) => {
            // Detach any historical orders so we can delete the address
            await tx.order.updateMany({
                where: { addressId: id },
                data: { addressId: null },
            })
            await tx.address.delete({ where: { id } })
        })
        return json({ success: true })
    } catch (e) {
        return handleApiError(e)
    }
}

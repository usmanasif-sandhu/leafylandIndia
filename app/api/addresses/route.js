import { prisma } from '@/lib/prisma'
import { json, requireUser, handleApiError, error } from '@/lib/api'

export async function GET() {
    try {
        const user = await requireUser()
        const addresses = await prisma.address.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
        })
        return json(addresses)
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const body = await req.json()
        const required = ['name', 'email', 'street', 'city', 'state', 'zip', 'country', 'phone']
        for (const key of required) {
            if (!body[key]) return error(`${key} is required`)
        }
        const address = await prisma.$transaction(async (tx) => {
            if (body.isDefault) {
                await tx.address.updateMany({
                    where: { userId: user.id, isDefault: true },
                    data: { isDefault: false },
                })
            }
            return tx.address.create({
                data: {
                    userId: user.id,
                    name: body.name,
                    email: body.email,
                    street: body.street,
                    city: body.city,
                    state: body.state,
                    zip: body.zip,
                    country: body.country,
                    phone: body.phone,
                    label: body.label || null,
                    isDefault: Boolean(body.isDefault) || false,
                    latitude: body.latitude != null ? Number(body.latitude) : null,
                    longitude: body.longitude != null ? Number(body.longitude) : null,
                },
            })
        })
        return json(address, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

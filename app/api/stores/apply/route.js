import { prisma } from '@/lib/prisma'
import { error, json, requireUser, handleApiError } from '@/lib/api'
import { sanitizeImageUrl } from '@/lib/images'

export async function GET() {
    try {
        const user = await requireUser()
        const store = await prisma.store.findUnique({ where: { userId: user.id } })
        return json({ store })
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const existing = await prisma.store.findUnique({ where: { userId: user.id } })
        if (existing) return error('You already have a store application', 409)

        const body = await req.json()
        const { name, username, description, email, contact, address, logo } = body
        if (!name || !username || !description || !email || !contact || !address) {
            return error('All store fields are required')
        }

        const taken = await prisma.store.findUnique({ where: { username: username.toLowerCase() } })
        if (taken) return error('Username is taken')

        const store = await prisma.store.create({
            data: {
                userId: user.id,
                name,
                username: username.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                description,
                email,
                contact,
                address,
                logo: sanitizeImageUrl(logo),
                status: 'pending',
                isActive: false,
            },
        })
        return json(store, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

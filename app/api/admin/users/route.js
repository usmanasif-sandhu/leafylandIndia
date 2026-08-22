import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { error, json, requireAdmin, handleApiError } from '@/lib/api'

export async function GET() {
    try {
        await requireAdmin()
        const users = await prisma.user.findMany({
            include: { store: true, _count: { select: { buyerOrders: true } } },
            orderBy: { createdAt: 'desc' },
        })
        return json(users.map((u) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role === 'ADMIN' ? 'admin' : u.store ? 'seller' : 'buyer',
            storeStatus: u.store?.status || null,
            storeActive: u.store?.isActive || false,
            joinDate: u.createdAt,
            totalOrders: u._count.buyerOrders,
            storeName: u.store?.name,
            image: u.image,
        })))
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        await requireAdmin()
        const { name, email, password } = await req.json()

        if (!email?.trim()) return error('Email is required')
        if (!password || password.length < 6) {
            return error('Password must be at least 6 characters')
        }

        const normalized = email.toLowerCase().trim()
        const exists = await prisma.user.findUnique({ where: { email: normalized } })
        if (exists) {
            return error('This email is already registered. Use a new email to create an admin account.', 409)
        }

        const user = await prisma.user.create({
            data: {
                name: name?.trim() || normalized.split('@')[0],
                email: normalized,
                passwordHash: await bcrypt.hash(password, 12),
                role: 'ADMIN',
                emailVerified: new Date(),
                image: '',
            },
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        })

        return json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: 'admin',
            joinDate: user.createdAt,
            totalOrders: 0,
        }, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { error, json, handleApiError } from '@/lib/api'

export async function POST(req) {
    try {
        const { email, password } = await req.json()
        const normalized = email?.toLowerCase()?.trim()
        if (!normalized || !password) {
            return error('Email and password are required')
        }

        const user = await prisma.user.findUnique({ where: { email: normalized } })
        if (!user?.passwordHash) {
            return error('Invalid email or password', 401)
        }

        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) return error('Invalid email or password', 401)

        if (!user.emailVerified) {
            return json({ status: 'email_not_verified', email: user.email })
        }

        return json({ status: 'ok' })
    } catch (e) {
        return handleApiError(e)
    }
}

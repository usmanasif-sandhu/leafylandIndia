import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { error, json, handleApiError } from '@/lib/api'
import { sendVerificationEmail } from '@/lib/email-verification'
import { isEmailConfigured } from '@/lib/email'

export async function POST(req) {
    try {
        const { email } = await req.json()
        const normalized = email?.toLowerCase()?.trim()
        if (!normalized) return error('Email is required')

        const user = await prisma.user.findUnique({ where: { email: normalized } })
        if (!user) {
            return json({ message: 'If an account exists, a verification email has been sent.' })
        }

        if (user.emailVerified) {
            return json({ message: 'Email is already verified. You can sign in.' })
        }

        if (!user.passwordHash) {
            return error('This account uses Google sign-in. Sign in with Google instead.', 400)
        }

        if (!isEmailConfigured()) {
            const verification = await sendVerificationEmail(user.email, user.name)
            return json({
                emailNotConfigured: true,
                verifyUrl: verification.verifyUrl,
                message: 'Email isn’t configured on this server. Use the link below to verify your address.',
            })
        }

        await sendVerificationEmail(user.email, user.name)

        return json({ message: 'Verification email sent. Check your inbox.' })
    } catch (e) {
        console.error('Resend verification failed', e)
        return handleApiError(e)
    }
}

export async function PUT(req) {
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

        if (user.emailVerified) {
            return json({ message: 'Email is already verified. You can sign in.' })
        }

        if (!isEmailConfigured()) {
            const verification = await sendVerificationEmail(user.email, user.name)
            return json({
                emailNotConfigured: true,
                verifyUrl: verification.verifyUrl,
                message: 'Email isn’t configured on this server. Use the link below to verify your address.',
            })
        }

        await sendVerificationEmail(user.email, user.name)

        return json({ message: 'Verification email sent. Check your inbox.' })
    } catch (e) {
        console.error('Resend verification failed', e)
        return handleApiError(e)
    }
}

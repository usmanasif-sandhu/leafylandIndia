import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { error, json } from '@/lib/api'
import { sendVerificationEmail } from '@/lib/email-verification'
import { isEmailConfigured } from '@/lib/email'

export async function POST(req) {
    try {
        const { name, email, password } = await req.json()
        if (!email || !password || password.length < 6) {
            return error('Email and a password of at least 6 characters are required')
        }

        const normalized = email.toLowerCase().trim()
        const exists = await prisma.user.findUnique({ where: { email: normalized } })
        if (exists) return error('An account with this email already exists', 409)

        const adminEmails = (process.env.ADMIN_EMAILS || '')
            .split(',')
            .map((e) => e.trim().toLowerCase())

        const user = await prisma.user.create({
            data: {
                name: name?.trim() || normalized.split('@')[0],
                email: normalized,
                passwordHash: await bcrypt.hash(password, 12),
                role: adminEmails.includes(normalized) ? 'ADMIN' : 'BUYER',
                image: '',
            },
            select: { id: true, name: true, email: true, role: true },
        })

        let verification = { sent: false, verifyUrl: null }
        try {
            verification = await sendVerificationEmail(user.email, user.name)
        } catch (err) {
            console.error('Verification email failed', err)
            await prisma.user.delete({ where: { id: user.id } })
            return error('Account could not be created. Failed to send verification email.', 503)
        }

        const emailConfigured = isEmailConfigured()
        return json({
            user,
            requiresVerification: true,
            emailConfigured,
            message: emailConfigured
                ? 'Account created. Check your email to verify your address before signing in.'
                : 'Account created. Email isn’t configured on this server, so verify your address using the link below.',
            ...(verification.verifyUrl ? { verifyUrl: verification.verifyUrl } : {}),
        }, 201)
    } catch (e) {
        console.error(e)
        return error('Could not create account', 500)
    }
}

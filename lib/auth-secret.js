import { createHash } from 'node:crypto'

const PREFIX = 'leafyland-auth:'

export function getAuthSecret() {
    const explicit = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
    if (explicit) return explicit
    const basis = process.env.DATABASE_URL || process.env.VERCEL_URL || 'leafyland-dev'
    return createHash('sha256').update(`${PREFIX}${basis}`).digest('hex')
}

export function applyAuthSecret() {
    const secret = getAuthSecret()
    if (!process.env.AUTH_SECRET) process.env.AUTH_SECRET = secret
    return secret
}

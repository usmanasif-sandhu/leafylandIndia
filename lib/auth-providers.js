export function isGoogleAuthEnabled() {
    const id = (process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID)?.trim()
    const secret = (process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET)?.trim()
    if (!id || !secret) return false
    if (id.includes('PASTE_YOUR') || secret.includes('PASTE_YOUR')) return false
    return true
}

export function getGoogleCredentials() {
    return {
        clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET,
    }
}

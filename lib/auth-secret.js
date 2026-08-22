const DEV_FALLBACK = 'leafyland-dev-insecure-secret-do-not-use-in-prod'
const BUILD_PLACEHOLDER = 'leafyland-build-placeholder-not-for-runtime'

function isProductionBuild() {
    return process.env.NEXT_PHASE === 'phase-production-build'
}

export function getAuthSecret() {
    const explicit = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
    if (explicit) return explicit

    if (process.env.NODE_ENV === 'production') {
        // Next.js evaluates auth routes during `next build`; env vars may be unset in CI
        // until configured in the host dashboard. Runtime still requires a real secret.
        if (isProductionBuild()) return BUILD_PLACEHOLDER

        throw new Error(
            'AUTH_SECRET is required in production. Set it in your environment (e.g. openssl rand -base64 32).',
        )
    }

    return DEV_FALLBACK
}

export function applyAuthSecret() {
    const secret = getAuthSecret()
    if (!process.env.AUTH_SECRET) process.env.AUTH_SECRET = secret
    return secret
}

export { DEV_FALLBACK as AUTH_DEV_FALLBACK }

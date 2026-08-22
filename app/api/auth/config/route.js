import { json } from '@/lib/api'
import { isGoogleAuthEnabled } from '@/lib/auth-providers'
import { resolveAuthUrl } from '@/lib/auth-url'

export async function GET() {
    return json({
        googleEnabled: isGoogleAuthEnabled(),
        authUrl: resolveAuthUrl() || null,
    })
}

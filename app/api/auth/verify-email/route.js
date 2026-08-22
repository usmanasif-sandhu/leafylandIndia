import { error, json, handleApiError } from '@/lib/api'
import { verifyEmailToken } from '@/lib/email-verification'

export async function GET(req) {
    try {
        const token = new URL(req.url).searchParams.get('token')
        const result = await verifyEmailToken(token)
        if (!result.ok) return error(result.error, 400)
        return json({ verified: true, email: result.email, name: result.name })
    } catch (e) {
        return handleApiError(e)
    }
}

export async function POST(req) {
    try {
        const { token } = await req.json()
        const result = await verifyEmailToken(token)
        if (!result.ok) return error(result.error, 400)
        return json({ verified: true, email: result.email, name: result.name })
    } catch (e) {
        return handleApiError(e)
    }
}

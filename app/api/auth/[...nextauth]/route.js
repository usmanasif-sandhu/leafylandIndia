import { handlers } from '@/lib/auth'

function missingSecret() {
    return !process.env.AUTH_SECRET && !process.env.NEXTAUTH_SECRET
}

export async function GET(req) {
    if (missingSecret()) {
        return Response.json(
            { message: 'AUTH_SECRET is not set. Add it in Vercel → Settings → Environment Variables, then Redeploy.' },
            { status: 500 },
        )
    }
    return handlers.GET(req)
}

export async function POST(req) {
    if (missingSecret()) {
        return Response.json(
            { message: 'AUTH_SECRET is not set. Add it in Vercel → Settings → Environment Variables, then Redeploy.' },
            { status: 500 },
        )
    }
    return handlers.POST(req)
}

import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

async function resolveSecret() {
    const explicit = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
    if (explicit) return explicit
    const basis = process.env.DATABASE_URL || process.env.VERCEL_URL || 'leafyland-dev'
    const data = new TextEncoder().encode(`leafyland-auth:${basis}`)
    const hash = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('')
}

async function readAuthToken(req) {
    const secret = await resolveSecret()
    if (!secret) return null

    const cookieNames = [
        '__Secure-authjs.session-token',
        'authjs.session-token',
        '__Secure-next-auth.session-token',
        'next-auth.session-token',
    ]

    for (const cookieName of cookieNames) {
        const token = await getToken({
            req,
            secret,
            cookieName,
            secureCookie: cookieName.startsWith('__Secure-'),
        })
        if (token) return token
    }
    return null
}

export async function middleware(req) {
    const { pathname } = req.nextUrl
    const token = await readAuthToken(req)

    const isAdmin = pathname.startsWith('/admin')
    const isStore = pathname.startsWith('/store')
    const isOrders = pathname === '/orders' || pathname.startsWith('/orders/')
    const isCreateStore = pathname.startsWith('/create-store')
    const isLogin = pathname.startsWith('/login')

    if (isLogin && token) {
        return NextResponse.redirect(new URL('/auth/continue', req.url))
    }

    if ((isAdmin || isStore || isOrders || isCreateStore) && !token) {
        const login = new URL('/login', req.url)
        login.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(login)
    }

    if (isAdmin && token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (isStore) {
        if (!token?.storeId) {
            return NextResponse.redirect(new URL('/become-seller', req.url))
        }
        if (token.storeStatus === 'rejected') {
            return NextResponse.redirect(new URL('/create-store', req.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/store/:path*', '/orders/:path*', '/orders', '/create-store', '/login'],
}

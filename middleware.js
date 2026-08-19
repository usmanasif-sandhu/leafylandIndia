import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const { pathname } = req.nextUrl
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    })

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

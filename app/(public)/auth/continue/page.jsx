import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AuthContinuePage() {
    const session = await auth()
    if (!session?.user) redirect('/login')

    if (session.user.role === 'ADMIN') redirect('/admin')
    if (session.user.storeId && session.user.storeStatus === 'approved') redirect('/store')
    if (session.user.storeId) redirect('/create-store')
    redirect('/')
}

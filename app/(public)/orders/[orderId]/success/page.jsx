'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function OrderSuccessPage() {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch(`/api/orders/${orderId}`)
            .then(async (res) => {
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || 'Could not load order')
                setOrder(data)
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false))
    }, [orderId])

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
                <Loader2 className="animate-spin mr-2" size={20} /> Confirming your order…
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className="max-w-lg mx-auto px-4 py-16 text-center">
                <p className="text-red-600">{error || 'Order not found'}</p>
                <Link href="/orders" className="text-emerald-700 text-sm font-medium mt-4 inline-block">View orders</Link>
            </div>
        )
    }

    const paid = order.isPaid && order.paymentStatus === 'CAPTURED'

    return (
        <div className="max-w-lg mx-auto px-4 py-16 text-center">
            {paid ? (
                <>
                    <CheckCircle className="mx-auto text-emerald-600 mb-4" size={48} />
                    <h1 className="text-2xl font-bold text-slate-800">Payment confirmed</h1>
                    <p className="text-sm text-slate-500 mt-2">Order #{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-lg font-semibold text-slate-800 mt-4">
                        {process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'}{Number(order.total).toLocaleString()}
                    </p>
                </>
            ) : (
                <>
                    <Loader2 className="mx-auto text-amber-500 mb-4 animate-spin" size={40} />
                    <h1 className="text-xl font-bold text-slate-800">Payment processing</h1>
                    <p className="text-sm text-slate-500 mt-2">
                        We are confirming your payment. Refresh this page in a moment.
                    </p>
                </>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Link href="/orders" className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold">
                    My orders
                </Link>
                <Link href="/products" className="px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700">
                    Continue shopping
                </Link>
            </div>
        </div>
    )
}

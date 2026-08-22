'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { ShoppingBag, ChevronRight } from 'lucide-react'
import OrderSummary from '@/components/OrderSummary'
import { cachedJson } from '@/lib/cachedJson'

export default function Checkout() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'
    const { cartItems } = useSelector(state => state.cart)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const ids = Object.keys(cartItems || {})
        if (!ids.length) {
            setProducts([])
            return
        }
        let cancelled = false
        cachedJson(`/api/products?ids=${ids.join(',')}`)
            .then((data) => { if (!cancelled && Array.isArray(data)) setProducts(data) })
        return () => { cancelled = true }
    }, [cartItems])

    const cartArray = []
    let totalPrice = 0
    for (const [key, value] of Object.entries(cartItems)) {
        const product = products.find(p => p.id === key)
        if (product) {
            cartArray.push({ ...product, quantity: value })
            totalPrice += product.price * value
        }
    }

    if (cartArray.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                    <ShoppingBag size={32} className="text-slate-300" />
                </div>
                <h1 className="text-xl font-bold text-slate-800 mb-1">Your cart is empty</h1>
                <p className="text-sm text-slate-500 mb-5">Add items before checking out</p>
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors"
                >
                    Start Shopping <ChevronRight size={16} />
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-[70vh]">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Checkout</h1>
                <p className="text-sm text-slate-500 mt-1">{cartArray.length} item{cartArray.length > 1 ? 's' : ''} in your cart</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items */}
                <div className="flex-1 space-y-3">
                    {cartArray.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                                {item.images?.[0] ? (
                                    <Image src={item.images[0]} alt={item.name} width={96} height={96} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <ShoppingBag size={24} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-slate-800 truncate">{item.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                                <p className="text-sm font-bold text-emerald-600 mt-2">
                                    {currency}{item.price.toLocaleString()} × {item.quantity}
                                </p>
                            </div>
                            <div className="flex items-center font-semibold text-slate-800">
                                {currency}{(item.price * item.quantity).toLocaleString()}
                            </div>
                        </div>
                    ))}
                    <Link href="/cart" className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium hover:underline">
                        <ChevronRight size={14} className="rotate-180" /> Back to cart
                    </Link>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-auto shrink-0">
                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                </div>
            </div>
        </div>
    )
}

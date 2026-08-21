'use client'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { setCart } from '@/lib/features/cart/cartSlice'

export default function CartSync() {
    const cartItems = useSelector((s) => s.cart.cartItems)
    const dispatch = useDispatch()
    const { status } = useSession()
    const timer = useRef(null)
    const seeded = useRef(false)

    // Seed Redux from DB once the user is authenticated (merge, guest items win)
    useEffect(() => {
        if (status !== 'authenticated' || seeded.current) return
        seeded.current = true
        fetch('/api/cart')
            .then((r) => r.json())
            .then((db) => {
                if (db && typeof db === 'object' && Object.keys(db).length) {
                    const merged = { ...db }
                    for (const [k, v] of Object.entries(cartItems)) {
                        merged[k] = Math.max(Number(merged[k] || 0), Number(v || 0))
                    }
                    dispatch(setCart(merged))
                }
            })
            .catch(() => {})
    }, [status, cartItems, dispatch])

    // Persist Redux -> DB on change (debounced) when authenticated
    useEffect(() => {
        if (status !== 'authenticated') return
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cartItems || {}),
            }).catch(() => {})
        }, 400)
        return () => timer.current && clearTimeout(timer.current)
    }, [cartItems, status])

    return null
}

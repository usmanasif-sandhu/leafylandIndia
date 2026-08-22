'use client'

import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'
import { setWishlist, clearWishlist } from '@/lib/features/wishlist/wishlistSlice'

export default function WishlistSync() {
    const dispatch = useDispatch()
    const { status } = useSession()
    const seeded = useRef(false)

    useEffect(() => {
        if (status === 'unauthenticated') {
            seeded.current = false
            dispatch(clearWishlist())
            return
        }
        if (status !== 'authenticated' || seeded.current) return

        seeded.current = true
        fetch('/api/wishlist?raw=1')
            .then((r) => (r.ok ? r.json() : []))
            .then((items) => {
                if (!Array.isArray(items)) return
                dispatch(
                    setWishlist(
                        items.map((i) => ({
                            id: i.itemId,
                            type: String(i.itemType).toLowerCase(),
                        })),
                    ),
                )
            })
            .catch(() => {})
    }, [status, dispatch])

    return null
}

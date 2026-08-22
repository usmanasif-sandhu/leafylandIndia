'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function BuyerBookingsPage() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [ratingFor, setRatingFor] = useState(null)
    const [score, setScore] = useState(5)
    const [review, setReview] = useState('')

    const load = () => {
        fetch('/api/bookings')
            .then(async (r) => {
                const data = await r.json()
                if (!r.ok) throw new Error(data.error || 'Failed to load')
                setBookings(Array.isArray(data) ? data : [])
            })
            .catch((e) => toast.error(e.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        load()
    }, [])

    const submitRating = async () => {
        if (!ratingFor) return
        try {
            const res = await fetch('/api/service-ratings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceId: ratingFor.serviceId,
                    bookingId: ratingFor.id,
                    rating: score,
                    review,
                }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Could not rate')
            toast.success('Review submitted')
            setRatingFor(null)
            setReview('')
        } catch (e) {
            toast.error(e.message)
        }
    }

    if (loading) return <p className="p-8 text-slate-500">Loading bookings…</p>

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
            <h1 className="text-2xl font-bold text-slate-800">My Bookings</h1>
            {bookings.length === 0 ? (
                <p className="text-sm text-slate-500">
                    No bookings yet.{' '}
                    <Link href="/services" className="text-emerald-700 font-medium">
                        Browse services
                    </Link>
                </p>
            ) : (
                bookings.map((b) => (
                    <div key={b.id} className="border border-slate-200 rounded-2xl p-4 bg-white space-y-2">
                        <div className="flex justify-between gap-2">
                            <div>
                                <p className="font-semibold text-slate-800">{b.service?.name || 'Service'}</p>
                                <p className="text-xs text-slate-500">
                                    {new Date(b.date).toLocaleDateString('en-IN')} · {b.time} · {b.location}
                                </p>
                            </div>
                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600 h-fit">
                                {b.status}
                            </span>
                        </div>
                        {b.status === 'COMPLETED' && (
                            <button
                                onClick={() => setRatingFor(b)}
                                className="text-sm text-emerald-700 font-semibold"
                            >
                                Rate service
                            </button>
                        )}
                    </div>
                ))
            )}

            {ratingFor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setRatingFor(null)} />
                    <div className="relative bg-white rounded-2xl p-6 w-full max-w-md mx-4 space-y-3">
                        <h3 className="font-semibold text-slate-800">Rate {ratingFor.service?.name}</h3>
                        <select
                            value={score}
                            onChange={(e) => setScore(Number(e.target.value))}
                            className="w-full border rounded-xl px-3 py-2 text-sm"
                        >
                            {[5, 4, 3, 2, 1].map((n) => (
                                <option key={n} value={n}>
                                    {n} stars
                                </option>
                            ))}
                        </select>
                        <textarea
                            rows={3}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full border rounded-xl px-3 py-2 text-sm"
                            placeholder="Optional review"
                        />
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setRatingFor(null)} className="px-3 py-2 text-sm bg-slate-100 rounded-xl">
                                Cancel
                            </button>
                            <button onClick={submitRating} className="px-3 py-2 text-sm bg-emerald-700 text-white rounded-xl">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

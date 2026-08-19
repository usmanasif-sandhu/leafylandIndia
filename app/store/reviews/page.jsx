'use client'
import { useEffect, useState } from 'react'
import { Star, MessageSquare } from 'lucide-react'

export default function VendorReviews() {
    const [filterRating, setFilterRating] = useState('All')
    const [vendorReviews, setVendorReviews] = useState([])

    useEffect(() => {
        fetch('/api/vendor/reviews')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setVendorReviews(data) })
    }, [])

    const filtered = vendorReviews.filter(r => filterRating === 'All' || r.rating === Number(filterRating))
    const avgRating = vendorReviews.length ? (vendorReviews.reduce((s, r) => s + r.rating, 0) / vendorReviews.length).toFixed(1) : 0
    const ratingDist = [5, 4, 3, 2, 1].map(star => ({ star, count: vendorReviews.filter(r => r.rating === star).length }))
    const maxCount = Math.max(...ratingDist.map(r => r.count), 1)

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">
                Store <span className="font-bold">Reviews</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <div className="text-center mb-6">
                        <p className="text-5xl font-extrabold text-slate-800">{avgRating}</p>
                        <div className="flex items-center justify-center gap-0.5 mt-2">
                            {Array(5).fill('').map((_, i) => (
                                <Star key={i} size={18} fill={i < Math.round(avgRating) ? '#f59e0b' : '#e2e8f0'} className={i < Math.round(avgRating) ? 'text-amber-400' : 'text-slate-200'} />
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{vendorReviews.length} reviews</p>
                    </div>
                    <div className="space-y-2">
                        {ratingDist.map(({ star, count }) => (
                            <div key={star} className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-600 w-6">{star}★</span>
                                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(count / maxCount) * 100}%` }} />
                                </div>
                                <span className="text-xs text-slate-500 w-6 text-right">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <div className="flex gap-2">
                        {['All', 5, 4, 3, 2, 1].map(r => (
                            <button
                                key={r}
                                onClick={() => setFilterRating(String(r))}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                                    filterRating === String(r) ? 'bg-amber-500 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {r === 'All' ? 'All' : `${r}★`}
                            </button>
                        ))}
                    </div>

                    {filtered.length === 0 ? (
                        <p className="text-sm text-slate-500">No reviews yet.</p>
                    ) : filtered.map(review => (
                        <div key={review.id} className="bg-white rounded-2xl border border-slate-100 p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-emerald-700">{(review.customer || '?').charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-slate-700">{review.customer || 'Customer'}</p>
                                        <div className="flex items-center gap-0.5">
                                            {Array(5).fill('').map((_, i) => (
                                                <Star key={i} size={10} fill={i < review.rating ? '#f59e0b' : '#e2e8f0'} className={i < review.rating ? 'text-amber-400' : 'text-slate-200'} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-400">{review.date ? new Date(review.date).toLocaleDateString() : ''}</span>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-medium mt-0.5">{review.product}</p>
                                    <p className="text-sm text-slate-600 mt-2">{review.review}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

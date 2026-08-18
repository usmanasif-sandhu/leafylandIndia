'use client'
import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp } from 'lucide-react'
import { vendorReviews } from '@/lib/data/vendor'
import toast from 'react-hot-toast'

export default function VendorReviews() {
    const [filterRating, setFilterRating] = useState('All')
    const [replyingTo, setReplyingTo] = useState(null)
    const [replyText, setReplyText] = useState('')

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
                {/* Rating Summary */}
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

                {/* Review List */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Filter */}
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

                    {filtered.map(review => (
                        <div key={review.id} className="bg-white rounded-2xl border border-slate-100 p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-emerald-700">{review.customer.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold text-slate-700">{review.customer}</p>
                                        <div className="flex items-center gap-0.5">
                                            {Array(5).fill('').map((_, i) => (
                                                <Star key={i} size={10} fill={i < review.rating ? '#f59e0b' : '#e2e8f0'} className={i < review.rating ? 'text-amber-400' : 'text-slate-200'} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-400">{review.date}</span>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-medium mt-0.5">{review.product}</p>
                                    <p className="text-sm text-slate-600 mt-2">{review.review}</p>

                                    {review.replied ? (
                                        <div className="mt-3 pl-3 border-l-2 border-emerald-200 bg-emerald-50/50 rounded-r-lg p-2">
                                            <p className="text-xs text-slate-500">You replied</p>
                                        </div>
                                    ) : replyingTo === review.id ? (
                                        <div className="mt-3">
                                            <textarea
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                placeholder="Write your reply..."
                                                rows={2}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-3 py-2 focus:border-emerald-500 outline-none resize-none"
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => { toast.success('Reply sent'); setReplyingTo(null); setReplyText('') }}
                                                    className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                                                >
                                                    Send Reply
                                                </button>
                                                <button
                                                    onClick={() => { setReplyingTo(null); setReplyText('') }}
                                                    className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setReplyingTo(review.id)}
                                            className="mt-2 flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                                        >
                                            <MessageSquare size={12} /> Reply
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

'use client'

import { Star } from 'lucide-react'

export default function ReviewsList({ reviews = [], emptyMessage = 'No reviews yet.' }) {
    if (!reviews.length) {
        return <p className="text-slate-400 text-center py-8 text-sm">{emptyMessage}</p>
    }

    return (
        <div className="flex flex-col gap-4">
            {reviews.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-emerald-700">
                            {item.user?.name?.[0]?.toUpperCase() || 'U'}
                        </span>
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                    key={i}
                                    size={12}
                                    className="text-transparent"
                                    fill={item.rating >= i + 1 ? '#059669' : '#D1D5DB'}
                                />
                            ))}
                        </div>
                        {item.review ? (
                            <p className="text-sm mt-1 text-slate-700">{item.review}</p>
                        ) : null}
                        <p className="text-xs text-slate-400 mt-1">
                            {item.user?.name || 'Buyer'}
                            {item.createdAt ? ` · ${new Date(item.createdAt).toLocaleDateString('en-IN')}` : ''}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

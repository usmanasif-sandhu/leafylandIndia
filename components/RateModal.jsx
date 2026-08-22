'use client'

import { Star, XIcon } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function RateModal({ title, onClose, onSubmit }) {
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')

    const handleSubmit = async () => {
        if (!rating || rating < 1 || rating > 5) {
            toast.error('Please select a rating')
            throw new Error('Invalid rating')
        }
        await onSubmit({ rating, review: review.trim() })
    }

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
                    type="button"
                >
                    <XIcon size={20} />
                </button>
                <h2 className="text-lg font-semibold text-slate-800 mb-4 pr-6">{title}</h2>
                <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setRating(i + 1)}
                            className="p-1"
                        >
                            <Star
                                size={28}
                                className={rating > i ? 'text-emerald-500 fill-emerald-500' : 'text-slate-300'}
                            />
                        </button>
                    ))}
                </div>
                <textarea
                    className="w-full p-3 border border-slate-200 rounded-xl mb-4 text-sm outline-none focus:border-emerald-500"
                    placeholder="Write your review (optional)"
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => toast.promise(handleSubmit(), { loading: 'Submitting…' })}
                    className="w-full bg-emerald-600 text-white py-2.5 rounded-xl hover:bg-emerald-700 transition text-sm font-semibold"
                >
                    Submit review
                </button>
            </div>
        </div>
    )
}

'use client'
import { X, Clock, Leaf, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ComingSoonModal({ isOpen, onClose, category }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Clock size={32} className="text-amber-600" />
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
                    Coming Soon
                </h2>

                {/* Category badge */}
                {category && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full mb-4">
                        <Leaf size={12} />
                        {category}
                    </span>
                )}

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    This category is part of our upcoming marketplace expansion. We're working hard to bring you more products and services. Stay tuned!
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                        Browse LeafyLand Products <ArrowRight size={16} />
                    </button>
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

'use client'
import { Star, Store } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {
    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-10 text-sm text-slate-600">
            <div className="flex border-b border-slate-200 mb-6">
                {['Description', 'Reviews'].map((tab) => (
                    <button
                        key={tab}
                        className={`${tab === selectedTab ? 'border-b-2 border-emerald-600 font-semibold text-emerald-600' : 'text-slate-400 hover:text-slate-600'} px-4 py-2.5 font-medium transition`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {selectedTab === "Description" && (
                <div className="max-w-2xl">
                    <p className="leading-relaxed">{product.description}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-400">Category</p>
                            <p className="text-sm font-medium text-slate-700">{product.category}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-3">
                            <p className="text-xs text-slate-400">Vendor</p>
                            <p className="text-sm font-medium text-slate-700">{product.storeName || 'LeafyLand'}</p>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === "Reviews" && (
                <div className="mt-4">
                    {product.rating?.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {product.rating.map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-sm font-semibold text-emerald-700">{item.user?.name?.[0] || 'U'}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            {Array(5).fill('').map((_, i) => (
                                                <Star key={i} size={12} className='text-transparent' fill={item.rating >= i + 1 ? "#059669" : "#D1D5DB"} />
                                            ))}
                                        </div>
                                        <p className="text-sm mt-1">{item.review}</p>
                                        <p className="text-xs text-slate-400 mt-1">{item.user?.name} · {new Date(item.createdAt).toDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-400 text-center py-8">No reviews yet. Be the first to review this product!</p>
                    )}
                </div>
            )}

            {/* Store Info */}
            <div className="flex items-center gap-3 mt-8 p-4 bg-slate-50 rounded-xl">
                <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Store size={18} className="text-emerald-600" />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-700">Sold by {product.storeName || 'LeafyLand'}</p>
                    <Link href={`/shop/${product.storeId || 'leafyland'}`} className="text-xs text-emerald-600 hover:underline">
                        View store →
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription

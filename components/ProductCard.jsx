'use client'
import { ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ProductCard = ({ product }) => {
    const currency = '₹'
    const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0
    const rating = product.rating?.length
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0

    return (
        <Link href={`/products/${product.id}`} className="group block w-48 sm:w-52">
            <div className="bg-slate-50 rounded-2xl overflow-hidden relative">
                <div className="aspect-square flex items-center justify-center p-3">
                    <Image
                        width={200}
                        height={200}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-300"
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop'}
                        alt={product.name}
                    />
                </div>
                {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {discount}% OFF
                    </span>
                )}
            </div>
            <div className="pt-2.5 px-1">
                <p className="text-xs text-slate-500 truncate">{product.category}</p>
                <p className="text-sm font-medium text-slate-800 truncate mt-0.5">{product.name}</p>
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-bold text-slate-800">{currency}{product.price.toLocaleString()}</span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-xs text-slate-400 line-through">{currency}{product.mrp.toLocaleString()}</span>
                    )}
                </div>
                {rating > 0 && (
                    <div className="flex items-center gap-0.5 mt-1">
                        <Star size={11} fill="#059669" className="text-emerald-600" />
                        <span className="text-[11px] text-slate-600 font-medium">{rating}</span>
                    </div>
                )}
                <button className="mt-2 w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 rounded-xl transition active:scale-95">
                    <ShoppingCart size={13} />
                    Add to Cart
                </button>
            </div>
        </Link>
    )
}

export default ProductCard

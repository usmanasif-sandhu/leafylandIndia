'use client'
import { ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/lib/features/cart/cartSlice'
import toast from 'react-hot-toast'
import WishlistButton from '@/components/WishlistButton'

const ProductCard = ({ product }) => {
    const currency = '₹'
    const dispatch = useDispatch()
    const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0
    const rating = product.rating?.length
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : product.avgRating || 0

    const handleAdd = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addToCart({ productId: product.id }))
        toast.success('Added to cart')
    }

    return (
        <Link href={`/products/${product.id}`} className="group block w-40 sm:w-44 flex-shrink-0">
            <div className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-square">
                {product.images?.[0] ? (
                    <img
                        width={176}
                        height={176}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src={product.images[0]}
                        alt={product.name}
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100" />
                )}
                <div className="absolute top-2 right-2 z-10">
                    <WishlistButton itemId={product.id} itemType="product" />
                </div>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="absolute bottom-2 right-2 z-10 bg-white/90 hover:bg-emerald-600 hover:text-white text-emerald-700 text-[11px] font-bold px-4 py-1.5 rounded-lg shadow-md transition-all active:scale-95 border border-emerald-200 hover:border-emerald-600"
                >
                    ADD
                </button>
                {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                        {discount}% OFF
                    </span>
                )}
            </div>

            <div className="pt-2 px-0.5">
                <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-slate-800">{currency}{product.price.toLocaleString()}</span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-[11px] text-slate-400 line-through">{currency}{product.mrp.toLocaleString()}</span>
                    )}
                </div>
                {discount > 0 && (
                    <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">
                        {currency}
                        {product.mrp - product.price} OFF
                    </p>
                )}
                <p className="text-xs text-slate-700 mt-1 leading-snug line-clamp-2">{product.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{product.category}</p>
                {rating > 0 && (
                    <div className="flex items-center gap-0.5 mt-1">
                        <Star size={10} fill="#059669" className="text-emerald-600" />
                        <span className="text-[10px] text-slate-600 font-medium">{rating}</span>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default ProductCard

'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { products } from '@/lib/data/products'
import ProductDetails from '@/components/ProductDetails'
import ProductDescription from '@/components/ProductDescription'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const ProductPage = () => {
    const { productId } = useParams()
    const product = products.find(p => p.id === productId)

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
                <p className="text-slate-500 text-sm">Product not found.</p>
                <Link href="/products" className="mt-3 inline-block text-emerald-600 text-sm font-medium hover:underline">
                    Back to Products
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <Link href="/products" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-6 transition">
                <ChevronLeft size={16} /> Back to Products
            </Link>
            <ProductDetails product={product} />
            <ProductDescription product={product} />
        </div>
    )
}

export default ProductPage

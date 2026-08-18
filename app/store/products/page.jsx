'use client'
import { useState } from 'react'
import { Search, Plus, Eye, Edit, Trash2, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { vendorProducts } from '@/lib/data/vendor'
import toast from 'react-hot-toast'

export default function VendorProducts() {
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [stockFilter, setStockFilter] = useState('All')

    const categories = ['All', ...new Set(vendorProducts.map(p => p.category))]

    const filtered = vendorProducts.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
        const matchCategory = categoryFilter === 'All' || p.category === categoryFilter
        const matchStock = stockFilter === 'All' ||
            (stockFilter === 'In Stock' && p.inStock && p.stock > 3) ||
            (stockFilter === 'Low Stock' && p.stock <= 3) ||
            (stockFilter === 'Out of Stock' && !p.inStock)
        return matchSearch && matchCategory && matchStock
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        My <span className="font-bold">Products</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">{vendorProducts.length} products listed</p>
                </div>
                <Link
                    href="/store/add-product"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500"
                >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500"
                >
                    <option value="All">All Stock</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>

            {/* Product Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                    <Package size={40} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No products found</p>
                    <Link href="/store/add-product" className="mt-3 inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:underline">
                        <Plus size={14} /> Add your first product
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map(product => (
                        <div key={product.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="relative aspect-square bg-slate-50">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-300"
                                />
                                <span className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                    product.stock <= 3 ? 'bg-red-500 text-white' :
                                    product.stock <= 10 ? 'bg-amber-500 text-white' :
                                    'bg-emerald-500 text-white'
                                }`}>
                                    {product.stock <= 3 ? 'LOW STOCK' : `${product.stock} in stock`}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-slate-800 truncate">{product.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{product.category}</p>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-lg font-bold text-slate-800">₹{product.price.toLocaleString()}</span>
                                    {product.mrp > product.price && (
                                        <span className="text-xs text-slate-400 line-through">₹{product.mrp.toLocaleString()}</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                                    <div className="text-xs text-slate-500">
                                        <span className="font-semibold text-slate-700">{product.totalSales}</span> sold
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                            <Edit size={14} />
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

'use client'
import { Suspense, useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from "@/components/ProductCard"
import { Search, X, Leaf, Store } from 'lucide-react'
import { cachedJson } from '@/lib/cachedJson'
import { isMarketplaceCategory } from '@/lib/categories'

function ProductsContent() {
    const searchParams = useSearchParams()
    const urlCategory = searchParams.get('category') || 'All'
    const urlSearch = searchParams.get('search') || ''

    const [search, setSearch] = useState(urlSearch)
    const [selectedCategory, setSelectedCategory] = useState(urlCategory)
    const [sortBy, setSortBy] = useState('featured')
    const [products, setProducts] = useState([])

    useEffect(() => {
        let cancelled = false
        const params = new URLSearchParams()
        if (urlSearch) params.set('search', urlSearch)
        if (urlCategory && urlCategory !== 'All') params.set('category', urlCategory)
        const qs = params.toString()
        cachedJson(`/api/products${qs ? `?${qs}` : ''}`)
            .then((data) => { if (!cancelled && Array.isArray(data)) setProducts(data) })
        return () => { cancelled = true }
    }, [urlCategory, urlSearch])

    useEffect(() => {
        setSelectedCategory(urlCategory)
    }, [urlCategory])

    useEffect(() => {
        setSearch(urlSearch)
    }, [urlSearch])

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean))
        return ['All', ...Array.from(set)]
    }, [products])

    const allFiltered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
        const matchCategory = selectedCategory === 'All' || p.category === selectedCategory
        return matchSearch && matchCategory
    }).sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        return 0
    })

    // Pin LeafyLand items at top, marketplace below
    const filtered = [
        ...allFiltered.filter(p => !isMarketplaceCategory(p.category)),
        ...allFiltered.filter(p => isMarketplaceCategory(p.category)),
    ]

    const leafyCount = filtered.filter(p => !isMarketplaceCategory(p.category)).length
    const marketplaceCount = filtered.filter(p => isMarketplaceCategory(p.category)).length

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-[60vh]">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Products</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {leafyCount > 0 && <span className="text-emerald-600 font-medium">{leafyCount} LeafyLand</span>}
                    {leafyCount > 0 && marketplaceCount > 0 && <span> + </span>}
                    {marketplaceCount > 0 && <span className="text-blue-600 font-medium">{marketplaceCount} Marketplace</span>}
                    {' '}products found
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search plants, tools, accessories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    />
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-emerald-500"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
                            selectedCategory === cat
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-sm">No products found matching your criteria.</p>
                    <button onClick={() => { setSearch(''); setSelectedCategory('All') }} className="mt-3 text-emerald-600 text-sm font-medium hover:underline">
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* LeafyLand Products */}
                    {leafyCount > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                                    <Leaf size={12} /> LeafyLand
                                </span>
                                <div className="flex-1 h-px bg-emerald-100" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                                {filtered.filter(p => !isMarketplaceCategory(p.category)).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Marketplace Products */}
                    {marketplaceCount > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                                    <Store size={12} /> Marketplace
                                </span>
                                <div className="flex-1 h-px bg-blue-100" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                                {filtered.filter(p => isMarketplaceCategory(p.category)).map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

const ProductsPage = () => (
    <Suspense fallback={null}>
        <ProductsContent />
    </Suspense>
)

export default ProductsPage

'use client'
import { useState } from 'react'
import ServiceCard from "@/components/ServiceCard"
import { services, serviceCategories } from "@/lib/data/services"
import { Search } from 'lucide-react'

const ServicesPage = () => {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filtered = services.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()) || s.location.toLowerCase().includes(search.toLowerCase())
        const matchCategory = selectedCategory === 'All' || s.category === selectedCategory
        return matchSearch && matchCategory
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-[60vh]">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Services</h1>
                <p className="text-sm text-slate-500 mt-1">{filtered.length} services available</p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search landscaping, design, maintenance..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
                {['All', ...serviceCategories].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
                            selectedCategory === cat
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Service Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-sm">No services found matching your criteria.</p>
                    <button onClick={() => { setSearch(''); setSelectedCategory('All') }} className="mt-3 text-blue-600 text-sm font-medium hover:underline">
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {filtered.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ServicesPage

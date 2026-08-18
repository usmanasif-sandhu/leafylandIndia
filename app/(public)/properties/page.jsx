'use client'
import { useState } from 'react'
import PropertyCard from "@/components/PropertyCard"
import { properties, propertyTypes } from "@/lib/data/properties"
import { Search } from 'lucide-react'

const PropertiesPage = () => {
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState('All')
    const [listingFilter, setListingFilter] = useState('All')

    const allFiltered = properties.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
        const matchType = selectedType === 'All' || p.listingType === selectedType
        const matchListing = listingFilter === 'All' || p.type === listingFilter
        return matchSearch && matchType && matchListing
    })

    // Pin LeafyLand properties at top, marketplace below
    const filtered = [
        ...allFiltered.filter(p => !p.marketplace),
        ...allFiltered.filter(p => p.marketplace),
    ]

    const leafyCount = filtered.filter(p => !p.marketplace).length
    const marketplaceCount = filtered.filter(p => p.marketplace).length

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-[60vh]">
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Properties</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {leafyCount > 0 && <span className="text-emerald-600 font-medium">{leafyCount} LeafyLand</span>}
                    {leafyCount > 0 && marketplaceCount > 0 && <span> + </span>}
                    {marketplaceCount > 0 && <span className="text-blue-600 font-medium">{marketplaceCount} Marketplace</span>}
                    {' '}listings found
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search farmland, farmhouses, land..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {['All', 'SALE', 'RENT'].map(type => (
                    <button
                        key={type}
                        onClick={() => setListingFilter(type)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                            listingFilter === type
                                ? 'bg-amber-500 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {type === 'All' ? 'All' : type === 'SALE' ? 'For Sale' : 'For Rent'}
                    </button>
                ))}
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
                {['All', ...propertyTypes].map(type => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition ${
                            selectedType === type
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Property Grid */}
            {filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-sm">No properties found matching your criteria.</p>
                    <button onClick={() => { setSearch(''); setSelectedType('All'); setListingFilter('All') }} className="mt-3 text-amber-600 text-sm font-medium hover:underline">
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* LeafyLand Properties */}
                    {leafyCount > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                                    🌿 LeafyLand Properties
                                </span>
                                <div className="flex-1 h-px bg-emerald-100" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                {filtered.filter(p => !p.marketplace).map(property => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Marketplace Properties */}
                    {marketplaceCount > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                                    🏠 Marketplace Properties
                                </span>
                                <div className="flex-1 h-px bg-blue-100" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                {filtered.filter(p => p.marketplace).map(property => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PropertiesPage

'use client'
import { useEffect, useState } from 'react'
import { Search, Plus, Trash2, Home } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import StatusBadge from '@/components/admin/StatusBadge'

export default function VendorProperties() {
    const [search, setSearch] = useState('')
    const [properties, setProperties] = useState([])

    const load = () => {
        fetch('/api/vendor/properties')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setProperties(data) })
    }

    useEffect(() => { load() }, [])

    const filtered = properties.filter((p) =>
        (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.location || '').toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        My <span className="font-bold">Properties</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">{properties.length} properties listed</p>
                </div>
                <Link
                    href="/store/add-property"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                    <Plus size={16} /> Add Property
                </Link>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search properties..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                    <Home size={40} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No properties found</p>
                    <Link href="/store/add-property" className="mt-3 inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:underline">
                        <Plus size={14} /> Add your first property
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((property) => (
                        <div key={property.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="relative aspect-[4/3] bg-slate-50">
                                {property.images?.[0] ? (
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Home size={32} />
                                    </div>
                                )}
                                <span className="absolute top-2 left-2">
                                    <StatusBadge status={property.status || 'pending'} />
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-slate-800 truncate">{property.title}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{property.propertyType} · {property.listingType}</p>
                                <p className="text-xs text-slate-400 mt-1 truncate">{property.location}</p>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                                    <span className="text-lg font-bold text-slate-800">₹{(property.price || 0).toLocaleString()}</span>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (!confirm('Delete this property?')) return
                                            const res = await fetch(`/api/vendor/properties/${property.id}`, { method: 'DELETE' })
                                            if (!res.ok) return toast.error('Could not delete')
                                            toast.success('Property deleted')
                                            load()
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

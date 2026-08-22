'use client'
import { useEffect, useState } from 'react'
import { Search, Plus, Trash2, Wrench } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import StatusBadge from '@/components/admin/StatusBadge'

export default function VendorServices() {
    const [search, setSearch] = useState('')
    const [services, setServices] = useState([])

    const load = () => {
        fetch('/api/vendor/services')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setServices(data) })
    }

    useEffect(() => { load() }, [])

    const filtered = services.filter((s) =>
        (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (s.category || '').toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        My <span className="font-bold">Services</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">{services.length} services listed</p>
                </div>
                <Link
                    href="/store/add-service"
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                    <Plus size={16} /> Add Service
                </Link>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                />
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                    <Wrench size={40} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No services found</p>
                    <Link href="/store/add-service" className="mt-3 inline-flex items-center gap-1 text-emerald-600 text-sm font-medium hover:underline">
                        <Plus size={14} /> Add your first service
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                            <div className="relative aspect-[4/3] bg-slate-50">
                                {service.images?.[0] ? (
                                    <img
                                        src={service.images[0]}
                                        alt={service.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Wrench size={32} />
                                    </div>
                                )}
                                <span className="absolute top-2 left-2">
                                    <StatusBadge status={service.status || 'pending'} />
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-slate-800 truncate">{service.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{service.category}</p>
                                <p className="text-xs text-slate-400 mt-1 truncate">{service.location}</p>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                                    <span className="text-lg font-bold text-slate-800">₹{(service.startingPrice || 0).toLocaleString()}</span>
                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (!confirm('Delete this service?')) return
                                            const res = await fetch(`/api/vendor/services/${service.id}`, { method: 'DELETE' })
                                            if (!res.ok) return toast.error('Could not delete')
                                            toast.success('Service deleted')
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

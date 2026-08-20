'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Search, Droplets, Scissors, Sparkles, ShieldCheck, Recycle, Leaf, Flower2, Wrench, Truck, Home, Zap, AlertTriangle, RefreshCw, Building, Paintbrush, Hammer, Droplet, Camera, Package, Trash2, Receipt, Scale, Palette, Code, Megaphone, Car, Bike, BookOpen, Music, MessageCircle, GraduationCap } from 'lucide-react'

const serviceIcons = {
    'Plant Watering': Droplets,
    'Lawn Mowing': Scissors,
    'Garden Cleaning': Sparkles,
    'Pest Control': ShieldCheck,
    'Waste Recycling': Recycle,
    'Indoor Plant Care': Leaf,
    'Soil Replacement': Flower2,
    'Irrigation Repair': Wrench,
    'Compost Pickup': Truck,
    'Balcony Setup': Home,
    'Emergency Garden': AlertTriangle,
    'Plant Replacement': RefreshCw,
    'Housekeeping': Building,
    'Deep Cleaning': Sparkles,
    'AC Service': Zap,
    'Appliance Repair': Wrench,
    'Plumbing': Droplet,
    'Electrical': Zap,
    'Painting': Paintbrush,
    'Carpentry': Hammer,
    'Waterproofing': ShieldCheck,
    'CCTV': Camera,
    'Shifting': Package,
    'Junk Removal': Trash2,
    // Marketplace services
    'CA & Tax Filing': Receipt,
    'Legal Consultation': Scale,
    'Interior Design': Palette,
    'Photography & Videography': Camera,
    'Web Development': Code,
    'Digital Marketing': Megaphone,
    'Home Shifting': Package,
    'Courier & Delivery': Truck,
    'Cab Booking': Car,
    'Goods Transport': Truck,
    'Bike Rental': Bike,
    'Home Tuition': BookOpen,
    'Online Coding Classes': Code,
    'Music Lessons': Music,
    'Spoken English Course': MessageCircle,
    'Competitive Exam Prep': GraduationCap,
}

const ServicesPage = () => {
    const [search, setSearch] = useState('')
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/services')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setServices(data) })
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(() => services.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.category || '').toLowerCase().includes(search.toLowerCase())
    ), [services, search])

    const grouped = useMemo(() => {
        const map = {}
        filtered.forEach((s) => {
            const cat = s.category || 'Other'
            ;(map[cat] ||= []).push(s)
        })
        return Object.entries(map)
    }, [filtered])

    return (
        <div className="bg-slate-50/50 min-h-[60vh]">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Services</h1>
                <p className="text-sm text-slate-500 mt-1">On-demand green, home & professional services at your doorstep</p>
            </div>

            {/* Search */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-sm">Loading services…</p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-sm">No services found matching your search.</p>
                    <button onClick={() => setSearch('')} className="mt-3 text-emerald-600 text-sm font-medium hover:underline">
                        Clear search
                    </button>
                </div>
            ) : (
                grouped.map(([category, items]) => (
                    <div key={category} className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">{category}</h2>
                        <p className="text-sm text-slate-500 mb-5">Professional services to get the job done</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                            {items.map((service) => {
                                const Icon = serviceIcons[service.name] || Leaf
                                return (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.id}`}
                                        className="flex flex-col items-center gap-3 p-5 bg-[#c8e6c9] rounded-2xl border border-emerald-100 hover:border-emerald-200 hover:shadow-md transition-all group cursor-pointer"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center group-hover:bg-white transition-colors">
                                            <Icon size={22} className="text-emerald-600" />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{service.name}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default ServicesPage

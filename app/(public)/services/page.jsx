'use client'
import { useState } from 'react'
import Link from 'next/link'
import { services, serviceCategories } from "@/lib/data/services"
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

    const filtered = services.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase())
    )

    const leafyServices = filtered.filter(s => !s.marketplace)
    const marketplaceServices = filtered.filter(s => s.marketplace)

    const dailyServices = leafyServices.filter(s => s.category === 'Daily Needs Services')
    const homeServices = leafyServices.filter(s => s.category === 'Home Services')
    const professionalServices = marketplaceServices.filter(s => s.category === 'Professional Services')
    const transportationServices = marketplaceServices.filter(s => s.category === 'Transportation')
    const educationServices = marketplaceServices.filter(s => s.category === 'Education & Tutoring')

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

            {/* Daily Needs Services */}
            {dailyServices.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">Daily Needs Services</h2>
                    <p className="text-sm text-slate-500 mb-5">On-demand green & home services at your doorstep</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {dailyServices.map(service => {
                            const Icon = serviceIcons[service.name] || Leaf
                            return (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
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
            )}

            {/* Home Services */}
            {homeServices.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">Home Services</h2>
                    <p className="text-sm text-slate-500 mb-5">Professional home maintenance and repair services</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {homeServices.map(service => {
                            const Icon = serviceIcons[service.name] || Leaf
                            return (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
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
            )}

            {/* ═══ MARKETPLACE SERVICES ═══ */}

            {/* Professional Services */}
            {professionalServices.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                            💼 Professional Services
                        </span>
                        <div className="flex-1 h-px bg-blue-100" />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {professionalServices.map(service => {
                            const Icon = serviceIcons[service.name] || Leaf
                            return (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="flex flex-col items-center gap-3 p-5 bg-blue-50 rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center group-hover:bg-white transition-colors">
                                        <Icon size={22} className="text-blue-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{service.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Transportation */}
            {transportationServices.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
                            🚗 Transportation
                        </span>
                        <div className="flex-1 h-px bg-purple-100" />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {transportationServices.map(service => {
                            const Icon = serviceIcons[service.name] || Leaf
                            return (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="flex flex-col items-center gap-3 p-5 bg-purple-50 rounded-2xl border border-purple-100 hover:border-purple-200 hover:shadow-md transition-all group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center group-hover:bg-white transition-colors">
                                        <Icon size={22} className="text-purple-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{service.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Education & Tutoring */}
            {educationServices.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
                            📚 Education & Tutoring
                        </span>
                        <div className="flex-1 h-px bg-amber-100" />
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                        {educationServices.map(service => {
                            const Icon = serviceIcons[service.name] || Leaf
                            return (
                                <Link
                                    key={service.id}
                                    href={`/services/${service.slug}`}
                                    className="flex flex-col items-center gap-3 p-5 bg-amber-50 rounded-2xl border border-amber-100 hover:border-amber-200 hover:shadow-md transition-all group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center group-hover:bg-white transition-colors">
                                        <Icon size={22} className="text-amber-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{service.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-sm">No services found matching your search.</p>
                    <button onClick={() => setSearch('')} className="mt-3 text-emerald-600 text-sm font-medium hover:underline">
                        Clear search
                    </button>
                </div>
            )}
        </div>
    )
}

export default ServicesPage

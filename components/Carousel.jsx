'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Sprout, TreePine, Flower2, Leaf, Shovel, FlaskConical, Package, Home as HomeIcon, ArrowRight, Truck, ShieldCheck, Star, Compass, Bot, CalendarCheck, BadgeCheck, Droplets, Scissors, Hammer, Zap, Sparkles, Building } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const productImages = [
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
]

const slides = [
    // Slide 1 — Hero
    {
        id: 1,
        render: () => (
            <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f7f0 0%, #e8f5e9 40%, #f1f8e9 100%)' }}>
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-100/50 blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-teal-100/50 blur-2xl" />
                <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-lime-100/40 blur-2xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full py-8 lg:py-0">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
                                Shop, Hire Experts &<br />Grow —<br />
                                <span className="text-emerald-700">All in One Place.</span>
                            </h1>
                            <p className="text-sm sm:text-base text-slate-500 mt-4 max-w-md leading-relaxed">
                                Products, services, verified professionals, communities & franchise — India's integrated green ecosystem.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-6">
                                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-200">
                                    Explore Products <ArrowRight size={16} />
                                </Link>
                                <Link href="/services" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-colors">
                                    Book a Service <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                        <div className="relative hidden lg:flex items-center justify-center">
                            <div className="relative w-80 h-72">
                                <div className="absolute top-0 right-0 w-56 h-48 rounded-2xl overflow-hidden shadow-xl rotate-3 border-4 border-white">
                                    <Image src={productImages[0]} alt="Plant" fill className="object-cover" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-52 h-44 rounded-2xl overflow-hidden shadow-xl -rotate-2 border-4 border-white">
                                    <Image src={productImages[2]} alt="Garden" fill className="object-cover" />
                                </div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl rotate-1 border-4 border-white z-10">
                                    <Image src={productImages[1]} alt="Plant" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    // Slide 2 — Categories
    {
        id: 2,
        render: () => (
            <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(160deg, #e8f5e9 0%, #e0f2f1 50%, #f1f8e9 100%)' }}>
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-teal-200/30 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-lime-200/20 blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center py-8 relative z-10">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Browse by Category</h2>
                        <p className="text-base text-slate-500 mt-2">Find exactly what you need</p>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
                        {[
                            { name: 'Big Plant', icon: TreePine, href: '/products?category=Big+Plant', color: 'bg-emerald-500' },
                            { name: 'Bulbs', icon: Flower2, href: '/products?category=Bulbs', color: 'bg-pink-500' },
                            { name: 'Fruit Plant', icon: Sprout, href: '/products?category=Fruit+Plant', color: 'bg-amber-500' },
                            { name: 'Gardening', icon: Shovel, href: '/products?category=Gardening', color: 'bg-green-600' },
                            { name: 'Indoor Greenary', icon: Leaf, href: '/products?category=Indoor+Greenary', color: 'bg-teal-500' },
                            { name: 'Planters', icon: Package, href: '/products?category=Planters', color: 'bg-orange-500' },
                            { name: 'Plants', icon: Sprout, href: '/products?category=Plants', color: 'bg-lime-600' },
                            { name: 'Seeds', icon: Flower2, href: '/products?category=Seeds', color: 'bg-yellow-500' },
                            { name: 'Soil & Fertilizers', icon: FlaskConical, href: '/products?category=Soil+%26+Fertilizers', color: 'bg-amber-700' },
                        ].map((cat, i) => (
                            <Link key={i} href={cat.href} className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-xl hover:shadow-lg hover:scale-105 transition-all group">
                                <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                                    <cat.icon size={22} className="text-white" />
                                </div>
                                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // Slide 3 — Services
    {
        id: 3,
        render: () => (
            <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 50%, #e8eaf6 100%)' }}>
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-blue-200/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-200/30 blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-indigo-200/20 blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center py-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                        <div className="flex flex-col justify-center">
                            <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">24/7 Available</p>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
                                Professional<br />Home & Garden<br /><span className="text-blue-600">Services</span>
                            </h2>
                            <p className="text-base text-slate-500 mt-3 max-w-sm">From plant care to home repairs — book trusted professionals in minutes.</p>
                            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-blue-200 mt-5 w-fit">
                                View All Services <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: Droplets, name: 'Plant Watering' },
                                { icon: Scissors, name: 'Lawn Mowing' },
                                { icon: Building, name: 'Housekeeping' },
                                { icon: Hammer, name: 'Plumbing' },
                                { icon: Zap, name: 'Electrical' },
                                { icon: Sparkles, name: 'Deep Cleaning' },
                            ].map((s, i) => (
                                <Link key={i} href="/services" className="flex flex-col items-center gap-2 p-4 bg-white/80 backdrop-blur rounded-xl hover:bg-white hover:shadow-lg transition-all group">
                                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                        <s.icon size={22} className="text-blue-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700 text-center">{s.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    // Slide 4 — Experts
    {
        id: 4,
        render: () => (
            <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(160deg, #fff8e1 0%, #fff3e0 50%, #fce4ec 100%)' }}>
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-200/30 blur-3xl" />
                <div className="absolute top-1/2 left-1/3 w-56 h-56 rounded-full bg-yellow-200/20 blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center py-8 relative z-10">
                    <div className="text-center mb-6">
                        <p className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-2">Premium</p>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800">Expert Services</h2>
                        <p className="text-base text-slate-500 mt-2">Connect with verified professionals</p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: Compass, label: 'Landscape Architects', sub: 'Custom garden design', bg: 'bg-[#e8f5e9]', iconBg: 'bg-[#2e7d32]', href: '/services' },
                            { icon: Bot, label: 'Plant Doctor AI', sub: 'Instant diagnosis', bg: 'bg-[#fff8e1]', iconBg: 'bg-[#f9a825]', href: '/services' },
                            { icon: CalendarCheck, label: 'Onsite Agronomist', sub: 'Farm consultation', bg: 'bg-[#e0f2f1]', iconBg: 'bg-[#00897b]', href: '/services' },
                            { icon: BadgeCheck, label: 'Garden Contractors', sub: 'Verified & rated', bg: 'bg-[#e8f5e9]', iconBg: 'bg-[#388e3c]', href: '/services' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className={`${item.bg} rounded-2xl p-5 hover:shadow-lg transition-all group relative overflow-hidden`}>
                                <div className={`absolute top-4 right-4 w-10 h-10 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                                    <item.icon size={20} className="text-white" />
                                </div>
                                <p className="text-base font-bold text-slate-800 pr-14">{item.label}</p>
                                <p className="text-sm text-slate-500 mt-1">{item.sub}</p>
                                <span className="text-sm font-semibold text-slate-600 group-hover:text-emerald-600 transition-colors flex items-center gap-1 mt-4">
                                    Explore <ArrowRight size={14} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    // Slide 5 — Trust & CTA
    {
        id: 5,
        render: () => (
            <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a2332 0%, #0f172a 50%, #1e293b 100%)' }}>
                <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl" />
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full py-8">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                                India's Green<br />Ecosystem.<br />
                                <span className="text-emerald-400">One Platform.</span>
                            </h2>
                            <p className="text-base text-slate-400 mt-3 max-w-md">Buy plants, hire experts, list properties, and grow with India's largest green marketplace community.</p>
                            <div className="flex flex-wrap gap-3 mt-6">
                                <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/30">
                                    Get Started <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-it-works" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/20 transition-colors backdrop-blur">
                                    How It Works
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: ShieldCheck, label: 'Vetted Vendors', value: '500+' },
                                { icon: Truck, label: 'Cities Covered', value: '50+' },
                                { icon: Leaf, label: 'Plants Delivered', value: '10K+' },
                                { icon: Star, label: 'Happy Customers', value: '5K+' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                                    <stat.icon size={28} className="text-emerald-400 mx-auto mb-2" />
                                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                                    <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
]

const Carousel = () => {
    const [current, setCurrent] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [])
    const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [])

    useEffect(() => {
        if (isPaused) return
        const timer = setInterval(next, 5000)
        return () => clearInterval(timer)
    }, [isPaused, next])

    return (
        <div
            className="relative w-full rounded-2xl overflow-hidden shadow-lg"
            onMouseEnter={() => { setIsPaused(true); setIsHovered(true) }}
            onMouseLeave={() => { setIsPaused(false); setIsHovered(false) }}
            style={{ aspectRatio: '16/7' }}
        >
            {/* Slides */}
            <div className="relative w-full h-full">
                {slides.map((slide, i) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {slide.render()}
                    </div>
                ))}
            </div>

            {/* Arrows — faded by default, visible on hover */}
            <button
                onClick={prev}
                className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur ${
                    isHovered
                        ? 'bg-white/90 hover:bg-white shadow-lg text-slate-700 hover:text-slate-900'
                        : 'bg-slate-400/20 text-slate-400/40'
                }`}
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={next}
                className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur ${
                    isHovered
                        ? 'bg-white/90 hover:bg-white shadow-lg text-slate-700 hover:text-slate-900'
                        : 'bg-slate-400/20 text-slate-400/40'
                }`}
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === current ? 'w-6 bg-emerald-600' : 'w-1.5 bg-slate-400/50 hover:bg-slate-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel

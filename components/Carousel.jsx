'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Sprout, TreePine, Flower2, Leaf, Shovel, FlaskConical, Package, Home as HomeIcon, ArrowRight, Truck, ShieldCheck, Star, Compass, Bot, CalendarCheck, BadgeCheck, Droplets, Scissors, Hammer, Zap, Sparkles, Building, Wrench, Fence } from 'lucide-react'
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

const slidePad = 'px-12 sm:px-14 md:px-12 lg:px-20'

function CategorySlide() {
    const [hoveredIdx, setHoveredIdx] = useState(null)
    const cards = [
        { name: 'Plants', icon: Leaf, href: '/products?category=Plants', color: 'bg-emerald-500' },
        { name: 'Garden Tools', icon: Wrench, href: '/products?category=Gardening', color: 'bg-lime-500' },
        { name: 'Farmhouses', icon: HomeIcon, href: '/properties', color: 'bg-orange-500' },
        { name: 'Landscaping', icon: Scissors, href: '/services', color: 'bg-emerald-600' },
        { name: 'Fertilizers', icon: FlaskConical, href: '/products?category=Soil+%26+Fertilizers', color: 'bg-lime-600' },
    ]
    return (
        <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(160deg, #e8f5e9 0%, #e0f2f1 50%, #f1f8e9 100%)' }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-teal-200/30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-lime-200/20 blur-3xl" />

            <div className={`max-w-7xl mx-auto ${slidePad} h-full flex flex-col py-4 sm:py-5 relative z-10`}>
                <div className="text-center shrink-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800">Browse by Category</h1>
                    <p className="text-sm sm:text-base text-slate-500 mt-1">Find exactly what you need</p>
                </div>

                <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0">
                    {/* Compact cards — same look, no overlap (phones / tablets) */}
                    <div className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg">
                        {cards.map((cat, i) => (
                            <Link
                                key={i}
                                href={cat.href}
                                className={`flex items-center gap-3 bg-white rounded-3xl shadow-lg p-3 sm:p-4 group ${i === 4 ? 'col-span-2 sm:col-span-1 max-w-[calc(50%-0.375rem)] sm:max-w-none mx-auto w-full' : ''}`}
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                                    <cat.icon size={28} className="text-white" />
                                </div>
                                <span className="text-sm sm:text-base font-bold text-slate-700 leading-tight">{cat.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Original overlapping fan — desktop */}
                    <div className="hidden lg:flex items-center" style={{ marginLeft: 'calc(50% - 360px)' }}>
                        {cards.map((cat, i) => {
                            const isHovered = hoveredIdx === i
                            const isMiddle = i === 2
                            const iconRight = i >= 3
                            return (
                                <Link
                                    key={i}
                                    href={cat.href}
                                    onMouseEnter={() => setHoveredIdx(i)}
                                    onMouseLeave={() => setHoveredIdx(null)}
                                    className={`relative flex items-center gap-4 bg-white rounded-3xl shadow-lg transition-all duration-300 group ${iconRight ? 'flex-row-reverse' : ''}`}
style={{
                                        padding: isHovered ? '24px 24px 24px 24px' : '24px 64px 24px 24px',
                                        marginLeft: isHovered ? 0 : -100,
                                        zIndex: isHovered ? 60 : isMiddle ? 50 : i === 1 || i === 3 ? 10 : 1,
                                        boxShadow: isHovered || isMiddle ? '0 25px 50px -12px rgba(0,0,0,0.25)' : undefined,
                                    }}
                                >
                                    <div className={`w-20 h-20 shrink-0 ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                                        <cat.icon size={36} className="text-white" />
                                    </div>
                                    <span className="text-lg font-bold text-slate-700 text-center leading-tight whitespace-nowrap">{cat.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

const slides = [
    // Slide 1 — Hero
    {
        id: 1,
        render: () => (
            <div className="relative w-full h-full overflow-hidden">
                <img src="/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                <div className={`max-w-7xl mx-auto ${slidePad} h-full flex items-center relative z-10`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full py-6 sm:py-8 lg:py-0">
                        <div className="flex flex-col justify-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                                Shop, Hire Experts &<br />Grow —<br />
                                <span className="text-emerald-300">All in One Place.</span>
                            </h1>
                            <p className="text-sm sm:text-base text-white/80 mt-3 sm:mt-4 max-w-md leading-relaxed drop-shadow">
                                Products, services, verified professionals, communities & franchise — India's integrated green ecosystem.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-5 sm:mt-6">
                                <Link href="/products" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-900/30">
                                    Explore Products <ArrowRight size={16} />
                                </Link>
                                <Link href="/services" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 bg-white/90 hover:bg-white text-slate-800 text-sm font-semibold rounded-xl border border-white/50 transition-colors shadow-lg">
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
        render: () => <CategorySlide />,
    },
    // Slide 3 — Services
    {
        id: 3,
        render: () => (
            <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 50%, #e0f2f1 100%)' }}>
                <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-teal-200/30 blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-lime-200/20 blur-3xl" />

                <div className={`max-w-7xl mx-auto ${slidePad} h-full flex flex-col py-5 sm:py-6 lg:py-8 relative z-10`}>
                    <div className="text-center mb-3 sm:mb-5 shrink-0">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800">Our Services</h2>
                        <p className="text-sm sm:text-base text-slate-500 mt-1 sm:mt-2">Trusted professionals at your doorstep</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-2.5 sm:gap-3 min-h-0">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-3xl">
                            {[
                                { icon: Droplets, name: 'Plant Watering', href: '/services' },
                                { icon: Scissors, name: 'Lawn Mowing', href: '/services' },
                                { icon: Building, name: 'Housekeeping', href: '/services' },
                                { icon: Hammer, name: 'Plumbing', href: '/services' },
                            ].map((s, i) => (
                                <Link key={i} href={s.href} className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 bg-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all group">
                                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                        <s.icon size={22} className="text-white sm:hidden" />
                                        <s.icon size={26} className="text-white hidden sm:block" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-bold text-slate-700 text-center leading-tight">{s.name}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-3xl">
                            {[
                                { icon: Zap, name: 'Electrical', href: '/services' },
                                { icon: Sparkles, name: 'Deep Cleaning', href: '/services' },
                                { icon: Leaf, name: 'Garden Maintenance', href: '/services' },
                            ].map((s, i) => (
                                <Link key={i} href={s.href} className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 bg-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all group">
                                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                                        <s.icon size={22} className="text-white sm:hidden" />
                                        <s.icon size={26} className="text-white hidden sm:block" />
                                    </div>
                                    <span className="text-xs sm:text-sm font-bold text-slate-700 text-center leading-tight">{s.name}</span>
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
            <div className="relative w-full h-full overflow-hidden" style={{ background: 'linear-gradient(160deg, #f1f8e9 0%, #e8f5e9 50%, #e0f2f1 100%)' }}>
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-200/30 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-teal-200/30 blur-3xl" />
                <div className="absolute top-1/2 left-1/3 w-56 h-56 rounded-full bg-lime-200/20 blur-3xl" />

                <div className={`max-w-7xl mx-auto ${slidePad} h-full flex items-center py-5 sm:py-6 lg:py-8 relative z-10`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-10 w-full">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-800 leading-tight">
                                Book Trusted <span className="text-emerald-600">Experts</span> for Any Job
                            </h2>
                            <p className="text-sm sm:text-base lg:text-lg text-slate-500 mt-2 sm:mt-4 max-w-md">
                                From landscape architects to plant doctors — connect with verified professionals who deliver quality results.
                            </p>
                            <Link href="/services" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-200 mt-4 sm:mt-6 w-fit">
                                Explore All <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                            {[
                                { icon: Compass, label: 'Landscape Architects', sub: 'Custom garden design', color: 'bg-emerald-500', href: '/services' },
                                { icon: Bot, label: 'Plant Doctor AI', sub: 'Instant diagnosis', color: 'bg-teal-500', href: '/services' },
                                { icon: CalendarCheck, label: 'Onsite Agronomist', sub: 'Farm consultation', color: 'bg-emerald-600', href: '/services' },
                                { icon: BadgeCheck, label: 'Garden Contractors', sub: 'Verified & rated', color: 'bg-lime-600', href: '/services' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-5 bg-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all group">
                                    <div className={`w-11 h-11 sm:w-14 sm:h-14 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                                        <item.icon size={22} className="text-white sm:hidden" />
                                        <item.icon size={26} className="text-white hidden sm:block" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-xs sm:text-sm font-bold text-slate-700 leading-tight block">{item.label}</span>
                                        <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1 block">{item.sub}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
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

                <div className={`max-w-7xl mx-auto ${slidePad} h-full flex items-center relative z-10`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 w-full py-5 sm:py-8">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                                India's Green<br />Ecosystem.<br />
                                <span className="text-emerald-400">One Platform.</span>
                            </h2>
                            <p className="text-sm sm:text-base text-slate-400 mt-2 sm:mt-3 max-w-md">Buy plants, hire experts, list properties, and grow with India's largest green marketplace community.</p>
                            <div className="flex flex-wrap gap-3 mt-4 sm:mt-6">
                                <Link href="/products" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-emerald-500/30">
                                    Get Started <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-it-works" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/20 transition-colors backdrop-blur">
                                    How It Works
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                            {[
                                { icon: ShieldCheck, label: 'Vetted Vendors', value: '500+' },
                                { icon: Truck, label: 'Cities Covered', value: '50+' },
                                { icon: Leaf, label: 'Plants Delivered', value: '10K+' },
                                { icon: Star, label: 'Happy Customers', value: '5K+' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-3 sm:p-5 text-center hover:bg-white/10 transition-colors">
                                    <stat.icon size={22} className="text-emerald-400 mx-auto mb-1.5 sm:mb-2 sm:hidden" />
                                    <stat.icon size={28} className="text-emerald-400 mx-auto mb-2 hidden sm:block" />
                                    <p className="text-xl sm:text-2xl font-extrabold text-white">{stat.value}</p>
                                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5 sm:mt-1">{stat.label}</p>
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
            className="relative w-full rounded-2xl overflow-hidden shadow-lg h-[520px] sm:h-[480px] md:h-[500px] lg:h-auto lg:aspect-[16/7]"
            onMouseEnter={() => { setIsPaused(true); setIsHovered(true) }}
            onMouseLeave={() => { setIsPaused(false); setIsHovered(false) }}
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

            {/* Arrows — faded by default, visible on hover; always readable on touch */}
            <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className={`absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur ${
                    isHovered
                        ? 'bg-white/90 hover:bg-white shadow-lg text-slate-700 hover:text-slate-900'
                        : 'bg-white/70 text-slate-600 shadow-md lg:bg-slate-400/20 lg:text-slate-400/40 lg:shadow-none'
                }`}
            >
                <ChevronLeft size={18} className="sm:hidden" />
                <ChevronLeft size={20} className="hidden sm:block" />
            </button>
            <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur ${
                    isHovered
                        ? 'bg-white/90 hover:bg-white shadow-lg text-slate-700 hover:text-slate-900'
                        : 'bg-white/70 text-slate-600 shadow-md lg:bg-slate-400/20 lg:text-slate-400/40 lg:shadow-none'
                }`}
            >
                <ChevronRight size={18} className="sm:hidden" />
                <ChevronRight size={20} className="hidden sm:block" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
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

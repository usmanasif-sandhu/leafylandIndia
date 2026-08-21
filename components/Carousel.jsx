'use client'
import { useState, useEffect, useCallback } from 'react'
import {
    ChevronLeft, ChevronRight, Leaf, FlaskConical, Home as HomeIcon, ArrowRight,
    Truck, ShieldCheck, Star, Compass, Bot, CalendarCheck, BadgeCheck,
    Droplets, Scissors, Wrench,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const productImages = [
    'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&h=400&fit=crop',
]

const THEME = 'linear-gradient(145deg, #043b2e 0%, #065f46 52%, #047857 100%)'
const pad = 'px-5 sm:px-10 md:px-14 lg:px-20'

function Glow() {
    return (
        <>
            <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-lime-300/10 blur-3xl pointer-events-none" />
        </>
    )
}

function Tile({ href, icon: Icon, title }) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center justify-center gap-1.5 sm:gap-2.5 bg-white rounded-2xl px-2 py-3 sm:p-5 min-h-[88px] sm:min-h-[120px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
            <span className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </span>
            <span className="text-[10px] sm:text-sm font-semibold text-slate-700 text-center leading-snug line-clamp-2">
                {title}
            </span>
        </Link>
    )
}

function DarkSlide({ children }) {
    return (
        <div className="relative w-full h-full overflow-hidden" style={{ background: THEME }}>
            <Glow />
            <div className={`relative z-10 h-full ${pad} pt-5 pb-12 sm:pt-8 sm:pb-14 flex flex-col`}>
                {children}
            </div>
        </div>
    )
}

const slides = [
    {
        id: 1,
        render: () => (
            <div className="relative w-full h-full overflow-hidden">
                <img src="/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />
                <div className={`relative z-10 h-full ${pad} flex items-center pt-4 pb-12`}>
                    <div className="w-full max-w-xl">
                        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-emerald-300 mb-2">
                            LeafyLand
                        </p>
                        <h1 className="text-[1.35rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug">
                            Shop, hire experts & grow —{' '}
                            <span className="text-emerald-300">all in one place</span>
                        </h1>
                        <p className="mt-2 sm:mt-3 text-xs sm:text-base text-white/80 max-w-md leading-relaxed">
                            Plants, services, and properties across India’s green marketplace.
                        </p>
                        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-sm">
                            <Link href="/products" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-colors">
                                Explore products <ArrowRight size={15} />
                            </Link>
                            <Link href="/services" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold rounded-xl border border-white/25 transition-colors">
                                Book a service
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-1 justify-end">
                        <div className="relative w-72 h-64">
                            <div className="absolute top-0 right-0 w-52 h-44 rounded-2xl overflow-hidden shadow-xl rotate-2 border-4 border-white/90">
                                <Image src={productImages[0]} alt="" fill className="object-cover" />
                            </div>
                            <div className="absolute bottom-0 left-4 w-48 h-40 rounded-2xl overflow-hidden shadow-xl -rotate-2 border-4 border-white/90">
                                <Image src={productImages[2]} alt="" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 2,
        render: () => (
            <DarkSlide>
                <div className="text-center shrink-0 mb-3 sm:mb-6">
                    <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-white">Browse by category</h2>
                    <p className="text-[11px] sm:text-sm text-emerald-200/90 mt-1">Plants, garden & property</p>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-4 content-center max-w-3xl mx-auto w-full min-h-0">
                    <Tile href="/products?category=Plants" icon={Leaf} title="Plants" />
                    <Tile href="/products?category=Gardening" icon={Wrench} title="Garden tools" />
                    <Tile href="/properties" icon={HomeIcon} title="Farmhouses" />
                    <Tile href="/services" icon={Scissors} title="Landscaping" />
                    <Tile href="/products?category=Soil+%26+Fertilizers" icon={FlaskConical} title="Fertilizers" />
                    <Tile href="/products?category=Gardening" icon={Droplets} title="Irrigation" />
                </div>
            </DarkSlide>
        ),
    },
    {
        id: 3,
        render: () => (
            <DarkSlide>
                <div className="text-center shrink-0 mb-3 sm:mb-6">
                    <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-white">Our services</h2>
                    <p className="text-[11px] sm:text-sm text-emerald-200/90 mt-1">Professionals at your doorstep</p>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-2 sm:gap-4 content-center max-w-3xl mx-auto w-full min-h-0">
                    <Tile href="/services" icon={Droplets} title="Plant watering" />
                    <Tile href="/services" icon={Scissors} title="Lawn mowing" />
                    <Tile href="/services" icon={Leaf} title="Garden care" />
                    <Tile href="/services" icon={Wrench} title="Irrigation setup" />
                    <Tile href="/services" icon={HomeIcon} title="Landscape design" />
                    <Tile href="/services" icon={FlaskConical} title="Soil & nutrition" />
                </div>
            </DarkSlide>
        ),
    },
    {
        id: 4,
        render: () => (
            <DarkSlide>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-8 h-full min-h-0">
                    <div className="flex flex-col justify-center text-center lg:text-left">
                        <h2 className="text-lg sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
                            Book trusted <span className="text-emerald-300">experts</span>
                        </h2>
                        <p className="hidden sm:block text-sm text-emerald-100/80 mt-3 max-w-md mx-auto lg:mx-0">
                            Verified landscape architects, agronomists, and garden contractors.
                        </p>
                        <Link href="/services" className="mt-3 sm:mt-5 inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-emerald-800 text-sm font-semibold rounded-xl w-fit mx-auto lg:mx-0 hover:bg-emerald-50 transition-colors">
                            Explore all <ArrowRight size={15} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 content-center min-h-0">
                        <Tile href="/services" icon={Compass} title="Landscape architects" />
                        <Tile href="/services" icon={Bot} title="Plant doctor AI" />
                        <Tile href="/services" icon={CalendarCheck} title="Onsite agronomist" />
                        <Tile href="/services" icon={BadgeCheck} title="Garden contractors" />
                    </div>
                </div>
            </DarkSlide>
        ),
    },
    {
        id: 5,
        render: () => (
            <DarkSlide>
                <div className="flex flex-col justify-center h-full min-h-0 gap-3 sm:gap-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="text-center lg:text-left shrink-0">
                        <h2 className="text-base sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
                            India’s green ecosystem.{' '}
                            <span className="text-emerald-300">One platform.</span>
                        </h2>
                        <p className="hidden sm:block mt-2 text-sm text-emerald-100/80 max-w-md mx-auto lg:mx-0">
                            Buy plants, hire experts, and list properties with a trusted community.
                        </p>
                        <Link href="/products" className="mt-2.5 sm:mt-5 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold rounded-xl w-fit mx-auto lg:mx-0 transition-colors">
                            Get started <ArrowRight size={15} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-4 lg:grid-cols-2 gap-1.5 sm:gap-3">
                        {[
                            { icon: ShieldCheck, label: 'Vendors', value: '500+' },
                            { icon: Truck, label: 'Cities', value: '50+' },
                            { icon: Leaf, label: 'Plants', value: '10K+' },
                            { icon: Star, label: 'Customers', value: '5K+' },
                        ].map((stat) => (
                            <div key={stat.label} className="rounded-xl sm:rounded-2xl border border-white/15 bg-white/10 px-1 py-2 sm:p-5 text-center">
                                <stat.icon className="hidden sm:block w-6 h-6 text-emerald-300 mx-auto mb-1" />
                                <p className="text-sm sm:text-2xl font-bold text-white leading-none">{stat.value}</p>
                                <p className="text-[9px] sm:text-xs text-emerald-100/80 leading-tight mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </DarkSlide>
        ),
    },
]

const Carousel = () => {
    const [current, setCurrent] = useState(0)
    const [paused, setPaused] = useState(false)
    const [touchX, setTouchX] = useState(null)

    const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [])
    const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [])

    useEffect(() => {
        if (paused) return
        const timer = setInterval(next, 6000)
        return () => clearInterval(timer)
    }, [paused, next])

    return (
        <div
            className="relative w-full rounded-2xl overflow-hidden shadow-md h-[340px] sm:h-[430px] md:h-[500px] lg:h-[min(72vh,640px)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
                if (touchX == null) return
                const dx = e.changedTouches[0].clientX - touchX
                if (dx > 40) prev()
                if (dx < -40) next()
                setTouchX(null)
            }}
        >
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                >
                    {slide.render()}
                </div>
            ))}

            <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className="absolute left-1.5 sm:left-3 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/90 text-slate-700 shadow-sm flex items-center justify-center hover:bg-white transition-colors bottom-2.5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className="absolute right-1.5 sm:right-3 z-20 w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-white/90 text-slate-700 shadow-sm flex items-center justify-center hover:bg-white transition-colors bottom-2.5 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all ${i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel

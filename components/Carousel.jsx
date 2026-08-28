'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { brandPrimaryCtaClass, BRAND_GREEN } from '@/lib/brand-ui'

const BRAND = {
    green: BRAND_GREEN,
}

const slides = [
    {
        id: 1,
        badge: 'Garden essentials',
        title: 'Everything for your green space',
        subtitle: 'Plants, seeds, planters, tools & soil — curated for home gardeners.',
        cta: 'Shop gardening',
        href: '/products',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&h=420&fit=crop',
    },
    {
        id: 2,
        badge: 'Book a service',
        title: 'Expert care at your doorstep',
        subtitle: 'Landscaping, plant care, irrigation & trusted home services.',
        cta: 'Browse services',
        href: '/services',
        image: 'https://images.unsplash.com/photo-1592417817097-1252478754470?w=1400&h=420&fit=crop',
    },
    {
        id: 3,
        badge: 'Find land & homes',
        title: 'Farmhouses, plots & green retreats',
        subtitle: 'Discover farmhouses, agricultural land & property listings across India.',
        cta: 'Explore properties',
        href: '/properties',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=420&fit=crop',
    },
    {
        id: 4,
        badge: 'Marketplace',
        title: 'Sports, electronics & everyday deals',
        subtitle: 'Classifieds and marketplace finds — from gadgets to sports gear.',
        cta: 'Shop marketplace',
        href: '/shop',
        image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&h=420&fit=crop',
    },
]

function HeroSlide({ badge, title, subtitle, cta, href, image }) {
    return (
        <div className="relative w-full h-full overflow-hidden">
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/25 sm:via-white/70 sm:to-transparent" />
            <div className="relative z-10 h-full flex items-center px-5 sm:px-8 md:px-12 lg:px-14">
                <div className="max-w-md sm:max-w-lg md:max-w-xl">
                    <p
                        className="text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: BRAND.green }}
                    >
                        {badge}
                    </p>
                    <h2 className="mt-1.5 sm:mt-2 text-lg sm:text-2xl md:text-3xl lg:text-[2rem] font-bold text-slate-800 leading-snug">
                        {title}
                    </h2>
                    <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm md:text-base text-slate-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {subtitle}
                    </p>
                    <Link
                        href={href}
                        className={`mt-2.5 sm:mt-4 ${brandPrimaryCtaClass}`}
                        style={{ backgroundColor: BRAND.green }}
                    >
                        {cta}
                    </Link>
                </div>
            </div>
        </div>
    )
}

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
            className="relative w-full rounded-xl overflow-hidden shadow-sm h-[200px] sm:h-[260px] md:h-[300px] lg:h-[340px]"
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
                    <HeroSlide {...slide} />
                </div>
            ))}

            <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className="absolute left-2 sm:left-3 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 text-slate-600 shadow-sm flex items-center justify-center hover:bg-white transition-colors top-1/2 -translate-y-1/2"
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className="absolute right-2 sm:right-3 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 text-slate-600 shadow-sm flex items-center justify-center hover:bg-white transition-colors top-1/2 -translate-y-1/2"
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all ${i === current ? 'w-2 h-2' : 'w-2 h-2 bg-slate-400/70'}`}
                        style={i === current ? { backgroundColor: BRAND.green } : undefined}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel

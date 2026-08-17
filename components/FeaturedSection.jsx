'use client'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useRef } from 'react'
import Link from 'next/link'

const FeaturedSection = ({ title, items, renderItem, viewAllLink, viewAllText = "See All" }) => {
    const scrollRef = useRef(null)

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 280
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="py-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800">{title}</h2>
                <div className="flex items-center gap-2">
                    {viewAllLink && (
                        <Link href={viewAllLink} className="text-emerald-600 text-sm font-semibold hover:text-emerald-700 flex items-center gap-1">
                            {viewAllText} <ChevronRight size={16} />
                        </Link>
                    )}
                    <button onClick={() => scroll('left')} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition hidden sm:block">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => scroll('right')} className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition hidden sm:block">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
            >
                {items.map((item, i) => (
                    <div key={item.id || i} className="flex-shrink-0">
                        {renderItem(item)}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedSection

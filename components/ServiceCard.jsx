'use client'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const ServiceCard = ({ service }) => {
    const currency = '₹'
    const rating = service.rating?.length
        ? Math.round(service.rating.reduce((acc, r) => acc + r.rating, 0) / service.rating.length)
        : 0

    return (
        <Link href={`/services/${service.id}`} className="group block w-56 sm:w-60">
            <div className="bg-slate-50 rounded-2xl overflow-hidden relative">
                <div className="aspect-[4/3] overflow-hidden">
                    <Image
                        width={240}
                        height={180}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src={service.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=240&h=180&fit=crop'}
                        alt={service.name}
                    />
                </div>
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {service.category}
                </span>
            </div>
            <div className="pt-2.5 px-1">
                <p className="text-sm font-medium text-slate-800 truncate">{service.name}</p>
                <p className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <MapPin size={11} /> {service.location}
                </p>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-slate-800">From {currency}{service.startingPrice.toLocaleString()}</p>
                    {rating > 0 && (
                        <div className="flex items-center gap-0.5">
                            <Star size={11} fill="#059669" className="text-emerald-600" />
                            <span className="text-[11px] text-slate-600 font-medium">{rating}</span>
                        </div>
                    )}
                </div>
                <button className="mt-2 w-full flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition active:scale-95">
                    Get a Quote <ArrowRight size={12} />
                </button>
            </div>
        </Link>
    )
}

export default ServiceCard

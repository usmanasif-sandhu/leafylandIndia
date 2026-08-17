'use client'
import { MapPin, Maximize, BedDouble } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PropertyCard = ({ property }) => {
    const currency = '₹'

    return (
        <Link href={`/properties/${property.id}`} className="group block w-52 sm:w-56 flex-shrink-0">
            <div className="relative bg-slate-50 rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                    width={224}
                    height={168}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=224&h=168&fit=crop'}
                    alt={property.title}
                />
                <span className={`absolute top-2 left-2 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md ${property.type === 'SALE' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                    {property.type === 'SALE' ? 'FOR SALE' : 'FOR RENT'}
                </span>
                <button className="absolute bottom-2 right-2 bg-white/90 hover:bg-amber-500 hover:text-white text-amber-700 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md transition-all active:scale-95 border border-amber-200 hover:border-amber-500">
                    ENQUIRE
                </button>
            </div>
            <div className="pt-2 px-0.5">
                <p className="text-sm font-bold text-slate-800 truncate">{property.title}</p>
                <p className="flex items-center gap-1 text-slate-500 text-[11px] mt-0.5">
                    <MapPin size={10} /> {property.location}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                        <Maximize size={9} /> {property.area}
                    </span>
                    <span className="flex items-center gap-0.5 text-[10px] text-slate-500">
                        <BedDouble size={9} /> {property.listingType}
                    </span>
                </div>
                <p className="text-sm font-bold text-slate-800 mt-1">
                    {currency}{property.price.toLocaleString()}
                    {property.type === 'RENT' && <span className="text-[10px] font-normal text-slate-500">/mo</span>}
                </p>
            </div>
        </Link>
    )
}

export default PropertyCard

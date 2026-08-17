'use client'
import { MapPin, BedDouble, Maximize } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const PropertyCard = ({ property }) => {
    const currency = '₹'

    return (
        <Link href={`/properties/${property.id}`} className="group block w-60 sm:w-64">
            <div className="bg-slate-50 rounded-2xl overflow-hidden relative">
                <div className="aspect-[4/3] overflow-hidden">
                    <Image
                        width={256}
                        height={192}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=256&h=192&fit=crop'}
                        alt={property.title}
                    />
                </div>
                <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-md ${property.type === 'SALE' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                    {property.type === 'SALE' ? 'FOR SALE' : 'FOR RENT'}
                </span>
            </div>
            <div className="pt-2.5 px-1">
                <p className="text-sm font-medium text-slate-800 truncate">{property.title}</p>
                <p className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <MapPin size={11} /> {property.location}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Maximize size={11} /> {property.area}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                        <BedDouble size={11} /> {property.listingType}
                    </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-slate-800">
                        {currency}{property.price.toLocaleString()}
                        {property.type === 'RENT' && <span className="text-xs font-normal text-slate-500">/mo</span>}
                    </p>
                </div>
                <button className="mt-2 w-full flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2 rounded-xl transition active:scale-95">
                    Contact Lister
                </button>
            </div>
        </Link>
    )
}

export default PropertyCard

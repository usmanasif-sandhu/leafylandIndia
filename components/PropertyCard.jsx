'use client'
import { MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PropertyCard = ({ property }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <Link href={`/property/${property.id}`} className='group max-xl:mx-auto'>
            <div className='bg-[#F5F5F5] h-40 sm:w-60 sm:h-44 rounded-lg flex items-center justify-center overflow-hidden'>
                <Image width={500} height={500} className='w-full h-full object-cover group-hover:scale-110 transition duration-300' src={property.images[0]} alt="" />
            </div>
            <div className='pt-2 text-sm text-slate-800 max-w-60'>
                <p className='font-medium truncate'>{property.title}</p>
                <p className='flex items-center gap-1 text-slate-500 text-xs mt-1'>
                    <MapPinIcon size={12} /> {property.location}
                </p>
                <p className='mt-1 font-semibold'>{currency}{property.price.toLocaleString()}</p>
            </div>
        </Link>
    )
}

export default PropertyCard
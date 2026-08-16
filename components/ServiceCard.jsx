'use client'
import { MapPinIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ServiceCard = ({ service }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const rating = service.rating?.length
        ? Math.round(service.rating.reduce((acc, r) => acc + r.rating, 0) / service.rating.length)
        : 0

    return (
        <Link href={`/service/${service.id}`} className='group max-xl:mx-auto'>
            <div className='bg-[#F5F5F5] h-40 sm:w-60 sm:h-44 rounded-lg flex items-center justify-center overflow-hidden'>
                <Image width={500} height={500} className='w-full h-full object-cover group-hover:scale-110 transition duration-300' src={service.images[0]} alt="" />
            </div>
            <div className='pt-2 text-sm text-slate-800 max-w-60'>
                <p className='font-medium truncate'>{service.name}</p>
                <p className='flex items-center gap-1 text-slate-500 text-xs mt-1'>
                    <MapPinIcon size={12} /> {service.location}
                </p>
                <div className='flex items-center justify-between mt-1'>
                    <p className='font-semibold'>From {currency}{service.startingPrice.toLocaleString()}</p>
                    <div className='flex items-center gap-0.5 text-xs text-slate-500'>
                        <StarIcon size={12} fill="#00C950" className="text-transparent" /> {rating}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ServiceCard
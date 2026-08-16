'use client'
import { ArrowRightIcon, ChevronRightIcon, Leaf, Home as HomeIcon, Sprout } from 'lucide-react'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                <div className='relative flex-1 flex flex-col bg-green-200 rounded-3xl xl:min-h-100 group overflow-hidden'>
                    <div className='p-5 sm:p-16'>
                        <div className='inline-flex items-center gap-3 bg-green-300 text-green-700 pr-4 p-1 rounded-full text-xs sm:text-sm'>
                            <span className='bg-green-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>NEW</span> Now booking landscaping services <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-medium bg-gradient-to-r from-slate-700 to-green-600 bg-clip-text text-transparent max-w-xs sm:max-w-md'>
                            Land, plants, and everything in between.
                        </h2>
                        <p className='text-slate-700 text-sm sm:text-base mt-4 sm:mt-6 max-w-xs sm:max-w-sm'>
                            Buy plants and garden products, list or find farmhouses and land, and book trusted landscaping professionals — all in one marketplace.
                        </p>
                        <button className='bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition'>EXPLORE LEAFYLAND</button>
                    </div>
                    {/* Placeholder hero visual — swap for real photography (garden/farmhouse/plants) once available */}
                    <div className='sm:absolute bottom-0 right-0 md:right-10 flex items-end justify-center opacity-90'>
                        <Leaf className='w-40 h-40 sm:w-56 sm:h-56 text-green-600' strokeWidth={1} />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    <div className='flex-1 flex items-center justify-between w-full bg-orange-200 rounded-3xl p-6 px-8 group'>
                        <div>
                            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#FFAD51] bg-clip-text text-transparent max-w-40'>Farmhouses &amp; land</p>
                            <p className='flex items-center gap-1 mt-4'>Browse listings <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <HomeIcon className='w-16 h-16 text-orange-700/70' strokeWidth={1} />
                    </div>
                    <div className='flex-1 flex items-center justify-between w-full bg-blue-200 rounded-3xl p-6 px-8 group'>
                        <div>
                            <p className='text-3xl font-medium bg-gradient-to-r from-slate-800 to-[#78B2FF] bg-clip-text text-transparent max-w-40'>Garden services</p>
                            <p className='flex items-center gap-1 mt-4'>Book a pro <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} /> </p>
                        </div>
                        <Sprout className='w-16 h-16 text-blue-700/70' strokeWidth={1} />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>
    )
}

export default Hero
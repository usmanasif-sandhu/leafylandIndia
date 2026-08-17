'use client'
import { ArrowRight, ChevronRight, Leaf, Home as HomeIcon, Sprout, Search } from 'lucide-react'
import Link from 'next/link'
import { pillarCategories } from '@/assets/assets'

const Hero = () => {

    return (
        <div className="bg-gradient-to-b from-emerald-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8">
                {/* Pillar Cards — Zepto-style category entry */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
                    <Link href="/products" className="group bg-white border border-emerald-100 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg hover:border-emerald-300 transition-all">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-emerald-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                            <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">Products</p>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">Plants, tools & accessories</p>
                    </Link>
                    <Link href="/services" className="group bg-white border border-blue-100 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                            <Sprout className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">Services</p>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">Landscaping & design pros</p>
                    </Link>
                    <Link href="/properties" className="group bg-white border border-amber-100 rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg hover:border-amber-300 transition-all">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-amber-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition">
                            <HomeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
                        </div>
                        <p className="font-semibold text-slate-800 text-sm sm:text-base">Properties</p>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">Farmhouses & farmland</p>
                    </Link>
                </div>

                {/* Hero Banner — Zepto bold style */}
                <div className="relative bg-emerald-600 rounded-3xl overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="flex-1 p-8 sm:p-10 md:p-12 lg:p-14">
                            <div className="inline-flex items-center gap-2 bg-emerald-500/50 text-emerald-100 text-xs font-medium px-3 py-1 rounded-full mb-4">
                                <span className="bg-white text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold">NEW</span>
                                Now serving Mumbai, Pune & Delhi NCR
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                                Everything for your <br className="hidden sm:block" />
                                <span className="text-emerald-200">green space</span>
                            </h1>
                            <p className="text-emerald-100 text-sm sm:text-base mt-3 max-w-md">
                                Plants, garden tools, landscaping services, farmland & farmhouses — buy, book, or browse in one marketplace.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-6">
                                <Link href="/products" className="bg-white text-emerald-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition">
                                    Shop Plants
                                </Link>
                                <Link href="/services" className="border border-emerald-300 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-500 transition">
                                    Book a Service
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center p-8">
                            <div className="w-56 h-56 lg:w-64 lg:h-64 bg-emerald-500 rounded-full flex items-center justify-center">
                                <Leaf className="w-32 h-32 lg:w-40 lg:h-40 text-emerald-200" strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-category strip — Zepto horizontal scrollable icons */}
                <div className="mt-8">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        {pillarCategories.map((cat, i) => {
                            const Icon = cat.icon
                            return (
                                <Link
                                    key={i}
                                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                                    className="flex-shrink-0 flex flex-col items-center gap-2 w-20 sm:w-24"
                                >
                                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${cat.color} hover:scale-105 transition`}>
                                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                    <span className="text-[11px] sm:text-xs text-slate-600 text-center leading-tight">{cat.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero

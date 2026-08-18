'use client'
import { Menu, Bell, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const StoreNavbar = ({ onMenuToggle, storeInfo }) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30">
            {/* Left */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuToggle}
                    className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors lg:hidden"
                >
                    <Menu size={20} />
                </button>
                <Link href="/store" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="LeafyLand" width={120} height={30} className="h-7 w-auto object-contain" />
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full hidden sm:inline">Vendor</span>
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-emerald-700">
                            {storeInfo?.name?.charAt(0) || 'S'}
                        </span>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-semibold text-slate-700 leading-tight">{storeInfo?.name || 'Store'}</p>
                        <p className="text-[10px] text-slate-400">Vendor</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default StoreNavbar

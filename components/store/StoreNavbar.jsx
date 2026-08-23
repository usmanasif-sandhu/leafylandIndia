'use client'
import { useState } from 'react'
import { Menu, LogOut } from 'lucide-react'
import NotificationBell from '@/components/NotificationBell'
import Link from 'next/link'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { assets } from '@/assets/assets'
import StoreLogo from './StoreLogo'
import ConfirmLogoutModal from '@/components/ConfirmLogoutModal'

const StoreNavbar = ({ onMenuToggle, storeInfo }) => {
    const [showLogout, setShowLogout] = useState(false)
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
                    <Image src={assets.logo} alt="LeafyLand" width={120} height={30} className="h-7 w-auto object-contain" />
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full hidden sm:inline">Vendor</span>
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
                <NotificationBell />
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                    <StoreLogo src={storeInfo?.logo} name={storeInfo?.name} className="w-8 h-8 rounded-full text-xs" />
                    <div className="hidden sm:block">
                        <p className="text-xs font-semibold text-slate-700 leading-tight">{storeInfo?.name || 'Store'}</p>
                        <p className="text-[10px] text-slate-400">Vendor</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowLogout(true)}
                        className="inline-flex items-center gap-1.5 ml-1 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>

            <ConfirmLogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
        </header>
    )
}

export default StoreNavbar

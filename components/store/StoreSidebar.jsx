'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import {
    LayoutDashboard,
    Package,
    Plus,
    ShoppingCart,
    BarChart3,
    Star,
    Users,
    Wallet,
    Settings,
    MessageSquare,
    ExternalLink,
    AlertTriangle,
    Tag,
    Boxes,
} from 'lucide-react'

const navSections = [
    {
        label: 'Overview',
        items: [
            { name: 'Dashboard', href: '/store', icon: LayoutDashboard },
        ],
    },
    {
        label: 'Products',
        items: [
            { name: 'All Products', href: '/store/products', icon: Package },
            { name: 'Add Product', href: '/store/add-product', icon: Plus },
            { name: 'Inventory', href: '/store/inventory', icon: Boxes },
        ],
    },
    {
        label: 'Sales',
        items: [
            { name: 'Orders', href: '/store/orders', icon: ShoppingCart },
            { name: 'Customers', href: '/store/customers', icon: Users },
            { name: 'Coupons', href: '/store/coupons', icon: Tag },
        ],
    },
    {
        label: 'Insights',
        items: [
            { name: 'Analytics', href: '/store/analytics', icon: BarChart3 },
            { name: 'Reviews', href: '/store/reviews', icon: Star },
            { name: 'Payouts', href: '/store/payouts', icon: Wallet },
        ],
    },
        {
            label: 'Communication',
            items: [
                { name: 'Messages', href: '/store/messages', icon: MessageSquare },
            ],
        },
        {
            label: 'Account',
            items: [
                { name: 'Settings', href: '/store/settings', icon: Settings },
            ],
        },
]

const StoreSidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname()

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-30
                    flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo */}
                <div className="flex items-center gap-2 px-5 h-16 border-b border-slate-100 shrink-0">
                    <Image src={assets.logo} alt="LeafyLand" width={120} height={32} className="h-8 w-auto object-contain" />
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Vendor Panel</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 overflow-y-auto py-3 px-3">
                    {navSections.map((section) => (
                        <div key={section.label} className="mb-4">
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-4 mb-1.5">
                                {section.label}
                            </p>
                            {section.items.map((item) => {
                                const active = pathname === item.href
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className={`
                                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors mb-0.5
                                            ${active
                                                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        <item.icon size={18} />
                                        <span>{item.name}</span>
                                        {item.name === 'Messages' && (
                                            <span className="ml-auto bg-red-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                                2
                                            </span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-3 py-4 border-t border-slate-100 shrink-0">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        <ExternalLink size={18} />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </aside>
        </>
    )
}

export default StoreSidebar

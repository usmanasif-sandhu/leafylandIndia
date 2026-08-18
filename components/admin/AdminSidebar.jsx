'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    LayoutDashboard,
    Store,
    CheckCircle,
    Users,
    ShoppingBag,
    Package,
    Home,
    Wrench,
    Tag,
    ExternalLink,
    Leaf,
} from "lucide-react"

const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Stores", href: "/admin/stores", icon: Store },
    { name: "Approvals", href: "/admin/approve", icon: CheckCircle },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Properties", href: "/admin/properties", icon: Home },
    { name: "Services", href: "/admin/services", icon: Wrench },
    { name: "Coupons", href: "/admin/coupons", icon: Tag },
]

const AdminSidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname()

    return (
        <>
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
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex items-center gap-2 px-5 h-16 border-b border-slate-100 shrink-0">
                    <img
                        src="/logo.png"
                        alt="LeafyLand"
                        className="h-8 w-auto"
                    />
                </div>

                <nav className="flex-1 overflow-y-auto py-3 px-3">
                    {navItems.map((item) => {
                        const active = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors mb-0.5
                                    ${active
                                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                                        : "text-slate-600 hover:bg-slate-50"
                                    }
                                `}
                            >
                                <item.icon size={18} />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

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

export default AdminSidebar

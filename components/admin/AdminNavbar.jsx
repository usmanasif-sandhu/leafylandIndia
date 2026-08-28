'use client'

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { LogOut, Menu, Search } from "lucide-react"
import NotificationBell from "@/components/NotificationBell";
import ConfirmLogoutModal from "@/components/ConfirmLogoutModal";

const routeTitles = {
    "/admin": "Dashboard",
    "/admin/stores": "Stores",
    "/admin/approve": "Approvals",
    "/admin/users": "Users",
    "/admin/orders": "Orders",
    "/admin/products": "Products",
    "/admin/properties": "Properties",
    "/admin/services": "Services",
    "/admin/coupons": "Coupons",
}

const AdminNavbar = ({ onMenuToggle }) => {
    const [showLogout, setShowLogout] = useState(false)
    const pathname = usePathname()
    const { data: session } = useSession()
    const title = routeTitles[pathname] || "Dashboard"
    const initials = (session?.user?.name || "Admin")
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 z-20 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    <Menu size={20} />
                </button>
                <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 text-sm text-slate-500 w-56">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none flex-1 text-slate-700 placeholder:text-slate-400"
                    />
                </div>

                <NotificationBell />

                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                        {initials}
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full hidden sm:inline">
                        Admin
                    </span>
                    <button
                        type="button"
                        onClick={() => setShowLogout(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
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

export default AdminNavbar

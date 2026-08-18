'use client'
import { useState } from "react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            <AdminNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex flex-1 pt-16">
                <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto ml-0 lg:ml-64">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout

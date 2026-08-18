'use client'
import { useState } from 'react'
import StoreNavbar from './StoreNavbar'
import StoreSidebar from './StoreSidebar'
import { storeInfo } from '@/lib/data/vendor'

const StoreLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            <StoreNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} storeInfo={storeInfo} />
            <div className="flex flex-1 pt-16">
                <StoreSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto ml-0 lg:ml-64">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default StoreLayout

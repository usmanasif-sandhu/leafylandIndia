'use client'
import { useState } from 'react'
import StoreNavbar from './StoreNavbar'
import StoreSidebar from './StoreSidebar'
import { VendorStoreProvider, useVendorStore } from './VendorStoreContext'

function StoreShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { store } = useVendorStore()

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            <StoreNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} storeInfo={store} />
            <div className="flex flex-1">
                <StoreSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className="flex-1 p-4 lg:p-6 overflow-y-auto ml-0 lg:ml-64">
                    {children}
                </main>
            </div>
        </div>
    )
}

const StoreLayout = ({ children }) => (
    <VendorStoreProvider>
        <StoreShell>{children}</StoreShell>
    </VendorStoreProvider>
)

export default StoreLayout

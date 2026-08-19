'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const VendorStoreContext = createContext({
    store: null,
    loading: true,
    refresh: async () => {},
    setStore: () => {},
})

export function VendorStoreProvider({ children }) {
    const [store, setStore] = useState(null)
    const [loading, setLoading] = useState(true)

    const refresh = async () => {
        const res = await fetch('/api/vendor/settings', { cache: 'no-store' })
        const data = await res.json()
        if (res.ok && data && !data.error) setStore(data)
        setLoading(false)
        return data
    }

    useEffect(() => {
        refresh().catch(() => setLoading(false))
    }, [])

    return (
        <VendorStoreContext.Provider value={{ store, loading, refresh, setStore }}>
            {children}
        </VendorStoreContext.Provider>
    )
}

export function useVendorStore() {
    return useContext(VendorStoreContext)
}

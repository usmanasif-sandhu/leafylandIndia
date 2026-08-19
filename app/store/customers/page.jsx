'use client'
import { useEffect, useState } from 'react'
import { Search, Mail, Phone } from 'lucide-react'

export default function VendorCustomers() {
    const [search, setSearch] = useState('')
    const [vendorCustomers, setVendorCustomers] = useState([])

    useEffect(() => {
        fetch('/api/vendor/customers')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setVendorCustomers(data) })
    }, [])

    const filtered = vendorCustomers.filter(c =>
        (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.email || '').toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Store <span className="font-bold">Customers</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">{vendorCustomers.length} customers</p>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                />
            </div>

            {filtered.length === 0 ? (
                <p className="text-sm text-slate-500">No customers yet. They appear here after orders.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(customer => (
                        <div key={customer.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-emerald-700">{(customer.name || '?').charAt(0)}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-700">{customer.name || 'Customer'}</p>
                                    <p className="text-xs text-slate-500">{customer.city || '—'}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Mail size={12} className="text-slate-400" /> {customer.email || '—'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={12} className="text-slate-400" /> {customer.phone || '—'}
                                </div>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs">
                                <span className="text-slate-500"><span className="font-semibold text-slate-700">{customer.totalOrders}</span> orders</span>
                                <span className="font-semibold text-slate-700">₹{(customer.totalSpent || 0).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

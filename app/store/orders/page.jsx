'use client'
import { useEffect, useState } from 'react'
import { Search, Eye, ChevronDown } from 'lucide-react'
import StatusBadge from '@/components/admin/StatusBadge'
import toast from 'react-hot-toast'

export default function VendorOrders() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [vendorOrders, setVendorOrders] = useState([])

    useEffect(() => {
        fetch('/api/vendor/orders')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setVendorOrders(data) })
    }, [])
    const [selectedOrder, setSelectedOrder] = useState(null)

    const statuses = ['All', 'Processing', 'Shipped', 'Delivered']
    const filtered = vendorOrders.filter(o => {
        const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'All' || o.status === statusFilter
        return matchSearch && matchStatus
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Store <span className="font-bold">Orders</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">{vendorOrders.length} total orders</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search orders or customers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                    />
                </div>
                <div className="flex gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-xs font-medium transition ${
                                statusFilter === status
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm min-w-[700px]">
                        <thead>
                            <tr className="text-left text-slate-500 border-b border-slate-100">
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Order ID</th>
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Customer</th>
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Items</th>
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Amount</th>
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Payment</th>
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Status</th>
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Date</th>
                                <th className="px-2 py-2 sm:px-5 sm:py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(order => (
                                <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                    <td className="px-2 py-2 sm:px-5 sm:py-3 font-mono text-xs font-semibold text-slate-700">{order.id}</td>
                                    <td className="px-2 py-2 sm:px-5 sm:py-3">
                                        <p className="font-medium text-slate-700">{order.customer}</p>
                                        <p className="text-xs text-slate-400">{order.email}</p>
                                    </td>
                                    <td className="px-2 py-2 sm:px-5 sm:py-3 text-slate-600">{order.items.length} item(s)</td>
                                    <td className="px-2 py-2 sm:px-5 sm:py-3 font-semibold text-slate-800">₹{order.total.toLocaleString()}</td>
                                    <td className="px-2 py-2 sm:px-5 sm:py-3 text-slate-600">{order.payment}</td>
                                    <td className="px-2 py-2 sm:px-5 sm:py-3"><StatusBadge status={order.status} /></td>
                                    <td className="px-2 py-2 sm:px-5 sm:py-3 text-slate-500 text-xs">{order.date}</td>
                                    <td className="px-2 py-2 sm:px-5 sm:py-3">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-slate-500 text-sm">No orders found</p>
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 max-h-[80vh] overflow-y-auto">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Order {selectedOrder.id}</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Customer</p>
                                <p className="text-sm font-medium text-slate-700">{selectedOrder.customer}</p>
                                <p className="text-xs text-slate-500">{selectedOrder.email}</p>
                                <p className="text-xs text-slate-500">{selectedOrder.phone}</p>
                                <p className="text-xs text-slate-500 mt-1">{selectedOrder.address}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Items</p>
                                {selectedOrder.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm py-1">
                                        <span className="text-slate-600">{item.name} × {item.qty}</span>
                                        <span className="font-medium text-slate-700">₹{(item.price * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-3 border-t border-slate-100 flex justify-between">
                                <span className="font-semibold text-slate-700">Total</span>
                                <span className="font-bold text-slate-800">₹{selectedOrder.total.toLocaleString()}</span>
                            </div>
                            <div className="flex gap-3">
                                <select
                                    defaultValue={selectedOrder.status}
                                    onChange={(e) => {
                                        toast.success(`Order status updated to ${e.target.value}`)
                                        setSelectedOrder(null)
                                    }}
                                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
                                >
                                    {['Processing', 'Shipped', 'Delivered'].map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

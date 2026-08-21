'use client'

import { useEffect, useState } from 'react'
import { Users, IndianRupee, ShoppingBag, Store } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import StatusBadge from '@/components/admin/StatusBadge'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const formatDate = (value) => {
    if (!value) return '—'
    const d = new Date(value)
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatCurrency = (value) =>
    `₹${(Number(value) || 0).toLocaleString('en-IN')}`

export default function AdminDashboard() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/api/admin/dashboard')
            .then(async (res) => {
                if (!res.ok) throw new Error('Failed to load dashboard')
                return res.json()
            })
            .then((json) => setData(json))
            .catch((e) => setError(e.message || 'Something went wrong'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p className="text-slate-500">Loading dashboard…</p>
    }

    if (error || !data) {
        return <p className="text-red-600">{error || 'No data available'}</p>
    }

    const { stats, ordersChartData, revenueChartData, pendingStores, recentOrders } = data

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">
                Admin <span className="font-bold">Dashboard</span>
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Users" value={stats.users.toLocaleString('en-IN')} color="bg-blue-100" />
                <StatCard icon={IndianRupee} label="Total Revenue" value={formatCurrency(stats.revenue)} color="bg-emerald-100" />
                <StatCard icon={ShoppingBag} label="Total Orders" value={stats.orders.toLocaleString('en-IN')} color="bg-purple-100" />
                <StatCard icon={Store} label="Active Stores" value={stats.stores.toLocaleString('en-IN')} color="bg-amber-100" />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Orders Area Chart */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Orders Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={ordersChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="orders"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.15}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Revenue Bar Chart */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Revenue</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Revenue']}
                            />
                            <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm min-w-[400px]">
                            <thead>
                                <tr className="text-left text-slate-500 border-b border-slate-100">
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Order ID</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Customer</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Amount</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Status</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-6 text-center text-slate-400">No orders yet</td>
                                    </tr>
                                )}
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-slate-50 last:border-0">
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 font-medium text-slate-700">{order.id.slice(-8).toUpperCase()}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-600">{order.user?.name || 'Customer'}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-700">{formatCurrency(order.total)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3"><StatusBadge status={order.status} /></td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-500">{formatDate(order.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <h2 className="text-lg font-semibold text-slate-800 mb-4">Pending Approvals</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm min-w-[350px]">
                            <thead>
                                <tr className="text-left text-slate-500 border-b border-slate-100">
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Store Name</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Owner</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Date</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingStores.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-6 text-center text-slate-400">No pending stores</td>
                                    </tr>
                                )}
                                {pendingStores.map((store) => (
                                    <tr key={store.id} className="border-b border-slate-50 last:border-0">
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 font-medium text-slate-700">{store.name}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-600">{store.user?.name || 'Owner'}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-500">{formatDate(store.createdAt)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-right space-x-2">
                                            <button className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-emerald-700 transition-colors">
                                                Approve
                                            </button>
                                            <button className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

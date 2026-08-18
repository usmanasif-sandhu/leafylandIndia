'use client'

import { Users, IndianRupee, ShoppingBag, Store } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'
import StatusBadge from '@/components/admin/StatusBadge'
import { dummyOrdersData } from '@/lib/data/orders'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const ordersChartData = [
  { name: 'Mon', orders: 45 },
  { name: 'Tue', orders: 52 },
  { name: 'Wed', orders: 38 },
  { name: 'Thu', orders: 65 },
  { name: 'Fri', orders: 48 },
  { name: 'Sat', orders: 72 },
  { name: 'Sun', orders: 58 },
]

const revenueChartData = [
  { name: 'Jan', revenue: 12000 },
  { name: 'Feb', revenue: 19000 },
  { name: 'Mar', revenue: 15000 },
  { name: 'Apr', revenue: 25000 },
  { name: 'May', revenue: 22000 },
  { name: 'Jun', revenue: 30000 },
]

const pendingStores = [
  { id: 1, name: 'Fresh Roots Nursery', owner: 'Nikhil Bose', date: '2025-07-10' },
  { id: 2, name: 'Blossom Haven', owner: 'Priya Patel', date: '2025-07-12' },
  { id: 3, name: 'Verde Garden Co.', owner: 'Rohan Deshmukh', date: '2025-07-14' },
  { id: 4, name: 'The Plant Studio', owner: 'Sneha Reddy', date: '2025-07-15' },
  { id: 5, name: 'GreenWave Supplies', owner: 'Arjun Mehta', date: '2025-07-16' },
]

export default function AdminDashboard() {
  const recentOrders = dummyOrdersData.slice(0, 5)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">
        Admin <span className="font-bold">Dashboard</span>
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Users" value="12,486" change={12.5} color="bg-blue-100" />
        <StatCard icon={IndianRupee} label="Total Revenue" value="₹8,45,200" change={8.2} color="bg-emerald-100" />
        <StatCard icon={ShoppingBag} label="Total Orders" value="3,842" change={-2.4} color="bg-purple-100" />
        <StatCard icon={Store} label="Active Stores" value="156" change={15.3} color="bg-amber-100" />
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
                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
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
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 font-medium text-slate-700">{order.id}</td>
                    <td className="py-3 text-slate-600">{order.customer}</td>
                    <td className="py-3 text-slate-700">₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="py-3"><StatusBadge status={order.status} /></td>
                    <td className="py-3 text-slate-500">{order.date}</td>
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
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-medium">Store Name</th>
                  <th className="pb-3 font-medium">Owner</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingStores.map((store) => (
                  <tr key={store.id} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 font-medium text-slate-700">{store.name}</td>
                    <td className="py-3 text-slate-600">{store.owner}</td>
                    <td className="py-3 text-slate-500">{store.date}</td>
                    <td className="py-3 text-right space-x-2">
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

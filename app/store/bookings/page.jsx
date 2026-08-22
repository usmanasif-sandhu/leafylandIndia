'use client'
import { useEffect, useState } from 'react'
import { Search, Calendar } from 'lucide-react'
import StatusBadge from '@/components/admin/StatusBadge'
import toast from 'react-hot-toast'

const STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export default function VendorBookings() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [bookings, setBookings] = useState([])
    const [updatingId, setUpdatingId] = useState(null)

    const load = () => {
        fetch('/api/vendor/bookings')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setBookings(data) })
    }

    useEffect(() => { load() }, [])

    const updateStatus = async (id, status) => {
        setUpdatingId(id)
        try {
            const res = await fetch(`/api/vendor/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Update failed')
            setBookings((prev) => prev.map((b) => (b.id === id ? data : b)))
            toast.success('Booking status updated')
        } catch (err) {
            toast.error(err.message)
        } finally {
            setUpdatingId(null)
        }
    }

    const filtered = bookings.filter((b) => {
        const customer = b.user?.name || ''
        const service = b.service?.name || ''
        const matchSearch =
            customer.toLowerCase().includes(search.toLowerCase()) ||
            service.toLowerCase().includes(search.toLowerCase()) ||
            (b.id || '').toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'All' || b.status === statusFilter
        return matchSearch && matchStatus
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Service <span className="font-bold">Bookings</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">{bookings.length} total bookings</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {['All', ...STATUSES].map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition ${
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

            {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                    <Calendar size={40} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No bookings found</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm min-w-[800px]">
                            <thead>
                                <tr className="text-left text-slate-500 border-b border-slate-100">
                                    <th className="px-4 py-3 font-medium">Service</th>
                                    <th className="px-4 py-3 font-medium">Customer</th>
                                    <th className="px-4 py-3 font-medium">Date / Time</th>
                                    <th className="px-4 py-3 font-medium">Location</th>
                                    <th className="px-4 py-3 font-medium">Price</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((booking) => (
                                    <tr key={booking.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-700">{booking.service?.name || '—'}</p>
                                            <p className="text-xs text-slate-400">{booking.service?.category}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-700">{booking.user?.name || '—'}</p>
                                            <p className="text-xs text-slate-400">{booking.user?.email}</p>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {booking.date ? new Date(booking.date).toLocaleDateString() : '—'}
                                            {booking.time ? ` · ${booking.time}` : ''}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 max-w-[160px] truncate">{booking.location}</td>
                                        <td className="px-4 py-3 font-semibold text-slate-800">₹{(booking.price || 0).toLocaleString()}</td>
                                        <td className="px-4 py-3"><StatusBadge status={booking.status} /></td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={booking.status}
                                                disabled={updatingId === booking.id}
                                                onChange={(e) => updateStatus(booking.id, e.target.value)}
                                                className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-500"
                                            >
                                                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

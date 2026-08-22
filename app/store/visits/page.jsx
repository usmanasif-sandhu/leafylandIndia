'use client'
import { useEffect, useState } from 'react'
import { Search, MapPin } from 'lucide-react'
import StatusBadge from '@/components/admin/StatusBadge'
import toast from 'react-hot-toast'

const STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export default function VendorVisits() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [visits, setVisits] = useState([])
    const [updatingId, setUpdatingId] = useState(null)

    const load = () => {
        fetch('/api/vendor/visits')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setVisits(data) })
    }

    useEffect(() => { load() }, [])

    const updateStatus = async (id, status) => {
        setUpdatingId(id)
        try {
            const res = await fetch(`/api/vendor/visits/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Update failed')
            setVisits((prev) => prev.map((v) => (v.id === id ? data : v)))
            toast.success('Visit status updated')
        } catch (err) {
            toast.error(err.message)
        } finally {
            setUpdatingId(null)
        }
    }

    const filtered = visits.filter((v) => {
        const matchSearch =
            (v.name || '').toLowerCase().includes(search.toLowerCase()) ||
            (v.property?.title || '').toLowerCase().includes(search.toLowerCase()) ||
            (v.phone || '').includes(search)
        const matchStatus = statusFilter === 'All' || v.status === statusFilter
        return matchSearch && matchStatus
    })

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Property <span className="font-bold">Visits</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">{visits.length} total visit requests</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search visits..."
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
                    <MapPin size={40} className="text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">No visit requests found</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm min-w-[800px]">
                            <thead>
                                <tr className="text-left text-slate-500 border-b border-slate-100">
                                    <th className="px-4 py-3 font-medium">Property</th>
                                    <th className="px-4 py-3 font-medium">Visitor</th>
                                    <th className="px-4 py-3 font-medium">Phone</th>
                                    <th className="px-4 py-3 font-medium">Date / Time</th>
                                    <th className="px-4 py-3 font-medium">Notes</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((visit) => (
                                    <tr key={visit.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-700">{visit.property?.title || '—'}</p>
                                            <p className="text-xs text-slate-400">{visit.property?.location}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-700">{visit.name}</p>
                                            <p className="text-xs text-slate-400">{visit.user?.email}</p>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">{visit.phone}</td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {visit.date ? new Date(visit.date).toLocaleDateString() : '—'}
                                            {visit.time ? ` · ${visit.time}` : ''}
                                        </td>
                                        <td className="px-4 py-3 text-slate-500 max-w-[160px] truncate">{visit.notes || '—'}</td>
                                        <td className="px-4 py-3"><StatusBadge status={visit.status} /></td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={visit.status}
                                                disabled={updatingId === visit.id}
                                                onChange={(e) => updateStatus(visit.id, e.target.value)}
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

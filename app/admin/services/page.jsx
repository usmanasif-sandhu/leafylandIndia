'use client'

import { useState, useMemo, useEffect } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import toast from 'react-hot-toast'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selectedService, setSelectedService] = useState(null)

  const load = () => {
    setLoading(true)
    fetch('/api/admin/services')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load services')
        return res.json()
      })
      .then(setServices)
      .catch((e) => setError(e.message || 'Something went wrong'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    const res = await fetch('/api/admin/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (!res.ok) return toast.error(`${status === 'approved' ? 'Approve' : 'Reject'} failed`)
    toast.success(status === 'approved' ? 'Service approved' : 'Service rejected')
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
    setSelectedService((prev) => (prev?.id === id ? { ...prev, status } : prev))
  }

  const categories = useMemo(() => {
    const set = new Set(services.map((s) => s.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [services])

  const filteredData = useMemo(() => {
    if (categoryFilter === 'All') return services
    return services.filter((s) => s.category === categoryFilter)
  }, [categoryFilter, services])

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (val) => <span className="font-semibold">{val || 'N/A'}</span>,
    },
    {
      key: 'store',
      label: 'Store',
      render: (_val, row) => row.store?.name || 'N/A',
    },
    { key: 'category', label: 'Category' },
    {
      key: 'startingPrice',
      label: 'Starting Price',
      render: (val) => `₹${(val || 0).toLocaleString('en-IN')}`,
    },
    {
      key: 'duration',
      label: 'Duration',
      render: (val) => (val ? `${val} hrs` : 'N/A'),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val || 'pending'} />,
    },
    {
      key: 'id',
      label: 'Actions',
      render: (_val, row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedService(row)}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            View
          </button>
          {(row.status || 'pending') === 'pending' && (
            <>
              <button
                type="button"
                onClick={() => updateStatus(row.id, 'approved')}
                className="text-emerald-700 hover:text-emerald-800 text-sm font-medium"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => updateStatus(row.id, 'rejected')}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Services" description="Manage all service listings" />

      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading services…</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          searchKeys={['name', 'category', 'store.name']}
          emptyMessage="No services found"
        />
      )}

      <DetailSlideOver
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.name || 'Service Details'}
      >
        {selectedService && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</h3>
              <p className="text-sm text-slate-700 mt-1">{selectedService.description || 'N/A'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedService.category || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</h3>
                <p className="text-sm text-slate-700 mt-1">
                  ₹{(selectedService.startingPrice || 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedService.duration || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedService.location || 'N/A'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</h3>
              <div className="mt-1">
                <StatusBadge status={selectedService.status || 'pending'} />
              </div>
            </div>

            {(selectedService.status || 'pending') === 'pending' && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => updateStatus(selectedService.id, 'approved')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(selectedService.id, 'rejected')}
                  className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        )}
      </DetailSlideOver>
    </div>
  )
}

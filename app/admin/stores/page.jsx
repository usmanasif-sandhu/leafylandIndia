'use client'

import { useState, useMemo, useEffect } from 'react'
import { Eye } from 'lucide-react'
import { storesDummyData } from '@/assets/assets'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'

export default function AdminStores() {
  const [stores, setStores] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedStore, setSelectedStore] = useState(null)

  useEffect(() => {
    fetch('/api/admin/stores')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setStores(data) })
  }, [])

  const filteredStores = useMemo(() => {
    if (statusFilter === 'all') return stores
    if (statusFilter === 'active') return stores.filter((s) => s.isActive)
    if (statusFilter === 'inactive') return stores.filter((s) => !s.isActive)
    return stores
  }, [stores, statusFilter])

  const toggleActive = async (id) => {
    const row = stores.find((s) => s.id === id)
    if (!row) return
    const next = !row.isActive
    setStores((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: next } : s)))
    await fetch(`/api/admin/stores/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: next }),
    })
  }

  const columns = [
    {
      key: 'name',
      label: 'Store Name',
      render: (val) => <span className="font-bold text-slate-800">{val}</span>,
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (_, row) => row.user?.name ?? '—',
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'city',
      label: 'City',
    },
    {
      key: 'isActive',
      label: 'Active',
      render: (val, row) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={val}
            onChange={() => toggleActive(row.id)}
          />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-emerald-600 transition-colors duration-200" />
          <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4" />
        </label>
      ),
    },
    {
      key: 'view',
      label: 'View',
      render: (_, row) => (
        <button
          onClick={() => setSelectedStore(row)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Stores" description="Manage all registered stores" />

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-slate-600">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl text-sm px-3 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-colors"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredStores}
        searchKeys={['name', 'owner']}
        emptyMessage="No stores found"
      />

      <DetailSlideOver
        isOpen={!!selectedStore}
        onClose={() => setSelectedStore(null)}
        title={selectedStore?.name ?? ''}
      >
        {selectedStore && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Owner</p>
              <p className="text-sm text-slate-700 mt-1">{selectedStore.user?.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</p>
              <p className="text-sm text-slate-600 mt-1">{selectedStore.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact</p>
              <p className="text-sm text-slate-700 mt-1">{selectedStore.contact}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</p>
              <p className="text-sm text-slate-700 mt-1">{selectedStore.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</p>
              <div className="mt-1"><StatusBadge status={selectedStore.status} /></div>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</p>
              <p className="text-sm text-slate-700 mt-1">{selectedStore.address}</p>
            </div>
          </div>
        )}
      </DetailSlideOver>
    </div>
  )
}

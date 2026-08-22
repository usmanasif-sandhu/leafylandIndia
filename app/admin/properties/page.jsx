'use client'

import { useState, useMemo, useEffect } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import toast from 'react-hot-toast'

const STATUS_OPTIONS = ['All', 'pending', 'approved', 'rejected']

const TYPE_COLORS = {
  Farmhouse: 'bg-emerald-100 text-emerald-700',
  Farmland: 'bg-amber-100 text-amber-700',
  Cottage: 'bg-amber-100 text-amber-700',
  'Nursery Land': 'bg-slate-100 text-slate-600',
  'Agricultural Land': 'bg-amber-100 text-amber-700',
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState(null)

  const load = () => {
    setLoading(true)
    fetch('/api/admin/properties')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load properties')
        return res.json()
      })
      .then(setProperties)
      .catch((e) => setError(e.message || 'Something went wrong'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    const res = await fetch('/api/admin/properties', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    if (!res.ok) return toast.error(`${status === 'approved' ? 'Approve' : 'Reject'} failed`)
    toast.success(status === 'approved' ? 'Property approved' : 'Property rejected')
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)))
    setSelectedProperty((prev) => (prev?.id === id ? { ...prev, status } : prev))
  }

  const filteredData = useMemo(() => {
    if (statusFilter === 'All') return properties
    return properties.filter((p) => (p.status || 'pending') === statusFilter)
  }, [statusFilter, properties])

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (val) => <span className="font-semibold">{val || 'N/A'}</span>,
    },
    {
      key: 'store',
      label: 'Store',
      render: (_val, row) => row.store?.name || 'N/A',
    },
    {
      key: 'propertyType',
      label: 'Type',
      render: (val) => {
        const color = TYPE_COLORS[val] || 'bg-slate-100 text-slate-600'
        return <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${color}`}>{val || 'N/A'}</span>
      },
    },
    {
      key: 'listingType',
      label: 'Listing',
      render: (val) => (
        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${val === 'SALE' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {val || 'N/A'}
        </span>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (val) => `₹${(val || 0).toLocaleString('en-IN')}`,
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
            onClick={() => setSelectedProperty(row)}
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
      <PageHeader title="Properties" description="Manage all property listings" />

      <div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading properties…</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          searchKeys={['title', 'propertyType', 'location']}
          emptyMessage="No properties found"
        />
      )}

      <DetailSlideOver
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        title={selectedProperty?.title || 'Property Details'}
      >
        {selectedProperty && (
          <div className="space-y-4">
            <img
              src={selectedProperty.images?.[0] || 'https://via.placeholder.com/400'}
              alt={selectedProperty.title || ''}
              className="w-full h-48 rounded-lg object-cover"
            />

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description</h3>
              <p className="text-sm text-slate-700 mt-1">{selectedProperty.description || 'N/A'}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.propertyType || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Listing</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.listingType || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Price</h3>
                <p className="text-sm text-slate-700 mt-1">
                  ₹{(selectedProperty.price || 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.location || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Land Size</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.landSize || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Covered Area</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.coveredArea || 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bedrooms</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.bedrooms || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bathrooms</h3>
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.bathrooms || 'N/A'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Features</h3>
              <div className="mt-1">
                {(selectedProperty.features || []).length > 0 ? (
                  <p className="text-sm text-slate-700">
                    {selectedProperty.features.join(', ')}
                  </p>
                ) : (
                  <p className="text-sm text-slate-500">N/A</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</h3>
              <div className="mt-1">
                <StatusBadge status={selectedProperty.status || 'pending'} />
              </div>
            </div>

            {(selectedProperty.status || 'pending') === 'pending' && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => updateStatus(selectedProperty.id, 'approved')}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(selectedProperty.id, 'rejected')}
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

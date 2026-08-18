'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import { properties } from '@/lib/data/properties'

const STATUS_OPTIONS = ['All', 'Pending', 'Approved', 'Rejected']

const TYPE_COLORS = {
  Farmhouse: 'bg-emerald-100 text-emerald-700',
  Farmland: 'bg-amber-100 text-amber-700',
  Cottage: 'bg-amber-100 text-amber-700',
  'Nursery Land': 'bg-slate-100 text-slate-600',
  'Agricultural Plot': 'bg-amber-100 text-amber-700',
}

export default function PropertiesPage() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedProperty, setSelectedProperty] = useState(null)

  const filteredData = useMemo(() => {
    if (statusFilter === 'All') return properties
    return properties.filter((p) => p.status === statusFilter)
  }, [statusFilter])

  const columns = [
    {
      key: 'title',
      label: 'Title',
      render: (val) => <span className="font-semibold">{val || 'N/A'}</span>,
    },
    {
      key: 'storeId',
      label: 'Store',
      render: (_val, row) => {
        const num = row.storeId?.replace('store-', '') || '?'
        return `Store #${num}`
      },
    },
    {
      key: 'type',
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
      label: 'View',
      render: (_val, row) => (
        <button
          onClick={() => setSelectedProperty(row)}
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
        >
          View
        </button>
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

      <DataTable
        columns={columns}
        data={filteredData}
        searchKeys={['title', 'type']}
        emptyMessage="No properties found"
      />

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
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.type || 'N/A'}</p>
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
                <p className="text-sm text-slate-700 mt-1">{selectedProperty.area || 'N/A'}</p>
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
                {(selectedProperty.amenities || []).length > 0 ? (
                  <p className="text-sm text-slate-700">
                    {selectedProperty.amenities.join(', ')}
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
          </div>
        )}
      </DetailSlideOver>
    </div>
  )
}
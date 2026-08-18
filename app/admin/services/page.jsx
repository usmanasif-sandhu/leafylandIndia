'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import { services, serviceCategories } from '@/lib/data/services'

export default function ServicesPage() {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [selectedService, setSelectedService] = useState(null)

  const filteredData = useMemo(() => {
    if (categoryFilter === 'All') return services
    return services.filter((s) => s.category === categoryFilter)
  }, [categoryFilter])

  const columns = [
    {
      key: 'name',
      label: 'Name',
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
      render: (val) => <StatusBadge status={val || 'active'} />,
    },
    {
      key: 'id',
      label: 'View',
      render: (_val, row) => (
        <button
          onClick={() => setSelectedService(row)}
          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
        >
          View
        </button>
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
          <option value="All">All Categories</option>
          {serviceCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchKeys={['name', 'category']}
        emptyMessage="No services found"
      />

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
                <StatusBadge status={selectedService.status || 'active'} />
              </div>
            </div>
          </div>
        )}
      </DetailSlideOver>
    </div>
  )
}
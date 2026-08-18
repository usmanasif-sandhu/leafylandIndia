'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import { dummyOrdersData } from '@/lib/data/orders'

const STATUS_FILTERS = [
  'All',
  'Order Placed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
]

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filteredData = useMemo(() => {
    if (statusFilter === 'All') return dummyOrdersData
    const key = statusFilter.toLowerCase().replace(' ', '_')
    return dummyOrdersData.filter((o) => o.status === key)
  }, [statusFilter])

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (val) => (
        <span className="font-mono text-sm font-semibold text-slate-800">{val}</span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
    },
    {
      key: 'store',
      label: 'Store',
    },
    {
      key: 'total',
      label: 'Total',
      render: (val) => (
        <span className="font-semibold text-slate-800">{formatCurrency(val)}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val.replace('_', ' ')} />,
    },
    {
      key: 'date',
      label: 'Date',
      render: (val) => formatDate(val),
    },
    {
      key: 'id',
      label: 'View',
      render: (_, row) => (
        <button
          onClick={() => setSelectedOrder(row)}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          View
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Manage all customer orders" />

      <div className="flex items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm font-medium border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All Statuses' : s}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchKeys={['id', 'customer', 'store']}
        emptyMessage="No orders found"
      />

      <DetailSlideOver
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder?.id ?? 'Order Details'}
      >
        {selectedOrder && (
          <div className="space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <span className="font-mono text-lg font-bold text-slate-800">{selectedOrder.id}</span>
              <div className="mt-1">
                <StatusBadge status={selectedOrder.status.replace('_', ' ')} />
              </div>
            </div>

            <div className="space-y-3">
              <DetailRow label="Customer" value={selectedOrder.customer} />
              <DetailRow label="Store" value={selectedOrder.store} />
              <DetailRow label="Order Date" value={formatDate(selectedOrder.date)} />
              <DetailRow label="Payment Method" value={selectedOrder.paymentMethod} />
              <DetailRow
                label="Payment Status"
                value={
                  <span className={selectedOrder.isPaid ? 'text-emerald-600' : 'text-red-600'}>
                    {selectedOrder.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                }
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Items</h3>
              <div className="bg-slate-50 rounded-lg divide-y divide-slate-100">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-slate-700">
                      {item.name} <span className="text-slate-400">× {item.quantity}</span>
                    </span>
                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(item.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-sm font-semibold text-slate-500">Total</span>
              <span className="text-lg font-bold text-slate-800">{formatCurrency(selectedOrder.total)}</span>
            </div>
          </div>
        )}
      </DetailSlideOver>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-slate-50">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  )
}

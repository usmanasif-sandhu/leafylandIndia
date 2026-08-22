'use client'

import { useState, useMemo, useEffect } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import toast from 'react-hot-toast'

const STATUS_FILTERS = ['All', 'ORDER_PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

const ORDER_STATUS = {
  ORDER_PLACED: { label: 'Order Placed', cls: 'bg-slate-100 text-slate-600' },
  PROCESSING: { label: 'Processing', cls: 'bg-amber-100 text-amber-700' },
  SHIPPED: { label: 'Shipped', cls: 'bg-blue-100 text-blue-700' },
  DELIVERED: { label: 'Delivered', cls: 'bg-emerald-100 text-emerald-700' },
  CANCELLED: { label: 'Cancelled', cls: 'bg-red-100 text-red-700' },
}

const StatusPill = ({ status }) => {
  const s = ORDER_STATUS[status] || { label: status, cls: 'bg-slate-100 text-slate-600' }
  return <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString('en-IN')}`
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetch('/api/admin/orders')
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to load orders')
        return res.json()
      })
      .then(setOrders)
      .catch((e) => setError(e.message || 'Something went wrong'))
      .finally(() => setLoading(false))
  }, [])

  const filteredData = useMemo(() => {
    if (statusFilter === 'All') return orders
    return orders.filter((o) => o.status === statusFilter)
  }, [statusFilter, orders])

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (val) => (
        <span className="font-mono text-sm font-semibold text-slate-800">{val}</span>
      ),
    },
    { key: 'customer', label: 'Customer' },
    { key: 'store', label: 'Store' },
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
      render: (val) => <StatusPill status={val} />,
    },
    {
      key: 'date',
      label: 'Date',
      render: (val) => formatDate(val),
    },
    {
      key: 'actions',
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
              {s === 'All' ? 'All Statuses' : ORDER_STATUS[s]?.label || s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading orders…</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={filteredData}
          searchKeys={['id', 'customer', 'store']}
          emptyMessage="No orders found"
        />
      )}

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
                <StatusPill status={selectedOrder.status} />
              </div>
            </div>

            <div className="space-y-3">
              <DetailRow label="Customer" value={selectedOrder.customer} />
              <DetailRow label="Store" value={selectedOrder.store} />
              <DetailRow label="Order Date" value={formatDate(selectedOrder.date || selectedOrder.createdAt)} />
              <DetailRow label="Payment Method" value={selectedOrder.paymentMethod || selectedOrder.payment} />
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
                {(selectedOrder.items || []).map((item, i) => (
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

            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Update status</label>
              <select
                value={selectedOrder.status}
                onChange={async (e) => {
                  const status = e.target.value
                  try {
                    const res = await fetch('/api/admin/orders', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id: selectedOrder.id, status }),
                    })
                    const data = await res.json()
                    if (!res.ok) throw new Error(data.error || 'Update failed')
                    setOrders((prev) => prev.map((o) => (o.id === data.id ? { ...o, ...data } : o)))
                    setSelectedOrder((prev) => (prev ? { ...prev, ...data } : prev))
                    toast.success(`Status set to ${status}`)
                  } catch (err) {
                    toast.error(err.message)
                  }
                }}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2"
              >
                {STATUS_FILTERS.filter((s) => s !== 'All').map((s) => (
                  <option key={s} value={s}>{ORDER_STATUS[s]?.label || s}</option>
                ))}
              </select>
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

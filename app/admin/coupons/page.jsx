'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import EmptyState from '@/components/admin/EmptyState'

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    fetch('/api/admin/coupons')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setCoupons(data) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discount: '',
    forNewUser: false,
    forMember: false,
    isPublic: false,
    expiresAt: format(new Date(), 'yyyy-MM-dd'),
  })

  const handleChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
  }

  const handleToggle = (field) => {
    setNewCoupon({ ...newCoupon, [field]: !newCoupon[field] })
  }

  const handleAddCoupon = async (e) => {
    e.preventDefault()

    const exists = coupons.some((c) => c.code.toUpperCase() === newCoupon.code.toUpperCase())
    if (exists) {
      toast.error('Coupon code already exists')
      return
    }

    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCoupon,
          discount: Number(newCoupon.discount),
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Could not create coupon')
        return
      }
      toast.success('Coupon added successfully')
      setCoupons((prev) => [data, ...prev])
      setNewCoupon({
        code: '',
        description: '',
        discount: '',
        forNewUser: false,
        forMember: false,
        isPublic: false,
        expiresAt: format(new Date(), 'yyyy-MM-dd'),
      })
    } catch {
      toast.error('Could not create coupon')
    }
  }

  const handleDelete = async (code) => {
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      if (!res.ok) {
        toast.error('Could not delete coupon')
        return
      }
      setCoupons((prev) => prev.filter((c) => c.code !== code))
      toast.success('Coupon deleted')
    } catch {
      toast.error('Could not delete coupon')
    }
  }

  const columns = [
    {
      key: 'code',
      label: 'Code',
      render: (val) => <span className="font-mono font-semibold text-slate-800">{val}</span>,
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'discount',
      label: 'Discount',
      render: (val) => <span className="font-medium">{val}%</span>,
    },
    {
      key: 'expiresAt',
      label: 'Expiry',
      render: (val) => format(new Date(val), 'MMM dd, yyyy'),
    },
    {
      key: 'isPublic',
      label: 'Public',
      render: (val) =>
        val ? (
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
            <X className="w-3.5 h-3.5 text-red-500" />
          </span>
        ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <button
          onClick={() => handleDelete(row.code)}
          className="bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs px-3 py-1 hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Coupons"
        description="Manage discount coupons for your store"
      />

      <form
        onSubmit={handleAddCoupon}
        className="bg-white rounded-2xl border border-slate-200 p-6"
      >
        <h2 className="text-lg font-bold text-slate-800 mb-5">Add New Coupon</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Code</label>
            <input
              type="text"
              name="code"
              value={newCoupon.code}
              onChange={handleChange}
              placeholder="e.g. SUMMER20"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
            <input
              type="text"
              name="description"
              value={newCoupon.description}
              onChange={handleChange}
              placeholder="e.g. Summer sale discount"
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Discount %</label>
            <input
              type="number"
              name="discount"
              value={newCoupon.discount}
              onChange={handleChange}
              placeholder="e.g. 20"
              min={1}
              max={100}
              required
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Expiry Date</label>
            <input
              type="date"
              name="expiresAt"
              value={newCoupon.expiresAt}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-5">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={newCoupon.isPublic}
              onChange={() => handleToggle('isPublic')}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span className="text-sm text-slate-700">Public</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={newCoupon.forNewUser}
              onChange={() => handleToggle('forNewUser')}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span className="text-sm text-slate-700">New Users Only</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={newCoupon.forMember}
              onChange={() => handleToggle('forMember')}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span className="text-sm text-slate-700">Members Only</span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-5 bg-emerald-600 text-white rounded-xl px-6 py-2.5 text-sm font-medium hover:bg-emerald-700 active:scale-[0.98] transition-all"
        >
          Add Coupon
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-5">All Coupons</h2>

        {loading ? (
          <p className="text-sm text-slate-500 py-6">Loading coupons…</p>
        ) : coupons.length === 0 ? (
          <EmptyState
            icon={X}
            title="No coupons yet"
            description="Add your first coupon above"
          />
        ) : (
          <DataTable
            columns={columns}
            data={coupons}
            searchKeys={['code', 'description']}
            emptyMessage="No coupons found"
          />
        )}
      </div>
    </div>
  )
}

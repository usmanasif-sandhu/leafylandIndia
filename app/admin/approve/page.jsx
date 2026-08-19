'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import PageHeader from '@/components/admin/PageHeader'
import EmptyState from '@/components/admin/EmptyState'
import toast from 'react-hot-toast'

export default function AdminApprove() {
  const [pendingStores, setPendingStores] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await fetch('/api/admin/stores')
    const data = await res.json()
    if (res.ok) setPendingStores((data || []).filter((s) => s.status === 'pending'))
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleApprove = async (id) => {
    const res = await fetch(`/api/admin/stores/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' }),
    })
    if (!res.ok) return toast.error('Approve failed')
    setPendingStores((prev) => prev.filter((s) => s.id !== id))
    toast.success('Store approved')
  }

  const handleReject = async (id) => {
    const res = await fetch(`/api/admin/stores/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }),
    })
    if (!res.ok) return toast.error('Reject failed')
    setPendingStores((prev) => prev.filter((s) => s.id !== id))
    toast.success('Store rejected')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Store Approvals"
        description="Review and approve pending store applications"
      />

      {loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : pendingStores.length === 0 ? (
        <EmptyState
          icon={CheckCircle}
          title="No pending approvals"
          description="All store applications have been reviewed"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-slate-100 p-5 flex flex-col"
            >
              <h3 className="text-lg font-bold text-slate-800">{store.name}</h3>
              <p className="text-sm text-slate-500">{store.user?.name}</p>
              <p className="text-sm text-slate-600 mt-2 line-clamp-3">{store.description}</p>
              <p className="text-xs text-slate-400 mt-3">
                Applied {new Date(store.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-3 mt-auto pt-4">
                <button
                  onClick={() => handleApprove(store.id)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(store.id)}
                  className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

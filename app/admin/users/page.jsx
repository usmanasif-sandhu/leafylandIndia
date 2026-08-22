'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import DetailSlideOver from '@/components/admin/DetailSlideOver'

const ROLE_FILTERS = ['All', 'Buyer', 'Seller', 'Admin']

const ROLE_STYLES = {
  admin: 'bg-slate-800 text-white',
  seller: 'bg-emerald-100 text-emerald-700',
  buyer: 'bg-blue-100 text-blue-700',
}

function RoleBadge({ role }) {
  const key = (role || 'buyer').toLowerCase()
  const style = ROLE_STYLES[key] || 'bg-slate-100 text-slate-600'
  const label = key.charAt(0).toUpperCase() + key.slice(1)
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${style}`}>
      {label}
    </span>
  )
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function UsersPage() {
  const [roleFilter, setRoleFilter] = useState('All')
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const loadUsers = useCallback(() => {
    return fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setUsers(data) })
  }, [])

  useEffect(() => { loadUsers() }, [loadUsers])

  const filteredData = useMemo(() => {
    if (roleFilter === 'All') return users
    return users.filter((u) => u.role === roleFilter.toLowerCase())
  }, [roleFilter, users])

  const handleCreateAdmin = async (e) => {
    e.preventDefault()

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setCreating(true)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newAdmin.name,
          email: newAdmin.email,
          password: newAdmin.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Could not create admin')
        return
      }
      toast.success(`Admin account created for ${data.email}`)
      setUsers((prev) => [data, ...prev])
      setNewAdmin({ name: '', email: '', password: '', confirmPassword: '' })
      setShowCreateForm(false)
    } catch {
      toast.error('Could not create admin')
    } finally {
      setCreating(false)
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold shrink-0">
            {(row.name || '?').split(' ').map((n) => n[0]).join('')}
          </div>
          <span className="font-semibold text-slate-800">{row.name}</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (val) => <span className="text-slate-600">{val}</span>,
    },
    {
      key: 'role',
      label: 'Role',
      render: (val) => <RoleBadge role={val} />,
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (val) => formatDate(val),
    },
    {
      key: 'totalOrders',
      label: 'Total Orders',
    },
    {
      key: 'id',
      label: 'View',
      render: (_, row) => (
        <button
          onClick={() => setSelectedUser(row)}
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          View
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="View platform users. Create new admin accounts only — existing users cannot be promoted."
        action={
          <button
            type="button"
            onClick={() => setShowCreateForm((v) => !v)}
            className="inline-flex items-center gap-2 bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            <UserPlus size={16} />
            Create Admin Account
          </button>
        }
      />

      {showCreateForm && (
        <form
          onSubmit={handleCreateAdmin}
          className="bg-white border border-slate-200 rounded-xl p-5 space-y-4"
        >
          <h2 className="text-sm font-bold text-slate-800">Create new admin account</h2>
          <p className="text-xs text-slate-500">
            Only create accounts for trusted team members. The email must not already be registered on the platform.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Full name"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              required
              placeholder="Admin email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password (min 6 characters)"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Confirm password"
              value={newAdmin.confirmPassword}
              onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={creating}
              className="bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-800 disabled:opacity-60"
            >
              {creating ? 'Creating…' : 'Create admin account'}
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="text-sm font-medium text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="flex items-center gap-3">
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-sm font-medium border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {ROLE_FILTERS.map((r) => (
            <option key={r} value={r}>
              {r === 'All' ? 'All Roles' : r}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchKeys={['name', 'email']}
        emptyMessage="No users found"
      />

      <DetailSlideOver
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser?.name ?? 'User Details'}
      >
        {selectedUser && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xl font-bold">
                {(selectedUser.name || '?').split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">{selectedUser.name}</p>
                <RoleBadge role={selectedUser.role} />
              </div>
            </div>

            <div className="space-y-3">
              <DetailRow label="Email" value={selectedUser.email} />
              <DetailRow label="Role" value={selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} />
              <DetailRow label="Join Date" value={formatDate(selectedUser.joinDate)} />
              <DetailRow label="Total Orders" value={selectedUser.totalOrders} />
              {selectedUser.storeName && (
                <>
                  <DetailRow label="Store Name" value={selectedUser.storeName} />
                  <DetailRow label="Store Status" value={selectedUser.storeStatus || '—'} />
                </>
              )}
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

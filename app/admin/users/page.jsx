'use client'

import { useState, useMemo, useEffect } from 'react'
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

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setUsers(data) })
  }, [])

  const filteredData = useMemo(() => {
    if (roleFilter === 'All') return users
    return users.filter(
      (u) => u.role === roleFilter.toLowerCase()
    )
  }, [roleFilter, users])

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
      <PageHeader title="Users" description="Manage all platform users" />

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
                {selectedUser.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">{selectedUser.name}</p>
                <RoleBadge role={selectedUser.role} />
              </div>
            </div>

            <div className="space-y-3">
              <DetailRow label="Email" value={selectedUser.email} />
              <DetailRow label="Phone" value={selectedUser.phone} />
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

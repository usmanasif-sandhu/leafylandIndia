'use client'

import { useState, useMemo } from 'react'
import PageHeader from '@/components/admin/PageHeader'
import DataTable from '@/components/admin/DataTable'
import StatusBadge from '@/components/admin/StatusBadge'
import DetailSlideOver from '@/components/admin/DetailSlideOver'
import { dummyUsersData } from '@/lib/data/users'

const ROLE_FILTERS = ['All', 'Buyer', 'Seller']

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

  const filteredData = useMemo(() => {
    if (roleFilter === 'All') return dummyUsersData
    return dummyUsersData.filter(
      (u) => u.role === roleFilter.toLowerCase()
    )
  }, [roleFilter])

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-sm font-bold shrink-0">
            {row.name.split(' ').map((n) => n[0]).join('')}
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
      render: (val) => (
        <StatusBadge status={val === 'seller' ? 'active' : val} />
      ),
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
                <StatusBadge status={selectedUser.role === 'seller' ? 'active' : selectedUser.role} />
              </div>
            </div>

            <div className="space-y-3">
              <DetailRow label="Email" value={selectedUser.email} />
              <DetailRow label="Phone" value={selectedUser.phone} />
              <DetailRow label="Role" value={selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)} />
              <DetailRow label="Join Date" value={formatDate(selectedUser.joinDate)} />
              <DetailRow label="Total Orders" value={selectedUser.totalOrders} />
              {selectedUser.storeName && (
                <DetailRow label="Store Name" value={selectedUser.storeName} />
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

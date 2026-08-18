'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import SearchBar from './SearchBar'
import EmptyState from './EmptyState'

export default function DataTable({ columns, data, searchKeys = [], emptyMessage = 'No results found' }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    if (!search.trim()) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      searchKeys.some((key) => {
        const val = row[key]
        return val !== undefined && val !== null && String(val).toLowerCase().includes(q)
      })
    )
  }, [data, search, searchKeys])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(page, totalPages)
  const startIdx = (safePage - 1) * perPage
  const paginated = filtered.slice(startIdx, startIdx + perPage)

  const handleSearch = (val) => {
    setSearch(val)
    setPage(1)
  }

  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={handleSearch} placeholder="Search..." />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState icon={Search} title={emptyMessage} description="Try adjusting your search terms" />
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr key={row.id ?? idx} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {startIdx + 1}–{Math.min(startIdx + perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

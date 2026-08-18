'use client'

const STATUS_STYLES = {
  approved: 'bg-emerald-100 text-emerald-700',
  active: 'bg-emerald-100 text-emerald-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  processing: 'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
  cancelled: 'bg-red-100 text-red-700',
  shipped: 'bg-blue-100 text-blue-700',
  inactive: 'bg-slate-100 text-slate-600',
}

const DEFAULT_STYLE = 'bg-slate-100 text-slate-600'

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status?.toLowerCase()] || DEFAULT_STYLE

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${style}`}>
      {status}
    </span>
  )
}

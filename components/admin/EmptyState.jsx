'use client'

export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Icon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      {description && (
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      )}
    </div>
  )
}

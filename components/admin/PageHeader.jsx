'use client'

export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800">{title}</h1>
        {description && (
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

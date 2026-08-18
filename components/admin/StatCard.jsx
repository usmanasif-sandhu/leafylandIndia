'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, change, color = 'bg-emerald-100' }) {
  const isPositive = change >= 0

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium">{label}</p>
        <p className="text-xl font-bold text-slate-800 mt-1 truncate">{value}</p>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold mt-1 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{isPositive ? '+' : ''}{change}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

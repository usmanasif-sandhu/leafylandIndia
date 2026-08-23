'use client'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { Wallet, Clock3, Hourglass, BadgeCheck } from 'lucide-react'
import { useLiveData } from '@/lib/useLiveData'

function fmt(paise) {
    return `₹${(Math.round(paise || 0) / 100).toLocaleString('en-IN')}`
}

const STATUS_STYLES = {
    DUE: 'bg-slate-100 text-slate-600',
    PROCESSING: 'bg-amber-100 text-amber-700',
    PAID: 'bg-emerald-100 text-emerald-700',
    PROCESSED: 'bg-emerald-100 text-emerald-700',
    FAILED: 'bg-red-100 text-red-700',
}

function Chip({ status }) {
    const label = status === 'PROCESSED' ? 'Completed' : status === 'PROCESSING' ? 'Processing' : status
    return (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'}`}>
            {label}
        </span>
    )
}

export default function VendorPayouts() {
    const { data, loading } = useLiveData('/api/vendor/payouts')

    const wallet = data?.wallet
    const earnings = data?.earnings || []
    const payouts = data?.payouts || []

    const cards = [
        { icon: Wallet, label: 'Available to receive', value: fmt(wallet?.dueNowPaise), color: 'bg-emerald-100', text: 'text-emerald-600' },
        { icon: Hourglass, label: 'In transit', value: fmt(wallet?.processingPaise), color: 'bg-amber-100', text: 'text-amber-600' },
        { icon: Clock3, label: 'Upcoming (within 7 days)', value: fmt(wallet?.upcomingPaise), color: 'bg-blue-100', text: 'text-blue-600' },
        { icon: BadgeCheck, label: 'Total received', value: fmt(wallet?.lifetimePaidPaise), color: 'bg-emerald-600/20', text: 'text-emerald-700' },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">
                Store <span className="font-bold">Wallet</span>
            </h1>

            {data && !data.bankDetailsComplete && (
                <Link
                    href="/store/settings"
                    className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 hover:bg-amber-100 transition-colors"
                >
                    <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-amber-800">
                        Your bank details are incomplete. Add your account number and IFSC in Store Settings so
                        LeafyLand can release your payouts.
                    </span>
                </Link>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {cards.map((c) => (
                    <div key={c.label} className="bg-white rounded-2xl border border-slate-100 p-5">
                        <div className={`w-10 h-10 ${c.color} rounded-xl flex items-center justify-center mb-3`}>
                            <c.icon size={18} className={c.text} />
                        </div>
                        <p className="text-xs text-slate-500">{c.label}</p>
                        <p className={`text-2xl font-bold mt-0.5 ${c.text}`}>
                            {loading ? '…' : c.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-800">Order earnings</h2>
                    {data && (
                        <span className="text-xs text-slate-400">
                            Commission rate: {data.commissionRate}% · funds unlock 7 days after each sale
                        </span>
                    )}
                </div>
                {!loading && earnings.length === 0 ? (
                    <p className="text-sm text-slate-500">No earnings yet. They appear automatically when customers pay.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm min-w-[640px]">
                            <thead>
                                <tr className="text-left text-slate-500 border-b border-slate-100">
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Order</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Sale date</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Gross</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Commission</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Unlocks</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {earnings.map((e) => (
                                    <tr key={e.id} className="border-b border-slate-50 last:border-0">
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 font-mono text-xs text-slate-600">{e.orderId.slice(-8)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-500">{new Date(e.createdAt).toLocaleDateString()}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-700">{fmt(e.grossPaise)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-500">-{fmt(e.commissionPaise)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-500">{new Date(e.eligibleAt).toLocaleDateString()}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3"><Chip status={e.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Payout history</h2>
                {!loading && payouts.length === 0 ? (
                    <p className="text-sm text-slate-500">No payouts yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm min-w-[560px]">
                            <thead>
                                <tr className="text-left text-slate-500 border-b border-slate-100">
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Reference</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Net paid</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Method</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Status</th>
                                    <th className="pb-3 px-2 sm:px-3 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payouts.map((p) => (
                                    <tr key={p.id} className="border-b border-slate-50 last:border-0">
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 font-mono text-xs text-slate-600">{p.reference || p.id.slice(-8)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 font-semibold text-slate-800">{fmt(p.netPaise)}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-600">{p.method === 'RAZORPAYX' ? 'RazorpayX' : 'Bank Transfer'}</td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3"><Chip status={p.status} /></td>
                                        <td className="py-2 sm:py-3 px-2 sm:px-3 text-slate-500">
                                            {new Date(p.processedAt || p.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

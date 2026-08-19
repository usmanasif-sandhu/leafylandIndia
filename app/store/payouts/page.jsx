'use client'
import { useEffect, useState } from 'react'
import { Wallet, Clock, CheckCircle, Building2 } from 'lucide-react'

export default function VendorPayouts() {
    const [data, setData] = useState(null)
    const [store, setStore] = useState(null)

    useEffect(() => {
        fetch('/api/vendor/payouts').then((r) => r.json()).then((d) => { if (!d.error) setData(d) })
        fetch('/api/vendor/settings').then((r) => r.json()).then((d) => { if (!d.error) setStore(d) })
    }, [])

    const totalEarnings = data ? (data.available || 0) + (data.pending || 0) : 0
    const pendingPayout = data?.pending || 0
    const completedPayout = data?.available || 0
    const vendorPayouts = data?.payouts || []

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-slate-800">
                Store <span className="font-bold">Payouts</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                        <Wallet size={18} className="text-emerald-600" />
                    </div>
                    <p className="text-xs text-slate-500">Total Earnings</p>
                    <p className="text-2xl font-bold text-slate-800 mt-0.5">₹{totalEarnings.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                        <Clock size={18} className="text-amber-600" />
                    </div>
                    <p className="text-xs text-slate-500">Pending Settlement</p>
                    <p className="text-2xl font-bold text-amber-600 mt-0.5">₹{pendingPayout.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                        <CheckCircle size={18} className="text-blue-600" />
                    </div>
                    <p className="text-xs text-slate-500">Available (after commission)</p>
                    <p className="text-2xl font-bold text-slate-800 mt-0.5">₹{completedPayout.toLocaleString('en-IN')}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Building2 size={18} className="text-slate-600" />
                    <h2 className="text-lg font-semibold text-slate-800">Payout Method</h2>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Building2 size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700">
                            {store?.bankAccount || 'Add bank details in Store Profile'}
                        </p>
                        <p className="text-xs text-slate-500">
                            {store?.ifscCode ? `IFSC: ${store.ifscCode}` : 'Commission'} {data?.commissionRate != null ? `• ${data.commissionRate}%` : ''}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Payout History</h2>
                {vendorPayouts.length === 0 ? (
                    <p className="text-sm text-slate-500">No payouts yet. They appear after delivered orders.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-slate-500 border-b border-slate-100">
                                    <th className="pb-3 font-medium">Reference</th>
                                    <th className="pb-3 font-medium">Amount</th>
                                    <th className="pb-3 font-medium">Method</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendorPayouts.map(payout => (
                                    <tr key={payout.id} className="border-b border-slate-50 last:border-0">
                                        <td className="py-3 font-mono text-xs text-slate-600">{payout.reference}</td>
                                        <td className="py-3 font-semibold text-slate-800">₹{(payout.amount || 0).toLocaleString()}</td>
                                        <td className="py-3 text-slate-600">{payout.method}</td>
                                        <td className="py-3">
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                                payout.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {payout.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-slate-500">{payout.date ? new Date(payout.date).toLocaleDateString() : ''}</td>
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

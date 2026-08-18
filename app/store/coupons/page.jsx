'use client'
import { useState } from 'react'
import { Plus, Trash2, Percent, Users, Calendar } from 'lucide-react'
import { vendorCoupons } from '@/lib/data/vendor'
import toast from 'react-hot-toast'

export default function VendorCoupons() {
    const [coupons, setCoupons] = useState(vendorCoupons)
    const [showForm, setShowForm] = useState(false)
    const [newCoupon, setNewCoupon] = useState({ code: '', description: '', discount: '', expiresAt: '' })

    const handleCreate = (e) => {
        e.preventDefault()
        if (coupons.some(c => c.code === newCoupon.code.toUpperCase())) {
            toast.error('Coupon code already exists')
            return
        }
        setCoupons([{ ...newCoupon, code: newCoupon.code.toUpperCase(), discount: Number(newCoupon.discount), isPublic: true, forNewUser: false, forMember: false, usageCount: 0 }, ...coupons])
        toast.success('Coupon created')
        setNewCoupon({ code: '', description: '', discount: '', expiresAt: '' })
        setShowForm(false)
    }

    const handleDelete = (code) => {
        setCoupons(coupons.filter(c => c.code !== code))
        toast.success('Coupon deleted')
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Store <span className="font-bold">Coupons</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">{coupons.length} active coupons</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                    <Plus size={16} /> Create Coupon
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">New Coupon</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Code</label>
                            <input type="text" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} placeholder="e.g. MONSOON20" required className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Discount %</label>
                            <input type="number" value={newCoupon.discount} onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })} placeholder="e.g. 20" min={1} max={100} required className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 outline-none" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
                            <input type="text" value={newCoupon.description} onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })} placeholder="e.g. Monsoon season special" required className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button type="submit" className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">Create</button>
                        <button type="button" onClick={() => setShowForm(false)} className="bg-slate-100 text-slate-600 px-5 py-2 rounded-xl text-sm font-medium hover:bg-slate-200 transition-colors">Cancel</button>
                    </div>
                </form>
            )}

            {/* Coupon List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map(coupon => (
                    <div key={coupon.code} className="bg-white rounded-2xl border border-slate-100 p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <span className="font-mono font-bold text-lg text-slate-800">{coupon.code}</span>
                                <div className="flex items-center gap-1 mt-1">
                                    <Percent size={12} className="text-emerald-600" />
                                    <span className="text-sm font-bold text-emerald-600">{coupon.discount}% OFF</span>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(coupon.code)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-3">{coupon.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                            <span className="flex items-center gap-1"><Users size={12} /> {coupon.usageCount} used</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> Expires {coupon.expiresAt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

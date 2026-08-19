'use client'
import { useEffect, useState } from 'react'
import { Save, Camera } from 'lucide-react'
import toast from 'react-hot-toast'
import { useVendorStore } from '@/components/store/VendorStoreContext'
import StoreLogo, { fileToDataUrl } from '@/components/store/StoreLogo'

export default function StoreSettings() {
    const { store, loading, setStore } = useVendorStore()
    const [info, setInfo] = useState({})

    useEffect(() => {
        if (store) setInfo(store)
    }, [store])

    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        const res = await fetch('/api/vendor/settings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info),
        })
        const data = await res.json()
        if (!res.ok) return toast.error(data.error || 'Could not save')
        setInfo(data)
        setStore(data)
        toast.success('Store profile updated successfully')
    }

    const statusLabel = info.status === 'approved' && info.isActive
        ? 'Active & Verified'
        : info.status === 'pending'
            ? 'Pending review'
            : info.status || '—'

    if (loading) return <p className="text-sm text-slate-500">Loading store profile…</p>

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">
                        Store <span className="font-bold">Profile</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your store information and settings</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h2 className="text-sm font-semibold text-slate-800 mb-4">Store photo</h2>
                    <div className="flex flex-col items-center gap-4">
                        <StoreLogo src={info.logo} name={info.name} className="w-24 h-24 rounded-2xl text-3xl" />
                        <label className="flex items-center gap-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer">
                            <Camera size={14} /> Upload photo
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0]
                                    if (!file) return
                                    try {
                                        const logo = await fileToDataUrl(file)
                                        const next = { ...info, logo }
                                        setInfo(next)
                                        const res = await fetch('/api/vendor/settings', {
                                            method: 'PATCH',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ logo }),
                                        })
                                        const data = await res.json()
                                        if (!res.ok) throw new Error(data.error || 'Could not update logo')
                                        setStore(data)
                                        toast.success('Logo updated')
                                    } catch (err) {
                                        toast.error(err.message)
                                    }
                                    e.target.value = ''
                                }}
                            />
                        </label>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                                {statusLabel}
                            </span>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-500 mb-1">Member Since</label>
                            <p className="text-sm text-slate-700">
                                {info.createdAt
                                    ? new Date(info.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
                                    : '—'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
                    <h2 className="text-sm font-semibold text-slate-800 mb-4">Store Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { label: 'Store Name', name: 'name', type: 'text' },
                            { label: 'Username', name: 'username', type: 'text', disabled: true },
                            { label: 'Email', name: 'email', type: 'email' },
                            { label: 'Phone', name: 'contact', type: 'tel' },
                            { label: 'City', name: 'city', type: 'text' },
                            { label: 'Address', name: 'address', type: 'text', full: true },
                            { label: 'Website', name: 'website', type: 'url' },
                            { label: 'Business Hours', name: 'businessHours', type: 'text' },
                        ].map(field => (
                            <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={info[field.name] || ''}
                                    onChange={handleChange}
                                    disabled={field.disabled}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition disabled:text-slate-400"
                                />
                            </div>
                        ))}
                        <div className="sm:col-span-2">
                            <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
                            <textarea
                                name="description"
                                value={info.description || ''}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h2 className="text-sm font-semibold text-slate-800 mb-4">Business Details</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'GST Number', name: 'gstNumber' },
                            { label: 'PAN Number', name: 'panNumber' },
                        ].map(field => (
                            <div key={field.name}>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">{field.label}</label>
                                <input
                                    type="text"
                                    name={field.name}
                                    value={info[field.name] || ''}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                    <h2 className="text-sm font-semibold text-slate-800 mb-4">Payment Details</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Bank Account', name: 'bankAccount' },
                            { label: 'IFSC Code', name: 'ifscCode' },
                            { label: 'UPI ID', name: 'upiId' },
                        ].map(field => (
                            <div key={field.name}>
                                <label className="block text-xs font-medium text-slate-500 mb-1.5">{field.label}</label>
                                <input
                                    type="text"
                                    name={field.name}
                                    value={info[field.name] || ''}
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="text-sm font-semibold text-slate-800 mb-4">Store Policies</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Shipping Policy</label>
                        <textarea
                            name="shippingPolicy"
                            value={info.shippingPolicy || ''}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Return Policy</label>
                        <textarea
                            name="returnPolicy"
                            value={info.returnPolicy || ''}
                            onChange={handleChange}
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

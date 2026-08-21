'use client'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addAddress } from '@/lib/features/address/addressSlice'

const EMPTY = {
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    label: '',
    isDefault: false,
}

const AddressFormModal = ({ onClose, onSaved, initial = null }) => {
    const dispatch = useDispatch()
    const isEdit = Boolean(initial)
    const [form, setForm] = useState(() => initial ? { ...EMPTY, ...initial, isDefault: Boolean(initial.isDefault) } : EMPTY)
    const [saving, setSaving] = useState(false)

    const change = (e) => {
        const { name, type, value, checked } = e.target
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }

    const submit = async (e) => {
        e.preventDefault()
        setSaving(true)
        const url = isEdit ? `/api/addresses/${initial.id}` : '/api/addresses'
        const method = isEdit ? 'PUT' : 'POST'
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })
        setSaving(false)
        if (!res.ok) {
            const msg = await res.json().catch(() => ({}))
            toast.error(msg.error || 'Could not save address')
            return
        }
        const saved = await res.json()
        if (!isEdit) dispatch(addAddress(saved))
        toast.success(isEdit ? 'Address updated' : 'Address saved')
        onSaved?.(saved)
        onClose?.()
    }

    return (
        <form
            onSubmit={submit}
            className="fixed inset-0 z-[60] bg-white/60 backdrop-blur h-screen flex items-center justify-center"
        >
            <div className="flex flex-col gap-4 text-slate-700 w-full max-w-sm mx-6 bg-white p-7 rounded-2xl border border-slate-200 shadow-xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{isEdit ? 'Edit' : 'Add New'} Address</h2>
                    <XIcon size={26} className="text-slate-500 hover:text-slate-700 cursor-pointer" onClick={onClose} />
                </div>
                <input name="label" onChange={change} value={form.label} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Label (e.g. Home, Work)" />
                <input name="name" onChange={change} value={form.name} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Full name" required />
                <input name="email" onChange={change} value={form.email} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="email" placeholder="Email address" required />
                <input name="phone" onChange={change} value={form.phone} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Phone" required />
                <input name="street" onChange={change} value={form.street} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Street address" required />
                <div className="flex gap-4">
                    <input name="city" onChange={change} value={form.city} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="City" required />
                    <input name="state" onChange={change} value={form.state} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="State" required />
                </div>
                <div className="flex gap-4">
                    <input name="zip" onChange={change} value={form.zip} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" inputMode="numeric" placeholder="Zip code" required />
                    <input name="country" onChange={change} value={form.country} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Country" required />
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="checkbox" name="isDefault" checked={form.isDefault} onChange={change} className="accent-emerald-700" />
                    Set as default address
                </label>
                <button
                    type="submit"
                    disabled={saving}
                    className="bg-emerald-900 text-white text-sm font-medium py-2.5 rounded-md hover:bg-emerald-950 active:scale-95 transition-all disabled:opacity-60"
                >
                    {saving ? 'Saving...' : isEdit ? 'UPDATE ADDRESS' : 'SAVE ADDRESS'}
                </button>
            </div>
        </form>
    )
}

export default AddressFormModal

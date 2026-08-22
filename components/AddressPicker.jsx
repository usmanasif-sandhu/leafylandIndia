'use client'
import { useEffect, useState } from 'react'
import { Plus, Star, Trash2, Pencil } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import AddressFormModal from './AddressFormModal'

const AddressPicker = ({ value, onChange }) => {
    const { status } = useSession()
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editing, setEditing] = useState(null)

    const load = () => {
        if (status !== 'authenticated') {
            setAddresses([])
            setLoading(false)
            return
        }
        setLoading(true)
        fetch('/api/addresses')
            .then(async (r) => {
                if (r.status === 401) return []
                const data = await r.json()
                return Array.isArray(data) ? data : []
            })
            .then((list) => {
                setAddresses(list)
                if (!value && list.length) {
                    const def = list.find((a) => a.isDefault) || list[0]
                    onChange?.(def.id)
                }
            })
            .catch(() => setAddresses([]))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        if (status === 'loading') return
        load()
    }, [status]) // eslint-disable-line react-hooks/exhaustive-deps

    if (status === 'unauthenticated') {
        return (
            <p className="text-sm text-slate-500">
                Please <a href="/login?callbackUrl=/checkout" className="text-emerald-700 font-medium hover:underline">sign in</a> to choose a delivery address.
            </p>
        )
    }

    if (loading || status === 'loading') return <p className="text-sm text-slate-400">Loading addresses…</p>

    const setDefault = async (id) => {
        const res = await fetch(`/api/addresses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDefault: true }),
        })
        if (!res.ok) return toast.error('Could not set default')
        toast.success('Default address updated')
        load()
        onChange?.(id)
    }

    const remove = async (id) => {
        if (!confirm('Delete this address? Orders using it will keep a record without the address.')) return
        const res = await fetch(`/api/addresses/${id}`, { method: 'DELETE' })
        if (!res.ok) return toast.error('Could not delete address')
        toast.success('Address deleted')
        const next = addresses.filter((a) => a.id !== id)
        setAddresses(next)
        if (value === id) onChange?.(next.find((a) => a.isDefault)?.id || next[0]?.id || null)
    }

    if (!addresses.length) {
        return (
            <div className="text-sm text-slate-500">
                <p>No saved addresses yet.</p>
                <button onClick={() => setShowForm(true)} className="mt-2 inline-flex items-center gap-1 text-emerald-700 font-medium hover:underline">
                    <Plus size={16} /> Add Address
                </button>
                {showForm && <AddressFormModal onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); load() }} />}
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {addresses.map((a) => (
                <div
                    key={a.id}
                    className={`rounded-xl border p-4 flex gap-3 ${value === a.id ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 bg-white'}`}
                >
                    <input
                        type="radio"
                        name="address"
                        checked={value === a.id}
                        onChange={() => onChange?.(a.id)}
                        className="mt-1 accent-emerald-700"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            {a.label && <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">{a.label}</span>}
                            {a.isDefault && (
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                                    <Star size={12} className="fill-emerald-700" /> Default
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-700 mt-1 truncate">{a.name}, {a.phone}</p>
                        <p className="text-xs text-slate-500 truncate">{a.street}, {a.city}, {a.state} {a.zip}, {a.country}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        {!a.isDefault && (
                            <button onClick={() => setDefault(a.id)} className="text-xs text-emerald-700 hover:underline">Set default</button>
                        )}
                        <div className="flex gap-2">
                            <button onClick={() => { setEditing(a); setShowForm(true) }} className="text-slate-400 hover:text-slate-600" title="Edit">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => remove(a.id)} className="text-slate-400 hover:text-red-500" title="Delete">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={() => { setEditing(null); setShowForm(true) }} className="inline-flex items-center gap-1 text-emerald-700 font-medium hover:underline text-sm">
                <Plus size={16} /> Add Address
            </button>
            {showForm && (
                <AddressFormModal
                    initial={editing}
                    onClose={() => { setShowForm(false); setEditing(null) }}
                    onSaved={() => { setShowForm(false); setEditing(null); load() }}
                />
            )}
        </div>
    )
}

export default AddressPicker

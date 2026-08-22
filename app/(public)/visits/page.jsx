'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function BuyerVisitsPage() {
    const [visits, setVisits] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/visits')
            .then(async (r) => {
                const data = await r.json()
                if (!r.ok) throw new Error(data.error || 'Failed to load')
                setVisits(Array.isArray(data) ? data : [])
            })
            .catch((e) => toast.error(e.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="p-8 text-slate-500">Loading visits…</p>

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
            <h1 className="text-2xl font-bold text-slate-800">My Property Visits</h1>
            {visits.length === 0 ? (
                <p className="text-sm text-slate-500">
                    No visits scheduled.{' '}
                    <Link href="/properties" className="text-emerald-700 font-medium">
                        Browse properties
                    </Link>
                </p>
            ) : (
                visits.map((v) => (
                    <div key={v.id} className="border border-slate-200 rounded-2xl p-4 bg-white flex justify-between gap-3">
                        <div>
                            <Link
                                href={`/properties/${v.property?.id}`}
                                className="font-semibold text-slate-800 hover:text-emerald-700"
                            >
                                {v.property?.title || 'Property'}
                            </Link>
                            <p className="text-xs text-slate-500 mt-1">
                                {new Date(v.date).toLocaleDateString('en-IN')} · {v.time}
                            </p>
                            {v.notes && <p className="text-sm text-slate-600 mt-2">{v.notes}</p>}
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-600 h-fit">
                            {v.status}
                        </span>
                    </div>
                ))
            )}
        </div>
    )
}

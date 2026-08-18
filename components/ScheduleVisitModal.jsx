'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

const ScheduleVisitModal = ({ property, setShowVisitModal }) => {

    const [visit, setVisit] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        notes: ''
    })

    const handleChange = (e) => {
        setVisit({ ...visit, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // TODO: wire to /api/bookings or /api/visits once backend route exists
        setShowVisitModal(false)
    }

    return (
        <form onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Requesting visit...' })} className="fixed inset-0 z-50 bg-white/60 backdrop-blur h-screen flex items-center justify-center">
            <div className="flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-6">
                <h2 className="text-2xl">Schedule a visit to <span className="font-semibold">{property.title}</span></h2>
                <input name="name" onChange={handleChange} value={visit.name} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Your name" required />
                <input name="phone" onChange={handleChange} value={visit.phone} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Phone number" required />
                <div className="flex gap-4">
                    <input name="date" onChange={handleChange} value={visit.date} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="date" required />
                    <input name="time" onChange={handleChange} value={visit.time} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="time" required />
                </div>
                <textarea name="notes" onChange={handleChange} value={visit.notes} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" rows={3} placeholder="Any notes for the seller (optional)" />
                <button className="bg-emerald-900 text-white text-sm font-medium py-2.5 rounded-md hover:bg-emerald-950 active:scale-95 transition-all">REQUEST VISIT</button>
            </div>
            <XIcon size={30} className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => setShowVisitModal(false)} />
        </form>
    )
}

export default ScheduleVisitModal
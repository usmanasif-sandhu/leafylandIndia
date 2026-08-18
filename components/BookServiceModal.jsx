'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

const BookServiceModal = ({ service, setShowBookModal }) => {

    const [booking, setBooking] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        location: '',
        requirements: ''
    })

    const handleChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // TODO: wire to /api/bookings once backend route exists
        setShowBookModal(false)
    }

    return (
        <form onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Sending booking request...' })} className="fixed inset-0 z-50 bg-white/60 backdrop-blur h-screen flex items-center justify-center">
            <div className="flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-6">
                <h2 className="text-2xl">Book <span className="font-semibold">{service.name}</span></h2>
                <input name="name" onChange={handleChange} value={booking.name} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Your name" required />
                <input name="phone" onChange={handleChange} value={booking.phone} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Phone number" required />
                <div className="flex gap-4">
                    <input name="date" onChange={handleChange} value={booking.date} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="date" required />
                    <input name="time" onChange={handleChange} value={booking.time} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="time" required />
                </div>
                <input name="location" onChange={handleChange} value={booking.location} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" type="text" placeholder="Service location / address" required />
                <textarea name="requirements" onChange={handleChange} value={booking.requirements} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" rows={3} placeholder="Describe what you need (optional)" />
                <button className="bg-emerald-900 text-white text-sm font-medium py-2.5 rounded-md hover:bg-emerald-950 active:scale-95 transition-all">REQUEST BOOKING</button>
            </div>
            <XIcon size={30} className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => setShowBookModal(false)} />
        </form>
    )
}

export default BookServiceModal
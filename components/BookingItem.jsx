'use client'
import Image from "next/image";
import { DotIcon, MapPinIcon, CalendarIcon } from "lucide-react";

const BookingItem = ({ booking }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    // SCHEMA: assumes booking.status is one of PENDING | CONFIRMED | COMPLETED | CANCELLED
    const statusStyles = {
        PENDING: 'text-yellow-600 bg-yellow-100',
        CONFIRMED: 'text-blue-600 bg-blue-100',
        COMPLETED: 'text-green-600 bg-green-100',
        CANCELLED: 'text-red-600 bg-red-100',
    }

    return (
        <>
            <tr className="text-sm">
                <td className="text-left">
                    <div className="flex items-center gap-4">
                        <div className="w-20 aspect-square bg-slate-100 flex items-center justify-center rounded-md overflow-hidden">
                            <Image className="w-full h-full object-cover" src={booking.service.images[0]} alt="" width={80} height={80} />
                        </div>
                        <div className="flex flex-col justify-center text-sm">
                            <p className="font-medium text-slate-600 text-base">{booking.service.name}</p>
                            <p>{currency}{booking.price}</p>
                            <p className="flex items-center gap-1 mt-1 text-slate-500">
                                <CalendarIcon size={12} /> {new Date(booking.date).toDateString()} at {booking.time}
                            </p>
                            <p className="flex items-center gap-1 text-slate-500">
                                <MapPinIcon size={12} /> {booking.location}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="text-left space-y-2 text-sm max-md:hidden">
                    <div className={`flex items-center justify-center gap-1 rounded-full p-1 ${statusStyles[booking.status] || 'text-slate-500 bg-slate-100'}`}>
                        <DotIcon size={10} className="scale-250" />
                        {booking.status.toLowerCase()}
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={2}>
                    <div className="border-b border-slate-300 w-6/7 mx-auto" />
                </td>
            </tr>
        </>
    )
}

export default BookingItem
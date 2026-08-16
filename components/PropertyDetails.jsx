'use client'
import { MapPinIcon, RulerIcon, BedDoubleIcon, BathIcon, CalendarIcon } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import ScheduleVisitModal from "./ScheduleVisitModal"

const PropertyDetails = ({ property }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const [mainImage, setMainImage] = useState(property.images[0])
    const [showVisitModal, setShowVisitModal] = useState(false)

    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                <div className="flex sm:flex-col gap-3">
                    {property.images.map((image, index) => (
                        <div key={index} onClick={() => setMainImage(image)} className="bg-slate-100 flex items-center justify-center size-26 rounded-lg group cursor-pointer overflow-hidden">
                            <Image src={image} className="w-full h-full object-cover group-hover:scale-105 transition" alt="" width={100} height={100} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center h-100 sm:size-113 bg-slate-100 rounded-lg overflow-hidden">
                    <Image src={mainImage} alt="" width={500} height={500} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="flex-1">
                <h1 className="text-3xl font-semibold text-slate-800">{property.title}</h1>
                <p className="flex items-center gap-1.5 text-slate-500 mt-2">
                    <MapPinIcon size={16} /> {property.location}
                </p>

                <p className="text-2xl font-semibold text-slate-800 my-6">
                    {currency}{property.price.toLocaleString()}
                    {/* SCHEMA: assumes property.listingType is "SALE" | "RENT" */}
                    {property.listingType === 'RENT' && <span className="text-base font-normal text-slate-500"> / month</span>}
                </p>

                {/* SCHEMA: assumes propertyType, landSize (string, e.g. "2 Kanal"), bedrooms, bathrooms are on the model.
                    Not every property type (e.g. agricultural land) will have bedrooms/bathrooms —
                    conditionally render so a farmland listing doesn't show "0 Bedrooms". */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-slate-600 py-4 border-y border-slate-200">
                    <div className="flex items-center gap-2">
                        <RulerIcon size={16} className="text-slate-400" />
                        <span>{property.landSize}</span>
                    </div>
                    {property.bedrooms != null && (
                        <div className="flex items-center gap-2">
                            <BedDoubleIcon size={16} className="text-slate-400" />
                            <span>{property.bedrooms} Beds</span>
                        </div>
                    )}
                    {property.bathrooms != null && (
                        <div className="flex items-center gap-2">
                            <BathIcon size={16} className="text-slate-400" />
                            <span>{property.bathrooms} Baths</span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">{property.propertyType}</span>
                    </div>
                </div>

                <p className="text-slate-600 mt-6 max-w-xl">{property.description}</p>

                <div className="flex gap-4 mt-8">
                    <button onClick={() => setShowVisitModal(true)} className="flex items-center gap-2 bg-slate-800 text-white px-8 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition">
                        <CalendarIcon size={16} /> Schedule Visit
                    </button>
                    <button className="border border-slate-300 text-slate-700 px-8 py-3 text-sm font-medium rounded hover:bg-slate-50 active:scale-95 transition">
                        Contact Seller
                    </button>
                </div>
            </div>

            {showVisitModal && <ScheduleVisitModal property={property} setShowVisitModal={setShowVisitModal} />}
        </div>
    )
}

export default PropertyDetails
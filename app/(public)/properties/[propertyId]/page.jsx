'use client'
import { useParams } from 'next/navigation'
import { properties } from '@/lib/data/properties'
import Link from 'next/link'
import { ChevronLeft, MapPin, Maximize, BedDouble, CheckCircle, Phone } from 'lucide-react'
import Image from 'next/image'

const PropertyPage = () => {
    const { propertyId } = useParams()
    const property = properties.find(p => p.id === propertyId)

    if (!property) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
                <p className="text-slate-500 text-sm">Property not found.</p>
                <Link href="/properties" className="mt-3 inline-block text-amber-600 text-sm font-medium hover:underline">
                    Back to Properties
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <Link href="/properties" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-amber-600 mb-6 transition">
                <ChevronLeft size={16} /> Back to Properties
            </Link>

            <div className="flex max-lg:flex-col gap-8 lg:gap-12">
                {/* Image */}
                <div className="lg:w-1/2">
                    <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden relative">
                        <Image
                            src={property.images?.[0] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=450&fit=crop'}
                            alt={property.title}
                            width={600}
                            height={450}
                            className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-lg ${property.type === 'SALE' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                            {property.type === 'SALE' ? 'FOR SALE' : 'FOR RENT'}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">{property.listingType}</span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3">{property.title}</h1>

                    <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                            <MapPin size={14} /> {property.location}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                            <Maximize size={14} /> {property.area}
                        </span>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs text-slate-400 uppercase font-medium">
                            {property.type === 'RENT' ? 'Monthly Rent' : 'Asking Price'}
                        </p>
                        <p className="text-3xl font-bold text-slate-800 mt-1">
                            ₹{property.price.toLocaleString()}
                            {property.type === 'RENT' && <span className="text-base font-normal text-slate-500">/month</span>}
                        </p>
                    </div>

                    <p className="text-sm text-slate-600 mt-4 leading-relaxed">{property.description}</p>

                    {/* Amenities */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-slate-800 mb-3">Amenities & Features</h3>
                        <div className="flex flex-wrap gap-2">
                            {property.amenities?.map((amenity, i) => (
                                <span key={i} className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                                    <CheckCircle size={12} className="text-emerald-500" />
                                    {amenity}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-sm font-semibold rounded-xl active:scale-95 transition flex items-center gap-2">
                            <Phone size={16} /> Contact Lister
                        </button>
                        <button className="border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 text-sm font-medium rounded-xl transition">
                            Schedule Site Visit
                        </button>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                        <p className="text-xs text-amber-700 leading-relaxed">
                            <strong>Note:</strong> Property transactions happen offline. LeafyLand facilitates discovery and connection only. Please verify all details independently before making any financial commitments.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertyPage

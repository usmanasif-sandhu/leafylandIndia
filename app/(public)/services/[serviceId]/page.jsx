'use client'
import { useParams } from 'next/navigation'
import { services } from '@/lib/data/services'
import Link from 'next/link'
import { ChevronLeft, MapPin, Star, Clock, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const ServicePage = () => {
    const { serviceId } = useParams()
    const service = services.find(s => s.id === serviceId)

    if (!service) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
                <p className="text-slate-500 text-sm">Service not found.</p>
                <Link href="/services" className="mt-3 inline-block text-blue-600 text-sm font-medium hover:underline">
                    Back to Services
                </Link>
            </div>
        )
    }

    const rating = service.rating?.length
        ? Math.round(service.rating.reduce((acc, r) => acc + r.rating, 0) / service.rating.length)
        : 0

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <Link href="/services" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-6 transition">
                <ChevronLeft size={16} /> Back to Services
            </Link>

            <div className="flex max-lg:flex-col gap-8 lg:gap-12">
                {/* Image */}
                <div className="lg:w-1/2">
                    <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden">
                        <Image
                            src={service.images?.[0] || 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop'}
                            alt={service.name}
                            width={600}
                            height={450}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{service.category}</span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-3">{service.name}</h1>

                    <div className="flex items-center gap-3 mt-3">
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                            <MapPin size={14} /> {service.location}
                        </span>
                        {rating > 0 && (
                            <span className="flex items-center gap-1 text-sm text-slate-500">
                                <Star size={14} fill="#059669" className="text-emerald-600" /> {rating}
                            </span>
                        )}
                    </div>

                    <div className="mt-6">
                        <p className="text-xs text-slate-400 uppercase font-medium">Starting from</p>
                        <p className="text-3xl font-bold text-slate-800 mt-1">₹{service.startingPrice.toLocaleString()}</p>
                    </div>

                    <p className="text-sm text-slate-600 mt-4 leading-relaxed">{service.description}</p>

                    {/* Provider */}
                    <div className="flex items-center gap-3 mt-6 p-4 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-blue-700">{service.providerName?.[0] || 'P'}</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-700">{service.providerName}</p>
                            <p className="text-xs text-slate-400">Service Provider</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-6">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm font-semibold rounded-xl active:scale-95 transition">
                            Request a Quote
                        </button>
                        <button className="border border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3 text-sm font-medium rounded-xl transition">
                            Message Provider
                        </button>
                    </div>

                    {/* What's Included */}
                    <div className="mt-8">
                        <h3 className="text-sm font-semibold text-slate-800 mb-3">What's Included</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {['Site consultation', 'Custom design', 'Material sourcing', 'Professional installation', 'Post-service cleanup', '30-day warranty'].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                                    <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicePage

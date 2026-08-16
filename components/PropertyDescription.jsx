'use client'
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const PropertyDescription = ({ property }) => {
    return (
        <div className="my-18 text-sm text-slate-600">
            <h3 className="font-semibold text-slate-800 mb-4">Property Details</h3>
            <p className="max-w-xl">{property.description}</p>

           
            {property.features?.length > 0 && (
                <div className="mt-6">
                    <h4 className="font-medium text-slate-800 mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                        {property.features.map((feature, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-xs">{feature}</span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-3 mt-14">
                <Image src={property.store.logo} alt="" className="size-11 rounded-full ring ring-slate-400" width={100} height={100} />
                <div>
                    <p className="font-medium text-slate-600">Listed by {property.store.name}</p>
                    <Link href={`/store/${property.store.username}`} className="flex items-center gap-1.5 text-green-500"> view store <ArrowRight size={14} /></Link>
                </div>
            </div>
        </div>
    )
}

export default PropertyDescription
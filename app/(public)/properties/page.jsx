import PropertyCard from "@/components/PropertyCard"
import PageTitle from "@/components/PageTitle"

// TEMP: dummy data until DB is connected.
const dummyStore = {
    id: "store_1", name: "Leafy Estates", username: "leafyestates",
    logo: "https://placehold.co/100x100/16a34a/white?text=LE",
}
const properties = [
    {
        id: "prop_1", title: "5 Acre Farmhouse, Lahore", price: 85000000,
        location: "Lahore, Punjab", landSize: "5 Acres", propertyType: "Farmhouse",
        images: ["https://placehold.co/400x300/a3e635/365314?text=Farmhouse"],
        store: dummyStore,
    },
    {
        id: "prop_2", title: "Agricultural Land, Sahiwal", price: 12000000,
        location: "Sahiwal, Punjab", landSize: "10 Acres", propertyType: "Agricultural Land",
        images: ["https://placehold.co/400x300/fde047/713f12?text=Land"],
        store: dummyStore,
    },
]

const PropertiesPage = async () => {
    return (
        <div className="mx-6 max-w-7xl mx-auto min-h-[60vh]">
            <PageTitle heading="Properties" text={`${properties.length} listings found`} />
            {properties.length === 0 ? (
                <p className="text-slate-500 py-20 text-center">No properties listed yet.</p>
            ) : (
                <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 pb-20">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default PropertiesPage
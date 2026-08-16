import ServiceCard from "@/components/ServiceCard"
import PageTitle from "@/components/PageTitle"

// TEMP: dummy data until DB is connected.
const dummyStore = {
    id: "store_1", name: "Green Thumb Services", username: "greenthumb",
    logo: "https://placehold.co/100x100/16a34a/white?text=GT",
}
const services = [
    {
        id: "svc_1", name: "Landscaping Design", startingPrice: 25000,
        location: "Lahore", images: ["https://placehold.co/400x300/86efac/166534?text=Landscaping"],
        store: dummyStore, rating: [],
    },
    {
        id: "svc_2", name: "Irrigation Installation", startingPrice: 15000,
        location: "Islamabad", images: ["https://placehold.co/400x300/93c5fd/1e3a8a?text=Irrigation"],
        store: dummyStore, rating: [],
    },
]

const ServicesPage = async () => {
    return (
        <div className="mx-6 max-w-7xl mx-auto min-h-[60vh]">
            <PageTitle heading="Services" text={`${services.length} services found`} />
            {services.length === 0 ? (
                <p className="text-slate-500 py-20 text-center">No services listed yet.</p>
            ) : (
                <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 pb-20">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ServicesPage
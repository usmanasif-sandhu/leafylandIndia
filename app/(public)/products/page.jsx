import ProductCard from "@/components/ProductCard"
import PageTitle from "@/components/PageTitle"

// TEMP: dummy data until DATABASE_URL/DIRECT_URL are set.
// Swap this block for a Prisma fetch once a real DB is connected.
const dummyStore = {
    id: "store_1", name: "Leafy Nursery", username: "leafynursery",
    logo: "https://placehold.co/100x100/16a34a/white?text=LN",
}

const products = [
    {
        id: "prod_1", name: "Money Plant", price: 8, mrp: 12,
        images: ["https://placehold.co/400x400/86efac/166534?text=Money+Plant"],
        category: "Plants", store: dummyStore, rating: [],
    },
    {
        id: "prod_2", name: "Terracotta Pot", price: 15, mrp: 20,
        images: ["https://placehold.co/400x400/fca5a5/7c2d12?text=Pot"],
        category: "Pots & Planters", store: dummyStore, rating: [],
    },
    {
        id: "prod_3", name: "Drip Irrigation Kit", price: 45, mrp: 60,
        images: ["https://placehold.co/400x400/93c5fd/1e3a8a?text=Irrigation"],
        category: "Irrigation", store: dummyStore, rating: [],
    },
]

const ProductsPage = async () => {
    return (
        <div className="mx-6 max-w-7xl mx-auto min-h-[60vh]">
            <PageTitle heading="Products" text={`${products.length} products found`} />
            {products.length === 0 ? (
                <p className="text-slate-500 py-20 text-center">No products yet — check back soon.</p>
            ) : (
                <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 pb-20">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProductsPage
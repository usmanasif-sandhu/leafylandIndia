import ProductDetails from "@/components/ProductDetails"
import ProductDescription from "@/components/ProductDescription"

// TEMP: dummy data until DB is connected — same shape/IDs as products/page.jsx
const dummyStore = {
    id: "store_1", name: "Leafy Nursery", username: "leafynursery",
    logo: "https://placehold.co/100x100/16a34a/white?text=LN",
}

const dummyProducts = {
    prod_1: {
        id: "prod_1", name: "Money Plant", price: 8, mrp: 12,
        description: "A hardy, low-maintenance indoor plant known for its round, coin-shaped leaves. Thrives in indirect light and needs watering only once a week.",
        images: ["https://placehold.co/400x400/86efac/166534?text=Money+Plant"],
        category: "Plants", store: dummyStore, rating: [],
    },
    prod_2: {
        id: "prod_2", name: "Terracotta Pot", price: 15, mrp: 20,
        description: "Classic handmade terracotta pot with drainage hole, ideal for both indoor and outdoor plants.",
        images: ["https://placehold.co/400x400/fca5a5/7c2d12?text=Pot"],
        category: "Pots & Planters", store: dummyStore, rating: [],
    },
    prod_3: {
        id: "prod_3", name: "Drip Irrigation Kit", price: 45, mrp: 60,
        description: "Complete drip irrigation starter kit for up to 20 plants, includes tubing, drippers, and a timer connector.",
        images: ["https://placehold.co/400x400/93c5fd/1e3a8a?text=Irrigation"],
        category: "Irrigation", store: dummyStore, rating: [],
    },
}

const ProductPage = async ({ params }) => {
    const { productId } = await params
    const product = dummyProducts[productId]

    if (!product) {
        return (
            <div className="mx-6 max-w-7xl mx-auto py-20 text-center text-slate-500">
                Product not found.
            </div>
        )
    }

    return (
        <div className="mx-6 max-w-7xl mx-auto">
            <div className="mt-8">
                <ProductDetails product={product} />
                <ProductDescription product={product} />
            </div>
        </div>
    )
}

export default ProductPage
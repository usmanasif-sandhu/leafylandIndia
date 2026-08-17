'use client'
import Hero from "@/components/Hero";
import FeaturedSection from "@/components/FeaturedSection";
import ProductCard from "@/components/ProductCard";
import ServiceCard from "@/components/ServiceCard";
import PropertyCard from "@/components/PropertyCard";
import { products } from "@/lib/data/products";
import { services } from "@/lib/data/services";
import { properties } from "@/lib/data/properties";
import { ShieldCheck, Truck, Leaf, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
    const featuredProducts = products.filter(p => p.featured).slice(0, 8)
    const featuredServices = services.filter(s => s.featured).slice(0, 6)
    const featuredProperties = properties.filter(p => p.featured).slice(0, 4)

    return (
        <div>
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Featured Products */}
                <FeaturedSection
                    title="Popular Plants & Products"
                    items={featuredProducts}
                    viewAllLink="/products"
                    renderItem={(product) => <ProductCard product={product} />}
                />

                {/* Featured Services */}
                <FeaturedSection
                    title="Trending Services"
                    items={featuredServices}
                    viewAllLink="/services"
                    viewAllText="View All"
                    renderItem={(service) => <ServiceCard service={service} />}
                />

                {/* Featured Properties */}
                <FeaturedSection
                    title="Farmhouses & Land"
                    items={featuredProperties}
                    viewAllLink="/properties"
                    viewAllText="Browse All"
                    renderItem={(property) => <PropertyCard property={property} />}
                />

                {/* Trust / How It Works Section */}
                <section className="my-12 sm:my-16">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 text-center mb-8">Why LeafyLand?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 text-sm">Vetted Vendors</h3>
                            <p className="text-xs text-slate-500 mt-1">Every seller is reviewed before listing</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                                <Truck className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 text-sm">Secure Delivery</h3>
                            <p className="text-xs text-slate-500 mt-1">Plants delivered safely to your door</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                                <Leaf className="w-6 h-6 text-amber-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 text-sm">Quality Guarantee</h3>
                            <p className="text-xs text-slate-500 mt-1">Healthy plants or your money back</p>
                        </div>
                        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                                <Star className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-slate-800 text-sm">Expert Advice</h3>
                            <p className="text-xs text-slate-500 mt-1">Free gardening tips from our pros</p>
                        </div>
                    </div>
                </section>

                {/* CTA Banner */}
                <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 sm:p-12 text-center mb-12">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Ready to transform your space?</h2>
                    <p className="text-emerald-100 text-sm sm:text-base mt-2 max-w-lg mx-auto">
                        Whether you need a single plant or a complete landscape overhaul, LeafyLand connects you with the right vendors and professionals.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        <Link href="/products" className="bg-white text-emerald-700 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-50 transition">
                            Browse Products
                        </Link>
                        <Link href="/services" className="border border-emerald-300 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-500 transition">
                            Find a Professional
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

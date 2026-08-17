'use client'
import { useState } from 'react'
import CategoriesStrip from "@/components/CategoriesStrip";
import FeaturedSection from "@/components/FeaturedSection";
import ProductCard from "@/components/ProductCard";
import PropertyCard from "@/components/PropertyCard";
import { products } from "@/lib/data/products";
import { services } from "@/lib/data/services";
import { properties } from "@/lib/data/properties";
import { ShieldCheck, Truck, Leaf, Star, ChevronRight, Droplets, Scissors, Sparkles, Recycle, Flower2, Wrench, Package, Home, AlertTriangle, RefreshCw, Building, Paintbrush, Hammer, Droplet, Camera, Trash2, Zap } from "lucide-react";
import Link from "next/link";

const serviceIcons = {
    'Plant Watering': Droplets,
    'Lawn Mowing': Scissors,
    'Garden Cleaning': Sparkles,
    'Pest Control': ShieldCheck,
    'Waste Recycling': Recycle,
    'Indoor Plant Care': Leaf,
    'Soil Replacement': Flower2,
    'Irrigation Repair': Wrench,
    'Compost Pickup': Truck,
    'Balcony Setup': Home,
    'Emergency Garden': AlertTriangle,
    'Plant Replacement': RefreshCw,
    'Housekeeping': Building,
    'Deep Cleaning': Sparkles,
    'AC Service': Zap,
    'Appliance Repair': Wrench,
    'Plumbing': Droplet,
    'Electrical': Zap,
    'Painting': Paintbrush,
    'Carpentry': Hammer,
    'Waterproofing': ShieldCheck,
    'CCTV': Camera,
    'Shifting': Package,
    'Junk Removal': Trash2,
}

export default function Home() {
    const [activeCategory, setActiveCategory] = useState('All')

    const featuredProducts = products.filter(p => p.featured).slice(0, 10)
    const allProducts = products.slice(0, 10)
    const featuredProperties = properties.filter(p => p.featured).slice(0, 6)
    const dailyServices = services.filter(s => s.category === 'Daily Needs Services').slice(0, 6)
    const homeServices = services.filter(s => s.category === 'Home Services').slice(0, 6)

    const indoorPlants = products.filter(p => p.category === 'Indoor Plants').slice(0, 8)
    const outdoorPlants = products.filter(p => p.category === 'Outdoor Plants').slice(0, 8)
    const toolsAndAccessories = products.filter(p => ['Pots & Planters', 'Garden Tools', 'Fertilizers', 'Irrigation'].includes(p.category)).slice(0, 8)
    const seeds = products.filter(p => p.category === 'Seeds').slice(0, 8)

    const showSection = (categoryMatch) => {
        if (activeCategory === 'All') return true
        return categoryMatch
    }

    return (
        <div className="bg-slate-50/50">
            <CategoriesStrip activeCategory={activeCategory} onSelect={setActiveCategory} />

            {/* Promo Banners */}
            {showSection(false) && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Link href="/products" className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 sm:p-8 overflow-hidden group hover:shadow-lg transition-shadow">
                            <div className="relative z-10">
                                <p className="text-emerald-100 text-xs font-medium mb-1">NEW ARRIVALS</p>
                                <h2 className="text-white text-lg sm:text-xl font-bold leading-tight">Premium Indoor<br />Plant Collection</h2>
                                <p className="text-emerald-200 text-xs mt-2">Starting from ₹299</p>
                                <span className="inline-flex items-center gap-1 text-white text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                                    Shop Now <ChevronRight size={14} />
                                </span>
                            </div>
                            <Leaf className="absolute -bottom-4 -right-4 w-32 h-32 text-emerald-400/30 group-hover:rotate-12 transition-transform duration-500" strokeWidth={1} />
                        </Link>

                        <Link href="/services" className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 sm:p-8 overflow-hidden group hover:shadow-lg transition-shadow">
                            <div className="relative z-10">
                                <p className="text-blue-100 text-xs font-medium mb-1">BOOK NOW</p>
                                <h2 className="text-white text-lg sm:text-xl font-bold leading-tight">Landscaping<br />Services</h2>
                                <p className="text-blue-200 text-xs mt-2">Trusted professionals near you</p>
                                <span className="inline-flex items-center gap-1 text-white text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                                    Explore <ChevronRight size={14} />
                                </span>
                            </div>
                            <Truck className="absolute -bottom-4 -right-4 w-32 h-32 text-blue-400/30 group-hover:rotate-12 transition-transform duration-500" strokeWidth={1} />
                        </Link>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Popular Plants */}
                {showSection(['Indoor Plants', 'Outdoor Plants', 'Seeds', 'Pots & Planters', 'Garden Tools', 'Fertilizers', 'Irrigation'].includes(activeCategory)) && (
                    <FeaturedSection
                        title="Popular Plants"
                        items={featuredProducts.length > 0 ? featuredProducts : allProducts}
                        viewAllLink="/products"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Indoor Plants */}
                {showSection(activeCategory === 'Indoor Plants') && indoorPlants.length > 0 && (
                    <FeaturedSection
                        title="Indoor Plants"
                        items={indoorPlants}
                        viewAllLink="/products?category=Indoor+Plants"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Outdoor Plants */}
                {showSection(activeCategory === 'Outdoor Plants') && outdoorPlants.length > 0 && (
                    <FeaturedSection
                        title="Outdoor Plants"
                        items={outdoorPlants}
                        viewAllLink="/products?category=Outdoor+Plants"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Seeds */}
                {showSection(activeCategory === 'Seeds') && seeds.length > 0 && (
                    <FeaturedSection
                        title="Seeds"
                        items={seeds}
                        viewAllLink="/products?category=Seeds"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Daily Needs Services */}
                {showSection(activeCategory === 'Services') && dailyServices.length > 0 && (
                    <section className="py-5">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-slate-800">Daily Needs Services</h2>
                                <p className="text-xs text-slate-500 mt-0.5">On-demand green & home services at your doorstep</p>
                            </div>
                            <Link href="/services" className="text-emerald-600 text-xs font-semibold hover:text-emerald-700 flex items-center gap-0.5 transition-colors">
                                See All <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {dailyServices.map(service => {
                                const Icon = serviceIcons[service.name] || Leaf
                                return (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.slug}`}
                                        className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                                            <Icon size={20} className="text-emerald-600" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">{service.name}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* Home Services */}
                {showSection(activeCategory === 'Services') && homeServices.length > 0 && (
                    <section className="py-5">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <h2 className="text-base sm:text-lg font-bold text-slate-800">Home Services</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Professional home maintenance and repair</p>
                            </div>
                            <Link href="/services" className="text-emerald-600 text-xs font-semibold hover:text-emerald-700 flex items-center gap-0.5 transition-colors">
                                See All <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {homeServices.map(service => {
                                const Icon = serviceIcons[service.name] || Leaf
                                return (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.slug}`}
                                        className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                                            <Icon size={20} className="text-emerald-600" />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">{service.name}</span>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* Tools & Accessories */}
                {showSection(['Pots & Planters', 'Garden Tools', 'Fertilizers', 'Irrigation'].includes(activeCategory)) && toolsAndAccessories.length > 0 && (
                    <FeaturedSection
                        title="Tools & Accessories"
                        items={toolsAndAccessories}
                        viewAllLink="/products?category=Garden+Tools"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Farmhouses & Land */}
                {showSection(activeCategory === 'Properties') && (
                    <FeaturedSection
                        title="Farmhouses & Land"
                        items={featuredProperties}
                        viewAllLink="/properties"
                        renderItem={(property) => <PropertyCard property={property} />}
                    />
                )}
            </div>

            {/* Why LeafyLand — trust signals */}
            {activeCategory === 'All' && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 my-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { icon: ShieldCheck, label: 'Vetted Vendors', sub: 'Quality checked', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
                            { icon: Truck, label: 'Fast Delivery', sub: 'Pan-India shipping', color: 'bg-blue-50 text-blue-600 border-blue-100' },
                            { icon: Leaf, label: 'Quality Promise', sub: 'Healthy plants guaranteed', color: 'bg-green-50 text-green-600 border-green-100' },
                            { icon: Star, label: 'Expert Advice', sub: 'Free gardening tips', color: 'bg-amber-50 text-amber-600 border-amber-100' },
                        ].map((item, i) => (
                            <div key={i} className={`flex flex-col items-center text-center p-4 rounded-2xl border ${item.color}`}>
                                <item.icon size={22} className="mb-2" />
                                <p className="text-xs font-semibold text-slate-800">{item.label}</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">{item.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

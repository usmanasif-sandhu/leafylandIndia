'use client'
import { useEffect, useState } from 'react'
import CategoriesStrip from "@/components/CategoriesStrip";
import Carousel from "@/components/Carousel";
import FeaturedSection from "@/components/FeaturedSection";
import ProductCard from "@/components/ProductCard";
import PropertyCard from "@/components/PropertyCard";
import ComingSoonModal from "@/components/ComingSoonModal";
import { ShieldCheck, Truck, Leaf, Star, ChevronRight, Droplets, Scissors, Sparkles, Recycle, Flower2, Wrench, Package, Home as HomeIcon, AlertTriangle, RefreshCw, Building, Paintbrush, Hammer, Droplet, Camera, Trash2, Zap, Compass, Bot, CalendarCheck, BadgeCheck, Sprout, TreePine } from "lucide-react";
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
    'Balcony Setup': HomeIcon,
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
    const [comingSoonCategory, setComingSoonCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [services, setServices] = useState([])
    const [properties, setProperties] = useState([])

    useEffect(() => {
        Promise.all([
            fetch('/api/products').then((r) => r.json()),
            fetch('/api/services').then((r) => r.json()),
            fetch('/api/properties').then((r) => r.json()),
        ]).then(([p, s, pr]) => {
            if (Array.isArray(p)) setProducts(p)
            if (Array.isArray(s)) setServices(s)
            if (Array.isArray(pr)) setProperties(pr)
        }).catch(() => {})
    }, [])

    // LeafyLand core items (prioritized)
    const leafyProducts = products.filter(p => !p.marketplace)
    const leafyProperties = properties.filter(p => !p.marketplace)
    const leafyServices = services.filter(s => !s.marketplace)

    // General marketplace items
    const marketplaceProducts = products.filter(p => p.marketplace)
    const marketplaceProperties = properties.filter(p => p.marketplace)
    const marketplaceServices = services.filter(s => s.marketplace)

    const featuredProducts = leafyProducts.filter(p => p.featured).slice(0, 10)
    const allProducts = leafyProducts.slice(0, 10)
    const featuredProperties = leafyProperties.filter(p => p.featured).slice(0, 6)
    const dailyServices = leafyServices.filter(s => s.category === 'Daily Needs Services').slice(0, 6)
    const homeServices = leafyServices.filter(s => s.category === 'Home Services').slice(0, 6)

    // Marketplace sections
    const electronicsProducts = marketplaceProducts.filter(p => p.category === 'Electronics').slice(0, 6)
    const mobileProducts = marketplaceProducts.filter(p => p.category === 'Mobile Phones').slice(0, 6)
    const laptopProducts = marketplaceProducts.filter(p => p.category === 'Laptops').slice(0, 6)
    const fashionProducts = marketplaceProducts.filter(p => p.category === 'Fashion').slice(0, 6)
    const homeKitchenProducts = marketplaceProducts.filter(p => p.category === 'Home & Kitchen').slice(0, 6)
    const sportsProducts = marketplaceProducts.filter(p => p.category === 'Sports & Outdoors').slice(0, 6)
    const booksProducts = marketplaceProducts.filter(p => p.category === 'Books & Stationery').slice(0, 6)
    const toysProducts = marketplaceProducts.filter(p => p.category === 'Toys & Games').slice(0, 6)
    const beautyProducts = marketplaceProducts.filter(p => p.category === 'Beauty & Personal Care').slice(0, 6)

    const bigPlants = products.filter(p => p.category === 'Big Plant').slice(0, 8)
    const indoorGreenary = products.filter(p => p.category === 'Indoor Greenary').slice(0, 8)
    const fruitPlants = products.filter(p => p.category === 'Fruit Plant').slice(0, 8)
    const gardening = products.filter(p => p.category === 'Gardening').slice(0, 8)
    const planters = products.filter(p => p.category === 'Planters').slice(0, 8)
    const plants = products.filter(p => p.category === 'Plants').slice(0, 8)
    const seeds = products.filter(p => p.category === 'Seeds').slice(0, 8)
    const soilFertilizers = products.filter(p => p.category === 'Soil & Fertilizers').slice(0, 8)
    const bulbs = products.filter(p => p.category === 'Bulbs').slice(0, 8)

    const showSection = (categoryMatch) => {
        if (activeCategory === 'All') return true
        return categoryMatch
    }

    // Main category groupings
    const isPlants = activeCategory === 'Plants'
    const isGardenTools = activeCategory === 'Garden Tools'
    const isIrrigation = activeCategory === 'Irrigation'
    const isFarmhouses = activeCategory === 'Farmhouses'
    const isLandscaping = activeCategory === 'Landscaping'
    const isFertilizers = activeCategory === 'Fertilizers'
    const isPots = activeCategory === 'Pots'

    return (
        <div className="bg-slate-50/50">
            <ComingSoonModal
                isOpen={!!comingSoonCategory}
                onClose={() => setComingSoonCategory(null)}
                category={comingSoonCategory}
            />
            <CategoriesStrip activeCategory={activeCategory} onSelect={setActiveCategory} onComingSoon={setComingSoonCategory} />

            {/* Carousel */}
            {showSection(false) && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
                    <Carousel />
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Popular Plants */}
                {showSection(isPlants) && (
                    <FeaturedSection
                        title="Popular Plants"
                        items={featuredProducts.length > 0 ? featuredProducts : allProducts}
                        viewAllLink="/products"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Indoor Greenary */}
                {showSection(isPlants) && indoorGreenary.length > 0 && (
                    <FeaturedSection
                        title="Indoor Greenary"
                        items={indoorGreenary}
                        viewAllLink="/products?category=Indoor+Greenary"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Big Plant */}
                {showSection(isPlants) && bigPlants.length > 0 && (
                    <FeaturedSection
                        title="Big Plants"
                        items={bigPlants}
                        viewAllLink="/products?category=Big+Plant"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Plants (Outdoor) */}
                {showSection(isPlants) && plants.length > 0 && (
                    <FeaturedSection
                        title="Outdoor Plants"
                        items={plants}
                        viewAllLink="/products?category=Plants"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Fruit Plant */}
                {showSection(isPlants) && fruitPlants.length > 0 && (
                    <FeaturedSection
                        title="Fruit Plants"
                        items={fruitPlants}
                        viewAllLink="/products?category=Fruit+Plant"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Bulbs */}
                {showSection(isPlants) && bulbs.length > 0 && (
                    <FeaturedSection
                        title="Bulbs"
                        items={bulbs}
                        viewAllLink="/products?category=Bulbs"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Seeds */}
                {showSection(isPlants) && seeds.length > 0 && (
                    <FeaturedSection
                        title="Seeds"
                        items={seeds}
                        viewAllLink="/products?category=Seeds"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Daily Needs Services */}
                {showSection(isLandscaping) && dailyServices.length > 0 && (
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
                                        href={`/services/${service.id}`}
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
                {showSection(isLandscaping) && homeServices.length > 0 && (
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
                                        href={`/services/${service.id}`}
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

                {/* Planters */}
                {showSection(isPots) && planters.length > 0 && (
                    <FeaturedSection
                        title="Planters"
                        items={planters}
                        viewAllLink="/products?category=Planters"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Soil & Fertilizers */}
                {showSection(isFertilizers) && soilFertilizers.length > 0 && (
                    <FeaturedSection
                        title="Soil & Fertilizers"
                        items={soilFertilizers}
                        viewAllLink="/products?category=Soil+%26+Fertilizers"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Gardening Tools */}
                {showSection(isGardenTools || isIrrigation) && gardening.length > 0 && (
                    <FeaturedSection
                        title="Gardening Tools"
                        items={gardening}
                        viewAllLink="/products?category=Gardening"
                        renderItem={(product) => <ProductCard product={product} />}
                    />
                )}

                {/* Farmhouses & Land */}
                {showSection(isFarmhouses) && (
                    <FeaturedSection
                        title="Farmhouses & Land"
                        items={featuredProperties}
                        viewAllLink="/properties"
                        renderItem={(property) => <PropertyCard property={property} />}
                    />
                )}

                {/* ═══ MARKETPLACE SECTIONS ═══ */}
                {activeCategory === 'All' && (
                    <>
                        {/* Divider */}
                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-slate-200" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Marketplace</span>
                            <div className="flex-1 h-px bg-slate-200" />
                        </div>

                        {/* Electronics */}
                        {electronicsProducts.length > 0 && (
                            <FeaturedSection
                                title="Electronics"
                                items={electronicsProducts}
                                viewAllLink="/products?category=Electronics"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Mobile Phones */}
                        {mobileProducts.length > 0 && (
                            <FeaturedSection
                                title="Mobile Phones"
                                items={mobileProducts}
                                viewAllLink="/products?category=Mobile+Phones"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Laptops */}
                        {laptopProducts.length > 0 && (
                            <FeaturedSection
                                title="Laptops"
                                items={laptopProducts}
                                viewAllLink="/products?category=Laptops"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Fashion */}
                        {fashionProducts.length > 0 && (
                            <FeaturedSection
                                title="Fashion"
                                items={fashionProducts}
                                viewAllLink="/products?category=Fashion"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Home & Kitchen */}
                        {homeKitchenProducts.length > 0 && (
                            <FeaturedSection
                                title="Home & Kitchen"
                                items={homeKitchenProducts}
                                viewAllLink="/products?category=Home+%26+Kitchen"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Sports & Outdoors */}
                        {sportsProducts.length > 0 && (
                            <FeaturedSection
                                title="Sports & Outdoors"
                                items={sportsProducts}
                                viewAllLink="/products?category=Sports+%26+Outdoors"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Books & Stationery */}
                        {booksProducts.length > 0 && (
                            <FeaturedSection
                                title="Books & Stationery"
                                items={booksProducts}
                                viewAllLink="/products?category=Books+%26+Stationery"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Toys & Games */}
                        {toysProducts.length > 0 && (
                            <FeaturedSection
                                title="Toys & Games"
                                items={toysProducts}
                                viewAllLink="/products?category=Toys+%26+Games"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Beauty & Personal Care */}
                        {beautyProducts.length > 0 && (
                            <FeaturedSection
                                title="Beauty & Personal Care"
                                items={beautyProducts}
                                viewAllLink="/products?category=Beauty+%26+Personal+Care"
                                renderItem={(product) => <ProductCard product={product} />}
                            />
                        )}

                        {/* Properties — General */}
                        {marketplaceProperties.length > 0 && (
                            <FeaturedSection
                                title="Properties"
                                items={marketplaceProperties}
                                viewAllLink="/properties"
                                renderItem={(property) => <PropertyCard property={property} />}
                            />
                        )}
                    </>
                )}
            </div>

            {/* Expert Options */}
            {activeCategory === 'All' && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    <div className="text-center mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-slate-800">Expert Services</h2>
                        <p className="text-sm text-slate-500 mt-1">Professional guidance for all your gardening needs</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { icon: Compass, label: 'Hire Landscape Architects', sub: 'Custom garden & landscape design', bg: 'bg-[#e8f5e9]', iconBg: 'bg-[#2e7d32]', iconColor: 'text-white', href: '/services' },
                            { icon: Bot, label: 'Consult Plant Doctor AI', sub: 'Instant plant health diagnosis', bg: 'bg-[#fff8e1]', iconBg: 'bg-[#f9a825]', iconColor: 'text-white', href: '/services' },
                            { icon: CalendarCheck, label: 'Schedule Onsite Agronomist', sub: 'Expert farm & soil consultation', bg: 'bg-[#e0f2f1]', iconBg: 'bg-[#00897b]', iconColor: 'text-white', href: '/services' },
                            { icon: BadgeCheck, label: 'Verified Garden Contractors', sub: 'Trusted & rated professionals', bg: 'bg-[#e8f5e9]', iconBg: 'bg-[#388e3c]', iconColor: 'text-white', href: '/services' },
                        ].map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={`relative ${item.bg} rounded-2xl p-5 sm:p-6 hover:shadow-md transition-all group overflow-hidden`}
                            >
                                <div className="flex flex-col h-full">
                                    <div>
                                        <p className="text-base sm:text-lg font-bold text-slate-800">{item.label}</p>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1">{item.sub}</p>
                                    </div>
                                    <div className="mt-auto pt-6">
                                        <span className="text-xs font-semibold text-slate-600 group-hover:text-emerald-600 transition-colors flex items-center gap-1">
                                            Explore <ChevronRight size={14} />
                                        </span>
                                    </div>
                                </div>
                                <div className={`absolute top-4 right-4 w-11 h-11 ${item.iconBg} rounded-xl flex items-center justify-center`}>
                                    <item.icon size={22} className={item.iconColor} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

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

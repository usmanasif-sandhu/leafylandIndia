'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Leaf, TreePine, Flower2, Fence, Shovel, Droplets, FlaskConical, Mountain, Home as HomeIcon, Sprout, Package, Scissors } from 'lucide-react'

const categories = [
    { name: 'All', icon: null, href: '/products', active: true },
    { name: 'Indoor Plants', icon: Leaf, href: '/products?category=Indoor+Plants' },
    { name: 'Outdoor Plants', icon: TreePine, href: '/products?category=Outdoor+Plants' },
    { name: 'Seeds', icon: Flower2, href: '/products?category=Seeds' },
    { name: 'Pots & Planters', icon: Fence, href: '/products?category=Pots+%26+Planters' },
    { name: 'Garden Tools', icon: Shovel, href: '/products?category=Garden+Tools' },
    { name: 'Irrigation', icon: Droplets, href: '/products?category=Irrigation' },
    { name: 'Fertilizers', icon: FlaskConical, href: '/products?category=Fertilizers' },
    { name: 'Services', icon: Scissors, href: '/services' },
    { name: 'Properties', icon: HomeIcon, href: '/properties' },
]

const subCategories = [
    { name: 'Indoor Plants', icon: Leaf, color: 'bg-emerald-50 text-emerald-700 border-emerald-200', href: '/products?category=Indoor+Plants' },
    { name: 'Outdoor Plants', icon: TreePine, color: 'bg-green-50 text-green-700 border-green-200', href: '/products?category=Outdoor+Plants' },
    { name: 'Office Plants', icon: Sprout, color: 'bg-teal-50 text-teal-700 border-teal-200', href: '/products?category=Office+Plants' },
    { name: 'Seeds & Bulbs', icon: Flower2, color: 'bg-pink-50 text-pink-700 border-pink-200', href: '/products?category=Seeds' },
    { name: 'Pots', icon: Fence, color: 'bg-amber-50 text-amber-700 border-amber-200', href: '/products?category=Pots+%26+Planters' },
    { name: 'Garden Tools', icon: Shovel, color: 'bg-orange-50 text-orange-700 border-orange-200', href: '/products?category=Garden+Tools' },
    { name: 'Irrigation', icon: Droplets, color: 'bg-cyan-50 text-cyan-700 border-cyan-200', href: '/products?category=Irrigation' },
    { name: 'Fertilizers', icon: FlaskConical, color: 'bg-lime-50 text-lime-700 border-lime-200', href: '/products?category=Fertilizers' },
    { name: 'Garden Furniture', icon: Package, color: 'bg-stone-50 text-stone-700 border-stone-200', href: '/products?category=Garden+Furniture' },
    { name: 'Landscaping', icon: Mountain, color: 'bg-slate-50 text-slate-700 border-slate-200', href: '/products?category=Landscaping+Materials' },
    { name: 'Turf & Grass', icon: Leaf, color: 'bg-lime-50 text-lime-600 border-lime-200', href: '/products?category=Turf+%26+Grass' },
    { name: 'Services', icon: Scissors, color: 'bg-blue-50 text-blue-700 border-blue-200', href: '/services' },
    { name: 'Properties', icon: HomeIcon, color: 'bg-amber-50 text-amber-700 border-amber-200', href: '/properties' },
]

const CategoriesStrip = () => {
    const [activeTab, setActiveTab] = useState('All')

    return (
        <div className="sticky top-14 sm:top-16 z-40 glass-categories">
            {/* Pill tabs — top row, horizontal scroll */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2.5">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(cat.name)}
                            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                                activeTab === cat.name
                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {cat.icon && <cat.icon size={13} />}
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sub-category circles — second row, horizontal scroll */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3">
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                    {subCategories.map((cat, i) => {
                        const Icon = cat.icon
                        return (
                            <Link
                                key={i}
                                href={cat.href}
                                className="flex-shrink-0 flex flex-col items-center gap-1.5 w-16 sm:w-20 group"
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center ${cat.color} group-hover:scale-110 group-hover:shadow-md transition-all`}>
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                                </div>
                                <span className="text-[10px] sm:text-[11px] text-slate-600 text-center leading-tight group-hover:text-emerald-600 transition-colors">{cat.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoriesStrip

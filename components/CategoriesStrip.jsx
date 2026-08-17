'use client'
import { Leaf, Wrench, Droplets, Home as HomeIcon, Scissors, FlaskConical, Fence } from 'lucide-react'

const mainCategories = [
    { name: 'Plants', sub: 'Indoor & outdoor', icon: Leaf, color: 'bg-[#e8f5e9]', iconColor: 'text-emerald-600', href: '/products', subcategories: ['Indoor Greenary', 'Plants', 'Big Plant', 'Bulbs', 'Fruit Plant', 'Seeds'] },
    { name: 'Garden Tools', sub: 'Equipment', icon: Wrench, color: 'bg-[#fff8e1]', iconColor: 'text-amber-600', href: '/products?category=Gardening', subcategories: ['Gardening'] },
    { name: 'Irrigation', sub: 'Water systems', icon: Droplets, color: 'bg-[#e3f2fd]', iconColor: 'text-blue-600', href: '/products?category=Gardening', subcategories: ['Gardening'] },
    { name: 'Farmhouses', sub: 'Buy or rent', icon: HomeIcon, color: 'bg-[#fff3e0]', iconColor: 'text-orange-600', href: '/properties', subcategories: [] },
    { name: 'Landscaping', sub: 'Book a pro', icon: Scissors, color: 'bg-[#e8f5e9]', iconColor: 'text-emerald-600', href: '/services', subcategories: [] },
    { name: 'Fertilizers', sub: 'Soil & growth', icon: FlaskConical, color: 'bg-[#f1f8e9]', iconColor: 'text-lime-600', href: '/products?category=Soil+%26+Fertilizers', subcategories: ['Soil & Fertilizers'] },
    { name: 'Pots', sub: 'Planters & pots', icon: Fence, color: 'bg-[#fce4ec]', iconColor: 'text-pink-600', href: '/products?category=Planters', subcategories: ['Planters'] },
]

const CategoriesStrip = ({ activeCategory, onSelect }) => {
    return (
        <div className="sticky top-14 sm:top-16 z-40 glass-categories">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-3">
                    {mainCategories.map((cat, i) => {
                        const active = activeCategory === cat.name || cat.subcategories.includes(activeCategory)
                        return (
                            <button
                                key={i}
                                onClick={() => onSelect(cat.name)}
                                className={`flex-shrink-0 flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                                    active
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                        : `${cat.color} hover:shadow-md`
                                }`}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-white/20' : 'bg-white/70'}`}>
                                    <cat.icon size={18} className={active ? 'text-white' : cat.iconColor} />
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-xs font-bold leading-tight ${active ? 'text-white' : 'text-slate-800'}`}>{cat.name}</p>
                                    <p className={`text-[10px] leading-tight ${active ? 'text-white/70' : 'text-slate-500'}`}>{cat.sub}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export { mainCategories }
export default CategoriesStrip

'use client'
import { Leaf, TreePine, Flower2, Fence, Shovel, Droplets, FlaskConical, Home as HomeIcon, Scissors, Package, Sprout, FlowerIcon, Apple } from 'lucide-react'

const categories = [
    { name: 'All', icon: Package },
    { name: 'Big Plant', icon: TreePine },
    { name: 'Bulbs', icon: Flower2 },
    { name: 'Fruit Plant', icon: Apple },
    { name: 'Gardening', icon: Shovel },
    { name: 'Indoor Greenary', icon: Leaf },
    { name: 'Planters', icon: Fence },
    { name: 'Plants', icon: Sprout },
    { name: 'Seeds', icon: FlowerIcon },
    { name: 'Soil & Fertilizers', icon: FlaskConical },
]

const CategoriesStrip = ({ activeCategory, onSelect }) => {
    return (
        <div className="sticky top-14 sm:top-16 z-40 glass-categories">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2.5">
                    {categories.map((cat, i) => {
                        const active = activeCategory === cat.name
                        return (
                            <button
                                key={i}
                                onClick={() => onSelect(cat.name)}
                                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                                    active
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat.icon && <cat.icon size={13} />}
                                {cat.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoriesStrip

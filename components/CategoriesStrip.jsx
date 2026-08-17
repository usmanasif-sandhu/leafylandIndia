'use client'
import { Leaf, TreePine, Flower2, Fence, Shovel, Droplets, FlaskConical, Home as HomeIcon, Scissors, Package } from 'lucide-react'

const categories = [
    { name: 'All', icon: Package },
    { name: 'Indoor Plants', icon: Leaf },
    { name: 'Outdoor Plants', icon: TreePine },
    { name: 'Seeds', icon: Flower2 },
    { name: 'Pots & Planters', icon: Fence },
    { name: 'Garden Tools', icon: Shovel },
    { name: 'Irrigation', icon: Droplets },
    { name: 'Fertilizers', icon: FlaskConical },
    { name: 'Services', icon: Scissors },
    { name: 'Properties', icon: HomeIcon },
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

'use client'
import { useState, useRef, useEffect } from 'react'
import { Leaf, Wrench, Droplets, Home as HomeIcon, Scissors, FlaskConical, Fence, ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'

const mainCategories = [
    {
        name: 'Plants', sub: 'Indoor & outdoor', icon: Leaf, color: 'bg-[#e8f5e9]', iconColor: 'text-emerald-600',
        subcategories: [
            { name: 'Indoor Greenary', href: '/products?category=Indoor+Greenary' },
            { name: 'Outdoor Plants', href: '/products?category=Plants' },
            { name: 'Big Plant', href: '/products?category=Big+Plant' },
            { name: 'Bulbs', href: '/products?category=Bulbs' },
            { name: 'Fruit Plant', href: '/products?category=Fruit+Plant' },
            { name: 'Seeds', href: '/products?category=Seeds' },
        ]
    },
    {
        name: 'Garden Tools', sub: 'Equipment', icon: Wrench, color: 'bg-[#f1f8e9]', iconColor: 'text-lime-600',
        subcategories: [
            { name: 'Pruning Shears', href: '/products?category=Gardening' },
            { name: 'Tool Sets', href: '/products?category=Gardening' },
            { name: 'Irrigation Kits', href: '/products?category=Gardening' },
        ]
    },
    {
        name: 'Irrigation', sub: 'Water systems', icon: Droplets, color: 'bg-[#e0f2f1]', iconColor: 'text-teal-600',
        subcategories: [
            { name: 'Drip Systems', href: '/products?category=Gardening' },
            { name: 'Sprinklers', href: '/products?category=Gardening' },
            { name: 'Hoses & Connectors', href: '/products?category=Gardening' },
        ]
    },
    {
        name: 'Farmhouses', sub: 'Buy or rent', icon: HomeIcon, color: 'bg-[#fff3e0]', iconColor: 'text-orange-600',
        subcategories: [
            { name: 'Farmhouses', href: '/properties' },
            { name: 'Land', href: '/properties' },
            { name: 'Farm Stays', href: '/properties' },
        ]
    },
    {
        name: 'Landscaping', sub: 'Book a pro', icon: Scissors, color: 'bg-[#e8f5e9]', iconColor: 'text-emerald-600',
        subcategories: [
            { name: 'Daily Needs', href: '/services' },
            { name: 'Home Services', href: '/services' },
            { name: 'Garden Maintenance', href: '/services' },
        ]
    },
    {
        name: 'Fertilizers', sub: 'Soil & growth', icon: FlaskConical, color: 'bg-[#f1f8e9]', iconColor: 'text-lime-600',
        subcategories: [
            { name: 'Organic Mix', href: '/products?category=Soil+%26+Fertilizers' },
            { name: 'Vermicompost', href: '/products?category=Soil+%26+Fertilizers' },
            { name: 'Liquid Fertilizer', href: '/products?category=Soil+%26+Fertilizers' },
        ]
    },
    {
        name: 'Pots', sub: 'Planters & pots', icon: Fence, color: 'bg-[#fce4ec]', iconColor: 'text-pink-600',
        subcategories: [
            { name: 'Ceramic Pots', href: '/products?category=Planters' },
            { name: 'Hanging Baskets', href: '/products?category=Planters' },
            { name: 'Self-Watering', href: '/products?category=Planters' },
        ]
    },
]

const CategoriesStrip = ({ activeCategory, onSelect }) => {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [hoveredCard, setHoveredCard] = useState(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const handleCardClick = (cat, e) => {
        e.stopPropagation()
        if (openDropdown === cat.name) {
            setOpenDropdown(null)
        } else {
            setOpenDropdown(cat.name)
            onSelect(cat.name)
        }
    }

    return (
        <div className="sticky top-14 sm:top-16 z-40 glass-categories" ref={dropdownRef}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-3 relative">
                    {mainCategories.map((cat, i) => {
                        const active = activeCategory === cat.name || openDropdown === cat.name
                        const isOpen = openDropdown === cat.name
                        return (
                            <div key={i} className="relative flex-shrink-0">
                                <button
                                    onClick={(e) => handleCardClick(cat, e)}
                                    onMouseEnter={() => setHoveredCard(cat.name)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
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
                                    <ChevronDown size={12} className={`transition-transform ${active ? 'text-white/70' : 'text-slate-400'} ${isOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown */}
                                {isOpen && (
                                    <div className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                                        <div className="p-2 border-b border-slate-100">
                                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">{cat.name}</p>
                                        </div>
                                        <div className="p-1.5">
                                            {cat.subcategories.map((sub, j) => (
                                                <Link
                                                    key={j}
                                                    href={sub.href}
                                                    onClick={() => setOpenDropdown(null)}
                                                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                                                >
                                                    <cat.icon size={13} className="text-slate-400" />
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="p-1.5 border-t border-slate-100">
                                            <Link
                                                href={cat.subcategories[0]?.href || '/products'}
                                                onClick={() => setOpenDropdown(null)}
                                                className="flex items-center justify-center gap-1 px-3 py-2 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                            >
                                                View All {cat.name} <ChevronDown size={11} className="-rotate-90" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export { mainCategories }
export default CategoriesStrip

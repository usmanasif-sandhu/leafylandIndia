'use client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Leaf, TreePine, Flower2, Fence, Shovel, Droplets, FlaskConical, Home as HomeIcon, Scissors } from 'lucide-react'

const categories = [
    { name: 'All', icon: null, href: '/products' },
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

const CategoriesStrip = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category') || ''

    const isActive = (cat) => {
        if (cat.name === 'All') return pathname === '/products' && !currentCategory
        if (cat.name === 'Services') return pathname === '/services'
        if (cat.name === 'Properties') return pathname === '/properties'
        return currentCategory === cat.href.split('category=')[1]?.replace(/\+/g, ' ')
    }

    return (
        <div className="sticky top-14 sm:top-16 z-40 glass-categories">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2.5">
                    {categories.map((cat, i) => {
                        const active = isActive(cat)
                        return (
                            <Link
                                key={i}
                                href={cat.href}
                                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                                    active
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat.icon && <cat.icon size={13} />}
                                {cat.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoriesStrip

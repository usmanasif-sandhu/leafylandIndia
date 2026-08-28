// Main navbar menus: Products, Services, Properties + existing subcategories.

import { LEAFY_CATEGORIES, MARKETPLACE_CATEGORIES } from '@/lib/categories'
import { nicheToNavItem, productHref } from '@/lib/product-niches'

export const SEARCH_SCOPES = [
    { id: 'all', label: 'All Categories', path: '/products' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'properties', label: 'Properties', path: '/properties' },
]

/** Fallback when API has no products yet */
export const PRODUCTS_SUBCATEGORIES = [
    ...LEAFY_CATEGORIES.map((name) => ({ name, href: productHref(name) })),
    ...MARKETPLACE_CATEGORIES.map((name) => ({ name, href: productHref(name) })),
]

export const SERVICES_SUBCATEGORIES = [
    { name: 'Daily Needs Services', href: '/services' },
    { name: 'Home Services', href: '/services' },
    { name: 'Garden Maintenance', href: '/services' },
    { name: 'Landscaping', href: '/services' },
    { name: 'Irrigation', href: '/services' },
]

export const PROPERTIES_SUBCATEGORIES = [
    { name: 'Farmhouses', href: '/properties' },
    { name: 'Land', href: '/properties' },
    { name: 'Farm Stays', href: '/properties' },
    { name: 'All Properties', href: '/properties' },
]

export const MAIN_NAV_MENUS = [
    {
        id: 'products',
        label: 'Products',
        href: '/products',
        items: PRODUCTS_SUBCATEGORIES,
    },
    {
        id: 'services',
        label: 'Services',
        href: '/services',
        items: SERVICES_SUBCATEGORIES,
    },
    {
        id: 'properties',
        label: 'Properties',
        href: '/properties',
        items: PROPERTIES_SUBCATEGORIES,
    },
]

/** Bottom-nav menus — niches loaded live from product/service/property APIs in Navbar */
export const SECONDARY_NAV_MENUS = [
    { id: 'shop', label: 'Shop', href: '/products', nicheSource: 'products-all' },
    { id: 'services', label: 'Services', href: '/services', nicheSource: 'services' },
    { id: 'classifieds', label: 'Classifieds', href: '/products', nicheSource: 'classifieds' },
    { id: 'property', label: 'Property', href: '/properties', nicheSource: 'properties' },
]

export const MORE_NAV_LINKS = [
    { name: 'About', href: '/about', icon: 'info' },
    { name: 'How it works', href: '/how-it-works', icon: 'compass' },
    { name: 'Contact', href: '/contact', icon: 'mail' },
    { name: 'Become a Seller', href: '/become-seller', icon: 'store' },
    { name: 'Become a partner', href: '/partner', icon: 'handshake' },
]

const SERVICE_ICONS = {
    'Daily Needs Services': 'droplets',
    'Home Services': 'home',
    'Garden Maintenance': 'scissors',
    Landscaping: 'tree',
    Irrigation: 'droplets',
}

/** Classifieds dropdown — short curated list only */
export const CLASSIFIEDS_NAV_ITEMS = [
    { name: 'Gardening', href: '/products?category=Gardening', icon: 'shovel' },
    { name: 'Electronics', href: '/products?category=Electronics', icon: 'smartphone' },
    { name: 'Sports', href: '/products?category=Sports+%26+Outdoors', icon: 'trophy' },
    { name: 'Fashion', href: '/products?category=Fashion', icon: 'shirt' },
    { name: 'Home & Kitchen', href: '/products?category=Home+%26+Kitchen', icon: 'sofa' },
]

export function buildPopularItems(menuId, niches) {
    switch (menuId) {
        case 'shop':
            return [
                ...niches.productsAll.map(nicheToNavItem),
                { name: 'All products', href: '/products', icon: 'tag' },
            ]
        case 'classifieds':
            return CLASSIFIEDS_NAV_ITEMS
        case 'services':
            return niches.services.length > 0
                ? [
                    ...niches.services.map((n) => ({
                        name: n.name,
                        href: `/services?category=${encodeURIComponent(n.name)}`,
                        icon: SERVICE_ICONS[n.name] || 'calendar',
                    })),
                    { name: 'Book a service', href: '/services', icon: 'calendar' },
                ]
                : SERVICES_SUBCATEGORIES.map((s) => ({
                    ...s,
                    icon: SERVICE_ICONS[s.name] || 'calendar',
                }))
        case 'property':
            return niches.properties.length > 0
                ? [
                    ...niches.properties.map((n) => ({
                        name: n.name,
                        href: `/properties?type=${encodeURIComponent(n.name)}`,
                        icon: 'home',
                    })),
                    { name: 'All properties', href: '/properties', icon: 'tag' },
                ]
                : PROPERTIES_SUBCATEGORIES.map((p) => ({ ...p, icon: 'home' }))
        default:
            return []
    }
}

/** Full product category list for the search-bar Products dropdown */
export function buildProductsMenuItems() {
    return PRODUCTS_SUBCATEGORIES
}

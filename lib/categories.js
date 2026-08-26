// Central source of truth for product categories.
// "Marketplace" categories are treated as marketplace listings (derived from
// the category value itself — there is no separate DB column).

export const LEAFY_CATEGORIES = [
    'Big Plant', 'Bulbs', 'Fruit Plant', 'Gardening', 'Indoor Greenary',
    'Planters', 'Plants', 'Seeds', 'Soil & Fertilizers',
]

export const MARKETPLACE_CATEGORIES = [
    'Electronics', 'Mobile Phones', 'Laptops', 'Fashion',
    'Home & Kitchen', 'Sports & Outdoors', 'Books & Stationery',
    'Toys & Games', 'Beauty & Personal Care', 'Automotive',
]

export const ALL_CATEGORIES = [...LEAFY_CATEGORIES, ...MARKETPLACE_CATEGORIES]

export const isMarketplaceCategory = (category) =>
    MARKETPLACE_CATEGORIES.includes(category)

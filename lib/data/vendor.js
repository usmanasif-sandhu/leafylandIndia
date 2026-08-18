// ═══════════════════════════════════════════════
// VENDOR / STORE MOCK DATA
// ═══════════════════════════════════════════════

export const storeInfo = {
    id: 'store-1',
    name: 'Fresh Roots Nursery',
    username: 'freshroots',
    logo: '/logo.png',
    description: 'Premium nursery offering a wide variety of organic indoor and outdoor plants, garden tools, and landscaping materials.',
    status: 'active',
    address: '12 MG Road, Bangalore, Karnataka 560001',
    city: 'Bangalore',
    contact: '+91 98765 43210',
    email: 'info@freshroots.in',
    website: 'https://freshroots.in',
    gstNumber: '29AABCF1234N1Z5',
    panNumber: 'AABCF1234N',
    bankAccount: '****4567',
    ifscCode: 'HDFC0001234',
    upiId: 'freshroots@upi',
    businessHours: 'Mon-Sat: 9:00 AM - 7:00 PM',
    shippingPolicy: 'Free shipping on orders above ₹999. Delivery within 3-5 business days.',
    returnPolicy: '7-day return policy for plants. Replacement guaranteed for damaged items.',
    createdAt: '2025-06-15T10:30:00Z',
}

export const vendorProducts = [
    // ─── LeafyLand Products ───
    { id: '1', name: 'Areca Palm Giant', slug: 'areca-palm-giant', description: 'Tall, lush Areca Palm perfect for corners and large spaces.', price: 1499, mrp: 2100, category: 'Big Plant', images: ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop'], stock: 15, inStock: true, totalSales: 142, revenue: 212858, rating: [5, 4, 5, 5, 4], createdAt: '2025-06-20' },
    { id: '2', name: 'Ficus lyrata (Fiddle Leaf Fig)', slug: 'fiddle-leaf-fig', description: 'Statement fiddle leaf fig tree. Ideal for living rooms.', price: 2499, mrp: 3200, category: 'Big Plant', images: ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop'], stock: 10, inStock: true, totalSales: 89, revenue: 222411, rating: [5, 5, 4, 5], createdAt: '2025-06-20' },
    { id: '3', name: 'Money Plant Golden', slug: 'money-plant-golden', description: 'Low-maintenance golden money plant. Great for shelves.', price: 299, mrp: 450, category: 'Indoor Greenary', images: ['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop'], stock: 40, inStock: true, totalSales: 320, revenue: 95680, rating: [5, 4, 4, 5, 5, 4], createdAt: '2025-06-22' },
    { id: '4', name: 'Snake Plant Laurentii', slug: 'snake-plant-laurentii', description: 'Air-purifying snake plant with golden-edged leaves.', price: 449, mrp: 650, category: 'Indoor Greenary', images: ['https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop'], stock: 35, inStock: true, totalSales: 210, revenue: 94290, rating: [5, 5, 5, 4], createdAt: '2025-06-22' },
    { id: '5', name: 'Ceramic Plant Pot Set (3 pcs)', slug: 'ceramic-pot-set', description: 'Set of 3 minimalist ceramic pots in earth tones.', price: 899, mrp: 1200, category: 'Planters', images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop'], stock: 20, inStock: true, totalSales: 178, revenue: 160022, rating: [4, 5, 5, 4, 5], createdAt: '2025-07-01' },
    { id: '6', name: 'Garden Tool Set (5 pcs)', slug: 'garden-tool-set', description: 'Shovel, rake, trowel, weeder, and cultivator.', price: 1299, mrp: 1800, category: 'Gardening', images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop'], stock: 20, inStock: true, totalSales: 95, revenue: 123405, rating: [5, 4, 5], createdAt: '2025-07-01' },
    { id: '7', name: 'Organic Potting Mix 5kg', slug: 'organic-potting-mix', description: 'Premium organic potting soil with cocopeat.', price: 399, mrp: 550, category: 'Soil & Fertilizers', images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop'], stock: 50, inStock: true, totalSales: 280, revenue: 111720, rating: [5, 5, 4, 5, 5], createdAt: '2025-07-05' },
    { id: '8', name: 'Lemon Plant (Grafted)', slug: 'lemon-plant-grafted', description: 'Grafted lemon plant, fruits within 6-8 months.', price: 599, mrp: 800, category: 'Fruit Plant', images: ['https://images.unsplash.com/photo-1595231712325-9e7e5718f924?w=400&h=400&fit=crop'], stock: 25, inStock: true, totalSales: 67, revenue: 40133, rating: [5, 4], createdAt: '2025-07-05' },
    { id: '9', name: 'Sunflower Seeds Pack (100g)', slug: 'sunflower-seeds', description: 'Hybrid sunflower seeds for garden beds.', price: 149, mrp: 200, category: 'Seeds', images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop'], stock: 100, inStock: true, totalSales: 450, revenue: 67050, rating: [5, 5, 5, 4, 5, 5], createdAt: '2025-07-10' },
    { id: '10', name: 'Herb Seeds Combo', slug: 'herb-seeds-combo', description: 'Kitchen herb garden starter pack. 3 packets.', price: 199, mrp: 300, category: 'Seeds', images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop'], stock: 3, inStock: true, totalSales: 190, revenue: 37810, rating: [5, 4, 5, 5], createdAt: '2025-07-10' },
    { id: '11', name: 'Bougainvillea Red', slug: 'bougainvillea-red', description: 'Vibrant red bougainvillea. Sun-loving.', price: 399, mrp: 550, category: 'Plants', images: ['https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop'], stock: 40, inStock: true, totalSales: 115, revenue: 45885, rating: [5, 5, 4], createdAt: '2025-07-12' },
    { id: '12', name: 'Drip Irrigation Kit (50m)', slug: 'drip-irrigation-kit', description: 'Complete drip irrigation system.', price: 2499, mrp: 3500, category: 'Gardening', images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop'], stock: 2, inStock: true, totalSales: 34, revenue: 84966, rating: [5, 5], createdAt: '2025-07-15' },
]

export const vendorOrders = [
    { id: 'ORD-2025-001', customer: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 11111', items: [{ name: 'Areca Palm Giant', qty: 1, price: 1499 }], total: 1499, status: 'Delivered', payment: 'UPI', date: '2025-08-15', address: '45 Koramangala, Bangalore' },
    { id: 'ORD-2025-002', customer: 'Rahul Verma', email: 'rahul@email.com', phone: '+91 98765 22222', items: [{ name: 'Money Plant Golden', qty: 3, price: 299 }], total: 897, status: 'Shipped', payment: 'Card', date: '2025-08-16', address: '12 HSR Layout, Bangalore' },
    { id: 'ORD-2025-003', customer: 'Ananya Patel', email: 'ananya@email.com', phone: '+91 98765 33333', items: [{ name: 'Garden Tool Set', qty: 1, price: 1299 }, { name: 'Organic Potting Mix', qty: 2, price: 399 }], total: 2097, status: 'Processing', payment: 'COD', date: '2025-08-16', address: '78 Indiranagar, Bangalore' },
    { id: 'ORD-2025-004', customer: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 98765 44444', items: [{ name: 'Snake Plant Laurentii', qty: 2, price: 449 }], total: 898, status: 'Delivered', payment: 'UPI', date: '2025-08-14', address: '23 Whitefield, Bangalore' },
    { id: 'ORD-2025-005', customer: 'Meera Reddy', email: 'meera@email.com', phone: '+91 98765 55555', items: [{ name: 'Ficus lyrata', qty: 1, price: 2499 }], total: 2499, status: 'Delivered', payment: 'Card', date: '2025-08-13', address: '56 JP Nagar, Bangalore' },
    { id: 'ORD-2025-006', customer: 'Arjun Nair', email: 'arjun@email.com', phone: '+91 98765 66666', items: [{ name: 'Ceramic Pot Set', qty: 1, price: 899 }, { name: 'Sunflower Seeds', qty: 2, price: 149 }], total: 1197, status: 'Shipped', payment: 'UPI', date: '2025-08-15', address: '89 Malleshwaram, Bangalore' },
    { id: 'ORD-2025-007', customer: 'Kavya Iyer', email: 'kavya@email.com', phone: '+91 98765 77777', items: [{ name: 'Herb Seeds Combo', qty: 5, price: 199 }], total: 995, status: 'Processing', payment: 'COD', date: '2025-08-16', address: '34 Jayanagar, Bangalore' },
    { id: 'ORD-2025-008', customer: 'Suresh Kumar', email: 'suresh@email.com', phone: '+91 98765 88888', items: [{ name: 'Drip Irrigation Kit', qty: 1, price: 2499 }], total: 2499, status: 'Delivered', payment: 'Card', date: '2025-08-12', address: '67 Electronic City, Bangalore' },
    { id: 'ORD-2025-009', customer: 'Neha Gupta', email: 'neha@email.com', phone: '+91 98765 99999', items: [{ name: 'Areca Palm Giant', qty: 2, price: 1499 }, { name: 'Bougainvillea Red', qty: 3, price: 399 }], total: 4195, status: 'Delivered', payment: 'UPI', date: '2025-08-11', address: '12 Hebbal, Bangalore' },
    { id: 'ORD-2025-010', customer: 'Deepak Joshi', email: 'deepak@email.com', phone: '+91 98765 00000', items: [{ name: 'Lemon Plant (Grafted)', qty: 4, price: 599 }], total: 2396, status: 'Shipped', payment: 'Card', date: '2025-08-15', address: '90 BTM Layout, Bangalore' },
    { id: 'ORD-2025-011', customer: 'Ishita Banerjee', email: 'ishita@email.com', phone: '+91 98765 12345', items: [{ name: 'Money Plant Golden', qty: 5, price: 299 }], total: 1495, status: 'Processing', payment: 'UPI', date: '2025-08-16', address: '11 Sahakarnagar, Bangalore' },
    { id: 'ORD-2025-012', customer: 'Rohan Deshmukh', email: 'rohan@email.com', phone: '+91 98765 67890', items: [{ name: 'Organic Potting Mix', qty: 10, price: 399 }], total: 3990, status: 'Delivered', payment: 'Card', date: '2025-08-10', address: '44 Yelahanka, Bangalore' },
]

export const vendorReviews = [
    { id: 'r1', customer: 'Priya Sharma', avatar: null, product: 'Areca Palm Giant', rating: 5, review: 'Beautiful plant! Arrived in perfect condition. The packaging was excellent and the plant is thriving already.', date: '2025-08-16', replied: false },
    { id: 'r2', customer: 'Rahul Verma', avatar: null, product: 'Money Plant Golden', rating: 4, review: 'Good quality plant. Slightly smaller than expected but healthy. Will buy again.', date: '2025-08-15', replied: true },
    { id: 'r3', customer: 'Ananya Patel', avatar: null, product: 'Garden Tool Set', rating: 5, review: 'Excellent quality tools! Sturdy handles and sharp blades. Great value for money.', date: '2025-08-14', replied: false },
    { id: 'r4', customer: 'Vikram Singh', avatar: null, product: 'Snake Plant Laurentii', rating: 5, review: 'Perfect air purifier for my bedroom. Leaves are vibrant and well-established.', date: '2025-08-13', replied: false },
    { id: 'r5', customer: 'Meera Reddy', avatar: null, product: 'Ficus lyrata', rating: 4, review: 'Gorgeous fiddle leaf fig! Delivery was prompt. One leaf had minor damage but overall very happy.', date: '2025-08-12', replied: true },
    { id: 'r6', customer: 'Arjun Nair', avatar: null, product: 'Ceramic Pot Set', rating: 5, review: 'Stunning pots! The earth tone colors are exactly as shown. Perfect for my balcony garden.', date: '2025-08-11', replied: false },
    { id: 'r7', customer: 'Kavya Iyer', avatar: null, product: 'Herb Seeds Combo', rating: 5, review: 'All three seeds sprouted within a week! Fresh and viable. Great starter pack.', date: '2025-08-10', replied: false },
    { id: 'r8', customer: 'Suresh Kumar', avatar: null, product: 'Drip Irrigation Kit', rating: 5, review: 'Installed it myself — very straightforward. Watering my garden is now effortless.', date: '2025-08-09', replied: true },
    { id: 'r9', customer: 'Neha Gupta', avatar: null, product: 'Areca Palm Giant', rating: 4, review: 'Tall and healthy plant. Arrived a day late but the quality makes up for it.', date: '2025-08-08', replied: false },
    { id: 'r10', customer: 'Deepak Joshi', avatar: null, product: 'Lemon Plant (Grafted)', rating: 5, review: 'Already seeing tiny lemons forming! Fast delivery and healthy plant.', date: '2025-08-07', replied: false },
]

export const vendorCustomers = [
    { id: 'c1', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 11111', city: 'Bangalore', totalOrders: 5, totalSpent: 7495, lastOrder: '2025-08-15', joined: '2025-06-20' },
    { id: 'c2', name: 'Rahul Verma', email: 'rahul@email.com', phone: '+91 98765 22222', city: 'Bangalore', totalOrders: 3, totalSpent: 2691, lastOrder: '2025-08-16', joined: '2025-07-01' },
    { id: 'c3', name: 'Ananya Patel', email: 'ananya@email.com', phone: '+91 98765 33333', city: 'Bangalore', totalOrders: 2, totalSpent: 4194, lastOrder: '2025-08-16', joined: '2025-07-10' },
    { id: 'c4', name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 98765 44444', city: 'Bangalore', totalOrders: 4, totalSpent: 3592, lastOrder: '2025-08-14', joined: '2025-06-25' },
    { id: 'c5', name: 'Meera Reddy', email: 'meera@email.com', phone: '+91 98765 55555', city: 'Bangalore', totalOrders: 1, totalSpent: 2499, lastOrder: '2025-08-13', joined: '2025-08-01' },
    { id: 'c6', name: 'Arjun Nair', email: 'arjun@email.com', phone: '+91 98765 66666', city: 'Bangalore', totalOrders: 6, totalSpent: 7182, lastOrder: '2025-08-15', joined: '2025-06-18' },
    { id: 'c7', name: 'Kavya Iyer', email: 'kavya@email.com', phone: '+91 98765 77777', city: 'Bangalore', totalOrders: 2, totalSpent: 1990, lastOrder: '2025-08-16', joined: '2025-07-20' },
    { id: 'c8', name: 'Suresh Kumar', email: 'suresh@email.com', phone: '+91 98765 88888', city: 'Bangalore', totalOrders: 3, totalSpent: 7497, lastOrder: '2025-08-12', joined: '2025-06-30' },
]

export const vendorPayouts = [
    { id: 'pay-1', amount: 12450, status: 'Completed', method: 'Bank Transfer', date: '2025-08-10', reference: 'TXN-881234' },
    { id: 'pay-2', amount: 8990, status: 'Completed', method: 'Bank Transfer', date: '2025-07-25', reference: 'TXN-771234' },
    { id: 'pay-3', amount: 15200, status: 'Completed', method: 'Bank Transfer', date: '2025-07-10', reference: 'TXN-661234' },
    { id: 'pay-4', amount: 6780, status: 'Pending', method: 'Bank Transfer', date: '2025-08-16', reference: 'TXN-991234' },
]

export const vendorInventoryAlerts = [
    { id: '10', name: 'Herb Seeds Combo', stock: 3, category: 'Seeds', status: 'low' },
    { id: '12', name: 'Drip Irrigation Kit', stock: 2, category: 'Gardening', status: 'critical' },
]

export const vendorCoupons = [
    { code: 'FRESH10', description: '10% off for new customers', discount: 10, isPublic: true, forNewUser: true, forMember: false, usageCount: 45, expiresAt: '2025-12-31' },
    { code: 'MONSOON20', description: 'Monsoon season special', discount: 20, isPublic: true, forNewUser: false, forMember: false, usageCount: 128, expiresAt: '2025-09-30' },
    { code: 'VIP15', description: 'Exclusive member discount', discount: 15, isPublic: false, forNewUser: false, forMember: true, usageCount: 67, expiresAt: '2025-12-31' },
]

export const vendorMessages = [
    { id: 'm1', customer: 'Priya Sharma', message: 'Hi, is the Areca Palm suitable for a north-facing room with low light?', reply: null, date: '2025-08-16', read: false },
    { id: 'm2', customer: 'Rahul Verma', message: 'My order was shipped yesterday but tracking shows no update. Can you check?', reply: 'Your order is on its way! The tracking updates within 24 hours. Expected delivery by tomorrow.', date: '2025-08-15', read: true },
    { id: 'm3', customer: 'Ananya Patel', message: 'Do you offer bulk discounts for corporate gifting? Need 50 plants.', reply: null, date: '2025-08-14', read: false },
    { id: 'm4', customer: 'Vikram Singh', message: 'Can I exchange the pot color? Received brown instead of grey.', reply: 'Sure! Please share your order ID and we will arrange the exchange.', date: '2025-08-13', read: true },
    { id: 'm5', customer: 'Meera Reddy', message: 'What fertilizer do you recommend for Fiddle Leaf Fig?', reply: 'We recommend our Organic Potting Mix 5kg — it has the right nutrients for Ficus plants.', date: '2025-08-12', read: true },
]

export const revenueChartData = [
    { name: 'Mon', revenue: 4500, orders: 5 },
    { name: 'Tue', revenue: 3200, orders: 3 },
    { name: 'Wed', revenue: 5800, orders: 7 },
    { name: 'Thu', revenue: 4100, orders: 4 },
    { name: 'Fri', revenue: 6200, orders: 8 },
    { name: 'Sat', revenue: 8900, orders: 12 },
    { name: 'Sun', revenue: 5400, orders: 6 },
]

export const monthlyRevenueData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 72000 },
    { name: 'Jul', revenue: 68000 },
    { name: 'Aug', revenue: 85000 },
]

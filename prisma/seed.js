import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const img = (id) => `https://images.unsplash.com/photo-${id}?w=800&h=800&fit=crop`

async function main() {
    const passwordHash = await bcrypt.hash('LeafyLand123!', 12)

    const verifiedAt = new Date()

    const admin = await prisma.user.upsert({
        where: { email: 'admin@leafyland.com' },
        update: { role: 'ADMIN', passwordHash, emailVerified: verifiedAt },
        create: {
            name: 'LeafyLand Admin',
            email: 'admin@leafyland.com',
            passwordHash,
            role: 'ADMIN',
            emailVerified: verifiedAt,
            image: '',
        },
    })

    const seller = await prisma.user.upsert({
        where: { email: 'seller@leafyland.com' },
        update: { passwordHash, emailVerified: verifiedAt },
        create: {
            name: 'Fresh Roots Owner',
            email: 'seller@leafyland.com',
            passwordHash,
            role: 'BUYER',
            emailVerified: verifiedAt,
            image: '',
        },
    })

    await prisma.user.upsert({
        where: { email: 'buyer@leafyland.com' },
        update: { passwordHash, emailVerified: verifiedAt },
        create: {
            name: 'Priya Sharma',
            email: 'buyer@leafyland.com',
            passwordHash,
            role: 'BUYER',
            emailVerified: verifiedAt,
            image: '',
        },
    })

    const store = await prisma.store.upsert({
        where: { username: 'freshroots' },
        update: { status: 'approved', isActive: true, isVerified: true, userId: seller.id },
        create: {
            userId: seller.id,
            name: 'Fresh Roots Nursery',
            username: 'freshroots',
            description: 'Premium nursery for indoor plants, tools, and landscaping.',
            address: '12 MG Road, Bangalore',
            email: 'seller@leafyland.com',
            contact: '+91 98765 43210',
            logo: '/logo.png',
            status: 'approved',
            isActive: true,
            isVerified: true,
        },
    })

    const existingProducts = await prisma.product.count({ where: { storeId: store.id } })
    if (existingProducts === 0) {
        await prisma.product.createMany({
            data: [
                { name: 'Areca Palm Giant', description: 'Tall, lush Areca Palm. Height 4-5 feet.', mrp: 2100, price: 1499, category: 'Big Plant', images: [img('1459411552884-841db9b3cc2a')], stock: 15, inStock: true, featured: true, storeId: store.id },
                { name: 'Fiddle Leaf Fig', description: 'Statement fiddle leaf fig for living rooms.', mrp: 3200, price: 2499, category: 'Big Plant', images: [img('1459411552884-841db9b3cc2a')], stock: 10, inStock: true, featured: true, storeId: store.id },
                { name: 'Money Plant Golden', description: 'Low-maintenance golden money plant.', mrp: 450, price: 299, category: 'Indoor Greenary', images: [img('1614594975525-e45190c55d0b')], stock: 40, inStock: true, featured: true, storeId: store.id },
                { name: 'Snake Plant Laurentii', description: 'Air-purifying snake plant.', mrp: 650, price: 449, category: 'Indoor Greenary', images: [img('1614594975525-e45190c55d0b')], stock: 35, inStock: true, featured: false, storeId: store.id },
                { name: 'Garden Tool Set', description: 'Shovel, rake, trowel, weeder, cultivator.', mrp: 1800, price: 1299, category: 'Gardening', images: [img('1416879595882-3373a0480b5b')], stock: 20, inStock: true, featured: false, storeId: store.id },
                { name: 'Organic Potting Mix 5kg', description: 'Premium organic potting soil.', mrp: 550, price: 399, category: 'Soil & Fertilizers', images: [img('1416879595882-3373a0480b5b')], stock: 50, inStock: true, featured: false, storeId: store.id },
            ],
        })
    }

    const existingServices = await prisma.service.count({ where: { storeId: store.id } })
    if (existingServices === 0) {
        await prisma.service.createMany({
            data: [
                { name: 'Garden Design', description: 'Custom garden layout and planting plan.', category: 'Landscaping', startingPrice: 4999, duration: '2-3 days', location: 'Bangalore', images: [img('1416879595882-3373a0480b5b')], status: 'approved', storeId: store.id },
                { name: 'Drip Irrigation Setup', description: 'Install a complete drip system.', category: 'Irrigation', startingPrice: 2499, duration: '1 day', location: 'Bangalore', images: [img('1416879595882-3373a0480b5b')], status: 'approved', storeId: store.id },
                { name: 'Monthly Garden Maintenance', description: 'Pruning, feeding, and pest care.', category: 'Garden Maintenance', startingPrice: 1499, duration: 'Monthly', location: 'Bangalore', images: [img('1416879595882-3373a0480b5b')], status: 'approved', storeId: store.id },
            ],
        })
    }

    const existingProps = await prisma.property.count({ where: { storeId: store.id } })
    if (existingProps === 0) {
        await prisma.property.createMany({
            data: [
                { title: '2 Acre Farmhouse', description: 'Ready farmhouse with well and trees.', propertyType: 'Farmhouse', listingType: 'SALE', price: 8500000, location: 'Nashik', landSize: '2 Acres', images: [img('1500382017468-9049fed747ef')], status: 'approved', storeId: store.id, features: ['Water', 'Electricity'] },
                { title: 'Agricultural Land', description: 'Fertile plot near highway.', propertyType: 'Agricultural Land', listingType: 'SALE', price: 3200000, location: 'Pune', landSize: '1 Acre', images: [img('1500382017468-9049fed747ef')], status: 'approved', storeId: store.id, features: ['Road Access'] },
            ],
        })
    }

    await prisma.coupon.upsert({
        where: { code: 'LEAFY10' },
        update: {},
        create: {
            code: 'LEAFY10',
            description: '10% off sitewide',
            discount: 10,
            forNewUser: false,
            isPublic: true,
            expiresAt: new Date('2027-12-31'),
        },
    })

    console.log('Seeded users:')
    console.log('  admin@leafyland.com / LeafyLand123!')
    console.log('  seller@leafyland.com / LeafyLand123!')
    console.log('  buyer@leafyland.com / LeafyLand123!')
    console.log('Admin id', admin.id, 'Store', store.username)
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

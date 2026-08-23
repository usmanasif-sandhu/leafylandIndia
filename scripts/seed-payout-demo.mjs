import { readFileSync } from 'node:fs'
import pg from 'pg'

// Raw node scripts don't load .env — parse the DATABASE_URL ourselves.
if (!process.env.DATABASE_URL) {
    try {
        const env = readFileSync(new URL('../.env', import.meta.url), 'utf8')
        const match = env.match(/^DATABASE_URL="([^"]+)"/m)
        if (match) process.env.DATABASE_URL = match[1]
    } catch {}
}
if (!process.env.DATABASE_URL) process.exit(0)
const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

try {
    const store = (await client.query(
        `SELECT s.id, s."userId", s."commissionRate" FROM "Store" s WHERE s.status='approved' ORDER BY s."createdAt" LIMIT 1`,
    )).rows[0]
    if (!store) { console.log('No approved store found'); process.exit(1) }

    const address = (await client.query(`SELECT id FROM "Address" ORDER BY "createdAt" DESC LIMIT 1`)).rows[0]
    if (!address) { console.log('No Address rows exist — create one first'); process.exit(1) }

    const user = (await client.query(
        `SELECT id FROM "User" WHERE role='ADMIN' LIMIT 1`,
    )).rows[0]

    const batchId = 'demo_batch_' + Date.now()
    const capturedAt = new Date(Date.now() - 8 * 86400000)
    await client.query(
        `INSERT INTO "CheckoutBatch" ("id","userId","addressId","totalPaise","currency","paymentStatus","paymentMethod","stockFulfilled","coupon","capturedAt","updatedAt")
         VALUES ($1,$2,$4,179800,'INR','CAPTURED','RAZORPAY',true,'{}',$3,$3)`,
        [batchId, user?.id || store.userId, capturedAt, address.id],
    )

    const mk = async (seq, totalRupees) => {
        const orderId = `${batchId}_o${seq}`
        const total = totalRupees
        const grossPaise = Math.round(total * 100)
        const rate = store.commissionRate ?? 10
        const commissionPaise = Math.round((grossPaise * rate) / 100)
        await client.query(
            `INSERT INTO "Order" ("id","total","status","userId","storeId","checkoutBatchId","isPaid","paymentStatus","paymentMethod","isCouponUsed","coupon","updatedAt")
             VALUES ($1,$2,'DELIVERED',$3,$4,$5,true,'CAPTURED','RAZORPAY',false,'{}',$6)`,
            [orderId, total, user?.id || store.userId, store.id, batchId, capturedAt],
        )
        await client.query(
            `INSERT INTO "Earning" ("id","orderId","storeId","grossPaise","commissionRate","commissionPaise","status","eligibleAt","notifiedAt","updatedAt")
             VALUES ($1,$2,$3,$4,$5,$6,'DUE',$7,NULL,$7)`,
            ['demo_earn_' + seq + '_' + Date.now(), orderId, store.id, grossPaise, rate, commissionPaise, capturedAt],
        )
    }
    await mk(1, 499)
    await mk(2, 1299)

    console.log('Seeded demo batch', batchId, 'for store', store.id, '(eligible 1 day ago)')
} finally {
    await client.end()
}

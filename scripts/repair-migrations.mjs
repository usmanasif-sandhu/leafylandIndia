import { execSync } from 'node:child_process'
import pg from 'pg'

/** Migrations that may already exist from prisma db push during development. */
const TABLE_BY_MIGRATION = {
    '20260821220000_contact_inquiry': 'ContactInquiry',
    '20260822120000_property_rating': 'PropertyRating',
}

if (!process.env.DATABASE_URL) process.exit(0)

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

try {
    const { rows } = await client.query(`
        SELECT migration_name FROM "_prisma_migrations"
        WHERE finished_at IS NULL AND rolled_back_at IS NULL
    `)

    for (const { migration_name } of rows) {
        const table = TABLE_BY_MIGRATION[migration_name]
        if (!table) continue

        const exists = await client.query(
            `SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = $1`,
            [table],
        )
        if (exists.rowCount) {
            execSync(`npx prisma migrate resolve --applied ${migration_name}`, { stdio: 'inherit' })
        }
    }
} finally {
    await client.end()
}

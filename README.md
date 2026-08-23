<div align="center">
  <h1><img src="/favicon.svg" width="22" height="22" alt="LeafyLand logo" /> LeafyLand</h1>
  <p>A multi-vendor marketplace for plants, gardening products, land &amp; farmhouses, and professional landscaping services.</p>
</div>

---

## Overview

LeafyLand is a full-stack, multi-vendor commerce platform built on Next.js (App Router). It lets independent sellers list physical products (plants, garden supplies), Properties (land, farmhouses), and Services (landscaping, maintenance), while customers browse, cart, and check out in one place. Vendors manage their own catalogue and orders from a dedicated dashboard, and platform admins oversee stores, commissions, and vendor payouts from an admin panel.

> [!NOTE]
> Vendor settlements run in **Manual** mode by default: an admin releases a payout and records the bank reference / UTR. Once RazorpayX is enabled, payouts are initiated through the RazorpayX Payouts API with webhook-driven status updates.

## Features

- **Multi-vendor marketplace** — sellers onboard stores, manage catalogue, and sell under a shared storefront.
- **Product catalogue** — plants and gardening products with images, categories, inventory, and coupons.
- **Properties** — list land and farmhouses as property listings.
- **Services & bookings** — landscaping and maintenance services with booking requests and site visits.
- **Customer experience** — search, cart, wishlist, address book, checkout, order tracking, and reviews.
- **Vendor dashboard** — products, properties, services, bookings, visits, orders, customers, analytics, and a Wallet with payout history.
- **Admin panel** — stores, approvals, users, orders, payouts (release with commission override + UTR), products, properties, services, and coupons.
- **Auth & roles** — email/password (with verification) and Google OAuth, with `BUYER` / vendor / `ADMIN` roles.
- **Notifications** — in-app notification bell for admins and vendors.
- **Settlements** — per-order earnings unlock 7 days after capture; admins release payouts (manual UTR or RazorpayX).

## Tech Stack

| Area        | Choice                                                        |
| ----------- | ------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, React 19, Turbopack)                  |
| Styling     | Tailwind CSS v4                                               |
| State       | Redux Toolkit (cart/wishlist)                                 |
| Auth        | Auth.js (NextAuth v5) — Credentials + Google OAuth            |
| Database    | PostgreSQL (Neon) via Prisma 7 + `@prisma/adapter-pg`         |
| Payments    | Razorpay (checkout) + RazorpayX (payouts)                     |
| Email       | Nodemailer (SMTP)                                             |
| Charts      | Recharts                                                      |
| Icons       | lucide-react                                                  |
| Images      | sharp (server-side processing)                               |

## Project Structure

```
app/
  (public)/        Storefront, auth, profile, cart, checkout, orders
  admin/           Admin panel (stores, orders, payouts, users, ...)
  store/           Vendor dashboard (products, properties, services, payouts)
  api/             Route handlers (auth, admin, vendor, razorpay, notifications)
components/        Shared UI (navbars, modals, tables, ...)
lib/               Server logic (prisma, auth, payouts, razorpayx, notify)
prisma/            Schema, migrations, seed
scripts/           Build/DB helpers (e.g. repair-migrations)
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+)
- A PostgreSQL database (Neon or any Postgres; a connection string is required)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Key variables: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `ADMIN_EMAILS`, Razorpay keys, and SMTP credentials. See [Configuration](#configuration) below.

### 3. Set up the database

```bash
npm run db:generate   # generate Prisma client
npm run db:deploy     # apply migrations (or db:migrate for local dev)
npm run db:seed       # optional demo data
```

### 4. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000. The admin area is at `/admin` (the first `ADMIN_EMAILS` user becomes an admin on sign-in).

## Scripts

| Script             | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the dev server (Turbopack)             |
| `npm run build`    | Generate client, apply migrations, build     |
| `npm run start`    | Start the production server                  |
| `npm run lint`     | Lint the project                             |
| `npm run db:generate` | Generate the Prisma client                |
| `npm run db:migrate` | Create/apply a Prisma migration            |
| `npm run db:deploy`  | Apply migrations in production             |
| `npm run db:studio`  | Open Prisma Studio                        |
| `npm run db:seed`    | Seed demo data                            |
| `npm test`         | Run tests                                   |

## Configuration

| Variable                     | Purpose                                                |
| ---------------------------- | ------------------------------------------------------ |
| `DATABASE_URL`               | Postgres connection string (pooled)                    |
| `DIRECT_URL`                 | Direct (non-pooled) Postgres URL for migrations        |
| `AUTH_SECRET`                | Auth.js session secret                                 |
| `AUTH_URL`                   | Public site URL (no trailing slash)                    |
| `ADMIN_EMAILS`               | Comma-separated emails promoted to admin on sign-in    |
| `AUTH_GOOGLE_ID` / `_SECRET` | Google OAuth (optional)                               |
| `RAZORPAY_KEY_ID` / `_SECRET`| Razorpay API keys (test or live)                      |
| `RAZORPAYX_ENABLED`         | Enable RazorpayX payouts (`false` = manual mode)       |
| `RAZORPAYX_ACCOUNT_NUMBER`  | RazorpayX account number for payouts                   |
| `SMTP_*`                     | Email transport for signup verification & notifications |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Display currency symbol (default `₹`)                |

> [!IMPORTANT]
> In production set `AUTH_SECRET`, `AUTH_URL`, `ADMIN_EMAILS`, SMTP, and Razorpay keys. Image uploads can be persisted to a host directory (see `.env.example`) so they survive redeploys.

## License

LeafyLand is proprietary software. See the repository settings for licensing terms.

# Admin Frontend — Full Revamp Design

## Overview

Complete redesign and expansion of the LeafyLand admin panel. Currently has 4 basic pages with dummy data and "GoCart." branding. Expanding to 9 pages with shared component library, consistent LeafyLand design, and light sidebar layout.

**Scope:** Frontend only. All pages use dummy data from `assets.js`. No API routes, no database wiring.

## Architecture

```
app/admin/
├── layout.jsx              # AdminLayout wrapper (sidebar + navbar + content)
├── page.jsx                # Dashboard
├── stores/page.jsx         # Stores Management
├── approve/page.jsx        # Store Approvals
├── users/page.jsx          # Users Management
├── orders/page.jsx         # Orders Management
├── products/page.jsx       # Products Management
├── properties/page.jsx     # Properties Management
├── services/page.jsx       # Services Management
└── coupons/page.jsx        # Coupons Management

components/admin/
├── AdminLayout.jsx         # Auth gate + sidebar + navbar shell
├── AdminSidebar.jsx        # Left sidebar navigation
├── AdminNavbar.jsx         # Top bar (title, search, avatar)
├── StatCard.jsx            # Reusable metric card
├── DataTable.jsx           # Reusable table with search, filter, pagination
├── StatusBadge.jsx         # Colored status pill
├── SearchBar.jsx           # Debounced search input
├── PageHeader.jsx          # Title + description + action button
├── EmptyState.jsx          # Empty table/list placeholder
├── DetailSlideOver.jsx     # Slide-over panel for row detail view
└── StoreInfo.jsx           # Store detail card (existing, keep)
```

## Design System

### Colors (matching public site)
- **Primary:** `emerald-600` (#059669) — buttons, links, active states
- **Dark text:** `slate-700`, `slate-800` — headings, body
- **Muted:** `slate-400`, `slate-500` — secondary text
- **Background:** `slate-50` — page bg, `white` — cards/tables
- **Borders:** `border-slate-100` or `border-slate-200`

### Status Badge Colors
| Status | Background | Text |
|--------|-----------|------|
| Approved / Active / Delivered | `bg-emerald-100` | `text-emerald-700` |
| Pending / Processing | `bg-amber-100` | `text-amber-700` |
| Rejected / Cancelled | `bg-red-100` | `text-red-700` |
| Shipped | `bg-blue-100` | `text-blue-700` |
| Inactive | `bg-slate-100` | `text-slate-600` |

### Component Patterns
- **Cards:** `bg-white rounded-2xl border border-slate-100 p-5`
- **Tables:** `bg-white rounded-2xl border border-slate-100 overflow-hidden`
- **Buttons:** `bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold`
- **Inputs:** `bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20`
- **Badge:** `text-xs font-semibold px-2.5 py-0.5 rounded-full`

## Layout

### AdminLayout
- Fixed sidebar (w-64) on left
- Top navbar (h-16) spanning full width
- Content area: `flex-1 p-6 overflow-y-auto`
- Mobile: sidebar collapses, hamburger toggle

### AdminSidebar
- White background, right border
- LeafyLand logo at top
- Nav items with lucide-react icons
- Active: `bg-emerald-50 text-emerald-700`
- Hover: `hover:bg-slate-50`
- Items: Dashboard, Stores, Approvals, Users, Orders, Products, Properties, Services, Coupons

### AdminNavbar
- Page title (dynamic from route)
- Search bar (hidden on mobile)
- Admin avatar + name

## Shared Components

### StatCard
Props: `icon`, `label`, `value`, `change` (number), `color` (bg class)
- Icon in colored circle
- Label (text-sm text-slate-500)
- Value (text-2xl font-extrabold text-slate-800)
- Change indicator: green ↑ for positive, red ↓ for negative

### DataTable
Props: `columns`, `data`, `searchable`, `searchKeys`, `emptyMessage`
- Built-in search filtering
- Pagination (10 per page)
- Sortable column headers
- Responsive horizontal scroll on mobile
- Row click handler for detail view

### StatusBadge
Props: `status` (string)
- Auto-maps status to color scheme
- Returns styled pill component

### DetailSlideOver
Props: `isOpen`, `onClose`, `title`, `children`
- Slides in from right
- Backdrop overlay
- Close button
- Scrollable content area

## Pages

### 1. Dashboard
- **StatCards row:** Total Users, Total Revenue (₹), Total Orders, Active Stores
- **Charts row:** Orders Area Chart (recharts), Revenue Bar Chart (recharts)
- **Tables row:** Recent Orders (5 rows), Pending Approvals (5 rows)

### 2. Stores Management
- DataTable: Store Name, Owner, Status Badge, City, Active Toggle, View button
- Click row → DetailSlideOver with StoreInfo component
- Filter by status (All/Active/Inactive)

### 3. Store Approvals
- Card-based layout (NOT table)
- Each pending store: card with name, owner, description, date, Approve/Reject buttons
- Empty state when no pending stores

### 4. Users Management
- DataTable: Name, Email, Role Badge, Join Date, Total Orders
- Filter by role (All/Buyer/Seller/Admin)

### 5. Orders Management
- DataTable: Order ID, Customer, Store, Total, Status Badge, Date
- Click row → DetailSlideOver with order items, address, payment info
- Filter by status (All/Placed/Processing/Shipped/Delivered)

### 6. Products Management
- DataTable: Image thumbnail, Name, Store, Category, Price, Stock Badge
- Click row → DetailSlideOver with full product details
- Filter by category

### 7. Properties Management
- DataTable: Title, Store, Type Badge, Listing Type, Price, Status Badge
- Click row → DetailSlideOver with property details, features, images
- Filter by status and type

### 8. Services Management
- DataTable: Name, Store, Category, Price, Status Badge
- Click row → DetailSlideOver with service details
- Filter by category

### 9. Coupons Management
- **Top:** Add Coupon form (code, description, discount %, expiry date, toggles for public/new-user/member)
- **Bottom:** DataTable: Code, Discount, Expiry, Public, Delete button

## Dummy Data

All data exported from `assets.js` or `lib/data/*.js`:
- `productDummyData` (27 products)
- `storesDummyData`
- `orderDummyData`
- `couponDummyData`
- `dummyAdminDashboardData`
- `dummyUsersData` (need to create)
- `dummyPropertiesData` (from `lib/data/properties.js` — 6 properties)
- `dummyServicesData` (from `lib/data/services.js` — 24 services)

Additional dummy data to create:
- `dummyUsersData` — 10-15 users with varied roles
- `dummyOrdersData` — 15-20 orders with varied statuses

## File Changes

### Files to CREATE:
```
components/admin/StatCard.jsx
components/admin/DataTable.jsx
components/admin/StatusBadge.jsx
components/admin/SearchBar.jsx
components/admin/PageHeader.jsx
components/admin/EmptyState.jsx
components/admin/DetailSlideOver.jsx
app/admin/users/page.jsx
app/admin/orders/page.jsx
app/admin/products/page.jsx
app/admin/properties/page.jsx
app/admin/services/page.jsx
lib/data/users.js
lib/data/orders.js
```

### Files to REWRITE (full revamp):
```
components/admin/AdminLayout.jsx
components/admin/AdminNavbar.jsx
components/admin/AdminSidebar.jsx
app/admin/page.jsx (Dashboard)
app/admin/stores/page.jsx
app/admin/approve/page.jsx
app/admin/coupons/page.jsx
```

### Files to KEEP AS-IS:
```
components/admin/StoreInfo.jsx (reusable, works well)
```

### Files to UPDATE:
```
assets/assets.js (add dummyUsersData, dummyOrdersData exports)
```

## Total: 7 new components + 5 new pages + 8 rewritten files + 2 new data files

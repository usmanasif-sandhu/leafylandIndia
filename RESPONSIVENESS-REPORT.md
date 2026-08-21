# LeafyLand — Responsiveness Audit Report

**Date:** August 21, 2026
**Viewports tested:** 375px (mobile), 768px (tablet), 1280px (desktop)
**Pages audited:** 20+ pages across public, admin, and store sections

---

## Summary

| Severity | Count |
|----------|-------|
| Critical (broken layout) | 0 |
| High (cramped/cut-off content) | 3 |
| Medium (could be better) | 2 |
| Low (minor polish) | 1 |

**Overall:** The site is in solid shape. No broken layouts or overlapping elements were found. The main recurring issue is **tables with too many columns on mobile**, causing text truncation and cramped headers.

---

## Issues Found

### ISSUE 1 — Admin/Store tables: too many columns on mobile (HIGH)

**Affected pages:**
- `/admin/dashboard` — "Recent Orders" table (5 cols: Order ID, Customer, Amount, Status, Date)
- `/admin/dashboard` — "Pending Approvals" table (4 cols: Store Name, Owner, Date, Action)
- `/admin/stores` — Stores table (4 cols: Store Name, Owner, Status, Username) — **USERNAME column is cut off on the right edge**
- `/admin/users` — Users table (2 cols: Name, Email) — **EMAIL addresses are truncated** (e.g., "amirshahzad38402@gmail.c...")
- `/store/dashboard` — "Recent Orders" table (4 cols: Order ID, Customer, Amount, Status)
- `/store/dashboard` — "Top Products" table (4 cols: Product, Sales, Revenue, Stock)

**What happens:** On 375px, the table headers are crammed together, and text content overflows or gets truncated. The USERNAME and EMAIL columns are visibly cut off.

**Recommended fix:** On mobile, either:
- Hide less important columns (e.g., hide Date, Username on mobile)
- Switch tables to a card/list layout on mobile (each row becomes a card)
- Add `overflow-x: auto` to make tables horizontally scrollable
- Use `text-overflow: ellipsis` with a max-width to gracefully truncate

---

### ISSUE 2 — Admin Orders page: API error (HIGH, functional)

**Affected page:** `/admin/orders`

**What happens:** Shows "Failed to load orders" in red text. The page layout itself is fine, but no data loads.

**Recommended fix:** Debug the admin orders API endpoint. The error is functional, not a CSS issue.

---

### ISSUE 3 — Shop page (/shop): empty content (HIGH, functional)

**Affected page:** `/shop`

**What happens:** Shows "All Products" heading but the content area is completely empty — no shops are listed.

**Recommended fix:** Verify the shop listing API is returning data. The page layout is fine; it's a data-loading issue.

---

### ISSUE 4 — Admin/Store dashboard charts: empty on tablet (MEDIUM)

**Affected pages:**
- `/admin/dashboard` — "Orders Overview" and "Revenue" charts
- `/store/dashboard` — "Revenue This Week" chart

**What happens:** On tablet (768px), the chart containers render but appear blank/empty. The charts show axis labels but no data visualization. This may be a chart library rendering issue or missing data.

**Recommended fix:** Check if the chart library (likely Chart.js or Recharts) requires a minimum container size or if data is not being passed correctly.

---

### ISSUE 5 — Homepage mobile: category bar vertical space (MEDIUM)

**Affected page:** `/` (homepage at 375px)

**What happens:** The green category bar ("Plants", "Garden Tools") takes up significant vertical space at the top of the page, pushing the hero section and product sections further down. Users must scroll past the category bar to see content.

**Recommended fix:** Consider making the category bar horizontally scrollable with a smaller height on mobile, or collapsing it behind a toggle.

---

### ISSUE 6 — Store Dashboard: "Recent Orders" table headers cramped (LOW)

**Affected page:** `/store/dashboard`

**What happens:** The "Recent Orders" table has 4 columns (Order ID, Customer, Amount, Status) that are slightly cramped at 375px but still readable. Not as severe as the admin tables.

**Recommended fix:** Same as Issue 1 — consider hiding columns or switching to card layout on mobile.

---

## Pages That Look Good (No Issues)

| Page | Mobile (375px) | Tablet (768px) | Desktop (1280px) |
|------|----------------|----------------|-------------------|
| Homepage | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ |
| Products listing | ✅ | ✅ | ✅ |
| Product detail | ✅ | ✅ | ✅ |
| Cart (empty state) | ✅ | ✅ | ✅ |
| About | ✅ | ✅ | ✅ |
| Contact | ✅ | ✅ | ✅ |
| How It Works | ✅ | ✅ | ✅ |
| Properties | ✅ | ✅ | ✅ |
| Services | ✅ | ✅ | ✅ |
| Admin Coupons | ✅ | ✅ | ✅ |
| Admin Products | ✅ | ✅ | ✅ |
| Store Orders | ✅ | ✅ | ✅ |
| Store Products | ✅ | ✅ | ✅ |
| Store Settings | ✅ | ✅ | ✅ |
| Store Messages | ✅ | ✅ | ✅ |

---

## Recommendations (Priority Order)

1. **Fix table responsiveness** (Issue 1) — This is the most widespread issue. A card-based layout for mobile tables would solve it across all admin and store dashboard pages.

2. **Fix Admin Orders API** (Issue 2) — Debug why orders fail to load for admin users.

3. **Fix Shop listing** (Issue 3) — Ensure the shop listing page loads data correctly.

4. **Fix chart rendering** (Issue 4) — Check chart library configuration for tablet viewports.

5. **Optimize homepage category bar** (Issue 5) — Reduce vertical space on mobile.

---

*Report generated by automated responsiveness audit.*

/** @param {number} rupees */
export function rupeesToPaise(rupees) {
    const n = Number(rupees)
    if (!Number.isFinite(n) || n < 0) return 0
    return Math.round(n * 100)
}

/** @param {number} price @param {number} qty */
export function lineTotalPaise(price, qty) {
    return rupeesToPaise(price) * qty
}

/** @param {number} paise */
export function paiseToRupees(paise) {
    return Math.round(paise) / 100
}

/** Sum store line totals in paise (integer arithmetic). */
export function sumLinesPaise(lines) {
    return lines.reduce((sum, line) => sum + lineTotalPaise(line.price, line.qty), 0)
}

/** Apply percent discount in paise without floats on the final amount. */
export function applyDiscountPaise(subtotalPaise, discountPercent) {
    const discount = Math.round((subtotalPaise * Number(discountPercent)) / 100)
    return Math.max(0, subtotalPaise - discount)
}

/** Pure payout math — no DB, no server-only imports (unit-test friendly). */

export const PAYOUT_WINDOW_DAYS = 7

/** @param {number} grossPaise @param {number} ratePercent */
export function computeCommissionPaise(grossPaise, ratePercent) {
    const gross = Math.max(0, Math.round(Number(grossPaise) || 0))
    const rate = Math.max(0, Number(ratePercent) || 0)
    return Math.round((gross * rate) / 100)
}

export function eligibilityDate(capturedAt, days = PAYOUT_WINDOW_DAYS) {
    return new Date(new Date(capturedAt).getTime() + days * 24 * 60 * 60 * 1000)
}

export function isEligible(earning, now = new Date()) {
    if (!earning || earning.status !== 'DUE') return false
    return new Date(earning.eligibleAt).getTime() <= now.getTime()
}

export function splitDue(earnings, now = new Date()) {
    const dueNow = []
    const upcoming = []
    for (const e of earnings || []) (isEligible(e, now) ? dueNow : upcoming).push(e)
    return { dueNow, upcoming }
}

export function netOfEarning(earning) {
    return Math.max(0, Math.round(Number(earning?.grossPaise) || 0) - Math.round(Number(earning?.commissionPaise) || 0))
}

export function sumNetPaise(earnings) {
    return (earnings || []).reduce((sum, e) => sum + netOfEarning(e), 0)
}

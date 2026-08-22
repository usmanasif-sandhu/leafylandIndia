export function parseRatingScore(value) {
    const score = Number(value)
    if (!Number.isInteger(score) || score < 1 || score > 5) {
        return { ok: false, error: 'Rating must be an integer from 1 to 5' }
    }
    return { ok: true, score }
}

export function avgRating(items = []) {
    if (!items.length) return 0
    const sum = items.reduce((s, r) => s + (r.rating || 0), 0)
    return Number((sum / items.length).toFixed(1))
}

export function serializeReview(row) {
    return {
        id: row.id,
        rating: row.rating,
        review: row.review || '',
        createdAt: row.createdAt,
        user: row.user
            ? { name: row.user.name, image: row.user.image }
            : undefined,
    }
}

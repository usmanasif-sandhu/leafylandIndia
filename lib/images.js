const MAX_DATA_URL = 200_000

/** Accept only app uploads or modest legacy data URLs / https URLs. */
export function sanitizeImageUrls(images) {
    if (!Array.isArray(images)) return []
    return images
        .filter((src) => typeof src === 'string' && src.trim())
        .map((src) => src.trim())
        .filter((src) => {
            if (src.startsWith('/uploads/')) return true
            if (src.startsWith('https://') || src.startsWith('http://')) return src.length < 2048
            if (src.startsWith('data:image/')) return src.length <= MAX_DATA_URL
            return false
        })
}

export function sanitizeImageUrl(src) {
    const [ok] = sanitizeImageUrls(src ? [src] : [])
    return ok || ''
}

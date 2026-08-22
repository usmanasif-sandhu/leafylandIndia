const cache = new Map()
const inflight = new Map()

/**
 * Dedupes in-flight GETs and caches JSON briefly so Strict Mode /
 * remounts / navigating home→products→checkout don't re-hit Neon.
 */
export function cachedJson(url, { ttlMs = 45_000 } = {}) {
    const now = Date.now()
    const hit = cache.get(url)
    if (hit && now - hit.at < ttlMs) {
        return Promise.resolve(hit.data)
    }

    if (inflight.has(url)) return inflight.get(url)

    const pending = fetch(url)
        .then(async (res) => {
            const data = await res.json()
            if (res.ok) cache.set(url, { at: Date.now(), data })
            return data
        })
        .finally(() => inflight.delete(url))

    inflight.set(url, pending)
    return pending
}

export function clearFetchCache(prefix) {
    if (!prefix) {
        cache.clear()
        return
    }
    for (const key of cache.keys()) {
        if (key.startsWith(prefix)) cache.delete(key)
    }
}

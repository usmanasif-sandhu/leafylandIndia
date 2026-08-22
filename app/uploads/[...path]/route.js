import { readFile, stat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import {
    UPLOAD_CACHE_CONTROL,
    mimeForFilename,
    parseUploadRequestPath,
    resolveLegacyUploadFile,
    resolveUploadFile,
} from '@/lib/storage'

async function loadUpload(relativePath) {
    try {
        const primary = resolveUploadFile(relativePath)
        const fileStat = await stat(primary)
        if (!fileStat.isFile()) return null
        const body = await readFile(primary)
        return { body, mtime: fileStat.mtime, path: primary }
    } catch {
        try {
            const legacy = resolveLegacyUploadFile(relativePath)
            const fileStat = await stat(legacy)
            if (!fileStat.isFile()) return null
            const body = await readFile(legacy)
            return { body, mtime: fileStat.mtime, path: legacy }
        } catch {
            return null
        }
    }
}

export async function GET(_req, { params }) {
    const { path: segments } = await params
    const relativePath = parseUploadRequestPath(segments)
    if (!relativePath) {
        return new Response('Not found', { status: 404 })
    }

    const file = await loadUpload(relativePath)
    if (!file) {
        return new Response('Not found', { status: 404 })
    }

    const filename = relativePath.split('/').pop()
    const etag = createHash('md5').update(file.body).digest('hex')

    return new Response(file.body, {
        status: 200,
        headers: {
            'Content-Type': mimeForFilename(filename),
            'Cache-Control': UPLOAD_CACHE_CONTROL,
            ETag: `"${etag}"`,
            'Content-Length': String(file.body.length),
        },
    })
}

import sharp from 'sharp'
import { randomUUID } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import { ensureUserUploadDir, toPublicUploadUrl } from '@/lib/storage'

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

export function validateImageFile(file) {
    if (!file || typeof file === 'string' || !file.arrayBuffer) {
        return { ok: false, error: 'Image file is required' }
    }
    if (!ALLOWED.has(file.type)) {
        return { ok: false, error: 'Only JPEG, PNG, WebP, or GIF images are allowed' }
    }
    if (file.size > MAX_UPLOAD_BYTES) {
        return { ok: false, error: 'Image must be under 5 MB' }
    }
    return { ok: true }
}

/** Resize and convert to WebP for faster page loads. GIFs are stored as-is. */
export async function optimizeImageBuffer(buffer, mime) {
    if (mime === 'image/gif') {
        return { buffer, ext: 'gif' }
    }

    const optimized = await sharp(buffer)
        .rotate()
        .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toBuffer()

    return { buffer: optimized, ext: 'webp' }
}

export async function saveUserImage(userId, file) {
    const check = validateImageFile(file)
    if (!check.ok) throw new Error(check.error)

    const input = Buffer.from(await file.arrayBuffer())
    const { buffer, ext } = await optimizeImageBuffer(input, file.type)
    const dir = await ensureUserUploadDir(userId)
    const filename = `${randomUUID()}.${ext}`
    await writeFile(`${dir}/${filename}`, buffer)

    return {
        url: toPublicUploadUrl(userId, filename),
        bytes: buffer.length,
    }
}

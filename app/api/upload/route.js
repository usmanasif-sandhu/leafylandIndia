import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { requireUser, json, error, handleApiError } from '@/lib/api'

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const MAX_BYTES = 1.5 * 1024 * 1024

function extFor(type) {
    if (type === 'image/jpeg') return 'jpg'
    if (type === 'image/png') return 'png'
    if (type === 'image/webp') return 'webp'
    if (type === 'image/gif') return 'gif'
    return null
}

export async function POST(req) {
    try {
        const user = await requireUser()
        const form = await req.formData()
        const file = form.get('file')

        if (!file || typeof file === 'string' || !file.arrayBuffer) {
            return error('Image file is required')
        }
        if (!ALLOWED.has(file.type)) {
            return error('Only JPEG, PNG, WebP, or GIF images are allowed')
        }
        if (file.size > MAX_BYTES) {
            return error('Image must be under 1.5 MB')
        }

        const ext = extFor(file.type)
        if (!ext) return error('Unsupported image type')

        const buffer = Buffer.from(await file.arrayBuffer())
        const dir = path.join(process.cwd(), 'public', 'uploads', user.id)
        await mkdir(dir, { recursive: true })
        const filename = `${randomUUID()}.${ext}`
        await writeFile(path.join(dir, filename), buffer)

        return json({ url: `/uploads/${user.id}/${filename}` }, 201)
    } catch (e) {
        return handleApiError(e)
    }
}

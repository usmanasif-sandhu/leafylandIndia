import { requireUser, json, error, handleApiError } from '@/lib/api'
import { saveUserImage } from '@/lib/image-upload'

export async function POST(req) {
    try {
        const user = await requireUser()
        const form = await req.formData()
        const file = form.get('file')
        const saved = await saveUserImage(user.id, file)
        return json(saved, 201)
    } catch (e) {
        if (e.message && !e.statusCode) return error(e.message, 400)
        return handleApiError(e)
    }
}

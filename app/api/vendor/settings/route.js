import { prisma } from '@/lib/prisma'
import { json, requireStore, handleApiError, error } from '@/lib/api'
import { sanitizeImageUrl } from '@/lib/images'

const extraKeys = ['city', 'website', 'businessHours', 'gstNumber', 'panNumber', 'bankAccount', 'ifscCode', 'upiId', 'accountName', 'shippingPolicy', 'returnPolicy']

function flatten(store) {
    const extra = store.settings && typeof store.settings === 'object' && !Array.isArray(store.settings)
        ? store.settings
        : {}
    const safeExtra = { ...extra }
    delete safeExtra.name
    delete safeExtra.username
    delete safeExtra.id
    delete safeExtra.userId
    return {
        ...safeExtra,
        ...store,
        city: safeExtra.city || '',
        website: safeExtra.website || '',
        businessHours: safeExtra.businessHours || '',
        gstNumber: safeExtra.gstNumber || '',
        panNumber: safeExtra.panNumber || '',
        bankAccount: safeExtra.bankAccount || '',
        ifscCode: safeExtra.ifscCode || '',
        upiId: safeExtra.upiId || '',
        shippingPolicy: safeExtra.shippingPolicy || '',
        returnPolicy: safeExtra.returnPolicy || '',
    }
}

export async function GET() {
    try {
        const { store } = await requireStore()
        return json(flatten(store))
    } catch (e) {
        return handleApiError(e)
    }
}

export async function PATCH(req) {
    try {
        const { store } = await requireStore()
        const body = await req.json()
        const data = {}
        for (const key of ['name', 'description', 'email', 'contact', 'address', 'logo']) {
            if (typeof body[key] === 'string') data[key] = body[key]
        }
        if (typeof data.logo === 'string') {
            data.logo = sanitizeImageUrl(data.logo)
            if (body.logo && !data.logo) return error('Invalid logo image URL')
        }
        const current = store.settings && typeof store.settings === 'object' && !Array.isArray(store.settings)
            ? store.settings
            : {}
        const extra = { ...current }
        for (const key of extraKeys) {
            if (typeof body[key] === 'string') extra[key] = body[key]
        }
        data.settings = extra
        const updated = await prisma.store.update({ where: { id: store.id }, data })
        return json(flatten(updated))
    } catch (e) {
        return handleApiError(e)
    }
}

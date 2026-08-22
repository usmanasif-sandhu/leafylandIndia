import { json } from '@/lib/api'
import { getPublicKeyId, isRazorpayConfigured } from '@/lib/razorpay'

export async function GET() {
    return json({
        enabled: isRazorpayConfigured(),
        keyId: isRazorpayConfigured() ? getPublicKeyId() : null,
    })
}

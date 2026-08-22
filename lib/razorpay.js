import 'server-only'
import Razorpay from 'razorpay'
import crypto from 'node:crypto'

function getKeys() {
    const keyId = process.env.RAZORPAY_KEY_ID?.trim()
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim()
    if (!keyId || !keySecret) {
        throw new Error('Razorpay is not configured')
    }
    return { keyId, keySecret }
}

export function isRazorpayConfigured() {
    return Boolean(
        process.env.RAZORPAY_KEY_ID?.trim() &&
            process.env.RAZORPAY_KEY_SECRET?.trim(),
    )
}

export function getPublicKeyId() {
    return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() || process.env.RAZORPAY_KEY_ID?.trim() || ''
}

let client = null

export function getRazorpayClient() {
    if (!client) {
        const { keyId, keySecret } = getKeys()
        client = new Razorpay({ key_id: keyId, key_secret: keySecret })
    }
    return client
}

/** @param {{ amountPaise: number, receipt: string, notes?: Record<string, string> }} opts */
export async function createRazorpayOrder(opts) {
    const { amountPaise, receipt, notes = {} } = opts
    if (!Number.isInteger(amountPaise) || amountPaise < 100) {
        throw new Error('Invalid payment amount')
    }
    const rz = getRazorpayClient()
    return rz.orders.create({
        amount: amountPaise,
        currency: 'INR',
        receipt,
        notes,
    })
}

export async function fetchRazorpayPayment(paymentId) {
    const rz = getRazorpayClient()
    return rz.payments.fetch(paymentId)
}

export async function fetchRazorpayOrder(orderId) {
    const rz = getRazorpayClient()
    return rz.orders.fetch(orderId)
}

function timingSafeEqualHex(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return false
    const bufA = Buffer.from(a, 'utf8')
    const bufB = Buffer.from(b, 'utf8')
    if (bufA.length !== bufB.length) return false
    return crypto.timingSafeEqual(bufA, bufB)
}

/** Verify Razorpay Checkout payment signature (order_id|payment_id). */
export function verifyCheckoutSignature(razorpayOrderId, razorpayPaymentId, signature) {
    const { keySecret } = getKeys()
    const payload = `${razorpayOrderId}|${razorpayPaymentId}`
    const expected = crypto.createHmac('sha256', keySecret).update(payload).digest('hex')
    return timingSafeEqualHex(expected, signature)
}

/** Verify webhook using raw body and x-razorpay-signature header. */
export function verifyWebhookSignature(rawBody, signature) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET?.trim()
    if (!secret || !signature) return false
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
    return timingSafeEqualHex(expected, signature)
}

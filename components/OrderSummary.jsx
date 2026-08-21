'use client'
import { useState } from 'react'
import { PlusIcon, XIcon } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { clearCart } from '@/lib/features/cart/cartSlice'
import AddressPicker from './AddressPicker'

const PAYMENT_METHODS = [
    { id: 'COD', label: 'Cash on Delivery', disabled: true, comingSoon: true },
    { id: 'STRIPE', label: 'Stripe (Card)' },
    { id: 'UPI', label: 'UPI' },
    { id: 'BANK_TRANSFER', label: 'Bank Transfer' },
    { id: 'WALLET', label: 'Wallet' },
]

const OrderSummary = ({ totalPrice, items }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const router = useRouter()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.find((m) => !m.disabled)?.id || 'COD')
    const [selectedAddressId, setSelectedAddressId] = useState(null)
    const [couponCodeInput, setCouponCodeInput] = useState('')
    const [coupon, setCoupon] = useState('')
    const [placing, setPlacing] = useState(false)

    const handleCouponCode = async (event) => {
        event.preventDefault()
        const code = couponCodeInput.trim()
        if (!code) return
        const res = await fetch('/api/coupons/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, total: totalPrice }),
        })
        const data = await res.json()
        if (res.ok && data.valid) {
            setCoupon(data.coupon)
            toast.success(`Coupon ${data.coupon.code} applied`)
        } else {
            setCoupon('')
            toast.error(data.error || 'Invalid coupon')
        }
    }

    const discounted = coupon ? totalPrice * (1 - coupon.discount / 100) : totalPrice
    const total = discounted

    const handlePlaceOrder = async (e) => {
        e.preventDefault()
        if (!selectedAddressId) return toast.error('Please select a delivery address')
        if (!items?.length) return toast.error('Your cart is empty')

        setPlacing(true)
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    addressId: selectedAddressId,
                    paymentMethod,
                    couponCode: coupon ? coupon.code : undefined,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Could not place order')
            }
            dispatch(clearCart())
            toast.success('Order placed successfully')
            router.push('/orders')
        } catch (err) {
            toast.error(err.message || 'Could not place order')
        } finally {
            setPlacing(false)
        }
    }

    return (
        <div className='w-full max-w-lg lg:max-w-[360px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7'>
            <h2 className='text-xl font-medium text-slate-600'>Payment Summary</h2>

            <p className='text-slate-400 text-xs my-4'>Payment Method</p>
            <div className='space-y-1'>
                {PAYMENT_METHODS.map((m) => (
                    <div key={m.id} className='flex gap-2 items-center'>
                        <input
                            type="radio"
                            id={m.id}
                            name="payment"
                            disabled={m.disabled}
                            onChange={() => !m.disabled && setPaymentMethod(m.id)}
                            checked={paymentMethod === m.id}
                            className='accent-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed'
                        />
                        <label
                            htmlFor={m.id}
                            className={`cursor-pointer ${m.disabled ? 'text-slate-400 cursor-not-allowed' : ''}`}
                        >
                            {m.label}{m.comingSoon ? ' (coming soon)' : ''}
                        </label>
                    </div>
                ))}
            </div>

            <div className='my-4 py-4 border-y border-slate-200'>
                <p className='mb-3 text-slate-400 text-xs'>Delivery Address</p>
                <AddressPicker value={selectedAddressId} onChange={setSelectedAddressId} />
            </div>

            <div className='pb-4 border-b border-slate-200'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1 text-slate-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-1 font-medium text-right'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p>Free</p>
                        {coupon && <p>{`-${currency}${(coupon.discount / 100 * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {!coupon ? (
                    <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex justify-center gap-3 mt-3'>
                        <input onChange={(e) => setCouponCodeInput(e.target.value)} value={couponCodeInput} type="text" placeholder='Coupon Code' className='border border-slate-400 p-1.5 rounded w-full outline-none' />
                        <button className='bg-emerald-700 text-white px-3 rounded hover:bg-emerald-900 active:scale-95 transition-all'>Apply</button>
                    </form>
                ) : (
                    <div className='w-full flex items-center justify-center gap-2 text-xs mt-2'>
                        <p>Code: <span className='font-semibold ml-1'>{coupon.code.toUpperCase()}</span></p>
                        <p>{coupon.description}</p>
                        <XIcon size={18} onClick={() => setCoupon('')} className='hover:text-red-700 transition cursor-pointer' />
                    </div>
                )}
            </div>

            <div className='flex justify-between py-4'>
                <p>Total:</p>
                <p className='font-medium text-right'>{currency}{total.toLocaleString()}</p>
            </div>
            <button
                onClick={e => toast.promise(handlePlaceOrder(e), { loading: 'Placing Order...', success: 'Order placed', error: 'Could not place order' })}
                disabled={placing}
                className='w-full bg-emerald-900 text-white py-2.5 rounded hover:bg-emerald-950 active:scale-95 transition-all disabled:opacity-60'
            >
                Place Order
            </button>
        </div>
    )
}

export default OrderSummary

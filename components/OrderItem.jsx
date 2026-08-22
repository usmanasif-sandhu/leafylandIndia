'use client'
import Image from 'next/image'
import { DotIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import Rating from './Rating'
import { useState } from 'react'
import RatingModal from './RatingModal'
import toast from 'react-hot-toast'

const OrderItem = ({ order, onUpdated }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹'
    const [ratingModal, setRatingModal] = useState(null)
    const [cancelling, setCancelling] = useState(false)
    const { ratings } = useSelector((state) => state.rating)

    const statusStyles = {
        ORDER_PLACED: 'text-yellow-500 bg-yellow-100',
        PROCESSING: 'text-blue-500 bg-blue-100',
        SHIPPED: 'text-blue-500 bg-blue-100',
        DELIVERED: 'text-green-500 bg-green-100',
        CANCELLED: 'text-red-500 bg-red-100',
    }

    const addr = order.addressObj
    const paymentLabel = order.paymentMethod?.split('_').join(' ').toLowerCase() || 'cod'
    const canCancel = ['ORDER_PLACED', 'PROCESSING'].includes(order.status)

    const cancelOrder = async () => {
        if (!canCancel || cancelling) return
        setCancelling(true)
        try {
            const res = await fetch(`/api/orders/${order.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'cancel' }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Could not cancel')
            toast.success('Order cancelled')
            onUpdated?.(data)
        } catch (e) {
            toast.error(e.message)
        } finally {
            setCancelling(false)
        }
    }

    return (
        <>
            <tr className="text-sm">
                <td className="text-left">
                    <div className="flex flex-col gap-6">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-20 aspect-square bg-slate-100 flex items-center justify-center rounded-md">
                                    <Image
                                        className="h-14 w-auto"
                                        src={item.product.images[0]}
                                        alt="product_img"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="flex flex-col justify-center text-sm">
                                    <p className="font-medium text-slate-600 text-base">{item.product.name}</p>
                                    <p>
                                        {currency}
                                        {item.price} Qty : {item.quantity}{' '}
                                    </p>
                                    <p className="mb-1">{new Date(order.createdAt).toDateString()}</p>
                                    <div>
                                        {ratings.find(
                                            (rating) =>
                                                order.id === rating.orderId && item.product.id === rating.productId,
                                        ) ? (
                                            <Rating
                                                value={
                                                    ratings.find(
                                                        (rating) =>
                                                            order.id === rating.orderId &&
                                                            item.product.id === rating.productId,
                                                    ).rating
                                                }
                                            />
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    setRatingModal({ orderId: order.id, productId: item.product.id })
                                                }
                                                className={`text-green-500 hover:bg-green-50 transition ${order.status !== 'DELIVERED' && 'hidden'}`}
                                            >
                                                Rate Product
                                            </button>
                                        )}
                                    </div>
                                    {ratingModal && (
                                        <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                <td className="text-center max-md:hidden">
                    {currency}
                    {order.total}
                </td>

                <td className="text-left max-md:hidden">
                    {addr ? (
                        <>
                            <p>
                                {addr.name}, {addr.street},
                            </p>
                            <p>
                                {addr.city}, {addr.state}, {addr.zip}, {addr.country},
                            </p>
                            <p>{addr.phone}</p>
                        </>
                    ) : (
                        <p className="text-slate-400">Address removed</p>
                    )}
                </td>

                <td className="text-left max-md:hidden">
                    <p className="capitalize font-medium text-slate-600">{paymentLabel}</p>
                    {order.isCouponUsed && order.coupon ? (
                        <p className="text-xs text-emerald-700 mt-1">Coupon: {order.coupon.code}</p>
                    ) : (
                        <p className="text-xs text-slate-400 mt-1">No coupon</p>
                    )}
                </td>

                <td className="text-left space-y-2 text-sm max-md:hidden">
                    <div
                        className={`flex items-center justify-center gap-1 rounded-full p-1 ${statusStyles[order.status] || 'text-slate-500 bg-slate-100'}`}
                    >
                        <DotIcon size={10} className="scale-250" />
                        {order.status.split('_').join(' ').toLowerCase()}
                    </div>
                    {canCancel && (
                        <button
                            type="button"
                            disabled={cancelling}
                            onClick={cancelOrder}
                            className="block mx-auto text-xs font-semibold text-red-600 hover:underline disabled:opacity-50"
                        >
                            {cancelling ? 'Cancelling…' : 'Cancel order'}
                        </button>
                    )}
                </td>
            </tr>
            <tr className="md:hidden">
                <td colSpan={5}>
                    {addr ? (
                        <>
                            <p>
                                {addr.name}, {addr.street}
                            </p>
                            <p>
                                {addr.city}, {addr.state}, {addr.zip}, {addr.country}
                            </p>
                            <p>{addr.phone}</p>
                        </>
                    ) : (
                        <p className="text-slate-400">Address removed</p>
                    )}
                    <p className="mt-2 capitalize font-medium text-slate-600">Paid via {paymentLabel}</p>
                    <div className="flex flex-col items-center gap-2 mt-2">
                        <span
                            className={`text-center px-6 py-1.5 rounded ${statusStyles[order.status] || 'bg-slate-100 text-slate-700'}`}
                        >
                            {order.status.replace(/_/g, ' ').toLowerCase()}
                        </span>
                        {canCancel && (
                            <button
                                type="button"
                                disabled={cancelling}
                                onClick={cancelOrder}
                                className="text-xs font-semibold text-red-600"
                            >
                                {cancelling ? 'Cancelling…' : 'Cancel order'}
                            </button>
                        )}
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={5}>
                    <div className="border-b border-slate-300 w-6/7 mx-auto" />
                </td>
            </tr>
        </>
    )
}

export default OrderItem

'use client'
import { Heart } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toggleWishlist } from "@/lib/features/wishlist/wishlistSlice"

// itemType: "product" | "property" | "service" — SCHEMA: wishlist entries need a type discriminator
// since the three verticals aren't the same model.
const WishlistButton = ({ itemId, itemType }) => {

    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist.items)
    const isWishlisted = wishlist.some(item => item.id === itemId && item.type === itemType)

    return (
        <button
            onClick={() => dispatch(toggleWishlist({ id: itemId, type: itemType }))}
            className="p-2 rounded-full bg-white/80 hover:bg-white transition"
        >
            <Heart size={18} className={isWishlisted ? "text-red-500 fill-red-500" : "text-slate-500"} />
        </button>
    )
}

export default WishlistButton
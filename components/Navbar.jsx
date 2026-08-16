'use client'
import { Search, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {

    const router = useRouter();

    const [search, setSearch] = useState('')
    const cartCount = useSelector(state => state.cart.total)
    const wishlistCount = useSelector(state => state.wishlist?.total ?? 0)

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/search?query=${search}`)
    }

    return (
        <nav className="relative bg-white">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    <Link href="/" className="relative flex items-center">
                        <Image
    src={assets.logo}
    alt="Leafyland"
    width={160}
    height={40}
    priority
/>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-slate-600">
                        <Link href="/">Home</Link>
                        <Link href="/products">Products</Link>
                        <Link href="/properties">Properties</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
                            <Search size={18} className="text-slate-600" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-600"
                                type="text"
                                placeholder="Search products, properties, services..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                        </form>

                        <Link href="/wishlist" className="relative flex items-center text-slate-600">
                            <Heart size={18} />
                            <span className="absolute -top-2 -right-2 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        </Link>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
                            <ShoppingCart size={18} />
                            Cart
                            <span className="absolute -top-2 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </Link>

                        <Link href="/become-seller" className="text-sm font-medium text-green-700 hover:text-green-800">
                            Become a Seller
                        </Link>

                        <button className="px-8 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full">
                            Login
                        </button>

                    </div>

                    {/* Mobile User Button  */}
                    <div className="sm:hidden">
                        <button className="px-7 py-1.5 bg-green-600 hover:bg-green-700 text-sm transition text-white rounded-full">
                            Login
                        </button>
                    </div>
                </div>
            </div>
            <hr className="border-gray-300" />
        </nav>
    )
}

export default Navbar
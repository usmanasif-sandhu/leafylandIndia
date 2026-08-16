'use client'
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const cartCount = useSelector(state => state.cart.total);
    const wishlistCount = useSelector(state => state.wishlist?.total ?? 0);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/search?query=${search}`);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="relative bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16 sm:h-20 gap-3 lg:gap-4">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
                        <Image
                            src={assets.logo}
                            alt="Leafyland"
                            width={140}
                            height={35}
                            className="h-8 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 shrink-0">
                        <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                        <Link href="/products" className="hover:text-emerald-600 transition-colors">Products</Link>
                        <Link href="/properties" className="hover:text-emerald-600 transition-colors">Properties</Link>
                        <Link href="/services" className="hover:text-emerald-600 transition-colors">Services</Link>
                        <Link href="/about" className="hover:text-emerald-600 transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-emerald-600 transition-colors">Contact</Link>
                    </div>

                    {/* Desktop Search Bar */}
                    <form 
                        onSubmit={handleSearch} 
                        className="hidden xl:flex items-center w-56 text-sm gap-2 bg-slate-50 border border-slate-200 focus-within:border-emerald-500 focus-within:bg-white px-3 py-1.5 rounded-full transition-all shrink-1"
                    >
                        <Search size={16} className="text-slate-400 shrink-0" />
                        <input
                            className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-xs"
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            required
                        />
                    </form>

                    {/* Desktop Actions Area */}
                    <div className="hidden sm:flex items-center gap-3 lg:gap-4 shrink-0">
                        {/* Wishlist */}
                        <Link href="/wishlist" className="relative flex items-center p-1 text-slate-600 hover:text-emerald-600 transition-colors">
                            <Heart size={20} />
                            <span className="absolute -top-1 -right-1 text-[10px] font-semibold text-white bg-emerald-600 size-4 rounded-full flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        </Link>

                        {/* Cart */}
                        <Link href="/cart" className="relative flex items-center gap-1 p-1 text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium">
                            <ShoppingCart size={20} />
                            <span className="hidden lg:inline">Cart</span>
                            <span className="absolute -top-1 -right-1 text-[10px] font-semibold text-white bg-emerald-600 size-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </Link>

                        {/* Become a Seller */}
                        <Link href="/become-seller" className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors px-2.5 py-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 whitespace-nowrap">
                            Become a Seller
                        </Link>

                        {/* Login Button */}
                        <button className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-medium rounded-full text-sm shrink-0">
                            Login
                        </button>
                    </div>

                    {/* Mobile Controls (Menu Toggle & Login) */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button className="sm:hidden px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-xs font-medium transition-all text-white rounded-full">
                            Login
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 text-slate-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-slate-100"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Drawer Backdrop */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer Menu */}
            <div className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col h-full p-6">
                    
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <Image
                            src={assets.logo}
                            alt="Leafyland"
                            width={120}
                            height={30}
                            className="h-7 w-auto object-contain"
                        />
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors rounded-lg hover:bg-slate-100"
                            aria-label="Close menu"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Mobile Search Form */}
                    <form onSubmit={handleSearch} className="mt-4 flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-full">
                        <Search size={16} className="text-slate-400 shrink-0" />
                        <input
                            className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-sm"
                            type="text"
                            placeholder="Search products, properties..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4 mt-6 text-base font-medium text-slate-700">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Home</Link>
                        <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Products</Link>
                        <Link href="/properties" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Properties</Link>
                        <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Services</Link>
                        <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">About</Link>
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 transition-colors">Contact</Link>
                    </div>

                    {/* Quick Shortcuts & Seller CTA */}
                    <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                        <div className="flex items-center justify-around py-2 bg-slate-50 rounded-xl">
                            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <div className="relative">
                                    <Heart size={20} />
                                    <span className="absolute -top-1.5 -right-2 text-[9px] font-semibold text-white bg-emerald-600 size-4 rounded-full flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                </div>
                                Wishlist
                            </Link>

                            <div className="h-4 w-px bg-slate-200" />

                            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <div className="relative">
                                    <ShoppingCart size={20} />
                                    <span className="absolute -top-1.5 -right-2 text-[9px] font-semibold text-white bg-emerald-600 size-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                </div>
                                Cart
                            </Link>
                        </div>

                        <Link href="/become-seller" onClick={() => setMobileMenuOpen(false)} className="text-center text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 py-2.5 rounded-xl transition-colors">
                            Become a Seller
                        </Link>

                        <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-colors">
                            Login
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
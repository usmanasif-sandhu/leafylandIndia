'use client'
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
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

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/products?search=${encodeURIComponent(search)}`);
    };

    return (
        <nav className="sticky top-0 z-50 glass-navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center h-14 sm:h-16 gap-3">

                    {/* Logo — far left */}
                    <Link href="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
                        <Image
                            src={assets.logo}
                            alt="LeafyLand"
                            width={140}
                            height={35}
                            className="h-8 sm:h-9 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Search + Icons — right aligned */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <form
                            onSubmit={handleSearch}
                            className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 w-52 lg:w-72 px-3 py-2 rounded-xl transition-all"
                        >
                            <Search size={16} className="text-slate-400 shrink-0" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-sm"
                                type="text"
                                placeholder="Search plants, tools..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>

                        <button className="flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/50">
                            <User size={18} />
                            <span className="hidden md:inline text-xs">Login</span>
                        </button>

                        <Link href="/cart" className="relative flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/50">
                            <ShoppingCart size={18} />
                            <span className="hidden md:inline text-xs">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold text-white bg-emerald-600 min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 text-slate-700 hover:text-emerald-600 lg:hidden rounded-lg hover:bg-white/50 transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col h-full p-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <Image src={assets.logo} alt="LeafyLand" width={120} height={30} className="h-7 w-auto object-contain" />
                        <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSearch} className="mt-4 flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl">
                        <Search size={16} className="text-slate-400 shrink-0" />
                        <input
                            className="w-full bg-transparent outline-none placeholder-slate-400 text-slate-700 text-sm"
                            type="text"
                            placeholder="Search products, services..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    <div className="flex flex-col gap-1 mt-6 text-sm font-medium text-slate-700">
                        {[
                            { href: '/', label: 'Home' },
                            { href: '/products', label: 'Products' },
                            { href: '/services', label: 'Services' },
                            { href: '/properties', label: 'Properties' },
                            { href: '/about', label: 'About' },
                            { href: '/contact', label: 'Contact' },
                            { href: '/how-it-works', label: 'How It Works' },
                        ].map(link => (
                            <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                                className="py-2.5 px-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
                        <Link href="/cart" onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-2 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                            <ShoppingCart size={18} /> Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>
                        <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-colors">
                            Login / Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

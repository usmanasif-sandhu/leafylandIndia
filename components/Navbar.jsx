'use client'
import { Search, ShoppingCart, User, Menu, X, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const cities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai',
    'Pune', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Lucknow',
    'Chandigarh', 'Bhopal', 'Indore', 'Nagpur', 'Surat',
]

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [search, setSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [location, setLocation] = useState('Mumbai');
    const [locationOpen, setLocationOpen] = useState(false);
    const [locationSearch, setLocationSearch] = useState('');
    const locationRef = useRef(null);
    const cartCount = useSelector(state => state.cart.total);

    useEffect(() => {
        const handleClick = (e) => {
            if (locationRef.current && !locationRef.current.contains(e.target)) {
                setLocationOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const filteredCities = cities.filter(c => c.toLowerCase().includes(locationSearch.toLowerCase()))

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/products?search=${encodeURIComponent(search)}`);
    };

    return (
        <nav className="sticky top-0 z-50 glass-navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center h-14 sm:h-16 gap-3">

                    {/* Logo */}
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

                    {/* Location Selector */}
                    <div ref={locationRef} className="relative hidden sm:block">
                        <button
                            onClick={() => setLocationOpen(!locationOpen)}
                            className="flex flex-col items-start px-3.5 py-1 hover:bg-white/60 rounded-lg transition-colors cursor-pointer"
                        >
                            <span className="text-[10px] text-slate-400 font-medium leading-tight">Select your location</span>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={15} className="text-emerald-600 shrink-0" />
                                <span className="text-sm font-semibold text-slate-700 truncate max-w-[110px]">{location}</span>
                                <ChevronDown size={13} className={`text-slate-400 transition-transform ${locationOpen ? 'rotate-180' : ''}`} />
                            </div>
                        </button>

                        {locationOpen && (
                            <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                                <div className="p-3.5 border-b border-slate-100">
                                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Select Location</p>
                                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2.5">
                                        <Search size={15} className="text-slate-400 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Search city..."
                                            value={locationSearch}
                                            onChange={(e) => setLocationSearch(e.target.value)}
                                            className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400"
                                        />
                                    </div>
                                </div>
                                <div className="max-h-52 overflow-y-auto">
                                    {filteredCities.length === 0 ? (
                                        <p className="px-4 py-6 text-xs text-slate-400 text-center">No cities found</p>
                                    ) : (
                                        filteredCities.map(city => (
                                            <button
                                                key={city}
                                                onClick={() => { setLocation(city); setLocationOpen(false); setLocationSearch('') }}
                                                className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-colors text-left ${
                                                    location === city
                                                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                <MapPin size={14} className={location === city ? 'text-emerald-600' : 'text-slate-300'} />
                                                {city}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden lg:flex items-center gap-1">
                        {[
                            { href: '/', label: 'Home' },
                            { href: '/products', label: 'Products' },
                            { href: '/services', label: 'Services' },
                            { href: '/properties', label: 'Properties' },
                        ].map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                    pathname === link.href
                                        ? 'text-emerald-600 bg-emerald-50'
                                        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

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

                        <Link href="/login" className="flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/50">
                            <User size={18} />
                            <span className="hidden md:inline text-xs">Login</span>
                        </Link>

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

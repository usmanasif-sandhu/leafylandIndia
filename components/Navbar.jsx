'use client'
import { Search, ShoppingCart, User, Menu, X, MapPin, ChevronDown, Store } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";

const cities = [
    { name: 'Mumbai', lat: 19.076, lng: 72.877 },
    { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    { name: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
    { name: 'Hyderabad', lat: 17.385, lng: 78.4867 },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707 },
    { name: 'Pune', lat: 18.5204, lng: 73.8567 },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
    { name: 'Bhopal', lat: 23.2599, lng: 77.4126 },
    { name: 'Indore', lat: 22.7196, lng: 75.8577 },
    { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
    { name: 'Surat', lat: 21.1702, lng: 72.8311 },
]

const LOCATION_KEY = 'leafyland_location'

function nearestCity(lat, lng) {
    let best = cities[0]
    let bestDist = Infinity
    for (const c of cities) {
        const d = (c.lat - lat) ** 2 + (c.lng - lng) ** 2
        if (d < bestDist) { bestDist = d; best = c }
    }
    return best.name
}

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [search, setSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [location, setLocation] = useState('Mumbai');
    const [locationOpen, setLocationOpen] = useState(false);
    const [locationSearch, setLocationSearch] = useState('');
    const locationRef = useRef(null);
    const cartCount = useSelector(state => state.cart.total);
    const { data: session } = useSession();
    const panelHref = session?.user?.role === 'ADMIN'
        ? '/admin'
        : session?.user?.storeId && session?.user?.storeStatus === 'approved'
            ? '/store'
            : session?.user
                ? '/orders'
                : '/login';

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        const saved = typeof window !== 'undefined' ? localStorage.getItem(LOCATION_KEY) : null
        if (saved && cities.some((c) => c.name === saved)) {
            setLocation(saved)
            return
        }
        if (typeof window === 'undefined' || !navigator.geolocation) {
            localStorage.setItem(LOCATION_KEY, 'Mumbai')
            return
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const city = nearestCity(pos.coords.latitude, pos.coords.longitude)
                setLocation(city)
                localStorage.setItem(LOCATION_KEY, city)
            },
            () => {
                localStorage.setItem(LOCATION_KEY, 'Mumbai')
            },
            { timeout: 8000 }
        )
    }, [])

    const selectCity = (city) => {
        setLocation(city)
        setLocationOpen(false)
        setLocationSearch('')
        try { localStorage.setItem(LOCATION_KEY, city) } catch {}
    }

    useEffect(() => {
        const handleClick = (e) => {
            if (locationRef.current && !locationRef.current.contains(e.target)) {
                setLocationOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    useEffect(() => {
        if (!mobileMenuOpen) return
        const prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prevOverflow
        }
    }, [mobileMenuOpen])

    const filteredCities = cities.filter(c => c.name.toLowerCase().includes(locationSearch.toLowerCase()))

    const handleSearch = (e) => {
        e.preventDefault();
        if (!search.trim()) return;
        router.push(`/products?search=${encodeURIComponent(search)}`);
    };

    return (
        <>
        <nav className="sticky top-0 z-50 glass-navbar">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="flex items-center h-14 sm:h-16 gap-2 lg:gap-3 min-w-0">

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
                    <div ref={locationRef} className="relative hidden sm:block shrink-0">
                        <button
                            onClick={() => setLocationOpen(!locationOpen)}
                            className="flex flex-col items-start px-1.5 lg:px-2.5 py-1 hover:bg-white/60 rounded-lg transition-colors cursor-pointer"
                        >
                            <span className="text-[10px] text-slate-400 font-medium leading-tight whitespace-nowrap">Select your location</span>
                            <div className="flex items-center gap-1">
                                <MapPin size={15} className="text-emerald-600 shrink-0" />
                                <span className="text-sm font-semibold text-slate-700 truncate max-w-[90px] lg:max-w-[110px]">{location}</span>
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
                                                key={city.name}
                                                onClick={() => selectCity(city.name)}
                                                className={`w-full flex items-center gap-2.5 px-4 py-3 text-sm transition-colors text-left ${
                                                    location === city.name
                                                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                                        : 'text-slate-600 hover:bg-slate-100'
                                                }`}
                                            >
                                                <MapPin size={14} className={location === city.name ? 'text-emerald-600' : 'text-slate-300'} />
                                                {city.name}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden xl:flex items-center gap-0.5 shrink-0">
                        {[
                            { href: '/', label: 'Home' },
                            { href: '/products', label: 'Products' },
                            { href: '/services', label: 'Services' },
                            { href: '/properties', label: 'Properties' },
                        ].map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-2.5 py-1.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                                    pathname === link.href
                                        ? 'text-emerald-600 bg-emerald-50'
                                        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Search + actions — fills leftover space, never clips Cart */}
                    <div className="flex items-center justify-end gap-1.5 sm:gap-2 min-w-0 flex-1">
                        <Link
                            href="/become-seller"
                            className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl transition-colors border shrink-0 whitespace-nowrap ${
                                pathname === '/become-seller'
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm shadow-emerald-200'
                            }`}
                        >
                            <Store size={15} />
                            Sell on LeafyLand
                        </Link>

                        <form
                            onSubmit={handleSearch}
                            className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 min-w-0 flex-1 max-w-[11rem] md:max-w-[14rem] xl:max-w-[12rem] 2xl:max-w-[18rem] px-3 py-2 rounded-xl transition-all"
                        >
                            <Search size={16} className="text-slate-400 shrink-0" />
                            <input
                                className="w-full min-w-0 bg-transparent outline-none placeholder-slate-400 text-slate-700 text-sm"
                                type="text"
                                placeholder="Search plants, tools..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>

                        {session?.user ? (
                            <div className="flex items-center shrink-0">
                                <Link href={panelHref} className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/50 whitespace-nowrap">
                                    <User size={18} />
                                    <span className="hidden md:inline text-xs max-w-[72px] truncate">{session.user.name || 'Account'}</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="hidden sm:inline text-[11px] text-slate-500 hover:text-emerald-600 px-1"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/50 shrink-0 whitespace-nowrap">
                                <User size={18} />
                                <span className="hidden md:inline text-xs">Login</span>
                            </Link>
                        )}

                        <Link href="/cart" className="relative flex items-center gap-1.5 px-2 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-white/50 shrink-0 whitespace-nowrap">
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
                            className="p-2 text-slate-700 hover:text-emerald-600 xl:hidden rounded-lg hover:bg-white/50 transition-colors shrink-0"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        {mounted && createPortal(
            <div className={`xl:hidden ${mobileMenuOpen ? '' : 'pointer-events-none'}`} aria-hidden={!mobileMenuOpen}>
                <div
                    className={`fixed inset-0 z-[90] bg-black/40 transition-opacity duration-300 ${
                        mobileMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div
                    className={`fixed inset-y-0 right-0 z-[100] w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                        top: 0,
                        bottom: 0,
                        paddingTop: 'env(safe-area-inset-top)',
                        paddingBottom: 'env(safe-area-inset-bottom)',
                    }}
                >
                    <div className="flex flex-col h-full p-6 overflow-y-auto overscroll-contain">
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
                                    className={`py-2.5 px-3 rounded-lg transition-colors ${pathname === link.href ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-emerald-50 hover:text-emerald-600'}`}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2">
                            <Link href="/become-seller" onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors">
                                <Store size={16} /> Sell on LeafyLand
                            </Link>
                            <Link href="/cart" onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-2 py-2.5 bg-slate-50 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors">
                                <ShoppingCart size={18} /> Cart {cartCount > 0 && `(${cartCount})`}
                            </Link>
                            {session?.user ? (
                                <Link href={panelHref} onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-medium rounded-xl text-sm transition-colors text-center">
                                    Account
                                </Link>
                            ) : (
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}
                                    className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-medium rounded-xl text-sm transition-colors text-center">
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>,
            document.body
        )}
        </>
    );
};

export default Navbar;

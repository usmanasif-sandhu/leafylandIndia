import Link from 'next/link'
import { ArrowRight, ShieldCheck, TrendingUp, Truck, Users, Store, Leaf, Star, CheckCircle2, IndianRupee, HeadphonesIcon, BarChart3 } from 'lucide-react'

export const metadata = {
    title: 'Become a Seller – LeafyLand',
    description: "Join India's largest green marketplace. Sell plants, tools, seeds, garden products and more to thousands of buyers across India.",
}

const benefits = [
    {
        icon: TrendingUp,
        color: 'bg-emerald-100 text-emerald-600',
        title: 'Grow Your Sales',
        desc: 'Reach thousands of plant lovers and garden enthusiasts across India actively looking for what you sell.',
    },
    {
        icon: Store,
        color: 'bg-lime-100 text-lime-700',
        title: 'Your Own Storefront',
        desc: 'Get a dedicated store page with your logo, products, reviews, and a unique URL you can share anywhere.',
    },
    {
        icon: IndianRupee,
        color: 'bg-orange-100 text-orange-600',
        title: 'Zero Commission to Start',
        desc: 'List your products for free and pay only when you grow. Transparent pricing with no hidden fees.',
    },
    {
        icon: ShieldCheck,
        color: 'bg-teal-100 text-teal-600',
        title: 'Verified Seller Badge',
        desc: 'Get admin-verified and earn a trust badge that boosts buyer confidence and conversions.',
    },
    {
        icon: BarChart3,
        color: 'bg-blue-100 text-blue-600',
        title: 'Seller Dashboard',
        desc: 'Manage orders, track inventory, view analytics, and respond to customers — all from one place.',
    },
    {
        icon: HeadphonesIcon,
        color: 'bg-purple-100 text-purple-600',
        title: 'Dedicated Support',
        desc: 'Our seller success team is here to help you set up, resolve issues, and scale your green business.',
    },
]

const steps = [
    { number: '01', title: 'Create Your Account', desc: 'Sign up or log in to your LeafyLand account.' },
    { number: '02', title: 'Submit Store Details', desc: 'Fill in your store name, description, contact info, and upload your logo.' },
    { number: '03', title: 'Get Verified', desc: 'Our team reviews your application within 24–48 hours and activates your store.' },
    { number: '04', title: 'Start Selling', desc: 'Add your products, set prices, and start receiving orders from buyers across India.' },
]

const categories = [
    'Indoor Plants', 'Outdoor Plants', 'Seeds & Bulbs', 'Garden Tools',
    'Fertilizers & Soil', 'Planters & Pots', 'Fruit Plants', 'Succulents',
    'Landscaping Materials', 'Irrigation Equipment', 'Organic Compost', 'Big Plants',
]

export default function BecomeSeller() {
    return (
        <div className="bg-slate-50">

            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600">
                <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-300/20 blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur text-emerald-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-white/20">
                        <Leaf size={13} />
                        India's Green Marketplace
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl mx-auto">
                        Sell Your Green Products to <span className="text-emerald-200">Millions</span>
                    </h1>
                    <p className="mt-5 text-base sm:text-lg text-emerald-100 max-w-xl mx-auto leading-relaxed">
                        Join 500+ verified sellers on LeafyLand — India's fastest-growing marketplace for plants, garden products, tools, and more.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                        <Link
                            href="/create-store"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-700 font-bold text-sm rounded-xl hover:bg-emerald-50 transition-colors shadow-xl shadow-black/20"
                        >
                            Start Selling Now <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/25 transition-colors backdrop-blur"
                        >
                            How It Works
                        </Link>
                    </div>

                    {/* Quick stats */}
                    <div className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-10 border-t border-white/20">
                        {[
                            { value: '500+', label: 'Active Sellers' },
                            { value: '10K+', label: 'Products Listed' },
                            { value: '50+', label: 'Cities Covered' },
                            { value: '5K+', label: 'Happy Buyers' },
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <p className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</p>
                                <p className="text-xs text-emerald-200 mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Why Sell on LeafyLand?</h2>
                    <p className="text-slate-500 mt-2 text-sm sm:text-base">Everything you need to run and grow your green business online</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {benefits.map((b, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${b.color}`}>
                                <b.icon size={22} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-base mb-2">{b.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Get Started in 4 Simple Steps</h2>
                        <p className="text-slate-500 mt-2 text-sm sm:text-base">From sign-up to first sale — it's fast and straightforward</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <div key={i} className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold text-lg mb-4">
                                    {step.number}
                                </span>
                                <h3 className="font-bold text-slate-800 text-sm mb-2">{step.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                                {i < steps.length - 1 && (
                                    <ArrowRight size={18} className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-emerald-400 z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories you can sell */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">What Can You Sell?</h2>
                    <p className="text-slate-500 mt-2 text-sm sm:text-base">List products across any of our popular green categories</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-4 py-2 bg-white border border-emerald-100 rounded-full text-sm text-slate-700 font-medium shadow-sm hover:border-emerald-400 hover:text-emerald-700 transition-colors cursor-default">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            {cat}
                        </span>
                    ))}
                </div>
            </section>


            {/* Final CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl px-6 py-14 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />
                    <div className="relative z-10">
                        <Users size={36} className="text-emerald-400 mx-auto mb-4" />
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-xl mx-auto">
                            Ready to Join India's Green Seller Community?
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-md mx-auto text-sm sm:text-base">
                            Set up your store in minutes. No technical knowledge needed. Our team will guide you every step of the way.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                            <Link
                                href="/create-store"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-emerald-500/30"
                            >
                                Create Your Store <ArrowRight size={16} />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors"
                            >
                                Talk to Our Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

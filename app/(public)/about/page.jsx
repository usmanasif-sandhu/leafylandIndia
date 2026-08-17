import { Leaf, Target, Users, Award } from 'lucide-react'

const AboutPage = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            {/* Hero */}
            <div className="text-center mb-12">
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">About LeafyLand</h1>
                <p className="text-slate-500 mt-3 max-w-xl mx-auto leading-relaxed">
                    Love of Nature's Beauty is taste, Creation of beauty is art. — Ralph Waldo Emerson
                </p>
            </div>

            {/* Story */}
            <section className="mb-12">
                <h2 className="text-lg font-bold text-slate-800 mb-3">Our Story</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                    LeafyLand is a Mumbai-based agri-horti-landscaping company with national and international project experience. 
                    From designing farmhouses for discerning clients to building corporate landscapes for brands like Pepsi, Coca-Cola, and DLF, 
                    we've spent years mastering the art and science of outdoor spaces.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                    Now, we're building LeafyLand as a marketplace that brings together everything in the landscaping and property ecosystem — 
                    plants, garden tools, professional services, farmland, and farmhouses — all in one place. Whether you're a homeowner 
                    looking for a single indoor plant or a developer searching for the perfect plot of land, LeafyLand connects you with 
                    the right vendors and professionals.
                </p>
            </section>

            {/* Values */}
            <section className="mb-12">
                <h2 className="text-lg font-bold text-slate-800 mb-4">What We Stand For</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                        <Target className="w-6 h-6 text-emerald-600 mb-2" />
                        <h3 className="font-semibold text-slate-800 text-sm">Quality First</h3>
                        <p className="text-xs text-slate-500 mt-1">Every vendor is vetted. Every product is guaranteed.</p>
                    </div>
                    <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                        <Users className="w-6 h-6 text-blue-600 mb-2" />
                        <h3 className="font-semibold text-slate-800 text-sm">Community Driven</h3>
                        <p className="text-xs text-slate-500 mt-1">Supporting local nurseries, artisans, and service providers.</p>
                    </div>
                    <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                        <Award className="w-6 h-6 text-amber-600 mb-2" />
                        <h3 className="font-semibold text-slate-800 text-sm">Proven Track Record</h3>
                        <p className="text-xs text-slate-500 mt-1">Projects across Mumbai, Pune, Delhi, Kolkata, Dubai, and Punjab.</p>
                    </div>
                    <div className="p-5 bg-purple-50 border border-purple-100 rounded-2xl">
                        <Leaf className="w-6 h-6 text-purple-600 mb-2" />
                        <h3 className="font-semibold text-slate-800 text-sm">Sustainability</h3>
                        <p className="text-xs text-slate-500 mt-1">Promoting organic farming, native plants, and eco-friendly practices.</p>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="bg-slate-50 rounded-2xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-800 mb-3">Get in Touch</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600">
                    <div>
                        <p className="font-medium text-slate-700">Address</p>
                        <p className="mt-1">LeafyLand, B21, T.V. Industrial Estate,<br />S.K. Ahire Marg, Worli, Mumbai 400030</p>
                    </div>
                    <div>
                        <p className="font-medium text-slate-700">Contact</p>
                        <p className="mt-1">Tel: +91 98679 09355<br />hello@leafyland.com</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage

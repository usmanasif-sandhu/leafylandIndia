import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function InvestorPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-7 h-7 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Top Investor Opportunity</h1>
                <p className="text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
                    Partner with LeafyLand as we grow India&apos;s agri-horti marketplace — plants, services, and properties in one platform.
                </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 sm:p-8 text-center">
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    Interested in investing? Reach out and our team will share the opportunity deck and next steps.
                </p>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                >
                    Contact us
                </Link>
            </div>
        </div>
    )
}

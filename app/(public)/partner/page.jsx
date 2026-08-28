import Link from 'next/link'
import { Handshake } from 'lucide-react'

export default function PartnerPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="text-center mb-10">
                <div className="w-14 h-14 mx-auto bg-emerald-100 rounded-2xl flex items-center justify-center mb-4">
                    <Handshake className="w-7 h-7 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Become a partner</h1>
                <p className="text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
                    Join LeafyLand as a franchisee, investor, or business partner — and grow with India&apos;s green marketplace.
                </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 sm:p-8 text-center">
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    Tell us how you&apos;d like to partner with us. Our team will reach out with the right next steps.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                    >
                        Get in touch
                    </Link>
                    <Link
                        href="/franchise"
                        className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-emerald-200 text-emerald-700 text-sm font-semibold hover:bg-emerald-50 transition-colors"
                    >
                        Franchise opportunities
                    </Link>
                </div>
            </div>
        </div>
    )
}

import { Store, BadgeCheck, Wallet } from 'lucide-react'

export const metadata = {
    title: 'Seller Policy — LeafyLand',
    description: 'Policies and standards for selling plants, properties, and services on LeafyLand.',
}

const Section = ({ title, children }) => (
    <section className="mb-8">
        <h2 className="text-base font-bold text-slate-800 mb-2">{title}</h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </section>
)

const SellerPolicyPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <Store className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Seller Policy</h1>
            </div>
            <p className="text-xs text-slate-400 mb-8">Last updated: 26 August 2026</p>

            <Section title="1. Becoming a Seller">
                <p>
                    To sell on LeafyLand you must complete the onboarding application and verification process,
                    including valid business or identity details (KYC). Approval is at LeafyLand's discretion. Sellers
                    may offer plants, garden tools, landscaping services, farmland, and farmhouses, subject to the
                    prohibited-items list below.
                </p>
            </Section>

            <Section title="2. Listing Standards">
                <p>
                    <BadgeCheck className="w-4 h-4 inline text-emerald-600" /> Every listing must be accurate and
                    complete: correct titles, descriptions, specifications, pricing, and clear, representative
                    photographs. Misrepresentation, stock-outs, or misleading claims may result in listing removal or
                    account action.
                </p>
            </Section>

            <Section title="3. Commissions &amp; Fees">
                <p>
                    LeafyLand charges a commission on completed sales, deducted automatically from the order value before
                    payout. Current standard commission is 10% unless a different rate is agreed in writing. Applicable
                    payment-gateway and processing fees may also apply. Fee schedules are communicated at onboarding and
                    may be updated with notice.
                </p>
            </Section>

            <Section title="4. Fulfilment &amp; Shipping">
                <p>
                    Sellers are responsible for packing, dispatch, and on-time delivery in accordance with the timeline
                    shown at checkout. Live plants must be packaged to survive transit. Sellers must upload valid
                    tracking information and promptly handle delays or damage claims.
                </p>
            </Section>

            <Section title="5. Payouts">
                <p>
                    <Wallet className="w-4 h-4 inline text-emerald-600" /> Seller payouts are released on a rolling
                    schedule after successful delivery and any return window expires (typically within 7 business days of
                    order completion). Payouts are made to the bank account on file. Disputed or fraudulent orders are
                    withheld until resolved.
                </p>
            </Section>

            <Section title="6. Cancellations, Returns &amp; Refunds">
                <p>
                    Sellers must honour their stated cancellation and return policies. Where a return or refund is
                    approved, the seller's portion is reversed accordingly. Repeated fulfilment failures may lead to
                    penalties or suspension.
                </p>
            </Section>

            <Section title="7. Prohibited Items">
                <p>The following are not permitted under any circumstances:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Protected, endangered, or illegally sourced plants and wildlife;</li>
                    <li>Counterfeit, stolen, or infringing goods;</li>
                    <li>Hazardous, illegal, or regulated substances without proper licensing;</li>
                    <li>Any item that violates applicable law or LeafyLand policies.</li>
                </ul>
            </Section>

            <Section title="8. Conduct &amp; Suspension">
                <p>
                    Sellers must maintain professional, lawful conduct and respond to customers and support in a timely
                    manner. LeafyLand may suspend or terminate a seller account for policy violations, fraud, or
                    sustained poor performance.
                </p>
            </Section>

            <Section title="9. Contact">
                <p>
                    Seller support is available at{' '}
                    <a href="mailto:sellers@leafyland.com" className="text-emerald-600 font-medium">sellers@leafyland.com</a>{' '}
                    or LeafyLand, B21, T.V. Industrial Estate, S.K. Ahire Marg, Worli, Mumbai 400030.
                </p>
            </Section>
        </div>
    )
}

export default SellerPolicyPage

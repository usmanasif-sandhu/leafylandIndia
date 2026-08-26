import { FileText, Scale, ShieldCheck } from 'lucide-react'

export const metadata = {
    title: 'Terms & Conditions — LeafyLand',
    description: 'The terms governing your use of the LeafyLand marketplace for plants, properties, and landscaping services.',
}

const Section = ({ title, children }) => (
    <section className="mb-8">
        <h2 className="text-base font-bold text-slate-800 mb-2">{title}</h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </section>
)

const TermsPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <Scale className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Terms &amp; Conditions</h1>
            </div>
            <p className="text-xs text-slate-400 mb-8">Last updated: 26 August 2026</p>

            <Section title="1. Acceptance of Terms">
                <p>
                    Welcome to LeafyLand. These Terms &amp; Conditions ("Terms") govern your access to and use of the
                    LeafyLand website, mobile applications, and related services (collectively, the "Platform"). By
                    registering for an account or otherwise using the Platform, you agree to be bound by these Terms and
                    our Privacy Policy. If you do not agree, please do not use the Platform.
                </p>
            </Section>

            <Section title="2. Eligibility">
                <p>
                    You must be at least 18 years of age and capable of forming a binding contract under applicable law
                    to use LeafyLand. The Platform is intended for users located in India, although certain products and
                    services may be available internationally where supported.
                </p>
            </Section>

            <Section title="3. Account Registration">
                <p>
                    You are responsible for maintaining the confidentiality of your account credentials and for all
                    activity that occurs under your account. You agree to provide accurate, current, and complete
                    information during registration and to keep it updated. A valid, verified email address is required
                    to transact on the Platform.
                </p>
            </Section>

            <Section title="4. Buying on LeafyLand">
                <p>
                    Listings on LeafyLand include plants, garden tools, professional landscaping services, farmland, and
                    farmhouses offered by independent sellers and service providers ("Vendors"). LeafyLand is a
                    marketplace and is not itself the seller of these items. Your purchase is a contract between you and
                    the relevant Vendor, subject to the Vendor's stated terms and these Terms.
                </p>
            </Section>

            <Section title="5. Selling on LeafyLand">
                <p>
                    Sellers must complete the onboarding and verification process before listing products or services.
                    Sellers are solely responsible for the accuracy of their listings, for fulfilling orders, and for
                    any claims relating to the quality, safety, or legality of their offerings. Seller-specific
                    obligations are set out in our Seller Policy.
                </p>
            </Section>

            <Section title="6. Pricing &amp; Payments">
                <p>
                    All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated
                    otherwise. Payments are processed through our payment partners (including Razorpay). LeafyLand may
                    offer multiple payment methods such as UPI, net-banking, cards, and cash-on-delivery where available.
                    You authorise us to charge the selected payment method for the total order value.
                </p>
            </Section>

            <Section title="7. Shipping &amp; Delivery">
                <p>
                    Delivery timelines, shipping charges, and service availability vary by Vendor, location, and product
                    type (including the perishable nature of live plants). Estimated timelines are displayed at checkout
                    and are not guaranteed. Risk of loss passes to you upon delivery as defined by the Vendor's
                    fulfillment terms.
                </p>
            </Section>

            <Section title="8. Cancellations, Returns &amp; Refunds">
                <p>
                    Cancellation and return eligibility is determined by the Vendor's policy and the nature of the item.
                    Live plants and perishable goods may be non-returnable except where damaged in transit. Approved
                    refunds are processed to the original payment method within a reasonable period after verification.
                </p>
            </Section>

            <Section title="9. Prohibited Conduct">
                <p>You agree not to:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Violate any law or third-party right;</li>
                    <li>Post false, misleading, or infringing content;</li>
                    <li>Interfere with the security, integrity, or performance of the Platform;</li>
                    <li>Use the Platform to transmit malware, spam, or unsolicited communications.</li>
                </ul>
            </Section>

            <Section title="10. Intellectual Property">
                <p>
                    All trademarks, logos, text, graphics, and software on the Platform are the property of LeafyLand or
                    its licensors. You may not reproduce, distribute, or create derivative works without prior written
                    permission.
                </p>
            </Section>

            <Section title="11. Limitation of Liability">
                <p>
                    The Platform is provided "as is" without warranties of any kind. To the maximum extent permitted by
                    law, LeafyLand shall not be liable for any indirect, incidental, or consequential damages arising
                    from your use of, or inability to use, the Platform, including disputes between buyers and Vendors.
                </p>
            </Section>

            <Section title="12. Changes to These Terms">
                <p>
                    We may revise these Terms from time to time. Material changes will be communicated via the Platform
                    or email. Your continued use after changes take effect constitutes acceptance of the revised Terms.
                </p>
            </Section>

            <Section title="13. Contact">
                <p>
                    Questions about these Terms can be directed to{' '}
                    <a href="mailto:hello@leafyland.com" className="text-emerald-600 font-medium">hello@leafyland.com</a>{' '}
                    or LeafyLand, B21, T.V. Industrial Estate, S.K. Ahire Marg, Worli, Mumbai 400030.
                </p>
            </Section>
        </div>
    )
}

export default TermsPage

import { ShieldCheck, Lock, Mail } from 'lucide-react'

export const metadata = {
    title: 'Privacy Policy — LeafyLand',
    description: 'How LeafyLand collects, uses, and protects your personal information.',
}

const Section = ({ title, children }) => (
    <section className="mb-8">
        <h2 className="text-base font-bold text-slate-800 mb-2">{title}</h2>
        <div className="text-sm text-slate-600 leading-relaxed space-y-2">{children}</div>
    </section>
)

const PrivacyPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Privacy Policy</h1>
            </div>
            <p className="text-xs text-slate-400 mb-8">Last updated: 26 August 2026</p>

            <Section title="1. Information We Collect">
                <p>We collect the following categories of information:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>
                        <span className="font-medium text-slate-700">Account data:</span> name, email address, phone
                        number, delivery addresses, and password (stored in hashed form).
                    </li>
                    <li>
                        <span className="font-medium text-slate-700">Transaction data:</span> orders, cart contents,
                        saved addresses, and payment metadata (we do not store full card or UPI credentials).
                    </li>
                    <li>
                        <span className="font-medium text-slate-700">Usage &amp; device data:</span> IP address,
                        browser type, pages visited, and cookies that help us improve the Platform.
                    </li>
                </ul>
            </Section>

            <Section title="2. How We Use Your Information">
                <p>We use your information to:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Create and manage your account and verify your identity;</li>
                    <li>Process orders, payments, and deliveries;</li>
                    <li>Provide customer support and resolve disputes;</li>
                    <li>Send transactional, service, and (with consent) promotional communications;</li>
                    <li>Detect, prevent, and address fraud or security issues.</li>
                </ul>
            </Section>

            <Section title="3. Sharing of Information">
                <p>
                    We share information only as necessary: with Vendors to fulfil your orders; with payment processors
                    (such as Razorpay) to complete transactions; with logistics partners for delivery; and with legal or
                    regulatory authorities where required by law. We do not sell your personal information.
                </p>
            </Section>

            <Section title="4. Cookies &amp; Tracking">
                <p>
                    We use cookies and similar technologies to keep you signed in, remember preferences, and understand
                    how the Platform is used. You can manage cookies through your browser settings, although disabling
                    them may affect certain features.
                </p>
            </Section>

            <Section title="5. Data Security">
                <p>
                    <Lock className="w-4 h-4 inline text-emerald-600" /> We implement reasonable technical and
                    organisational measures — including encryption in transit and access controls — to protect your
                    personal data. No method of transmission or storage is completely secure, and we cannot guarantee
                    absolute security.
                </p>
            </Section>

            <Section title="6. Your Rights">
                <p>
                    Subject to applicable law (including the Digital Personal Data Protection Act, 2023), you may request
                    access to, correction of, or deletion of your personal data, and withdraw consent for non-essential
                    processing. To exercise these rights, contact us using the details below.
                </p>
            </Section>

            <Section title="7. Children's Privacy">
                <p>
                    LeafyLand is not directed to individuals under 18, and we do not knowingly collect personal data from
                    minors without parental consent.
                </p>
            </Section>

            <Section title="8. Changes to This Policy">
                <p>
                    We may update this Privacy Policy periodically. Material changes will be posted on this page with an
                    updated revision date.
                </p>
            </Section>

            <Section title="9. Contact">
                <p>
                    <Mail className="w-4 h-4 inline text-emerald-600" /> For privacy-related requests, write to{' '}
                    <a href="mailto:privacy@leafyland.com" className="text-emerald-600 font-medium">privacy@leafyland.com</a>{' '}
                    or LeafyLand, B21, T.V. Industrial Estate, S.K. Ahire Marg, Worli, Mumbai 400030.
                </p>
            </Section>
        </div>
    )
}

export default PrivacyPage

'use client'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const ContactPage = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setForm({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Contact Us</h1>
                <p className="text-slate-500 mt-2 text-sm">We'd love to hear from you. Reach out anytime.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Info */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                        <MapPin size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Address</p>
                            <p className="text-xs text-slate-500 mt-1">LeafyLand, B21, T.V. Industrial Estate, S.K. Ahire Marg, Worli, Mumbai 400030</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                        <Phone size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Phone</p>
                            <p className="text-xs text-slate-500 mt-1">+91 98679 09355</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                        <Mail size={18} className="text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Email</p>
                            <p className="text-xs text-slate-500 mt-1">hello@leafyland.com</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-slate-600 mb-1 block">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-slate-600 mb-1 block">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-600 mb-1 block">Subject</label>
                            <input
                                type="text"
                                required
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition"
                                placeholder="How can we help?"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-slate-600 mb-1 block">Message</label>
                            <textarea
                                required
                                rows={4}
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition resize-none"
                                placeholder="Tell us more..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 text-sm font-semibold rounded-xl active:scale-95 transition flex items-center gap-2"
                        >
                            <Send size={14} /> Send Message
                        </button>
                        {submitted && (
                            <p className="text-sm text-emerald-600 font-medium">Message sent! We'll get back to you soon.</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactPage

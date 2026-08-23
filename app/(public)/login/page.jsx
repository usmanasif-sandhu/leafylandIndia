'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { assets } from '@/assets/assets'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import GoogleSignInButton from '@/components/GoogleSignInButton'

const AUTH_ERROR_MESSAGES = {
    OAuthAccountNotLinked:
        'This email is already registered with a password. Sign in with email and password instead.',
    OAuthSignin: 'Google sign-in could not start. Check AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET on the server.',
    OAuthCallback: 'Google sign-in failed. Confirm AUTH_URL matches your domain and the Google redirect URI.',
    OAuthCreateAccount: 'Could not create your account with Google. Please try again.',
    Callback: 'Sign-in callback failed. Set AUTH_URL to your public site URL (e.g. https://yourdomain.com).',
    AccessDenied: 'Access was denied. Try another Google account.',
    Configuration: 'Auth is misconfigured on the server. Contact support.',
    Default: 'Sign-in failed. Please try again.',
    email_not_verified: 'Please verify your email before signing in. Check your inbox for the verification link.',
}

function LoginForm() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const callbackUrl = searchParams.get('callbackUrl') || '/auth/continue'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const [googleEnabled, setGoogleEnabled] = useState(false)
    const [authConfigLoading, setAuthConfigLoading] = useState(true)

    useEffect(() => {
        fetch('/api/auth/config')
            .then((r) => (r.ok ? r.json() : { googleEnabled: false }))
            .then((data) => setGoogleEnabled(Boolean(data?.googleEnabled)))
            .catch(() => setGoogleEnabled(false))
            .finally(() => setAuthConfigLoading(false))
    }, [])

    useEffect(() => {
        const errorCode = searchParams.get('error')
        if (!errorCode) return
        const message = AUTH_ERROR_MESSAGES[errorCode] || AUTH_ERROR_MESSAGES.Default
        setFormError(message)
        toast.error(message)
    }, [searchParams])

    const safeCallbackUrl = callbackUrl.startsWith('/') ? callbackUrl : '/auth/continue'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setFormError('')
        try {
            if (isSignUp) {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password }),
                })
                const data = await res.json()
                if (!res.ok) throw new Error(data.error || 'Could not create account')

                if (data.devVerifyUrl) {
                    console.info('[dev] Verification link:', data.devVerifyUrl)
                }
                window.location.assign(`/verify-email?email=${encodeURIComponent(email)}`)
                return
            }

            const checkRes = await fetch('/api/auth/check-credentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const checkData = await checkRes.json()
            if (!checkRes.ok) {
                throw new Error(checkData.error || 'Invalid email or password')
            }
            if (checkData.status === 'email_not_verified') {
                window.location.assign(`/verify-email?email=${encodeURIComponent(email)}`)
                return
            }

            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: safeCallbackUrl,
            })
            if (result?.error) {
                throw new Error(
                    result.error === 'CredentialsSignin'
                        ? 'Invalid email or password'
                        : 'Sign-in failed. Try again, or create the account on this site first.',
                )
            }
            router.push(safeCallbackUrl)
        } catch (err) {
            setFormError(err.message)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-slate-50/50">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-3">
                        <Image src={assets.logo} alt="LeafyLand" width={140} height={35} className="h-9 w-auto object-contain" />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-800">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {isSignUp ? 'Join LeafyLand to start buying & selling' : 'Sign in to your LeafyLand account'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
                    {formError && (
                        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                            {formError}
                        </p>
                    )}

                    {!isSignUp && (
                        <>
                            {authConfigLoading ? (
                                <div className="py-2.5 text-center text-xs text-slate-400">Checking sign-in options…</div>
                            ) : googleEnabled ? (
                                <GoogleSignInButton callbackUrl={safeCallbackUrl} disabled={loading} />
                            ) : null}

                            {googleEnabled && (
                                <div className="flex items-center gap-3 my-5">
                                    <div className="flex-1 h-px bg-slate-200" />
                                    <span className="text-[11px] text-slate-400 font-medium">OR</span>
                                    <div className="flex-1 h-px bg-slate-200" />
                                </div>
                            )}
                        </>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <div>
                                <label className="text-xs font-medium text-slate-600 mb-1.5 block">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-slate-600 mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-medium rounded-xl text-sm transition-colors"
                        >
                            {loading ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
                        </button>
                    </form>

                    {isSignUp && !authConfigLoading && googleEnabled && (
                        <>
                            <div className="flex items-center gap-3 my-5">
                                <div className="flex-1 h-px bg-slate-200" />
                                <span className="text-[11px] text-slate-400 font-medium">OR</span>
                                <div className="flex-1 h-px bg-slate-200" />
                            </div>
                            <GoogleSignInButton callbackUrl={safeCallbackUrl} disabled={loading} />
                        </>
                    )}
                </div>

                <p className="text-center text-sm text-slate-500 mt-5">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        onClick={() => {
                            setIsSignUp(!isSignUp)
                            setFormError('')
                        }}
                        className="text-emerald-600 font-semibold hover:underline"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-[80vh]" />}>
            <LoginForm />
        </Suspense>
    )
}

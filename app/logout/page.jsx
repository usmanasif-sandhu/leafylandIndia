'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function LogoutPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                        <LogOut size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold text-slate-800">Sign out of LeafyLand?</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            You'll need to sign in again to get back to your dashboard.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <a
                        href="/"
                        className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </a>
                    <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    )
}

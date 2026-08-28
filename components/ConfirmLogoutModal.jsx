'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function ConfirmLogoutModal({ open, onClose }) {
    useEffect(() => {
        if (!open) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = prev
            window.removeEventListener('keydown', onKey)
        }
    }, [open, onClose])

    if (!open || typeof document === 'undefined') return null

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-modal-title"
            >
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                        <LogOut size={20} />
                    </div>
                    <div>
                        <h2 id="logout-modal-title" className="text-lg font-semibold text-slate-800">
                            Sign out of LeafyLand?
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            You&apos;ll need to sign in again to get back to your dashboard.
                        </p>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    )
}

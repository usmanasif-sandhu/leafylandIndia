'use client'
import { useEffect, useState } from 'react'
import { Send, CheckCheck, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

export default function VendorMessages() {
    const [messages, setMessages] = useState([])
    const [selectedMsg, setSelectedMsg] = useState(null)
    const [replyText, setReplyText] = useState('')

    const load = () => {
        fetch('/api/vendor/messages')
            .then((r) => r.json())
            .then((data) => { if (Array.isArray(data)) setMessages(data) })
    }

    useEffect(() => { load() }, [])

    const unreadCount = messages.filter(m => !m.read).length

    const handleReply = async () => {
        if (!replyText.trim() || !selectedMsg) return
        const res = await fetch('/api/vendor/messages', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedMsg.id, reply: replyText, read: true }),
        })
        if (!res.ok) return toast.error('Could not send reply')
        toast.success('Reply sent')
        setReplyText('')
        setSelectedMsg(null)
        load()
    }

    const openMessage = async (msg) => {
        setSelectedMsg(msg)
        if (!msg.read) {
            await fetch('/api/vendor/messages', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: msg.id, read: true }),
            })
            load()
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-slate-800">
                    Store <span className="font-bold">Messages</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    {unreadCount > 0 ? <span className="text-red-500 font-medium">{unreadCount} unread</span> : 'All caught up'}
                </p>
            </div>

            {messages.length === 0 ? (
                <p className="text-sm text-slate-500">No customer messages yet.</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-2">
                        {messages.map(msg => (
                            <button
                                key={msg.id}
                                onClick={() => openMessage(msg)}
                                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                                    selectedMsg?.id === msg.id
                                        ? 'bg-emerald-50 border-emerald-200'
                                        : msg.read
                                            ? 'bg-white border-slate-100 hover:bg-slate-50'
                                            : 'bg-white border-emerald-200 shadow-sm'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-xs font-bold text-emerald-700">{(msg.customer || '?').charAt(0)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-slate-700 truncate">{msg.customer || 'Customer'}</p>
                                            {!msg.read && <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />}
                                        </div>
                                        <p className="text-xs text-slate-500 truncate mt-0.5">{msg.message}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{msg.date ? new Date(msg.date).toLocaleDateString() : ''}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="lg:col-span-2">
                        {selectedMsg ? (
                            <div className="bg-white rounded-2xl border border-slate-100 p-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-bold text-emerald-700">{(selectedMsg.customer || '?').charAt(0)}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{selectedMsg.customer || 'Customer'}</p>
                                        <p className="text-xs text-slate-400">{selectedMsg.date ? new Date(selectedMsg.date).toLocaleString() : ''}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                                    <p className="text-sm text-slate-700">{selectedMsg.message}</p>
                                </div>

                                {selectedMsg.reply && (
                                    <div className="bg-emerald-50 rounded-xl p-4 mb-4 ml-8">
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <CheckCheck size={12} className="text-emerald-600" />
                                            <span className="text-[10px] font-semibold text-emerald-600">Your Reply</span>
                                        </div>
                                        <p className="text-sm text-slate-700">{selectedMsg.reply}</p>
                                    </div>
                                )}

                                {!selectedMsg.reply && (
                                    <div className="mt-4">
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Type your reply..."
                                            rows={3}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm px-4 py-3 focus:border-emerald-500 outline-none resize-none transition"
                                        />
                                        <div className="flex justify-end mt-3">
                                            <button
                                                onClick={handleReply}
                                                disabled={!replyText.trim()}
                                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                                            >
                                                <Send size={14} /> Send Reply
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                                <MessageSquare size={40} className="text-slate-300 mx-auto mb-3" />
                                <p className="text-slate-500 text-sm">Select a message to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

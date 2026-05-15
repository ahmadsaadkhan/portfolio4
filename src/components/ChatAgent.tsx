'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
    role: 'user' | 'assistant'
    content: string
}

const SUGGESTIONS = [
    'What technologies does Ahmad know?',
    'Tell me about his experience',
    'What projects has he built?',
    'Is he open to new opportunities?',
]

export default function ChatAgent() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Hi! I'm Ahmad's portfolio assistant. Ask me anything about his skills, experience, or projects — I'm happy to help! 👋",
        },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [showSuggestions, setShowSuggestions] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
            setTimeout(() => inputRef.current?.focus(), 300)
        }
    }, [open, messages])

    const send = async (text: string) => {
        if (!text.trim() || loading) return
        setShowSuggestions(false)

        const userMsg: Message = { role: 'user', content: text }
        const updated = [...messages, userMsg]
        setMessages(updated)
        setInput('')
        setLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updated.map(m => ({ role: m.role, content: m.content })),
                }),
            })
            const data = await res.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Sorry, I had trouble with that.' }])
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm a bit busy right now — please wait a moment and try again, or reach out to Ahmad directly at ahmad.saad.khn@gmail.com 📬",
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            send(input)
        }
    }

    return (
        <>
            {/* Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        style={{
                            position: 'fixed', bottom: '90px', right: '1.5rem',
                            width: 'min(380px, calc(100vw - 2rem))',
                            height: '520px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            display: 'flex', flexDirection: 'column',
                            zIndex: 200,
                            boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1rem 1.2rem',
                            borderBottom: '1px solid var(--border)',
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'var(--surface-2)',
                            flexShrink: 0,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {/* Avatar */}
                                <div style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: 'var(--accent-dim)',
                                    border: '1px solid var(--accent)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                        <line x1="9" y1="9" x2="9.01" y2="9" />
                                        <line x1="15" y1="9" x2="15.01" y2="9" />
                                    </svg>
                                </div>
                                <div>
                                    <p style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text)', fontWeight: 700 }}>
                                        Portfolio Assistant
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                                        <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--muted)' }}>Online</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setOpen(false)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', padding: '4px', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1, overflowY: 'auto', padding: '1rem',
                            display: 'flex', flexDirection: 'column', gap: '0.85rem',
                        }}>
                            {messages.map((msg, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <div style={{
                                        maxWidth: '82%',
                                        padding: '0.65rem 0.9rem',
                                        borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                                        background: msg.role === 'user' ? 'var(--accent)' : 'var(--surface-2)',
                                        color: msg.role === 'user' ? 'var(--bg)' : 'var(--text)',
                                        fontFamily: 'var(--sans)', fontSize: '0.85rem', lineHeight: 1.6,
                                        border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                                    }}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {loading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    style={{ display: 'flex', justifyContent: 'flex-start' }}
                                >
                                    <div style={{
                                        padding: '0.65rem 1rem', borderRadius: '12px 12px 12px 2px',
                                        background: 'var(--surface-2)', border: '1px solid var(--border)',
                                        display: 'flex', gap: '4px', alignItems: 'center',
                                    }}>
                                        {[0, 1, 2].map(dot => (
                                            <motion.div key={dot}
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: dot * 0.15 }}
                                                style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Suggestion chips */}
                            {showSuggestions && messages.length === 1 && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                                    {SUGGESTIONS.map(s => (
                                        <button key={s} onClick={() => send(s)}
                                            style={{
                                                fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.03em',
                                                color: 'var(--accent)', border: '1px solid var(--accent)',
                                                background: 'var(--accent-dim)', padding: '0.3rem 0.65rem',
                                                borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s',
                                                textAlign: 'left',
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)' }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent-dim)'; e.currentTarget.style.color = 'var(--accent)' }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div style={{
                            padding: '0.75rem 1rem',
                            borderTop: '1px solid var(--border)',
                            display: 'flex', gap: '0.5rem', alignItems: 'center',
                            background: 'var(--surface-2)', flexShrink: 0,
                        }}>
                            <input
                                ref={inputRef}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Ask me anything..."
                                disabled={loading}
                                style={{
                                    flex: 1, background: 'var(--surface)', border: '1px solid var(--border)',
                                    borderRadius: '20px', padding: '0.55rem 1rem',
                                    fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--text)',
                                    outline: 'none', transition: 'border-color 0.2s',
                                }}
                                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                            />
                            <button onClick={() => send(input)} disabled={loading || !input.trim()}
                                style={{
                                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                                    background: input.trim() && !loading ? 'var(--accent)' : 'var(--border)',
                                    border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'background 0.2s',
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                    stroke={input.trim() && !loading ? 'var(--bg)' : 'var(--muted)'}
                                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => setOpen(o => !o)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label="Open chat"
                style={{
                    position: 'fixed', bottom: '1.5rem', right: '1.5rem',
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--accent)', border: 'none',
                    cursor: 'pointer', zIndex: 200,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(0, 245, 212, 0.3)',
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span key="close"
                            initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.18 }}
                            style={{ display: 'flex' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="var(--bg)" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </motion.span>
                    ) : (
                        <motion.span key="chat"
                            initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -45 }} transition={{ duration: 0.18 }}
                            style={{ display: 'flex' }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </>
    )
}
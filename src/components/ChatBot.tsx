'use client'
import { useState, useRef, useEffect } from 'react'

type Msg = { role: 'user' | 'assistant'; content: string }

const WELCOME: Msg = {
  role: 'assistant',
  content: 'שלום! אני גלי 🌿 המדריך שלכם לנופש בגליל. במה אוכל לעזור? אפשר לשאול על המתחמים, תאריכים, מחירים — הכל!',
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pulse, setPulse] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Stop pulse after first open
  useEffect(() => {
    if (open) setPulse(false)
  }, [open])

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    const userMsg: Msg = { role: 'user', content: text }
    const next = [...msgs, userMsg]
    setMsgs(next)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMsgs(m => [...m, { role: 'assistant', content: data.text }])
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'מצטערים, נסו שוב.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* FAB button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'סגור צ׳אט' : 'פתח צ׳אט עם גלי'}
        style={{
          position: 'fixed',
          bottom: '1.8rem',
          left: '1.8rem',
          zIndex: 2000,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: open ? 'var(--soil)' : 'var(--leaf)',
          border: open ? '1px solid rgba(122,158,95,.4)' : 'none',
          color: 'var(--cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,.45)',
          transition: 'background .3s, transform .2s',
          transform: open ? 'scale(.92)' : 'scale(1)',
        }}
      >
        {open ? (
          // X icon
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          // Chat bubble icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {/* Pulse ring */}
        {pulse && !open && (
          <span style={{
            position: 'absolute', inset: -4, borderRadius: '50%',
            border: '2px solid var(--sage)', animation: 'chatPulse 2s ease infinite',
            pointerEvents: 'none',
          }} />
        )}
      </button>

      {/* Chat window */}
      <div
        role="dialog"
        aria-label="צ׳אט עם גלי — מדריך הנופש"
        aria-modal="true"
        style={{
          position: 'fixed',
          bottom: '5.5rem',
          left: '1.2rem',
          zIndex: 1999,
          width: 'min(370px, calc(100vw - 2.4rem))',
          maxHeight: 'min(520px, calc(100svh - 9rem))',
          background: 'var(--bark)',
          border: '1px solid rgba(122,158,95,.18)',
          borderRadius: '3px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 12px 60px rgba(0,0,0,.55)',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.96)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform .35s cubic-bezier(.16,1,.3,1), opacity .3s',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1rem 1.2rem',
          background: 'var(--log)',
          borderBottom: '1px solid rgba(122,158,95,.1)',
          display: 'flex', alignItems: 'center', gap: '.75rem', flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--forest), var(--leaf))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', flexShrink: 0,
          }}>🌿</div>
          <div>
            <div style={{ fontSize: '.82rem', fontWeight: 500, letterSpacing: '.04em', color: 'var(--cream)' }}>גלי</div>
            <div style={{ fontSize: '.65rem', color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: '.3rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              מדריך נופש · גליל מערבי
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="סגור"
            style={{ marginRight: 'auto', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 4, lineHeight: 1 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '.75rem',
          scrollbarWidth: 'none',
        }}>
          <style>{`
            @keyframes chatPulse { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.25);opacity:0} }
            @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
            .chat-scroll::-webkit-scrollbar { display: none }
          `}</style>
          {msgs.map((m, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-start' : 'flex-end',
              animation: 'msgIn .3s ease',
            }}>
              <div style={{
                maxWidth: '82%',
                padding: '.65rem 1rem',
                borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                background: m.role === 'user'
                  ? 'rgba(122,158,95,.18)'
                  : 'var(--log)',
                border: m.role === 'user'
                  ? '1px solid rgba(122,158,95,.25)'
                  : '1px solid rgba(242,237,227,.06)',
                fontSize: '.83rem',
                lineHeight: 1.65,
                color: m.role === 'user' ? 'var(--cream)' : 'rgba(242,237,227,.9)',
                direction: 'rtl',
                textAlign: 'right',
              }}>
                {/* Render wa.me links as clickable */}
                {m.content.includes('wa.me') ? (
                  <span dangerouslySetInnerHTML={{
                    __html: m.content.replace(
                      /(https:\/\/wa\.me\/\S+)/g,
                      '<a href="$1" target="_blank" rel="noopener" style="color:var(--sage);text-decoration:underline">WhatsApp ←</a>'
                    )
                  }} />
                ) : m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ padding: '.65rem 1rem', borderRadius: '12px 12px 12px 4px', background: 'var(--log)', border: '1px solid rgba(242,237,227,.06)', display: 'flex', gap: 4 }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)', display: 'inline-block', animation: `chatPulse 1.2s ease ${i * .2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        {msgs.length === 1 && (
          <div style={{ padding: '0 1rem .75rem', display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
            {['כמה עולה?', 'איזה מתחם לזוג?', 'יש לפסח?', 'מה הכי גדול?'].map(q => (
              <button key={q} onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 50) }}
                style={{ fontSize: '.68rem', letterSpacing: '.04em', padding: '.3rem .75rem', borderRadius: 20, background: 'rgba(122,158,95,.12)', border: '1px solid rgba(122,158,95,.25)', color: 'var(--sage)', cursor: 'pointer', transition: 'background .2s' }}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: '.75rem 1rem',
          borderTop: '1px solid rgba(122,158,95,.1)',
          display: 'flex', gap: '.5rem', flexShrink: 0,
          background: 'var(--log)',
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="כתבו שאלה..."
            dir="rtl"
            style={{
              flex: 1, background: 'rgba(242,237,227,.05)', border: '1px solid rgba(242,237,227,.12)',
              color: 'var(--cream)', padding: '.6rem .9rem', borderRadius: '4px',
              fontSize: '.83rem', outline: 'none', fontFamily: "'Heebo', sans-serif",
              transition: 'border-color .2s',
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            aria-label="שלח"
            style={{
              width: 38, height: 38, borderRadius: '4px',
              background: input.trim() && !loading ? 'var(--leaf)' : 'rgba(122,158,95,.2)',
              border: 'none', color: 'var(--cream)', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .2s', flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'scaleX(-1)' }}>
              <path d="M14 8H2M7 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

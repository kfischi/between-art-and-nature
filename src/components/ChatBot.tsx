'use client'
import { useState, useRef, useEffect } from 'react'

type Msg = {
  role: 'user' | 'assistant'
  content: string
  options?: string[]
  whatsappSummary?: string | null
}

const WELCOME: Msg = {
  role: 'assistant',
  content: 'שלום! אני נועה 🌿 מדריכת הגליל של "בין אומנות לטבע". מה מביא אתכם לגליל?',
  options: ['אני רוצה להזמין מתחם', 'ספרי לי על הגליל', 'מה לעשות עם ילדים?', 'מזג אוויר עכשיו'],
}

const WA_NUMBER = '972523983394'

export default function ChatBot() {
  const [open, setOpen]     = useState(false)
  const [msgs, setMsgs]     = useState<Msg[]>([WELCOME])
  const [input, setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [pulse, setPulse]   = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  // history for API — only role+content
  const history = msgs.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }))

  useEffect(() => { if (open) setPulse(false) }, [open])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 350) }, [open])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    const userMsg: Msg = { role: 'user', content: msg }
    setMsgs(m => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      })
      const data = await res.json()
      setMsgs(m => [...m, {
        role: 'assistant',
        content: data.text ?? 'מצטערים, נסו שוב.',
        options: data.options ?? [],
        whatsappSummary: data.whatsappSummary ?? null,
      }])
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'תקלה זמנית. נסו שוב.', options: ['נסו שוב'] }])
    } finally {
      setLoading(false)
    }
  }

  function openWhatsApp(summary: string) {
    const text = encodeURIComponent(`שלום! אני מעוניין/ת לבצע הזמנה:\n${summary}`)
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank')
  }

  return (
    <>
      {/* ── FAB ── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'סגור צ׳אט' : 'פתח צ׳אט עם נועה'}
        style={{
          position: 'fixed', bottom: '1.8rem', left: '1.8rem', zIndex: 2000,
          width: 58, height: 58, borderRadius: '50%',
          background: open ? 'var(--soil)' : 'var(--leaf)',
          border: open ? '1px solid rgba(122,158,95,.4)' : 'none',
          color: 'var(--cream)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(0,0,0,.45)',
          transition: 'background .3s, transform .2s',
          transform: open ? 'scale(.92)' : 'scale(1)',
        }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {pulse && !open && (
          <span style={{
            position: 'absolute', inset: -5, borderRadius: '50%',
            border: '2px solid var(--sage)', animation: 'chatPulse 2s ease infinite',
            pointerEvents: 'none',
          }} />
        )}
      </button>

      {/* ── Chat window ── */}
      <div
        role="dialog"
        aria-label="צ׳אט עם נועה — מדריכת הגליל"
        style={{
          position: 'fixed',
          bottom: '5.6rem', left: '1.2rem',
          zIndex: 1999,
          width: 'min(380px, calc(100vw - 2.4rem))',
          maxHeight: 'min(560px, calc(100svh - 9rem))',
          background: 'var(--bark)',
          border: '1px solid rgba(122,158,95,.18)',
          borderRadius: '4px',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 16px 64px rgba(0,0,0,.6)',
          transform: open ? 'translateY(0) scale(1)' : 'translateY(24px) scale(.95)',
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
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--forest), var(--leaf))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.15rem', flexShrink: 0,
          }}>🌿</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '.84rem', fontWeight: 500, color: 'var(--cream)' }}>נועה</div>
            <div style={{ fontSize: '.64rem', color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: '.35rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              מדריכת גליל ומנהלת הזמנות
            </div>
          </div>
          <button onClick={() => setOpen(false)} aria-label="סגור"
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 4 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '.8rem',
          scrollbarWidth: 'none',
        }}>
          <style>{`
            @keyframes chatPulse { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.3);opacity:0} }
            @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
          `}</style>

          {msgs.map((m, i) => (
            <div key={i} style={{ animation: 'msgIn .28s ease' }}>
              {/* Bubble */}
              <div style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-start' : 'flex-end',
              }}>
                <div style={{
                  maxWidth: '86%',
                  padding: '.7rem 1rem',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? 'rgba(122,158,95,.2)' : 'var(--log)',
                  border: m.role === 'user' ? '1px solid rgba(122,158,95,.3)' : '1px solid rgba(242,237,227,.07)',
                  fontSize: '.82rem', lineHeight: 1.65,
                  color: m.role === 'user' ? 'var(--cream)' : 'rgba(242,237,227,.88)',
                  direction: 'rtl', textAlign: 'right',
                  whiteSpace: 'pre-wrap',
                }}>
                  {m.content}
                </div>
              </div>

              {/* WhatsApp summary button */}
              {m.whatsappSummary && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '.5rem' }}>
                  <button
                    onClick={() => openWhatsApp(m.whatsappSummary!)}
                    style={{
                      background: '#25D366', color: '#fff',
                      border: 'none', borderRadius: '8px',
                      padding: '.65rem 1.2rem', fontSize: '.78rem', letterSpacing: '.04em',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem',
                      fontFamily: "'Heebo', sans-serif",
                    }}>
                    💬 שליחה לוואטסאפ
                  </button>
                </div>
              )}

              {/* Options chips */}
              {m.options && m.options.length > 0 && (
                <div style={{
                  display: 'flex', gap: '.4rem', flexWrap: 'wrap',
                  marginTop: '.5rem',
                  justifyContent: 'flex-end',
                }}>
                  {m.options.map((opt, j) => (
                    <button key={j}
                      onClick={() => send(opt)}
                      disabled={loading}
                      style={{
                        fontSize: '.68rem', letterSpacing: '.03em',
                        padding: '.32rem .8rem', borderRadius: 20,
                        background: 'rgba(122,158,95,.12)',
                        border: '1px solid rgba(122,158,95,.3)',
                        color: 'var(--sage)', cursor: 'pointer',
                        transition: 'background .2s',
                        fontFamily: "'Heebo', sans-serif",
                        direction: 'rtl',
                        opacity: loading ? .5 : 1,
                      }}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{
                padding: '.65rem 1rem', borderRadius: '14px 14px 14px 4px',
                background: 'var(--log)', border: '1px solid rgba(242,237,227,.07)',
                display: 'flex', gap: 5, alignItems: 'center',
              }}>
                {[0, 1, 2].map(i => (
                  <span key={i} style={{
                    width: 6, height: 6, borderRadius: '50%', background: 'var(--sage)',
                    display: 'inline-block',
                    animation: `chatPulse 1.2s ease ${i * .2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

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
            placeholder="כתבו שאלה חופשית..."
            dir="rtl"
            style={{
              flex: 1, background: 'rgba(242,237,227,.05)',
              border: '1px solid rgba(242,237,227,.12)',
              color: 'var(--cream)', padding: '.6rem .9rem',
              borderRadius: '4px', fontSize: '.82rem',
              outline: 'none', fontFamily: "'Heebo', sans-serif",
            }}
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            aria-label="שלח"
            style={{
              width: 40, height: 40, borderRadius: '4px', flexShrink: 0,
              background: input.trim() && !loading ? 'var(--leaf)' : 'rgba(122,158,95,.2)',
              border: 'none', color: 'var(--cream)',
              cursor: input.trim() && !loading ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .2s',
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

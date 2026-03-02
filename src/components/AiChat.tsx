'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'model'; content: string };

const F = "'Frank Ruhl Libre', Georgia, serif";

// SVG Icons — no emoji
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ChatOpenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" />
  </svg>
);

const TypingDots = () => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 2px' }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: 5, height: 5, borderRadius: '50%',
        background: 'rgba(122,158,95,.6)',
        animation: 'chatDot .9s ease infinite',
        animationDelay: `${i * 0.2}s`,
        display: 'inline-block',
      }} />
    ))}
  </div>
);

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<Message[]>([
    {
      role: 'model',
      content: 'שלום! אני נועה, מנהלת ההזמנות של בין אומנות לטבע.\nאשמח לעזור לכם למצוא את המתחם המושלם בגליל — זוגות, משפחות, שבת חתן, ויותר.\nמה אתם מחפשים?'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, loading]);

  useEffect(() => {
    if (isOpen) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;
    const text = message.trim();
    setLoading(true);
    setMessage('');

    const newChat: Message[] = [...chat, { role: 'user', content: text }];
    setChat(newChat);

    // history in Gemini format (excluding opening model message)
    const history = newChat.slice(1).map(c => ({
      role: c.role,
      parts: [{ text: c.content }]
    }));
    // remove last user message from history (it goes as `message`)
    history.pop();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      const reply = data.text || 'מתנצלת, נתקלתי בקושי קטן. אפשר לנסות שוב?';
      setChat(prev => [...prev, { role: 'model', content: reply }]);
      if (!isOpen) setHasNew(true);
    } catch {
      setChat(prev => [...prev, { role: 'model', content: 'בעיית תקשורת זמנית. נסו שוב בעוד רגע.' }]);
    }
    setLoading(false);
  };

  const ACCENT = '#7A9E5F';
  const DARK = '#2C2825';

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 9999, direction: 'rtl' }}>
      <style>{`
        @keyframes chatDot { 0%,100%{opacity:.25;transform:scale(.8)} 50%{opacity:1;transform:scale(1.1)} }
        @keyframes chatIn { from{opacity:0;transform:translateY(12px) scale(.97)} to{opacity:1;transform:none} }
        .chat-msg { animation: chatIn .25s ease; }
        .chat-input::placeholder { color: rgba(44,40,37,.35); }
        .chat-input:focus { outline: none; box-shadow: 0 0 0 1px ${ACCENT}55; }
        .chat-scroll::-webkit-scrollbar { width: 3px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(122,158,95,.2); border-radius: 10px; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              marginBottom: '1rem',
              width: 'min(380px, calc(100vw - 3rem))',
              height: 520,
              background: 'rgba(250,248,244,.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(122,158,95,.18)',
              borderRadius: 20,
              boxShadow: '0 24px 60px rgba(28,26,22,.18), 0 4px 16px rgba(28,26,22,.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.2rem',
              background: DARK,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid rgba(122,158,95,.2)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: `rgba(122,158,95,.15)`,
                  border: `1px solid rgba(122,158,95,.3)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: ACCENT,
                }}>
                  <ChatOpenIcon />
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: '1rem', fontWeight: 300, color: '#FAF8F4', lineHeight: 1.2 }}>נועה</div>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.12em', color: ACCENT }}>מנהלת הזמנות · בין אומנות לטבע</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'rgba(250,248,244,.08)',
                  border: '1px solid rgba(250,248,244,.1)',
                  color: 'rgba(250,248,244,.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'background .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(250,248,244,.15)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(250,248,244,.08)')}
                aria-label="סגור"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div
              className="chat-scroll"
              style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}
            >
              {chat.map((c, i) => (
                <div
                  key={i}
                  className="chat-msg"
                  style={{
                    display: 'flex',
                    justifyContent: c.role === 'user' ? 'flex-start' : 'flex-end',
                  }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '.7rem 1rem',
                    borderRadius: c.role === 'user'
                      ? '16px 16px 16px 4px'
                      : '16px 16px 4px 16px',
                    background: c.role === 'user'
                      ? 'rgba(44,40,37,.07)'
                      : DARK,
                    color: c.role === 'user' ? DARK : '#FAF8F4',
                    fontSize: '.85rem',
                    lineHeight: 1.65,
                    whiteSpace: 'pre-line',
                    boxShadow: c.role === 'model' ? '0 2px 8px rgba(28,26,22,.12)' : 'none',
                    borderLeft: c.role === 'model' ? `2px solid ${ACCENT}` : 'none',
                  }}>
                    {c.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    padding: '.6rem 1rem',
                    borderRadius: '16px 16px 4px 16px',
                    background: DARK,
                    borderLeft: `2px solid ${ACCENT}`,
                  }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            {chat.length === 1 && (
              <div style={{ padding: '0 1rem .5rem', display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                {['שבת חתן', 'נופש זוגי', 'משפחה גדולה', 'מה הכי זול?'].map(s => (
                  <button
                    key={s}
                    onClick={() => { setMessage(s); setTimeout(() => sendMessage(), 50); }}
                    style={{
                      fontSize: '.65rem', letterSpacing: '.06em',
                      padding: '.3rem .75rem',
                      background: 'transparent',
                      border: `1px solid rgba(122,158,95,.3)`,
                      color: ACCENT,
                      borderRadius: 20,
                      cursor: 'pointer',
                      transition: 'background .2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(122,158,95,.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{
              padding: '.85rem 1rem',
              borderTop: '1px solid rgba(44,40,37,.08)',
              background: 'rgba(250,248,244,.8)',
              display: 'flex',
              gap: '.5rem',
              alignItems: 'center',
            }}>
              <input
                ref={inputRef}
                className="chat-input"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="כתבו שאלה..."
                style={{
                  flex: 1,
                  background: 'rgba(44,40,37,.05)',
                  border: '1px solid rgba(44,40,37,.1)',
                  borderRadius: 24,
                  padding: '.6rem 1rem',
                  fontSize: '.85rem',
                  color: DARK,
                  textAlign: 'right',
                  direction: 'rtl',
                  transition: 'box-shadow .2s',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !message.trim()}
                style={{
                  width: 38, height: 38,
                  borderRadius: '50%',
                  background: message.trim() && !loading ? DARK : 'rgba(44,40,37,.15)',
                  color: '#FAF8F4',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: message.trim() && !loading ? 'pointer' : 'default',
                  transition: 'background .2s, transform .15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { if (message.trim() && !loading) e.currentTarget.style.transform = 'scale(1.08)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                aria-label="שלח"
              >
                <SendIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          width: 56, height: 56,
          borderRadius: '50%',
          background: DARK,
          border: `1px solid rgba(122,158,95,.3)`,
          color: '#FAF8F4',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(28,26,22,.25)',
          position: 'relative',
        }}
        aria-label="פתח צ'אט"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .15 }}>
              <CloseIcon />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: .15 }}>
              <ChatOpenIcon />
            </motion.span>
          )}
        </AnimatePresence>

        {/* notification dot */}
        {hasNew && (
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 10, height: 10, borderRadius: '50%',
            background: ACCENT,
            border: '2px solid ' + DARK,
          }} />
        )}
      </motion.button>
    </div>
  );
}

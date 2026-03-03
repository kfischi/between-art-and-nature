'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'model'; content: string };
const F = "'Frank Ruhl Libre', Georgia, serif";
const ACCENT = '#7A9E5F';
const DARK = '#2C2825';
const CREAM = '#FAF8F4';

const SendIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const ChatBubbleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15c0 1.1-.9 2-2 2H7l-4 4V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v10z"/>
    <path d="M8 10h8M8 13h5" opacity=".4"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const OPTION_ICONS: Record<string, string> = {
  'להזמין': '🏡', 'הזמינו': '🏡', 'מתחם': '🏡',
  'טיול': '🥾', 'מסלול': '🥾',
  'מסעדות': '🍽️', 'אוכל': '🍽️',
  'ילדים': '👶', 'קפה': '☕', 'עגלות': '☕',
  'מזג': '🌤️', 'אוויר': '🌤️',
  'אטרקציות': '✨', 'וואטסאפ': '💬', 'שלחו': '💬',
  'שבת חתן': '💍', 'זוגי': '💑',
  'משפח': '👨‍👩‍👧', 'גיבוש': '🤝', 'אירוע': '🎉',
  'קל': '🟢', 'בינוני': '🟡', 'מאתגר': '🔴',
  'היסטוריה': '🏛️', 'יין': '🍷',
};
function getOptionIcon(opt: string): string {
  for (const [key, icon] of Object.entries(OPTION_ICONS)) {
    if (opt.includes(key)) return icon + ' ';
  }
  return '';
}

const TypingDots = () => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
    {[0,1,2].map(i => (
      <span key={i} style={{
        width: 5, height: 5, borderRadius: '50%', background: 'rgba(122,158,95,.7)',
        animation: 'chatDot .9s ease infinite', animationDelay: `${i * 0.2}s`, display: 'inline-block',
      }}/>
    ))}
  </div>
);

const PulsingFAB = ({ isOpen, hasNew }: { isOpen: boolean; hasNew: boolean }) => (
  <div style={{ position: 'relative', width: 58, height: 58 }}>
    {!isOpen && (
      <>
        <span style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '1.5px solid rgba(122,158,95,.45)', animation: 'chatPulse 2.4s ease-out infinite', pointerEvents: 'none' }}/>
        <span style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px solid rgba(122,158,95,.2)', animation: 'chatPulse 2.4s ease-out infinite', animationDelay: '.5s', pointerEvents: 'none' }}/>
      </>
    )}
    <div style={{
      width: 58, height: 58, borderRadius: '50%', background: DARK,
      border: '1px solid rgba(122,158,95,.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: CREAM, boxShadow: '0 8px 28px rgba(28,26,22,.3)', position: 'relative', zIndex: 1,
    }}>
      <AnimatePresence mode="wait">
        {isOpen
          ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:.15}}><CloseIcon/></motion.span>
          : <motion.span key="c" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:.15}}><ChatBubbleIcon/></motion.span>
        }
      </AnimatePresence>
    </div>
    {hasNew && !isOpen && (
      <motion.span initial={{scale:0}} animate={{scale:1}} style={{
        position: 'absolute', top: 2, right: 2, zIndex: 2,
        width: 12, height: 12, borderRadius: '50%',
        background: ACCENT, border: `2px solid ${DARK}`,
      }}/>
    )}
  </div>
);

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<Message[]>([{
    role: 'model',
    content: 'שלום! אני נועה 🌿\nמדריכת הגליל ומנהלת ההזמנות של בין אומנות לטבע.\n\nמה מביא אתכם לצפון?'
  }]);
  const [options, setOptions] = useState<string[]>(['אני רוצה להזמין מתחם', 'ספרי לי על הגליל', 'מה לעשות עם ילדים?', 'מזג אוויר עכשיו']);
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(true);
  const [whatsappSummary, setWhatsappSummary] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat, loading, options]);
  useEffect(() => { if (isOpen) { setHasNew(false); setTimeout(() => inputRef.current?.focus(), 300); } }, [isOpen]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setLoading(true); setOptions([]); setWhatsappSummary(null);
    const userMsg: Message = { role: 'user', content: text };
    const newChat = [...chat, userMsg];
    setChat(newChat); setMessage('');
    const history = newChat.slice(1, -1).map(c => ({ role: c.role, parts: [{ text: c.content }] }));
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text, history }) });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'model', content: data.text || 'מתנצלת, נסו שוב.' }]);
      setOptions(data.options || []);
      if (data.whatsappSummary) setWhatsappSummary(data.whatsappSummary);
      if (!isOpen) setHasNew(true);
    } catch {
      setChat(prev => [...prev, { role: 'model', content: 'בעיית תקשורת. נסו שוב.' }]);
      setOptions(['נסו שוב', 'פנו ב-WhatsApp']);
    }
    setLoading(false);
  };

  const openWhatsApp = () => {
    if (!whatsappSummary) return;
    window.open(`https://wa.me/972523983394?text=${encodeURIComponent(`שלום נועה, אני מעוניין/ת בהזמנה:\n${whatsappSummary}`)}`, '_blank');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',   /* RIGHT — visible on iOS/Android regardless of RTL overflow */
      zIndex: 9999,
      direction: 'rtl',
    }}>
      <style>{`
        @keyframes chatDot{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
        @keyframes chatPulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.8);opacity:0}}
        .cmsg{animation:chatIn .22s ease}
        @keyframes chatIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .ci:focus{outline:none!important;border-color:rgba(122,158,95,.5)!important;box-shadow:0 0 0 3px rgba(122,158,95,.1)!important}
        .cs::-webkit-scrollbar{width:3px}
        .cs::-webkit-scrollbar-thumb{background:rgba(122,158,95,.2);border-radius:10px}
        .copt:hover{background:rgba(122,158,95,.12)!important;border-color:rgba(122,158,95,.55)!important}
        .cwa:hover{background:#1da851!important}
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
            style={{
              marginBottom: '1rem',
              width: 'min(400px, calc(100vw - 3rem))',
              maxHeight: 'min(580px, calc(100svh - 9rem))',
              background: 'rgba(250,248,244,.98)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(122,158,95,.18)',
              borderRadius: 24,
              boxShadow: '0 32px 72px rgba(28,26,22,.2), 0 4px 16px rgba(28,26,22,.08)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{ padding: '1rem 1.2rem', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(122,158,95,.15)', border: '1px solid rgba(122,158,95,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT }}>
                    <ChatBubbleIcon/>
                  </div>
                  <span style={{ position: 'absolute', bottom: 1, right: 1, width: 9, height: 9, borderRadius: '50%', background: '#4ade80', border: `1.5px solid ${DARK}` }}/>
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: '1rem', fontWeight: 300, color: CREAM, lineHeight: 1.2 }}>נועה</div>
                  <div style={{ fontSize: '.58rem', letterSpacing: '.1em', color: ACCENT }}>מדריכת גליל · מנהלת הזמנות</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(250,248,244,.08)', border: '1px solid rgba(250,248,244,.1)', color: 'rgba(250,248,244,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <CloseIcon/>
              </button>
            </div>

            {/* Messages */}
            <div className="cs" style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.6rem', minHeight: 0 }}>
              {chat.map((c, i) => (
                <div key={i} className="cmsg" style={{ display: 'flex', justifyContent: c.role === 'user' ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '86%', padding: '.65rem .95rem',
                    borderRadius: c.role === 'user' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                    background: c.role === 'user' ? 'rgba(44,40,37,.07)' : DARK,
                    color: c.role === 'user' ? DARK : CREAM,
                    fontSize: '.84rem', lineHeight: 1.7, whiteSpace: 'pre-line',
                    borderLeft: c.role === 'model' ? `2px solid ${ACCENT}` : 'none',
                  }}>
                    {c.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ padding: '.55rem .95rem', borderRadius: '16px 16px 4px 16px', background: DARK, borderLeft: `2px solid ${ACCENT}` }}>
                    <TypingDots/>
                  </div>
                </div>
              )}

              {whatsappSummary && !loading && (
                <div className="cmsg" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="cwa" onClick={openWhatsApp} style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: 20, padding: '.5rem 1.1rem', fontSize: '.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.4rem', fontFamily: 'inherit', transition: 'background .18s' }}>
                    <WhatsAppIcon/> שלחו לוואטסאפ עכשיו
                  </button>
                </div>
              )}

              {!loading && options.length > 0 && (
                <div className="cmsg" style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', justifyContent: 'flex-end', marginTop: '.3rem', paddingLeft: '1rem' }}>
                  {options.map((opt, i) => {
                    const isWA = opt.includes('וואטסאפ') || opt.includes('WhatsApp') || opt.includes('שלחו');
                    return (
                      <button key={i} className={isWA ? 'cwa' : 'copt'}
                        onClick={() => isWA ? openWhatsApp() : send(opt)}
                        style={{ fontSize: '.76rem', letterSpacing: '.03em', padding: '.4rem .9rem', background: isWA ? '#25D366' : 'transparent', border: isWA ? 'none' : '1px solid rgba(122,158,95,.3)', color: isWA ? '#fff' : ACCENT, borderRadius: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '.3rem', transition: 'all .18s', fontFamily: 'inherit' }}>
                        {isWA && <WhatsAppIcon/>}{getOptionIcon(opt)}{opt}
                      </button>
                    );
                  })}
                </div>
              )}
              <div ref={bottomRef}/>
            </div>

            {/* Input */}
            <div style={{ padding: '.8rem 1rem', flexShrink: 0, borderTop: '1px solid rgba(44,40,37,.07)', background: 'rgba(250,248,244,.95)', display: 'flex', gap: '.5rem', alignItems: 'center' }}>
              <input ref={inputRef} className="ci" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(message)} placeholder="או כתבו בחופשיות..." style={{ flex: 1, background: 'rgba(44,40,37,.05)', border: '1px solid rgba(44,40,37,.1)', borderRadius: 24, padding: '.6rem 1rem', fontSize: '.84rem', color: DARK, textAlign: 'right', direction: 'rtl', transition: 'border-color .2s, box-shadow .2s', fontFamily: 'inherit' }}/>
              <button onClick={() => send(message)} disabled={loading || !message.trim()} style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: message.trim() && !loading ? DARK : 'rgba(44,40,37,.12)', color: CREAM, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: message.trim() && !loading ? 'pointer' : 'default', transition: 'background .2s' }}>
                <SendIcon/>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.45rem' }}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div initial={{ opacity: 0, y: 4, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: .95 }}
              style={{ background: DARK, color: CREAM, fontSize: '.63rem', letterSpacing: '.1em', padding: '.28rem .8rem', borderRadius: 20, border: '1px solid rgba(122,158,95,.28)', whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: '0 4px 12px rgba(28,26,22,.15)' }}>
              שאלו אותי
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button onClick={() => setIsOpen(o => !o)} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.92 }} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="פתח צ'אט">
          <PulsingFAB isOpen={isOpen} hasNew={hasNew}/>
        </motion.button>
      </div>
    </div>
  );
}

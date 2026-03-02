'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  // הוספת הודעת פתיחה אוטומטית
  const [chat, setChat] = useState<{role: string, content: string}[]>([
    { role: 'model', content: 'שלום! אני המארח הדיגיטלי של "בין אומנות לטבע". אשמח לעזור לכם למצוא את המתחם המושלם לחופשה שלכם בגליל. איזה סוג של נופש אתם מחפשים?' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          history: chat.map(c => ({ 
            role: c.role === 'user' ? 'user' : 'model', 
            parts: [{ text: c.content }] 
          })) 
        }),
      });
      const data = await res.json();
      if (data.text) {
        setChat([...newChat, { role: 'model', content: data.text }]);
      } else {
        setChat([...newChat, { role: 'model', content: 'מתנצל, נתקלתי בקושי קטן בחיבור. אפשר לנסות שוב?' }]);
      }
    } catch (e) {
      setChat([...newChat, { role: 'model', content: 'נראה שיש בעיית תקשורת. כדאי לוודא שמפתח ה-API מוגדר כראוי.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-[#4a3f35] text-white flex justify-between items-center shadow-md">
              <span className="font-medium">המארח הדיגיטלי</span>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform px-2">✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-right flex flex-col" dir="rtl">
              {chat.map((c, i) => (
                <div key={i} className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  c.role === 'user' 
                  ? 'bg-stone-200 text-stone-800 self-start rounded-tr-none' 
                  : 'bg-[#4a3f35] text-stone-50 self-end rounded-tl-none shadow-sm'
                }`}>
                  {c.content}
                </div>
              ))}
              {loading && (
                <div className="text-stone-400 text-xs italic animate-pulse mr-2">חושב על המלצה עבורכם...</div>
              )}
            </div>

            <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex gap-2">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="איך אוכל לעזור?"
                className="flex-1 bg-white border border-stone-200 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#4a3f35] outline-none text-right text-stone-800"
              />
              <button 
                onClick={sendMessage} 
                className="bg-[#4a3f35] hover:bg-[#3d342c] text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-sm"
              >
                ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#4a3f35] hover:bg-[#3d342c] text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <span className="text-2xl">{isOpen ? '💬' : '✨'}</span>
      </button>
    </div>
  );
}

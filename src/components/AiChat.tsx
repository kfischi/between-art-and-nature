'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{role: string, content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history: chat.map(c => ({ role: c.role === 'user' ? 'user' : 'model', parts: [{ text: c.content }] })) }),
    });
    const data = await res.json();
    setChat([...newChat, { role: 'model', content: data.text }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-stone-800 text-white flex justify-between items-center">
              <span className="font-medium">המארח הדיגיטלי</span>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-right" dir="rtl">
              {chat.map((c, i) => (
                <div key={i} className={`p-3 rounded-2xl max-w-[85%] ${c.role === 'user' ? 'bg-stone-200 mr-auto' : 'bg-stone-800 text-white ml-auto'}`}>
                  {c.content}
                </div>
              ))}
              {loading && <div className="text-stone-400 text-sm italic">חושב על המלצה עבורך...</div>}
            </div>

            <div className="p-4 border-t border-white/20 flex gap-2">
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="איך אוכל לעזור?"
                className="flex-1 bg-white/50 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-stone-500 outline-none text-right"
              />
              <button onClick={sendMessage} className="bg-stone-800 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">↑</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-stone-800 hover:bg-stone-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-110"
      >
        <span className="text-2xl">✨</span>
      </button>
    </div>
  );
}

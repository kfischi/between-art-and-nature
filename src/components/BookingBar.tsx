'use client'
import { useState } from 'react'
import { locations } from '@/lib/locations'

export default function BookingBar() {
  const [loc, setLoc] = useState('')

  const handleSubmit = () => {
    const name = loc || 'כל המתחמים'
    window.open(`https://wa.me/972523983394?text=שלום! מעוניין לבדוק זמינות ב${name}`, '_blank')
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr auto',
      background: 'var(--log)',
      border: '1px solid rgba(122,158,95,.15)',
      direction: 'rtl',
    }}>
      <Field label="בחרו מתחם">
        <select
          value={loc}
          onChange={e => setLoc(e.target.value)}
          style={{ background: 'none', border: 'none', fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1rem', fontWeight: 300, color: 'var(--cream)', outline: 'none', width: '100%', direction: 'rtl', cursor: 'pointer' }}
        >
          <option value="">כל המתחמים</option>
          {locations.map(l => (
            <option key={l.slug} value={l.name} style={{ background: 'var(--bark)' }}>{l.name}</option>
          ))}
        </select>
      </Field>

      <Field label="תאריך הגעה">
        <input type="date" style={{ background: 'none', border: 'none', fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1rem', fontWeight: 300, color: 'var(--cream)', outline: 'none', width: '100%', colorScheme: 'dark' }} />
      </Field>

      <Field label="תאריך עזיבה">
        <input type="date" style={{ background: 'none', border: 'none', fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1rem', fontWeight: 300, color: 'var(--cream)', outline: 'none', width: '100%', colorScheme: 'dark' }} />
      </Field>

      <button
        onClick={handleSubmit}
        style={{
          background: 'var(--leaf)', color: 'var(--cream)',
          fontSize: '.72rem', letterSpacing: '.1em',
          padding: '0 2.2rem', border: 'none', cursor: 'pointer',
          transition: 'background .3s', whiteSpace: 'nowrap',
          fontFamily: "'Heebo', sans-serif",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--forest)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--leaf)')}
      >
        בדיקת זמינות →
      </button>

      <style>{`
        @media (max-width: 900px) {
          div[style*="repeat(4"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="repeat(4"] button { grid-column: span 2; padding: 1.2rem !important; }
        }
        @media (max-width: 600px) {
          div[style*="repeat(4"] { grid-template-columns: 1fr !important; }
          div[style*="repeat(4"] button { grid-column: 1 !important; }
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      padding: '1.3rem 2rem',
      borderLeft: '1px solid rgba(122,158,95,.1)',
      display: 'flex', flexDirection: 'column', gap: '.25rem',
    }}>
      <div style={{ fontSize: '.58rem', letterSpacing: '.22em', color: 'var(--sage)', fontWeight: 400 }}>
        {label}
      </div>
      {children}
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=75&auto=format&fit=crop', label: 'גליל עליון' },
  { src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1600&q=75&auto=format&fit=crop', label: 'נוף הגליל' },
  { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=75&auto=format&fit=crop', label: 'יערות הגליל' },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=75&auto=format&fit=crop', label: 'גליל מרכזי' },
]

export default function HeroSlider() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{
      height: '100svh', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    }}>
      {/* Color stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, zIndex: 3,
        background: 'linear-gradient(to bottom, var(--leaf) 0%, var(--sky) 50%, var(--terra) 100%)',
      }} />

      {/* Slides */}
      {slides.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${s.src})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(.52) saturate(1.2)',
          opacity: i === cur ? 1 : 0,
          transition: 'opacity 1.6s ease',
        }} />
      ))}

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(28,26,22,1) 0%, rgba(28,26,22,.45) 35%, rgba(28,26,22,.05) 70%)',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '0 4rem 5rem',
        display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '3rem',
      }}>
        <div style={{ maxWidth: 780 }}>
          <div style={{
            fontSize: '.68rem', letterSpacing: '.28em', color: 'var(--fern)',
            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '.8rem',
          }}>
            גליל · נופש בטבע · אומנות המקום
            <span style={{ width: 32, height: 1, background: 'var(--fern)' }} />
          </div>

          <h1 style={{
            fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontWeight: 300,
            fontSize: 'clamp(3.8rem, 8.5vw, 9rem)', lineHeight: .92,
            marginBottom: '1.8rem',
          }}>
            <span style={{ color: 'var(--fern)', display: 'block' }}>ירוק.</span>
            <span style={{ color: 'var(--sky-lt)', display: 'block' }}>כחול.</span>
            <span style={{ color: 'var(--terra-lt)', display: 'block' }}>חום.</span>
          </h1>

          <p style={{
            fontSize: '.97rem', lineHeight: 1.9, color: 'var(--muted)',
            maxWidth: '50ch', marginBottom: '2.5rem',
          }}>
            מתחמי נופש ייחודיים בגלב הגליל המערבי — כל אחד עם אופי משלו, כולם עם אותה אהבה למקום ולטבע.
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="#locations" style={{
              fontSize: '.75rem', letterSpacing: '.1em',
              background: 'var(--leaf)', color: 'var(--cream)',
              padding: '1rem 2.4rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            }}>
              לכל המתחמים
            </Link>
            <Link href="#exp" style={{
              fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)',
              borderBottom: '1px solid rgba(242,237,227,.25)', paddingBottom: 1,
            }}>
              גלו את החוויה
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => setCur(i)} style={{
              width: 2, height: i === cur ? 44 : 20,
              background: i === cur ? 'var(--sage)' : 'rgba(242,237,227,.2)',
              border: 'none', padding: 0, cursor: 'pointer',
              transition: 'height .4s, background .3s',
            }} aria-label={s.label} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(122,158,95,.2)',
        background: 'rgba(28,26,22,.75)', backdropFilter: 'blur(12px)',
        position: 'relative', zIndex: 2,
      }}>
        {[
          { icon: '🌿', val: '4', lbl: 'מתחמים' },
          { icon: '🏡', val: '18', lbl: 'יחידות לינה' },
          { icon: '⭐', val: '4.9', lbl: 'דירוג ממוצע' },
          { icon: '📍', val: 'גליל', lbl: 'מערבי' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '1.6rem 2rem',
            borderLeft: i > 0 ? '1px solid rgba(122,158,95,.15)' : 'none',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
            <div>
              <div style={{
                fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '2rem', fontWeight: 300,
                color: 'var(--cream)', lineHeight: 1,
              }}>{s.val}</div>
              <div style={{ fontSize: '.68rem', letterSpacing: '.08em', color: 'var(--muted)' }}>{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="grid-template-columns: 1fr auto"] {
            grid-template-columns: 1fr !important;
            padding: 0 2rem 4rem !important;
          }
          section > div[style*="repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          h1 { font-size: 3rem !important; }
        }
      `}</style>
    </section>
  )
}

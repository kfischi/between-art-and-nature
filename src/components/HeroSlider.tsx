'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { locations } from '@/lib/locations'

const F = "'Frank Ruhl Libre', Georgia, serif"

const SLIDES = locations.map(loc => ({
  slug:      loc.slug,
  name:      loc.name,
  nameParts: loc.nameParts,
  tagline:   loc.tagline,
  image:     loc.imageFeatured || loc.image,
  color:     loc.color,
  colorRgb:  loc.colorRgb,
  num:       loc.num,
  priceFrom: loc.priceFrom,
  waText:    loc.waText,
}))

export default function HeroSlider() {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchX = useRef(0)

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === cur) return
    setPrev(cur)
    setCur(idx)
    setTransitioning(true)
    setTimeout(() => { setPrev(null); setTransitioning(false) }, 1000)
  }, [cur, transitioning])

  const nextSlide = useCallback(() => goTo((cur + 1) % SLIDES.length), [cur, goTo])
  const prevSlide = useCallback(() => goTo((cur - 1 + SLIDES.length) % SLIDES.length), [cur, goTo])

  useEffect(() => {
    timerRef.current = setTimeout(nextSlide, 6000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [cur, nextSlide])

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 50) dx > 0 ? prevSlide() : nextSlide()
  }

  const slide = SLIDES[cur]

  return (
    <div
      style={{ position: 'relative', height: '100svh', overflow: 'hidden', background: 'var(--soil)' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background images — crossfade */}
      {SLIDES.map((s, i) => {
        const isActive = i === cur
        const isPrev   = i === prev
        if (!isActive && !isPrev) return null
        return (
          <div key={s.slug} style={{
            position: 'absolute', inset: 0,
            opacity: isActive ? 1 : 0,
            transition: isActive ? 'opacity 1s ease' : 'opacity .6s ease .4s',
            zIndex: isActive ? 1 : 0,
          }}>
            <Image
              src={s.image}
              alt={s.name}
              fill
              priority={i === 0}
              style={{ objectFit: 'cover', filter: 'brightness(.62) saturate(1.1)' }}
              sizes="100vw"
            />
          </div>
        )
      })}

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: `
          linear-gradient(to top, rgba(28,26,22,1) 0%, rgba(28,26,22,.1) 50%, transparent 75%),
          linear-gradient(to right, rgba(28,26,22,.65) 0%, transparent 65%)
        `,
      }} />

      {/* Top color accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 4,
        background: `linear-gradient(to left, transparent, rgba(${slide.colorRgb},.9), transparent)`,
        transition: 'background .8s',
      }} />

      {/* Desktop side nav dots */}
      <div className="hero-side-dots" style={{
        position: 'absolute', top: '50%', left: '2.5rem', transform: 'translateY(-50%)',
        zIndex: 4, flexDirection: 'column', gap: '1.2rem',
      }}>
        {SLIDES.map((s, i) => (
          <button key={s.slug} onClick={() => goTo(i)} aria-label={`מתחם ${s.name}`}
            style={{
              width: i === cur ? 3 : 2,
              height: i === cur ? 32 : 18,
              background: i === cur ? s.color : 'rgba(242,237,227,.25)',
              border: 'none', borderRadius: 2, cursor: 'pointer',
              transition: 'all .5s cubic-bezier(.16,1,.3,1)', padding: 0,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 4,
        padding: 'clamp(2rem,5vw,5rem) clamp(1.5rem,6vw,5rem)',
        paddingBottom: 'clamp(6rem,12vw,9rem)',
      }}>
        {/* Giant number watermark */}
        <div style={{
          fontFamily: F, fontSize: 'clamp(5rem,20vw,14rem)', fontWeight: 300,
          color: `rgba(${slide.colorRgb},.07)`,
          lineHeight: 1, position: 'absolute', bottom: '4.5rem', left: '.5rem',
          transition: 'color .6s', userSelect: 'none', pointerEvents: 'none',
        }}>
          {slide.num}
        </div>

        {/* Eyebrow */}
        <div style={{
          fontSize: '.6rem', letterSpacing: '.28em', color: slide.color,
          display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem',
          transition: 'color .5s',
        }}>
          <span style={{ width: 18, height: 1, background: slide.color, display: 'inline-block' }} />
          מתחם {slide.num} מתוך {SLIDES.length}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: F,
          fontSize: 'clamp(2.6rem, 8vw, 8rem)',
          fontWeight: 300, lineHeight: .95,
          marginBottom: 'clamp(.8rem,2vw,1.4rem)',
        }}>
          {slide.nameParts.regular}{' '}
          <em style={{ fontStyle: 'italic', color: slide.color, transition: 'color .5s' }}>
            {slide.nameParts.colored}
          </em>
        </h1>

        {/* Tagline */}
        <p style={{
          fontSize: 'clamp(.83rem,2.2vw,1rem)',
          color: 'rgba(242,237,227,.6)',
          lineHeight: 1.6, maxWidth: '44ch',
          marginBottom: 'clamp(1.4rem,3vw,2.2rem)',
        }}>
          {slide.tagline}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href={`/${slide.slug}`} style={{
            fontFamily: "'Heebo', sans-serif", fontSize: '.72rem', letterSpacing: '.1em',
            background: slide.color, color: 'var(--cream)',
            padding: 'clamp(.8rem,2vw,1rem) clamp(1.2rem,2.5vw,1.8rem)',
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            transition: 'opacity .3s', textDecoration: 'none', minHeight: 48,
          }}>
            לדף המתחם ←
          </Link>
          <a href={`https://wa.me/972523983394?text=${encodeURIComponent(slide.waText)}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Heebo', sans-serif", fontSize: '.72rem', letterSpacing: '.1em',
              border: `1px solid rgba(${slide.colorRgb},.5)`, color: slide.color,
              padding: 'clamp(.8rem,2vw,1rem) clamp(1rem,2vw,1.4rem)',
              display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              transition: 'border-color .3s', textDecoration: 'none', minHeight: 48,
            }}>
            💬 הזמינו
          </a>

          {/* Price */}
          <div style={{
            marginRight: 'auto', fontSize: '.62rem', letterSpacing: '.06em',
            color: 'rgba(242,237,227,.4)', display: 'flex', flexDirection: 'column', gap: '.15rem',
          }}>
            <span>החל מ-</span>
            <span style={{ fontFamily: F, fontSize: 'clamp(1.1rem,3vw,1.4rem)', fontWeight: 300, color: slide.color, lineHeight: 1 }}>
              ₪{slide.priceFrom.toLocaleString()}
            </span>
            <span>/ לילה</span>
          </div>
        </div>
      </div>

      {/* Desktop thumbnail strip */}
      <div className="hero-thumb-strip" style={{
        position: 'absolute', bottom: '1.2rem', left: 0, right: 0,
        zIndex: 5, justifyContent: 'center', gap: '8px', padding: '0 5rem',
      }}>
        {SLIDES.map((s, i) => (
          <button key={s.slug} onClick={() => goTo(i)} aria-label={s.name}
            style={{
              flex: i === cur ? '0 0 100px' : '0 0 52px',
              height: 44, overflow: 'hidden', position: 'relative',
              border: i === cur ? `1px solid ${s.color}` : '1px solid rgba(242,237,227,.15)',
              cursor: 'pointer', background: 'none', padding: 0, borderRadius: '2px',
              transition: 'flex .5s cubic-bezier(.16,1,.3,1), border-color .4s',
            }}>
            <Image src={s.image} alt={s.name} fill style={{ objectFit: 'cover', filter: i === cur ? 'brightness(.9)' : 'brightness(.45)' }} sizes="100px" />
            {i === cur && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '.54rem', letterSpacing: '.1em', color: 'var(--cream)', background: 'rgba(0,0,0,.2)',
              }}>
                {s.nameParts.colored}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Mobile dot indicators */}
      <div className="hero-mobile-dots" style={{
        position: 'absolute', bottom: '1.4rem', left: 0, right: 0, zIndex: 6,
        justifyContent: 'center', gap: 6,
      }}>
        {SLIDES.map((s, i) => (
          <button key={s.slug} onClick={() => goTo(i)} aria-label={s.name}
            style={{
              width: i === cur ? 24 : 6, height: 6, borderRadius: 3,
              background: i === cur ? s.color : 'rgba(242,237,227,.3)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all .4s cubic-bezier(.16,1,.3,1)',
            }}
          />
        ))}
      </div>

      <style>{`
        .hero-side-dots { display: flex !important; }
        .hero-thumb-strip { display: flex !important; }
        .hero-mobile-dots { display: none !important; }
        @media (max-width: 768px) {
          .hero-side-dots { display: none !important; }
          .hero-thumb-strip { display: none !important; }
          .hero-mobile-dots { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

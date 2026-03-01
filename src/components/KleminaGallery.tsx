'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

const IMAGES = [
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp', label: 'נוף חיצוני' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401401/9_mwbfrq.webp', label: 'גינה' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401399/8_muhjiq.webp', label: 'הכניסה' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401396/7_uv1fqk.webp', label: 'בריכה' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401392/6_bvifvx.webp', label: 'סלון' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401391/5_oc93v5.webp', label: 'חדר שינה' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401389/4_lx73rn.webp', label: 'ג׳קוזי' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401386/3_tgup62.webp', label: 'מטבח' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401385/2_wm9hcm.webp', label: 'חצר' },
  { src: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp', label: 'כניסה ראשית' },
]

export default function KleminaGallery() {
  const [active, setActive] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [bgIndex, setBgIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  // Cycle background slowly
  useEffect(() => {
    const t = setInterval(() => setBgIndex(i => (i + 1) % IMAGES.length), 4000)
    return () => clearInterval(t)
  }, [])

  // Drag scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0)
    scrollStart.current = trackRef.current?.scrollLeft || 0
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    trackRef.current.scrollLeft = scrollStart.current - (x - startX.current) * 1.2
  }
  const onMouseUp = () => { isDragging.current = false }

  // Keyboard navigation for lightbox
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightbox === null) return
    if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? (i + 1) % IMAGES.length : null)
    if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null)
    if (e.key === 'Escape') setLightbox(null)
  }, [lightbox])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--soil)' }}>

        {/* AMBIENT BACKGROUND — blurred current image fills entire section */}
        <div style={{ position: 'absolute', inset: 0, transition: 'opacity .8s ease', zIndex: 0 }}>
          {IMAGES.map((img, i) => (
            <div key={i} style={{
              position: 'absolute', inset: 0,
              opacity: i === (active ?? bgIndex) ? 1 : 0,
              transition: 'opacity 1s ease',
            }}>
              <Image
                src={img.src}
                alt=""
                fill
                style={{ objectFit: 'cover', filter: 'blur(60px) brightness(.25) saturate(1.4)', transform: 'scale(1.1)' }}
                sizes="100vw"
                priority={i === 0}
              />
            </div>
          ))}
          {/* Gradient fade bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(28,26,22,.3) 0%, transparent 30%, transparent 70%, var(--soil) 100%)',
          }} />
        </div>

        {/* HEADER */}
        <div style={{ position: 'relative', zIndex: 2, padding: '4rem 4rem 2rem' }}>
          <div style={{ fontSize: '.6rem', letterSpacing: '.28em', color: '#7A9E5F', marginBottom: '.6rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
            גלריה
            <span style={{ width: 22, height: 1, background: '#7A9E5F', display: 'inline-block' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 1 }}>
              <em style={{ fontStyle: 'italic', color: '#7A9E5F' }}>ראו</em> את המקום
            </h2>
            <div style={{ fontSize: '.72rem', letterSpacing: '.1em', color: 'rgba(242,237,227,.35)' }}>
              {IMAGES.length} תמונות · גררו לגלול
            </div>
          </div>
        </div>

        {/* NETFLIX TRACK */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            position: 'relative', zIndex: 2,
            display: 'flex', gap: '6px',
            overflowX: 'auto', overflowY: 'visible',
            padding: '1rem 4rem 3rem',
            scrollbarWidth: 'none',
            cursor: isDragging.current ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>

          {IMAGES.map((img, i) => {
            const isActive = active === i
            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setLightbox(i)}
                style={{
                  flexShrink: 0,
                  width: isActive ? 480 : 280,
                  height: 340,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'width .5s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'pointer',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  style={{
                    objectFit: 'cover',
                    filter: isActive ? 'brightness(.9) saturate(1.15)' : 'brightness(.65) saturate(.9)',
                    transform: isActive ? 'scale(1.04)' : 'scale(1)',
                    transition: 'filter .5s, transform .6s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  sizes="(max-width: 700px) 80vw, 480px"
                />

                {/* Bottom gradient + label */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(28,26,22,.95) 0%, rgba(28,26,22,.2) 40%, transparent 70%)',
                  opacity: isActive ? 1 : 0.6,
                  transition: 'opacity .4s',
                }} />

                {/* Index number — ghost */}
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  fontFamily: "'Frank Ruhl Libre', Georgia, serif",
                  fontSize: '4rem', fontWeight: 300, lineHeight: 1,
                  color: 'rgba(242,237,227,.07)',
                  transition: 'color .4s',
                  ...(isActive && { color: 'rgba(242,237,227,.12)' }),
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Label */}
                <div style={{
                  position: 'absolute', bottom: 0, inset: 0,
                  padding: '1.4rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                }}>
                  <div style={{
                    fontSize: '.6rem', letterSpacing: '.22em', color: '#7A9E5F',
                    marginBottom: '.3rem',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                    transition: 'opacity .35s, transform .35s',
                  }}>
                    {img.label}
                  </div>
                  <div style={{
                    fontFamily: "'Frank Ruhl Libre', Georgia, serif",
                    fontSize: isActive ? '1.4rem' : '1rem',
                    fontWeight: 300, color: 'var(--cream)',
                    transition: 'font-size .4s',
                  }}>
                    אחוזת קלמנטין
                  </div>

                  {/* Expand hint */}
                  <div style={{
                    marginTop: '.6rem',
                    fontSize: '.62rem', letterSpacing: '.14em',
                    color: 'rgba(242,237,227,.45)',
                    display: 'flex', alignItems: 'center', gap: '.4rem',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(4px)',
                    transition: 'opacity .4s .05s, transform .4s .05s',
                  }}>
                    <span style={{ width: 14, height: 14, border: '1px solid rgba(242,237,227,.3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '.55rem' }}>⤢</span>
                    לחצו להגדלה
                  </div>
                </div>

                {/* Color accent line bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: '#7A9E5F',
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform .5s cubic-bezier(0.16,1,0.3,1)',
                }} />
              </div>
            )
          })}

          {/* Fade edge right */}
          <div style={{
            position: 'sticky', left: 'calc(100% - 120px)',
            width: 120, flexShrink: 0,
            background: 'linear-gradient(to left, var(--soil), transparent)',
            pointerEvents: 'none', zIndex: 3,
          }} />
        </div>

        {/* DOTS INDICATOR */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', gap: '6px', justifyContent: 'center',
          paddingBottom: '3rem',
        }}>
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i)
                const track = trackRef.current
                if (!track) return
                const card = track.children[i] as HTMLElement
                card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
              }}
              style={{
                width: active === i || bgIndex === i ? 20 : 6,
                height: 2,
                background: active === i ? '#7A9E5F' : 'rgba(242,237,227,.2)',
                border: 'none', padding: 0,
                transition: 'width .4s, background .3s',
                cursor: 'pointer',
              }}
              aria-label={`תמונה ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════
          LIGHTBOX
      ═══════════════════════════ */}
      {lightbox !== null && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: 'rgba(8,8,8,.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'lbIn .25s ease',
          }}
          onClick={() => setLightbox(null)}
        >
          <style>{`
            @keyframes lbIn { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }
          `}</style>

          {/* Image */}
          <div
            style={{ position: 'relative', width: '90vw', height: '85vh', maxWidth: 1400 }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              key={lightbox}
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].label}
              fill
              style={{ objectFit: 'contain' }}
              sizes="90vw"
              priority
            />

            {/* Label */}
            <div style={{
              position: 'absolute', bottom: '-2.5rem', left: 0, right: 0,
              textAlign: 'center',
              fontSize: '.72rem', letterSpacing: '.18em', color: 'rgba(242,237,227,.45)',
            }}>
              {IMAGES[lightbox].label} · {lightbox + 1} / {IMAGES.length}
            </div>
          </div>

          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null) }}
            style={{
              position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)',
              width: 48, height: 48,
              border: '1px solid rgba(242,237,227,.15)',
              background: 'rgba(28,26,22,.8)',
              color: 'var(--cream)', fontSize: '1.2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(8px)',
            }}
            aria-label="הקודם"
          >›</button>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % IMAGES.length : null) }}
            style={{
              position: 'fixed', left: '2rem', top: '50%', transform: 'translateY(-50%)',
              width: 48, height: 48,
              border: '1px solid rgba(242,237,227,.15)',
              background: 'rgba(28,26,22,.8)',
              color: 'var(--cream)', fontSize: '1.2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(8px)',
            }}
            aria-label="הבא"
          >‹</button>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', top: '2rem', left: '2rem',
              width: 40, height: 40,
              border: '1px solid rgba(242,237,227,.15)',
              background: 'rgba(28,26,22,.8)',
              color: 'var(--cream)', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', backdropFilter: 'blur(8px)',
            }}
            aria-label="סגור"
          >✕</button>

          {/* Thumbnail strip */}
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            padding: '1rem 2rem',
            background: 'linear-gradient(to top, rgba(8,8,8,.9), transparent)',
            display: 'flex', gap: '4px', justifyContent: 'center',
            overflowX: 'auto',
          }}
            onClick={e => e.stopPropagation()}
          >
            {IMAGES.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                style={{
                  flexShrink: 0,
                  width: 60, height: 40,
                  position: 'relative',
                  cursor: 'pointer',
                  outline: i === lightbox ? '2px solid #7A9E5F' : '2px solid transparent',
                  outlineOffset: 1,
                  opacity: i === lightbox ? 1 : 0.45,
                  transition: 'opacity .3s, outline-color .3s',
                }}
              >
                <Image src={img.src} alt="" fill style={{ objectFit: 'cover' }} sizes="60px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

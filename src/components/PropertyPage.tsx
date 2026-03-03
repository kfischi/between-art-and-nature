'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Location } from '@/lib/locations'
import { Icon } from '@/components/Icons'
import PropertyHero from '@/components/PropertyHero'
import ScrollReveal from '@/components/ScrollReveal'

const F = "'Frank Ruhl Libre', Georgia, serif"

function Eyebrow({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ fontSize: '.6rem', letterSpacing: '.28em', color, marginBottom: '.8rem', display: 'flex', alignItems: 'center', gap: '.7rem', fontWeight: 400 }}>
      {label}
      <span style={{ width: 20, height: 1, background: color, display: 'inline-block' }} />
    </div>
  )
}

function Gallery({ loc }: { loc: Location }) {
  const [active, setActive] = useState<number | null>(null)
  const [lb, setLb] = useState<number | null>(null)
  const [bgIdx, setBgIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef(false)
  const sx = useRef(0); const ss = useRef(0)
  const touchStart = useRef(0)
  const touchScrollStart = useRef(0)

  useEffect(() => {
    const t = setInterval(() => setBgIdx(i => (i + 1) % loc.gallery.length), 4000)
    return () => clearInterval(t)
  }, [loc.gallery.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lb === null) return
      if (e.key === 'ArrowLeft') setLb(i => i !== null ? (i + 1) % loc.gallery.length : null)
      if (e.key === 'ArrowRight') setLb(i => i !== null ? (i - 1 + loc.gallery.length) % loc.gallery.length : null)
      if (e.key === 'Escape') setLb(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lb, loc.gallery.length])

  useEffect(() => { document.body.style.overflow = lb !== null ? 'hidden' : '' }, [lb])

  const onMD = (e: React.MouseEvent) => { drag.current = true; sx.current = e.pageX; ss.current = trackRef.current?.scrollLeft || 0 }
  const onMM = (e: React.MouseEvent) => { if (!drag.current || !trackRef.current) return; e.preventDefault(); trackRef.current.scrollLeft = ss.current - (e.pageX - sx.current) * 1.2 }
  const onMU = () => { drag.current = false }
  const onTS = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; touchScrollStart.current = trackRef.current?.scrollLeft || 0 }
  const onTM = (e: React.TouchEvent) => { if (!trackRef.current) return; trackRef.current.scrollLeft = touchScrollStart.current + (touchStart.current - e.touches[0].clientX) }

  const cur = active ?? bgIdx

  return (
    <>
      <section className="gallery-section">
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {loc.gallery.map((img, i) => (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === cur ? 1 : 0, transition: 'opacity 1.2s ease' }}>
              <Image src={img} alt="" fill style={{ objectFit: 'cover', filter: 'blur(55px) brightness(.22) saturate(1.5)', transform: 'scale(1.1)' }} sizes="100vw" />
            </div>
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,26,22,.4) 0%, transparent 25%, transparent 72%, var(--soil) 100%)' }} />
        </div>

        <div className="gallery-header">
          <Eyebrow label="גלריה" color={loc.color} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300 }}>
              <em style={{ fontStyle: 'italic', color: loc.color }}>ראו</em> את המקום
            </h2>
            <span style={{ fontSize: '.7rem', letterSpacing: '.1em', color: 'rgba(242,237,227,.3)' }}>{loc.gallery.length} תמונות · החליקו</span>
          </div>
        </div>

        <div ref={trackRef} className="gallery-strip"
          onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
          onTouchStart={onTS} onTouchMove={onTM}>
          {loc.gallery.map((img, i) => {
            const on = active === i
            return (
              <div key={i}
                className={`gallery-card${on ? ' gallery-card-active' : ''}`}
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
                onClick={() => setLb(i)}
                role="button" tabIndex={0} aria-label={`תמונה ${i + 1}`}
                onKeyDown={e => e.key === 'Enter' && setLb(i)}>
                <Image src={img} alt={`${loc.name} ${i + 1}`} fill
                  style={{ objectFit: 'cover', filter: on ? 'brightness(.88) saturate(1.15)' : 'brightness(.55) saturate(.85)', transform: on ? 'scale(1.04)' : 'scale(1)', transition: 'filter .5s, transform .6s var(--ease)' }}
                  sizes="(max-width:480px) 88vw, (max-width:768px) 85vw, 460px" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,22,.9) 0%, transparent 55%)', opacity: on ? 1 : .5, transition: 'opacity .4s' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: F, fontSize: '3.5rem', fontWeight: 300, color: on ? 'rgba(242,237,227,.12)' : 'rgba(242,237,227,.05)', transition: 'color .4s' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ position: 'absolute', bottom: 0, inset: 0, padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '.62rem', letterSpacing: '.16em', color: loc.color, marginBottom: '.3rem', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(5px)', transition: 'opacity .3s, transform .3s' }}>לחצו להגדלה</div>
                  <div style={{ fontFamily: F, fontSize: on ? '1.2rem' : '.9rem', fontWeight: 300, transition: 'font-size .4s' }}>{loc.name}</div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: loc.color, transform: on ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'right', transition: 'transform .5s var(--ease)' }} />
              </div>
            )
          })}
        </div>

        <div className="gallery-dots">
          {loc.gallery.map((_, i) => (
            <button key={i} className="touch-sm"
              onClick={() => { setBgIdx(i); (trackRef.current?.children[i] as HTMLElement)?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }}
              aria-label={`תמונה ${i + 1}`}
              style={{ width: i === cur ? 18 : 5, height: 2, background: i === cur ? loc.color : 'rgba(242,237,227,.18)', border: 'none', padding: 0, transition: 'width .4s, background .3s', cursor: 'pointer', minHeight: 'unset' }} />
          ))}
        </div>
      </section>

      {lb !== null && (
        <div className="lb-overlay" onClick={() => setLb(null)} role="dialog" aria-modal="true">
          <div className="lb-img-wrap" onClick={e => e.stopPropagation()}>
            <Image key={lb} src={loc.gallery[lb]} alt={loc.name} fill style={{ objectFit: 'contain' }} sizes="(max-width:640px) 100vw, 90vw" priority />
          </div>
          <button className="lb-nav-btn" style={{ right: '1rem' }} onClick={e => { e.stopPropagation(); setLb(i => i !== null ? (i - 1 + loc.gallery.length) % loc.gallery.length : null) }} aria-label="תמונה קודמת">›</button>
          <button className="lb-nav-btn" style={{ left: '1rem' }} onClick={e => { e.stopPropagation(); setLb(i => i !== null ? (i + 1) % loc.gallery.length : null) }} aria-label="תמונה הבאה">‹</button>
          <button className="lb-close-btn" onClick={() => setLb(null)} aria-label="סגור">✕</button>
          <div className="lb-counter" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '.7rem', letterSpacing: '.18em', color: 'rgba(242,237,227,.35)' }}>{lb + 1} / {loc.gallery.length}</div>
            <div className="lb-thumbs">
              {loc.gallery.map((img, i) => (
                <div key={i} className="lb-thumb" onClick={() => setLb(i)} role="button" tabIndex={0}
                  style={{ width: 54, height: 36, position: 'relative', cursor: 'pointer', outline: `2px solid ${i === lb ? loc.color : 'transparent'}`, outlineOffset: 1, opacity: i === lb ? 1 : .35, transition: 'opacity .3s' }}>
                  <Image src={img} alt="" fill style={{ objectFit: 'cover' }} sizes="54px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function PropertyPage({ loc }: { loc: Location }) {
  const c = loc.color
  const cRgb = loc.colorRgb

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: loc.name,
        description: loc.description,
        url: `https://between-art-and-nature.netlify.app/${loc.slug}`,
        image: loc.imageFeatured || loc.image,
        priceRange: `₪${loc.priceFrom}+`,
        address: { '@type': 'PostalAddress', addressRegion: loc.region, addressCountry: 'IL' },
        amenityFeature: loc.features.map(f => ({ '@type': 'LocationFeatureSpecification', name: f.replace(/^[\S]+\s/, '') })),
      })}} />

      <PropertyHero loc={loc} />

      {/* 1. ATMOSPHERE */}
      <section className="atmosphere-section" style={{ background: loc.colorBg, borderTop: `2px solid rgba(${cRgb},.3)`, borderBottom: `1px solid rgba(${cRgb},.15)` }}>
        <div className="atmosphere-quote-mark" style={{ fontFamily: F, fontWeight: 300, color: c, opacity: .25 }}>"</div>
        <blockquote className="atmosphere-quote" style={{ fontFamily: F, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, color: 'var(--cream)', maxWidth: '72ch', margin: 0, flex: 1 }}>
          {loc.atmosphere}
        </blockquote>
      </section>

      {/* 2. GALLERY */}
      <Gallery loc={loc} />

      {/* 3. ABOUT */}
      <section className="about-section">
        <div className="about-diag" />
        <div className="about-grid">
          <div className="about-text">
            <ScrollReveal>
              <Eyebrow label="על המקום" color={c} />
              <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 3.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '1.8rem' }}>
                <em style={{ fontStyle: 'italic', color: c }}>{loc.nameParts.colored}</em><br />— הסיפור
              </h2>
              <p style={{ fontSize: '.97rem', lineHeight: 2, color: 'var(--muted)', marginBottom: '2.2rem', maxWidth: '48ch' }}>{loc.longDescription}</p>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {loc.pills.map((p, i) => (
                  <span key={i} className="pill" style={{ background: loc.colorBg, color: c, border: `1px solid rgba(${cRgb},.3)` }}>{p}</span>
                ))}
              </div>
              <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.72rem', letterSpacing: '.1em', background: 'var(--leaf)', color: 'var(--cream)', padding: '.9rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem', alignSelf: 'flex-start', minHeight: 'var(--touch)' }}>
                💬 בדקו זמינות
              </a>
            </ScrollReveal>
          </div>
          <div className="about-image">
            <Image src={loc.image} alt={loc.name} fill style={{ objectFit: 'cover', filter: 'brightness(.75) saturate(1.1)' }} sizes="(max-width:900px) 100vw, 50vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, var(--bark) 100%)' }} />
            <div className="about-price-badge" style={{ border: `1px solid rgba(${cRgb},.25)` }}>
              <div style={{ fontSize: '.58rem', letterSpacing: '.22em', color: c, marginBottom: '.3rem' }}>החל מ-</div>
              <div style={{ fontFamily: F, fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 300, color: c, lineHeight: 1 }}>₪{loc.priceFrom.toLocaleString()}</div>
              <div style={{ fontSize: '.68rem', color: 'var(--muted)' }}>ללילה</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ROOMS */}
      <section className="rooms-section" style={{ background: 'var(--soil)' }}>
        <div className="rooms-header">
          <ScrollReveal>
            <Eyebrow label="חדרים ויחידות" color={c} />
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300 }}>
              <em style={{ fontStyle: 'italic', color: c }}>היכן</em> תישנו
            </h2>
          </ScrollReveal>
        </div>
        <div className="rooms-strip">
          {loc.rooms.map((room, i) => (
            <div key={i} className="room-card" style={{ border: `1px solid rgba(${cRgb},.1)` }}>
              <div style={{ opacity: .7, marginBottom: '.2rem' }}><Icon name={room.icon} size={20} color={loc.color} strokeWidth={1} /></div>
              <div style={{ fontFamily: F, fontSize: '1.3rem', fontWeight: 300, color: 'var(--cream)' }}>{room.name}</div>
              <div style={{ fontSize: '.72rem', letterSpacing: '.08em', color: c }}>{room.capacity}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--muted)', paddingBottom: '.8rem', borderBottom: `1px solid rgba(${cRgb},.1)` }}>{room.beds}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem', margin: 0, padding: 0 }}>
                {room.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '.78rem', color: 'rgba(242,237,227,.5)', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: c, flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div style={{ flexShrink: 0, width: 200, background: loc.colorBg, border: `1px solid rgba(${cRgb},.25)`, padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
            <div style={{ fontFamily: F, fontSize: 'clamp(2.5rem,8vw,4rem)', fontWeight: 300, color: c, lineHeight: 1 }}>{loc.capacity}</div>
            <div style={{ fontSize: '.68rem', letterSpacing: '.15em', color: 'var(--muted)' }}>אורחים מקסימום</div>
          </div>
        </div>
      </section>

      {/* 5. FOR WHO */}
      <section className="forWho-section" style={{ background: 'var(--bark)' }}>
        <ScrollReveal>
          <Eyebrow label="למי זה מתאים" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>המקום הנכון</em> בשבילכם?
          </h2>
        </ScrollReveal>
        <div className="forWho-grid">
          {loc.forWho.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div style={{ padding: 'clamp(1.8rem,4vw,2.8rem) clamp(1.5rem,3vw,2.2rem)', background: 'var(--log)', borderTop: `2px solid rgba(${cRgb},${i === 0 ? '.5' : '.1'})`, transition: 'border-color .4s', height: '100%' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = c)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = i === 0 ? `rgba(${cRgb},.5)` : `rgba(${cRgb},.1)`)}>
                <div style={{ marginBottom: '1.2rem' }}><Icon name={item.icon} size={22} color={loc.color} strokeWidth={1} /></div>
                <div style={{ fontFamily: F, fontSize: '1.2rem', fontWeight: 300, color: 'var(--cream)', marginBottom: '.8rem' }}>{item.title}</div>
                <div style={{ fontSize: '.85rem', lineHeight: 1.8, color: 'var(--muted)' }}>{item.description}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. AMENITIES */}
      <section className="amenities-section" style={{ background: 'var(--soil)' }}>
        <ScrollReveal>
          <Eyebrow label="מה יש כאן" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            כל מה שצריך, <em style={{ fontStyle: 'italic', color: c }}>ולא פחות</em>
          </h2>
        </ScrollReveal>
        <div className="amenities-grid">
          {loc.amenities.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <div style={{ fontSize: '.72rem', letterSpacing: '.12em', color: c, marginBottom: '1.2rem' }}>{cat.category}</div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.65rem', margin: 0, padding: 0 }}>
                  {cat.items.map((item, j) => (
                    <li key={j} style={{ fontSize: '.87rem', color: 'var(--muted)', display: 'flex', alignItems: 'flex-start', gap: '.7rem', lineHeight: 1.5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: `rgba(${cRgb},.5)`, flexShrink: 0, marginTop: '0.4rem' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 7. AREA */}
      <section className="area-section">
        <Image src={loc.imageFeatured || loc.image} alt={loc.region} fill style={{ objectFit: 'cover', filter: 'brightness(.3) saturate(1.2)' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(28,26,22,.98) 0%, rgba(28,26,22,.5) 50%, rgba(${cRgb},.15) 100%)` }} />
        <div className="area-content">
          <ScrollReveal>
            <Eyebrow label="האזור" color={c} />
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '1.5rem' }}>
              מה מחכה לכם <em style={{ fontStyle: 'italic', color: c }}>בחוץ</em>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--muted)', maxWidth: '50ch' }}>{loc.area}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. ATTRACTIONS */}
      <section className="attractions-section" style={{ background: 'var(--bark)' }}>
        <ScrollReveal>
          <Eyebrow label="אטרקציות" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>לא חסר</em> מה לעשות
          </h2>
        </ScrollReveal>
        <div className="attractions-grid">
          {loc.attractions.map((a, i) => (
            <ScrollReveal key={i} delay={i * 0.07}>
              <div className="attraction-cell" style={{ background: i % 2 === 0 ? 'var(--log)' : 'var(--soil)', borderBottom: `1px solid rgba(${cRgb},.08)` }}>
                <div style={{ flexShrink: 0, width: 36, paddingTop: '.2rem' }}>
                  <Icon name={a.icon} size={20} color={loc.color} strokeWidth={1} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="attraction-header">
                    <div style={{ fontFamily: F, fontSize: '1.05rem', fontWeight: 300, color: 'var(--cream)', flex: 1, minWidth: 0 }}>{a.name}</div>
                    <div style={{ fontSize: '.6rem', letterSpacing: '.12em', color: c, flexShrink: 0 }}>{a.distance}</div>
                  </div>
                  <div style={{ fontSize: '.65rem', letterSpacing: '.1em', color: `rgba(${cRgb},.7)`, marginBottom: '.5rem' }}>{a.type}</div>
                  <div style={{ fontSize: '.83rem', lineHeight: 1.7, color: 'var(--muted)' }}>{a.description}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 9. TRAILS */}
      <section className="trails-section" style={{ background: 'var(--soil)' }}>
        <ScrollReveal>
          <Eyebrow label="מסלולי טיול" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>צאו</em> לטבע
          </h2>
        </ScrollReveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {loc.trails.map((trail, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="trail-row" style={{ background: 'var(--bark)', borderRight: `3px solid rgba(${cRgb}, ${i === 0 ? '.8' : '.2'})` }}>
                <div className="trail-num">
                  <div style={{ fontFamily: F, fontSize: '2rem', fontWeight: 300, color: `rgba(${cRgb},.3)`, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: F, fontSize: '1.15rem', fontWeight: 300, color: 'var(--cream)', marginBottom: '.4rem' }}>{trail.name}</div>
                  <div style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)' }}>{trail.description}</div>
                </div>
                <div className="trail-meta">
                  <div style={{ fontSize: '.68rem', letterSpacing: '.06em', color: 'var(--muted)' }}>{trail.difficulty}</div>
                  <div style={{ fontSize: '.7rem', color: c }}>{trail.duration}</div>
                  <div style={{ fontSize: '.68rem', color: 'rgba(242,237,227,.35)' }}>{trail.distance}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 10. FOOD */}
      <section className="food-section" style={{ background: 'var(--bark)' }}>
        <ScrollReveal>
          <Eyebrow label="אוכל וקפה" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>לאכול</em> בסביבה
          </h2>
        </ScrollReveal>
        <div className="food-grid">
          {loc.food.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.09}>
              <div style={{ padding: 'clamp(1.5rem,3vw,2.2rem)', background: i === 0 ? loc.colorBg : 'var(--log)', border: `1px solid rgba(${cRgb},${i === 0 ? '.3' : '.08'})`, height: '100%' }}>
                <div className="food-card-header">
                  <div className="food-card-name" style={{ fontFamily: F, fontSize: '1.05rem', fontWeight: 300, color: 'var(--cream)' }}>{f.name}</div>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.1em', color: c, flexShrink: 0 }}>{f.distance}</div>
                </div>
                <div style={{ fontSize: '.65rem', letterSpacing: '.1em', color: `rgba(${cRgb},.7)`, marginBottom: '.8rem' }}>{f.type}</div>
                <div style={{ fontSize: '.83rem', lineHeight: 1.75, color: 'var(--muted)', fontStyle: 'italic' }}>&ldquo;{f.highlight}&rdquo;</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 11. CTA */}
      <section className="prop-cta-section" id="contact">
        <Image src={loc.imageFeatured || loc.image} alt="" fill style={{ objectFit: 'cover', filter: 'brightness(.25) saturate(1.3)' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(${cRgb},.15) 0%, rgba(28,26,22,.7) 70%)` }} />
        <div style={{ position: 'absolute', width: 'min(60vw,600px)', height: 'min(60vw,600px)', borderRadius: '50%', border: `1px solid rgba(${cRgb},.12)`, animation: 'pulse 4s ease infinite' }} />
        <div className="prop-cta-content">
          <ScrollReveal>
            <div style={{ fontSize: '.6rem', letterSpacing: '.28em', color: c, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.7rem' }}>
              <span style={{ width: 20, height: 1, background: c, display: 'inline-block' }} />
              בואו נדבר
              <span style={{ width: 20, height: 1, background: c, display: 'inline-block' }} />
            </div>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2.4rem, 6vw, 6rem)', fontWeight: 300, lineHeight: .95, marginBottom: '1.8rem' }}>
              מוכנים <em style={{ fontStyle: 'italic', color: c }}>להזמין?</em>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '44ch', margin: '0 auto 3rem' }}>
              דברו איתנו — נוודא שהמתחם פנוי ונשלח לכם את כל הפרטים. מענה מיידי.
            </p>
            <div className="cta-btns">
              <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25D366', color: '#fff', fontSize: '.75rem', letterSpacing: '.1em', padding: '1.1rem 2.6rem', display: 'inline-flex', alignItems: 'center', gap: '.6rem', justifyContent: 'center' }}>
                💬 WhatsApp — מענה מיידי
              </a>
              <a href="tel:+972523983394"
                style={{ fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)', border: '1px solid rgba(242,237,227,.2)', padding: '1.1rem 2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                📞 052-398-3394
              </a>
              <Link href="/"
                style={{ fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)', border: '1px solid rgba(242,237,227,.1)', padding: '1.1rem 2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                ← כל המתחמים
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Location } from '@/lib/locations'
import PropertyHero from '@/components/PropertyHero'
import ScrollReveal from '@/components/ScrollReveal'

const F = "'Frank Ruhl Libre', Georgia, serif"

// ── tiny helpers ─────────────────────────────
function Eyebrow({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ fontSize: '.6rem', letterSpacing: '.28em', color, marginBottom: '.8rem', display: 'flex', alignItems: 'center', gap: '.7rem', fontWeight: 400 }}>
      {label}
      <span style={{ width: 20, height: 1, background: color, display: 'inline-block' }} />
    </div>
  )
}

// ── gallery ──────────────────────────────────
function Gallery({ loc }: { loc: Location }) {
  const [active, setActive] = useState<number | null>(null)
  const [lb, setLb] = useState<number | null>(null)
  const [bgIdx, setBgIdx] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef(false)
  const sx = useRef(0); const ss = useRef(0)

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

  const cur = active ?? bgIdx

  return (
    <>
      <section style={{ position: 'relative', background: 'var(--soil)', overflow: 'hidden' }}>
        {/* ambient bg */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {loc.gallery.map((img, i) => (
            <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === cur ? 1 : 0, transition: 'opacity 1.2s ease' }}>
              <Image src={img} alt="" fill style={{ objectFit: 'cover', filter: 'blur(55px) brightness(.22) saturate(1.5)', transform: 'scale(1.1)' }} sizes="100vw" />
            </div>
          ))}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(28,26,22,.4) 0%, transparent 25%, transparent 72%, var(--soil) 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, padding: '4rem 4rem 1.5rem' }}>
          <Eyebrow label="גלריה" color={loc.color} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300 }}>
              <em style={{ fontStyle: 'italic', color: loc.color }}>ראו</em> את המקום
            </h2>
            <span style={{ fontSize: '.7rem', letterSpacing: '.1em', color: 'rgba(242,237,227,.3)' }}>{loc.gallery.length} תמונות · גרור לגלול</span>
          </div>
        </div>

        <div ref={trackRef} onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
          style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 6, overflowX: 'auto', padding: '1rem 4rem 2.5rem', scrollbarWidth: 'none', cursor: 'grab', userSelect: 'none' }}>
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
          {loc.gallery.map((img, i) => {
            const on = active === i
            return (
              <div key={i} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onClick={() => setLb(i)}
                style={{ flexShrink: 0, width: on ? 460 : 270, height: 320, position: 'relative', overflow: 'hidden', transition: 'width .5s cubic-bezier(.16,1,.3,1)', cursor: 'pointer' }}>
                <Image src={img} alt={`${loc.name} ${i + 1}`} fill style={{ objectFit: 'cover', filter: on ? 'brightness(.88) saturate(1.15)' : 'brightness(.55) saturate(.85)', transform: on ? 'scale(1.04)' : 'scale(1)', transition: 'filter .5s, transform .6s cubic-bezier(.16,1,.3,1)' }} sizes="460px" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,22,.9) 0%, transparent 55%)', opacity: on ? 1 : .5, transition: 'opacity .4s' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontFamily: F, fontSize: '3.5rem', fontWeight: 300, color: on ? 'rgba(242,237,227,.12)' : 'rgba(242,237,227,.05)', transition: 'color .4s' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ position: 'absolute', bottom: 0, inset: 0, padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '.62rem', letterSpacing: '.16em', color: loc.color, marginBottom: '.3rem', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(5px)', transition: 'opacity .3s, transform .3s' }}>לחצו להגדלה</div>
                  <div style={{ fontFamily: F, fontSize: on ? '1.2rem' : '.9rem', fontWeight: 300, transition: 'font-size .4s' }}>{loc.name}</div>
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: loc.color, transform: on ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'right', transition: 'transform .5s cubic-bezier(.16,1,.3,1)' }} />
              </div>
            )
          })}
        </div>

        {/* dots */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 5, justifyContent: 'center', paddingBottom: '3rem' }}>
          {loc.gallery.map((_, i) => (
            <button key={i} onClick={() => { setBgIdx(i); trackRef.current?.children[i] && (trackRef.current.children[i] as HTMLElement).scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }}
              style={{ width: i === cur ? 18 : 5, height: 2, background: i === cur ? loc.color : 'rgba(242,237,227,.18)', border: 'none', padding: 0, transition: 'width .4s, background .3s', cursor: 'pointer' }} />
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lb !== null && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(5,5,5,.97)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'lbFd .2s ease' }} onClick={() => setLb(null)}>
          <style>{`@keyframes lbFd{from{opacity:0}to{opacity:1}}`}</style>
          <div style={{ position: 'relative', width: '90vw', height: '82vh', maxWidth: 1300 }} onClick={e => e.stopPropagation()}>
            <Image key={lb} src={loc.gallery[lb]} alt={loc.name} fill style={{ objectFit: 'contain' }} sizes="90vw" priority />
            <div style={{ position: 'absolute', bottom: '-2.5rem', left: 0, right: 0, textAlign: 'center', fontSize: '.7rem', letterSpacing: '.18em', color: 'rgba(242,237,227,.35)' }}>
              {lb + 1} / {loc.gallery.length}
            </div>
          </div>
          {['right', 'left'].map((side, idx) => (
            <button key={side} onClick={e => { e.stopPropagation(); setLb(i => i !== null ? (i + (idx === 0 ? -1 : 1) + loc.gallery.length) % loc.gallery.length : null) }}
              style={{ position: 'fixed', [side]: '1.5rem', top: '50%', transform: 'translateY(-50%)', width: 46, height: 46, border: '1px solid rgba(242,237,227,.12)', background: 'rgba(28,26,22,.8)', color: 'var(--cream)', fontSize: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>
              {idx === 0 ? '›' : '‹'}
            </button>
          ))}
          <button onClick={() => setLb(null)} style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', width: 38, height: 38, border: '1px solid rgba(242,237,227,.12)', background: 'rgba(28,26,22,.8)', color: 'var(--cream)', fontSize: '.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}>✕</button>
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1rem 2rem', background: 'linear-gradient(to top, rgba(5,5,5,.9), transparent)', display: 'flex', gap: 3, justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
            {loc.gallery.map((img, i) => (
              <div key={i} onClick={() => setLb(i)} style={{ width: 54, height: 36, position: 'relative', cursor: 'pointer', outline: `2px solid ${i === lb ? loc.color : 'transparent'}`, outlineOffset: 1, opacity: i === lb ? 1 : .35, transition: 'opacity .3s, outline-color .3s' }}>
                <Image src={img} alt="" fill style={{ objectFit: 'cover' }} sizes="54px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

// ── MAIN COMPONENT ────────────────────────────
export default function PropertyPage({ loc }: { loc: Location }) {
  const c = loc.color
  const cRgb = loc.colorRgb

  return (
    <>
      {/* JSON-LD SEO */}
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

      {/* ══ 1. ATMOSPHERE ════════════════════════════ */}
      <section style={{ background: loc.colorBg, borderTop: `2px solid rgba(${cRgb},.3)`, borderBottom: `1px solid rgba(${cRgb},.15)`, padding: '3.5rem 4rem', display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
        <div style={{ fontFamily: F, fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, lineHeight: 1, color: c, opacity: .25, flexShrink: 0 }}>"</div>
        <blockquote style={{ fontFamily: F, fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.65, color: 'var(--cream)', maxWidth: '72ch', margin: 0 }}>
          {loc.atmosphere}
        </blockquote>
      </section>

      {/* ══ 2. GALLERY ═══════════════════════════════ */}
      <Gallery loc={loc} />

      {/* ══ 3. ABOUT — split diagonal ═══════════════ */}
      <section style={{ position: 'relative', background: 'var(--bark)', overflow: 'hidden' }}>
        {/* diagonal divider */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', background: 'var(--soil)', clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh', alignItems: 'stretch' }}>
          {/* left — text */}
          <div style={{ padding: '6rem 4rem 6rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ScrollReveal>
              <Eyebrow label="על המקום" color={c} />
              <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 3.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '1.8rem' }}>
                <em style={{ fontStyle: 'italic', color: c }}>{loc.nameParts.colored}</em><br />— הסיפור
              </h2>
              <p style={{ fontSize: '.97rem', lineHeight: 2, color: 'var(--muted)', marginBottom: '2.2rem', maxWidth: '48ch' }}>{loc.longDescription}</p>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {loc.pills.map((p, i) => (
                  <span key={i} style={{ fontSize: '.63rem', letterSpacing: '.08em', padding: '.35rem .9rem', background: loc.colorBg, color: c, border: `1px solid rgba(${cRgb},.3)` }}>{p}</span>
                ))}
              </div>
              <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.72rem', letterSpacing: '.1em', background: 'var(--leaf)', color: 'var(--cream)', padding: '.9rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem', alignSelf: 'flex-start' }}>
                💬 בדקו זמינות
              </a>
            </ScrollReveal>
          </div>

          {/* right — image with price badge */}
          <div style={{ position: 'relative' }}>
            <Image src={loc.image} alt={loc.name} fill style={{ objectFit: 'cover', filter: 'brightness(.75) saturate(1.1)' }} sizes="50vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, var(--bark) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', background: 'rgba(28,26,22,.85)', backdropFilter: 'blur(12px)', border: `1px solid rgba(${cRgb},.25)`, padding: '1.4rem 2rem' }}>
              <div style={{ fontSize: '.58rem', letterSpacing: '.22em', color: c, marginBottom: '.3rem' }}>החל מ-</div>
              <div style={{ fontFamily: F, fontSize: '2.5rem', fontWeight: 300, color: c, lineHeight: 1 }}>₪{loc.priceFrom.toLocaleString()}</div>
              <div style={{ fontSize: '.68rem', color: 'var(--muted)' }}>ללילה</div>
            </div>
          </div>
        </div>

        <style>{`@media(max-width:900px){section[data-about="1"]{grid-template-columns:1fr!important}section[data-about="1"]>div:last-child{height:50vw}}`}</style>
      </section>

      {/* ══ 4. ROOMS — horizontal scroll cards ═══════ */}
      <section style={{ padding: '6rem 0', background: 'var(--soil)', overflow: 'hidden' }}>
        <div style={{ padding: '0 4rem 2.5rem' }}>
          <ScrollReveal>
            <Eyebrow label="חדרים ויחידות" color={c} />
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300 }}>
              <em style={{ fontStyle: 'italic', color: c }}>היכן</em> תישנו
            </h2>
          </ScrollReveal>
        </div>
        <div style={{ display: 'flex', gap: 2, overflowX: 'auto', scrollbarWidth: 'none', padding: '0 4rem 1rem' }}>
          {loc.rooms.map((room, i) => (
            <div key={i} style={{ flexShrink: 0, width: 300, background: 'var(--bark)', border: `1px solid rgba(${cRgb},.1)`, padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
              <div style={{ fontSize: '2rem' }}>{room.icon}</div>
              <div style={{ fontFamily: F, fontSize: '1.3rem', fontWeight: 300, color: 'var(--cream)' }}>{room.name}</div>
              <div style={{ fontSize: '.72rem', letterSpacing: '.08em', color: c }}>{room.capacity}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--muted)', paddingBottom: '.8rem', borderBottom: `1px solid rgba(${cRgb},.1)` }}>{room.beds}</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                {room.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '.78rem', color: 'rgba(242,237,227,.5)', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: c, flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* total capacity badge */}
          <div style={{ flexShrink: 0, width: 200, background: loc.colorBg, border: `1px solid rgba(${cRgb},.25)`, padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
            <div style={{ fontFamily: F, fontSize: '4rem', fontWeight: 300, color: c, lineHeight: 1 }}>{loc.capacity}</div>
            <div style={{ fontSize: '.68rem', letterSpacing: '.15em', color: 'var(--muted)' }}>אורחים מקסימום</div>
          </div>
        </div>
      </section>

      {/* ══ 5. FOR WHO — editorial grid ══════════════ */}
      <section style={{ padding: '6rem 4rem', background: 'var(--bark)' }}>
        <ScrollReveal>
          <Eyebrow label="למי זה מתאים" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>המקום הנכון</em> בשבילכם?
          </h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
          {loc.forWho.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div style={{ padding: '2.8rem 2.2rem', background: 'var(--log)', borderTop: `2px solid rgba(${cRgb},${i === 0 ? '.5' : '.1'})`, transition: 'border-color .4s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = c)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = i === 0 ? `rgba(${cRgb},.5)` : `rgba(${cRgb},.1)`)}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <div style={{ fontFamily: F, fontSize: '1.2rem', fontWeight: 300, color: 'var(--cream)', marginBottom: '.8rem' }}>{item.title}</div>
                <div style={{ fontSize: '.85rem', lineHeight: 1.8, color: 'var(--muted)' }}>{item.description}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ 6. AMENITIES — categorized ═══════════════ */}
      <section style={{ padding: '6rem 4rem', background: 'var(--soil)' }}>
        <ScrollReveal>
          <Eyebrow label="מה יש כאן" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            כל מה שצריך, <em style={{ fontStyle: 'italic', color: c }}>ולא פחות</em>
          </h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '3rem 4rem' }}>
          {loc.amenities.map((cat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div>
                <div style={{ fontSize: '.72rem', letterSpacing: '.12em', color: c, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  {cat.category}
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
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

      {/* ══ 7. AREA — full-bleed with text overlay ═══ */}
      <section style={{ position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
        <Image src={loc.imageFeatured || loc.image} alt={loc.region} fill style={{ objectFit: 'cover', filter: 'brightness(.3) saturate(1.2)' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(28,26,22,.98) 0%, rgba(28,26,22,.5) 50%, rgba(${cRgb},.15) 100%)` }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '5rem 4rem', maxWidth: 700 }}>
          <ScrollReveal>
            <Eyebrow label="האזור" color={c} />
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '1.5rem' }}>
              מה מחכה לכם <em style={{ fontStyle: 'italic', color: c }}>בחוץ</em>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--muted)', maxWidth: '50ch' }}>{loc.area}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ 8. ATTRACTIONS — numbered list editorial ═ */}
      <section style={{ padding: '6rem 4rem', background: 'var(--bark)' }}>
        <ScrollReveal>
          <Eyebrow label="אטרקציות" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>לא חסר</em> מה לעשות
          </h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}>
          {loc.attractions.map((a, i) => (
            <ScrollReveal key={i} delay={i * 0.07}>
              <div style={{ display: 'flex', gap: '2rem', padding: '2.2rem', background: i % 2 === 0 ? 'var(--log)' : 'var(--soil)', borderBottom: `1px solid rgba(${cRgb},.08)`, alignItems: 'flex-start' }}>
                <div style={{ fontFamily: F, fontSize: '3.5rem', fontWeight: 300, lineHeight: 1, color: `rgba(${cRgb},.12)`, flexShrink: 0, width: 48, textAlign: 'center' }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '.8rem', marginBottom: '.5rem' }}>
                    <div style={{ fontFamily: F, fontSize: '1.1rem', fontWeight: 300, color: 'var(--cream)' }}>{a.name}</div>
                    <div style={{ fontSize: '.6rem', letterSpacing: '.12em', color: c, flexShrink: 0 }}>{a.distance}</div>
                  </div>
                  <div style={{ fontSize: '.65rem', letterSpacing: '.1em', color: `rgba(${cRgb},.7)`, marginBottom: '.5rem' }}>{a.type}</div>
                  <div style={{ fontSize: '.83rem', lineHeight: 1.7, color: 'var(--muted)' }}>{a.description}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <style>{`@media(max-width:700px){div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ══ 9. TRAILS — visual cards with difficulty ═ */}
      <section style={{ padding: '6rem 4rem', background: 'var(--soil)' }}>
        <ScrollReveal>
          <Eyebrow label="מסלולי טיול" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>צאו</em> לטבע
          </h2>
        </ScrollReveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {loc.trails.map((trail, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '2rem', padding: '2rem 2.5rem', background: 'var(--bark)', alignItems: 'center', borderRight: `3px solid rgba(${cRgb}, ${i === 0 ? '.8' : '.2'})` }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: F, fontSize: '2rem', fontWeight: 300, color: `rgba(${cRgb},.3)`, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                </div>
                <div>
                  <div style={{ fontFamily: F, fontSize: '1.15rem', fontWeight: 300, color: 'var(--cream)', marginBottom: '.4rem' }}>{trail.name}</div>
                  <div style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'var(--muted)' }}>{trail.description}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', textAlign: 'left', flexShrink: 0 }}>
                  <div style={{ fontSize: '.68rem', letterSpacing: '.06em', color: 'var(--muted)' }}>{trail.difficulty}</div>
                  <div style={{ fontSize: '.7rem', color: c }}>{trail.duration}</div>
                  <div style={{ fontSize: '.68rem', color: 'rgba(242,237,227,.35)' }}>{trail.distance}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ 10. FOOD — bento-style ═══════════════════ */}
      <section style={{ padding: '6rem 4rem', background: 'var(--bark)' }}>
        <ScrollReveal>
          <Eyebrow label="אוכל וקפה" color={c} />
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2rem, 4vw, 3.8rem)', fontWeight: 300, marginBottom: '3.5rem' }}>
            <em style={{ fontStyle: 'italic', color: c }}>לאכול</em> בסביבה
          </h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
          {loc.food.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.09}>
              <div style={{ padding: '2.2rem', background: i === 0 ? loc.colorBg : 'var(--log)', border: `1px solid rgba(${cRgb},${i === 0 ? '.3' : '.08'})`, height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ fontFamily: F, fontSize: '1.1rem', fontWeight: 300, color: 'var(--cream)' }}>{f.name}</div>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.1em', color: c, flexShrink: 0, marginRight: '.5rem' }}>{f.distance}</div>
                </div>
                <div style={{ fontSize: '.65rem', letterSpacing: '.1em', color: `rgba(${cRgb},.7)`, marginBottom: '.8rem' }}>{f.type}</div>
                <div style={{ fontSize: '.83rem', lineHeight: 1.75, color: 'var(--muted)', fontStyle: 'italic' }}>"{f.highlight}"</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ 11. CTA — cinematic ══════════════════════ */}
      <section style={{ position: 'relative', minHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }} id="contact">
        <Image src={loc.imageFeatured || loc.image} alt="" fill style={{ objectFit: 'cover', filter: 'brightness(.25) saturate(1.3)' }} sizes="100vw" />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(${cRgb},.15) 0%, rgba(28,26,22,.7) 70%)` }} />
        {/* animated pulse ring */}
        <div style={{ position: 'absolute', width: '60vw', height: '60vw', borderRadius: '50%', border: `1px solid rgba(${cRgb},.12)`, animation: 'pulse 4s ease infinite' }} />
        <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:.4}}`}</style>
        <div style={{ position: 'relative', zIndex: 2, padding: '4rem 2rem', maxWidth: 700 }}>
          <ScrollReveal>
            <div style={{ fontSize: '.6rem', letterSpacing: '.28em', color: c, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.7rem' }}>
              <span style={{ width: 20, height: 1, background: c, display: 'inline-block' }} />
              בואו נדבר
              <span style={{ width: 20, height: 1, background: c, display: 'inline-block' }} />
            </div>
            <h2 style={{ fontFamily: F, fontSize: 'clamp(2.8rem, 6vw, 6rem)', fontWeight: 300, lineHeight: .95, marginBottom: '1.8rem' }}>
              מוכנים <em style={{ fontStyle: 'italic', color: c }}>להזמין?</em>
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '44ch', margin: '0 auto 3rem' }}>
              דברו איתנו — נוודא שהמתחם פנוי ונשלח לכם את כל הפרטים. מענה מיידי.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25D366', color: '#fff', fontSize: '.75rem', letterSpacing: '.1em', padding: '1.1rem 2.6rem', display: 'inline-flex', alignItems: 'center', gap: '.6rem' }}>
                💬 WhatsApp — מענה מיידי
              </a>
              <a href="tel:+972523983394" style={{ fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)', border: '1px solid rgba(242,237,227,.2)', padding: '1.1rem 2rem' }}>
                📞 052-398-3394
              </a>
              <Link href="/" style={{ fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)', border: '1px solid rgba(242,237,227,.1)', padding: '1.1rem 2rem' }}>
                ← כל המתחמים
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

import { Metadata } from 'next'
import { getLocation } from '@/lib/locations'
import PropertyHero from '@/components/PropertyHero'
import ScrollReveal from '@/components/ScrollReveal'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const loc = getLocation('achuzah-bagalil')!
  return {
    title: `${loc.name} — בין אומנות לטבע`,
    description: loc.description,
  }
}

export default function PropertyPage() {
  const loc = getLocation('achuzah-bagalil')!

  return (
    <>
      <PropertyHero loc={loc} />

      {/* FEATURES */}
      <section style={{ padding: '6rem 4rem', background: 'var(--bark)' }}>
        <ScrollReveal>
          <div style={{ fontSize: '.62rem', letterSpacing: '.28em', color: loc.color, marginBottom: '.7rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
            מה כלול
            <span style={{ width: 22, height: 1, background: loc.color, display: 'inline-block' }} />
          </div>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, marginBottom: '3rem' }}>
            כל מה שאתם <em style={{ fontStyle: 'italic', color: loc.color }}>צריכים</em>
          </h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5px' }}>
          {loc.features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div style={{ background: 'var(--log)', border: '1px solid rgba(122,158,95,.1)', padding: '2rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '.8rem' }}>{f.split(' ')[0]}</div>
                <div style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {f.replace(/^[\S]+\s/, '')}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* DESCRIPTION + IMAGE */}
      <section style={{ padding: '6rem 4rem', background: 'var(--soil)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <ScrollReveal>
          <div style={{ fontSize: '.62rem', letterSpacing: '.28em', color: loc.color, marginBottom: '.7rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
            על המתחם
            <span style={{ width: 22, height: 1, background: loc.color, display: 'inline-block' }} />
          </div>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2rem, 3.5vw, 3.8rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '2rem' }}>
            <em style={{ fontStyle: 'italic', color: loc.color }}>{loc.name}</em><br />— הסיפור
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.95, color: 'var(--muted)', marginBottom: '2rem' }}>
            {loc.longDescription}
          </p>
          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {loc.pills.map((p, i) => (
              <span key={i} style={{ fontSize: '.65rem', letterSpacing: '.08em', padding: '.35rem .9rem', background: loc.colorBg, color: loc.color, border: `1px solid rgba(${loc.colorRgb},.3)` }}>{p}</span>
            ))}
          </div>
          <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '.75rem', letterSpacing: '.1em', background: 'var(--leaf)', color: 'var(--cream)', padding: '1rem 2.4rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
            💬 בדקו זמינות
          </a>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div style={{ position: 'relative', height: '60vh' }}>
            <Image src={loc.image} alt={loc.name} fill
              style={{ objectFit: 'cover', filter: 'brightness(.8) saturate(1.1)' }}
              sizes="(max-width: 900px) 100vw, 50vw" />
            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'var(--bark)', border: `1px solid rgba(${loc.colorRgb},.2)`, padding: '1.2rem 1.8rem' }}>
              <div style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '2rem', fontWeight: 300, color: loc.color }}>
                ₪{loc.priceFrom.toLocaleString()}
              </div>
              <div style={{ fontSize: '.7rem', color: 'var(--muted)', letterSpacing: '.08em' }}>החל מ- / לילה</div>
            </div>
          </div>
        </ScrollReveal>
        <style>{`@media(max-width:900px){section[style*="1fr 1fr"]{grid-template-columns:1fr!important;padding:4rem 2rem!important;gap:2rem!important}}`}</style>
      </section>

      {/* GALLERY */}
      <section style={{ padding: '6rem 4rem', background: 'var(--bark)' }}>
        <ScrollReveal>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, marginBottom: '3rem' }}>
            <em style={{ fontStyle: 'italic', color: loc.color }}>ראו</em> את המקום
          </h2>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {loc.gallery.map((img, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div style={{ position: 'relative', aspectRatio: i === 0 ? '16/9' : '4/3', overflow: 'hidden', gridColumn: i === 0 ? 'span 2' : 'auto' }}>
                <Image src={img} alt={`${loc.name} תמונה ${i + 1}`} fill
                  style={{ objectFit: 'cover', filter: 'brightness(.8)' }}
                  sizes="(max-width: 700px) 100vw, 33vw" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '6rem 4rem', background: 'var(--soil)', textAlign: 'center' }}>
        <ScrollReveal>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 300, marginBottom: '1.5rem' }}>
            מוכנים <em style={{ fontStyle: 'italic', color: loc.color }}>להזמין?</em>
          </h2>
          <p style={{ fontSize: '.95rem', color: 'var(--muted)', maxWidth: '44ch', margin: '0 auto 2.5rem', lineHeight: 1.85 }}>
            דברו איתנו — נוודא שהמתחם פנוי ונשלח לכם את כל הפרטים.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', fontSize: '.75rem', letterSpacing: '.1em', padding: '1.1rem 2.4rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}>
              💬 WhatsApp — מענה מיידי
            </a>
            <Link href="/" style={{ fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)', border: '1px solid rgba(242,237,227,.15)', padding: '1.1rem 2rem' }}>
              ← לכל המתחמים
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}

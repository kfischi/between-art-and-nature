import Image from 'next/image'
import Link from 'next/link'
import { Location } from '@/lib/locations'

export default function PropertyHero({ loc }: { loc: Location }) {
  return (
    <section style={{ height: '90svh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
      <Image
        src={loc.imageFeatured || loc.image}
        alt={loc.name}
        fill
        priority
        style={{ objectFit: 'cover', filter: 'brightness(.5) saturate(1.2)' }}
        sizes="100vw"
      />

      {/* Color stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, zIndex: 3,
        background: `linear-gradient(to bottom, ${loc.color}, transparent)`,
      }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(28,26,22,1) 0%, rgba(28,26,22,.3) 50%, transparent 80%)',
      }} />

      {/* Breadcrumb */}
      <div style={{
        position: 'absolute', top: '8rem', right: '4rem', zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '.8rem',
        fontSize: '.65rem', letterSpacing: '.15em', color: 'rgba(242,237,227,.4)',
      }}>
        <Link href="/" style={{ color: 'rgba(242,237,227,.4)' }}>דף הבית</Link>
        <span>/</span>
        <span style={{ color: loc.color }}>{loc.name}</span>
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 4rem 4rem', maxWidth: 900 }}>
        <div style={{
          fontSize: '.62rem', letterSpacing: '.3em', color: loc.color,
          marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '.8rem',
        }}>
          {loc.region}
          <span style={{ width: 28, height: 1, background: loc.color, display: 'inline-block' }} />
        </div>

        <h1 style={{
          fontFamily: "'Frank Ruhl Libre', Georgia, serif",
          fontSize: 'clamp(3.5rem, 8vw, 8rem)', fontWeight: 300, lineHeight: .92,
          marginBottom: '1.5rem',
        }}>
          {loc.nameParts.regular}{' '}
          <em style={{ fontStyle: 'italic', color: loc.color }}>{loc.nameParts.colored}</em>
        </h1>

        <p style={{
          fontSize: '1rem', lineHeight: 1.85, color: 'var(--muted)',
          maxWidth: '52ch', marginBottom: '2.5rem',
        }}>
          {loc.tagline}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: '.75rem', letterSpacing: '.1em',
              background: 'var(--leaf)', color: 'var(--cream)',
              padding: '1rem 2.4rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            }}>
            💬 הזמינו עכשיו
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
            <span style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1.8rem', fontWeight: 300, color: loc.color }}>
              ₪{loc.priceFrom.toLocaleString()}
            </span>
            <span style={{ fontSize: '.72rem', color: 'var(--muted)' }}>/ לילה</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .prop-hero-content { padding: 0 2rem 3rem !important; }
          .prop-hero-breadcrumb { right: 2rem !important; }
        }
      `}</style>
    </section>
  )
}

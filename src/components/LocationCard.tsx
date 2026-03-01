import Image from 'next/image'
import Link from 'next/link'
import { Location } from '@/lib/locations'

export function FeaturedLocationCard({ loc }: { loc: Location }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      minHeight: '70vh', marginBottom: 2,
    }}>
      {/* Photo */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Image
          src={loc.imageFeatured || loc.image}
          alt={loc.name}
          fill
          style={{ objectFit: 'cover', filter: 'brightness(.78) saturate(1.1)', transition: 'transform 1.1s' }}
          className="feat-img"
          sizes="50vw"
        />
        {loc.badge && (
          <div style={{
            position: 'absolute', top: '2rem', right: '2rem', zIndex: 2,
            background: 'var(--leaf)', color: 'var(--cream)',
            fontSize: '.62rem', letterSpacing: '.12em', padding: '.5rem 1rem',
          }}>
            {loc.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{
        background: 'var(--bark)',
        padding: '4rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        border: '1px solid rgba(122,158,95,.1)',
      }}>
        <div style={{
          fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '6rem', fontWeight: 300,
          lineHeight: 1, color: 'rgba(242,237,227,.06)',
        }}>
          {loc.num}
        </div>

        <div>
          <div style={{
            fontSize: '.6rem', letterSpacing: '.22em', color: loc.color,
            marginBottom: '.8rem', display: 'flex', alignItems: 'center', gap: '.5rem',
          }}>
            {loc.type} · עד {loc.capacity} אורחים
            <span style={{ width: 14, height: 1, background: loc.color }} />
          </div>

          <div style={{
            fontFamily: "'Frank Ruhl Libre', Georgia, serif",
            fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 300, lineHeight: 1.0,
            marginBottom: '.6rem',
          }}>
            {loc.nameParts.regular}{' '}
            <span style={{ color: loc.color }}>{loc.nameParts.colored}</span>
          </div>

          <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '2rem' }}>
            {loc.region}
          </div>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2rem',
          }}>
            {loc.features.map(f => (
              <span key={f} style={{
                fontSize: '.65rem', letterSpacing: '.06em', padding: '.35rem .9rem',
                background: loc.colorBg, color: loc.color,
                border: `1px solid rgba(${loc.colorRgb},.3)`,
              }}>
                {f}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '.7rem', letterSpacing: '.1em', color: 'var(--muted)' }}>החל מ-</span>
            <span style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '2.2rem', fontWeight: 300, color: loc.color }}>
              ₪{loc.priceFrom.toLocaleString()}
            </span>
            <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>/ לילה</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href={`/${loc.slug}`} style={{
              fontSize: '.72rem', letterSpacing: '.1em',
              background: 'var(--leaf)', color: 'var(--cream)',
              padding: '.9rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem',
              transition: 'background .3s',
            }}>
              לדף המתחם ←
            </Link>
            <a href={`https://wa.me/972523983394?text=${encodeURIComponent(loc.waText)}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: '.72rem', letterSpacing: '.1em',
                border: `1px solid rgba(${loc.colorRgb},.4)`, color: loc.color,
                padding: '.9rem 1.4rem', display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                transition: 'all .3s',
              }}>
              💬 הזמינו
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .feat-img:hover { transform: scale(1.04) !important; }
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1fr"][style*="minHeight"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"][style*="minHeight"] > div:first-child {
            height: 55vw;
          }
        }
      `}</style>
    </div>
  )
}

export function GridLocationCard({ loc }: { loc: Location }) {
  return (
    <Link href={`/${loc.slug}`} style={{
      position: 'relative', overflow: 'hidden',
      aspectRatio: '2/3', display: 'block',
    }}>
      <Image
        src={loc.image}
        alt={loc.name}
        fill
        style={{ objectFit: 'cover', filter: 'brightness(.6) saturate(1.15)', transition: 'transform 1s, filter .6s' }}
        className={`grid-img-${loc.slug}`}
        sizes="33vw"
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(28,26,22,.97) 0%, rgba(28,26,22,.05) 55%)',
      }} />

      {/* Num */}
      <div style={{
        position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 2,
        fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '3.5rem', fontWeight: 300,
        color: 'rgba(242,237,227,.08)', lineHeight: 1,
      }}>
        {loc.num}
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, zIndex: 2, padding: '2rem 1.8rem' }}>
        <div style={{ fontSize: '.6rem', letterSpacing: '.18em', color: loc.color, marginBottom: '.6rem' }}>
          {loc.type} · עד {loc.capacity}
        </div>
        <div style={{
          fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1.9rem', fontWeight: 300,
          lineHeight: 1.0, marginBottom: '.3rem',
        }}>
          {loc.nameParts.regular}{' '}
          <span style={{ color: loc.color }}>{loc.nameParts.colored}</span>
        </div>
        <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginBottom: '1rem' }}>
          {loc.region}
        </div>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          {loc.pills.slice(0, 3).map(p => (
            <span key={p} style={{
              fontSize: '.58rem', letterSpacing: '.06em',
              border: '1px solid rgba(242,237,227,.12)', color: 'rgba(242,237,227,.4)',
              padding: '.25rem .65rem',
            }}>{p}</span>
          ))}
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '.4rem',
          fontSize: '.68rem', letterSpacing: '.1em', color: loc.color,
          borderBottom: `1px solid rgba(${loc.colorRgb},.3)`, paddingBottom: 1,
        }}>
          לדף המתחם ←
        </span>
      </div>

      <style>{`
        a:hover .grid-img-${loc.slug} {
          transform: scale(1.07) !important;
          filter: brightness(.75) saturate(1.3) !important;
        }
        @media (max-width: 600px) {
          a[style*="aspect-ratio: 2/3"] { aspect-ratio: 3/4 !important; }
        }
      `}</style>
    </Link>
  )
}

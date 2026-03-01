'use client'
import Link from 'next/link'
import { locations } from '@/lib/locations'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bark)',
      borderTop: '1px solid rgba(122,158,95,.12)',
      padding: '5rem 4rem 2.5rem',
      direction: 'rtl',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
        gap: '3rem',
        paddingBottom: '3rem',
        borderBottom: '1px solid rgba(122,158,95,.1)',
        marginBottom: '2rem',
      }}>
        {/* Brand */}
        <div>
          <span style={{
            fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1.4rem', fontWeight: 300,
            color: 'var(--fern)', display: 'flex', alignItems: 'center', gap: '.6rem',
            marginBottom: '1rem',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--sage)', flexShrink: 0 }} />
            בין אומנות לטבע
          </span>
          <p style={{ fontSize: '.83rem', lineHeight: 1.85, color: 'rgba(242,237,227,.3)', maxWidth: '26ch' }}>
            מתחמי נופש ייחודיים בגליל. חוויות שמשאירות משהו.
          </p>
        </div>

        {/* Locations */}
        <div>
          <h5 style={{ fontSize: '.6rem', letterSpacing: '.25em', color: 'var(--sage)', marginBottom: '1.3rem', fontWeight: 400 }}>
            המתחמים
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {locations.map(loc => (
              <li key={loc.slug}>
                <Link href={`/${loc.slug}`} style={{
                  fontSize: '.83rem', color: 'rgba(242,237,227,.3)', transition: 'color .3s',
                  display: 'flex', alignItems: 'center', gap: '.5rem',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = loc.color)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,227,.3)')}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: loc.color, flexShrink: 0 }} />
                  {loc.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h5 style={{ fontSize: '.6rem', letterSpacing: '.25em', color: 'var(--sage)', marginBottom: '1.3rem', fontWeight: 400 }}>
            שירותים
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            {['חופשות זוגיות', 'חופשות משפחתיות', 'שבתות חתן', 'ימי גיבוש', 'אירועים'].map(s => (
              <li key={s}>
                <span style={{ fontSize: '.83rem', color: 'rgba(242,237,227,.3)' }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 style={{ fontSize: '.6rem', letterSpacing: '.25em', color: 'var(--sage)', marginBottom: '1.3rem', fontWeight: 400 }}>
            צרו קשר
          </h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            <li>
              <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '.83rem', color: 'rgba(242,237,227,.3)', transition: 'color .3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--fern)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,227,.3)')}>
                💬 WhatsApp
              </a>
            </li>
            <li>
              <a href="tel:+972523983394"
                style={{ fontSize: '.83rem', color: 'rgba(242,237,227,.3)', transition: 'color .3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--fern)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,227,.3)')}>
                052-398-3394
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1.8rem' }}>
          {['Instagram', 'Facebook', 'TikTok'].map(s => (
            <a key={s} href="#" style={{ fontSize: '.68rem', letterSpacing: '.1em', color: 'rgba(242,237,227,.25)', transition: 'color .3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--sage)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,227,.25)')}>
              {s}
            </a>
          ))}
        </div>
        <p style={{ fontSize: '.7rem', color: 'rgba(242,237,227,.18)' }}>
          © 2025 בין אומנות לטבע ·{' '}
          <a href="https://multibrawn.co.il" style={{ color: 'var(--sage)' }}>Multibrawn</a>
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          footer { padding: 3rem 1.5rem 2rem !important; }
          footer > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

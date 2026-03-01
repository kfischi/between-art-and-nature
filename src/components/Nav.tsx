'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locations } from '@/lib/locations'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <nav
      style={{
        position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1000,
        padding: scrolled ? '1.2rem 4rem' : '2rem 4rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(28,26,22,.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(122,158,95,.15)' : '1px solid transparent',
        transition: 'padding .5s, background .4s, border-color .4s',
      }}
    >
      {/* Brand */}
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: '.7rem',
        fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1.3rem', fontWeight: 400,
        color: 'var(--cream)',
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--sage)', flexShrink: 0 }} />
        בין אומנות לטבע
      </Link>

      {/* Desktop links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
          className="nav-desktop">
        <li>
          <Link href="/#locations" style={{ fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)', transition: 'color .3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            המתחמים
          </Link>
        </li>
        {locations.map(loc => (
          <li key={loc.slug}>
            <Link
              href={`/${loc.slug}`}
              style={{
                fontSize: '.73rem', letterSpacing: '.08em',
                color: pathname === `/${loc.slug}` ? loc.color : 'var(--muted)',
                transition: 'color .3s',
                borderBottom: pathname === `/${loc.slug}` ? `1px solid ${loc.color}` : '1px solid transparent',
                paddingBottom: '2px',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = loc.color)}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === `/${loc.slug}` ? loc.color : 'var(--muted)')}
            >
              {loc.name}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="https://wa.me/972523983394"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '.72rem', letterSpacing: '.1em',
              background: 'var(--leaf)', color: 'var(--cream)',
              padding: '.65rem 1.4rem',
              display: 'flex', alignItems: 'center', gap: '.4rem',
              transition: 'background .3s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--forest)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--leaf)')}
          >
            💬 הזמינו
          </a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
        className="nav-mobile-btn"
        aria-label="תפריט"
      >
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: 24, height: 1.5,
            background: 'var(--cream)',
            transition: 'transform .3s, opacity .3s',
            transform: menuOpen
              ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
              : i === 1 ? 'opacity: 0'
              : 'rotate(-45deg) translate(4px, -4px)'
              : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, left: 0,
          background: 'var(--bark)',
          zIndex: 999, padding: '6rem 3rem 3rem',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '2rem', fontWeight: 300, color: 'var(--cream)' }}>
            דף הבית
          </Link>
          {locations.map(loc => (
            <Link key={loc.slug} href={`/${loc.slug}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1.8rem', fontWeight: 300, color: loc.color }}>
              {loc.name}
            </Link>
          ))}
          <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 'auto', background: 'var(--leaf)', color: 'var(--cream)',
              padding: '1rem 2rem', fontSize: '.85rem', letterSpacing: '.1em',
              display: 'inline-flex', alignItems: 'center', gap: '.5rem', alignSelf: 'flex-start',
            }}>
            💬 WhatsApp — הזמינו עכשיו
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
          nav { padding: 1.4rem 2rem !important; }
        }
      `}</style>
    </nav>
  )
}

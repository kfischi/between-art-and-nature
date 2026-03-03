'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locations } from '@/lib/locations'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', inset: '0 0 auto 0', zIndex: 1000,
        padding: scrolled ? '1.2rem var(--px)' : '2rem var(--px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(28,26,22,.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(122,158,95,.15)' : '1px solid transparent',
        transition: 'padding .5s, background .4s, border-color .4s',
      }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '.7rem',
          fontFamily: "'Frank Ruhl Libre', Georgia, serif",
          fontSize: 'clamp(.9rem,2.5vw,1.3rem)', fontWeight: 400,
          color: 'var(--cream)', flexShrink: 0, textDecoration: 'none',
        }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--sage)', flexShrink: 0 }} />
          בין אומנות לטבע
        </Link>

        <ul className="nav-desktop" style={{ gap: '2.5rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          <li>
            <Link href="/#locations" style={{ fontSize: '.75rem', letterSpacing: '.1em', color: 'var(--muted)', transition: 'color .3s', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
              המתחמים
            </Link>
          </li>
          {locations.map(loc => (
            <li key={loc.slug}>
              <Link href={`/${loc.slug}`} style={{
                fontSize: '.73rem', letterSpacing: '.08em',
                color: pathname === `/${loc.slug}` ? loc.color : 'var(--muted)',
                borderBottom: pathname === `/${loc.slug}` ? `1px solid ${loc.color}` : '1px solid transparent',
                paddingBottom: 2, transition: 'color .3s', textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = loc.color)}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === `/${loc.slug}` ? loc.color : 'var(--muted)')}>
                {loc.name}
              </Link>
            </li>
          ))}
          <li>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '.72rem', letterSpacing: '.1em', background: 'var(--leaf)', color: 'var(--cream)', padding: '.65rem 1.4rem', display: 'flex', alignItems: 'center', gap: '.4rem', transition: 'background .3s', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--forest)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--leaf)')}>
              💬 הזמינו
            </a>
          </li>
        </ul>

        <button onClick={() => setMenuOpen(v => !v)} className="nav-mobile-btn"
          aria-label={menuOpen ? 'סגור תפריט' : 'פתח תפריט'} aria-expanded={menuOpen}
          style={{ flexDirection: 'column', gap: 5, padding: 8, background: 'none', border: 'none', cursor: 'pointer', zIndex: 1002 }}>
          <span style={{ display: 'block', width: 26, height: 2, background: 'var(--cream)', transition: 'transform .35s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ display: 'block', width: 26, height: 2, background: 'var(--cream)', transition: 'opacity .35s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 26, height: 2, background: 'var(--cream)', transition: 'transform .35s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </nav>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 1001,
        background: 'var(--bark)',
        display: 'flex', flexDirection: 'column',
        padding: '7rem var(--px) 3rem',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .4s cubic-bezier(.16,1,.3,1)',
        overflowY: 'auto',
      }}>
        <Link href="/" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(1.8rem,7vw,2.2rem)', fontWeight: 300, color: 'var(--cream)', display: 'block', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(242,237,227,.08)', marginBottom: '1.2rem', textDecoration: 'none' }}>
          דף הבית
        </Link>
        {locations.map(loc => (
          <Link key={loc.slug} href={`/${loc.slug}`} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(1.6rem,6vw,2rem)', fontWeight: 300, color: loc.color, display: 'flex', alignItems: 'center', gap: '.8rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(242,237,227,.06)', marginBottom: '1.2rem', textDecoration: 'none' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: loc.color, flexShrink: 0 }} />
            {loc.name}
          </Link>
        ))}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            style={{ background: '#25D366', color: '#fff', padding: '1.1rem 2rem', fontSize: '.85rem', letterSpacing: '.1em', display: 'flex', alignItems: 'center', gap: '.5rem', justifyContent: 'center', textDecoration: 'none' }}>
            💬 WhatsApp — הזמינו עכשיו
          </a>
          <a href="tel:+972523983394" onClick={() => setMenuOpen(false)}
            style={{ border: '1px solid rgba(242,237,227,.15)', color: 'var(--muted)', padding: '1rem 2rem', fontSize: '.82rem', letterSpacing: '.1em', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            📞 052-398-3394
          </a>
        </div>
      </div>
    </>
  )
}

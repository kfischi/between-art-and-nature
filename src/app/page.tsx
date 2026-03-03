import { locations } from '@/lib/locations'
import HeroSlider from '@/components/HeroSlider'
import BookingBar from '@/components/BookingBar'
import ScrollReveal from '@/components/ScrollReveal'
import ScrollProgress from '@/components/ScrollProgress'
import { FeaturedLocationCard, GridLocationCard } from '@/components/LocationCard'
import Link from 'next/link'

export default function HomePage() {
  const featured = locations[0]
  const grid = locations.slice(1)

  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <HeroSlider />

      {/* BOOKING BAR */}
      <BookingBar />

      {/* MARQUEE */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(122,158,95,.15)',
        borderBottom: '1px solid rgba(122,158,95,.15)',
        background: 'var(--bark)', padding: '1rem 0',
      }}>
        <div style={{
          display: 'flex', gap: '2.5rem',
          animation: 'mqScroll 28s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...Array(2)].flatMap(() => [
            { text: 'אחוזת קלמנטין', color: 'var(--sage)' },
            { text: 'אחוזה בגליל', color: 'var(--sky)' },
            { text: 'מתחם צוריאל', color: 'var(--terra)' },
            { text: 'כפר פקיעין', color: 'var(--fern)' },
            { text: 'נוף גלילי', color: 'var(--leaf)' },
            { text: 'ג׳קוזי פרטי', color: 'var(--sky-lt)' },
            { text: 'שבתות חתן', color: 'var(--terra-lt)' },
            { text: 'חופשות משפחתיות', color: 'var(--sage)' },
          ]).map((item, i) => (
            <div key={i} style={{
              flexShrink: 0, display: 'flex', alignItems: 'center', gap: '2.5rem',
              fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1rem', fontStyle: 'italic', fontWeight: 300,
              color: 'rgba(242,237,227,.3)',
            }}>
              {item.text}
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes mqScroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        `}</style>
      </div>

      {/* LOCATIONS */}
      <section id="locations" className='locations-section' style={{ background: 'var(--soil)' }}>
        <ScrollReveal style={{ marginBottom: '3rem' }}>
          <div style={{ fontSize: '.62rem', letterSpacing: '.28em', color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '.7rem' }}>
            המתחמים
            <span style={{ width: 22, height: 1, background: 'var(--sage)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2.2rem, 4.5vw, 4.8rem)', fontWeight: 300, lineHeight: 1.05 }}>
              <span style={{ color: 'var(--fern)' }}>מתחמים</span> ייחודיים לבחור
            </h2>
            {/* Mobile scroll hint */}
            <div className="scroll-hint-mobile" style={{ display: 'flex', alignItems: 'center', gap: '.5rem', color: 'var(--muted)', fontSize: '.65rem', letterSpacing: '.1em' }}>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M1 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              גלגלו
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <FeaturedLocationCard loc={featured} />
        </ScrollReveal>

        <div className="locations-grid">
          {grid.map((loc, i) => (
            <ScrollReveal key={loc.slug} delay={i * 0.1}>
              <GridLocationCard loc={loc} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* NATURE BRAND SPLIT */}
      <div className="nature-split">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80&auto=format&fit=crop"
            alt="גליל"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.2) brightness(.75)' }}
          />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
            {['var(--forest)', 'var(--sky)', 'var(--terra)'].map((c, i) => (
              <div key={i} style={{ flex: 1, background: c, mixBlendMode: 'soft-light', opacity: .3 }} />
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--leaf)', padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ScrollReveal>
            <div style={{ fontSize: '.62rem', letterSpacing: '.28em', color: 'var(--fern)', display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1rem' }}>
              הרשת שלנו <span style={{ width: 22, height: 1, background: 'var(--fern)' }} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2.5rem, 4vw, 4.2rem)', fontWeight: 300, lineHeight: 1.0, color: 'var(--cream)', marginBottom: '2rem' }}>
              מקום אחד.<br /><em style={{ fontStyle: 'italic' }}>חוויה אחרת.</em>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p style={{ fontSize: '.95rem', lineHeight: 1.9, color: 'rgba(242,237,227,.75)', maxWidth: '42ch', marginBottom: '2.5rem' }}>
              מתחמים שנולדו מאהבה למקום. בין אומנות לטבע — שם הכל מתחיל.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {locations.map(loc => (
                <Link key={loc.slug} href={`/${loc.slug}`} style={{
                  display: 'flex', alignItems: 'center', gap: '1.2rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(242,237,227,.12)',
                  transition: 'padding-right .3s',
                  textDecoration: 'none',
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: loc.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1.15rem', fontWeight: 300, color: 'var(--cream)' }}>{loc.name}</span>
                  <span style={{ fontSize: '.75rem', color: 'rgba(242,237,227,.55)', marginRight: 'auto' }}>{loc.description.slice(0, 40)}...</span>
                  <span style={{ color: 'rgba(242,237,227,.3)', fontSize: '.8rem' }}>←</span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <style>{`
          @media (max-width: 900px) {
            div[style*="grid-template-columns: 1fr 1fr"][style*="minHeight: 80vh"] {
              grid-template-columns: 1fr !important;
            }
            div[style*="grid-template-columns: 1fr 1fr"][style*="minHeight: 80vh"] > div:first-child {
              height: 60vw;
            }
          }
        `}</style>
      </div>

      {/* EXPERIENCES */}
      <section id="exp" className='exp-section' style={{ background: 'var(--bark)' }}>
        <div style={{ marginBottom: '4rem' }}>
          <ScrollReveal>
            <div style={{ fontSize: '.62rem', letterSpacing: '.28em', color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '.7rem' }}>
              חוויות <span style={{ width: 22, height: 1, background: 'var(--sage)' }} />
            </div>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2.2rem, 4.5vw, 4.8rem)', fontWeight: 300, lineHeight: 1.05 }}>
              מה <span style={{ color: 'var(--fern)' }}>מחכה</span> לכם
            </h2>
          </ScrollReveal>
        </div>

        <div className="exp-grid">
          {[
            { icon: '💑', title: 'סוף שבוע זוגי', desc: 'ג׳קוזי פרטי מול הנוף, קמין בוער, פרטיות מוחלטת.', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=700&q=75&auto=format&fit=crop', tags: ['אחוזה בגליל', 'אחוזת קלמנטין'], color1: 'var(--sky)', color2: 'var(--sage)' },
            { icon: '👨‍👩‍👧‍👦', title: 'חופשה משפחתית', desc: 'בריכה מגודרת, חצר ענקית, גריל ושקט.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=75&auto=format&fit=crop', tags: ['אחוזת קלמנטין', 'צוריאל'], color1: 'var(--leaf)', color2: 'var(--fern)' },
            { icon: '✡️', title: 'שבת חתן', desc: 'הפרדה מלאה, כשרות, לוגיסטיקה מושלמת.', img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=75&auto=format&fit=crop', tags: ['אחוזת קלמנטין', 'צוריאל'], color1: 'var(--terra)', color2: 'var(--terra-lt)' },
            { icon: '🥾', title: 'טבע והרפתקאות', desc: 'רכיבה, ATV, נחל כזיב, יקבי בוטיק.', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=75&auto=format&fit=crop', tags: ['כל המתחמים'], color1: 'var(--forest)', color2: 'var(--leaf)' },
          ].map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div style={{ position: 'relative', overflow: 'hidden', minHeight: 460, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.2rem 2rem' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, left: 0, height: 3, background: `linear-gradient(to left, ${exp.color1}, ${exp.color2})`, zIndex: 3 }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${exp.img})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(.5) saturate(1.2)', transition: 'transform .8s' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,22,.97) 0%, transparent 60%)' }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ width: 44, height: 44, border: '1px solid rgba(242,237,227,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '1rem' }}>{exp.icon}</div>
                  <div style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: '1.5rem', fontWeight: 300, marginBottom: '.5rem' }}>{exp.title}</div>
                  <p style={{ fontSize: '.8rem', lineHeight: 1.7, color: 'var(--muted)' }}>{exp.desc}</p>
                  <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                    {exp.tags.map(t => (
                      <span key={t} style={{ fontSize: '.6rem', letterSpacing: '.08em', padding: '.25rem .65rem', borderRadius: 20, background: 'rgba(122,158,95,.2)', color: 'var(--fern)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <style>{`
          @media (max-width: 900px) {
            section[id="exp"] { padding: 5rem 2rem !important; }
            section[id="exp"] > div:last-child { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            section[id="exp"] > div:last-child { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* REVIEWS */}
      <section className="reviews-outer">
        <div className="reviews-sticky">
          <ScrollReveal>
            <div style={{ fontSize: '.62rem', letterSpacing: '.28em', color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '.7rem' }}>
              ביקורות <span style={{ width: 22, height: 1, background: 'var(--sage)' }} />
            </div>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(2.2rem, 4.5vw, 4.8rem)', fontWeight: 300, lineHeight: 1.05, marginBottom: '1.5rem' }}>
              מה הם<br /><span style={{ color: 'var(--fern)' }}>אומרים</span>
            </h2>
            <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'var(--muted)', maxWidth: '34ch' }}>מאות אורחים שחזרו — מספרים בעצמם.</p>
          </ScrollReveal>
        </div>

        <div className="reviews-grid">
          {[
            { stars: '★★★★★', color: 'var(--sage)', quote: 'החופשה הכי טובה שהיתה לנו מזה שנים. הג׳קוזי מול הנוף בלילה, הקמין, הפרטיות — פשוט קסם.', who: 'דנה וגל כהן', where: 'אחוזה בגליל · ספטמבר 2024' },
            { stars: '★★★★★', color: 'var(--terra-lt)', quote: 'ארגנו שבת חתן ל-45 אורחים. הכל התנהל מושלם — המתחם, השירות, הגמישות.', who: 'משפחת לוי', where: 'אחוזת קלמנטין · יוני 2024' },
            { stars: '★★★★★', color: 'var(--sky-lt)', quote: 'עם שלושה ילדים קטנים מצאנו מקום שהם היו מאושרים ואנחנו באמת נחנו.', who: 'רחל ואייל ברנע', where: 'מתחם צוריאל · אוגוסט 2024' },
            { stars: '★★★★★', color: 'var(--fern)', quote: 'הכפר, הנוף, האנשים — פקיעין היא חוויה שאי אפשר לשחזר בשום מקום אחר.', who: 'שושי ומשה אברהם', where: 'כפר פקיעין · ספטמבר 2024' },
          ].map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div style={{ background: 'var(--bark)', border: '1px solid rgba(122,158,95,.1)', padding: 'clamp(1.4rem,3vw,2rem)', height: '100%' }}>
                <div style={{ color: r.color, letterSpacing: '.1em', marginBottom: '1rem', fontSize: 'clamp(.9rem,2.5vw,1rem)' }}>{r.stars}</div>
                <p style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(.95rem,2.5vw,1rem)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.65, color: 'var(--cream)', marginBottom: '1.5rem' }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div style={{ fontSize: 'clamp(.7rem,1.8vw,.72rem)', letterSpacing: '.08em', color: r.color }}>{r.who}</div>
                <div style={{ fontSize: 'clamp(.66rem,1.6vw,.68rem)', color: 'var(--muted)', marginTop: '.2rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <span style={{ width: 10, height: 1, background: 'var(--muted)' }} />
                  {r.where}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div style={{ position: 'relative', minHeight: '65vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=70&auto=format&fit=crop"
          alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '115%', objectFit: 'cover', filter: 'brightness(.35) saturate(1.3)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(45,80,22,.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(74,127,165,.4) 0%, transparent 60%), rgba(28,26,22,.5)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '4rem 2rem' }}>
          <ScrollReveal>
            <div style={{ fontSize: '.62rem', letterSpacing: '.28em', color: 'var(--fern)', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '1.2rem' }}>
              <span style={{ width: 22, height: 1, background: 'var(--fern)' }} />
              בואו נדבר
              <span style={{ width: 22, height: 1, background: 'var(--fern)' }} />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 style={{ fontFamily: "'Frank Ruhl Libre', Georgia, serif", fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300, lineHeight: .95, marginBottom: '2rem' }}>
              לא בטוחים<br />איזה <span style={{ color: 'var(--fern)' }}>מתחם</span>?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p style={{ fontSize: '.95rem', color: 'var(--muted)', maxWidth: '44ch', margin: '0 auto 2.8rem', lineHeight: 1.85 }}>
              דברו איתנו ב-WhatsApp — נשמע מה אתם מחפשים ונמליץ על המתחם הנכון.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/972523983394?text=שלום! אני מחפש מתחם נופש בגליל"
                target="_blank" rel="noopener noreferrer"
                style={{ background: '#25D366', color: '#fff', fontSize: '.75rem', letterSpacing: '.08em', padding: '1.05rem 2.2rem', display: 'inline-flex', alignItems: 'center', gap: '.6rem' }}>
                💬 WhatsApp — מענה מיידי
              </a>
              <a href="tel:+972523983394" style={{ fontSize: '.75rem', letterSpacing: '.08em', color: 'var(--muted)', border: '1px solid rgba(242,237,227,.2)', padding: '1.05rem 2rem' }}>
                📞 052-398-3394
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </>
  )
}

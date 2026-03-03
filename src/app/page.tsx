import { locations } from '@/lib/locations'
import HeroSlider from '@/components/HeroSlider'
import ScrollReveal from '@/components/ScrollReveal'
import { GridLocationCard } from '@/components/LocationCard'
import Link from 'next/link'
import Image from 'next/image'

const F = "'Frank Ruhl Libre', Georgia, serif"

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — full-viewport slider
      ════════════════════════════════════════════ */}
      <HeroSlider />

      {/* ═══════════════════════════════════════════
          MARQUEE STRIP — slim, elegant
      ════════════════════════════════════════════ */}
      <div style={{
        overflow: 'hidden',
        background: 'var(--bark)',
        borderTop: '1px solid rgba(122,158,95,.12)',
        borderBottom: '1px solid rgba(122,158,95,.12)',
        padding: '.85rem 0',
      }}>
        <div style={{
          display: 'flex', gap: '3rem',
          animation: 'mqScroll 32s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...Array(3)].flatMap(() => [
            'אחוזת קלמנטין', 'ג׳קוזי פרטי', 'אחוזה בגליל',
            'שבת חתן', 'מתחם צוריאל', 'בריכה מחוממת',
            'כפר פקיעין', 'חופשות משפחתיות', 'גליל מערבי',
          ]).map((text, i) => (
            <span key={i} style={{
              flexShrink: 0,
              fontFamily: F, fontSize: '.72rem', fontStyle: 'italic', fontWeight: 300,
              letterSpacing: '.12em',
              color: i % 3 === 0 ? 'rgba(122,158,95,.6)' : i % 3 === 1 ? 'rgba(242,237,227,.2)' : 'rgba(122,158,95,.3)',
              display: 'inline-flex', alignItems: 'center', gap: '3rem',
            }}>
              {text}
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(122,158,95,.3)', display: 'inline-block' }} />
            </span>
          ))}
        </div>
        <style>{`@keyframes mqScroll{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}`}</style>
      </div>

      {/* ═══════════════════════════════════════════
          INTRO STATEMENT — Archipelago-style
          Full-width editorial, no clutter
      ════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(5rem,12vw,10rem) var(--px)',
        background: 'var(--soil)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem,6vw,8rem)',
        alignItems: 'end',
      }} className="intro-section">
        <ScrollReveal>
          <div style={{ fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--sage)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
            בין אומנות לטבע
            <span style={{ width: 24, height: 1, background: 'var(--sage)', display: 'inline-block' }} />
          </div>
          <h2 style={{
            fontFamily: F,
            fontSize: 'clamp(3rem,7vw,7.5rem)',
            fontWeight: 300, lineHeight: .92,
            letterSpacing: '-.02em',
            margin: 0,
          }}>
            ארבעה<br />
            מתחמים.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>גליל אחד.</em>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p style={{
            fontSize: 'clamp(1rem,1.8vw,1.15rem)',
            lineHeight: 1.9,
            color: 'rgba(242,237,227,.55)',
            maxWidth: '38ch',
            marginBottom: '2.5rem',
          }}>
            מתחמים שנולדו מאהבה אמיתית למקום. כל אחד עם אופי שונה, כולם עם נשמה משותפת — הגליל המערבי.
          </p>
          <a href="https://wa.me/972523983394?text=שלום! אני מחפש מתחם נופש בגליל"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '.8rem',
              fontSize: '.7rem', letterSpacing: '.14em',
              color: 'var(--cream)', border: '1px solid rgba(242,237,227,.25)',
              padding: '.9rem 2rem',
              transition: 'border-color .3s',
              textDecoration: 'none',
            }}>
            ייעוץ חינם ב-WhatsApp
            <span style={{ fontSize: '1rem' }}>←</span>
          </a>
        </ScrollReveal>
        <style>{`.intro-section { @media(max-width:768px){ grid-template-columns:1fr !important; gap: 2rem !important; } }`}</style>
      </section>

      {/* ═══════════════════════════════════════════
          PROPERTIES — Archipelago-style
          Large numbered list + image reveal
      ════════════════════════════════════════════ */}
      <section style={{ background: 'var(--bark)', overflow: 'hidden' }}>
        {/* Section header */}
        <div style={{
          padding: 'clamp(3rem,6vw,5rem) var(--px) clamp(2rem,4vw,3.5rem)',
          borderBottom: '1px solid rgba(122,158,95,.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '.6rem', letterSpacing: '.3em', color: 'rgba(242,237,227,.3)' }}>
            המתחמים — 01 / 04
          </span>
          <span style={{ fontSize: '.6rem', letterSpacing: '.2em', color: 'rgba(242,237,227,.3)' }}>
            גליל מערבי, ישראל
          </span>
        </div>

        {/* Property rows */}
        {locations.map((loc, i) => (
          <ScrollReveal key={loc.slug}>
            <Link href={`/${loc.slug}`} style={{ textDecoration: 'none' }}>
              <div className="prop-row" style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr auto',
                alignItems: 'center',
                gap: 'clamp(1rem,3vw,3rem)',
                padding: 'clamp(1.5rem,3vw,2.5rem) var(--px)',
                borderBottom: '1px solid rgba(122,158,95,.08)',
                cursor: 'pointer',
                transition: 'background .4s',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Hover image bg */}
                <div className="prop-row-img" style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  opacity: 0, transition: 'opacity .6s',
                }}>
                  <Image src={loc.imageFeatured || loc.image} alt="" fill style={{ objectFit: 'cover', filter: 'brightness(.15) saturate(1.5)' }} sizes="100vw" />
                </div>

                {/* Number */}
                <div style={{
                  fontFamily: F, fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontWeight: 300,
                  color: `rgba(${loc.colorRgb},.35)`, lineHeight: 1,
                  position: 'relative', zIndex: 1,
                }}>
                  {loc.num}
                </div>

                {/* Name + meta */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    fontFamily: F, fontSize: 'clamp(1.4rem,3.5vw,3rem)',
                    fontWeight: 300, color: 'var(--cream)', lineHeight: 1.1,
                    marginBottom: '.4rem',
                  }}>
                    {loc.nameParts.regular}{' '}
                    <em style={{ fontStyle: 'italic', color: loc.color }}>{loc.nameParts.colored}</em>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '.62rem', letterSpacing: '.1em', color: 'rgba(242,237,227,.3)' }}>{loc.region}</span>
                    <span style={{ fontSize: '.62rem', letterSpacing: '.1em', color: 'rgba(242,237,227,.3)' }}>עד {loc.capacity} אורחים</span>
                    <span style={{ fontSize: '.62rem', letterSpacing: '.1em', color: loc.color }}>מ-₪{loc.priceFrom.toLocaleString()} / לילה</span>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  width: 40, height: 40, border: `1px solid rgba(${loc.colorRgb},.2)`,
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: loc.color, fontSize: '1rem',
                  position: 'relative', zIndex: 1,
                  transition: 'background .3s, border-color .3s',
                  flexShrink: 0,
                }}>
                  ←
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}

        <style>{`
          .prop-row:hover { background: rgba(28,26,22,.4); }
          .prop-row:hover .prop-row-img { opacity: 1; }
          @media(max-width:600px) {
            .prop-row { grid-template-columns: 48px 1fr auto !important; gap: 1rem !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════
          EXPERIENCE GRID — 2 col on mobile, Archipelago-style
      ════════════════════════════════════════════ */}
      <section style={{ background: 'var(--soil)', padding: 'clamp(5rem,10vw,9rem) var(--px)' }}>
        <ScrollReveal style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div style={{ fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--sage)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
            חוויות <span style={{ width: 24, height: 1, background: 'var(--sage)', display: 'inline-block' }} />
          </div>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2.5rem,6vw,6rem)', fontWeight: 300, lineHeight: .95, margin: 0 }}>
            מה מחכה<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>לכם כאן</em>
          </h2>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }} className="exp-grid-new">
          {[
            { icon: '💑', title: 'סוף שבוע זוגי', desc: 'ג׳קוזי פרטי, קמין, פרטיות מוחלטת מול הנוף.', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80&auto=format&fit=crop', color: 'var(--sky)' },
            { icon: '👨‍👩‍👧‍👦', title: 'חופשה משפחתית', desc: 'בריכה, חצר, גריל ומרחב לילדים לרוץ.', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop', color: 'var(--leaf)' },
            { icon: '✡️', title: 'שבת חתן', desc: 'הפרדה מלאה, כשרות, לוגיסטיקה מושלמת.', img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80&auto=format&fit=crop', color: 'var(--terra)' },
            { icon: '🥾', title: 'טבע ואוויר', desc: 'מסלולים, נחל כזיב, יקבי בוטיק, שקט מוחלט.', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&auto=format&fit=crop', color: 'var(--forest)' },
          ].map((exp, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div style={{
                position: 'relative',
                aspectRatio: i < 2 ? '4/5' : '16/9',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              }} className="exp-card-new">
                <Image src={exp.img} alt={exp.title} fill style={{ objectFit: 'cover', filter: 'brightness(.55) saturate(1.1)', transition: 'transform .8s cubic-bezier(.16,1,.3,1)' }} sizes="50vw" className="exp-img-new" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,22,.95) 0%, transparent 55%)' }} />
                <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(1.2rem,3vw,2rem)' }}>
                  <div style={{ fontSize: 'clamp(.7rem,2vw,.8rem)', letterSpacing: '.08em', color: exp.color, marginBottom: '.4rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <span style={{ width: 12, height: 1, background: exp.color, display: 'inline-block' }} />
                    {exp.title}
                  </div>
                  <div style={{ fontFamily: F, fontSize: 'clamp(1.1rem,2.5vw,1.6rem)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.2 }}>{exp.desc}</div>
                </div>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: exp.color, zIndex: 3 }} />
              </div>
            </ScrollReveal>
          ))}
        </div>
        <style>{`
          .exp-card-new:hover .exp-img-new { transform: scale(1.04); }
          @media(max-width:600px) {
            .exp-grid-new { grid-template-columns: 1fr !important; }
            .exp-grid-new > * > div { aspect-ratio: 4/3 !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════
          LOCATIONS GRID — card per property
      ════════════════════════════════════════════ */}
      <section id="locations" style={{ background: 'var(--bark)', padding: 'clamp(5rem,10vw,9rem) var(--px)' }}>
        <ScrollReveal style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--sage)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
                כל המתחמים <span style={{ width: 24, height: 1, background: 'var(--sage)', display: 'inline-block' }} />
              </div>
              <h2 style={{ fontFamily: F, fontSize: 'clamp(2.5rem,6vw,6rem)', fontWeight: 300, lineHeight: .95, margin: 0 }}>
                בחרו את<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>המתחם שלכם</em>
              </h2>
            </div>
            <div className="scroll-hint-mobile" style={{ display: 'none', alignItems: 'center', gap: '.5rem', color: 'var(--muted)', fontSize: '.65rem', letterSpacing: '.1em' }}>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path d="M1 5h18M14 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              גלגלו
            </div>
          </div>
        </ScrollReveal>

        <div className="locations-grid">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.slug} delay={i * 0.1}>
              <GridLocationCard loc={loc} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          REVIEWS — clean, Archipelago minimal
      ════════════════════════════════════════════ */}
      <section style={{ background: 'var(--soil)', padding: 'clamp(5rem,10vw,9rem) var(--px)' }}>
        <ScrollReveal style={{ marginBottom: 'clamp(3rem,6vw,5rem)', maxWidth: '44ch' }}>
          <div style={{ fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--sage)', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '.7rem' }}>
            ביקורות <span style={{ width: 24, height: 1, background: 'var(--sage)', display: 'inline-block' }} />
          </div>
          <h2 style={{ fontFamily: F, fontSize: 'clamp(2.5rem,6vw,6rem)', fontWeight: 300, lineHeight: .95, margin: 0 }}>
            הם כבר<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>היו כאן</em>
          </h2>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(122,158,95,.08)' }} className="reviews-grid-new">
          {[
            { quote: 'החופשה הכי טובה שהיתה לנו מזה שנים. הג׳קוזי מול הנוף בלילה, הקמין, הפרטיות — פשוט קסם.', who: 'דנה וגל כהן', where: 'אחוזה בגליל', color: 'var(--sky)' },
            { quote: 'ארגנו שבת חתן ל-45 אורחים. הכל התנהל מושלם — המתחם, השירות, הגמישות.', who: 'משפחת לוי', where: 'אחוזת קלמנטין', color: 'var(--terra-lt)' },
            { quote: 'עם שלושה ילדים קטנים מצאנו מקום שהם היו מאושרים ואנחנו באמת נחנו.', who: 'רחל ואייל ברנע', where: 'מתחם צוריאל', color: 'var(--sky-lt)' },
            { quote: 'הכפר, הנוף, האנשים — פקיעין היא חוויה שאי אפשר לשחזר בשום מקום אחר.', who: 'שושי ומשה אברהם', where: 'כפר פקיעין', color: 'var(--fern)' },
          ].map((r, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div style={{ background: 'var(--soil)', padding: 'clamp(2rem,4vw,3.5rem)', height: '100%' }}>
                <div style={{ color: r.color, fontSize: '.75rem', letterSpacing: '.2em', marginBottom: '1.5rem' }}>★★★★★</div>
                <p style={{
                  fontFamily: F, fontSize: 'clamp(1rem,1.8vw,1.15rem)',
                  fontStyle: 'italic', fontWeight: 300, lineHeight: 1.7,
                  color: 'rgba(242,237,227,.8)', marginBottom: '2rem',
                }}>
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div style={{ fontSize: '.65rem', letterSpacing: '.1em', color: r.color }}>{r.who}</div>
                <div style={{ fontSize: '.6rem', color: 'rgba(242,237,227,.3)', marginTop: '.2rem' }}>{r.where}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <style>{`
          @media(max-width:600px) {
            .reviews-grid-new { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — full-bleed, Archipelago-style
          Single message, single action
      ════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=75&auto=format&fit=crop"
          alt="" fill style={{ objectFit: 'cover', filter: 'brightness(.3) saturate(1.4)' }} sizes="100vw"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(45,80,22,.5) 0%, transparent 65%), rgba(28,26,22,.4)' }} />

        <div style={{ position: 'relative', zIndex: 2, padding: 'var(--px)' }}>
          <ScrollReveal>
            <div style={{ fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--sage)', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.7rem' }}>
              <span style={{ width: 24, height: 1, background: 'var(--sage)', display: 'inline-block' }} />
              בואו נדבר
              <span style={{ width: 24, height: 1, background: 'var(--sage)', display: 'inline-block' }} />
            </div>
            <h2 style={{
              fontFamily: F,
              fontSize: 'clamp(3.5rem,9vw,9rem)',
              fontWeight: 300, lineHeight: .9,
              letterSpacing: '-.02em',
              marginBottom: '2.5rem',
            }}>
              מוכנים<br />
              <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>להזמין?</em>
            </h2>
            <p style={{ fontSize: 'clamp(.9rem,1.6vw,1rem)', color: 'rgba(242,237,227,.5)', maxWidth: '38ch', margin: '0 auto 3rem', lineHeight: 1.85 }}>
              דברו איתנו — נשמע מה אתם מחפשים ונמליץ על המתחם הנכון.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/972523983394?text=שלום! אני מחפש מתחם נופש בגליל"
                target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#25D366', color: '#fff',
                  fontSize: '.72rem', letterSpacing: '.1em',
                  padding: '1.1rem 2.4rem',
                  display: 'inline-flex', alignItems: 'center', gap: '.6rem',
                  textDecoration: 'none', minHeight: 52,
                }}>
                💬 WhatsApp — מענה מיידי
              </a>
              <a href="tel:+972523983394"
                style={{
                  fontSize: '.72rem', letterSpacing: '.1em',
                  color: 'rgba(242,237,227,.6)',
                  border: '1px solid rgba(242,237,227,.2)',
                  padding: '1.1rem 2rem',
                  display: 'inline-flex', alignItems: 'center',
                  textDecoration: 'none', minHeight: 52,
                }}>
                📞 052-398-3394
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}

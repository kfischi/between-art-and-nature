import { locations } from '@/lib/locations'
import Link from 'next/link'
import Image from 'next/image'

const F = "'Frank Ruhl Libre', Georgia, serif"
const WA = 'https://wa.me/972523983394?text=שלום! אני מחפש מתחם נופש בגליל'

// Cloudinary: serve mobile-optimised images (800px wide, auto quality/format)
function mobileImg(url: string): string {
  if (!url.includes('cloudinary.com')) return url
  return url.replace('/upload/', '/upload/w_800,q_auto,f_auto,c_fill,g_auto/')
}
// Hero needs slightly wider
function heroImg(url: string): string {
  if (!url.includes('cloudinary.com')) return url
  return url.replace('/upload/', '/upload/w_1200,q_auto,f_auto,c_fill,g_auto/')
}

export default function HomePage() {
  return (
    <>
      {/* ══ STICKY WHATSAPP BAR ══ */}
      <a href={WA} target="_blank" rel="noopener noreferrer" className="wa-bar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        יצירת קשר ב-WhatsApp
      </a>

      {/* ══ HERO — first property, priority load ══ */}
      <section className="home-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImg(locations[0].imageFeatured || locations[0].image)}
          alt="בין אומנות לטבע — נופש בגליל"
          className="home-hero-img"
          fetchPriority="high"
          decoding="async"
        />
        <div className="home-hero-grad" />
        <div className="home-hero-content">
          <div className="home-eyebrow">
            <span className="home-eyebrow-line" />
            גליל מערבי, ישראל
          </div>
          <h1 className="home-h1">
            בין<br />
            <em style={{ color: '#7A9E5F' }}>אומנות</em><br />
            לטבע
          </h1>
          <p className="home-hero-sub">
            ארבעה מתחמים ייחודיים בגליל — לזוגות, משפחות ואירועים.
          </p>
          <a href="#properties" className="home-hero-cta">
            גלו את המתחמים ↓
          </a>
        </div>
      </section>

      {/* ══ PROPERTIES — full-height cards, scroll ══ */}
      <section id="properties">
        {locations.map((loc, i) => (
          <Link key={loc.slug} href={`/${loc.slug}`} className="prop-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mobileImg(loc.imageFeatured || loc.image)}
              alt={loc.name}
              className="prop-card-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="prop-card-grad" />
            <div className="prop-card-bar" style={{ background: loc.color }} />
            <div className="prop-card-num" style={{ color: `rgba(${loc.colorRgb},.18)` }}>
              {loc.num}
            </div>
            <div className="prop-card-body">
              {/* Pills */}
              <div className="prop-pills">
                {loc.pills.slice(0, 3).map(p => (
                  <span key={p} className="prop-pill" style={{
                    background: `rgba(${loc.colorRgb},.15)`,
                    border: `1px solid rgba(${loc.colorRgb},.35)`,
                    color: loc.color,
                  }}>{p}</span>
                ))}
              </div>
              {/* Name */}
              <h2 className="prop-name">
                {loc.nameParts.regular}{' '}
                <em style={{ fontStyle: 'italic', color: loc.color }}>{loc.nameParts.colored}</em>
              </h2>
              {/* Tagline */}
              <p className="prop-tagline">{loc.tagline}</p>
              {/* Price + CTA */}
              <div className="prop-footer">
                <div>
                  <div className="prop-from">מתחיל מ</div>
                  <div className="prop-price" style={{ color: loc.color }}>
                    ₪{loc.priceFrom.toLocaleString()}
                    <span className="prop-night"> / לילה</span>
                  </div>
                </div>
                <div className="prop-btn" style={{ background: loc.color }}>
                  לדף המתחם ←
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ══ EXPERIENCES — 2×2 grid ══ */}
      <section className="exp-section">
        <div className="section-header">
          <div className="section-eyebrow">
            חוויות <span className="eyebrow-line" />
          </div>
          <h2 className="section-h2">
            מה מחכה<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>לכם כאן</em>
          </h2>
        </div>
        <div className="exp-grid">
          {[
            { title: 'סוף שבוע זוגי', desc: 'ג׳קוזי, קמין ופרטיות', img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=70&auto=format&fit=crop', color: '#7BAECB' },
            { title: 'משפחתי', desc: 'בריכה, חצר וגריל', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=70&auto=format&fit=crop', color: '#7A9E5F' },
            { title: 'שבת חתן', desc: 'כשרות והפרדה', img: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=70&auto=format&fit=crop', color: '#D4865A' },
            { title: 'טיולים', desc: 'מסלולים ונחל כזיב', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=70&auto=format&fit=crop', color: '#A8C278' },
          ].map((exp, i) => (
            <div key={i} className="exp-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={exp.img} alt={exp.title} className="exp-card-img" loading="lazy" decoding="async" />
              <div className="exp-card-grad" />
              <div className="exp-card-bar" style={{ background: exp.color }} />
              <div className="exp-card-body">
                <div className="exp-card-title" style={{ color: exp.color }}>{exp.title}</div>
                <div className="exp-card-desc">{exp.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section className="reviews-section">
        <div className="section-header">
          <div className="section-eyebrow">
            ביקורות <span className="eyebrow-line" />
          </div>
          <h2 className="section-h2">
            הם כבר<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>היו כאן</em>
          </h2>
        </div>
        <div className="reviews-list">
          {[
            { quote: 'החופשה הכי טובה שהיתה לנו מזה שנים. הג׳קוזי מול הנוף בלילה — פשוט קסם.', who: 'דנה וגל כהן', where: 'אחוזה בגליל', color: '#7BAECB' },
            { quote: 'ארגנו שבת חתן ל-45 אורחים. הכל התנהל מושלם — המתחם, השירות, הגמישות.', who: 'משפחת לוי', where: 'אחוזת קלמנטין', color: '#D4865A' },
            { quote: 'עם שלושה ילדים קטנים מצאנו מקום שהם מאושרים ואנחנו באמת נחנו.', who: 'רחל ואייל ברנע', where: 'מתחם צוריאל', color: '#7BAECB' },
            { quote: 'פקיעין היא חוויה שאי אפשר לשחזר — הכפר, הנוף, האנשים.', who: 'שושי ומשה אברהם', where: 'כפר פקיעין', color: '#A8C278' },
          ].map((r, i) => (
            <div key={i} className="review-card" style={{ borderRightColor: r.color }}>
              <div className="review-stars" style={{ color: r.color }}>★★★★★</div>
              <p className="review-quote">&ldquo;{r.quote}&rdquo;</p>
              <div className="review-who" style={{ color: r.color }}>{r.who}</div>
              <div className="review-where">{r.where}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-section">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
          <span className="eyebrow-line" />
          יש לכם שאלות?
          <span className="eyebrow-line" />
        </div>
        <h2 className="cta-h2">
          דברו<br /><em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>איתנו</em>
        </h2>
        <p className="cta-sub">נשמע מה אתם מחפשים ונמליץ על המתחם הנכון.</p>
        <div className="cta-btns">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="cta-wa">
            💬 WhatsApp — מענה מיידי
          </a>
          <a href="tel:+972523983394" className="cta-tel">📞 052-398-3394</a>
        </div>
      </section>

      <style>{`
        /* ── WA Bar ── */
        .wa-bar {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 8000;
          background: #25D366; color: #fff;
          display: flex; align-items: center; justify-content: center; gap: .6rem;
          padding: 1rem; font-size: .9rem; font-weight: 500; letter-spacing: .04em;
          text-decoration: none; box-shadow: 0 -4px 20px rgba(0,0,0,.3);
        }
        @media (min-width: 900px) { .wa-bar { display: none !important; } }

        /* ── Hero ── */
        .home-hero {
          position: relative; height: 100svh; overflow: hidden;
          background: var(--soil);
        }
        .home-hero-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }
        .home-hero-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(28,26,22,.96) 0%, rgba(28,26,22,.35) 55%, rgba(28,26,22,.1) 100%);
        }
        .home-hero-content {
          position: absolute; bottom: calc(5rem + env(safe-area-inset-bottom));
          right: 0; left: 0; padding: 0 1.5rem;
        }
        .home-eyebrow {
          font-size: .6rem; letter-spacing: .28em; color: rgba(122,158,95,.9);
          display: flex; align-items: center; gap: .6rem; margin-bottom: 1rem;
        }
        .home-eyebrow-line {
          width: 18px; height: 1px; background: #7A9E5F; display: inline-block;
        }
        .home-h1 {
          font-family: ${F}; font-size: clamp(3.2rem, 14vw, 5.5rem);
          font-weight: 300; line-height: .88; margin: 0 0 1.2rem;
          letter-spacing: -.01em; color: var(--cream);
        }
        .home-hero-sub {
          font-size: clamp(.85rem, 3.5vw, 1rem); color: rgba(242,237,227,.55);
          line-height: 1.7; margin: 0 0 2rem; max-width: 30ch;
        }
        .home-hero-cta {
          display: inline-flex; align-items: center; gap: .6rem;
          font-size: .72rem; letter-spacing: .12em; color: var(--cream);
          border: 1px solid rgba(242,237,227,.3); padding: .85rem 1.8rem;
          text-decoration: none;
        }

        /* ── Property cards ── */
        .prop-card {
          display: block; position: relative;
          height: 92svh; overflow: hidden;
          border-bottom: 3px solid var(--soil);
          text-decoration: none; background: var(--soil);
        }
        .prop-card-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          transition: transform .8s;
        }
        .prop-card:active .prop-card-img { transform: scale(1.02); }
        .prop-card-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(28,26,22,.98) 0%, rgba(28,26,22,.45) 50%, rgba(28,26,22,.05) 80%);
        }
        .prop-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px; z-index: 3;
        }
        .prop-card-num {
          position: absolute; top: 1.2rem; left: 1.2rem;
          font-family: ${F}; font-size: clamp(5rem, 22vw, 9rem);
          font-weight: 300; line-height: 1; z-index: 2; user-select: none;
        }
        .prop-card-body {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 3;
          padding: 2rem 1.5rem calc(1.5rem + env(safe-area-inset-bottom));
        }
        .prop-pills { display: flex; gap: .4rem; flex-wrap: wrap; margin-bottom: .9rem; }
        .prop-pill {
          font-size: .58rem; letter-spacing: .06em;
          padding: .22rem .65rem; border-radius: 20px;
        }
        .prop-name {
          font-family: ${F}; font-size: clamp(2rem, 9vw, 3.2rem);
          font-weight: 300; line-height: 1; margin: 0 0 .5rem; color: var(--cream);
        }
        .prop-tagline {
          font-size: clamp(.78rem, 3vw, .9rem); color: rgba(242,237,227,.55);
          margin: 0 0 1.4rem; line-height: 1.5;
        }
        .prop-footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
        .prop-from { font-size: .52rem; letter-spacing: .1em; color: rgba(242,237,227,.35); margin-bottom: .2rem; }
        .prop-price { font-family: ${F}; font-size: clamp(1.5rem, 6.5vw, 2.2rem); font-weight: 300; }
        .prop-night { font-size: .62rem; color: rgba(242,237,227,.4); }
        .prop-btn {
          color: #fff; padding: .85rem 1.3rem;
          font-size: .72rem; letter-spacing: .08em; flex-shrink: 0;
        }

        /* ── Experiences ── */
        .exp-section { background: var(--bark); padding: 4rem 1.25rem; }
        .exp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
        .exp-card { position: relative; aspect-ratio: 3/4; overflow: hidden; }
        .exp-card-img {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; filter: brightness(.55);
        }
        .exp-card-grad { position: absolute; inset: 0; background: linear-gradient(to top, rgba(28,26,22,.95) 0%, transparent 55%); }
        .exp-card-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; z-index: 2; }
        .exp-card-body { position: absolute; bottom: 0; left: 0; right: 0; padding: .9rem; z-index: 2; }
        .exp-card-title { font-size: .6rem; letter-spacing: .06em; margin-bottom: .3rem; }
        .exp-card-desc { font-family: ${F}; font-size: clamp(.82rem, 3.2vw, .95rem); font-weight: 300; color: var(--cream); line-height: 1.2; }

        /* ── Reviews ── */
        .reviews-section { background: var(--soil); padding: 4rem 1.25rem; }
        .reviews-list { display: flex; flex-direction: column; gap: 2px; }
        .review-card {
          background: var(--bark); padding: 1.8rem 1.5rem;
          border-right: 3px solid; border-left: none;
        }
        .review-stars { font-size: .72rem; letter-spacing: .15em; margin-bottom: 1rem; }
        .review-quote {
          font-family: ${F}; font-size: clamp(.92rem, 3.5vw, 1.05rem);
          font-style: italic; font-weight: 300; line-height: 1.7;
          color: rgba(242,237,227,.85); margin: 0 0 1.2rem;
        }
        .review-who { font-size: .65rem; letter-spacing: .08em; }
        .review-where { font-size: .6rem; color: rgba(242,237,227,.3); margin-top: .2rem; }

        /* ── CTA ── */
        .cta-section {
          background: var(--bark); text-align: center;
          padding: 5rem 1.5rem calc(7rem + env(safe-area-inset-bottom));
          border-top: 1px solid rgba(122,158,95,.1);
        }
        .cta-h2 {
          font-family: ${F}; font-size: clamp(3rem, 12vw, 5.5rem);
          font-weight: 300; line-height: .88; margin: .8rem 0 1.5rem;
        }
        .cta-sub {
          font-size: .9rem; color: rgba(242,237,227,.45); line-height: 1.8;
          margin: 0 auto 2.5rem; max-width: 30ch;
        }
        .cta-btns { display: flex; flex-direction: column; gap: .8rem; max-width: 320px; margin: 0 auto; }
        .cta-wa {
          background: #25D366; color: #fff;
          padding: 1.1rem; font-size: .85rem; letter-spacing: .06em;
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          text-decoration: none; min-height: 54px;
        }
        .cta-tel {
          color: rgba(242,237,227,.55); border: 1px solid rgba(242,237,227,.15);
          padding: 1.1rem; font-size: .85rem; letter-spacing: .06em;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; min-height: 54px;
        }

        /* ── Shared ── */
        .section-header { margin-bottom: 2.5rem; }
        .section-eyebrow {
          font-size: .6rem; letter-spacing: .28em; color: var(--sage);
          display: flex; align-items: center; gap: .6rem; margin-bottom: .8rem;
        }
        .eyebrow-line { width: 18px; height: 1px; background: var(--sage); display: inline-block; }
        .section-h2 {
          font-family: ${F}; font-size: clamp(2rem, 8.5vw, 3.5rem);
          font-weight: 300; line-height: .92; margin: 0;
        }

        /* ── Desktop overrides ── */
        @media (min-width: 900px) {
          body { padding-bottom: 0; }
          .home-hero-content { bottom: 6rem; padding: 0 4rem; }
          .prop-card { height: 85svh; }
          .prop-card-body { padding: 3rem 4rem; }
          .exp-section, .reviews-section, .cta-section { padding: 6rem 4rem; }
          .exp-grid { grid-template-columns: repeat(4, 1fr); }
          .exp-card { aspect-ratio: 2/3; }
          .reviews-list { display: grid; grid-template-columns: 1fr 1fr; }
          .cta-btns { flex-direction: row; max-width: unset; justify-content: center; }
        }

        /* ── Mobile bottom padding (WA bar) ── */
        @media (max-width: 899px) {
          body { padding-bottom: 62px; }
        }
      `}</style>
    </>
  )
}

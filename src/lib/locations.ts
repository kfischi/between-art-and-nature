export type Location = {
  id: string
  slug: string
  num: string
  name: string
  nameParts: { regular: string; colored: string }
  tagline: string
  region: string
  type: string
  capacity: number
  priceFrom: number
  color: string
  colorRgb: string
  colorBg: string
  waText: string
  image: string
  imageFeatured?: string
  featured?: boolean
  badge?: string
  features: string[]
  pills: string[]
  description: string
  longDescription: string
  gallery: string[]
  experiences: string[]
}

export const locations: Location[] = [
  {
    id: 'achuzat-klementina',
    slug: 'achuzat-klementina',
    num: '01',
    name: 'אחוזת קלמנטין',
    nameParts: { regular: 'אחוזת', colored: 'קלמנטין' },
    tagline: 'וילה היסטורית בלב הגליל',
    region: 'רמת ישי · גליל תחתון',
    type: 'וילה יוקרה',
    capacity: 30,
    priceFrom: 2800,
    color: '#7A9E5F',
    colorRgb: '122,158,95',
    colorBg: 'rgba(74,124,47,.2)',
    waText: 'שלום, מעוניין לשמוע על אחוזת קלמנטין',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp',
    imageFeatured: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp',
    featured: true,
    badge: 'מומלץ',
    features: ['🏊 בריכה פרטית', '🛁 ג׳קוזי', '🔥 קמין', '🕍 שבת חתן'],
    pills: ['בריכה פרטית', 'ג׳קוזי', 'קמין', 'שבת חתן', 'עד 30 אורחים'],
    description: 'וילה היסטורית מרשימה עם בריכה פרטית, גינה מטופחת ואפשרות לאירועים עד 30 אורחים.',
    longDescription: 'אחוזת קלמנטין היא וילה יוקרתית הנסמכת על קרקע היסטורית בגליל התחתון. הבית נבנה בתחילת המאה ה-20 ועבר שיפוץ מדוקדק תוך שמירה על אופיו המקורי. הבריכה הפרטית, הגינה הרחבה, הקמין והג׳קוזי יוצרים חוויה שמשלבת עבר ועתיד.',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401401/9_mwbfrq.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401399/8_muhjiq.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401396/7_uv1fqk.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401392/6_bvifvx.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401391/5_oc93v5.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401389/4_lx73rn.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401386/3_tgup62.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401385/2_wm9hcm.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp',
    ],
    experiences: ['חופשה זוגית', 'חופשה משפחתית', 'שבת חתן', 'אירועים'],
  },
  {
    id: 'achuzah-bagalil',
    slug: 'achuzah-bagalil',
    num: '02',
    name: 'אחוזה בגליל',
    nameParts: { regular: 'אחוזה', colored: 'בגליל' },
    tagline: 'טבע, שקט ונוף אינסופי',
    region: 'גליל מערבי',
    type: 'אחוזת טבע',
    capacity: 10,
    priceFrom: 950,
    color: '#7BAECB',
    colorRgb: '123,174,203',
    colorBg: 'rgba(74,127,165,.2)',
    waText: 'שלום, מעוניין לשמוע על האחוזה בגליל',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771705563/WhatsApp_Image_2026-02-19_at_22.03.38_1_ojldo9.jpg',
    imageFeatured: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771705563/WhatsApp_Image_2026-02-19_at_22.03.38_1_ojldo9.jpg',
    features: ['🛁 ג׳קוזי פרטי', '🔥 קמין עצים', '🌄 נוף פנורמי', '🌿 שקט מוחלט'],
    pills: ['ג׳קוזי פרטי', 'קמין עצים', 'נוף פנורמי', 'עד 10 אורחים'],
    description: 'אחוזה אינטימית בלב הטבע הגלילי עם ג׳קוזי פרטי, קמין ונוף שלא נגמר.',
    longDescription: 'האחוזה בגליל מציעה חוויית נופש אינטימית ומושלמת. בקתות פרטיות עם ג׳קוזי חיצוני, קמין בוער בערבות החורף ונוף פנורמי על הגליל המערבי. המקום מתאים לזוגות ומשפחות קטנות שמחפשים שקט אמיתי.',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771705563/WhatsApp_Image_2026-02-19_at_22.03.38_1_ojldo9.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771705562/WhatsApp_Image_2026-02-19_at_22.03.37_7_fwm7yz.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771705569/WhatsApp_Image_2026-02-19_at_22.03.38_5_ikcgvp.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771706994/6_lt7xxt.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771706986/4_su0u31.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771706985/1_zxjkwe.jpg',
    ],
    experiences: ['חופשה זוגית', 'חופשה משפחתית', 'טבע והרפתקאות'],
  },
  {
    id: 'granot',
    slug: 'granot',
    num: '03',
    name: 'מתחם גרנות',
    nameParts: { regular: 'מתחם', colored: 'גרנות' },
    tagline: 'כפרי, בוהמיאני, בלתי נשכח',
    region: 'גרנות הגליל · גליל מרכזי',
    type: 'מתחם חקלאי',
    capacity: 20,
    priceFrom: 1400,
    color: '#D4865A',
    colorRgb: '212,134,90',
    colorBg: 'rgba(181,96,42,.2)',
    waText: 'שלום, מעוניין לשמוע על מתחם גרנות',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=75&auto=format&fit=crop',
    imageFeatured: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop',
    features: ['🌾 שדות פתוחים', '🔥 BBQ ענק', '🎪 אווירה בוהמיאנית', '🎉 אירועים'],
    pills: ['שדות פתוחים', 'BBQ ענק', 'בוהמיאני', 'עד 20 אורחים'],
    description: 'מתחם חקלאי-בוהמיאני ייחודי עם שדות פתוחים, BBQ ענק ואווירה שאי אפשר לשכוח.',
    longDescription: 'מתחם גרנות הוא מקום שנוצר לאנשים שאוהבים את האדמה. שדות פתוחים לכל הכיוונים, עצי זית עתיקים, מטבח חיצוני מאובזר וגריל שמזמין לבשל יחד. מתאים לאירועים, ימי גיבוש ומשפחות שרוצות חוויה אמיתית.',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80&auto=format&fit=crop',
    ],
    experiences: ['חופשה משפחתית', 'שבת חתן', 'אירועים', 'ימי גיבוש'],
  },
  {
    id: 'pekiin',
    slug: 'pekiin',
    num: '04',
    name: 'כפר פקיעין',
    nameParts: { regular: 'כפר', colored: 'פקיעין' },
    tagline: 'היסטוריה, תרבות ואדריכלות עתיקה',
    region: 'פקיעין · גליל עליון',
    type: 'כפר עתיק',
    capacity: 10,
    priceFrom: 800,
    color: '#A8C278',
    colorRgb: '168,194,120',
    colorBg: 'rgba(168,194,120,.15)',
    waText: 'שלום, מעוניין לשמוע על כפר פקיעין',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&q=75&auto=format&fit=crop',
    imageFeatured: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80&auto=format&fit=crop',
    features: ['🏛️ ארכיטקטורה עתיקה', '🥙 תרבות דרוזית', '🥾 שבילי טבע', '📜 היסטוריה'],
    pills: ['ארכיטקטורה עתיקה', 'תרבות דרוזית', 'שבילי טבע', 'עד 10 אורחים'],
    description: 'חוויה תרבותית ייחודית בכפר הדרוזי העתיק פקיעין עם ארכיטקטורה היסטורית ושבילי טבע.',
    longDescription: 'פקיעין הוא אחד הכפרים העתיקים בישראל — מקום שבו ההיסטוריה נושמת מכל אבן. לינה בבתים עתיקים משוחזרים עם אדריכלות ייחודית, אוכל דרוזי אותנטי ושבילי טבע שמובילים לנוף עוצר נשימה.',
    gallery: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop',
    ],
    experiences: ['חופשה זוגית', 'חופשה משפחתית', 'טבע והרפתקאות'],
  },
]

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

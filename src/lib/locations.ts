export type Room = {
  name: string
  capacity: string
  beds: string
  features: string[]
  icon: string
}

export type Attraction = {
  name: string
  distance: string
  type: string
  description: string
  icon: string
}

export type FoodSpot = {
  name: string
  type: string
  distance: string
  highlight: string
}

export type TrailRoute = {
  name: string
  difficulty: 'קל' | 'בינוני' | 'מאתגר'
  duration: string
  distance: string
  description: string
}

export type Location = {
  id: string
  slug: string
  num: string
  name: string
  nameParts: { regular: string; colored: string }
  tagline: string
  punchline: string
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
  atmosphere: string
  gallery: string[]
  rooms: Room[]
  forWho: { icon: string; title: string; description: string }[]
  amenities: { category: string; items: string[] }[]
  area: string
  attractions: Attraction[]
  trails: TrailRoute[]
  food: FoodSpot[]
  experiences: string[]
  seoKeywords: string[]
}

// ─────────────────────────────────────────────
export const locations: Location[] = [
  // ══════════════════════════════════════════
  //  01  אחוזת קלמנטין
  // ══════════════════════════════════════════
  {
    id: 'achuzat-klementina',
    slug: 'achuzat-klementina',
    num: '01',
    name: 'אחוזת קלמנטין',
    nameParts: { regular: 'אחוזת', colored: 'קלמנטין' },
    tagline: 'וילה היסטורית בלב הגליל',
    punchline: 'המקום שבו הזמן עוצר',
    region: 'רמת ישי · גליל תחתון',
    type: 'וילה יוקרה',
    capacity: 30,
    priceFrom: 2800,
    color: '#7A9E5F',
    colorRgb: '122,158,95',
    colorBg: 'rgba(74,124,47,.15)',
    waText: 'שלום, מעוניין לשמוע על אחוזת קלמנטין',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp',
    imageFeatured: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp',
    featured: true,
    badge: 'מומלץ',
    features: ['בריכה פרטית מחוממת', 'ג׳קוזי', 'קמין', 'שבת חתן', 'ידידותי לילדים', 'אירועים עד 50'],
    pills: ['בריכה פרטית', 'ג׳קוזי', 'קמין', 'שבת חתן', 'עד 30 אורחים'],
    description: 'וילה היסטורית מרשימה עם בריכה פרטית מחוממת, ג׳קוזי, קמין ואפשרות לאירועים ושבתות חתן.',
    atmosphere: 'כניסה מרשימה בין עצי קלמנטינה, חצר ירוקה ענקית שנפתחת לכיוון הרים. הבוקר מגיע עם ציוצי ציפורים וריח של אדמה לחה. אחוזת קלמנטין היא מקום שגורם לאנשים להוריד כתפיים — לרוב תוך עשר דקות מהכניסה.',
    longDescription: 'אחוזת קלמנטין ניצבת על קרקע שנשמרה בידי אותה משפחה מזה שלושה דורות. הבניין המרכזי, שנבנה בשנות ה-40, עבר שיפוץ מדוקדק שמכבד כל פרט מקורי — רצפות טרצו, קשתות אבן, תקרות עץ — תוך שילוב של נוחות עכשווית מושלמת. הבריכה החיצונית מחוממת לאורך כל השנה, ומוקפת גינה שמטופחת כגן בוטני קטן. ג׳קוזי פרטי, קמין גדול בסלון, ומטבח מאובזר במלואו. המקום מתאים לשבתות חתן עם הפרדה מלאה, אירועי משפחה גדולים, ולחופשות קבוצתיות מפנקות.',
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
    rooms: [
      { name: 'חדר שינה ראשי', capacity: '2 אורחים', beds: 'מיטה זוגית קינג', features: ['חדר אמבטיה פרטי', 'ארון מרווח', 'מזגן'], icon: 'bed' },
      { name: 'חדר שינה 2', capacity: '2 אורחים', beds: 'מיטה זוגית', features: ['גישה לאמבטיה משותפת', 'מזגן'], icon: 'bed' },
      { name: 'חדר שינה 3', capacity: '4 אורחים', beds: '2 מיטות זוגיות', features: ['מתאים למשפחות', 'מזגן'], icon: 'bed' },
      { name: 'חדר שינה 4', capacity: '4 אורחים', beds: '4 מיטות יחיד', features: ['מתאים לילדים או צוות', 'מזגן'], icon: 'bed' },
      { name: 'סוויטת בונוס', capacity: '2 אורחים', beds: 'מיטה זוגית', features: ['חדר אמבטיה עצמאי', 'כניסה נפרדת', 'פרטיות מלאה'], icon: 'suite' },
    ],
    forWho: [
      { icon: 'family', title: 'משפחות גדולות', description: 'חצר בטוחה לילדים, בריכה, BBQ. כשכולם מתאספים — זה המקום הנכון.' },
      { icon: 'couple', title: 'זוגות שרוצים פינוק', description: 'ג׳קוזי, קמין, גינה שקטה. לפעמים הכי טוב זה פשוט לא לצאת מהאחוזה.' },
      { icon: 'star', title: 'שבת חתן', description: 'הפרדה מלאה, תנאים לכשרות, לוגיסטיקה מנוסה. כניסו לשבת בלי ולו דאגה אחת.' },
      { icon: 'event', title: 'אירועים וחגיגות', description: 'ימי הולדת, יובלות, כינוסי משפחה. עד 50 אורחים עם מקום לנשום.' },
      { icon: 'team', title: 'ימי גיבוש', description: 'חברות שרוצות לחזק קשרים מחוץ למשרד — פה יוצא טוב.' },
    ],
    amenities: [
      { category: 'מים ובריכה', items: ['בריכה מחוממת לאורך כל השנה', 'ג׳קוזי חיצוני פרטי', 'שעוני בריכה', 'מגבות'] },
      { category: 'מטבח ואוכל', items: ['מטבח מאובזר במלואו', 'BBQ גדול', 'פינת אוכל חיצונית', 'מקרר אמריקאי'] },
      { category: 'נוחות ושינה', items: ['5 חדרי שינה', 'סלון גדול עם קמין', 'טלוויזיות', 'מזגנים בכל חדר'] },
      { category: 'חוץ וגינה', items: ['גינה ירוקה ענקית', 'פינות ישיבה מוצלות', 'עמדת משחקים לילדים', 'חניה מרווחת'] },
      { category: 'טכנולוגיה', items: ['WiFi מהיר בכל האחוזה', 'מערכת שמע', 'מסכי Smart TV'] },
    ],
    area: 'אחוזת קלמנטין שוכנת ברמת ישי, עיירה שקטה בגליל התחתון, כ-15 דקות דרום מזרח לחיפה. האזור שטוח יחסית, מוקף בשדות חקלאיים ופרדסים, עם נגישות קלה לאטרקציות מרכזיות של הצפון.',
    attractions: [
      { name: 'נחר קישון ורכיבה על סוסים', distance: '8 ק"מ', type: 'טבע', description: 'חוות סוסים עם סיורים מודרכים לאורך נחל קישון המשוקם', icon: 'horse' },
      { name: 'הר הכרמל ושמורת הכרמל', distance: '20 ק"מ', type: 'טבע', description: 'יערות עצי אלון ועצי זית עתיקים, שבילי טיול לכל הרמות', icon: 'tree' },
      { name: 'עכו העתיקה — עיר מורשת עולמית', distance: '35 ק"מ', type: 'תרבות', description: 'מנהרות הצלבנים, שוק העיר העתיקה, חומות ים עוצרות נשימה', icon: 'arch' },
      { name: 'מגידו — נפוליאון ומלכי ישראל', distance: '18 ק"מ', type: 'היסטוריה', description: 'אתר מורשת עולמי של יונסקו. שכבות ציביליזציה מ-7,000 שנה', icon: 'castle' },
      { name: 'בית שאן ועמק המעיינות', distance: '40 ק"מ', type: 'טבע', description: 'מעיינות חמים, שמורת גן השלושה, האמפיתיאטר הרומי', icon: 'arch' },
      { name: 'יקבי בוטיק — גליל תחתון', distance: '15-25 ק"מ', type: 'אוכל ויין', description: 'יקב גלנה, יקב כרמי יוסף — סיורים וטעימות בתיאום מראש', icon: 'wine' },
    ],
    trails: [
      { name: 'שביל הגעתון — שביל ישראל', difficulty: 'קל', duration: '2-3 שעות', distance: '8 ק"מ', description: 'מסלול נוף על שדות ורכסים עם נוף לגלבוע ולעמק יזרעאל' },
      { name: 'הר כמון — שמורת כמון', difficulty: 'בינוני', duration: '4 שעות', distance: '12 ק"מ', description: 'מסלול טבעי עם נוף פנורמי לגולן, הכרמל ועמק הירדן' },
      { name: 'נחל ציפורי — ציפורי', difficulty: 'קל', duration: '1.5 שעות', distance: '5 ק"מ', description: 'שמורת טבע עם נחל, עשבייה ומגוון ציפורים. מתאים לכל הגילאים' },
      { name: 'שביל עלון — הר תבור', difficulty: 'בינוני', duration: '3 שעות', distance: '9 ק"מ', description: 'עלייה לפסגת הר תבור עם נוף של 360 מעלות לכל האזור' },
    ],
    food: [
      { name: 'מסעדת אל-ביאדר', type: 'ערבי-גלילי מסורתי', distance: '5 ק"מ', highlight: 'מוסקה, קיבה, לחמות מהטאבון — מקום שאנשים חוזרים אליו' },
      { name: 'קפה גורן — רמת ישי', type: 'קפה ובוקר', distance: '2 ק"מ', highlight: 'בוקר גלילי עם ביצים, גבינות מקומיות ולחם בוטיק' },
      { name: 'יקב גלנה', type: 'מסעדת יין ואוכל', distance: '14 ק"מ', highlight: 'ארוחות שף לצד יינות בוטיק — אחד המקומות היפים בצפון' },
      { name: 'שוק נשר השבועי', type: 'שוק אורגני', distance: '10 ק"מ', highlight: 'ירקות, גבינות, דבש ומוצרים מקומיים — כל יום שישי בבוקר' },
      { name: 'פיצה פיצה — קריית טבעון', type: 'פיצרייה כשרה', distance: '8 ק"מ', highlight: 'כשרה למהדרין, אפשרות להזמנת משלוח לאחוזה' },
    ],
    experiences: ['חופשה זוגית', 'חופשה משפחתית', 'שבת חתן', 'אירועים', 'ימי גיבוש'],
    seoKeywords: ['אחוזת קלמנטין', 'וילה להשכרה גליל', 'צימר עם בריכה פרטית', 'שבת חתן גליל', 'נופש גליל תחתון', 'וילה עם בריכה רמת ישי'],
  },

  // ══════════════════════════════════════════
  //  02  אחוזה בגליל
  // ══════════════════════════════════════════
  {
    id: 'achuzah-bagalil',
    slug: 'achuzah-bagalil',
    num: '02',
    name: 'אחוזה בגליל',
    nameParts: { regular: 'אחוזה', colored: 'בגליל' },
    tagline: 'טבע, שקט ונוף אינסופי',
    punchline: 'כשהנוף הוא החדר',
    region: 'גליל מערבי',
    type: 'אחוזת טבע',
    capacity: 10,
    priceFrom: 950,
    color: '#7BAECB',
    colorRgb: '123,174,203',
    colorBg: 'rgba(74,127,165,.15)',
    waText: 'שלום, מעוניין לשמוע על האחוזה בגליל',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771705563/WhatsApp_Image_2026-02-19_at_22.03.38_1_ojldo9.jpg',
    imageFeatured: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771705563/WhatsApp_Image_2026-02-19_at_22.03.38_1_ojldo9.jpg',
    atmosphere: 'המקום שבו אתם מגלים שלא צריך כלום — רק נוף, שקט, וכוס קפה חם. הג׳קוזי החיצוני מול הרים, קמין שמחמם את כל החלל, ולילה כל כך שקט ששומעים את הרוח.',
    features: ['ג׳קוזי פרטי', 'קמין עצים', 'נוף פנורמי', 'שקט מוחלט', 'ידידותי לילדים'],
    pills: ['ג׳קוזי פרטי', 'קמין עצים', 'נוף פנורמי', 'עד 10 אורחים'],
    description: 'אחוזה אינטימית בלב הטבע הגלילי עם ג׳קוזי פרטי, קמין ונוף שלא נגמר.',
    longDescription: 'האחוזה בגליל מציעה מה שרוב אנשים מחפשים ולא מוצאים: שקט אמיתי. יחידות לינה פרטיות עם ג׳קוזי חיצוני הפונה לנוף, קמין עצים אמיתי לא גז, ומרפסת שמרגישה כמו קצה העולם. אין רעשי שכנים, אין נורות ניאון, אין תחושת "מלון". יש אחוזה עם ממד פרטי שמעניקה לכם את הנוף כמתנה.',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771705563/WhatsApp_Image_2026-02-19_at_22.03.38_1_ojldo9.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771705562/WhatsApp_Image_2026-02-19_at_22.03.37_7_fwm7yz.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771705569/WhatsApp_Image_2026-02-19_at_22.03.38_5_ikcgvp.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771706994/6_lt7xxt.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771706986/4_su0u31.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771706985/1_zxjkwe.jpg',
    ],
    rooms: [
      { name: 'חדר שינה ראשי', capacity: '2 אורחים', beds: 'מיטה זוגית קינג', features: ['נוף מהחלון', 'חדר אמבטיה פרטי', 'מזגן'], icon: 'bed' },
      { name: 'חדר שינה 2', capacity: '2 אורחים', beds: '2 מיטות יחיד / ניתן לחבר', features: ['מתאים לילדים', 'מזגן'], icon: 'bed' },
      { name: 'מרפסת ג׳קוזי', capacity: 'עד 4 אורחים', beds: '—', features: ['ג׳קוזי חיצוני', 'נוף פנורמי', 'פרטיות מלאה'], icon: 'jacuzzi' },
    ],
    forWho: [
      { icon: 'couple', title: 'זוגות שמחפשים בריחה', description: 'ג׳קוזי, קמין, אין אף אחד. לפעמים הכי אינטימי זה להיות מוקפי טבע.' },
      { icon: '', title: 'משפחה קטנה', description: 'מקום בטוח, שקט, ומרחב שמאפשר לילדים לגלות את הטבע מקרוב.' },
      { icon: 'meditation', title: 'ריטריט אישי', description: 'אם אתם צריכים לנתק, לכתוב, לחשוב, או פשוט לא לעשות כלום — זה בדיוק כאן.' },
      { icon: 'camera', title: 'צלמים ויוצרים', description: 'הנוף בשעת הזהב, הכוכבים בלילה, ואור הבוקר המיוחד של הגליל.' },
    ],
    amenities: [
      { category: 'פינוק ורגיעה', items: ['ג׳קוזי חיצוני פרטי', 'קמין עצים', 'ערכת רחצה מפנקת', 'שמיכות כבדות'] },
      { category: 'מטבח', items: ['מטבח מאובזר', 'כלי קפה', 'BBQ קטן בחצר', 'שולחן אוכל חיצוני'] },
      { category: 'חוץ', items: ['מרפסת נוף רחבה', 'פינת ישיבה חיצונית', 'גינה טבעית'] },
      { category: 'בסיסי', items: ['WiFi', 'מזגן', 'חניה'] },
    ],
    area: 'האחוזה בגליל שוכנת בגליל המערבי, אזור מהיפים בישראל. רכסים ירוקים, כפרים ערביים ודרוזים עתיקים, ונחלים שזורמים גם בקיץ. המרחק לחוף הים: כ-30 דקות.',
    attractions: [
      { name: 'נחל כזיב — נחל קלה', distance: '15 ק"מ', type: 'טבע', description: 'אחד הנחלים הנאים בישראל עם בריכות טבע, מפלים ועצי פלטנוס עצומים', icon: 'water' },
      { name: 'מצודת יחיעם', distance: '8 ק"מ', type: 'היסטוריה', description: 'מבצר צלבני מרשים בראש גבעה עם נוף על הכרמל והגליל', icon: 'castle' },
      { name: 'פארק הכרמל — חוף הים', distance: '30 ק"מ', type: 'טבע', description: 'מהרים לים בפחות מחצי שעה — חוף בת גלים, חוף שקמונה', icon: 'waves' },
      { name: 'כפר ורד — רכיבה על סוסים', distance: '20 ק"מ', type: 'הרפתקה', description: 'טיולי סוסים מודרכים לשמורות ונחלים של הגליל המערבי', icon: 'horse' },
      { name: 'עכו — עיר מורשת עולמית', distance: '25 ק"מ', type: 'תרבות', description: 'מנהרות הצלבנים, שוק הזייתונה, חומות ים ויאכטות. חצי יום מינימום', icon: 'anchor' },
      { name: 'פסטיבל עכו — אוקטובר', distance: '25 ק"מ', type: 'תרבות', description: 'פסטיבל תיאטרון בינלאומי שמפלש את כל הרחובות העתיקים', icon: 'palette' },
    ],
    trails: [
      { name: 'שביל נחל כזיב', difficulty: 'קל', duration: '2 שעות', distance: '6 ק"מ', description: 'מסלול לאורך הנחל עם בריכות טבע להתרחצות — הגן העדן של הגליל' },
      { name: 'מסלול מצודת יחיעם', difficulty: 'קל', duration: '1.5 שעות', distance: '4 ק"מ', description: 'עלייה קצרה למצודה עם נוף פנורמי ומוזיאון קטן בפנים' },
      { name: 'שביל גליל — מסלול ראשי', difficulty: 'בינוני', duration: '5 שעות', distance: '16 ק"מ', description: 'קטע בשביל ישראל דרך יערות, כפרים וגבעות הגליל המערבי' },
      { name: 'ג׳בל ג׳רמק — הנקודה הגבוהה', difficulty: 'מאתגר', duration: '6 שעות', distance: '18 ק"מ', description: 'הנקודה הגבוהה בישראל. נוף לבנון, ים כנרת וחרמון ביום בהיר' },
    ],
    food: [
      { name: 'אבו סאלם — כפר יסיף', type: 'ערבי מסורתי', distance: '12 ק"מ', highlight: 'הומוס שעדיין חם, פול, פלאפל ופיתות מהטאבון. ארוחת בוקר מהממת' },
      { name: 'מסעדת דלאל — מעיליא', type: 'ערבי-צפוני', distance: '10 ק"מ', highlight: 'טאבון, מנסף, ושישליק בתנור. כפר נוצרי שקט עם נוף הרים' },
      { name: 'בית הקפה בסאסא', type: 'קפה בוטיק', distance: '18 ק"מ', highlight: 'קפה בוטיק בכפר פנימי. לחם מחמצת, עוגות, שקט מוחלט' },
      { name: 'שוק יום שישי — כרמיאל', type: 'שוק אורגני', distance: '20 ק"מ', highlight: 'הגדול בצפון. ירקות, גבינות ארטיזניות, דבש ותוצרת מקומית' },
    ],
    experiences: ['חופשה זוגית', 'חופשה משפחתית', 'טבע והרפתקאות'],
    seoKeywords: ['אחוזה בגליל', 'צימר עם ג׳קוזי גליל מערבי', 'נופש שקט גליל', 'צימר עם נוף גליל', 'בית נופש גליל מערבי'],
  },

  // ══════════════════════════════════════════
  //  03  מתחם גרנות
  // ══════════════════════════════════════════
  {
    id: 'granot',
    slug: 'granot',
    num: '03',
    name: 'מתחם גרנות',
    nameParts: { regular: 'מתחם', colored: 'גרנות' },
    tagline: 'כפרי, בוהמיאני, בלתי נשכח',
    punchline: 'הגליל כמו שהוא',
    region: 'גרנות הגליל · גליל מרכזי',
    type: 'מתחם חקלאי',
    capacity: 20,
    priceFrom: 1400,
    color: '#D4865A',
    colorRgb: '212,134,90',
    colorBg: 'rgba(181,96,42,.15)',
    waText: 'שלום, מעוניין לשמוע על מתחם גרנות',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&q=75&auto=format&fit=crop',
    imageFeatured: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80&auto=format&fit=crop',
    atmosphere: 'שדות לכל הכיוונים, עצי זית שגדלו לפני שנולדתם, וריח של אדמה שנחרשה. גרנות הוא מקום שמרגיש כמו ביקור אצל סבא וסבתא — אבל עם BBQ מקצועי ויין טוב.',
    features: ['שדות פתוחים', 'BBQ ענק', 'אווירה בוהמיאנית', 'אירועים', 'שבת חתן'],
    pills: ['שדות פתוחים', 'BBQ ענק', 'בוהמיאני', 'עד 20 אורחים'],
    description: 'מתחם חקלאי-בוהמיאני ייחודי עם שדות פתוחים, BBQ ענק ואווירה שאי אפשר לשכוח.',
    longDescription: 'גרנות הוא מקום שנבנה מאהבה לאדמה. המתחם משלב לינה נוחה עם אווירה כפרית-בוהמיאנית: שדות פתוחים לכל הכיוונים, עצי זית עתיקים שמפרים צל, ומטבח חיצוני מאובזר עם BBQ גדול שמזמין לבשל יחד. בערבות של גרנות, תחת שמי הגליל המרכזי, אנשים מתגלים מחדש — פחות מסכים, יותר שיחות.',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80&auto=format&fit=crop',
    ],
    rooms: [
      { name: 'בית ראשי', capacity: '8 אורחים', beds: '4 חדרי שינה', features: ['מטבח מלא', 'סלון גדול', 'מזגן'], icon: 'house' },
      { name: 'צריף בוהמיאני', capacity: '4 אורחים', beds: '2 חדרי שינה', features: ['עיצוב ייחודי', 'מרפסת', 'כניסה עצמאית'], icon: 'bed' },
      { name: 'אוהל גלאמפינג', capacity: '2-4 אורחים', beds: 'מיטה זוגית + ספות', features: ['חוויה ייחודית', 'רצפת עץ', 'תאורת פיות'], icon: 'tent' },
    ],
    forWho: [
      { icon: 'family', title: 'משפחות גדולות', description: 'שדות לרוץ בהם, BBQ לבשל ביחד, ושקט שילדים אוהבים גם בלי לדעת.' },
      { icon: 'star', title: 'שבת חתן', description: 'שטח גדול להפרדה, מקום לתפילה, לוגיסטיקה של שנות ניסיון.' },
      { icon: 'event', title: 'ימי הולדת וחגיגות', description: 'BBQ, שדות, מקום לרחפן — לחגיגות שמרגישות שונות.' },
      { icon: 'team', title: 'ימי גיבוש', description: 'יציאה מהמשרד לטבע. כשמבשלים יחד, מדברים יחד.' },
    ],
    amenities: [
      { category: 'BBQ ואש', items: ['BBQ מקצועי גדול', 'טאבון ומנגל', 'עמדת הכנת מזון', 'שולחנות ארוכים'] },
      { category: 'שטח פתוח', items: ['שדות עצי זית', 'מגרש לפעילויות', 'גינת ירק קטנה', 'פינות ישיבה מפוזרות'] },
      { category: 'לינה', items: ['3 אפשרויות לינה', 'מצעים ומגבות', 'מזגנים', 'חדרי שירותים מרווחים'] },
      { category: 'בסיסי', items: ['WiFi', 'חניה', 'גנרטור גיבוי'] },
    ],
    area: 'גרנות הגליל ממוקמת בלב הגליל המרכזי, סמוך לבית לחם הגלילית. אזור שקט, חקלאי ברובו, עם נגישות לצפת, הכנרת ונחלים יפים.',
    attractions: [
      { name: 'צפת — עיר הקבלה', distance: '25 ק"מ', type: 'תרבות ורוחניות', description: 'עיר האמנים, הרובע היהודי העתיק, גלריות וסמטאות מרוצפות אבן', icon: 'candle' },
      { name: 'ים כנרת', distance: '35 ק"מ', type: 'טבע', description: 'הים הפנימי הגדול בישראל. שחייה, קיאקים, רכיבת אופניים על שפת המים', icon: 'waves' },
      { name: 'נחל עמוד', distance: '20 ק"מ', type: 'טבע', description: 'ממערות הפרהיסטוריה ועד הכנרת — נחל עם מפלים ובריכות לאורך כל הדרך', icon: 'mountain' },
      { name: 'כנרת ודגניה — ראשית הציונות', distance: '40 ק"מ', type: 'היסטוריה', description: 'הקיבוצים הראשונים, בית גורדון, קבר רחל המשוררת', icon: 'scroll' },
      { name: 'יקב גולן — רמת הגולן', distance: '45 ק"מ', type: 'אוכל ויין', description: 'מבקרים ביקב, טועמים יינות פרמיום עם נוף לרמת הגולן', icon: 'wine' },
    ],
    trails: [
      { name: 'שביל הגליל — נחל ציפורי', difficulty: 'קל', duration: '2 שעות', distance: '7 ק"מ', description: 'מסלול נוף רגוע דרך שדות ויערות עם מים זורמים ברוב השנה' },
      { name: 'הר כנען — נוף לגליל', difficulty: 'בינוני', duration: '3 שעות', distance: '10 ק"מ', description: 'נוף פנורמי על הגליל, הגולן וצפת. פסגה נגישה יחסית' },
      { name: 'נחל עמוד — מלוא האורך', difficulty: 'מאתגר', duration: '7 שעות', distance: '22 ק"מ', description: 'מסלול יום שלם מהמעיין ועד הכנרת. אחד היפים בישראל' },
    ],
    food: [
      { name: 'פלאפל מוחמד — בית לחם הגלילית', type: 'פלאפל ערבי', distance: '5 ק"מ', highlight: 'המקום שכל הגליל מדבר עליו. פיתה חמה, ירקות טריים, ומחיר של 2005' },
      { name: 'מסעדת ענבל — בית לחם', type: 'מזרח תיכוני', distance: '6 ק"מ', highlight: 'שיפודים, סלטים ומנות ים. מקום אהוב על תושבי האזור' },
      { name: 'קפה גליל — כרמיאל', type: 'קפה ועוגות', distance: '15 ק"מ', highlight: 'קפה איכותי, עוגות ביתיות ואוירה אורבנית-כפרית' },
      { name: 'שוק יום שישי — שפרעם', type: 'שוק עממי', distance: '18 ק"מ', highlight: 'תבלינים, ירקות, זיתים ומוצרי מזון מסורתיים במחירי שפרעם' },
    ],
    experiences: ['חופשה משפחתית', 'שבת חתן', 'אירועים', 'ימי גיבוש'],
    seoKeywords: ['מתחם גרנות', 'נופש כפרי גליל', 'שבת חתן גליל מרכזי', 'אירועים בגליל', 'צימר כפרי גליל'],
  },

  // ══════════════════════════════════════════
  //  04  כפר פקיעין
  // ══════════════════════════════════════════
  {
    id: 'pekiin',
    slug: 'pekiin',
    num: '04',
    name: 'כפר פקיעין',
    nameParts: { regular: 'כפר', colored: 'פקיעין' },
    tagline: 'היסטוריה, תרבות ואדריכלות עתיקה',
    punchline: 'שלושת אלפים שנה בבת אחת',
    region: 'פקיעין · גליל עליון',
    type: 'כפר עתיק',
    capacity: 10,
    priceFrom: 800,
    color: '#A8C278',
    colorRgb: '168,194,120',
    colorBg: 'rgba(168,194,120,.15)',
    waText: 'שלום, מעוניין לשמוע על כפר פקיעין',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg',
    imageFeatured: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772466328/11_xsavtz.jpg',
    atmosphere: 'רחובות מרוצפים אבן, ריח של זעתר ושמן זית, ושכנים שיציעו לכם קפה בערבית לפני שנכנסתם לחדר. פקיעין היא אחד מהכפרים הנדירים בעולם שבהם כל הדתות חיות זו לצד זו מאז ומעולם.',
    features: ['ארכיטקטורה עתיקה', 'תרבות דרוזית', 'שבילי טבע', 'היסטוריה', 'שקט מוחלט'],
    pills: ['ארכיטקטורה עתיקה', 'תרבות דרוזית', 'שבילי טבע', 'עד 10 אורחים'],
    description: 'חוויה תרבותית ייחודית בכפר הדרוזי העתיק פקיעין עם ארכיטקטורה היסטורית ושבילי טבע.',
    longDescription: 'פקיעין הוא אחד הכפרים המיוחדים ביותר בישראל — כנראה היישוב היחיד שהיהודים לא עזבו מעולם מאז החורבן. כיום הוא גם כפר דרוזי-נוצרי-יהודי, ובשלושתם שוכנים לשכנים. הלינה בבתים עתיקים שוחזרו: אבן גיר, קמרונות, חצרות פנימיות וגינות סמויות. אוכל דרוזי אותנטי, שבילי טבע שיוצאים ממש מהכניסה, ונוף שלא ראיתם כמותו.',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466328/11_xsavtz.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466327/10_fvnm0t.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466325/9_bqxpwo.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466323/8_vyhyhm.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466322/7_a09vce.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466320/6_gsbvpo.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466318/5_u599ne.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466316/4_htedhv.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466316/3_bzl0rc.jpg',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg',
    ],
    rooms: [
      { name: 'בית האבן', capacity: '4 אורחים', beds: '2 חדרי שינה', features: ['אבן גיר מקורית', 'קמרון', 'חצר פנימית'], icon: 'arch' },
      { name: 'חדר הגינה', capacity: '2 אורחים', beds: 'מיטה זוגית', features: ['גינה סמויה', 'נוף הרים', 'כניסה עצמאית'], icon: 'bed' },
    ],
    forWho: [
      { icon: 'arch', title: 'אוהבי היסטוריה ותרבות', description: 'כל אבן כאן מספרת סיפור. תבואו עם סקרנות ותצאו עם סיפורים.' },
      { icon: 'couple', title: 'זוגות שמחפשים ייחודי', description: 'לא בית מלון, לא ריזורט. בית אמיתי בכפר עם אלפי שנים של היסטוריה.' },
      { icon: 'meditation', title: 'ריטריט ויוגה', description: 'האוויר הנקי, השקט, והסביבה — מושלם לימי ריטריט קטנים.' },
      { icon: 'camera', title: 'צלמים ואמנים', description: 'כל פינה בפקיעין היא תמונה. הארכיטקטורה, האנשים, האור.' },
    ],
    amenities: [
      { category: 'ייחודי למקום', items: ['ארכיטקטורה עתיקה מקורית', 'חצר פנימית', 'קמרונות אבן', 'גינה מסורתית'] },
      { category: 'אוכל', items: ['מטבח מאובזר', 'ארוחת בוקר דרוזית באפשרות', 'אוכל מסורתי בהזמנה'] },
      { category: 'חוץ', items: ['גינה פנימית', 'גישה ישירה לשבילים', 'נוף פנורמי'] },
      { category: 'בסיסי', items: ['WiFi', 'מזגן', 'חניה סמוכה'] },
    ],
    area: 'פקיעין שוכנת בגליל העליון, בנקודת מפגש בין שלושה אזורים יפים: עמק בית הכרם, רכס מירון, וגלויות הגליל המערבי. גובה 500 מטר מעל פני הים — אקלים נעים גם בקיץ.',
    attractions: [
      { name: 'הר מירון — קבר רשב"י', distance: '15 ק"מ', type: 'רוחניות', description: 'ההר הגבוה ביותר בגליל. קבר האר"י, קבר שמעון בר יוחאי, נוף לכנרת', icon: 'star' },
      { name: 'נחר עמוד — מהמקורות', distance: '10 ק"מ', type: 'טבע', description: 'מצאינו מים לאורך כל השנה. בריכות, מפלים, עצי שיזף עתיקים', icon: 'water' },
      { name: 'מערות עכברה', distance: '12 ק"מ', type: 'טבע', description: 'מערות סמוך לצפת עם עטלפים, אחת מהמושבות הגדולות בישראל', icon: 'cave' },
      { name: 'ראש פינה — רחוב הגלריות', distance: '20 ק"מ', type: 'תרבות', description: 'הכפר הציוני הראשון. גלריות אמנות, מסעדות גורמה, נוף לגולן', icon: 'palette' },
      { name: 'בריכת הנגריה — מג׳ד אל-כרום', distance: '8 ק"מ', type: 'טבע', description: 'בריכת טבע לשחייה עם מים מתגלגלים בתוך גן ירוק', icon: 'pool' },
    ],
    trails: [
      { name: 'שביל פקיעין–נחל עמוד', difficulty: 'קל', duration: '2.5 שעות', distance: '7 ק"מ', description: 'יוצאים מהכפר ויורדים לנחל עמוד. עצים גדולים, מים ונחת' },
      { name: 'מסלול הכפרים הדרוזים', difficulty: 'קל', duration: '3 שעות', distance: '9 ק"מ', description: 'מסלול בין פקיעין, בית ג׳ן וח׳ורפיש. חוויה תרבותית ייחודית' },
      { name: 'הר מירון — מסלול מלא', difficulty: 'בינוני', duration: '5 שעות', distance: '14 ק"מ', description: 'עלייה לפסגת הגליל עם נוף 360° שכולל לבנון, ים כנרת וחרמון' },
      { name: 'ג׳בל ג׳רמק — הצמרת', difficulty: 'מאתגר', duration: '6 שעות', distance: '19 ק"מ', description: '1,208 מטר — הנקודה הגבוהה בישראל. לא לחלשי לב, מרהיב לחזקים' },
    ],
    food: [
      { name: 'אום ח׳אלד — מסעדה דרוזית', type: 'דרוזי מסורתי', distance: '1 ק"מ', highlight: 'מוסקה, עראייס, קיבה ופיתות טאבון שיצאו מהתנור לפני שאתם הגעתם' },
      { name: 'קפה אל-ח׳טיב', type: 'קפה מסורתי', distance: '0.5 ק"מ', highlight: 'קהווה ערבית בחינם לכל אורח — מסורת פקיעין שלא השתנתה' },
      { name: 'מסעדת ג׳נאן — ראש פינה', type: 'גורמה ישראלי', distance: '22 ק"מ', highlight: 'שף מפורסם, מרכיבים מקומיים, נוף לגולן. הזמינו מראש' },
      { name: 'יקב ריקנאטי — אמקה', type: 'יקב בוטיק', distance: '30 ק"מ', highlight: 'יקב זוכה פרסים עם גלריה לאמנות. טעימות וסיורים בימי שישי' },
    ],
    experiences: ['חופשה זוגית', 'חופשה משפחתית', 'טבע והרפתקאות'],
    seoKeywords: ['כפר פקיעין', 'צימר פקיעין', 'נופש גליל עליון', 'תיירות כפרית גליל', 'לינה בכפר דרוזי'],
  },
]

export function getLocation(slug: string) {
  return locations.find((l) => l.slug === slug)
}

import { NextResponse } from "next/server";

export const runtime = 'edge';

const SYSTEM_PROMPT = `את נועה, מדריכת הגליל ומנהלת ההזמנות של "בין אומנות לטבע".
את חמה, קצרה, מקצועית. עונה תמיד בעברית בלבד.
יש לך ידע עמוק על הגליל — טיולים, אוכל, אטרקציות, פעילויות לילדים.

== חוק קריטי ==
כל תשובה חייבת להסתיים ב: OPTIONS: [אפשרות] | [אפשרות] | [אפשרות]
(2-4 אפשרויות, ללא יוצא מן הכלל)
גוף התשובה: מקסימום 4 משפטים לפני OPTIONS.

== מסלול השיחה — שלב 1: פתיחה ==
שאלה ראשונה: "מה מביא אתכם לגליל?"
OPTIONS: [אני רוצה להזמין מתחם] | [ספרי לי על הגליל] | [מה לעשות עם ילדים?] | [מזג אוויר עכשיו]

== מסלול A: הזמנה ==
A1. סוג ביקור:
OPTIONS: [שבת חתן] | [נופש זוגי] | [חופשה משפחתית] | [יום גיבוש / אירוע]

A2. גודל קבוצה:
OPTIONS: [1-2 אנשים] | [3-6 אנשים] | [7-15 אנשים] | [16+ אנשים]

A3. המלצת מתחם (בהתאם לתשובות):
OPTIONS: [ספרי עוד על [מתחם]] | [אני מעוניין/ת להזמין] | [הציגי מתחם אחר]

A4-A7. איסוף פרטים בזה אחר זה:
- תאריך כניסה → OPTIONS: [סוף שבוע הקרוב] | [בחודש הבא] | [אציין תאריך]
- תאריך יציאה → OPTIONS: [לילה אחד] | [שני לילות] | [שלושה לילות ויותר]
- שם מלא → (שאלה פתוחה, ללא OPTIONS חוץ מ: OPTIONS: [המשך])
- טלפון → (שאלה פתוחה, ללא OPTIONS חוץ מ: OPTIONS: [המשך])

A8. סיכום — כשיש שם + טלפון + תאריכים + מתחם:
כתבי: "מעולה [שם]! ריכזתי את הפרטים. לחצו על הכפתור הירוק לשליחה ישירה לוואטסאפ:"
בשורה נפרדת: WHATSAPP_SUMMARY: שם: [שם] | טלפון: [טלפון] | מתחם: [מתחם] | כניסה: [תאריך] | יציאה: [תאריך] | סוג: [סוג]
OPTIONS: [שלחו לוואטסאפ] | [עדכנו פרט]

== מסלול B: מדריך גליל ==

B1. מה מעניין?
OPTIONS: [מסלולי טיול] | [המלצות מסעדות] | [אטרקציות] | [פעילויות לילדים] | [עגלות קפה] | [מזג אוויר]

B2. מסלולי טיול — תשאלי קושי מבוקש:
OPTIONS: [קל ומשפחתי] | [בינוני] | [מאתגר] | [כל האפשרויות]

מסלולים מרכזיים לפי קושי:
קל: נחל ציפורי (5 ק"מ), נחל כזיב (6 ק"מ), מצודת יחיעם (4 ק"מ)
בינוני: הר כמון (12 ק"מ), שביל עלון-הר תבור (9 ק"מ), הר כנען (10 ק"מ)
מאתגר: נחל עמוד מלא (22 ק"מ), ג'בל ג'רמק (19 ק"מ, הנקודה הגבוהה בישראל)

B3. המלצות מסעדות — תשאלי סוג:
OPTIONS: [ערבי-גלילי מסורתי] | [גורמה ויין] | [בוקר וקפה] | [שוק ותוצרת מקומית] | [כשר]

מסעדות:
ערבי מסורתי: אל-ביאדר (רמת ישי), אבו סאלם (כפר יסיף), אום ח'אלד (פקיעין), דלאל (מעיליא)
גורמה: יקב גלנה (14 ק"מ מרמת ישי), מסעדת ג'נאן-ראש פינה, אנבאר-נהריה
בוקר וקפה: קפה גורן (רמת ישי), בית הקפה בסאסא, קפה גליל (כרמיאל)
שווקים: שוק נשר (ו' בבוקר), שוק כרמיאל (ו'), שוק שפרעם (עממי)
כשר: פיצה פיצה (קריית טבעון), מסעדות כשרות בנהריה ובכרמיאל

B4. אטרקציות — תשאלי תחום עניין:
OPTIONS: [היסטוריה ותרבות] | [טבע ונופים] | [יין וגסטרונומיה] | [הכל]

היסטוריה: עכו העתיקה (מורשת עולמי), מגידו (מורשת עולמי), צפת-עיר הקבלה, הר מירון-רשב"י
טבע: הר הכרמל, ים כנרת, שמורת נחל עמוד, גן לאומי-כורסי
יין: יקב גלנה, יקב גולן (רמת הגולן), יקב ריקנאטי (אמקה), יקב כרמי יוסף

B5. פעילויות לילדים:
OPTIONS: [0-5 שנים] | [6-12 שנים] | [13+ גיל] | [לכל הגילאים]

פעילויות:
קטנים: חוות שור-בשן (חוות חיות), פארק הירדן, גינות אקוואריום חיפה
ילדים: זיפליין בגליל, רפטינג בנחל ירדן, חוות סוסים-כפר ורד, בריכת הנגריה
גדולים: כניסה למנהרות עכו, טיסת סנאפיר, טיפוס סלעים-כרמל

B6. עגלות קפה ו-Specialty:
בואו ונגלה יחד: יש עגלות קפה מדהימות שמסתובבות בגליל — חלקן ליד שבילי טיול, חלקן בכפרים.
OPTIONS: [עגלות קפה ליד טיולים] | [קפה בכפרים דרוזים] | [ספיישלטי בגליל]

עגלות/קפה מיוחד:
ליד שבילים: עגלת "שדה קפה" ליד נחל עמוד, קפה ניידים בפארק הכרמל
כפרים דרוזים: קפה עם קהווה מסורתית בפקיעין, ג'ת, יאנוח
ספיישלטי: "קפה גרדן" (מגדל העמק), "בית הקפה בסאסא", "Caffe Napoli" (נהריה)

B7. מזג אוויר — כשמשתמש שואל על מזג אוויר:
כתבי בדיוק: FETCH_WEATHER: גליל
ואז: OPTIONS: [מזג אוויר בגליל עליון] | [מזג אוויר בגליל תחתון] | [חזרה לאפשרויות]

== חוזרים לפתיחה בכל שלב ==
OPTIONS תמיד כולל אפשרות כמו: [אני רוצה להזמין] | [מה עוד יש בגליל?]

== המתחמים ==
1. אחוזת קלמנטין | קיבולת עד 30 | ₪2,800/לילה | רמת ישי, גליל תחתון
   בריכה מחוממת, ג'קוזי, קמין, 5 ח"ש, BBQ | שבת חתן, משפחות, אירועים
2. אחוזה בגליל | קיבולת עד 10 | ₪950/לילה | גליל מערבי
   ג'קוזי פרטי, קמין עצים, נוף פנורמי | זוגות, ריטריט
3. מתחם צוריאל | קיבולת עד 20 | ₪1,400/לילה | גליל מרכזי
   BBQ, טאבון, שדות פתוחים, גלאמפינג | משפחות, שבת חתן, גיבוש
4. כפר פקיעין | קיבולת עד 10 | ₪800/לילה | גליל עליון
   בתי אבן עתיקים, חצר, אוכל דרוזי | זוגות, היסטוריה, ריטריט`;

// ── Weather fetch ──────────────────────────────
async function getWeather(region: string): Promise<string> {
  try {
    const lat = region.includes('עליון') ? 33.0 : 32.7;
    const lon = region.includes('עליון') ? 35.5 : 35.3;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,precipitation&timezone=Asia%2FJerusalem&forecast_days=1`;
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current;
    const code = c.weathercode;
    const desc = weatherDesc(code);
    return `מזג אוויר ב${region}: ${desc}, ${Math.round(c.temperature_2m)}°C, רוח ${Math.round(c.windspeed_10m)} קמ"ש${c.precipitation > 0 ? `, משקעים ${c.precipitation}mm` : ''}`;
  } catch {
    return 'לא הצלחתי לטעון מזג אוויר כרגע.';
  }
}

function weatherDesc(code: number): string {
  if (code === 0) return 'שמיים בהירים ☀️';
  if (code <= 3) return 'מעונן חלקית 🌤️';
  if (code <= 49) return 'ערפל/עננות 🌫️';
  if (code <= 59) return 'גשם קל 🌦️';
  if (code <= 69) return 'גשם 🌧️';
  if (code <= 79) return 'שלג ❄️';
  if (code <= 82) return 'גשם 🌧️';
  if (code <= 99) return 'סופת רעמים ⛈️';
  return 'לא ידוע';
}

// ── Main handler ───────────────────────────────
export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ text: "שירות הצ'אט אינו זמין.", options: ["פנו ב-WhatsApp"] });
    }

    const { message, history = [] } = await req.json();
    if (!message?.trim()) {
      return NextResponse.json({ text: "לא הבנתי.", options: ["התחילו מחדש"] });
    }

    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'הבנתי. אני נועה.' }] },
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.5, maxOutputTokens: 500 }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ text: `שגיאה: ${data.error?.message}`, options: ["נסו שוב"] });
    }

    let raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Handle weather fetch
    const weatherMatch = raw.match(/FETCH_WEATHER:\s*(.+)/);
    if (weatherMatch) {
      const region = weatherMatch[1].trim();
      const weatherText = await getWeather(region);
      raw = raw.replace(/FETCH_WEATHER:\s*.+/, weatherText);
    }

    // Parse OPTIONS
    const optionsMatch = raw.match(/OPTIONS:\s*(.+)$/m);
    const options = optionsMatch
      ? optionsMatch[1].split('|').map((o: string) => o.trim().replace(/^\[|\]$/g, ''))
      : [];

    // Parse WHATSAPP_SUMMARY
    const summaryMatch = raw.match(/WHATSAPP_SUMMARY:\s*(.+)/);
    const whatsappSummary = summaryMatch ? summaryMatch[1].trim() : null;

    // Clean text
    const text = raw
      .replace(/OPTIONS:\s*.+$/m, '')
      .replace(/WHATSAPP_SUMMARY:\s*.+/m, '')
      .replace(/FETCH_WEATHER:\s*.+/m, '')
      .trim();

    return NextResponse.json({ text, options, whatsappSummary });

  } catch {
    return NextResponse.json({
      text: "תקלה זמנית.",
      options: ["נסו שוב", "פנו ב-WhatsApp"]
    });
  }
}

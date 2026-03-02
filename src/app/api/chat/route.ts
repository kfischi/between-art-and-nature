import { NextResponse } from "next/server";

// Netlify דורש edge runtime עבור API routes
export const runtime = 'edge';

const SYSTEM_PROMPT = `את מנהלת ההזמנות של "בין אומנות לטבע" — רשת מתחמי נופש יוקרתיים בגליל.
שמך הוא נועה. את חמה, מקצועית, ועונה תמיד בעברית בלבד.
תפקידך: לעזור לאורחים לבחור מתחם, לענות על שאלות, ולהפנות להזמנה ב-WhatsApp.

== המתחמים ==

1. אחוזת קלמנטין | /achuzat-klementina
   קיבולת: עד 30 | מחיר: החל ₪2,800/לילה | אזור: רמת ישי, גליל תחתון
   מאפיינים: בריכה פרטית מחוממת, ג'קוזי, קמין, 5 חדרי שינה, BBQ, גינה ענקית
   מתאים ל: שבת חתן (הפרדה מלאה), משפחות גדולות, אירועים עד 50, ימי גיבוש
   בסביבה: נחל קישון, הר כרמל, עכו העתיקה, מגידו, יקב גלנה

2. אחוזה בגליל | /achuzah-bagalil
   קיבולת: עד 10 | מחיר: החל ₪950/לילה | אזור: גליל מערבי
   מאפיינים: ג'קוזי פרטי חיצוני, קמין עצים, נוף פנורמי, מרפסת
   מתאים ל: זוגות, ריטריט אישי, משפחה קטנה, צלמים
   בסביבה: נחל כזיב, מצודת יחיעם, עכו, רכיבה על סוסים

3. מתחם גרנות | /granot
   קיבולת: עד 20 | מחיר: החל ₪1,400/לילה | אזור: גליל מרכזי
   מאפיינים: BBQ מקצועי, טאבון, שדות פתוחים, אוהל גלאמפינג, אווירה כפרית-בוהמיאנית
   מתאים ל: משפחות, שבת חתן, אירועים, ימי גיבוש
   בסביבה: צפת, ים כנרת, נחל עמוד, יקב גולן

4. כפר פקיעין | /pekiin
   קיבולת: עד 10 | מחיר: החל ₪800/לילה | אזור: גליל עליון, 500 מ' גובה
   מאפיינים: בתי אבן עתיקים משוחזרים, חצר פנימית, אוכל דרוזי אותנטי
   מתאים ל: זוגות, אוהבי היסטוריה, ריטריט, אמנים וצלמים
   בסביבה: הר מירון, נחל עמוד, ראש פינה, יקב ריקנאטי

== כללים ==
- תשובות קצרות וחמות: 2-4 משפטים
- אם שואלים "למי מתאים" — שאלי שאלה אחת (כמה אנשים? מה האירוע?)
- זמינות תאריכים — הפני תמיד לWhatsApp: wa.me/972523983394
- אל תמציאי מידע שאינו מופיע כאן
- לא לענות על נושאים שאינם קשורים למתחמים`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ text: "שירות הצ'אט אינו זמין כרגע. אנא פנו ב-WhatsApp 🙏" });
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json({ text: "לא הבנתי — נסו לנסח מחדש" });
    }

    const contents = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'מובן, אני נועה ואני כאן לעזור.' }] },
      ...history,
      { role: 'user', parts: [{ text: message }] }
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // מחזיר את שגיאת גוגל המדויקת לדיבאג
      return NextResponse.json({ 
        text: `שגיאה מגוגל: ${data.error?.message || 'תקלה לא ידועה'}` 
      });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "לא הצלחתי לעבד. נסו שוב.";
    return NextResponse.json({ text: aiText });

  } catch (error) {
    return NextResponse.json({ 
      text: `תקלה טכנית: ${error instanceof Error ? error.message : 'unknown error'}` 
    });
  }
}

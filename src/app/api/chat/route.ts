import { NextResponse } from "next/server";

// הסרנו את edge runtime — יותר יציב ב-Netlify עם Gemini
export const runtime = 'nodejs';

const SYSTEM_PROMPT = `את מנהלת ההזמנות של "בין אומנות לטבע" — רשת מתחמי נופש יוקרתיים בגליל.
שמך הוא נועה. את חמה, מקצועית, ועונה תמיד בעברית.
תפקידך: לעזור לאורחים לבחור את המתחם המתאים להם, לענות על שאלות, ולהפנות להזמנה ב-WhatsApp.

== המתחמים שלנו ==

1. אחוזת קלמנטין (עמוד: /achuzat-klementina)
   - סוג: וילה היסטורית יוקרה
   - אזור: רמת ישי, גליל תחתון (15 דק' מחיפה)
   - קיבולת: עד 30 אורחים
   - מחיר: החל מ-₪2,800 ללילה
   - מתאים ל: שבת חתן, משפחות גדולות, אירועים, ימי גיבוש, זוגות
   - מה יש: בריכה פרטית מחוממת, ג'קוזי, קמין, 5 חדרי שינה, BBQ, גינה ענקית, WiFi
   - כשרות: כן, הפרדה מלאה לשבת חתן
   - בסביבה: נחל קישון, הר כרמל, עכו, מגידו, יקבי בוטיק

2. אחוזה בגליל (עמוד: /achuzah-bagalil)
   - סוג: אחוזת טבע אינטימית
   - אזור: גליל מערבי
   - קיבולת: עד 10 אורחים
   - מחיר: החל מ-₪950 ללילה
   - מתאים ל: זוגות, משפחה קטנה, ריטריט אישי, צלמים
   - מה יש: ג'קוזי פרטי חיצוני, קמין עצים, נוף פנורמי, מרפסת
   - בסביבה: נחל כזיב, מצודת יחיעם, עכו, רכיבה על סוסים

3. מתחם גרנות (עמוד: /granot)
   - סוג: מתחם חקלאי-בוהמיאני
   - אזור: גרנות הגליל, גליל מרכזי
   - קיבולת: עד 20 אורחים
   - מחיר: החל מ-₪1,400 ללילה
   - מתאים ל: משפחות גדולות, שבת חתן, אירועים, ימי גיבוש
   - מה יש: BBQ מקצועי, טאבון, שדות פתוחים, אוהל גלאמפינג, אווירה כפרית
   - בסביבה: צפת, ים כנרת, נחל עמוד, יקב גולן

4. כפר פקיעין (עמוד: /pekiin)
   - סוג: כפר עתיק, חוויה תרבותית
   - אזור: פקיעין, גליל עליון (גובה 500 מטר)
   - קיבולת: עד 10 אורחים
   - מחיר: החל מ-₪800 ללילה
   - מתאים ל: זוגות, אוהבי היסטוריה, ריטריט, צלמים ואמנים
   - מה יש: בתי אבן עתיקים שוחזרו, חצר פנימית, גינה, אוכל דרוזי
   - בסביבה: הר מירון, נחל עמוד, ראש פינה, יקב ריקנאטי

== כללי תשובה ==
- עני על שאלות ישירות, קצר וברור
- אם שואלים "מה מתאים לי?" — שאלי שאלה אחת לסינון (כמה אנשים? מה האירוע?)
- בסוף כל תשובה — אם רלוונטי — הפני לWhatsApp: wa.me/972523983394
- אל תמציאי מידע שלא מופיע כאן
- אם שואלים על זמינות תאריכים — תגידי שיש לבדוק ישירות בWhatsApp
- אם שואלים שאלה לא קשורה — החזירי בנועם לנושא המתחמים
- תשובות קצרות: 2-4 משפטים בדרך כלל. לא רשימות ארוכות.`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ 
        text: "שירות הצ'אט אינו זמין כרגע. אנא פנו אלינו ב-WhatsApp." 
      });
    }

    const { message, history = [] } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ text: "לא התקבלה הודעה תקינה." });
    }

    // בניית ההיסטוריה עם system prompt מובנה
    const contents = [
      // System turn — מדמה "user+model" כדי שגמיני יבין את ההקשר
      {
        role: 'user',
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: 'model', 
        parts: [{ text: 'שלום! אני נועה ממשרד ההזמנות של בין אומנות לטבע. שמחה לעזור לך למצוא את המתחם המושלם 🌿' }]
      },
      // היסטוריית השיחה
      ...history.map((msg: { role: string; text: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      // ההודעה הנוכחית
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini error:', data.error);
      return NextResponse.json({ 
        text: "הייתה תקלה זמנית. נסו שוב, או פנו אלינו ישירות ב-WhatsApp." 
      });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text 
      || "לא הצלחתי לעבד את השאלה. נסו שוב.";

    return NextResponse.json({ text: aiText });

  } catch (error) {
    console.error('Chat route error:', error);
    return NextResponse.json({ 
      text: "תקלה טכנית. אנא פנו אלינו ב-WhatsApp: wa.me/972523983394" 
    });
  }
}

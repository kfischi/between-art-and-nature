import complexesData from '@/data/content.json';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const { message } = await req.json();

    // פנייה ישירה ל-API של גוגל ללא תלות בספריות חיצוניות
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `אתה המארח הדיגיטלי של 'בין אומנות לטבע'. 
              הנתונים על המתחמים: ${JSON.stringify(complexesData.complexes)}
              הנחיות: ענה בעברית שיווקית וחמה. בסיום הצעה למתחם, הצע לעבור ל-WhatsApp.
              הודעת הגולש: ${message}`
            }]
          }]
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const aiText = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ text: aiText });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

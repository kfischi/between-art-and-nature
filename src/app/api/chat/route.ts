import { NextResponse } from "next/server";

export const runtime = 'edge'; 

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { message } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ text: "המפתח חסר בהגדרות נטליפיי. וודא שהגדרת GEMINI_API_KEY." });
    }

    // פנייה ישירה לכתובת ה-API הרשמית
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ text: `שגיאה מגוגל: ${data.error?.message || "תקלה לא ידועה"}` });
    }

    return NextResponse.json({ text: data.candidates[0].content.parts[0].text });

  } catch (error: any) {
    return NextResponse.json({ text: "תקלה טכנית בחיבור. נסה שוב בעוד רגע." });
  }
}

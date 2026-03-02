import { NextResponse } from "next/server";

export const runtime = 'edge'; 

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const { message } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ text: "המפתח חסר בהגדרות נטליפיי." });
    }

    // שינוי קריטי: מעבר ל-v1beta שבו המודל הזה נמצא
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // אם גוגל מחזירה שגיאה, נציג אותה כדי להבין מה קרה
      return NextResponse.json({ text: `שגיאה מגוגל: ${data.error?.message || "תקלה לא ידועה"}` });
    }

    // חילוץ התשובה מהמבנה של גוגל
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "לא התקבלה תשובה מהבינה המלאכותית.";
    return NextResponse.json({ text: aiText });

  } catch (error: any) {
    return NextResponse.json({ text: "תקלה טכנית בחיבור. נסה שוב בעוד רגע." });
  }
}

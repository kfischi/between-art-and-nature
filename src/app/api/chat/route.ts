import { GoogleGenerativeAI } from "@google/generative-ai";
import complexesData from '@/data/content.json';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // שלב 1: בדיקת המפתח מתוך נטליפיי
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing in host environment" }, { status: 500 });
    }

    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // שלב 2: שימוש במודל בגרסה הכי יציבה (בלי Beta)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      אתה המארח הדיגיטלי של 'בין אומנות לטבע'. 
      מידע על המתחמים: ${JSON.stringify(complexesData.complexes)}
      הנחיות: ענה בעברית שיווקית וחמה. בסיום הצעה למתחם, הצע לעבור ל-WhatsApp.
      הודעת הגולש: ${message}
    `;

    // שלב 3: שליחת הבקשה
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Critical Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

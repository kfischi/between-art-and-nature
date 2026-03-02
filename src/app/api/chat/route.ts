import { GoogleGenerativeAI } from "@google/generative-ai";
import complexesData from '@/data/content.json';
import { NextResponse } from "next/server";

// בדיקה אם המפתח קיים בכלל - אם לא, נחזיר שגיאה ברורה
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      אתה "המארח הדיגיטלי" של מותג הנופש 'בין אומנות לטבע'. 
      הנתונים על המתחמים: ${JSON.stringify(complexesData.complexes)}
      הנחיות: ענה בעברית שיווקית וחמה. בסיום הצעה למתחם, הצע לעבור ל-WhatsApp.
      הודעת הגולש: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Internal Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

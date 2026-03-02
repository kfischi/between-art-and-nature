import { GoogleGenerativeAI } from "@google/generative-ai";
import complexesData from '@/data/content.json';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("API Key is missing in Environment Variables");
      return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
    }

    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // מעבר למודל PRO היציב ביותר כדי לפתור את שגיאת ה-404
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

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
    console.error("Detailed Error:", error);
    // החזרת הודעת שגיאה מפורטת שתעזור לנו אם זה שוב יפול
    return NextResponse.json({ 
      error: "Gemini API Error", 
      details: error.message 
    }, { status: 500 });
  }
}

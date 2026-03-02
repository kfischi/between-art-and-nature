import { GoogleGenerativeAI } from "@google/generative-ai";
import complexesData from '@/data/content.json';
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      אתה "המארח הדיגיטלי" של מותג הנופש 'בין אומנות לטבע'. 
      הנתונים שלך על המתחמים: ${JSON.stringify(complexesData.complexes)}
      
      הנחיות:
      1. ענה בעברית חמה, יוקרתית ושיווקית.
      2. אם לקוח מחפש המלצה, שאל על כמות אנשים וסוג האירוע.
      3. בסוף כל תשובה רלוונטית, הצע לעבור ל-WhatsApp לסגירה מהירה.
      
      הודעת הגולש: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "API connection failed" }, { status: 500 });
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import complexesData from '@/data/content.json';
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `
      אתה "המארח הדיגיטלי" של מותג 'בין אומנות לטבע'. 
      תפקידך: יועץ נופש פרימיום. 
      נתוני המתחמים: ${JSON.stringify(complexesData.complexes)}
      
      הנחיות:
      1. ענה בעברית רהוטה, שיווקית ומזמינה.
      2. אם לקוח מחפש המלצה, שאל על כמות אנשים וסוג האירוע.
      3. הצג יתרונות רגשיים (שקט, נוף, קמין) ולא רק נתונים יבשים.
      4. בסיום תשובה רלוונטית, הצע לעבור ל-WhatsApp לסגירה.
    `;

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemInstruction }] },
        { role: "model", parts: [{ text: "הבנתי. אני מוכן לארח את הגולשים של 'בין אומנות לטבע' ולהציע להם את החופשה המושלמת." }] },
        ...history
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });
  } catch (error) {
    return NextResponse.json({ error: "Failed to connect to Gemini" }, { status: 500 });
  }
}

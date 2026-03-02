// src/app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import complexesData from '@/data/content.json';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req: Request) {
  const { message } = await req.json();
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Context: ${JSON.stringify(complexesData)}
    User Message: ${message}
    Instruction: ענה כיועץ נופש יוקרתי בעברית, בהתבסס על הנתונים בלבד.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return new Response(JSON.stringify({ text: response.text() }));
}

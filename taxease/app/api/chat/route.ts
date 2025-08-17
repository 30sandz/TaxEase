import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ChatMessage = {
  role: "user" | "assistant" | "model";
  content: string;
};

export async function POST(request: Request) {
  try {
    const { history, system } = (await request.json()) as {
      history: ChatMessage[];
      system?: string;
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const parts = [] as { role: "user" | "model"; parts: Array<{ text: string }> }[];

    if (system) {
      parts.push({ role: "user", parts: [{ text: `System instructions: ${system}` }] });
    }

    for (const m of history || []) {
      const role = m.role === "assistant" ? "model" : (m.role as "user" | "model");
      parts.push({ role, parts: [{ text: m.content }] });
    }

    const result = await model.generateContent({ contents: parts });
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    console.error("/api/chat error", err);
    return NextResponse.json({ error: "Chat request failed" }, { status: 500 });
  }
}



// app/api/recommendations/route.ts
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

function cleanJsonResponse(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  return text.trim();
}

async function callOpenRouter(payload: any) {
  const key = process.env.OPENROUTER_API_KEY;
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      // Optional: help identify your app on OpenRouter listing
      "HTTP-Referer": "https://your-app.example",
      "X-Title": "Chill Guy LeetCode Analyzer",
    },
    body: JSON.stringify(payload),
  });

  const text = await resp.text();
  if (!resp.ok) {
    // try to parse error JSON
    try {
      const err = JSON.parse(text);
      throw new Error(err?.error?.message || err?.message || text || `OpenRouter ${resp.status}`);
    } catch (e) {
      throw new Error(text || `OpenRouter ${resp.status}`);
    }
  }

  return JSON.parse(text);
}

function extractRecommendationsFromOpenRouterResponse(data: any) {
  try {
    const content = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;
    if (!content) return [];

    // If assistant returned JSON block inside markdown, clean it first
    const cleaned = cleanJsonResponse(content);

    // Try parse JSON
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) return parsed;
      return parsed.recommendations ?? parsed;
    } catch {
      // fallback: return the raw content as a single recommendation string
      return [{ title: cleaned }];
    }
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    // safe presence check
    console.log("OPENROUTER_API_KEY present:", !!process.env.OPENROUTER_API_KEY);
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "Server not configured: missing OPENROUTER_API_KEY" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400, headers: CORS_HEADERS });
    }

    // Build messages: prefer explicit messages; otherwise synth from solvedProblems
    let messages = body.messages;
    if (!messages) {
      const solvedProblems: string[] = body.solvedProblems || [];
      const prompt = `Given these solved LeetCode problems: ${solvedProblems.join(
        ", "
      )}. Suggest 3 new problems to practice. Return response as a JSON array with objects containing: title, titleSlug, difficulty, reason. Only return valid JSON.`;
      messages = [{ role: "user", content: prompt }];
    }

    const payload = {
      model: body.model || "openai/gpt-oss-20b:free", // the default; change if needed
      messages,
      max_tokens: body.max_tokens ?? 512,
      temperature: typeof body.temperature === "number" ? body.temperature : 0.8,
      // keep stream false for now
      stream: false,
    };

    const data = await callOpenRouter(payload);

    const recommendations = extractRecommendationsFromOpenRouterResponse(data);

    return NextResponse.json(
      { recommendations, raw: data },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    console.error("Recommendations API error:", err?.message ?? err);
    return NextResponse.json(
      { error: String(err?.message ?? err) },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

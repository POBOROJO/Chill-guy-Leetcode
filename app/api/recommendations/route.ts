import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function cleanJsonResponse(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  return text.trim();
}

export async function POST(request: NextRequest) {
  try {
    const { solvedProblems } = await request.json();

    if (!Array.isArray(solvedProblems)) {
      return NextResponse.json(
        { error: "solvedProblems must be an array" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Based on these solved LeetCode problems: ${solvedProblems.join(
      ", "
    )}, 
    suggest 5 new LeetCode problems that would help the user progress in their learning journey. 
    Consider the difficulty progression and concepts covered. 
    Return ONLY a JSON array without any markdown formatting or explanation, with objects containing:
    - 'title': The exact problem title as it appears on LeetCode
    - 'titleSlug': The URL-friendly version of the title (all lowercase, hyphens instead of spaces)
    - 'reason': Why this problem would be beneficial
    - 'difficulty': The problem's difficulty level (Easy, Medium, or Hard)`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedJson = cleanJsonResponse(text);
    const recommendations = JSON.parse(cleanedJson);

    return NextResponse.json({ recommendations });
  } catch (error: any) {
    console.error("Error in recommendations API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get recommendations" },
      { status: 500 }
    );
  }
}

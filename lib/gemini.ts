import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

function cleanJsonResponse(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  return text.trim();
}

export const COOLDOWN_PERIOD = 120000; // 2 minutes

export const LAST_REQUEST_KEY = "last_recommendation_request";

export async function getProblemRecommendations(solvedProblems: string[]) {
  try {
    const lastRequest = localStorage.getItem(LAST_REQUEST_KEY);
    const now = Date.now();
    
    if (lastRequest) {
      const timeSinceLastRequest = now - parseInt(lastRequest);
      if (timeSinceLastRequest < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil((COOLDOWN_PERIOD - timeSinceLastRequest) / 1000);
        throw new Error(`Please wait ${remainingTime} seconds before requesting again`);
      }
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

    localStorage.setItem(LAST_REQUEST_KEY, now.toString());

    return JSON.parse(cleanedJson);
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
}

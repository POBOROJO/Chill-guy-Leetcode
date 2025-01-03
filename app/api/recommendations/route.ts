import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function cleanJsonResponse(text: string): string {
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  return text.trim();
}

// Remove the method check since Next.js 15 handles this automatically
export async function POST(request: NextRequest) {
  try {
    const { solvedProblems } = await request.json();
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Given these solved LeetCode problems: ${solvedProblems.join(", ")}, suggest 3 new problems to practice. Return response as JSON array with properties: title, titleSlug, difficulty, and reason.`;
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const recommendations = JSON.parse(cleanJsonResponse(text));
    
    return NextResponse.json({ recommendations }, { 
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      { error: "Failed to get recommendations" },
      { 
        status: 500, 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
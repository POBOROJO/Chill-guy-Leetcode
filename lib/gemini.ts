import { LAST_REQUEST_KEY } from "./constants";

// Add a base URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://chillguy-leetcode.vercel.app';

export async function getProblemRecommendations(solvedProblems: string[]) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ solvedProblems }),
      credentials: 'same-origin'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch recommendations");
    }

    const data = await response.json();
    
    // Store last request timestamp
    localStorage.setItem(LAST_REQUEST_KEY, Date.now().toString());
    
    return data.recommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
}
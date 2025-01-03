import { LAST_REQUEST_KEY } from "./constants";

export async function getProblemRecommendations(solvedProblems: string[]) {
  try {
    const response = await fetch("/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ solvedProblems }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
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
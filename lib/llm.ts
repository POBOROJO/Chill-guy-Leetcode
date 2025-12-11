import { LAST_REQUEST_KEY } from "./constants";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function getProblemRecommendations(solvedProblems: string[]) {
  try {
    const url = API_BASE_URL
      ? `${API_BASE_URL}/api/recommendations`
      : `/api/recommendations`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ solvedProblems }),
      credentials: "same-origin",
    });

    const text = await response.text();

    if (!response.ok) {
      let parsed: any = text;
      try {
        parsed = JSON.parse(text);
      } catch {}
      console.error("recommendations fetch failed:", response.status, parsed);
      throw new Error(parsed?.error ?? `Server returned ${response.status}`);
    }

    const data = JSON.parse(text);
    localStorage.setItem(LAST_REQUEST_KEY, Date.now().toString());
    return data.recommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw error;
  }
}

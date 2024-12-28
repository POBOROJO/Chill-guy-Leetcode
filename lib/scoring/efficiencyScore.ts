import { LeetCodeUserData } from "../types";

export function calculateEfficiencyScore(userData: LeetCodeUserData): number {
  const allSubmissions = userData.totalSubmissions?.find(s => s.difficulty === "All")?.submissions || 0;
  if (allSubmissions === 0) return 0;
  
  return Math.min((userData.totalSolved / allSubmissions) * 15, 15); // 15% weight
}
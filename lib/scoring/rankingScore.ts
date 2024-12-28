import { LeetCodeUserData } from "../types";

const MAX_RANKING = 500000;

export function calculateRankingScore(userData: LeetCodeUserData): number {
  const ranking = userData.ranking || 0;
  if (!ranking) return 0;
  
  // Inverse the ranking so that lower ranks get higher scores
  // and normalize to a 0-30 scale
  const normalizedScore = Math.max(0, (1 - (ranking / MAX_RANKING)) * 30);
  return Math.round(normalizedScore); // 30% weight
}
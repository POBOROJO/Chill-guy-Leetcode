import { LeetCodeUserData } from "../types";

export function calculateBaseScore(userData: LeetCodeUserData): number {
  const totalProblems = userData.totalSolved || 0;
  return Math.min((totalProblems / 500) * 30, 30); // 30% weight
}
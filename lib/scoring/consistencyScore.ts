import { LeetCodeUserData } from "../types";

export function calculateConsistencyScore(userData: LeetCodeUserData): number {
  const submissions = Object.values(userData.submissionCalendar || {});
  if (submissions.length === 0) return 0;
  
  return Math.min(
    (submissions.filter(s => Number(s) > 0).length / submissions.length) * 15,
    15
  ); // 15% weight
}
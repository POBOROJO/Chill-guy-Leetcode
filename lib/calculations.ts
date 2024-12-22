// File: lib/calculations.ts
import { LeetCodeUserData } from "./types";

export function calculateChillScore(userData: LeetCodeUserData): number {
  if (!userData) return 0;

  console.log("Calculating score for:", {
    totalSolved: userData.totalSolved,
    submissionCalendar: userData.submissionCalendar,
    totalSubmissions: userData.totalSubmissions,
  });

  // Calculate base score from solved problems
  const totalProblems = userData.totalSolved || 0;
  const baseScore = Math.min((totalProblems / 500) * 40, 40);

  // Calculate consistency score from submission calendar
  const submissions = Object.values(userData.submissionCalendar || {});
  const consistencyScore =
    submissions.length > 0
      ? Math.min(
          (submissions.filter((s) => Number(s) > 0).length /
            submissions.length) *
            30,
          30,
        )
      : 0;

  // Calculate efficiency score
  const efficiencyScore =
    userData.totalSubmissions && userData.totalSubmissions > 0
      ? Math.min((userData.totalSolved / userData.totalSubmissions) * 30, 30)
      : 0;

  // Combine scores
  const totalScore = Math.round(baseScore + consistencyScore + efficiencyScore);

  return Math.min(totalScore, 100);
}

export function calculateSuccessRate(userData: LeetCodeUserData): number {
  if (!userData?.totalSubmissions) return 0;
  return Math.round((userData.totalSolved / userData.totalSubmissions) * 100);
}

import { LeetCodeUserData } from "./types";
import { calculateBaseScore } from "./scoring/baseScore";
import { calculateRankingScore } from "./scoring/rankingScore";
import { calculateConsistencyScore } from "./scoring/consistencyScore";
import { calculateEfficiencyScore } from "./scoring/efficiencyScore";
import { calculateStreakScore } from "./scoring/streakScore";
import { calculateStreak } from "./calculateStreak";

export function calculateChillScore(userData: LeetCodeUserData): number {
  if (!userData) return 0;

  // Calculate individual score components
  const baseScore = calculateBaseScore(userData);        // 30%
  const rankingScore = calculateRankingScore(userData);  // 30%
  const consistencyScore = calculateConsistencyScore(userData); // 15%
  const efficiencyScore = calculateEfficiencyScore(userData);   // 15%
  const streakScore = calculateStreakScore(userData);    // 10%

  // Combine scores
  const totalScore = Math.round(
    baseScore +
    rankingScore +
    consistencyScore +
    efficiencyScore +
    streakScore
  );

  return Math.min(totalScore, 100);
}

export function calculateSuccessRate(userData: LeetCodeUserData): number {
  if (!userData || !userData.matchedUserStats || !userData.totalSubmissions) {
    return 0;
  }

  const acceptedSubmissions = userData.matchedUserStats.acSubmissionNum.find(
    stats => stats.difficulty === "All"
  )?.submissions || 0;

  const totalSubmissions = userData.totalSubmissions.find(
    stats => stats.difficulty === "All"
  )?.submissions || 0;

  if (totalSubmissions === 0 || isNaN(totalSubmissions) || isNaN(acceptedSubmissions)) {
    return 0;
  }

  const acceptanceRate = (acceptedSubmissions / totalSubmissions) * 100;
  return Math.round(acceptanceRate * 100) / 100;
}

export function calculateCurrentStreak(userData: LeetCodeUserData): number {
  if (!userData || !userData.submissionCalendar) {
    return 0;
  }
  
  return calculateStreak(userData.submissionCalendar);
}
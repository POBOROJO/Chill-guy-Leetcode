import { LeetCodeUserData } from "./types";
import { calculateStreak } from './calculateStreak';

export function calculateChillScore(userData: LeetCodeUserData): number {
  if (!userData) return 0;

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

  // Calculate efficiency score using the new data structure
  const allSubmissions = userData.totalSubmissions?.find(
    (s) => s.difficulty === "All"
  )?.submissions || 0;
  
  const efficiencyScore =
    allSubmissions > 0
      ? Math.min((userData.totalSolved / allSubmissions) * 30, 30)
      : 0;

  // Combine scores
  const totalScore = Math.round(baseScore + consistencyScore + efficiencyScore);

  return Math.min(totalScore, 100);
}

export function calculateSuccessRate(userData: LeetCodeUserData): number {
  // Add validation
  if (!userData || !userData.matchedUserStats || !userData.totalSubmissions) {
    if (typeof window !== 'undefined') {
        console.error('Invalid user data for success rate:', {
            matchedUserStats: userData?.matchedUserStats,
            totalSubmissions: userData?.totalSubmissions
        });
    }
    return 0;
}

  // Get the "All" difficulty submissions
  const acceptedSubmissions = userData.matchedUserStats.acSubmissionNum.find(
    stats => stats.difficulty === "All"
  )?.submissions || 0;

  const totalSubmissions = userData.totalSubmissions.find(
    stats => stats.difficulty === "All"
  )?.submissions || 0;

  // Validate inputs
  if (totalSubmissions === 0 || isNaN(totalSubmissions) || isNaN(acceptedSubmissions)) {
    return 0;
  }

  // Calculate the acceptance rate
  const acceptanceRate = (acceptedSubmissions / totalSubmissions) * 100;

  // Round to 2 decimal places
  const roundedAcceptanceRate = Math.round(acceptanceRate * 100) / 100;
  return roundedAcceptanceRate;
}

export function calculateCurrentStreak(userData: LeetCodeUserData): number {
  if (!userData || !userData.submissionCalendar) {
    return 0;
  }
  
  return calculateStreak(userData.submissionCalendar);
}
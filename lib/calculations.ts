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
    console.log('Invalid user data for success rate:', {
      matchedUserStats: userData?.matchedUserStats,
      totalSubmissions: userData?.totalSubmissions
    });
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
  console.log('Acceptance Rate:', roundedAcceptanceRate);
  return roundedAcceptanceRate;
}

function calculateStreak(submissionCalendar: Record<string, number>): number {
  const sortedTimestamps = Object.keys(submissionCalendar)
    .map(Number)
    .sort((a, b) => a - b);
  
  let maxStreak = 0;
  let currentStreak = 1; // Initialize as 1 since we have at least one submission
  
  for (let i = 1; i < sortedTimestamps.length; i++) {
    const currentDate = new Date(sortedTimestamps[i] * 1000); // Convert from Unix timestamp
    const previousDate = new Date(sortedTimestamps[i - 1] * 1000);
    
    // Check if the current date is exactly one day after the previous date
    const dayDifference = (currentDate.getTime() - previousDate.getTime()) / (1000 * 3600 * 24);
    
    if (dayDifference === 1) {
      currentStreak++;
    } else if (dayDifference > 1) {
      // Reset streak if the days are not consecutive
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 1; // Reset to 1 as the streak broke
    }
  }
  
  // Final check for the longest streak
  maxStreak = Math.max(maxStreak, currentStreak);
  
  return maxStreak;
}

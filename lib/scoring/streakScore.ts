import { LeetCodeUserData } from "../types";
import { calculateStreak } from "../calculateStreak";

export function calculateStreakScore(userData: LeetCodeUserData): number {
  const currentStreak = calculateStreak(userData.submissionCalendar || {});
  
  // Max streak points at 30 days
  const MAX_STREAK = 30;
  
  // Calculate streak score (10% weight)
  return Math.min((currentStreak / MAX_STREAK) * 10, 10);
}
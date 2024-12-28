export function calculateLongestStreak(submissionCalendar: Record<string, number>): number {
    if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
      return 0;
    }
  
    // Convert timestamps and sort
    const sortedDates = Object.keys(submissionCalendar)
      .map(timestamp => Number(timestamp))
      .sort((a, b) => a - b);
  
    let longestStreak = 0;
    let currentStreak = 0;
    let previousDate: Date | null = null;
  
    for (const timestamp of sortedDates) {
      const currentDate = new Date(timestamp * 1000);
      currentDate.setUTCHours(0, 0, 0, 0);
  
      if (!previousDate) {
        currentStreak = 1;
      } else {
        const dayDifference = Math.floor(
          (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
        );
  
        if (dayDifference === 1) {
          currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 1;
        }
      }
  
      previousDate = currentDate;
    }
  
    // Check final streak
    longestStreak = Math.max(longestStreak, currentStreak);
  
    return longestStreak;
  }
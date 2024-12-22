export function calculateStreak(submissionCalendar: Record<string, number>): number {
  if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
      return 0;
  }

  // Convert timestamps and sort (same as before)
  const sortedDates = Object.keys(submissionCalendar)
      .map(timestamp => Number(timestamp))
      .sort((a, b) => b - a);

  if (sortedDates.length === 0) {
      return 0;
  }

  // Use UTC methods to avoid timezone issues
  const mostRecent = new Date(sortedDates[0] * 1000);
  const today = new Date();
  
  // Reset times using UTC
  mostRecent.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  const daysDifference = Math.floor((today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24));
  if (daysDifference > 1) {
      return 0;
  }

  let streak = 0;
  let currentDate = daysDifference === 0 ? today : mostRecent;

  while (true) {
      const timestamp = Math.floor(currentDate.getTime() / 1000);
      const hasSubmission = Object.keys(submissionCalendar).some(key => {
          const submitDate = new Date(Number(key) * 1000);
          return submitDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
                 submitDate.getUTCMonth() === currentDate.getUTCMonth() &&
                 submitDate.getUTCDate() === currentDate.getUTCDate();
      });

      if (!hasSubmission) {
          break;
      }

      streak++;
      currentDate.setUTCDate(currentDate.getUTCDate() - 1);
  }

  return streak;
}
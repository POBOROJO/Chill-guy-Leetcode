export function calculateStreak(submissionCalendar: Record<string, number>): number {
    if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
      return 0;
    }
  
    // Convert Unix timestamps (in seconds) to dates and sort them in descending order
    const sortedDates = Object.keys(submissionCalendar)
      .map(timestamp => Number(timestamp))
      .sort((a, b) => b - a);
  
    if (sortedDates.length === 0) {
      return 0;
    }
  
    // Get the most recent submission date
    const mostRecent = new Date(sortedDates[0] * 1000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    mostRecent.setHours(0, 0, 0, 0);
  
    // If the most recent submission is not from today or yesterday, streak is 0
    const daysDifference = Math.floor((today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDifference > 1) {
      return 0;
    }
  
    // Calculate streak by checking consecutive days
    let streak = 0;
    let currentDate = daysDifference === 0 ? today : mostRecent;
  
    while (true) {
      const timestamp = Math.floor(currentDate.getTime() / 1000);
      // Check if there's a submission on this day
      const hasSubmission = Object.keys(submissionCalendar).some(key => {
        const submitDate = new Date(Number(key) * 1000);
        return submitDate.getFullYear() === currentDate.getFullYear() &&
               submitDate.getMonth() === currentDate.getMonth() &&
               submitDate.getDate() === currentDate.getDate();
      });
  
      if (!hasSubmission) {
        break;
      }
  
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
  
    return streak;
  }
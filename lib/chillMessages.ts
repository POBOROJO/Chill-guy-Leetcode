export const getChillMessage = (percent: number): string => {
    if (percent >= 90) {
      return `You're the ultimate chill master of LeetCode, solving problems with ${percent}% cool and zero stress. Keep that zen coding flow going!`;
    } else if (percent >= 80) {
      return `Impressive chill levels! At ${percent}%, you're practically radiating peaceful problem-solving vibes. Your code garden is flourishing!`;
    } else if (percent >= 70) {
      return `That's a solid ${percent}% chill factor! You're finding that sweet spot between progress and peace. Keep that balance going!`;
    } else if (percent >= 60) {
      return `${percent}% chill achieved! You're developing that calm coder mindset. Remember: steady progress is the way to go.`;
    } else if (percent >= 50) {
      return `At ${percent}% chill, you're building momentum while keeping your cool. That's the spirit of a true chill coder!`;
    } else if (percent >= 40) {
      return `${percent}% chill and climbing! You're making steady progress while maintaining your composure. That's the way to level up!`;
    } else if (percent >= 30) {
      return `${percent}% chill mode activated! Every problem solved is a step forward. Keep that relaxed approach going!`;
    } else if (percent >= 20) {
      return `You're at ${percent}% chill - embracing the journey one problem at a time. Remember, progress over pressure!`;
    } else if (percent >= 10) {
      return `${percent}% chill and growing! Even the chillest coders started somewhere. Keep that positive momentum going!`;
    } else {
      return `Chill guy mode: activated, no matter the percentage—progress is progress! Your coding journey is just beginning, and that's totally cool!`;
    }
  };
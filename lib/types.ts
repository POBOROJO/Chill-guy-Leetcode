export interface LeetCodeUserData {
  totalSolved: number;
  totalSubmissions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  submissionCalendar: Record<string, number>;
  streak?: number;
}

export interface ShareableImage {
  url: string;
  downloadUrl: string;
}
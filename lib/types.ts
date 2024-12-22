interface SubmissionStats {
  difficulty: string;
  count: number;
  submissions: number;
}

export interface LeetCodeUserData {
  totalSolved: number;
  totalSubmissions: SubmissionStats[];
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  submissionCalendar: Record<string, number>;
  streak?: number;
  ranking?: number;
  matchedUserStats: {
    acSubmissionNum: SubmissionStats[];
    totalSubmissionNum: SubmissionStats[];
  };
}

export interface ShareableImage {
  url: string;
  downloadUrl: string;
}
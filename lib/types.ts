interface SubmissionStats {
  difficulty: string;
  count: number;
  submissions: number;
}

export interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
  __typename: string;
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
  recentSubmissions: RecentSubmission[];
}


export interface ShareableImage {
  url: string;
  downloadUrl: string;
}

export interface LeetCodeError {
  message: string;
}

export interface LeetCodeErrorResponse {
  errors?: LeetCodeError[];
}

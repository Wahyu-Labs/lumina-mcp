export interface GitHubCommitResponse {
  sha: string;
  url: string;
  html_url: string;
  message?: string;
}

export interface GitHubPRResponse {
  id: number;
  number: number;
  url: string;
  html_url: string;
  title: string;
  state: string;
}

export interface GitHubReviewResponse {
  id: number;
  user: {
    login: string;
  };
  body: string;
  state: string;
  html_url: string;
}

export interface GitHubFileDiff {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
}

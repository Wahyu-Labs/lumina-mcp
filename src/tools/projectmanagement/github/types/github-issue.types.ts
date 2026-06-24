export interface GitHubIssueAuthor {
  login: string;
  avatar_url: string;
}

export interface GitHubIssueLabel {
  name: string;
  color: string;
  description: string | null;
}

export interface GitHubIssueMilestone {
  title: string;
  state: string;
  due_on: string | null;
  description: string | null;
}

export interface GitHubIssueComment {
  id: number;
  author: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubLinkedPullRequest {
  number: number;
  title: string;
  state: string;
  html_url: string;
}

export interface GitHubIssueContext {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  author: GitHubIssueAuthor;
  assignees: GitHubIssueAuthor[];
  labels: GitHubIssueLabel[];
  milestone: GitHubIssueMilestone | null;
  comments: GitHubIssueComment[];
  linked_pull_requests: GitHubLinkedPullRequest[];
  _warnings?: string[];
}

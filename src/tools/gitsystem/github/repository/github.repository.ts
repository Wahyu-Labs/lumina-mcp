import { GITHUB_ENDPOINTS } from '../../constants/github.endpoints.js';
import { GitHubPRResponse, GitHubReviewResponse } from '../../types/github.types.js';

export class GithubRepository {
  private getHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "MCP-Github-Server"
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }
    return headers;
  }

  public async fetchFromGithub<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${GITHUB_ENDPOINTS.BASE_URL}${endpoint}`;
    
    const headers = {
      ...this.getHeaders(),
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = response.statusText;
      }
      throw new Error(`GitHub API Error (${response.status}): ${JSON.stringify(errorData)}`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return response.json() as Promise<T>;
  }

  public async createPullRequest(repository: string, title: string, head: string, base: string, body: string): Promise<GitHubPRResponse> {
    return this.fetchFromGithub<GitHubPRResponse>(GITHUB_ENDPOINTS.CREATE_PR(repository), {
      method: 'POST',
      body: JSON.stringify({ title, head, base, body })
    });
  }

  public async createCodeReview(
    repository: string, 
    pullRequestNumber: number, 
    event: 'APPROVE' | 'REQUEST_CHANGES' | 'COMMENT', 
    body: string, 
    comments?: Array<{path: string, line: number, side?: 'LEFT' | 'RIGHT', body: string}>
  ): Promise<GitHubReviewResponse> {
    return this.fetchFromGithub<GitHubReviewResponse>(GITHUB_ENDPOINTS.PR_REVIEWS(repository, pullRequestNumber), {
      method: 'POST',
      body: JSON.stringify({ event, body, comments })
    });
  }

  public async getPRReviewComments(repository: string, pullRequestNumber: number): Promise<unknown> {
    const [reviews, comments] = await Promise.all([
      this.fetchFromGithub<unknown>(`${GITHUB_ENDPOINTS.PR_REVIEWS(repository, pullRequestNumber)}?per_page=100`),
      this.fetchFromGithub<unknown>(`${GITHUB_ENDPOINTS.PR_COMMENTS(repository, pullRequestNumber)}?per_page=100`),
    ]);
    return { reviews, comments };
  }

  public async fetchTextFromGithub(endpoint: string, options: RequestInit = {}): Promise<string> {
    const url = endpoint.startsWith('http') ? endpoint : `${GITHUB_ENDPOINTS.BASE_URL}${endpoint}`;
    
    const headers = {
      ...this.getHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = response.statusText;
      }
      throw new Error(`GitHub API Error (${response.status}): ${JSON.stringify(errorData)}`);
    }

    return response.text();
  }

  public async getPullRequestDiff(repository: string, pullRequestNumber: number): Promise<string> {
    return this.fetchTextFromGithub(GITHUB_ENDPOINTS.PULL_REQUEST(repository, pullRequestNumber), {
      headers: {
        'Accept': 'application/vnd.github.v3.diff'
      }
    });
  }
}

export const githubRepository = new GithubRepository();

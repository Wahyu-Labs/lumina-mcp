export const GITHUB_ENDPOINTS = {
  BASE_URL: 'https://api.github.com',
  CREATE_PR: (repository: string) => `/repos/${repository}/pulls`,
  PR_REVIEWS: (repository: string, prNumber: number) => `/repos/${repository}/pulls/${prNumber}/reviews`,
  PR_COMMENTS: (repository: string, prNumber: number) => `/repos/${repository}/pulls/${prNumber}/comments`,
};

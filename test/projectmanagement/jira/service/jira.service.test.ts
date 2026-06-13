import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGetTicket } = vi.hoisted(() => ({
  mockGetTicket: vi.fn(),
}));

vi.mock('../../../../src/tools/projectmanagement/jira/repository/jira.repository.js', () => ({
  jiraRepository: {
    getTicket: mockGetTicket,
  },
}));

import { getJiraTicket } from '../../../../src/tools/projectmanagement/jira/service/jira.service.js';

describe('JiraService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.JIRA_DOMAIN;
    delete process.env.JIRA_EMAIL;
    delete process.env.JIRA_API_TOKEN;
  });

  it('should call repository when arguments are valid', async () => {
    mockGetTicket.mockResolvedValueOnce({ key: 'PRJ-1' });

    const result = await getJiraTicket('PRJ-1', 'mydomain', 'myemail', 'mytoken');

    expect(mockGetTicket).toHaveBeenCalledWith('PRJ-1', 'mydomain', 'myemail', 'mytoken');
    expect(result).toEqual({ key: 'PRJ-1' });
  });

  it('should fallback to env variables if arguments are omitted', async () => {
    process.env.JIRA_DOMAIN = 'envdomain';
    process.env.JIRA_EMAIL = 'envemail';
    process.env.JIRA_API_TOKEN = 'envtoken';

    mockGetTicket.mockResolvedValueOnce({ key: 'PRJ-2' });

    await getJiraTicket('PRJ-2');

    expect(mockGetTicket).toHaveBeenCalledWith('PRJ-2', 'envdomain', 'envemail', 'envtoken');
  });

  it('should throw error if domain is missing', async () => {
    await expect(getJiraTicket('PRJ-3', undefined, 'myemail', 'mytoken')).rejects.toThrow(
      'Jira domain is required',
    );
  });

  it('should throw error if email or token is missing', async () => {
    await expect(getJiraTicket('PRJ-4', 'mydomain', undefined, 'mytoken')).rejects.toThrow(
      'Jira email and apiToken are required',
    );
  });
});

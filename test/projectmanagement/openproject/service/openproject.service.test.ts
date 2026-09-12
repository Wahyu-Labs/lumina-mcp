import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockGetWorkPackage, mockCreateWorkPackage, mockGetWorkPackageComments, mockAddComment } =
  vi.hoisted(() => ({
    mockGetWorkPackage: vi.fn(),
    mockCreateWorkPackage: vi.fn(),
    mockGetWorkPackageComments: vi.fn(),
    mockAddComment: vi.fn(),
  }));

vi.mock(
  '../../../../src/tools/projectmanagement/openproject/repository/openproject.repository.js',
  () => ({
    openProjectRepository: {
      getWorkPackage: mockGetWorkPackage,
      createWorkPackage: mockCreateWorkPackage,
      getWorkPackageComments: mockGetWorkPackageComments,
      addComment: mockAddComment,
    },
  }),
);

import {
  getOpenProjectWorkPackage,
  createOpenProjectWorkPackage,
  getOpenProjectWorkPackageComments,
  addOpenProjectWorkPackageComment,
} from '../../../../src/tools/projectmanagement/openproject/service/openproject.service.js';

describe('OpenProjectService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.OPENPROJECT_DOMAIN;
    delete process.env.OPENPROJECT_API_KEY;
  });

  it('should call repository when arguments are valid', async () => {
    mockGetWorkPackage.mockResolvedValueOnce({ id: 'wp1' });

    const result = await getOpenProjectWorkPackage('wp1', 'domain.com', 'mykey');

    expect(mockGetWorkPackage).toHaveBeenCalledWith('wp1', 'domain.com', 'mykey');
    expect(result).toEqual({ id: 'wp1' });
  });

  it('should fallback to env variables if arguments are omitted', async () => {
    process.env.OPENPROJECT_DOMAIN = 'envdomain.com';
    process.env.OPENPROJECT_API_KEY = 'envkey';

    mockGetWorkPackage.mockResolvedValueOnce({ id: 'wp2' });

    await getOpenProjectWorkPackage('wp2');

    expect(mockGetWorkPackage).toHaveBeenCalledWith('wp2', 'envdomain.com', 'envkey');
  });

  it('should throw error if domain is missing', async () => {
    await expect(getOpenProjectWorkPackage('wp3', undefined, 'mykey')).rejects.toThrow(
      'OpenProject domain is required. Provide it as an argument or set OPENPROJECT_DOMAIN.',
    );
  });

  it('should throw error if apiKey is missing', async () => {
    await expect(getOpenProjectWorkPackage('wp4', 'domain.com', undefined)).rejects.toThrow(
      'OpenProject apiKey is required. Provide it as an argument or set OPENPROJECT_API_KEY.',
    );
  });
  describe('createOpenProjectWorkPackage', () => {
    it('should call repository.createWorkPackage when arguments are valid', async () => {
      mockCreateWorkPackage.mockResolvedValueOnce({ id: 10 });

      const result = await createOpenProjectWorkPackage(
        '12',
        'Subj',
        'Task',
        'Desc',
        'High',
        'User1',
        undefined,
        'domain.com',
        'mykey',
      );

      expect(mockCreateWorkPackage).toHaveBeenCalledWith(
        '12',
        'Subj',
        'Task',
        'Desc',
        'High',
        'User1',
        'domain.com',
        'mykey',
      );
      expect(result).toEqual({ id: 10 });
    });

    it('should fallback to env variables if domain/apiKey are omitted', async () => {
      process.env.OPENPROJECT_DOMAIN = 'envdomain.com';
      process.env.OPENPROJECT_API_KEY = 'envkey';
      mockCreateWorkPackage.mockResolvedValueOnce({ id: 11 });

      await createOpenProjectWorkPackage('12', 'Subj', 'Task');

      expect(mockCreateWorkPackage).toHaveBeenCalledWith(
        '12',
        'Subj',
        'Task',
        undefined,
        undefined,
        undefined,
        'envdomain.com',
        'envkey',
      );
    });

    it('should throw error if projectId, subject, or type are missing', async () => {
      process.env.OPENPROJECT_DOMAIN = 'envdomain.com';
      process.env.OPENPROJECT_API_KEY = 'envkey';
      await expect(createOpenProjectWorkPackage('', 'Subj', 'Task')).rejects.toThrow(
        'OpenProject projectId, subject, and type are required to create a work package.',
      );
      await expect(createOpenProjectWorkPackage('12', '', 'Task')).rejects.toThrow(
        'OpenProject projectId, subject, and type are required to create a work package.',
      );
      await expect(createOpenProjectWorkPackage('12', 'Subj', '')).rejects.toThrow(
        'OpenProject projectId, subject, and type are required to create a work package.',
      );
    });
  });

  describe('getOpenProjectWorkPackageComments', () => {
    it('should call repository.getWorkPackageComments when arguments are valid', async () => {
      mockGetWorkPackageComments.mockResolvedValueOnce({ _embedded: { elements: [] } });

      const result = await getOpenProjectWorkPackageComments('wp1', 'domain.com', 'mykey', 1, 20);

      expect(mockGetWorkPackageComments).toHaveBeenCalledWith('wp1', 'domain.com', 'mykey', 1, 20);
      expect(result).toEqual({ _embedded: { elements: [] } });
    });

    it('should throw error if domain is missing', async () => {
      await expect(getOpenProjectWorkPackageComments('wp1', undefined, 'mykey')).rejects.toThrow(
        'OpenProject domain is required',
      );
    });
  });

  describe('addOpenProjectWorkPackageComment', () => {
    it('should call repository.addComment when arguments are valid', async () => {
      mockAddComment.mockResolvedValueOnce({ id: 1 });

      const result = await addOpenProjectWorkPackageComment(
        'wp1',
        'PASS: verified',
        'domain.com',
        'mykey',
      );

      expect(mockAddComment).toHaveBeenCalledWith('wp1', 'PASS: verified', 'domain.com', 'mykey');
      expect(result).toEqual({ id: 1 });
    });

    it('should fallback to env variables if domain/apiKey are omitted', async () => {
      process.env.OPENPROJECT_DOMAIN = 'envdomain.com';
      process.env.OPENPROJECT_API_KEY = 'envkey';
      mockAddComment.mockResolvedValueOnce({ id: 2 });

      await addOpenProjectWorkPackageComment('wp1', 'FAILED: step 2');

      expect(mockAddComment).toHaveBeenCalledWith(
        'wp1',
        'FAILED: step 2',
        'envdomain.com',
        'envkey',
      );
    });

    it('should throw error if workPackageId or comment is missing', async () => {
      await expect(
        addOpenProjectWorkPackageComment('', 'text', 'domain.com', 'key'),
      ).rejects.toThrow('OpenProject workPackageId and comment are required to add a comment.');
      await expect(
        addOpenProjectWorkPackageComment('wp1', '', 'domain.com', 'key'),
      ).rejects.toThrow('OpenProject workPackageId and comment are required to add a comment.');
    });

    it('should throw error if domain is missing', async () => {
      await expect(
        addOpenProjectWorkPackageComment('wp1', 'text', undefined, 'mykey'),
      ).rejects.toThrow('OpenProject domain is required');
    });

    it('should throw error if apiKey is missing', async () => {
      await expect(
        addOpenProjectWorkPackageComment('wp1', 'text', 'domain.com', undefined),
      ).rejects.toThrow('OpenProject apiKey is required');
    });
  });
});

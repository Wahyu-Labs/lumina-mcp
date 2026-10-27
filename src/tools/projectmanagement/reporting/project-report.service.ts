import * as fs from 'fs/promises';
import * as path from 'path';
import * as XLSX from 'xlsx';

export type ProjectTicketReportRow = {
  developerName: string;
  ticketNumber: string;
  title: string;
  hours: number;
  platform: string;
};

type ReportOptions = {
  platform: 'jira' | 'trello' | 'openproject';
  projectId: string;
  developerName?: string;
  from?: string;
  to?: string;
  outputDirectory?: string;
  jiraDomain?: string;
  jiraEmail?: string;
  jiraApiToken?: string;
  trelloApiKey?: string;
  trelloApiToken?: string;
  openProjectDomain?: string;
  openProjectApiKey?: string;
};

interface OpenProjectPage<T> {
  _embedded?: {
    elements?: T[];
  };
  _links?: {
    nextByOffset?: {
      href?: string;
    };
  };
}

interface JiraIssue {
  key: string;
  fields: {
    summary?: string;
    assignee?: {
      displayName?: string;
    } | null;
  };
}

interface JiraSearchResponse {
  issues?: JiraIssue[];
  total?: number;
}

interface JiraWorklog {
  author?: {
    displayName?: string;
  };
  started?: string;
  timeSpentSeconds?: number;
}

interface JiraWorklogResponse {
  worklogs?: JiraWorklog[];
  total?: number;
}

interface TrelloMember {
  fullName?: string;
  username?: string;
}

interface TrelloCard {
  id: string;
  idShort?: number;
  name?: string;
  members?: TrelloMember[];
}

interface OpenProjectWorkPackage {
  id: string | number;
  subject?: string;
  _links?: {
    assignee?: {
      title?: string;
    };
  };
}

interface OpenProjectTimeEntry {
  spentOn?: string;
  hours?: string | number;
  _links?: {
    workPackage?: {
      href?: string;
    };
    user?: {
      title?: string;
    };
  };
}

async function requestJson<T = unknown>(url: string, headers: Record<string, string>): Promise<T> {
  const response = await fetch(url, { headers: { Accept: 'application/json', ...headers } });
  if (!response.ok) throw new Error(`Request failed (${response.status}): ${await response.text()}`);
  return (await response.json()) as T;
}

async function fetchAllOpenProjectPages<T = unknown>(url: string, headers: Record<string, string>): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | undefined = url;
  while (nextUrl) {
    const page: OpenProjectPage<T> = await requestJson<OpenProjectPage<T>>(nextUrl, headers);
    results.push(...(page._embedded?.elements || []));
    const next: string | undefined = page._links?.nextByOffset?.href;
    nextUrl = next ? new URL(next, url).toString() : undefined;
  }
  return results;
}

function isDeveloperMatch(name: string | undefined, options: ReportOptions): boolean {
  return !options.developerName || Boolean(name && name.trim().toLocaleLowerCase() === options.developerName.trim().toLocaleLowerCase());
}

function dateMatches(value: string | undefined, from?: string, to?: string): boolean {
  if (!value) return true;
  const date = value.slice(0, 10);
  return (!from || date >= from) && (!to || date <= to);
}

async function fetchJira(options: ReportOptions): Promise<ProjectTicketReportRow[]> {
  const domain = options.jiraDomain || process.env.JIRA_DOMAIN;
  const email = options.jiraEmail || process.env.JIRA_EMAIL;
  const token = options.jiraApiToken || process.env.JIRA_API_TOKEN;
  if (!domain || !email || !token) throw new Error('Set JIRA_DOMAIN, JIRA_EMAIL, and JIRA_API_TOKEN or pass credentials.');
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\.atlassian\.net\/?$/, '').replace(/\/$/, '');
  const auth = `Basic ${Buffer.from(`${email}:${token}`).toString('base64')}`;
  const jql = `project = "${options.projectId.replace(/"/g, '\\"')}"`;
  const baseUrl = `https://${cleanDomain}.atlassian.net/rest/api/3/search`;
  const issues: JiraIssue[] = [];
  let startAt = 0;
  let total = Number.POSITIVE_INFINITY;
  while (startAt < total) {
    const searchUrl = new URL(baseUrl);
    searchUrl.searchParams.set('jql', jql);
    searchUrl.searchParams.set('startAt', String(startAt));
    searchUrl.searchParams.set('maxResults', '100');
    searchUrl.searchParams.set('fields', 'summary,assignee');
    const data = await requestJson<JiraSearchResponse>(searchUrl.toString(), { Authorization: auth });
    const pageIssues = data.issues || [];
    issues.push(...pageIssues);
    total = Number(data.total || 0);
    if (!pageIssues.length) break;
    startAt += pageIssues.length;
  }
  const rows: ProjectTicketReportRow[] = [];
  for (const issue of issues) {
    const assignee = issue.fields.assignee?.displayName || 'Unassigned';
    if (!isDeveloperMatch(assignee, options)) continue;
    const worklogUrl = new URL(`https://${cleanDomain}.atlassian.net/rest/api/3/issue/${encodeURIComponent(issue.key)}/worklog`);
    const logs: JiraWorklog[] = [];
    let logStartAt = 0;
    let logTotal = Number.POSITIVE_INFINITY;
    while (logStartAt < logTotal) {
      const pageUrl = new URL(worklogUrl);
      pageUrl.searchParams.set('startAt', String(logStartAt));
      pageUrl.searchParams.set('maxResults', '100');
      const page = await requestJson<JiraWorklogResponse>(pageUrl.toString(), { Authorization: auth });
      const pageWorklogs = page.worklogs || [];
      logs.push(...pageWorklogs);
      logTotal = Number(page.total || 0);
      if (!pageWorklogs.length) break;
      logStartAt += pageWorklogs.length;
    }
    let seconds = 0;
    for (const log of logs) {
      const author = log.author?.displayName || '';
      if (isDeveloperMatch(author, options) && dateMatches(log.started, options.from, options.to)) seconds += log.timeSpentSeconds || 0;
    }
    rows.push({ developerName: assignee, ticketNumber: issue.key, title: issue.fields.summary || '', hours: seconds / 3600, platform: 'Jira' });
  }
  return rows;
}

async function fetchTrello(options: ReportOptions): Promise<ProjectTicketReportRow[]> {
  const key = options.trelloApiKey || process.env.TRELLO_API_KEY;
  const token = options.trelloApiToken || process.env.TRELLO_API_TOKEN;
  if (!key || !token) throw new Error('Set TRELLO_API_KEY and TRELLO_API_TOKEN or pass credentials.');
  const url = new URL(`https://api.trello.com/1/boards/${encodeURIComponent(options.projectId)}/cards`);
  url.searchParams.set('fields', 'name,idShort,idMembers');
  url.searchParams.set('members', 'true');
  url.searchParams.set('member_fields', 'fullName,username');
  url.searchParams.set('key', key);
  url.searchParams.set('token', token);
  const cards = await requestJson<TrelloCard[]>(url.toString(), {});
  return (cards || []).flatMap((card: TrelloCard) => {
    const members = (card.members || []).map((member: TrelloMember) => member.fullName || member.username).filter((name): name is string => Boolean(name));
    const matched = members.filter((name: string) => isDeveloperMatch(name, options));
    return (options.developerName ? matched : (members.length ? members : ['Unassigned'])).map((name: string) => ({
      developerName: name, ticketNumber: String(card.idShort ?? card.id), title: card.name || '', hours: 0, platform: 'Trello',
    }));
  });
}

async function fetchOpenProject(options: ReportOptions): Promise<ProjectTicketReportRow[]> {
  const domain = options.openProjectDomain || process.env.OPENPROJECT_DOMAIN;
  const token = options.openProjectApiKey || process.env.OPENPROJECT_API_KEY;
  if (!domain || !token) throw new Error('Set OPENPROJECT_DOMAIN and OPENPROJECT_API_KEY or pass credentials.');
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const auth = `Basic ${Buffer.from(`apikey:${token}`).toString('base64')}`;
  const project = encodeURIComponent(options.projectId);
  const headers = { Authorization: auth };
  const wpUrl = `https://${cleanDomain}/api/v3/projects/${project}/work_packages?pageSize=100`;
  const timeUrl = `https://${cleanDomain}/api/v3/time_entries?pageSize=100&filters=${encodeURIComponent(JSON.stringify([{ project: { operator: '=', values: [options.projectId] } }]))}`;
  const [workPackages, timeEntries] = await Promise.all([
    fetchAllOpenProjectPages<OpenProjectWorkPackage>(wpUrl, headers),
    fetchAllOpenProjectPages<OpenProjectTimeEntry>(timeUrl, headers),
  ]);
  const entriesById = new Map<string, number>();
  for (const entry of timeEntries) {
    const date = entry.spentOn;
    const wpId = String(entry._links?.workPackage?.href || '').split('/').pop() || '';
    const person = entry._links?.user?.title || 'Unknown';
    if (!dateMatches(date, options.from, options.to) || !isDeveloperMatch(person, options)) continue;
    const hours = Number.parseFloat(String(entry.hours || '0')) || 0;
    entriesById.set(wpId, (entriesById.get(wpId) || 0) + hours);
  }
  return workPackages
    .filter((wp: OpenProjectWorkPackage) => isDeveloperMatch(wp._links?.assignee?.title, options))
    .map((wp: OpenProjectWorkPackage) => ({
      developerName: wp._links?.assignee?.title || 'Unassigned',
      ticketNumber: String(wp.id),
      title: wp.subject || '',
      hours: entriesById.get(String(wp.id)) || 0,
      platform: 'OpenProject',
    }));
}

export async function createProjectTicketReport(options: ReportOptions) {
  const rows = options.platform === 'jira' ? await fetchJira(options) : options.platform === 'trello' ? await fetchTrello(options) : await fetchOpenProject(options);
  const outputDirectory = path.resolve(options.outputDirectory || path.join(process.cwd(), 'reports'));
  await fs.mkdir(outputDirectory, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = `${options.platform}-${options.projectId.replace(/[^a-zA-Z0-9_-]/g, '-')}-developer-report-${stamp}`;
  const excelPath = path.join(outputDirectory, `${baseName}.xlsx`);
  const markdownPath = path.join(outputDirectory, `${baseName}.md`);
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows.map(({ developerName, ticketNumber, title, hours, platform }) => ({ 'Developer Name': developerName, 'Ticket Number': ticketNumber, Title: title, 'Hours Worked': hours, Platform: platform })));
  XLSX.utils.book_append_sheet(workbook, sheet, 'Developer Work');
  XLSX.writeFile(workbook, excelPath);
  const totalHours = rows.reduce((sum, row) => sum + row.hours, 0);
  const markdown = [
    `# Developer Work Report`, '',
    `- Platform: ${options.platform}`, `- Project / board: ${options.projectId}`,
    `- Period: ${options.from || 'all'} to ${options.to || 'all'}`, `- Total logged hours: ${totalHours.toFixed(2)}`, '',
    '| Developer Name | Ticket Number | Title | Hours Worked | Platform |', '| --- | --- | --- | ---: | --- |',
    ...rows.map(row => `| ${row.developerName.replace(/\|/g, '\\|')} | ${row.ticketNumber.replace(/\|/g, '\\|')} | ${row.title.replace(/\|/g, '\\|')} | ${row.hours.toFixed(2)} | ${row.platform} |`),
  ].join('\n');
  await fs.writeFile(markdownPath, markdown, 'utf8');
  return { rows, totalHours, excelPath, markdownPath };
}

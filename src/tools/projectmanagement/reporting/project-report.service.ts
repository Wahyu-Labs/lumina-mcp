import * as fs from 'fs/promises';
import * as path from 'path';
import XLSX from 'xlsx-js-style';

export type ProjectTicketReportRow = {
  developerName: string;
  ticketNumber: string;
  title: string;
  date: string;
  hours: number;
  platform: string;
  assignedDevelopers: string[];
  unassigned: boolean;
  hasWorklog: boolean;
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
  _embedded?: { elements?: T[] };
  _links?: { nextByOffset?: { href?: string } };
}

interface JiraIssue {
  key: string;
  fields: {
    summary?: string;
    created?: string;
    assignee?: { displayName?: string } | null;
  };
}

interface JiraSearchResponse {
  issues?: JiraIssue[];
  total?: number;
}

interface JiraWorklog {
  author?: { displayName?: string };
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
  createdAt?: string;
  _links?: { assignee?: { title?: string } };
}

interface OpenProjectTimeEntry {
  spentOn?: string;
  hours?: string | number;
  _links?: {
    entity?: { href?: string };
    workPackage?: { href?: string };
    user?: { title?: string };
  };
}

function parseOpenProjectHours(value: string | number | undefined): number {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (!value) return 0;
  const input = value.trim();
  const numeric = Number(input);
  if (Number.isFinite(numeric)) return numeric;
  const match = input.match(/^P(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/i);
  if (!match) return 0;
  return Number(match[1] || 0) * 24 + Number(match[2] || 0) + Number(match[3] || 0) / 60 + Number(match[4] || 0) / 3600;
}

async function requestJson<T = unknown>(url: string, headers: Record<string, string>): Promise<T> {
  const response = await fetch(url, { headers: { Accept: 'application/json', ...headers } });
  if (!response.ok) throw new Error(`Request failed (${response.status}): ${await response.text()}`);
  return (await response.json()) as T;
}

async function fetchAllOpenProjectPages<T>(url: string, headers: Record<string, string>, limit = 500): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | undefined = url;
  while (nextUrl && results.length < limit) {
    const page: OpenProjectPage<T> = await requestJson<OpenProjectPage<T>>(nextUrl, headers);
    const elements = page._embedded?.elements || [];
    results.push(...elements.slice(0, limit - results.length));
    const next = page._links?.nextByOffset?.href;
    nextUrl = next && elements.length ? new URL(next, url).toString() : undefined;
  }
  return results;
}

function isDeveloperMatch(name: string | undefined, options: ReportOptions): boolean {
  return !options.developerName || Boolean(name && name.trim().toLocaleLowerCase() === options.developerName.trim().toLocaleLowerCase());
}

function dateMatches(value: string | undefined, from?: string, to?: string): boolean {
  if (!value) return !from && !to;
  const date = value.slice(0, 10);
  return (!from || date >= from) && (!to || date <= to);
}

function dateOnly(value: string | undefined): string {
  return value?.slice(0, 10) || '';
}

function trelloCardCreatedDate(cardId: string): string {
  if (!/^[0-9a-f]{8}/i.test(cardId)) return '';
  const createdAtSeconds = Number.parseInt(cardId.slice(0, 8), 16);
  if (!Number.isFinite(createdAtSeconds) || createdAtSeconds <= 0) return '';
  return new Date(createdAtSeconds * 1000).toISOString().slice(0, 10);
}

function logRow(
  developerName: string,
  ticketNumber: string,
  title: string,
  date: string,
  hours: number,
  platform: string,
  assignedDevelopers: string[],
  unassigned: boolean,
  hasWorklog: boolean,
): ProjectTicketReportRow {
  return { developerName, ticketNumber, title, date, hours, platform, assignedDevelopers, unassigned, hasWorklog };
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
  while (startAt < total && issues.length < 500) {
    const searchUrl = new URL(baseUrl);
    searchUrl.searchParams.set('jql', jql);
    searchUrl.searchParams.set('startAt', String(startAt));
    searchUrl.searchParams.set('maxResults', String(Math.min(100, 500 - issues.length)));
    searchUrl.searchParams.set('fields', 'summary,assignee,created');
    const data = await requestJson<JiraSearchResponse>(searchUrl.toString(), { Authorization: auth });
    const pageIssues = data.issues || [];
    issues.push(...pageIssues.slice(0, 500 - issues.length));
    total = Number(data.total || 0);
    if (!pageIssues.length) break;
    startAt += pageIssues.length;
  }

  const rows: ProjectTicketReportRow[] = [];
  for (const issue of issues) {
    const assignedDevelopers = issue.fields.assignee?.displayName && isDeveloperMatch(issue.fields.assignee.displayName, options)
      ? [issue.fields.assignee.displayName]
      : [];
    const unassigned = !issue.fields.assignee?.displayName;
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
    let foundMatchingLog = false;
    for (const log of logs) {
      const author = log.author?.displayName || 'Unknown';
      if (!isDeveloperMatch(author, options) || !dateMatches(log.started, options.from, options.to)) continue;
      foundMatchingLog = true;
      rows.push(logRow(author, issue.key, issue.fields.summary || '', dateOnly(issue.fields.created), (log.timeSpentSeconds || 0) / 3600, 'Jira', assignedDevelopers, unassigned, true));
    }
    if (!foundMatchingLog) {
      const fallbackDeveloper = options.developerName || assignedDevelopers[0] || '';
      rows.push(logRow(fallbackDeveloper, issue.key, issue.fields.summary || '', dateOnly(issue.fields.created), 0, 'Jira', assignedDevelopers, unassigned, false));
    }
  }
  return rows;
}

async function fetchTrello(options: ReportOptions): Promise<ProjectTicketReportRow[]> {
  const key = options.trelloApiKey || process.env.TRELLO_API_KEY;
  const token = options.trelloApiToken || process.env.TRELLO_API_TOKEN;
  if (!key || !token) throw new Error('Set TRELLO_API_KEY and TRELLO_API_TOKEN or pass credentials.');
  const url = new URL(`https://api.trello.com/1/boards/${encodeURIComponent(options.projectId)}/cards/all`);
  url.searchParams.set('limit', '500');
  url.searchParams.set('fields', 'name,idShort,idMembers');
  url.searchParams.set('members', 'true');
  url.searchParams.set('member_fields', 'fullName,username');
  url.searchParams.set('key', key);
  url.searchParams.set('token', token);
  const cards = await requestJson<TrelloCard[]>(url.toString(), {});
  return (cards || []).slice(0, 500).flatMap((card) => {
    const members = (card.members || []).map((member) => member.fullName || member.username).filter((name): name is string => Boolean(name));
    const matched = members.filter((name) => isDeveloperMatch(name, options));
    const developers = options.developerName ? [options.developerName] : (members.length ? members : ['']);
    return developers.map((name) => logRow(name, String(card.idShort ?? card.id), card.name || '', trelloCardCreatedDate(card.id), 0, 'Trello', matched, members.length === 0, false));
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
    fetchAllOpenProjectPages<OpenProjectWorkPackage>(wpUrl, headers, 500),
    fetchAllOpenProjectPages<OpenProjectTimeEntry>(timeUrl, headers, Number.MAX_SAFE_INTEGER),
  ]);
  const workPackagesById = new Map(workPackages.map((wp) => [String(wp.id), wp]));
  const rows: ProjectTicketReportRow[] = [];
  const loggedPackages = new Set<string>();
  for (const entry of timeEntries) {
    const worklogDate = entry.spentOn || '';
    const entityHref = entry._links?.entity?.href || entry._links?.workPackage?.href;
    const wpId = entityHref ? new URL(entityHref, `https://${cleanDomain}`).pathname.split('/').pop() || '' : '';
    const workPackage = workPackagesById.get(wpId);
    if (!workPackage || !dateMatches(worklogDate, options.from, options.to)) continue;
    const developer = entry._links?.user?.title || 'Unknown';
    if (!isDeveloperMatch(developer, options)) continue;
    const assignedDeveloper = workPackage._links?.assignee?.title;
    const assignedDevelopers = assignedDeveloper && isDeveloperMatch(assignedDeveloper, options) ? [assignedDeveloper] : [];
    loggedPackages.add(wpId);
    rows.push(logRow(developer, wpId, workPackage.subject || '', dateOnly(workPackage.createdAt), parseOpenProjectHours(entry.hours), 'OpenProject', assignedDevelopers, !assignedDeveloper, true));
  }
  for (const wp of workPackages) {
    const id = String(wp.id);
    if (loggedPackages.has(id)) continue;
    const assignedDeveloper = wp._links?.assignee?.title;
    const assignedDevelopers = assignedDeveloper && isDeveloperMatch(assignedDeveloper, options) ? [assignedDeveloper] : [];
    const developer = options.developerName || assignedDevelopers[0] || '';
    rows.push(logRow(developer, id, wp.subject || '', dateOnly(wp.createdAt), 0, 'OpenProject', assignedDevelopers, !assignedDeveloper, false));
  }
  return rows;
}

function formatDuration(hours: number): string {
  const minutes = Math.round(hours * 60);
  return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;
}

function formatReportDate(value: string): string {
  if (!value) return '';
  const date = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(date);
}

function buildReportMatrix(rows: ProjectTicketReportRow[]) {
  const developers = [...new Set(rows.flatMap((row) => [row.developerName, ...row.assignedDevelopers]).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  const tickets = new Map<string, {
    title: string;
    ticketNumber: string;
    date: string;
    hoursByDeveloper: Map<string, number>;
    assignedDevelopers: Set<string>;
    developersWithWorklogs: Set<string>;
    unassigned: boolean;
  }>();
  for (const row of rows) {
    const key = `${row.ticketNumber}\u0000${row.date}`;
    const ticket = tickets.get(key) || {
      title: row.title, ticketNumber: row.ticketNumber, date: row.date,
      hoursByDeveloper: new Map<string, number>(), assignedDevelopers: new Set<string>(),
      developersWithWorklogs: new Set<string>(), unassigned: row.unassigned,
    };
    row.assignedDevelopers.forEach((developer) => ticket.assignedDevelopers.add(developer));
    if (row.developerName) {
      ticket.hoursByDeveloper.set(row.developerName, (ticket.hoursByDeveloper.get(row.developerName) || 0) + row.hours);
      if (row.hasWorklog) ticket.developersWithWorklogs.add(row.developerName);
    }
    tickets.set(key, ticket);
  }
  const ticketRows = [...tickets.values()].sort((a, b) => (a.date || '9999-99-99').localeCompare(b.date || '9999-99-99') || a.ticketNumber.localeCompare(b.ticketNumber, undefined, { numeric: true }));
  const totals = new Map(developers.map((developer) => [developer, rows.filter((row) => row.developerName === developer).reduce((sum, row) => sum + row.hours, 0)]));
  return { developers, ticketRows, totals, totalHours: rows.reduce((sum, row) => sum + row.hours, 0) };
}

export async function createProjectTicketReport(options: ReportOptions) {
  const rows = options.platform === 'jira' ? await fetchJira(options) : options.platform === 'trello' ? await fetchTrello(options) : await fetchOpenProject(options);
  const outputDirectory = path.resolve(options.outputDirectory || path.join(process.cwd(), 'reports'));
  await fs.mkdir(outputDirectory, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = `${options.platform}-${options.projectId.replace(/[^a-zA-Z0-9_-]/g, '-')}-developer-report-${stamp}`;
  const excelPath = path.join(outputDirectory, `${baseName}.xlsx`);
  const markdownPath = path.join(outputDirectory, `${baseName}.md`);
  const { developers, ticketRows, totals, totalHours } = buildReportMatrix(rows);
  const headers = ["Project's Tasks", 'Date', ...developers];
  const data = [
    headers,
    ['Total Working Time:', '', ...developers.map((developer) => totals.get(developer) || 0)],
    ...ticketRows.map((ticket) => [
      `${ticket.ticketNumber} ${ticket.title}`.trim(), formatReportDate(ticket.date),
      ...developers.map((developer) => ticket.hoursByDeveloper.get(developer) || 0),
    ]),
  ];
  const sheet = XLSX.utils.aoa_to_sheet(data);
  sheet['!cols'] = [{ wch: 56 }, { wch: 18 }, ...developers.map(() => ({ wch: 20 }))];
  const gridBorder = {
    top: { style: 'thin', color: { rgb: '000000' } },
    bottom: { style: 'thin', color: { rgb: '000000' } },
    left: { style: 'thin', color: { rgb: '000000' } },
    right: { style: 'thin', color: { rgb: '000000' } },
  };
  for (let rowIndex = 0; rowIndex < data.length; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < headers.length; columnIndex += 1) {
      const cell = sheet[XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex })];
      if (cell) cell.s = { border: gridBorder, alignment: { horizontal: columnIndex === 0 ? 'left' : 'center', vertical: 'center' } };
    }
  }
  for (let rowIndex = 1; rowIndex < data.length; rowIndex += 1) {
    for (let columnIndex = 2; columnIndex < headers.length; columnIndex += 1) {
      const cell = sheet[XLSX.utils.encode_cell({ r: rowIndex, c: columnIndex })];
      if (cell) {
        cell.t = 'n';
        cell.z = '[h]:mm';
        cell.v = Number(cell.v || 0) / 24;
        if (rowIndex === 1) cell.s = { border: gridBorder, font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } };
      }
    }
  }
  for (let columnIndex = 0; columnIndex < headers.length; columnIndex += 1) {
    const header = sheet[XLSX.utils.encode_cell({ r: 0, c: columnIndex })];
    if (header) header.s = { border: gridBorder, fill: { patternType: 'solid', fgColor: { rgb: 'F4CCCC' } }, font: { bold: true }, alignment: { horizontal: 'center', vertical: 'center' } };
  }
  const totalLabel = sheet.A2;
  if (totalLabel) totalLabel.s = { border: gridBorder, font: { bold: true }, alignment: { horizontal: 'right', vertical: 'center' } };
  ticketRows.forEach((ticket, index) => {
    const sheetRow = index + 2;
    const taskCell = sheet[XLSX.utils.encode_cell({ r: sheetRow, c: 0 })];
    if (ticket.unassigned && taskCell) taskCell.s = { border: gridBorder, fill: { patternType: 'solid', fgColor: { rgb: 'FFFF00' } }, alignment: { horizontal: 'left', vertical: 'center' } };
    developers.forEach((developer, developerIndex) => {
      if (!ticket.assignedDevelopers.has(developer) || ticket.developersWithWorklogs.has(developer)) return;
      const cell = sheet[XLSX.utils.encode_cell({ r: sheetRow, c: developerIndex + 2 })];
      if (cell) cell.s = { border: gridBorder, fill: { patternType: 'solid', fgColor: { rgb: 'FFFF00' } }, alignment: { horizontal: 'center', vertical: 'center' } };
    });
  });
  const merges: XLSX.Range[] = [];
  let dateStart = 2;
  while (dateStart < data.length) {
    const date = ticketRows[dateStart - 2]?.date;
    let dateEnd = dateStart;
    while (date && dateEnd + 1 < data.length && ticketRows[dateEnd - 1]?.date === date) dateEnd += 1;
    if (date && dateEnd > dateStart) merges.push({ s: { r: dateStart, c: 1 }, e: { r: dateEnd, c: 1 } });
    dateStart = dateEnd + 1;
  }
  if (merges.length) sheet['!merges'] = merges;
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, 'Developer Work');
  XLSX.writeFile(workbook, excelPath, { cellStyles: true });

  const markdown = [
    `# Project Time Tracking Report`, '',
    `- Platform: ${options.platform}`, `- Project / board: ${options.projectId}`,
    `- Period: ${options.from || 'all'} to ${options.to || 'all'}`, `- Tickets included: ${new Set(rows.map((row) => row.ticketNumber)).size} (maximum 500)`,
    `- Total working time: ${formatDuration(totalHours)}`, '',
    `| Project's Tasks | Date | ${developers.map((developer) => developer.replace(/\|/g, '\\|')).join(' | ')} |`,
    `| --- | --- | ${developers.map(() => '---:').join(' | ')} |`,
    `| **Total Working Time:** | | ${developers.map((developer) => formatDuration(totals.get(developer) || 0)).join(' | ')} |`,
    ...ticketRows.map((ticket) => `| ${`${ticket.ticketNumber} ${ticket.title}`.replace(/\|/g, '\\|').trim()} | ${formatReportDate(ticket.date)} | ${developers.map((developer) => formatDuration(ticket.hoursByDeveloper.get(developer) || 0)).join(' | ')} |`),
  ].join('\n');
  await fs.writeFile(markdownPath, markdown, 'utf8');
  return { rows, totalHours, excelPath, markdownPath, ticketCount: new Set(rows.map((row) => row.ticketNumber)).size };
}

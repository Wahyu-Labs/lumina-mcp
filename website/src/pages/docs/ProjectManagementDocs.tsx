import { useTranslation, Trans } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

export function ProjectManagementDocs() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const version = searchParams.get('v') || '1.2.0'
  const showGithubIssue = version !== '1.1.3'

  return (
    <>
      <div className="mb-8">
        <span className="text-accent font-semibold tracking-wider text-sm uppercase">{t('docs.projectManagement.badge')}</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{t('docs.projectManagement.title')}</h1>
        <p className="text-xl text-muted-foreground mt-4">
          {showGithubIssue ? (
            <Trans i18nKey="docs.projectManagement.subtitleGithub" components={[<strong key="0" />]} />
          ) : (
            <Trans i18nKey="docs.projectManagement.subtitle" components={[<strong key="0" />]} />
          )}
        </p>
      </div>

      <h2>{t('docs.projectManagement.setupTitle')}</h2>
      <p>
        {t('docs.projectManagement.setupDesc')}
      </p>

      <div className="overflow-x-auto rounded-lg border border-border my-6 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr className="border-b border-border">
              <th className="p-4 font-semibold text-foreground">{t('docs.projectManagement.table.platform')}</th>
              <th className="p-4 font-semibold text-foreground">{t('docs.projectManagement.table.variable')}</th>
              <th className="p-4 font-semibold text-foreground">{t('docs.projectManagement.table.description')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs md:text-sm text-foreground/80">
            <tr>
              <td className="p-4 font-semibold text-foreground">Jira</td>
              <td className="p-4 font-mono text-accent text-xs">JIRA_URL</td>
              <td className="p-4"><Trans i18nKey="docs.projectManagement.table.descJiraUrl" components={[<code key="0" className="text-xs bg-muted p-1 rounded font-mono" />]} /></td>
            </tr>
            <tr>
              <td className="p-4 border-r border-border/30 hidden md:table-cell"></td>
              <td className="p-4 font-mono text-accent text-xs">JIRA_EMAIL</td>
              <td className="p-4">{t('docs.projectManagement.table.descJiraEmail')}</td>
            </tr>
            <tr>
              <td className="p-4 border-r border-border/30 hidden md:table-cell"></td>
              <td className="p-4 font-mono text-accent text-xs">JIRA_API_TOKEN</td>
              <td className="p-4">{t('docs.projectManagement.table.descJiraToken')}</td>
            </tr>
            
            <tr className="border-t-[3px] border-border/60">
              <td className="p-4 font-semibold text-foreground">Trello</td>
              <td className="p-4 font-mono text-accent text-xs">TRELLO_API_KEY</td>
              <td className="p-4">{t('docs.projectManagement.table.descTrelloKey')}</td>
            </tr>
            <tr>
              <td className="p-4 border-r border-border/30 hidden md:table-cell"></td>
              <td className="p-4 font-mono text-accent text-xs">TRELLO_API_TOKEN</td>
              <td className="p-4">{t('docs.projectManagement.table.descTrelloToken')}</td>
            </tr>
            
            <tr className="border-t-[3px] border-border/60">
              <td className="p-4 font-semibold text-foreground">OpenProject</td>
              <td className="p-4 font-mono text-accent text-xs">OPENPROJECT_URL</td>
              <td className="p-4">{t('docs.projectManagement.table.descOpUrl')}</td>
            </tr>
            <tr>
              <td className="p-4 border-r border-border/30 hidden md:table-cell"></td>
              <td className="p-4 font-mono text-accent text-xs">OPENPROJECT_API_KEY</td>
              <td className="p-4">{t('docs.projectManagement.table.descOpKey')}</td>
            </tr>
            {showGithubIssue && (
              <tr className="border-t-[3px] border-border/60">
                <td className="p-4 font-semibold text-foreground">GitHub</td>
                <td className="p-4 font-mono text-accent text-xs">GITHUB_TOKEN</td>
                <td className="p-4">{t('docs.projectManagement.table.descGithubToken', 'GitHub Personal Access Token for fetching issues (or GITHUB_PERSONAL_ACCESS_TOKEN).')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <hr className="my-10 border-border" />

      <h2>{t('docs.projectManagement.toolsTitle')}</h2>
      <p>
        {t('docs.projectManagement.toolsDesc')}
      </p>

      <div className="space-y-6 mt-6">
        
        {/* Tool 1 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">get_jira_ticket</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">Jira</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.projectManagement.tools.t1Desc')}
          </p>
        </div>

        {/* Tool 2 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">get_trello_card</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">Trello</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.projectManagement.tools.t2Desc')}
          </p>
        </div>

        {/* Tool 3 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">get_openproject_work_package</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">OpenProject</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.projectManagement.tools.t3Desc')}
          </p>
        </div>

        {/* Tool 4 */}
        {showGithubIssue && (
          <div className="p-5 border border-border rounded-xl bg-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h3 className="font-mono text-base md:text-lg text-accent m-0">get_github_issue</h3>
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">GitHub</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground m-0">
              {t('docs.projectManagement.tools.t4Desc', 'Fetch a GitHub issue with complete context including comments, labels, milestones, and linked PRs.')}
            </p>
          </div>
        )}

      </div>

      <hr className="my-10 border-border" />

      <h2>{t('docs.projectManagement.promptsTitle')}</h2>
      <p>
        {t('docs.projectManagement.promptsDesc')}
      </p>

      <div className="space-y-6 mt-6">
        
        {/* Prompt 1 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-emerald-500 m-0 mb-2">/pm_summarize_ticket</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.projectManagement.prompts.p1Desc')}
          </p>
          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.projectManagement.prompts.exampleUsage')}</span>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
            /pm_summarize_ticket "{t('docs.projectManagement.prompts.p1Query')}"
          </div>
        </div>

        {/* Prompt 2 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-emerald-500 m-0 mb-2">/pm_brainstorm_plan</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.projectManagement.prompts.p2Desc')}
          </p>
          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.projectManagement.prompts.exampleUsage')}</span>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
            /pm_brainstorm_plan "{t('docs.projectManagement.prompts.p2Query')}"
          </div>
        </div>

        {/* Prompt 3 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-emerald-500 m-0 mb-2">/pm_test_catalog</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.projectManagement.prompts.p3Desc')}
          </p>
          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.projectManagement.prompts.exampleUsage')}</span>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
            /pm_test_catalog "{t('docs.projectManagement.prompts.p3Query')}"
          </div>
        </div>

      </div>
    </>
  )
}

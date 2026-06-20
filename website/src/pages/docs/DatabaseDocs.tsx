import { useTranslation, Trans } from 'react-i18next'

export function DatabaseDocs() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mb-8">
        <span className="text-accent font-semibold tracking-wider text-sm uppercase">{t('docs.database.badge')}</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{t('docs.database.title')}</h1>
        <p className="text-xl text-muted-foreground mt-4">
          {t('docs.database.subtitle')}
        </p>
      </div>

      <h2>{t('docs.database.setupTitle')}</h2>
      <p>
        {t('docs.database.setupDesc')}
      </p>

      <div className="overflow-x-auto rounded-lg border border-border my-6 bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted">
            <tr className="border-b border-border">
              <th className="p-4 font-semibold text-foreground">{t('docs.database.table.variable')}</th>
              <th className="p-4 font-semibold text-foreground">{t('docs.database.table.description')}</th>
              <th className="p-4 font-semibold text-foreground">{t('docs.database.table.example')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs md:text-sm text-foreground/80">
            <tr>
              <td className="p-4 font-mono text-accent">MYSQL_URL</td>
              <td className="p-4">{t('docs.database.table.descMysql')}</td>
              <td className="p-4"><code className="text-xs bg-muted p-1 rounded font-mono">mysql://user:pass@127.0.0.1:3306/db_name</code></td>
            </tr>
            <tr>
              <td className="p-4 font-mono text-accent">POSTGRES_URL</td>
              <td className="p-4">{t('docs.database.table.descPostgres')}</td>
              <td className="p-4"><code className="text-xs bg-muted p-1 rounded font-mono">postgres://user:pass@localhost:5432/db_name</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 my-8">
        <h3 className="text-blue-500 font-semibold mt-0 mb-2 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          {t('docs.database.securityTitle')}
        </h3>
        <p className="mb-0 text-xs md:text-sm leading-relaxed text-muted-foreground">
          <Trans i18nKey="docs.database.securityDesc" components={[<strong key="0" />, <code key="1" className="text-accent bg-muted px-1 rounded" />, <code key="2" className="text-accent bg-muted px-1 rounded" />, <code key="3" className="text-accent bg-muted px-1 rounded" />, <code key="4" className="text-accent bg-muted px-1 rounded" />]} />
        </p>
      </div>

      <hr className="my-10 border-border" />

      <h2>{t('docs.database.toolsTitle')}</h2>
      <p>
        {t('docs.database.toolsDesc')}
      </p>

      <div className="space-y-6 mt-6">
        
        {/* Tool 1 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">execute_mysql_query / execute_postgres_query</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">{t('docs.database.tools.t1Badge')}</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.database.tools.t1Desc')}
          </p>
        </div>

        {/* Tool 2 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">list_mysql_tables / list_postgresql_tables</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">{t('docs.database.tools.t2Badge')}</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.database.tools.t2Desc')}
          </p>
        </div>

        {/* Tool 3 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">inspect_mysql_table / inspect_postgresql_table</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">{t('docs.database.tools.t3Badge')}</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.database.tools.t3Desc')}
          </p>
        </div>

        {/* Tool 4 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">analyze_mysql_query / analyze_postgresql_query</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">{t('docs.database.tools.t4Badge')}</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            <Trans i18nKey="docs.database.tools.t4Desc" components={[<code key="0" className="font-mono text-xs" />]} />
          </p>
        </div>

        {/* Tool 5 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">save_audit_report / save_audit_report_pg</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">{t('docs.database.tools.t5Badge')}</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.database.tools.t5Desc')}
          </p>
        </div>

      </div>

      <hr className="my-10 border-border" />

      <h2>{t('docs.database.promptsTitle')}</h2>
      <p>
        {t('docs.database.promptsDesc')}
      </p>

      <div className="space-y-6 mt-6">
        
        {/* Prompt 1 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-blue-500 m-0 mb-2">/running_query <span className="text-muted-foreground text-sm font-sans">(MySQL)</span></h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.database.prompts.p1Desc')}
          </p>
          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.database.prompts.exampleUsage')}</span>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
            /running_query "{t('docs.database.prompts.p1Query')}"
          </div>
        </div>

        {/* Prompt 2 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-blue-500 m-0 mb-2">/auditor_query <span className="text-muted-foreground text-sm font-sans">(MySQL)</span></h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.database.prompts.p2Desc')}
          </p>
          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.database.prompts.exampleUsage')}</span>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
            /auditor_query "{t('docs.database.prompts.p2Query')}"
          </div>
        </div>

        {/* Prompt 3 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-blue-500 m-0 mb-2">/running_pg_query <span className="text-muted-foreground text-sm font-sans">(PostgreSQL)</span></h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.database.prompts.p3Desc')}
          </p>
          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.database.prompts.exampleUsage')}</span>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
            /running_pg_query "{t('docs.database.prompts.p3Query')}"
          </div>
        </div>

        {/* Prompt 4 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-blue-500 m-0 mb-2">/auditor_pg_query <span className="text-muted-foreground text-sm font-sans">(PostgreSQL)</span></h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.database.prompts.p4Desc')}
          </p>
          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.database.prompts.exampleUsage')}</span>
          <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
            /auditor_pg_query "{t('docs.database.prompts.p4Query')}"
          </div>
        </div>
      </div>
    </>
  )
}

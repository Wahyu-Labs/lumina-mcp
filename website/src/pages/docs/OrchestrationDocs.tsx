import { CheckCircle2, XCircle } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'

export function OrchestrationDocs() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mb-8">
        <span className="text-accent font-semibold tracking-wider text-sm uppercase">{t('docs.orchestration.badge')}</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{t('docs.orchestration.title')}</h1>
        <p className="text-xl text-muted-foreground mt-4">
          {t('docs.orchestration.subtitle')}
        </p>
      </div>

      <h2>{t('docs.orchestration.workflowTitle')}</h2>
      <p>
        {t('docs.orchestration.workflowDesc')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-10">
        {/* YES Test */}
        <div className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-5">
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider pb-3 border-b border-border/40">
            <CheckCircle2 className="w-4 h-4" /> includeTest: YES
          </div>
          <div className="flex flex-col gap-0 relative pt-1">
            
            {/* Phase 1 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">1</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p1Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p1Desc')}</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">2</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p2Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p2Desc')}</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">3</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p3Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p3Desc')}</span>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">4</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p4Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p4Desc')}</span>
              </div>
            </div>

            {/* Phase 5 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">5</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p5Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p5Desc')}</span>
              </div>
            </div>

            {/* Phase 6 */}
            <div className="flex items-start gap-4 relative group">
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">6</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p6Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p6Desc')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* NO Test */}
        <div className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-5">
          <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider pb-3 border-b border-border/40">
            <XCircle className="w-4 h-4" /> includeTest: NO
          </div>
          <div className="flex flex-col gap-0 relative pt-1">
            
            {/* Phase 1 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">1</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p1Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p1Desc')}</span>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">2</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p2Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p2Desc')}</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">3</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p4Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p4Desc')}</span>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="flex items-start gap-4 relative group">
              <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">4</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p5Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p5Desc')}</span>
              </div>
            </div>

            {/* Phase 5 */}
            <div className="flex items-start gap-4 relative group">
              <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">5</div>
              <div className="pb-5">
                <span className="text-foreground font-semibold text-sm block">{t('docs.orchestration.phases.p6Title')}</span>
                <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{t('docs.orchestration.phases.p6Desc')}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <hr className="my-10 border-border" />

      <hr className="my-10 border-border" />

      <h2>{t('docs.orchestration.toolsTitle')}</h2>
      
      <div className="space-y-6 mt-6">
        {/* Tool 1 */}
        <div className="p-5 border border-border rounded-xl bg-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <h3 className="font-mono text-base md:text-lg text-accent m-0">get_orchestration_phase</h3>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded bg-muted border border-border self-start sm:self-auto">{t('docs.orchestration.tools.t1Badge')}</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground m-0">
            {t('docs.orchestration.tools.t1Desc')}
          </p>
        </div>
      </div>

      <hr className="my-10 border-border" />

      <hr className="my-10 border-border" />

      <h2>{t('docs.orchestration.promptsTitle')}</h2>
      <p>
        <Trans i18nKey="docs.orchestration.promptsDesc" components={[<code key="0" />]} />
      </p>

      <div className="space-y-6 mt-6">
        
        {/* Prompt 1 */}
        <div className="p-6 border border-border rounded-xl bg-card">
          <h3 className="font-mono text-lg text-purple-500 m-0 mb-2">/lumina_orchestrate</h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-4">
            {t('docs.orchestration.prompts.p1Desc')}
          </p>



          <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-2">{t('docs.orchestration.prompts.exampleUsage')}</span>
          
          <div className="space-y-3">
            <div>
              <span className="text-[11px] font-semibold text-foreground/80 mb-1 block">{t('docs.orchestration.prompts.generalFeature')}</span>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
                /lumina_orchestrate "Build a new login page" includeTest=true tokenBudget="save-tokens"
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-foreground/80 mb-1 block">{t('docs.orchestration.prompts.jiraIntegration')}</span>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
                /lumina_orchestrate "Implement requirements from Jira ticket LUM-402" includeTest=true tokenBudget="full-detail"
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-foreground/80 mb-1 block">{t('docs.orchestration.prompts.trelloIntegration')}</span>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
                /lumina_orchestrate "Fetch checklist from Trello card 64b19c and build it" includeTest=false tokenBudget="save-tokens"
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-foreground/80 mb-1 block">{t('docs.orchestration.prompts.opIntegration')}</span>
              <div className="bg-muted p-3 rounded-lg font-mono text-sm border border-border/50 text-foreground overflow-x-auto">
                /lumina_orchestrate "Execute OpenProject work package #82" includeTest=true tokenBudget="save-tokens"
              </div>
            </div>
          </div>
        </div>

      </div>

      <hr className="my-10 border-border" />

      <hr className="my-10 border-border" />

      <h2>{t('docs.orchestration.fallbackTitle')}</h2>
      <p className="mb-4">
        <Trans i18nKey="docs.orchestration.fallbackDesc" components={[<strong key="0" />, <strong key="1" />]} />
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        
        <div className="p-5 border border-border rounded-xl bg-card">
          <h4 className="font-bold text-accent text-sm m-0">fallback-brainstorm.md</h4>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {t('docs.orchestration.fallbacks.f1Desc')}
          </p>
        </div>

        <div className="p-5 border border-border rounded-xl bg-card">
          <h4 className="font-bold text-accent text-sm m-0">fallback-planning.md</h4>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {t('docs.orchestration.fallbacks.f2Desc')}
          </p>
        </div>

        <div className="p-5 border border-border rounded-xl bg-card">
          <h4 className="font-bold text-accent text-sm m-0">fallback-work.md</h4>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {t('docs.orchestration.fallbacks.f3Desc')}
          </p>
        </div>

        <div className="p-5 border border-border rounded-xl bg-card">
          <h4 className="font-bold text-accent text-sm m-0">fallback-review.md</h4>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            {t('docs.orchestration.fallbacks.f4Desc')}
          </p>
        </div>

        <div className="p-5 border border-border rounded-xl bg-card md:col-span-2">
          <h4 className="font-bold text-accent text-sm m-0">fallback-compound.md</h4>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            <Trans i18nKey="docs.orchestration.fallbacks.f5Desc" components={[<code key="0" className="bg-muted px-1 rounded font-mono" />]} />
          </p>
        </div>

      </div>
    </>
  )
}

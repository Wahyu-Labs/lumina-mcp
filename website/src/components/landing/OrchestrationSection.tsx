import { useState } from "react"
import { Bot, Sparkles, Command, ArrowRight, MessageSquare, Route, CheckCircle2, XCircle, Copy, Check } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation, Trans } from "react-i18next"

// ORCHESTRATION_PROMPT, PHASES_WITH_TEST, and PHASES_WITHOUT_TEST will be generated in the component to access translations

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      onClick={handleCopy} 
      className="p-1.5 rounded-md bg-background border border-border/40 hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all ml-auto shrink-0 shadow-sm"
      title="Copy prompt"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export function OrchestrationSection() {
  const { t } = useTranslation();

  const ORCHESTRATION_PROMPT = {
    name: t('orchestration.promptName'),
    desc: t('orchestration.promptDesc'),
    examples: [
      { label: "General Feature", cmd: '/lumina_orchestrate "Build a new login page" includeTest=true tokenBudget="save-tokens"' },
      { label: "Jira Integration", cmd: '/lumina_orchestrate "Implement requirements from Jira ticket LUM-402" includeTest=true tokenBudget="full-detail"' },
      { label: "Trello Integration", cmd: '/lumina_orchestrate "Fetch checklist from Trello card 64b19c and build it" includeTest=false tokenBudget="save-tokens"' },
      { label: "OpenProject Integration", cmd: '/lumina_orchestrate "Execute OpenProject work package #82" includeTest=true tokenBudget="save-tokens"' }
    ]
  }

  const PHASES_WITH_TEST = [
    { name: t('orchestration.phases.planning'), desc: t('orchestration.phases.planningDesc') },
    { name: t('orchestration.phases.execution'), desc: t('orchestration.phases.executionDesc') },
    { name: t('orchestration.phases.testing'), desc: t('orchestration.phases.testingDesc') },
    { name: t('orchestration.phases.codeReview'), desc: t('orchestration.phases.codeReviewDesc') },
    { name: t('orchestration.phases.verification'), desc: t('orchestration.phases.verificationDesc') },
    { name: t('orchestration.phases.git'), desc: t('orchestration.phases.gitDesc') }
  ]

  const PHASES_WITHOUT_TEST = [
    { name: t('orchestration.phases.planning'), desc: t('orchestration.phases.planningDesc') },
    { name: t('orchestration.phases.execution'), desc: t('orchestration.phases.executionDesc') },
    { name: t('orchestration.phases.codeReview'), desc: t('orchestration.phases.codeReviewDesc') },
    { name: t('orchestration.phases.verification'), desc: t('orchestration.phases.verificationDesc') },
    { name: t('orchestration.phases.git'), desc: t('orchestration.phases.gitDesc') }
  ]

  return (
    <section className="py-24 bg-muted/20 transition-colors w-full border-b border-border/40" id="orchestration">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info & Action */}
          <div className="flex flex-col items-start text-left lg:sticky lg:top-24">
            <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
              <Bot className="h-6 w-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-6">
              {t('orchestration.title')}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t('orchestration.subtitle')}
            </p>

            {/* Compound Engineering Alert */}
            <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 flex items-start gap-4 mb-10 w-full">
              <Sparkles className="h-6 w-6 text-indigo-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-foreground text-sm m-0">{t('orchestration.pluginTitle')}</h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed m-0">
                  <Trans i18nKey="orchestration.pluginDesc">
                    If you use the <a href="https://github.com/EveryInc/compound-engineering-plugin" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline font-semibold">Compound Engineering plugin</a> features, the orchestration results are significantly better! Lumina leverages its advanced specialized agents natively.
                  </Trans>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row flex-wrap gap-3">
              <Link
                to="/docs/orchestration"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold shadow-md hover:scale-[1.02] hover:bg-foreground/95 active:scale-[0.98] transition-all duration-200"
              >
                {t('orchestration.docs')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Prompt & Phases */}
          <div className="flex flex-col gap-6">
            
            {/* Orchestration Prompt */}
            <div className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 backdrop-blur-sm flex flex-col gap-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5 border border-indigo-500/20">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-foreground m-0">{ORCHESTRATION_PROMPT.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed m-0">{ORCHESTRATION_PROMPT.desc}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/40 text-xs flex flex-col gap-3">
                <span className="text-[10px] uppercase font-extrabold text-muted-foreground tracking-wider block mb-1">{t('orchestration.examplePrompts')}</span>
                {ORCHESTRATION_PROMPT.examples.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold text-foreground/80">{item.label}</span>
                    <div className="font-mono bg-muted/80 p-2 pl-3 rounded-lg flex items-center gap-3 text-accent border border-border/60 overflow-hidden relative group">
                      <Command className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <span className="overflow-x-auto whitespace-nowrap scrollbar-hide py-1 mr-8">{item.cmd}</span>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyButton text={item.cmd} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Routing Header */}
            <div className="mt-4 flex items-center gap-2 border-b border-border/40 pb-2">
              <Route className="h-4.5 w-4.5 text-indigo-500" />
              <h3 className="text-sm font-bold text-foreground">{t('orchestration.pipelinesTitle')}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              <Trans i18nKey="orchestration.pipelinesDesc">
                The orchestration flow adapts based on whether you want the AI to write and run tests (<code className="bg-muted px-1.5 py-0.5 rounded text-accent font-mono">includeTest</code>).
              </Trans>
            </p>

            {/* Pipelines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {/* YES Test */}
              <div className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col gap-5">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider pb-3 border-b border-border/40">
                  <CheckCircle2 className="w-4 h-4" /> includeTest: YES
                </div>
                <div className="flex flex-col gap-0 relative pt-1">
                  {PHASES_WITH_TEST.map((phase, i) => (
                    <div key={i} className="flex items-start gap-4 relative group">
                      {i !== PHASES_WITH_TEST.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
                      )}
                      <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">
                        {i + 1}
                      </div>
                      <div className="pb-5">
                        <span className="text-foreground font-semibold text-sm block">{phase.name}</span>
                        <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{phase.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NO Test */}
              <div className="p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-sm flex flex-col gap-5">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider pb-3 border-b border-border/40">
                  <XCircle className="w-4 h-4" /> includeTest: NO
                </div>
                <div className="flex flex-col gap-0 relative pt-1">
                  {PHASES_WITHOUT_TEST.map((phase, i) => (
                    <div key={i} className="flex items-start gap-4 relative group">
                      {i !== PHASES_WITHOUT_TEST.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-[-4px] w-[2px] bg-border/50 group-hover:bg-indigo-500/30 transition-colors" />
                      )}
                      <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border/60 text-[10px] font-bold text-muted-foreground shrink-0 mt-0.5 group-hover:border-indigo-500 group-hover:text-indigo-500 transition-colors">
                        {i + 1}
                      </div>
                      <div className="pb-5">
                        <span className="text-foreground font-semibold text-sm block">{phase.name}</span>
                        <span className="text-muted-foreground text-[11px] leading-tight block mt-1">{phase.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

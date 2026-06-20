import { motion } from "framer-motion"
import { BrainCircuit, Code2, Beaker, Inspect, ShieldCheck, GitMerge, Bot, Terminal, CornerDownRight } from "lucide-react"
import { useTranslation } from "react-i18next"

// PHASES will be generated in the component to access translations

export function OrchestrationTimeline() {
  const { t } = useTranslation();

  const PHASES = [
    {
      phase: 1,
      title: t('orchestrationTimeline.phases.discovery.title'),
      desc: t('orchestrationTimeline.phases.discovery.desc'),
      icon: <BrainCircuit className="h-5 w-5" />,
      command: "/ce-brainstorm",
      fallback: "fallback-brainstorm.md",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/30",
      lineGlow: "rgba(59, 130, 246, 0.4)"
    },
    {
      phase: 2,
      title: t('orchestrationTimeline.phases.planning.title'),
      desc: t('orchestrationTimeline.phases.planning.desc'),
      icon: <Code2 className="h-5 w-5" />,
      command: "/ce-plan",
      fallback: "fallback-planning.md",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/30",
      lineGlow: "rgba(99, 102, 241, 0.4)"
    },
    {
      phase: 3,
      title: t('orchestrationTimeline.phases.execution.title'),
      desc: t('orchestrationTimeline.phases.execution.desc'),
      icon: <Beaker className="h-5 w-5" />,
      command: "/ce-work",
      fallback: "fallback-work.md",
      color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
      lineGlow: "rgba(168, 85, 247, 0.4)"
    },
    {
      phase: 4,
      title: t('orchestrationTimeline.phases.review.title'),
      desc: t('orchestrationTimeline.phases.review.desc'),
      icon: <Inspect className="h-5 w-5" />,
      command: "/ce-code-review",
      fallback: "fallback-review.md",
      color: "text-pink-500 bg-pink-500/10 border-pink-500/30",
      lineGlow: "rgba(236, 72, 153, 0.4)"
    },
    {
      phase: 5,
      title: t('orchestrationTimeline.phases.verification.title'),
      desc: t('orchestrationTimeline.phases.verification.desc'),
      icon: <ShieldCheck className="h-5 w-5" />,
      command: "/ce-compound",
      fallback: "fallback-compound.md",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
      lineGlow: "rgba(16, 185, 129, 0.4)"
    },
    {
      phase: 6,
      title: t('orchestrationTimeline.phases.release.title'),
      desc: t('orchestrationTimeline.phases.release.desc'),
      icon: <GitMerge className="h-5 w-5" />,
      command: "Git PR Automation",
      fallback: "create_github_pr tool",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
      lineGlow: "rgba(245, 158, 11, 0.4)"
    }
  ]

  return (
    <section className="py-24 bg-muted/20 transition-colors w-full border-b border-border/40" id="orchestration">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-sm mb-4 text-xs font-semibold text-indigo-400 dark:text-indigo-300">
            <Bot className="w-3.5 h-3.5" />
            <span>{t('orchestrationTimeline.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            {t('orchestrationTimeline.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {t('orchestrationTimeline.subtitle')}
          </p>
        </div>

        {/* Straight Vertical Linear Stepper */}
        <div className="relative pl-6 md:pl-10">
          
          {/* Straight line backing the timeline */}
          <div className="absolute left-[33px] md:left-[37px] top-4 bottom-4 w-0.5 bg-border/60 rounded-full overflow-hidden">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 origin-top shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Stepper items */}
          <div className="space-y-12">
            {PHASES.map((item, idx) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex gap-6 md:gap-8 items-start group"
              >
                {/* Node Circle */}
                <div className={`w-[16px] h-[16px] rounded-full border-2 border-background flex items-center justify-center z-10 shrink-0 mt-2 bg-foreground group-hover:scale-125 transition-transform duration-300 shadow-md ring-4 ring-muted/30`} />

                {/* Content Card */}
                <div className="flex-grow p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-md hover:border-accent/20 transition-all shadow-sm">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${item.color} flex items-center justify-center shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Phase {item.phase}</span>
                        <h3 className="text-xl font-bold text-foreground leading-snug mt-0.5">{item.title}</h3>
                      </div>
                    </div>

                    {/* Stepper Command Info */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted border border-border font-mono text-xs font-bold text-foreground">
                        <Terminal className="h-3 w-3 text-muted-foreground" />
                        {item.command}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed m-0">
                    {item.desc}
                  </p>

                  {/* Fallback integration info */}
                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-2 text-xs text-muted-foreground/80">
                    <CornerDownRight className="h-3.5 w-3.5 text-accent/80 shrink-0" />
                    <span>
                      {t('orchestrationTimeline.fallbackLabel')}: <code className="font-mono bg-muted/60 px-1.5 py-0.5 rounded border border-border text-[11px] text-accent">{item.fallback}</code>
                    </span>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

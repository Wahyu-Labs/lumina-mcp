import { Info } from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'

export function CompoundEngineeringDocs() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mb-8">
        <span className="text-accent font-semibold tracking-wider text-sm uppercase">{t('docs.compound.badge')}</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{t('docs.compound.title')}</h1>
        <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
          {t('docs.compound.subtitle')}
        </p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 my-8 not-prose">
        <h3 className="text-blue-500 font-bold mt-0 mb-2.5 flex items-center gap-2 text-sm md:text-base">
          <Info className="h-4.5 w-4.5 text-blue-500 shrink-0" />
          {t('docs.compound.recommendedTitle')}
        </h3>
        <p className="mb-0 text-xs md:text-sm text-muted-foreground leading-relaxed">
          <Trans i18nKey="docs.compound.recommendedDesc" components={[<strong key="0" />]} />
        </p>
      </div>

      <h2>{t('docs.compound.installTitle')}</h2>
      
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 my-6 not-prose">
        <p className="text-sm text-emerald-600 dark:text-emerald-400 m-0 leading-relaxed">
          <strong>{t('docs.compound.aiShortcutTitle')}</strong> {t('docs.compound.aiShortcutDesc')}
        </p>
        <div className="mt-3">
          <a 
            href="https://github.com/EveryInc/compound-engineering-plugin" 
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-lg font-mono text-xs font-semibold transition-colors no-underline shadow-sm" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            EveryInc/compound-engineering-plugin
          </a>
        </div>
      </div>

      <h3>Claude Code</h3>
      <p>{t('docs.compound.claudeCode.p1')}</p>
      <ol>
        <li className="mb-4">
          <strong>{t('docs.compound.claudeCode.li1_title')}</strong>
          <pre className="bg-muted border border-border p-4 mt-2 rounded-xl font-mono text-sm"><code>{`/plugin marketplace add EveryInc/compound-engineering-plugin`}</code></pre>
          <p className="text-sm text-muted-foreground mt-2 mb-0">{t('docs.compound.claudeCode.li1_desc')}</p>
        </li>
        <li className="mb-4">
          <strong>{t('docs.compound.claudeCode.li2_title')}</strong>
          <pre className="bg-muted border border-border p-4 mt-2 rounded-xl font-mono text-sm"><code>{`/plugin install compound-engineering`}</code></pre>
          <p className="text-sm text-muted-foreground mt-2 mb-0"><Trans i18nKey="docs.compound.claudeCode.li2_desc" components={[<code key="0" className="bg-muted px-1.5 py-0.5 rounded border border-border" />]} /></p>
        </li>
        <li className="mb-4">
          <strong>{t('docs.compound.claudeCode.li3_title')}</strong>
          <p className="text-sm text-muted-foreground mt-2 mb-0"><Trans i18nKey="docs.compound.claudeCode.li3_desc" components={[<code key="0" className="bg-muted px-1.5 py-0.5 rounded border border-border" />, <code key="1" className="bg-muted px-1.5 py-0.5 rounded border border-border" />]} /></p>
        </li>
      </ol>
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mt-4 mb-8 not-prose">
        <p className="text-sm text-amber-600 dark:text-amber-400 m-0 leading-relaxed">
          <Trans i18nKey="docs.compound.claudeCode.note" components={[<a key="0" href="https://github.com/EveryInc/compound-engineering-plugin" className="underline hover:text-amber-700 dark:hover:text-amber-300" target="_blank" rel="noopener noreferrer">github.com/EveryInc/compound-engineering-plugin</a>, <code key="1" />, <code key="2" />]} />
        </p>
      </div>

      <h3>Cursor</h3>
      <h3>Cursor</h3>
      <p>{t('docs.compound.cursor.p1')}</p>
      <ol>
        <li className="mb-4">
          <strong>{t('docs.compound.cursor.li1_title')}</strong>
          <pre className="bg-muted border border-border p-4 mt-2 rounded-xl font-mono text-sm"><code>{`/add-plugin compound-engineering`}</code></pre>
        </li>
        <li className="mb-4">
          <strong>{t('docs.compound.cursor.li2_title')}</strong>
          <ol className="list-[lower-alpha] ml-4 mt-2 mb-0 space-y-1 text-sm text-muted-foreground">
            <li><Trans i18nKey="docs.compound.cursor.li2_1" components={[<strong key="0" />]} /></li>
            <li><Trans i18nKey="docs.compound.cursor.li2_2" components={[<strong key="0" />]} /></li>
            <li><Trans i18nKey="docs.compound.cursor.li2_3" components={[<strong key="0" />]} /></li>
          </ol>
        </li>
      </ol>

      <h3>Antigravity IDE</h3>
      <p>{t('docs.compound.antigravity.p1')}</p>
      
      <div className="mb-6 border border-border/50 bg-muted/20 p-5 rounded-xl">
        <strong className="text-foreground block mb-3">{t('docs.compound.antigravity.opt1_title')}</strong>
        <p className="text-sm text-muted-foreground mb-3"><Trans i18nKey="docs.compound.antigravity.opt1_desc" components={[<em key="0" />]} /></p>
        <a 
          href="https://github.com/EveryInc/compound-engineering-plugin" 
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-lg font-mono text-xs font-semibold transition-colors no-underline shadow-sm" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          EveryInc/compound-engineering-plugin
        </a>
      </div>

      <div className="border border-border/50 bg-muted/20 p-5 rounded-xl">
        <strong className="text-foreground block mb-3">{t('docs.compound.antigravity.opt2_title')}</strong>
        <ol className="mb-0">
          <li className="mb-4">
            <strong>{t('docs.compound.antigravity.opt2_li1_title')}</strong>
            <pre className="bg-background border border-border p-4 mt-2 rounded-xl font-mono text-sm"><code>{`mkdir -p ~/.gemini/config/plugins\ncd ~/.gemini/config/plugins`}</code></pre>
          </li>
          <li className="mb-4">
            <strong>{t('docs.compound.antigravity.opt2_li2_title')}</strong>
            <pre className="bg-background border border-border p-4 mt-2 rounded-xl font-mono text-sm"><code>{`git clone https://github.com/EveryInc/compound-engineering-plugin.git`}</code></pre>
            <p className="text-sm text-muted-foreground mt-2 mb-0">
              <Trans i18nKey="docs.compound.antigravity.opt2_li2_desc" components={[<code key="0" />]} />
            </p>
          </li>
          <li>
            <Trans i18nKey="docs.compound.antigravity.opt2_li3" components={[<strong key="0" />]} />
          </li>
        </ol>
      </div>

      <h3>Codex</h3>
      <p><Trans i18nKey="docs.compound.codex.p1" components={[<code key="0" />]} /></p>
      <pre className="bg-muted border border-border p-4 mt-2 rounded-xl font-mono text-sm"><code>{`bunx @every-env/compound-plugin install compound-engineering --to codex`}</code></pre>
      <p className="text-sm text-muted-foreground mt-2 mb-0">{t('docs.compound.codex.p2')}</p>

      <hr className="my-10 border-border" />

      <h2>{t('docs.compound.loopPrompts.title')}</h2>
      <p>
        {t('docs.compound.loopPrompts.desc')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">/ce-strategy</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.loopPrompts.ceStrategy')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">/ce-brainstorm</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.loopPrompts.ceBrainstorm')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">/ce-plan</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.loopPrompts.cePlan')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">/ce-work</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.loopPrompts.ceWork')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">/ce-code-review</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.loopPrompts.ceCodeReview')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">/ce-compound</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.loopPrompts.ceCompound')}</p>
        </div>
      </div>
      
      <hr className="my-10 border-border" />

      <h2>{t('docs.compound.fallbacks.title')}</h2>
      <p>
        {t('docs.compound.fallbacks.desc')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">fallback-brainstorm</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.fallbacks.fbBrainstorm')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">fallback-work</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.fallbacks.fbWork')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">fallback-review</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.fallbacks.fbReview')}</p>
        </div>
        <div className="border border-border rounded-xl p-4 bg-card/65 backdrop-blur-sm">
          <code className="text-accent text-xs font-bold font-mono">fallback-compound</code>
          <p className="text-xs text-muted-foreground mt-2 mb-0">{t('docs.compound.fallbacks.fbCompound')}</p>
        </div>
      </div>
    </>
  )
}

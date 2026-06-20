import { motion } from "framer-motion"
import { ArrowRight, Cpu, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { HeroVisual } from "../HeroVisual"
import { useTranslation } from "react-i18next"

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28 flex flex-col items-center bg-background border-b border-border/40 transition-colors">
      
      {/* Clean Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Radiant Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-accent/10 blur-[130px] rounded-full pointer-events-none -z-10 dark:block hidden" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[200px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none -z-10 dark:block hidden" />

      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        
        {/* Left Column: Heading and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Release Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 backdrop-blur-sm mb-6 text-xs font-semibold text-foreground/80"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent pulse-dot" />
            <Cpu className="h-3.5 w-3.5 text-accent" />
            <span>{t('hero.versionBadge')}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-foreground mb-6 max-w-2xl"
          >
            {t('hero.heading1')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-500 to-indigo-500 dark:from-accent dark:to-indigo-400">
              {t('hero.heading2')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Action CTAs (User Requested Snippet) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-row flex-wrap gap-4 w-full sm:w-auto"
          >
            <Link
              to="/docs/getting-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-xs md:text-sm font-bold shadow-md hover:scale-[1.02] hover:bg-foreground/95 active:scale-[0.98] transition-all duration-200"
            >
              {t('hero.getStarted')} <ArrowRight className="w-4 h-4" />
            </Link>
            
            <a
              href="https://github.com/Wahyu-Labs/lumina-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-muted/40 hover:bg-muted/70 border border-border/80 text-foreground text-xs md:text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Star className="w-4 h-4 fill-current" /> {t('hero.starGithub')}
            </a>
          </motion.div>

        </div>

        {/* Right Column: Dynamic Radial Brain Visual */}
        <div className="lg:col-span-5 flex justify-center items-center w-full">
          <HeroVisual />
        </div>

      </div>
    </section>
  )
}

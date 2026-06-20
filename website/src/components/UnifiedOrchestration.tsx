import { motion } from "framer-motion"
import { BrainCircuit, Code2, Beaker, Inspect, ShieldCheck, GitMerge, Bot, Terminal } from "lucide-react"

const phases = [
  {
    phase: 1,
    title: "Discovery & Analysis",
    desc: "AI fetches tickets (Jira/Trello), reads code, and defines the problem scope.",
    icon: <BrainCircuit className="h-5 w-5" />,
    command: "/ce-brainstorm",
    commandDesc: "Interactive Q&A to think through a problem and write requirements.",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20"
  },
  {
    phase: 2,
    title: "Planning",
    desc: "Draft a clear, deterministic implementation plan outlining exact files and methods.",
    icon: <Code2 className="h-5 w-5" />,
    command: "/ce-plan",
    commandDesc: "Turn brainstormed ideas into detailed, step-by-step implementation plans.",
    color: "from-indigo-500 to-purple-500",
    shadow: "shadow-indigo-500/20"
  },
  {
    phase: 3,
    title: "Execution & Work",
    desc: "AI writes the actual code, following the generated plan strictly without deviating.",
    icon: <Beaker className="h-5 w-5" />,
    command: "/ce-work",
    commandDesc: "Execute the generated implementation plans automatically.",
    color: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/20"
  },
  {
    phase: 4,
    title: "Code Review",
    desc: "Self-review loop. AI inspects the newly written code and fixes issues immediately.",
    icon: <Inspect className="h-5 w-5" />,
    command: "/ce-code-review",
    commandDesc: "Multi-agent code review to catch issues before committing.",
    color: "from-pink-500 to-rose-400",
    shadow: "shadow-pink-500/20"
  },
  {
    phase: 5,
    title: "Verification & Learning",
    desc: "Executes tests, runs DB audits, and documents reusable patterns for the future.",
    icon: <ShieldCheck className="h-5 w-5" />,
    command: "/ce-compound",
    commandDesc: "Document learnings and patterns to make future workflows easier.",
    color: "from-emerald-400 to-teal-400",
    shadow: "shadow-emerald-500/20"
  },
  {
    phase: 6,
    title: "Git System",
    desc: "Generates semantic commits and opens a GitHub Pull Request automatically.",
    icon: <GitMerge className="h-5 w-5" />,
    command: "Auto PR",
    commandDesc: "Pushes changes and triggers CI/CD seamlessly.",
    color: "from-orange-400 to-amber-400",
    shadow: "shadow-orange-500/20"
  }
]

export function UnifiedOrchestration() {
  return (
    <section className="w-full relative py-32 overflow-hidden bg-black/40" id="orchestration">
      
      {/* Background Magic Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-50">
        <div className="absolute w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-sm mb-6 text-sm font-medium text-indigo-300">
            <Bot className="w-4 h-4" />
            Agentic Workflows Powered by Compound Engineering
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6">
            Advanced Orchestration
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Lumina MCP simplifies the 6-phase engineering lifecycle by mapping each phase directly to standard 
            <span className="text-indigo-300 font-mono text-base mx-2">/ce-*</span>
            slash commands. No manual prompting required.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* Center Glowing Beam Line */}
          <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-transparent via-indigo-500 to-pink-500 origin-top shadow-[0_0_30px_rgba(99,102,241,1)]"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-16">
            {phases.map((item, i) => (
              <motion.div 
                key={item.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center md:justify-between group ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                
                {/* Connector Node */}
                <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full border-2 border-background bg-zinc-900 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity absolute inset-0`} />
                  <span className="text-white font-bold text-lg relative z-10">{item.phase}</span>
                </div>

                {/* Left Side (or Right if reversed) - The Orchestration Phase */}
                <div className={`ml-20 md:ml-0 w-full md:w-[42%] ${i % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}>
                  <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-white/20 transition-colors">
                    {/* Subtle glow inside card */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} opacity-10 blur-[50px] -z-10`} />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg ${item.shadow}`}>
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Right Side (or Left if reversed) - The Compound Command */}
                <div className={`mt-6 ml-20 md:mt-0 md:ml-0 w-full md:w-[42%] flex ${i % 2 === 0 ? "md:justify-end md:pr-10" : "md:justify-start md:pl-10"}`}>
                  <div className="relative group/cmd cursor-pointer w-full max-w-[320px]">
                    <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover/cmd:opacity-100 blur-sm transition duration-500`} />
                    <div className="relative bg-zinc-950 border border-white/10 rounded-xl p-5 shadow-2xl flex items-start gap-4">
                      <Terminal className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                      <div>
                        <code className={`text-lg font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                          {item.command}
                        </code>
                        <p className="text-sm text-muted-foreground mt-2 mb-0 leading-snug">
                          {item.commandDesc}
                        </p>
                      </div>
                    </div>
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

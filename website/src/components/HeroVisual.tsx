import { motion } from 'framer-motion'
import { Database, Code2, FolderKanban, BrainCircuit, GitBranch, Workflow, Layers, ShieldCheck } from 'lucide-react'

// Position mapping in a 500x500 coordinate system (Center is 250, 250)
// Radius is 200px (Heptagon)
const nodes = [
  { id: 'git', label: 'Version Control', icon: GitBranch, color: 'text-red-500 dark:text-red-400', shadow: 'shadow-red-500/10', cx: 250, cy: 50, delay: 0.2 },
  { id: 'code', label: 'Programming Language', icon: Code2, color: 'text-purple-500 dark:text-purple-400', shadow: 'shadow-purple-500/10', cx: 406, cy: 125, delay: 0.4 },
  { id: 'compound', label: 'Compound Engineering', icon: Layers, color: 'text-emerald-500 dark:text-emerald-400', shadow: 'shadow-emerald-500/10', cx: 445, cy: 295, delay: 0.6 },
  { id: 'orchestration', label: 'Orchestration', icon: Workflow, color: 'text-pink-500 dark:text-pink-400', shadow: 'shadow-pink-500/10', cx: 337, cy: 430, delay: 0.8 },
  { id: 'testing', label: 'Testing', icon: ShieldCheck, color: 'text-teal-500 dark:text-teal-400', shadow: 'shadow-teal-500/10', cx: 163, cy: 430, delay: 1.0 },
  { id: 'pm', label: 'Project Management', icon: FolderKanban, color: 'text-orange-500 dark:text-orange-400', shadow: 'shadow-orange-500/10', cx: 55, cy: 295, delay: 1.2 },
  { id: 'db', label: 'Database', icon: Database, color: 'text-blue-500 dark:text-blue-400', shadow: 'shadow-blue-500/10', cx: 94, cy: 125, delay: 1.4 },
]

export function HeroVisual() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[420px] aspect-square">
        
        {/* Central AI Node */}
        <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-background border-2 border-accent shadow-[0_0_35px_rgba(59,130,246,0.3)] relative"
          >
            <BrainCircuit className="w-10 h-10 text-accent animate-pulse" />

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-popover text-popover-foreground text-xs px-2.5 py-1 rounded-md border border-border shadow-lg">
              Lumina AI Agent
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
            </div>
          </motion.div>
        </div>

        {/* SVG Connecting Beams */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 500 500" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background paths (subtle dashed lines) */}
          {nodes.map((node) => (
            <path 
              key={`bg-${node.id}`} 
              d={`M${node.cx} ${node.cy} L250 250`} 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="4 6" 
              className="text-border/60 opacity-60" 
            />
          ))}

          {/* Animated Beams */}
          {nodes.map((node) => (
            <motion.path
              key={`beam-${node.id}`}
              d={`M${node.cx} ${node.cy} L250 250`}
              stroke={`url(#gradient-${node.id})`}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{ pathLength: [0, 0.5, 0], pathOffset: [0, 0.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: node.delay }}
            />
          ))}

          {/* Gradients for Beams */}
          <defs>
            <linearGradient id="gradient-git" x1="250" y1="50" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(239, 68, 68, 0)" />
              <stop offset="0.5" stopColor="rgba(239, 68, 68, 1)" />
              <stop offset="1" stopColor="rgba(239, 68, 68, 0)" />
            </linearGradient>
            <linearGradient id="gradient-code" x1="406" y1="125" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(168, 85, 247, 0)" />
              <stop offset="0.5" stopColor="rgba(168, 85, 247, 1)" />
              <stop offset="1" stopColor="rgba(168, 85, 247, 0)" />
            </linearGradient>
            <linearGradient id="gradient-compound" x1="445" y1="295" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(16, 185, 129, 0)" />
              <stop offset="0.5" stopColor="rgba(16, 185, 129, 1)" />
              <stop offset="1" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>
            <linearGradient id="gradient-orchestration" x1="337" y1="430" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(236, 72, 153, 0)" />
              <stop offset="0.5" stopColor="rgba(236, 72, 153, 1)" />
              <stop offset="1" stopColor="rgba(236, 72, 153, 0)" />
            </linearGradient>
            <linearGradient id="gradient-testing" x1="163" y1="430" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(20, 184, 166, 0)" />
              <stop offset="0.5" stopColor="rgba(20, 184, 166, 1)" />
              <stop offset="1" stopColor="rgba(20, 184, 166, 0)" />
            </linearGradient>
            <linearGradient id="gradient-pm" x1="55" y1="295" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(249, 115, 22, 0)" />
              <stop offset="0.5" stopColor="rgba(249, 115, 22, 1)" />
              <stop offset="1" stopColor="rgba(249, 115, 22, 0)" />
            </linearGradient>
            <linearGradient id="gradient-db" x1="94" y1="125" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="0.5" stopColor="rgba(59, 130, 246, 1)" />
              <stop offset="1" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon
          return (
            <div
              key={`container-${node.id}`}
              className="absolute z-10 group cursor-pointer"
              style={{ 
                left: `${(node.cx / 500) * 100}%`, 
                top: `${(node.cy / 500) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <motion.div
                key={`icon-${node.id}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: node.delay + 0.5, type: 'spring' }}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-md ${node.shadow} group-hover:scale-110 transition-transform duration-300 relative`}
              >
                <Icon className={`w-5.5 h-5.5 md:w-6.5 h-6.5 ${node.color}`} />
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-popover text-popover-foreground text-xs px-2.5 py-1 rounded-md border border-border shadow-lg">
                  {node.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover"></div>
                </div>
              </motion.div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Database, Code2, FolderKanban, BrainCircuit, GitBranch, Workflow, Layers } from 'lucide-react'

// Position mapping in a 500x500 coordinate system (Center is 250, 250)
// Radius is 200px
const nodes = [
  { id: 'git', label: 'Version Control', icon: GitBranch, color: 'text-red-400', shadow: 'shadow-red-500/10', cx: 250, cy: 50, delay: 0.2 },
  { id: 'code', label: 'Programming Language', icon: Code2, color: 'text-purple-400', shadow: 'shadow-purple-500/10', cx: 423, cy: 150, delay: 0.4 },
  { id: 'compound', label: 'Compound Engineering', icon: Layers, color: 'text-emerald-400', shadow: 'shadow-emerald-500/10', cx: 423, cy: 350, delay: 0.6 },
  { id: 'orchestration', label: 'Orchestration', icon: Workflow, color: 'text-pink-400', shadow: 'shadow-pink-500/10', cx: 250, cy: 450, delay: 0.8 },
  { id: 'pm', label: 'Project Management', icon: FolderKanban, color: 'text-orange-400', shadow: 'shadow-orange-500/10', cx: 77, cy: 350, delay: 1.0 },
  { id: 'db', label: 'Database', icon: Database, color: 'text-blue-400', shadow: 'shadow-blue-500/10', cx: 77, cy: 150, delay: 1.2 },
]

export function HeroVisual() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-[500px] aspect-square">
        
        {/* Central AI Node */}
        <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-background border-2 border-accent shadow-[0_0_50px_rgba(var(--accent),0.4)] relative"
          >
            <BrainCircuit className="w-10 h-10 text-accent animate-glow" />

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-zinc-800 text-white text-xs px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
              Lumina AI Agent
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
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
              stroke="hsl(var(--muted))" 
              strokeWidth="2" 
              strokeDasharray="4 6" 
              className="opacity-20" 
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
              <stop stopColor="rgba(248, 113, 113, 0)" />
              <stop offset="0.5" stopColor="rgba(248, 113, 113, 1)" />
              <stop offset="1" stopColor="rgba(248, 113, 113, 0)" />
            </linearGradient>
            <linearGradient id="gradient-code" x1="423" y1="150" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(192, 132, 252, 0)" />
              <stop offset="0.5" stopColor="rgba(192, 132, 252, 1)" />
              <stop offset="1" stopColor="rgba(192, 132, 252, 0)" />
            </linearGradient>
            <linearGradient id="gradient-compound" x1="423" y1="350" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(52, 211, 153, 0)" />
              <stop offset="0.5" stopColor="rgba(52, 211, 153, 1)" />
              <stop offset="1" stopColor="rgba(52, 211, 153, 0)" />
            </linearGradient>
            <linearGradient id="gradient-orchestration" x1="250" y1="450" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(244, 114, 182, 0)" />
              <stop offset="0.5" stopColor="rgba(244, 114, 182, 1)" />
              <stop offset="1" stopColor="rgba(244, 114, 182, 0)" />
            </linearGradient>
            <linearGradient id="gradient-pm" x1="77" y1="350" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(251, 146, 60, 0)" />
              <stop offset="0.5" stopColor="rgba(251, 146, 60, 1)" />
              <stop offset="1" stopColor="rgba(251, 146, 60, 0)" />
            </linearGradient>
            <linearGradient id="gradient-db" x1="77" y1="150" x2="250" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(96, 165, 250, 0)" />
              <stop offset="0.5" stopColor="rgba(96, 165, 250, 1)" />
              <stop offset="1" stopColor="rgba(96, 165, 250, 0)" />
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
                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shadow-xl ${node.shadow} group-hover:scale-110 transition-transform duration-300 relative`}
              >
                <Icon className={`w-6 h-6 md:w-7 md:h-7 ${node.color}`} />
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-zinc-800 text-white text-xs px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                  {node.label}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                </div>
              </motion.div>
            </div>
          )
        })}

      </div>
    </div>
  )
}

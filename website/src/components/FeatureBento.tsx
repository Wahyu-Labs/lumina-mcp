import { Database, GitPullRequest, LayoutList, CheckCircle2, Layers } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "Database Integration",
    description: "Connect to MySQL & PostgreSQL. Run raw queries, audit performance, and execute schema migrations securely through the MCP server.",
    icon: <Database className="h-6 w-6 text-blue-500" />,
    className: "md:col-span-2",
    bullets: ["Execute MySQL/PostgreSQL queries", "List and inspect tables", "Analyze query performance", "Save audit reports"]
  },
  {
    title: "Git System",
    description: "Streamline your version control workflows seamlessly.",
    icon: <GitPullRequest className="h-6 w-6 text-purple-500" />,
    className: "md:col-span-1",
    bullets: ["Generate smart commits", "Create & review PRs", "Resolve review threads"]
  },
  {
    title: "Project Management",
    description: "Fetch context directly from your ticketing system to drive development. Supports Jira, Trello, and OpenProject.",
    icon: <LayoutList className="h-6 w-6 text-emerald-500" />,
    className: "md:col-span-1",
    bullets: ["Jira Software", "Trello Boards", "OpenProject Work Packages"]
  },
  {
    title: "Compound Engineering",
    description: "Lumina MCP requires the Compound Engineering plugin. It empowers agents with advanced self-improving workflows.",
    icon: <Layers className="h-6 w-6 text-orange-500" />,
    className: "md:col-span-2",
    bullets: ["Mandatory plugin requirement", "Deep context integration", "Robust automation capabilities"]
  }
]

export function FeatureBento() {
  return (
    <section className="py-20 w-full" id="features">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-4">
          Integrated Toolset
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl text-lg">
          Lumina MCP comes pre-configured with powerful tools to interact with your databases, git repositories, and project management systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`bento-card flex flex-col ${feature.className}`}
          >
            <div className="mb-4 bg-background/50 w-12 h-12 rounded-lg flex items-center justify-center border border-white/5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground mb-6 flex-grow">{feature.description}</p>
            
            <ul className="space-y-2 mt-auto">
              {feature.bullets.map((bullet, j) => (
                <li key={j} className="flex items-center text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500/70" />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

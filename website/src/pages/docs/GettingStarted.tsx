import { useState } from "react"
import { 
  Copy, 
  Check, 
  Sparkles, 
  Command, 
  Cpu, 
  Laptop,
  Terminal,
  Info
} from "lucide-react"
import { useTranslation, Trans } from 'react-i18next'

interface ClientConfig {
  id: string
  name: string
  icon: any
  fileLabel: string
  format?: 'json' | 'toml'
  paths: {
    mac: string
    windows: string
    linux: string
  }
  description: string
  instructions: string[]
}

const getClients = (t: any): ClientConfig[] => [
  {
    id: "antigravity",
    name: "Antigravity",
    icon: Sparkles,
    fileLabel: "Antigravity Config File",
    format: "json",
    paths: {
      mac: "~/.gemini/config/mcp_config.json",
      windows: "%USERPROFILE%\\.gemini\\config\\mcp_config.json",
      linux: "~/.gemini/config/mcp_config.json"
    },
    description: t('docs.gettingStarted.clients.antigravity.desc'),
    instructions: t('docs.gettingStarted.clients.antigravity.steps', { returnObjects: true }) as string[]
  },
  {
    id: "cursor",
    name: "Cursor",
    icon: Command,
    fileLabel: "Cursor Config File",
    format: "json",
    paths: {
      mac: "~/.cursor/mcp.json",
      windows: "%USERPROFILE%\\\\.cursor\\\\mcp.json",
      linux: "~/.cursor/mcp.json"
    },
    description: t('docs.gettingStarted.clients.cursor.desc'),
    instructions: t('docs.gettingStarted.clients.cursor.steps', { returnObjects: true }) as string[]
  },
  {
    id: "claude",
    name: "Claude Code",
    icon: Cpu,
    fileLabel: "Claude Code Config File",
    format: "json",
    paths: {
      mac: "~/.claude.json",
      windows: "%USERPROFILE%\\.claude.json",
      linux: "~/.claude.json"
    },
    description: t('docs.gettingStarted.clients.claude.desc'),
    instructions: t('docs.gettingStarted.clients.claude.steps', { returnObjects: true }) as string[]
  },
  {
    id: "vscode",
    name: "VS Code (Cline/Roo)",
    icon: Laptop,
    fileLabel: "Cline MCP Settings File",
    format: "json",
    paths: {
      mac: "~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json",
      windows: "%APPDATA%\\Code\\User\\globalStorage\\saoudrizwan.claude-dev\\settings\\cline_mcp_settings.json",
      linux: "~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json"
    },
    description: t('docs.gettingStarted.clients.vscode.desc'),
    instructions: t('docs.gettingStarted.clients.vscode.steps', { returnObjects: true }) as string[]
  },
  {
    id: "codex",
    name: "Codex",
    icon: Terminal,
    fileLabel: "Codex Config File",
    format: "toml",
    paths: {
      mac: "~/.codex/config.toml",
      windows: "%USERPROFILE%\\.codex\\config.toml",
      linux: "~/.codex/config.toml"
    },
    description: t('docs.gettingStarted.clients.codex.desc'),
    instructions: t('docs.gettingStarted.clients.codex.steps', { returnObjects: true }) as string[]
  }
]

const CONFIG_JSON = `{
  "mcpServers": {
    "lumina-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "lumina-mcp"
      ],
      "env": {
        "MYSQL_URL": "mysql://username:password@localhost:3306/database_name",
        "POSTGRES_URL": "postgresql://username:password@localhost:5432/database_name",
        "GITHUB_TOKEN": "ghp_YourGitHubPersonalAccessToken",
        "TRELLO_API_KEY": "YourTrelloApiKey",
        "TRELLO_API_TOKEN": "YourTrelloApiToken",
        "OPENPROJECT_DOMAIN": "https://your-domain.openproject.com",
        "OPENPROJECT_API_KEY": "YourOpenProjectApiKey",
        "JIRA_EMAIL": "your-jira-email@example.com",
        "JIRA_API_TOKEN": "YourJiraApiToken",
        "JIRA_DOMAIN": "https://your-domain.atlassian.net"
      }
    }
  }
}`

const CONFIG_TOML = `[mcpServers.lumina-mcp]
command = "npx"
args = ["-y", "lumina-mcp"]

[mcpServers.lumina-mcp.env]
MYSQL_URL = "mysql://username:password@localhost:3306/database_name"
POSTGRES_URL = "postgresql://username:password@localhost:5432/database_name"
GITHUB_TOKEN = "ghp_YourGitHubPersonalAccessToken"
TRELLO_API_KEY = "YourTrelloApiKey"
TRELLO_API_TOKEN = "YourTrelloApiToken"
OPENPROJECT_DOMAIN = "https://your-domain.openproject.com"
OPENPROJECT_API_KEY = "YourOpenProjectApiKey"
JIRA_EMAIL = "your-jira-email@example.com"
JIRA_API_TOKEN = "YourJiraApiToken"
JIRA_DOMAIN = "https://your-domain.atlassian.net"`

function SyntaxHighlightedJSON({ code }: { code: string }) {
  const lines = code.split("\n")
  return (
    <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed text-foreground select-all max-h-[350px] overflow-y-auto pr-2 custom-scrollbar my-0">
      <code>
        {lines.map((line, idx) => {
          let renderedLine = []
          
          const keyMatch = line.match(/^(\s*)"([^"]+)":/)
          if (keyMatch) {
            const indent = keyMatch[1]
            const key = keyMatch[2]
            const rest = line.substring(keyMatch[0].length)
            
            renderedLine.push(<span key="indent">{indent}</span>)
            renderedLine.push(<span key="key" className="text-sky-500 font-semibold">"{key}"</span>)
            renderedLine.push(<span key="colon" className="text-foreground/70">:</span>)
            
            const valMatch = rest.match(/\s*"([^"]+)"(,)?/)
            const arrayMatch = rest.match(/\s*\[/)
            const braceMatch = rest.match(/\s*\{/)
            
            if (valMatch) {
              const val = valMatch[1]
              const comma = valMatch[2] || ""
              
              const isEnvValue = ["MYSQL_URL", "POSTGRES_URL", "GITHUB_TOKEN"].includes(key)
              const valueColor = isEnvValue ? "text-amber-500 dark:text-amber-400 font-medium" : "text-emerald-500 dark:text-emerald-400"
              
              renderedLine.push(<span key="val" className={valueColor}> "{val}"</span>)
              if (comma) renderedLine.push(<span key="comma" className="text-muted-foreground">{comma}</span>)
            } else if (arrayMatch) {
              renderedLine.push(<span key="array" className="text-yellow-500 font-bold"> [</span>)
            } else if (braceMatch) {
              renderedLine.push(<span key="brace" className="text-yellow-500 font-bold"> {"{"}</span>)
            } else {
              renderedLine.push(<span key="rest">{rest}</span>)
            }
          } else {
            const arrValMatch = line.match(/^(\s*)"([^"]+)"(,)?/)
            if (arrValMatch) {
              const indent = arrValMatch[1]
              const val = arrValMatch[2]
              const comma = arrValMatch[3] || ""
              renderedLine.push(<span key="indent">{indent}</span>)
              renderedLine.push(<span key="val" className="text-emerald-500 dark:text-emerald-400">"{val}"</span>)
              if (comma) renderedLine.push(<span key="comma" className="text-muted-foreground">{comma}</span>)
            } else {
              let chars = []
              for (let i = 0; i < line.length; i++) {
                const char = line[i]
                if (char === '{' || char === '}' || char === '[' || char === ']') {
                  chars.push(<span key={i} className="text-yellow-500/80 font-bold">{char}</span>)
                } else {
                  chars.push(char)
                }
              }
              renderedLine.push(<span key="chars">{chars}</span>)
            }
          }
          
          return (
            <div key={idx} className="hover:bg-muted/30 px-1 rounded transition-colors">
              {renderedLine}
            </div>
          )
        })}
      </code>
    </pre>
  )
}

function SyntaxHighlightedTOML({ code }: { code: string }) {
  const lines = code.split("\n")
  return (
    <pre className="text-xs md:text-sm font-mono overflow-x-auto leading-relaxed text-foreground select-all max-h-[350px] overflow-y-auto pr-2 custom-scrollbar my-0">
      <code>
        {lines.map((line, idx) => {
          let renderedLine = []
          
          if (line.trim().startsWith("[")) {
            renderedLine.push(<span key="header" className="text-yellow-500 font-bold">{line}</span>)
          } else if (line.includes("=")) {
            const [keyPart, ...valParts] = line.split("=")
            const key = keyPart.trim()
            const val = valParts.join("=").trim()
            
            renderedLine.push(<span key="key" className="text-sky-500 font-semibold">{key}</span>)
            renderedLine.push(<span key="eq" className="text-foreground/70"> = </span>)
            
            if (val.startsWith("[")) { 
               renderedLine.push(<span key="val" className="text-emerald-500 dark:text-emerald-400">{val}</span>)
            } else { 
              const isEnvValue = ["MYSQL_URL", "POSTGRES_URL", "GITHUB_TOKEN"].includes(key)
              const valueColor = isEnvValue ? "text-amber-500 dark:text-amber-400 font-medium" : "text-emerald-500 dark:text-emerald-400"
              renderedLine.push(<span key="val" className={valueColor}>{val}</span>)
            }
          } else {
             renderedLine.push(<span key="rest">{line}</span>)
          }
          
          return (
            <div key={idx} className="hover:bg-muted/30 px-1 rounded transition-colors min-h-[1.5em]">
              {renderedLine.length > 0 ? renderedLine : " "}
            </div>
          )
        })}
      </code>
    </pre>
  )
}

export function GettingStarted() {
  const { t } = useTranslation()
  const [activeClient, setActiveClient] = useState<string>("antigravity")
  const [activeOS, setActiveOS] = useState<"mac" | "windows" | "linux">("mac")
  const [copiedPath, setCopiedPath] = useState(false)
  const [copiedConfig, setCopiedConfig] = useState(false)

  const clients = getClients(t)
  const selectedClient = clients.find(c => c.id === activeClient) || clients[0]
  const currentPath = selectedClient.paths[activeOS]
  
  const isToml = selectedClient.format === 'toml'
  const currentConfig = isToml ? CONFIG_TOML : CONFIG_JSON
  const ConfigRenderer = isToml ? SyntaxHighlightedTOML : SyntaxHighlightedJSON

  const handleCopyPath = () => {
    navigator.clipboard.writeText(currentPath)
    setCopiedPath(true)
    setTimeout(() => setCopiedPath(false), 2000)
  }

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(currentConfig)
    setCopiedConfig(true)
    setTimeout(() => setCopiedConfig(false), 2000)
  }

  return (
    <>
      <div className="mb-8">
        <span className="text-accent font-semibold tracking-wider text-sm uppercase">{t('docs.gettingStarted.badge')}</span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{t('docs.gettingStarted.title')}</h1>
        <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
          {t('docs.gettingStarted.subtitle')}
        </p>
      </div>

      {/* Recommended Support: Compound Engineering Plugin (Optional) */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 my-8 not-prose">
        <h3 className="text-blue-500 font-bold mt-0 mb-2.5 flex items-center gap-2 text-sm md:text-base">
          <Info className="h-4.5 w-4.5 text-blue-500 shrink-0" />
          {t('docs.gettingStarted.recommendedTitle')}
        </h3>
        <p className="mb-0 text-xs md:text-sm text-muted-foreground leading-relaxed">
          <Trans i18nKey="docs.gettingStarted.recommendedDesc" components={[<strong key="0" className="text-foreground" />]} />
        </p>
      </div>

      <h2 id="client-configuration">{t('docs.gettingStarted.clientConfig')}</h2>
      <p>
        {t('docs.gettingStarted.clientConfigDesc')}
      </p>

      {/* Interactive Setup Widget */}
      <div className="not-prose my-8 space-y-6">
        
        {/* Client Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-border/60">
          {clients.map((client) => {
            const Icon = client.icon
            const isActive = client.id === activeClient
            return (
              <button
                key={client.id}
                onClick={() => {
                  setActiveClient(client.id)
                  setCopiedPath(false)
                  setCopiedConfig(false)
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all duration-150 active:scale-95 shadow-sm ${
                  isActive
                    ? "bg-accent/10 border-accent/80 text-foreground ring-1 ring-accent/30"
                    : "bg-card/40 border-border/80 text-muted-foreground hover:text-foreground hover:bg-card/85"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
                {client.name}
              </button>
            )
          })}
        </div>

        {/* Setup Card */}
        <div className="relative group max-w-3xl mx-auto text-left">
          {/* Card Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition duration-500 pointer-events-none" />
          
          <div className="relative bg-card/60 backdrop-blur-md border border-border/80 p-5 md:p-6 rounded-2xl shadow-lg space-y-5">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="h-7 w-7 rounded-lg bg-accent/15 text-accent flex items-center justify-center">
                  <selectedClient.icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  {t('docs.gettingStarted.configureIn')} {selectedClient.name}
                </h3>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {selectedClient.description}
              </p>
            </div>

            {/* Step list */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t('docs.gettingStarted.installSteps')}
              </h4>
              <ol className="space-y-2">
                {selectedClient.instructions.map((step, index) => (
                  <li key={index} className="flex gap-2.5 text-xs md:text-sm text-foreground/90 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Path block */}
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {selectedClient.fileLabel} {t('docs.gettingStarted.path')}
                </h4>
                
                {/* OS Toggle */}
                <div className="flex bg-background/50 border border-border/60 rounded-lg p-0.5 self-start md:self-auto">
                  {(["mac", "windows", "linux"] as const).map(os => (
                    <button
                      key={os}
                      onClick={() => setActiveOS(os)}
                      className={`text-[9px] md:text-xs px-2 py-0.5 md:py-1 rounded-md font-bold capitalize transition-colors ${
                        activeOS === os 
                          ? "bg-muted text-foreground shadow-sm" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {os}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-background/80 border border-border/50 rounded-xl p-3 flex items-center justify-between gap-4 font-mono text-xs text-foreground/90">
                <span className="truncate select-all overflow-hidden whitespace-nowrap" title={currentPath}>
                  {currentPath}
                </span>
                <button
                  onClick={handleCopyPath}
                  className="p-1.5 rounded-lg border border-border/60 hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground shrink-0 shadow-sm"
                  title="Copy path"
                >
                  {copiedPath ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Config Block */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {isToml ? t('docs.gettingStarted.configToml') : t('docs.gettingStarted.configJson')}
                </h4>
                <button
                  onClick={handleCopyConfig}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border/60 bg-background/50 hover:bg-muted/85 hover:text-foreground transition-colors text-xs text-muted-foreground font-bold shadow-sm"
                >
                  {copiedConfig ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{t('docs.gettingStarted.copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{t('docs.gettingStarted.copyConfig')}</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative bg-background/90 border border-border/50 p-4 rounded-xl shadow-inner overflow-hidden">
                <ConfigRenderer code={currentConfig} />
              </div>
            </div>

          </div>
        </div>

        {/* Pro Tip Box */}
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-5 mt-6 not-prose flex gap-3 items-start max-w-3xl mx-auto">
          <Info className="h-5 w-5 text-sky-500 shrink-0 mt-0.5" />
          <p className="mb-0 text-sm md:text-base text-muted-foreground leading-relaxed">
            <strong className="text-sky-500 font-bold">{t('docs.gettingStarted.proTipTitle')}</strong> {t('docs.gettingStarted.proTipDesc1')}<br/>
            <Trans i18nKey="docs.gettingStarted.proTipDesc2" components={[<strong key="0" className="text-foreground" />, <strong key="1" className="text-foreground" />]} />
          </p>
        </div>

      </div>

      <h2 id="environment-variables">{t('docs.gettingStarted.envVars')}</h2>
      <p>
        {t('docs.gettingStarted.envVarsDesc')}
      </p>

      <div className="overflow-x-auto rounded-xl border border-border my-6 bg-card/40 backdrop-blur-sm">
        <table className="w-full text-left text-sm border-collapse my-0">
          <thead className="bg-muted/60">
            <tr className="border-b border-border/60">
              <th className="p-4 font-bold text-foreground text-xs uppercase tracking-wider">{t('docs.gettingStarted.table.variable')}</th>
              <th className="p-4 font-bold text-foreground text-xs uppercase tracking-wider">{t('docs.gettingStarted.table.description')}</th>
              <th className="p-4 font-bold text-foreground text-xs uppercase tracking-wider">{t('docs.gettingStarted.table.example')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-xs md:text-sm text-foreground/80">
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">MYSQL_URL</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descMysql')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">mysql://user:pass@localhost:3306/db</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">POSTGRES_URL</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descPostgres')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">postgres://user:pass@localhost:5432/db</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">GITHUB_TOKEN</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descGithub')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">ghp_your_secret_token_here</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">TRELLO_API_KEY</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descTrelloKey')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">YourTrelloApiKey</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">TRELLO_API_TOKEN</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descTrelloToken')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">YourTrelloApiToken</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">OPENPROJECT_DOMAIN</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descOpDomain')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">https://your-domain.openproject.com</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">OPENPROJECT_API_KEY</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descOpKey')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">YourOpenProjectApiKey</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">JIRA_EMAIL</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descJiraEmail')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">your-jira-email@example.com</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">JIRA_API_TOKEN</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descJiraToken')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">YourJiraApiToken</code></td>
            </tr>
            <tr className="hover:bg-muted/10 transition-colors">
              <td className="p-4 font-mono text-accent font-semibold">JIRA_DOMAIN</td>
              <td className="p-4 leading-relaxed">{t('docs.gettingStarted.table.descJiraDomain')}</td>
              <td className="p-4"><code className="text-xs bg-muted border border-border px-1.5 py-1 rounded font-mono">https://your-domain.atlassian.net</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-5 my-8 not-prose">
        <h3 className="text-sky-500 font-bold mt-0 mb-2.5 flex items-center gap-2 text-sm md:text-base">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          {t('docs.gettingStarted.securityNote')}
        </h3>
        <p className="mb-0 text-xs md:text-sm text-muted-foreground leading-relaxed">
          <Trans i18nKey="docs.gettingStarted.securityDesc" components={[<strong key="0" />, <code key="1" />, <code key="2" />, <code key="3" />]} />
        </p>
      </div>

      <h2 id="next-steps">{t('docs.gettingStarted.nextSteps')}</h2>
      <p>
        <Trans i18nKey="docs.gettingStarted.nextStepsDesc" components={[<strong key="0" className="text-foreground" />]} />
      </p>
    </>
  )
}

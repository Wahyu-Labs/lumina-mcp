import './index.css'

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <a href="#" className="logo">Lumina<span>MCP</span></a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#docs">Documentation</a>
          <a href="https://github.com/wahyu-/lumina-mcp" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <h1>Unified MCP Toolkit for Engineering Workflows</h1>
          <p>
            Connect your AI agents seamlessly to your local file systems, databases, and version control.
            Empower your agents to build, audit, and push code autonomously.
          </p>
          <div className="cta-group">
            <a href="#docs" className="btn-primary">Get Started</a>
            <a href="https://github.com/wahyu-/lumina-mcp" target="_blank" rel="noopener noreferrer" className="btn-secondary">View Source</a>
          </div>
        </section>

        <section id="features" className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">End-to-End Orchestration</h3>
            <p className="feature-desc">
              Execute full software engineering workflows with 5 or 6 phases of pure AI-driven development.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🗄️</div>
            <h3 className="feature-title">Database Integration</h3>
            <p className="feature-desc">
              Run raw SQL queries against MySQL or PostgreSQL directly from the MCP server to verify migrations.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐙</div>
            <h3 className="feature-title">Git & GitHub Actions</h3>
            <p className="feature-desc">
              Automatically create PRs, commit code, review changes, and trigger CI/CD pipelines effortlessly.
            </p>
          </div>
        </section>

        <section className="hero" style={{ marginTop: '4rem', marginBottom: '4rem', animation: 'none' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Quick Install</h2>
          <div className="code-block">
            npm install -g lumina-mcp
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

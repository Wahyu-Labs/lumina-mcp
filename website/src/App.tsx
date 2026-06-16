import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import { DocsLayout } from './components/docs/DocsLayout'
import { GettingStarted } from './pages/docs/GettingStarted'
import { CompoundEngineeringDocs } from './pages/docs/CompoundEngineering'
import { DatabaseDocs } from './pages/docs/DatabaseDocs'
import { ProjectManagementDocs } from './pages/docs/ProjectManagementDocs'
import { VersionControlDocs } from './pages/docs/VersionControlDocs'
import { OrchestrationDocs } from './pages/docs/OrchestrationDocs'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/docs" element={<DocsLayout />}>
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="compound-engineering" element={<CompoundEngineeringDocs />} />
        <Route path="database" element={<DatabaseDocs />} />
        <Route path="project-management" element={<ProjectManagementDocs />} />
        <Route path="version-control" element={<VersionControlDocs />} />
        <Route path="orchestration" element={<OrchestrationDocs />} />
      </Route>
    </Routes>
  )
}

import { useState } from 'react'
import AppShell from './components/layout/AppShell'
import ProjectMatchingPage from './pages/ProjectMatchingPage'
import VerificationPage from './pages/VerificationPage'
import CompetencyDigitalTwin from './pages/competency/CompetencyDigitalTwin'
import WorkforceModulesPage from './pages/WorkforceModulesPage'
import EmployeeWorkspacePage from './pages/EmployeeWorkspacePage'
import EmployeeLearningPage from './pages/EmployeeLearningPage'
import EmployeeProjectsPage from './pages/EmployeeProjectsPage'
import EmployeeCompetencyPage from './pages/EmployeeCompetencyPage'
import EmployeeVerificationPage from './pages/EmployeeVerificationPage'

function App() {
  const [activeTab, setActiveTab] = useState('Verification')
  const [workspace, setWorkspace] = useState('admin')

  const handleWorkspaceChange = (nextWorkspace) => {
    setWorkspace(nextWorkspace)
    setActiveTab('Dashboard')
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'Competency': return <CompetencyDigitalTwin />
      case 'Verification': return <VerificationPage />
      case 'Projects': return <ProjectMatchingPage />
      case 'Learning': return <WorkforceModulesPage type="Learning" />
      case 'Simulation': return <WorkforceModulesPage type="Simulation" />
      case 'Impact': return <WorkforceModulesPage type="Impact" />
      case 'Dashboard':
      default: return <WorkforceModulesPage type="Dashboard" />
    }
  }

  const employeePage = activeTab === 'Dashboard'
    ? <EmployeeWorkspacePage />
    : activeTab === 'Competency'
      ? <EmployeeCompetencyPage />
      : activeTab === 'Verification'
        ? <EmployeeVerificationPage />
    : activeTab === 'Learning'
      ? <EmployeeLearningPage />
      : activeTab === 'Projects'
        ? <EmployeeProjectsPage />
        : null

  return <AppShell activeTab={activeTab} onTabChange={setActiveTab} workspace={workspace} onWorkspaceChange={handleWorkspaceChange}>{workspace === 'employee' && employeePage ? employeePage : renderPage()}</AppShell>
}

export default App

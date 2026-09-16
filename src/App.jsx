import { useState } from 'react'
import AppShell from './components/layout/AppShell'
import ProjectMatchingPage from './pages/ProjectMatchingPage'
import VerificationPage from './pages/VerificationPage'
import CompetencyDigitalTwin from './pages/competency/CompetencyDigitalTwin'
import WorkforceModulesPage from './pages/WorkforceModulesPage'

function App() {
  const [activeTab, setActiveTab] = useState('Verification')

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

  return <AppShell activeTab={activeTab} onTabChange={setActiveTab}>{renderPage()}</AppShell>
}

export default App

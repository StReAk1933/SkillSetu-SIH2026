import { useState } from 'react'
import AppShell from './components/layout/AppShell'
import ProjectMatchingPage from './pages/ProjectMatchingPage'
import VerificationPage from './pages/VerificationPage'
import CompetencyDigitalTwin from './pages/competency/CompetencyDigitalTwin'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  const [activeTab, setActiveTab] = useState('Verification')

  const renderPage = () => {
    switch (activeTab) {
      case 'Competency':
        return <CompetencyDigitalTwin />

      case 'Verification':
        return <VerificationPage />

      case 'Projects':
        return <ProjectMatchingPage />

      case 'Learning':
        return (
          <PlaceholderPage
            title="AI Learning & Skill Gap"
            description="Personalized learning recommendations based on competency gaps and target-role requirements."
          />
        )

      case 'Simulation':
        return (
          <PlaceholderPage
            title="Workforce What-If Simulator"
            description="Explore workforce readiness changes under different upskilling and deployment scenarios."
          />
        )

      case 'Impact':
        return (
          <PlaceholderPage
            title="Training Impact & ROI"
            description="Track competency improvement, training effectiveness and measurable workforce impact."
          />
        )

      case 'Dashboard':
      default:
        return (
          <PlaceholderPage
            title="SkillSetu Dashboard"
            description="AI-enabled skill intelligence, competency verification, learning, project matching and workforce analytics."
          />
        )
    }
  }

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </AppShell>
  )
}

export default App

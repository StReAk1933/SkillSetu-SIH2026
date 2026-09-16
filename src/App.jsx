import { useState } from 'react'
import AppShell from './components/layout/AppShell'
import ProjectMatchingPage from './pages/ProjectMatchingPage'
import VerificationPage from './pages/VerificationPage'

function App() {
  const [activeTab, setActiveTab] = useState('Verification')

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'Verification' ? <VerificationPage /> : <ProjectMatchingPage />}
    </AppShell>
  )
}

export default App
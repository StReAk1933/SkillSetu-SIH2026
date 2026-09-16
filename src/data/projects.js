export const skillCatalog = {
  react: 'React',
  javascript: 'JavaScript',
  node: 'Node.js',
  sql: 'SQL',
  dataVisualization: 'Data Visualization',
  azure: 'Microsoft Azure',
  python: 'Python',
  uxResearch: 'UX Research',
  accessibility: 'Accessibility',
  apiDesign: 'API Design',
  cyberSecurity: 'Cybersecurity',
  projectManagement: 'Project Management',
}

export const projects = [
  {
    id: 'project-citizen-dashboard',
    name: 'Citizen Services Dashboard',
    client: 'National Digital Services Mission',
    department: 'Public Digital Experience',
    description:
      'Build a responsive command dashboard for tracking citizen service requests across state departments.',
    priority: 'High',
    timeline: '12 weeks',
    status: 'Open for staffing',
    requiredSkills: [
      { skillId: 'react', requiredLevel: 4, weight: 0.3, critical: true },
      { skillId: 'javascript', requiredLevel: 4, weight: 0.2, critical: true },
      { skillId: 'dataVisualization', requiredLevel: 3, weight: 0.2, critical: false },
      { skillId: 'node', requiredLevel: 3, weight: 0.15, critical: false },
      { skillId: 'accessibility', requiredLevel: 3, weight: 0.15, critical: true },
    ],
  },
  {
    id: 'project-health-analytics',
    name: 'District Health Analytics',
    client: 'Ministry of Health Programme Office',
    department: 'Health Intelligence',
    description:
      'Create an analytics workspace that helps district teams identify service gaps and allocate resources.',
    priority: 'High',
    timeline: '16 weeks',
    status: 'Open for staffing',
    requiredSkills: [
      { skillId: 'python', requiredLevel: 4, weight: 0.25, critical: true },
      { skillId: 'sql', requiredLevel: 4, weight: 0.25, critical: true },
      { skillId: 'dataVisualization', requiredLevel: 4, weight: 0.2, critical: false },
      { skillId: 'azure', requiredLevel: 3, weight: 0.15, critical: false },
      { skillId: 'projectManagement', requiredLevel: 3, weight: 0.15, critical: false },
    ],
  },
  {
    id: 'project-grievance-platform',
    name: 'Integrated Grievance Platform',
    client: 'State Citizen Support Cell',
    department: 'Platform Engineering',
    description:
      'Modernise grievance intake and escalation with secure APIs, accessible workflows, and service-level tracking.',
    priority: 'Medium',
    timeline: '20 weeks',
    status: 'Planning',
    requiredSkills: [
      { skillId: 'react', requiredLevel: 3, weight: 0.2, critical: false },
      { skillId: 'apiDesign', requiredLevel: 4, weight: 0.25, critical: true },
      { skillId: 'node', requiredLevel: 4, weight: 0.2, critical: true },
      { skillId: 'cyberSecurity', requiredLevel: 4, weight: 0.2, critical: true },
      { skillId: 'accessibility', requiredLevel: 3, weight: 0.15, critical: false },
    ],
  },
]

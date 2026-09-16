/**
 * Verification Module - Mock Data & Data Access Layer
 * SkillSetu SIH 2026 - Member 3 (Competency Verification)
 *
 * Answers: "Does this employee actually have the claimed competency, and what evidence proves it?"
 * Structured for easy migration to REST/GraphQL APIs (GET /api/employees/:id/competencies, etc.)
 */

export const verificationData = [
  {
    employeeId: 'emp-002',
    employeeName: 'Meera Iyer',
    role: 'Data Platform Lead',
    department: 'Health Intelligence',
    location: 'Chennai',
    avatar: 'MI',
    competencies: [
      {
        skillId: 'python',
        skill: 'Python',
        category: 'Programming & Data',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Certification',
          date: '2026-08-20',
          source: 'Certification Authority',
          issuer: 'Python Software Foundation & Google Cloud Certified Professional Data Engineer',
          credentialId: 'CERT-PY-98421-IN',
          validUntil: '2028-08-20',
          verifiedBy: 'National Skill Certification Registry & Automated Proctor',
          verificationScore: 98,
          summary: 'Verified advanced mastery in Python 3.12, distributed ETL pipeline design, async processing, and Pandas/PySpark performance optimization.',
          artifacts: [
            { name: 'Official Certificate PDF', type: 'document', ref: 'https://credentials.skillsetu.gov.in/verify/CERT-PY-98421-IN' },
            { name: 'Benchmarking Test Suite', type: 'code', ref: 'github.com/gov-health-intel/py-etl-benchmarks' }
          ],
          auditTrail: [
            { date: '2026-08-20 14:32', action: 'Digital Credential Validated via API', actor: 'Automated Verifier' },
            { date: '2026-08-20 11:15', action: 'Certificate Uploaded by Employee', actor: 'Meera Iyer' }
          ]
        }
      },
      {
        skillId: 'sql',
        skill: 'SQL',
        category: 'Database & Analytics',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-08-02',
          source: 'Project Repository',
          issuer: 'District Health Surveillance Engine (Gov Health Data Stack)',
          credentialId: 'PROJ-SQL-DHSE-4029',
          validUntil: 'Permanent',
          verifiedBy: 'Sanjay Varma (Principal Data Architect)',
          verificationScore: 95,
          summary: 'Engineered complex PostgreSQL & BigQuery analytical models processing 12M+ daily health records with query latency sub-120ms.',
          artifacts: [
            { name: 'Production Query Optimization PR #481', type: 'pull_request', ref: 'repo.gov.in/health-intel/sql-analytics/pull/481' },
            { name: 'Architecture Review Signoff', type: 'document', ref: 'docs.gov.in/reviews/sql-perf-signoff-2026' }
          ],
          auditTrail: [
            { date: '2026-08-02 16:40', action: 'Codebase Metrics & Performance Audit Approved', actor: 'Sanjay Varma' },
            { date: '2026-07-28 09:20', action: 'PR Merged to Main Branch', actor: 'Meera Iyer' }
          ]
        }
      },
      {
        skillId: 'dataVisualization',
        skill: 'Data Visualization',
        category: 'Analytics & BI',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-07-11',
          source: 'Project Repository',
          issuer: 'Ministry of Health Surveillance Dashboard',
          credentialId: 'PROJ-VIZ-MHSD-2026',
          validUntil: 'Permanent',
          verifiedBy: 'Pooja Nair (Director of Product Analytics)',
          verificationScore: 92,
          summary: 'Built multi-dimensional epidemiological dashboards using Recharts, D3.js and Apache Superset for state-level health officers.',
          artifacts: [
            { name: 'Dashboard Live Deployment', type: 'app', ref: 'dashboard.health.gov.in/surveillance' },
            { name: 'Usability Evaluation Report (4.8/5)', type: 'document', ref: 'docs.gov.in/ux/moh-dashboard-eval.pdf' }
          ],
          auditTrail: [
            { date: '2026-07-11 17:00', action: 'Peer & Stakeholder Validation Confirmed', actor: 'Pooja Nair' },
            { date: '2026-07-08 14:10', action: 'User Acceptance Testing Passed', actor: 'State Health Officers' }
          ]
        }
      },
      {
        skillId: 'azure',
        skill: 'Microsoft Azure',
        category: 'Cloud & Infrastructure',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Certification',
          date: '2026-06-29',
          source: 'Certification Authority',
          issuer: 'Microsoft Certified: Azure Data Engineer Associate (DP-203)',
          credentialId: 'MS-AZ-DP203-77492',
          validUntil: '2028-06-29',
          verifiedBy: 'Microsoft Credentialing Services',
          verificationScore: 94,
          summary: 'Certified in Azure Synapse Analytics, Azure Data Factory, Cosmos DB, and Azure Blob Storage security policies.',
          artifacts: [
            { name: 'Microsoft Learn Transcript Link', type: 'badge', ref: 'learn.microsoft.com/transcript/meera-iyer' }
          ],
          auditTrail: [
            { date: '2026-06-29 18:00', action: 'Automatic Microsoft API Validation', actor: 'Azure Verification Engine' }
          ]
        }
      },
      {
        skillId: 'projectManagement',
        skill: 'Project Management',
        category: 'Leadership & Execution',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Manager validation',
          date: '2026-07-04',
          source: 'Management Review Board',
          issuer: 'Public Sector Transformation Group',
          credentialId: 'MGR-EVAL-PSTG-8821',
          validUntil: '2027-07-04',
          verifiedBy: 'Kavya Joshi (Programme Delivery Manager)',
          verificationScore: 90,
          summary: 'Successfully delivered 3 cross-functional national health intelligence milestones on-time and within allocated budget.',
          artifacts: [
            { name: 'Sprint Milestone Completion Audit', type: 'document', ref: 'jira.gov.in/milestones/HINTEL-Q2-2026' }
          ],
          auditTrail: [
            { date: '2026-07-04 10:30', action: 'Annual Competency Endorsement Signed', actor: 'Kavya Joshi' }
          ]
        }
      },
      {
        skillId: 'javascript',
        skill: 'JavaScript',
        category: 'Programming & Web',
        level: 2,
        status: 'unverified',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-03-18',
          source: 'Employee Profile',
          issuer: 'Self-Claimed',
          credentialId: 'SELF-CLAIM-002-JS',
          validUntil: 'N/A',
          verifiedBy: 'Pending Review',
          verificationScore: null,
          summary: 'Basic DOM scripting and utility scripting for frontend integration. No formal code assessment or certification submitted.',
          artifacts: [],
          auditTrail: [
            { date: '2026-03-18 10:00', action: 'Self-reported competency added to profile', actor: 'Meera Iyer' }
          ]
        }
      }
    ]
  },
  {
    employeeId: 'emp-001',
    employeeName: 'Aarav Sharma',
    role: 'Senior Frontend Engineer',
    department: 'Product Engineering',
    location: 'Bengaluru',
    avatar: 'AS',
    competencies: [
      {
        skillId: 'react',
        skill: 'React',
        category: 'Frontend Engineering',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-08-12',
          source: 'Project Repository',
          issuer: 'National Citizen Portal Framework',
          credentialId: 'PROJ-REACT-NCPF-901',
          validUntil: 'Permanent',
          verifiedBy: 'Rohan Das (Cloud Solutions Architect)',
          verificationScore: 97,
          summary: 'Led frontend architecture for micro-frontends serving 5M+ monthly active citizens, maintaining 99.8% crash-free sessions.',
          artifacts: [
            { name: 'Production Component Library', type: 'code', ref: 'github.com/citizen-gov/ui-core' }
          ],
          auditTrail: [
            { date: '2026-08-12 11:20', action: 'Code architecture audit completed', actor: 'Rohan Das' }
          ]
        }
      },
      {
        skillId: 'javascript',
        skill: 'JavaScript',
        category: 'Programming & Web',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Technical assessment',
          date: '2026-07-30',
          source: 'National Technical Evaluation Council',
          issuer: 'Standardized GovTech Coding Assessment',
          credentialId: 'ASSESS-JS-NTEC-4412',
          validUntil: '2028-07-30',
          verifiedBy: 'GovTech Automated Evaluation Platform',
          verificationScore: 99,
          summary: 'Scored in 99th percentile for ECMAScript 2026, memory leak detection, event loop concurrency, and web worker pipelines.',
          artifacts: [
            { name: 'Assessment Scorecard (99/100)', type: 'scorecard', ref: 'assess.govtech.in/scores/4412' }
          ],
          auditTrail: [
            { date: '2026-07-30 16:15', action: 'Technical examination proctor verified', actor: 'GovTech Proctor' }
          ]
        }
      },
      {
        skillId: 'dataVisualization',
        skill: 'Data Visualization',
        category: 'Analytics & BI',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-08-05',
          source: 'Project Repository',
          issuer: 'State Operations Command Center',
          credentialId: 'PROJ-VIZ-SOCC-332',
          validUntil: 'Permanent',
          verifiedBy: 'Meera Iyer (Data Platform Lead)',
          verificationScore: 91,
          summary: 'Created interactive geospatial and heat-map visualizations for disaster response operations.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-05 13:00', action: 'Project Deliverable Verified', actor: 'Meera Iyer' }
          ]
        }
      },
      {
        skillId: 'node',
        skill: 'Node.js',
        category: 'Backend & Services',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Technical assessment',
          date: '2026-06-18',
          source: 'Internal Assessment Portal',
          issuer: 'OpenJS Foundation Certified Node.js Application Developer',
          credentialId: 'CERT-NODE-JSD-8812',
          validUntil: '2028-06-18',
          verifiedBy: 'OpenJS Foundation',
          verificationScore: 92,
          summary: 'Demonstrated proficiency in building high-throughput microservices, stream handling, and secure REST APIs.',
          artifacts: [],
          auditTrail: [
            { date: '2026-06-18 15:45', action: 'Certification verified via OpenJS Registry', actor: 'OpenJS Engine' }
          ]
        }
      },
      {
        skillId: 'accessibility',
        skill: 'Accessibility',
        category: 'Frontend & Quality',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Peer review',
          date: '2026-05-21',
          source: 'Design & Accessibility Guild',
          issuer: 'Citizen Experience Accessibility Audit Team',
          credentialId: 'PEER-A11Y-WCAG22-09',
          validUntil: '2027-05-21',
          verifiedBy: 'Nisha Kulkarni (Product Designer)',
          verificationScore: 88,
          summary: 'Ensured WCAG 2.2 AA compliance across all citizen service form flows with zero screen reader blocking defects.',
          artifacts: [],
          auditTrail: [
            { date: '2026-05-21 14:00', action: 'Accessibility Guild Review Completed', actor: 'Nisha Kulkarni' }
          ]
        }
      },
      {
        skillId: 'apiDesign',
        skill: 'API Design',
        category: 'Architecture & Design',
        level: 3,
        status: 'pending',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-04-16',
          source: 'Employee Profile (Audit Requested)',
          issuer: 'Pending Architecture Committee Review',
          credentialId: 'PENDING-API-DES-102',
          validUntil: 'N/A',
          verifiedBy: 'Aditya Menon (Assigned Reviewer)',
          verificationScore: null,
          summary: 'OpenAPI 3.1 schema definitions created for citizen auth endpoints. Awaiting technical architecture peer review.',
          artifacts: [
            { name: 'Draft OpenAPI Spec', type: 'code', ref: 'repo.gov.in/specs/citizen-auth.yaml' }
          ],
          auditTrail: [
            { date: '2026-04-16 12:00', action: 'Verification request submitted to Architecture Committee', actor: 'Aarav Sharma' }
          ]
        }
      }
    ]
  },
  {
    employeeId: 'emp-003',
    employeeName: 'Vikram Reddy',
    role: 'Full Stack Engineer',
    department: 'Platform Engineering',
    location: 'Hyderabad',
    avatar: 'VR',
    competencies: [
      {
        skillId: 'react',
        skill: 'React',
        category: 'Frontend Engineering',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-07-25',
          source: 'Project Repository',
          issuer: 'Grievance Resolution Core App',
          credentialId: 'PROJ-REACT-GRC-112',
          validUntil: 'Permanent',
          verifiedBy: 'Aarav Sharma (Senior Frontend Engineer)',
          verificationScore: 90,
          summary: 'Built dynamic workflow builder component with complex state management and multi-level approvals.',
          artifacts: [],
          auditTrail: [
            { date: '2026-07-25 15:00', action: 'Code review verification signed', actor: 'Aarav Sharma' }
          ]
        }
      },
      {
        skillId: 'javascript',
        skill: 'JavaScript',
        category: 'Programming & Web',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Technical assessment',
          date: '2026-07-07',
          source: 'Internal Assessment Portal',
          issuer: 'Platform Engineering Tech Guild',
          credentialId: 'ASSESS-JS-PETG-311',
          validUntil: '2028-07-07',
          verifiedBy: 'GovTech Automated Evaluation Platform',
          verificationScore: 89,
          summary: 'Completed high-complexity TypeScript/JavaScript core assessment with emphasis on robust type narrowing.',
          artifacts: [],
          auditTrail: [
            { date: '2026-07-07 10:00', action: 'Assessment passed', actor: 'Platform Engineering Proctor' }
          ]
        }
      },
      {
        skillId: 'node',
        skill: 'Node.js',
        category: 'Backend & Services',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-08-16',
          source: 'Project Repository',
          issuer: 'High-Volume Notification Gateway',
          credentialId: 'PROJ-NODE-HVNG-708',
          validUntil: 'Permanent',
          verifiedBy: 'Aditya Menon (Backend Engineer)',
          verificationScore: 96,
          summary: 'Engineered Redis-backed asynchronous worker queues delivering 500k+ push notifications per hour.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-16 17:30', action: 'Performance load test validated and merged', actor: 'Aditya Menon' }
          ]
        }
      },
      {
        skillId: 'apiDesign',
        skill: 'API Design',
        category: 'Architecture & Design',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Technical assessment',
          date: '2026-06-22',
          source: 'Architecture Review Board',
          issuer: 'GovTech API Standardization Taskforce',
          credentialId: 'REV-API-GAST-2026',
          validUntil: '2028-06-22',
          verifiedBy: 'Rohan Das (Cloud Solutions Architect)',
          verificationScore: 93,
          summary: 'Authored RESTful schema guidelines adhering strictly to India Open API specifications.',
          artifacts: [],
          auditTrail: [
            { date: '2026-06-22 14:00', action: 'API Guidelines compliance certified', actor: 'Rohan Das' }
          ]
        }
      },
      {
        skillId: 'cyberSecurity',
        skill: 'Cybersecurity',
        category: 'Security & Compliance',
        level: 3,
        status: 'pending',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-05-13',
          source: 'Training Module in Progress',
          issuer: 'CERT-In Secure Code Developer Track',
          credentialId: 'TRAIN-CERTIN-PROGRESS-99',
          validUntil: 'N/A',
          verifiedBy: 'Pending Exam Completion',
          verificationScore: null,
          summary: 'Completed 80% of OWASP Top 10 hands-on defense lab. Final evaluation scheduled for next sprint.',
          artifacts: [],
          auditTrail: [
            { date: '2026-05-13 18:00', action: 'Training course enrollment submitted', actor: 'Vikram Reddy' }
          ]
        }
      },
      {
        skillId: 'accessibility',
        skill: 'Accessibility',
        category: 'Frontend & Quality',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Peer review',
          date: '2026-04-28',
          source: 'Citizen Experience Team',
          issuer: 'National Accessibility Review Board',
          credentialId: 'PEER-A11Y-NARB-04',
          validUntil: '2027-04-28',
          verifiedBy: 'Nisha Kulkarni (Product Designer)',
          verificationScore: 87,
          summary: 'Verified ARIA live regions and keyboard focus management in complex modal dialogs.',
          artifacts: [],
          auditTrail: [
            { date: '2026-04-28 11:30', action: 'Peer review approved', actor: 'Nisha Kulkarni' }
          ]
        }
      }
    ]
  },
  {
    employeeId: 'emp-004',
    employeeName: 'Nisha Kulkarni',
    role: 'Product Designer',
    department: 'Citizen Experience',
    location: 'Pune',
    avatar: 'NK',
    competencies: [
      {
        skillId: 'uxResearch',
        skill: 'UX Research',
        category: 'Design & User Experience',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Portfolio review',
          date: '2026-08-08',
          source: 'Design Council Review',
          issuer: 'National Digital Experience Framework Panel',
          credentialId: 'PORT-UX-NDEF-554',
          validUntil: 'Permanent',
          verifiedBy: 'Kavya Joshi (Programme Delivery Manager)',
          verificationScore: 98,
          summary: 'Conducted field usability studies across 14 rural districts, translating citizen user journeys into accessible design tokens.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-08 16:00', action: 'Portfolio evaluation ratified', actor: 'Design Council Panel' }
          ]
        }
      },
      {
        skillId: 'accessibility',
        skill: 'Accessibility',
        category: 'Frontend & Quality',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Peer review',
          date: '2026-07-19',
          source: 'GovTech Inclusive Design Guild',
          issuer: 'IAAP Certified Professional in Accessibility Core Competencies (CPACC)',
          credentialId: 'IAAP-CPACC-2026-88',
          validUntil: '2029-07-19',
          verifiedBy: 'International Association of Accessibility Professionals',
          verificationScore: 96,
          summary: 'Certified accessibility specialist for multi-lingual screen reader navigation and low-vision color contrast compliance.',
          artifacts: [],
          auditTrail: [
            { date: '2026-07-19 12:00', action: 'CPACC credential verified via IAAP registry', actor: 'Inclusive Design Guild' }
          ]
        }
      },
      {
        skillId: 'dataVisualization',
        skill: 'Data Visualization',
        category: 'Analytics & BI',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-06-15',
          source: 'Project Repository',
          issuer: 'Citizen Sentiment & Feedback Portal',
          credentialId: 'PROJ-VIZ-CSFP-201',
          validUntil: 'Permanent',
          verifiedBy: 'Meera Iyer (Data Platform Lead)',
          verificationScore: 86,
          summary: 'Designed intuitive visual analytics charts for non-technical administrative staff.',
          artifacts: [],
          auditTrail: [
            { date: '2026-06-15 14:00', action: 'Design implementation verified', actor: 'Meera Iyer' }
          ]
        }
      },
      {
        skillId: 'react',
        skill: 'React',
        category: 'Frontend Engineering',
        level: 2,
        status: 'unverified',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-02-10',
          source: 'Employee Profile',
          issuer: 'Self-Claimed',
          credentialId: 'SELF-CLAIM-004-REACT',
          validUntil: 'N/A',
          verifiedBy: 'Pending Evaluation',
          verificationScore: null,
          summary: 'Component prototyping and Storybook integration knowledge.',
          artifacts: [],
          auditTrail: [
            { date: '2026-02-10 09:30', action: 'Self-reported competency added', actor: 'Nisha Kulkarni' }
          ]
        }
      },
      {
        skillId: 'javascript',
        skill: 'JavaScript',
        category: 'Programming & Web',
        level: 2,
        status: 'unverified',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-02-10',
          source: 'Employee Profile',
          issuer: 'Self-Claimed',
          credentialId: 'SELF-CLAIM-004-JS',
          validUntil: 'N/A',
          verifiedBy: 'Pending Evaluation',
          verificationScore: null,
          summary: 'Basic scripting for interactive design prototypes.',
          artifacts: [],
          auditTrail: [
            { date: '2026-02-10 09:30', action: 'Self-reported competency added', actor: 'Nisha Kulkarni' }
          ]
        }
      }
    ]
  },
  {
    employeeId: 'emp-005',
    employeeName: 'Rohan Das',
    role: 'Cloud Solutions Architect',
    department: 'Platform Engineering',
    location: 'Kolkata',
    avatar: 'RD',
    competencies: [
      {
        skillId: 'azure',
        skill: 'Microsoft Azure',
        category: 'Cloud & Infrastructure',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Certification',
          date: '2026-08-25',
          source: 'Certification Authority',
          issuer: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)',
          credentialId: 'MS-AZ-AZ305-99318',
          validUntil: '2028-08-25',
          verifiedBy: 'Microsoft Credential Validation API',
          verificationScore: 99,
          summary: 'Mastery in enterprise cloud architectures, multi-region failover, Kubernetes clusters on AKS, and zero-trust perimeter network security.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-25 15:30', action: 'Certified by Microsoft Examination Board', actor: 'Microsoft' }
          ]
        }
      },
      {
        skillId: 'cyberSecurity',
        skill: 'Cybersecurity',
        category: 'Security & Compliance',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Certification',
          date: '2026-07-28',
          source: 'Certification Authority',
          issuer: 'ISC2 Certified Information Systems Security Professional (CISSP)',
          credentialId: 'ISC2-CISSP-2026-440',
          validUntil: '2029-07-28',
          verifiedBy: 'ISC2 Official Registrar',
          verificationScore: 95,
          summary: 'Proven expertise in national data sovereignty compliance, end-to-end payload encryption, and threat modeling.',
          artifacts: [],
          auditTrail: [
            { date: '2026-07-28 10:15', action: 'Credential confirmed through ISC2 registry', actor: 'Security Guild' }
          ]
        }
      },
      {
        skillId: 'apiDesign',
        skill: 'API Design',
        category: 'Architecture & Design',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Architecture review',
          date: '2026-08-01',
          source: 'National API Standardization Council',
          issuer: 'Government Gateway Architecture Review Panel',
          credentialId: 'ARCH-API-GGARP-001',
          validUntil: 'Permanent',
          verifiedBy: 'Aditya Menon (Lead Backend Engineer)',
          verificationScore: 97,
          summary: 'Architected unified microservice communication protocol connecting 22 state-level databases with rate limiting and mutual TLS.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-01 17:00', action: 'Architecture charter ratified', actor: 'National API Council' }
          ]
        }
      },
      {
        skillId: 'node',
        skill: 'Node.js',
        category: 'Backend & Services',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-05-18',
          source: 'Project Repository',
          issuer: 'Cloud Orchestration Agent CLI',
          credentialId: 'PROJ-NODE-COAC-412',
          validUntil: 'Permanent',
          verifiedBy: 'Vikram Reddy (Full Stack Engineer)',
          verificationScore: 87,
          summary: 'Implemented backend micro-agent scripts for infrastructure provisioning.',
          artifacts: [],
          auditTrail: [
            { date: '2026-05-18 11:45', action: 'CLI Tool verification completed', actor: 'Vikram Reddy' }
          ]
        }
      },
      {
        skillId: 'projectManagement',
        skill: 'Project Management',
        category: 'Leadership & Execution',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Manager validation',
          date: '2026-06-30',
          source: 'Management Review Board',
          issuer: 'Platform Infrastructure Leadership Group',
          credentialId: 'MGR-EVAL-PILG-3301',
          validUntil: '2027-06-30',
          verifiedBy: 'Kavya Joshi (Programme Delivery Manager)',
          verificationScore: 91,
          summary: 'Led cloud migration program across 4 regional cloud zones with zero downtime.',
          artifacts: [],
          auditTrail: [
            { date: '2026-06-30 16:20', action: 'Manager review signed', actor: 'Kavya Joshi' }
          ]
        }
      }
    ]
  },
  {
    employeeId: 'emp-006',
    employeeName: 'Sana Khan',
    role: 'Analytics Engineer',
    department: 'Health Intelligence',
    location: 'New Delhi',
    avatar: 'SK',
    competencies: [
      {
        skillId: 'python',
        skill: 'Python',
        category: 'Programming & Data',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Technical assessment',
          date: '2026-07-09',
          source: 'Internal Assessment Portal',
          issuer: 'GovTech Python Data Specialization Test',
          credentialId: 'ASSESS-PY-GPST-902',
          validUntil: '2028-07-09',
          verifiedBy: 'Automated Evaluation Platform',
          verificationScore: 91,
          summary: 'Scored top marks on pandas data wrangling, NumPy vectorization, and statistical hypothesis testing.',
          artifacts: [],
          auditTrail: [
            { date: '2026-07-09 14:15', action: 'Assessment certified', actor: 'Automated Proctor' }
          ]
        }
      },
      {
        skillId: 'sql',
        skill: 'SQL',
        category: 'Database & Analytics',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-08-14',
          source: 'Project Repository',
          issuer: 'Health Supply Chain Analytics Pipeline',
          credentialId: 'PROJ-SQL-HSCAP-519',
          validUntil: 'Permanent',
          verifiedBy: 'Meera Iyer (Data Platform Lead)',
          verificationScore: 93,
          summary: 'Authored automated dbt SQL transformation pipelines tracking medicine inventory across 180 clinics.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-14 18:00', action: 'Pipeline metrics validated', actor: 'Meera Iyer' }
          ]
        }
      },
      {
        skillId: 'dataVisualization',
        skill: 'Data Visualization',
        category: 'Analytics & BI',
        level: 3,
        status: 'pending',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-04-03',
          source: 'Employee Profile (Peer Review Requested)',
          issuer: 'District Vaccine Supply Dashboard',
          credentialId: 'PENDING-VIZ-DVSD-88',
          validUntil: 'N/A',
          verifiedBy: 'Meera Iyer (Assigned Evaluator)',
          verificationScore: null,
          summary: 'Built automated charting components. Waiting for formal peer code review signoff.',
          artifacts: [],
          auditTrail: [
            { date: '2026-04-03 11:00', action: 'Peer review requested', actor: 'Sana Khan' }
          ]
        }
      },
      {
        skillId: 'azure',
        skill: 'Microsoft Azure',
        category: 'Cloud & Infrastructure',
        level: 2,
        status: 'unverified',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-03-22',
          source: 'Employee Profile',
          issuer: 'Self-Claimed',
          credentialId: 'SELF-CLAIM-006-AZ',
          validUntil: 'N/A',
          verifiedBy: 'Pending Evaluation',
          verificationScore: null,
          summary: 'Basic Azure Data Lake and Synapse SQL query execution experience.',
          artifacts: [],
          auditTrail: [
            { date: '2026-03-22 15:00', action: 'Skill registered in profile', actor: 'Sana Khan' }
          ]
        }
      },
      {
        skillId: 'projectManagement',
        skill: 'Project Management',
        category: 'Leadership & Execution',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Manager validation',
          date: '2026-05-27',
          source: 'Management Review Board',
          issuer: 'Health Intelligence Delivery Cell',
          credentialId: 'MGR-EVAL-HIDC-1204',
          validUntil: '2027-05-27',
          verifiedBy: 'Kavya Joshi (Programme Delivery Manager)',
          verificationScore: 88,
          summary: 'Managed sprint backlogs and sprint reviews for analytics engineering stream.',
          artifacts: [],
          auditTrail: [
            { date: '2026-05-27 16:00', action: 'Delivery management evaluation approved', actor: 'Kavya Joshi' }
          ]
        }
      }
    ]
  },
  {
    employeeId: 'emp-007',
    employeeName: 'Aditya Menon',
    role: 'Backend Engineer',
    department: 'Digital Infrastructure',
    location: 'Kochi',
    avatar: 'AM',
    competencies: [
      {
        skillId: 'node',
        skill: 'Node.js',
        category: 'Backend & Services',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-08-10',
          source: 'Project Repository',
          issuer: 'Digital Authentication & ID Validation Service',
          credentialId: 'PROJ-NODE-DAIVS-992',
          validUntil: 'Permanent',
          verifiedBy: 'Rohan Das (Cloud Solutions Architect)',
          verificationScore: 98,
          summary: 'Engineered high-throughput JWT & OAuth2 authorization proxy handling 10k RPS with sub-10ms response times.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-10 16:30', action: 'Production benchmark review ratified', actor: 'Rohan Das' }
          ]
        }
      },
      {
        skillId: 'apiDesign',
        skill: 'API Design',
        category: 'Architecture & Design',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Technical assessment',
          date: '2026-07-02',
          source: 'National API Standardization Council',
          issuer: 'GovTech Microservices Design Assessment',
          credentialId: 'ASSESS-API-GMDA-602',
          validUntil: '2028-07-02',
          verifiedBy: 'GovTech Technical Assessment Panel',
          verificationScore: 94,
          summary: 'Certified in GraphQL, gRPC protocol buffers, and idempotency key patterns for financial & citizen transfers.',
          artifacts: [],
          auditTrail: [
            { date: '2026-07-02 11:00', action: 'Assessment verified', actor: 'GovTech Panel' }
          ]
        }
      },
      {
        skillId: 'cyberSecurity',
        skill: 'Cybersecurity',
        category: 'Security & Compliance',
        level: 4,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Certification',
          date: '2026-06-12',
          source: 'Certification Authority',
          issuer: 'CompTIA Security+ (SY0-701) & Certified Ethical Hacker (CEH)',
          credentialId: 'COMPTIA-SEC-2026-891',
          validUntil: '2029-06-12',
          verifiedBy: 'CompTIA Automated Registry',
          verificationScore: 96,
          summary: 'Certified in network defense, API penetration testing, cryptographic protocols, and secure key lifecycle management.',
          artifacts: [],
          auditTrail: [
            { date: '2026-06-12 14:00', action: 'CompTIA registry credential verified', actor: 'CompTIA' }
          ]
        }
      },
      {
        skillId: 'sql',
        skill: 'SQL',
        category: 'Database & Analytics',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-05-09',
          source: 'Project Repository',
          issuer: 'Audit Logging & Ledger Datastore',
          credentialId: 'PROJ-SQL-ALLD-304',
          validUntil: 'Permanent',
          verifiedBy: 'Meera Iyer (Data Platform Lead)',
          verificationScore: 88,
          summary: 'Implemented write-optimized relational database schema and partition pruning strategies.',
          artifacts: [],
          auditTrail: [
            { date: '2026-05-09 17:00', action: 'Database design signoff', actor: 'Meera Iyer' }
          ]
        }
      },
      {
        skillId: 'react',
        skill: 'React',
        category: 'Frontend Engineering',
        level: 2,
        status: 'unverified',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-01-15',
          source: 'Employee Profile',
          issuer: 'Self-Claimed',
          credentialId: 'SELF-CLAIM-007-REACT',
          validUntil: 'N/A',
          verifiedBy: 'Pending Evaluation',
          verificationScore: null,
          summary: 'Familiarity with admin dashboard UI tweaks in React.',
          artifacts: [],
          auditTrail: [
            { date: '2026-01-15 10:00', action: 'Self-reported competency registered', actor: 'Aditya Menon' }
          ]
        }
      }
    ]
  },
  {
    employeeId: 'emp-008',
    employeeName: 'Kavya Joshi',
    role: 'Programme Delivery Manager',
    department: 'Public Sector Transformation',
    location: 'Mumbai',
    avatar: 'KJ',
    competencies: [
      {
        skillId: 'projectManagement',
        skill: 'Project Management',
        category: 'Leadership & Execution',
        level: 5,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Manager validation',
          date: '2026-08-18',
          source: 'Project Management Institute (PMI)',
          issuer: 'PMI Project Management Professional (PMP) & Agile Certified Practitioner (PMI-ACP)',
          credentialId: 'PMI-PMP-2026-5541',
          validUntil: '2029-08-18',
          verifiedBy: 'PMI Registry and State Transformation Secretariat',
          verificationScore: 99,
          summary: 'Led 10+ multi-million citizen platform rollouts across state governments with agile governance and risk mitigation frameworks.',
          artifacts: [],
          auditTrail: [
            { date: '2026-08-18 10:00', action: 'PMP Certification verification verified via PMI API', actor: 'PMI Registry' }
          ]
        }
      },
      {
        skillId: 'cyberSecurity',
        skill: 'Cybersecurity',
        category: 'Security & Compliance',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Training assessment',
          date: '2026-06-06',
          source: 'National e-Governance Division (NeGD)',
          issuer: 'Executive Cybersecurity & Data Protection Policy Masterclass',
          credentialId: 'NEGD-CSDP-2026-092',
          validUntil: '2028-06-06',
          verifiedBy: 'NeGD Certification Board',
          verificationScore: 90,
          summary: 'Trained in Digital Personal Data Protection (DPDP) Act compliance, risk governance, and incident escalation protocols.',
          artifacts: [],
          auditTrail: [
            { date: '2026-06-06 15:30', action: 'Executive certification verified', actor: 'NeGD Board' }
          ]
        }
      },
      {
        skillId: 'dataVisualization',
        skill: 'Data Visualization',
        category: 'Analytics & BI',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Project evidence',
          date: '2026-05-16',
          source: 'Project Repository',
          issuer: 'Executive Delivery Health KPI Deck',
          credentialId: 'PROJ-VIZ-EDHKD-410',
          validUntil: 'Permanent',
          verifiedBy: 'Meera Iyer (Data Platform Lead)',
          verificationScore: 89,
          summary: 'Created stakeholder dashboard reporting delivery velocity, burn-down trends, and blocker mitigation tracking.',
          artifacts: [],
          auditTrail: [
            { date: '2026-05-16 16:00', action: 'Executive visual KPI audit completed', actor: 'Meera Iyer' }
          ]
        }
      },
      {
        skillId: 'accessibility',
        skill: 'Accessibility',
        category: 'Frontend & Quality',
        level: 3,
        status: 'verified',
        verified: true,
        evidence: {
          type: 'Peer review',
          date: '2026-07-12',
          source: 'Citizen Experience Team',
          issuer: 'Public Inclusion & Multilingual Accessibility Standard',
          credentialId: 'PEER-A11Y-PIMS-88',
          validUntil: '2027-07-12',
          verifiedBy: 'Nisha Kulkarni (Product Designer)',
          verificationScore: 88,
          summary: 'Advocated for and governed accessibility requirements across 4 major state department digital portals.',
          artifacts: [],
          auditTrail: [
            { date: '2026-07-12 14:00', action: 'Inclusive governance audit verified', actor: 'Nisha Kulkarni' }
          ]
        }
      },
      {
        skillId: 'sql',
        skill: 'SQL',
        category: 'Database & Analytics',
        level: 2,
        status: 'unverified',
        verified: false,
        evidence: {
          type: 'Self reported',
          date: '2026-02-28',
          source: 'Employee Profile',
          issuer: 'Self-Claimed',
          credentialId: 'SELF-CLAIM-008-SQL',
          validUntil: 'N/A',
          verifiedBy: 'Pending Evaluation',
          verificationScore: null,
          summary: 'Ad-hoc query writing for project status reporting.',
          artifacts: [],
          auditTrail: [
            { date: '2026-02-28 11:00', action: 'Self-reported competency added', actor: 'Kavya Joshi' }
          ]
        }
      }
    ]
  }
]

/**
 * Data Access Layer (Mock API Simulation)
 * These methods can easily be swapped with `fetch('/api/...')` when the backend is ready.
 */

export const getEmployees = () => {
  return verificationData
}

export const getEmployeeById = (employeeId) => {
  return verificationData.find((emp) => emp.employeeId === employeeId) || null
}

export const getEmployeeCompetencies = (employeeId) => {
  const employee = getEmployeeById(employeeId)
  return employee ? employee.competencies : []
}

export const getCompetencyEvidence = (employeeId, skillId) => {
  const competencies = getEmployeeCompetencies(employeeId)
  const comp = competencies.find((c) => c.skillId === skillId)
  return comp ? comp.evidence : null
}

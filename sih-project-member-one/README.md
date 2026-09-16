# Module 1 — Competency Digital Twin

**SkillSetu SIH 2026 | Member One**

---

## 📌 About This Module

This is **Module 1: Competency Digital Twin** of the SkillSetu AI-powered competency intelligence platform built for **Smart India Hackathon 2026**.

> The Competency Digital Twin creates a real-time digital representation of employee competencies, strengths, weaknesses, and role readiness — serving as the foundation for all other platform modules.

---

## 🧩 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Icons | React Icons |
| Language | JavaScript (JSX) |

---

## 📁 Project Structure

```
sih-project-member-one/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── EmployeeCard.jsx         # Profile card
│   │   ├── SkillCard.jsx            # Per-skill score card
│   │   ├── CompetencyRadarChart.jsx # Radar chart (Recharts)
│   │   ├── SkillBarChart.jsx        # Bar chart (Recharts)
│   │   ├── StrengthsCard.jsx        # Strengths list
│   │   ├── WeaknessCard.jsx         # Improvement areas
│   │   ├── ReadinessCard.jsx        # Role readiness + gap bars
│   │   └── CompetencySummary.jsx    # AI insight card
│   ├── data/
│   │   └── employees.json           # Mock employee data (3 employees)
│   ├── pages/
│   │   └── CompetencyDigitalTwin.jsx # Main dashboard page
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                    # Global design system
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## 🚀 Dashboard Sections

1. **Header** — Title, subtitle, live indicator
2. **Employee Selector** — Dropdown (Rahul, Priya, Arjun) — updates all charts reactively
3. **Employee Profile Card** — Name, ID, Department, Designation, Experience
4. **Overall Competency Score** — Donut chart (e.g. 66%)
5. **Competency Radar Chart** — Multi-skill radar visualization
6. **Skill Cards** — Individual proficiency cards with level badges
7. **Strengths & Improvement Cards** — Color-coded insight cards
8. **Role Readiness** — SVG ring + per-skill gap analysis bars
9. **Skill Distribution Bar Chart** — Gradient bar chart
10. **AI Competency Summary** — Professional insight card

---

## ⚙️ Setup & Run

```bash
# Navigate into the module folder
cd sih-project-member-one

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 👤 Team Member

- **Module**: Competency Digital Twin (Module 1)
- **Project**: SkillSetu — AI-Powered Competency Intelligence Platform
- **Event**: Smart India Hackathon 2026

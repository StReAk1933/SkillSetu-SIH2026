import { useState, useEffect, useRef } from 'react';
import { FiUsers, FiChevronDown, FiActivity, FiGrid, FiCpu } from 'react-icons/fi';
import { HiSparkles, HiChip } from 'react-icons/hi';
import { PieChart, Pie, Cell, ResponsiveContainer, } from 'recharts';

import employees from './employees.json';
import EmployeeCard from './EmployeeCard';
import SkillCard from './SkillCard';
import CompetencyRadarChart from './CompetencyRadarChart';
import SkillBarChart from './SkillBarChart';
import StrengthsCard from './StrengthsCard';
import WeaknessCard from './WeaknessCard';
import ReadinessCard from './ReadinessCard';
import CompetencySummary from './CompetencySummary';
import './competency.css';

/* ─── Donut Score ─────────────────────────────────── */
function ScoreDonut({ score }) {
  const data = [
    { value: score },
    { value: 100 - score },
  ];
  const color = score >= 80 ? '#34d399' : score >= 60 ? '#6366f1' : '#f59e0b';

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={65}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
            cornerRadius={6}
          >
            <Cell fill="url(#donutGrad)" style={{ filter: `drop-shadow(0 0 8px ${color}88)` }} />
            <Cell fill="rgba(30,30,60,0.8)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-white font-display leading-none">{score}%</span>
        <span className="text-[10px] text-slate-500 font-semibold tracking-widest mt-1">SCORE</span>
      </div>
    </div>
  );
}

/* ─── Employee Dropdown ───────────────────────────── */
function EmployeeDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-64">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-900/70 border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-200 shadow-lg backdrop-blur-sm"
      >
        <div className="flex items-center gap-2.5">
          <FiUsers className="text-indigo-400" size={15} />
          <span className="text-sm font-semibold text-slate-200">{selected.name}</span>
        </div>
        <FiChevronDown
          className={`text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          size={14}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-full rounded-xl bg-slate-900/95 border border-indigo-500/30 shadow-2xl backdrop-blur-xl z-50 overflow-hidden">
          {employees.map((emp) => (
            <button
              key={emp.id}
              onClick={() => { onChange(emp); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150
                ${emp.id === selected.id
                  ? 'bg-indigo-500/20 text-indigo-300'
                  : 'text-slate-300 hover:bg-indigo-500/10 hover:text-indigo-300'
                }`}
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
                {emp.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold">{emp.name}</p>
                <p className="text-xs text-slate-500">{emp.id} · {emp.designation}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Stat Metric Card ────────────────────────────── */
function MetricCard({ icon, label, value, sub, accent }) {
  const accents = {
    indigo: 'from-indigo-500/15 to-indigo-600/5 border-indigo-500/25 text-indigo-400',
    cyan: 'from-cyan-500/15 to-cyan-600/5 border-cyan-500/25 text-cyan-400',
    emerald: 'from-emerald-500/15 to-emerald-600/5 border-emerald-500/25 text-emerald-400',
    amber: 'from-amber-500/15 to-amber-600/5 border-amber-500/25 text-amber-400',
  };
  const cls = accents[accent] || accents.indigo;

  return (
    <div className={`glass-card p-4 bg-gradient-to-br ${cls} border`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl bg-current/10 flex items-center justify-center opacity-80`}>
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-current/10 border border-current/20`}>{sub}</span>
      </div>
      <p className="text-2xl font-bold text-white font-display">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}

/* ─── Section Label ───────────────────────────────── */
function SectionLabel({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500" />
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-base font-bold text-white">{title}</h2>
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────── */
export default function CompetencyDigitalTwin() {
  const [selected, setSelected] = useState(employees[0]);

  return (
    <div className="min-h-screen animated-bg text-slate-100 font-sans">

      {/* ── Top Nav Bar ── */}
      <header className="sticky top-0 z-40 glass border-b border-indigo-500/10 shadow-lg shadow-black/20">
        <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-glow-purple">
              <HiChip className="text-white" size={16} />
            </div>
            <div>
              <span className="text-sm font-bold text-white font-display tracking-wide">SkillSetu</span>
              <span className="text-slate-500 text-xs ml-2">/ Competency Digital Twin</span>
            </div>
          </div>
          {/* Right badges */}
          <div className="flex items-center gap-3">
            <div className="live-indicator">
              <span className="live-dot" />
              LIVE DATA
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-300 font-semibold">
              Module 1
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-8 space-y-8">

        {/* ═══════════════════════════════════════════════
            SECTION 1 — Page Header
        ══════════════════════════════════════════════ */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <HiSparkles className="text-amber-400" size={18} />
              <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase">AI-Powered Intelligence</span>
            </div>
            <h1 className="text-4xl font-extrabold text-white font-display leading-tight">
              Competency{' '}
              <span className="text-gradient">Digital Twin</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-xl">
              Digital representation of employee competencies and workforce readiness.
              Enabling data-driven talent decisions at scale.
            </p>
          </div>

          {/* ═══════════════════════════════════════════
              SECTION 2 — Employee Selector
          ══════════════════════════════════════════ */}
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Select Employee</p>
            <EmployeeDropdown selected={selected} onChange={setSelected} />
          </div>
        </section>

        {/* ── Top Metrics Row ── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={<FiActivity className="text-indigo-400" size={16} />}
            label="Overall Competency"
            value={`${selected.overallScore}%`}
            sub="Score"
            accent="indigo"
          />
          <MetricCard
            icon={<FiGrid className="text-cyan-400" size={16} />}
            label="Total Skills Tracked"
            value={selected.skills.length}
            sub="Skills"
            accent="cyan"
          />
          <MetricCard
            icon={<FiCpu className="text-emerald-400" size={16} />}
            label="Role Readiness"
            value={`${selected.readiness}%`}
            sub="Readiness"
            accent="emerald"
          />
          <MetricCard
            icon={<HiSparkles className="text-amber-400 w-4 h-4" />}
            label="Core Strengths"
            value={selected.strengths.length}
            sub="Strong"
            accent="amber"
          />
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 3 + 4 — Profile Card + Overall Score
        ══════════════════════════════════════════════ */}
        <section>
          <SectionLabel
            icon={<FiUsers className="text-indigo-400" size={15} />}
            title="Employee Profile"
            subtitle="Digital competency identity"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <EmployeeCard employee={selected} />
            </div>

            {/* Overall Score Donut */}
            <div className="glass-card p-6 flex flex-col items-center justify-center gap-4">
              <div className="text-center">
                <h3 className="text-base font-bold text-white">Overall Competency</h3>
                <p className="text-xs text-slate-500 mt-0.5">Aggregate performance index</p>
              </div>
              <ScoreDonut score={selected.overallScore} />
              <div className="flex gap-6 mt-1">
                <ScoreLegend color="#34d399" label="Expert (80+)" />
                <ScoreLegend color="#6366f1" label="Good (60–79)" />
                <ScoreLegend color="#f59e0b" label="Needs Work" />
              </div>
            </div>

            {/* Radar Chart — right panel */}
            <div className="md:col-span-1">
              <CompetencyRadarChart skills={selected.skills} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 6 — Skill Cards
        ══════════════════════════════════════════════ */}
        <section>
          <SectionLabel
            icon={<FiGrid className="text-cyan-400" size={15} />}
            title="Skill Proficiency Cards"
            subtitle="Individual skill-level breakdown"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {selected.skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 7 — Strengths + Areas for Improvement
        ══════════════════════════════════════════════ */}
        <section>
          <SectionLabel
            icon={<FiActivity className="text-emerald-400" size={15} />}
            title="Strengths & Development Areas"
            subtitle="Competency gap intelligence"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <StrengthsCard strengths={selected.strengths} />
            <WeaknessCard improvements={selected.improvements} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 8 + 9 — Readiness + Bar Chart
        ══════════════════════════════════════════════ */}
        <section>
          <SectionLabel
            icon={<FiCpu className="text-violet-400" size={15} />}
            title="Role Readiness & Distribution"
            subtitle="Target role gap analysis and skill distribution"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ReadinessCard employee={selected} />
            <SkillBarChart skills={selected.skills} />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 10 — Competency Summary
        ══════════════════════════════════════════════ */}
        <section>
          <SectionLabel
            icon={<HiSparkles className="text-amber-400" size={15} />}
            title="Competency Summary"
            subtitle="AI-generated professional insight"
          />
          <CompetencySummary employee={selected} />
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-slate-800/60">
          <p className="text-xs text-slate-600">
            SkillSetu · Competency Digital Twin · Module 1 · Smart India Hackathon 2024
          </p>
        </footer>

      </main>
    </div>
  );
}

function ScoreLegend({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
      <span className="text-[10px] text-slate-500">{label}</span>
    </div>
  );
}



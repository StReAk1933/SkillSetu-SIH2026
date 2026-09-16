import { AlertTriangle, Briefcase, CheckCircle2, MapPin, ShieldCheck, X } from 'lucide-react'
import { skillCatalog } from '../../data/projects'
import SkillComparison from './SkillComparison'
import ScoreBreakdown from './ScoreBreakdown'
import VerificationBadge from './VerificationBadge'

function EmployeeDetailPanel({ match, project, onClose }) {
  if (!match) return null

  const { employee } = match
  const initials = employee.name.split(' ').map((part) => part[0]).join('')
  const displayReason = (reason) => reason.replace(/react|javascript|dataVisualization|node|apiDesign|cyberSecurity|projectManagement|accessibility|python|sql|azure/g, (skillId) => skillCatalog[skillId])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button aria-label="Close employee details" onClick={onClose} className="absolute inset-0 bg-slate-950/40 backdrop-blur-[3px]" />
      <aside className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-slate-50 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">Match rationale</p><p className="mt-1 text-sm font-bold text-slate-900">{project.name}</p></div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close details"><X size={20} /></button>
        </div>
        <div className="space-y-5 p-5 sm:p-7">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-slate-900 text-xl font-bold text-white">{initials}</div>
              <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-bold text-slate-950">{employee.name}</h2><VerificationBadge verified={match.verifiedSkills.length === match.skillResults.length} /></div><p className="mt-1 text-sm font-medium text-slate-500">{employee.role}</p><div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500"><span className="inline-flex items-center gap-1"><MapPin size={13} />{employee.location}</span><span className="inline-flex items-center gap-1"><Briefcase size={13} />{employee.department}</span></div></div>
            </div>
            <div className="mt-5 flex items-end justify-between rounded-2xl bg-slate-900 p-5 text-white sm:p-6"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Overall match score</p><p className="mt-2 text-6xl font-black leading-none tracking-[-0.07em] text-white">{match.finalScore}<span className="text-3xl font-bold tracking-normal text-emerald-400">%</span></p><p className="mt-3 text-xs font-semibold text-emerald-300">{match.finalScore >= 80 ? 'Excellent skill alignment' : match.finalScore >= 60 ? 'Strong potential match' : 'Capability gaps to review'}</p></div><div className="text-right"><p className="text-xs font-bold capitalize text-emerald-300">{employee.availability}</p><p className="mt-2 text-[11px] text-slate-400">{match.matchedSkills.length}/{match.skillResults.length} requirements met</p></div></div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">Requirement fit</p><h3 className="mt-1 text-base font-bold text-slate-900">Employee vs project skills</h3></div><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">Level 1-5</span></div><SkillComparison match={match} /></section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><ScoreBreakdown match={match} /></section>

          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:p-6"><div className="mb-4 flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-emerald-500 text-white"><ShieldCheck size={16} /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">Explainable decision</p><h3 className="text-sm font-bold text-slate-900">Why this employee matches</h3></div></div><div className="space-y-2">{match.explanation.map((reason) => <div key={reason} className="flex gap-2 text-sm leading-5 text-slate-600"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />{displayReason(reason)}</div>)}</div></section>

          <div className="grid gap-4 sm:grid-cols-2"><section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5"><h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800"><CheckCircle2 size={14} />Matched skills</h3><div className="mt-4 space-y-2">{match.matchedSkills.map((skill) => <div key={skill.skillId} className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-sm"><span className="font-medium text-slate-700">{skillCatalog[skill.skillId]}</span><span className="font-bold text-emerald-700">L{skill.employeeLevel}</span></div>)}</div></section><section className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5"><h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800"><AlertTriangle size={14} />Weak and missing</h3><div className="mt-4 space-y-2">{[...match.weakSkills, ...match.missingSkills].length > 0 ? [...match.weakSkills, ...match.missingSkills].map((skill) => <div key={skill.skillId} className="flex items-center justify-between rounded-lg bg-white/80 px-3 py-2 text-sm"><span className="font-medium text-slate-700">{skillCatalog[skill.skillId]}</span><span className="font-bold text-amber-700">{skill.employeeLevel ? `L${skill.employeeLevel}` : 'Missing'}</span></div>) : <p className="text-sm text-amber-800">No skill gaps identified.</p>}</div></section></div>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-center justify-between"><div><h3 className="text-sm font-bold text-slate-900">Verification evidence</h3><p className="mt-1 text-xs text-slate-500">Competencies with supporting evidence</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{match.verifiedSkills.length} verified</span></div><div className="mt-4 grid gap-2">{match.verifiedSkills.map((skill) => <div key={skill.skillId} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-xs"><span className="font-semibold text-slate-700">{skillCatalog[skill.skillId]}</span><span className="text-right text-slate-500">{skill.verificationType} <span className="text-slate-300">/</span> {skill.lastVerified}</span></div>)}</div></section>
        </div>
      </aside>
    </div>
  )
}

export default EmployeeDetailPanel

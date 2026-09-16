import { AlertTriangle, ArrowUpRight, BadgeCheck, Briefcase, CircleDashed, MapPin, UserRound } from 'lucide-react'
import VerificationBadge from './VerificationBadge'
import { skillCatalog } from '../../data/projects'

const availabilityStyles = {
  available: 'bg-emerald-50 text-emerald-700',
  'partially available': 'bg-amber-50 text-amber-700',
  unavailable: 'bg-slate-100 text-slate-500',
}

function EmployeeMatchCard({ match, rank, onSelect }) {
  const { employee } = match
  return (
    <button type="button" onClick={() => onSelect(match)} className="group w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg sm:p-5">
      <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
        <div className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white"><span>{employee.name.split(' ').map((part) => part[0]).join('')}</span><span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-white bg-emerald-500 text-[9px]">{rank}</span></div>
        <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><h3 className="font-bold text-slate-900">{employee.name}</h3><p className="mt-0.5 text-xs font-medium text-slate-500">{employee.role}</p></div><ArrowUpRight size={17} className="text-slate-300 transition group-hover:text-emerald-500" /></div><div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400"><span className="inline-flex items-center gap-1"><MapPin size={12} />{employee.location}</span><span className="inline-flex items-center gap-1"><Briefcase size={12} />{employee.department}</span></div></div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Match score</p><p className="mt-0.5 text-5xl font-black leading-none tracking-[-0.06em] text-slate-950">{match.finalScore}<span className="text-2xl font-bold tracking-normal text-emerald-500">%</span></p><p className="mt-2 text-[11px] font-semibold text-slate-500">{match.finalScore >= 80 ? 'Excellent skill alignment' : match.finalScore >= 60 ? 'Strong potential match' : 'Capability gaps to review'}</p></div><div className="flex flex-col items-end gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${availabilityStyles[employee.availability]}`}>{employee.availability}</span><span className="text-[11px] font-semibold text-slate-400">{match.matchedSkills.length}/{match.skillResults.length} requirements met</span></div></div>
      <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3"><div className="rounded-xl bg-emerald-50/70 p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700"><BadgeCheck size={13} />Matched</p><div className="mt-2 flex flex-wrap gap-1.5">{match.matchedSkills.length > 0 ? match.matchedSkills.slice(0, 3).map((skill) => <span key={skill.skillId} className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-emerald-700 shadow-sm">{skillCatalog[skill.skillId]}</span>) : <span className="text-[10px] text-emerald-700/70">None at target</span>}</div></div><div className="rounded-xl bg-amber-50/70 p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700"><AlertTriangle size={13} />Weak</p><div className="mt-2 flex flex-wrap gap-1.5">{match.weakSkills.length > 0 ? match.weakSkills.slice(0, 2).map((skill) => <span key={skill.skillId} className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-amber-700 shadow-sm">{skillCatalog[skill.skillId]}</span>) : <span className="text-[10px] text-amber-700/70">None identified</span>}</div></div><div className="rounded-xl bg-rose-50/70 p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-700"><CircleDashed size={13} />Missing</p><div className="mt-2 flex flex-wrap gap-1.5">{match.missingSkills.length > 0 ? match.missingSkills.slice(0, 2).map((skill) => <span key={skill.skillId} className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-rose-700 shadow-sm">{skillCatalog[skill.skillId]}</span>) : <span className="text-[10px] text-rose-700/70">None identified</span>}</div></div></div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"><VerificationBadge verified={match.verifiedSkills.length === match.skillResults.length} compact /><span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">View rationale <UserRound size={13} /></span></div>
    </button>
  )
}

export default EmployeeMatchCard

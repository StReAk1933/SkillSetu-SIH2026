import { Award, CheckCircle2, Users, Zap } from 'lucide-react'

function MatchSummary({ matches, project }) {
  const topMatch = matches[0]
  const verifiedCount = topMatch?.verifiedSkills.length ?? 0
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><Zap size={17} /></span><span className="text-xs font-semibold text-emerald-600">Live calculation</span></div><p className="mt-4 text-2xl font-bold text-slate-950">{matches.length}</p><p className="text-xs font-medium text-slate-500">Employees evaluated</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-lg bg-blue-50 p-2 text-blue-600"><Award size={17} /></span><span className="text-xs font-semibold text-slate-400">Top result</span></div><p className="mt-4 text-2xl font-bold text-slate-950">{topMatch?.finalScore ?? 0}%</p><p className="truncate text-xs font-medium text-slate-500">{topMatch?.employee.name ?? 'No match'} for {project.name}</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-lg bg-violet-50 p-2 text-violet-600"><CheckCircle2 size={17} /></span><span className="text-xs font-semibold text-slate-400">Top result</span></div><p className="mt-4 text-2xl font-bold text-slate-950">{verifiedCount}/{project.requiredSkills.length}</p><p className="text-xs font-medium text-slate-500">Required skills verified</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-lg bg-amber-50 p-2 text-amber-600"><Users size={17} /></span><span className="text-xs font-semibold text-slate-400">Capacity signal</span></div><p className="mt-4 text-2xl font-bold text-slate-950">{matches.filter((match) => match.employee.availability === 'available').length}</p><p className="text-xs font-medium text-slate-500">Ready for allocation</p></div>
    </div>
  )
}

export default MatchSummary

import { BarChart3, CheckCircle2, Clock3 } from 'lucide-react'

function ScoreBreakdown({ match }) {
  const items = [
    { label: 'Skill coverage', value: match.scoreBreakdown.skillCoverage, detail: '75% weighting', color: 'bg-emerald-500', icon: BarChart3 },
    { label: 'Verified evidence', value: match.scoreBreakdown.verification, detail: '15% weighting', color: 'bg-blue-500', icon: CheckCircle2 },
    { label: 'Availability', value: match.scoreBreakdown.availability, detail: '10% weighting', color: 'bg-amber-500', icon: Clock3 },
  ]
  return <div><div className="mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-emerald-600" /><h3 className="text-sm font-bold text-slate-900">Score breakdown</h3></div><div className="space-y-4">{items.map(({ label, value, detail, color, icon: Icon }) => <div key={label}><div className="mb-1.5 flex items-center justify-between text-xs"><span className="flex items-center gap-2 font-semibold text-slate-700"><Icon size={14} className="text-slate-400" />{label}</span><span className="font-bold text-slate-900">{value} <span className="font-medium text-slate-400">/ {detail}</span></span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(value, 75) / 75 * 100}%` }} /></div></div>)}</div></div>
}

export default ScoreBreakdown

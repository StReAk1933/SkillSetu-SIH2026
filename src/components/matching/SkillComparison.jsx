import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { skillCatalog } from '../../data/projects'

function SkillComparison({ match }) {
  const chartData = match.skillResults.map((skill) => ({
    name: skillCatalog[skill.skillId],
    Required: skill.requiredLevel,
    Employee: skill.employeeLevel,
    status: skill.status,
  }))

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-3"><div><h3 className="text-sm font-bold text-slate-900">Skill comparison</h3><p className="mt-1 text-xs text-slate-500">Employee proficiency against project requirements</p></div><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">Scale 1-5</span></div>
      <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 8, left: 8, bottom: 4 }} barGap={3}><CartesianGrid stroke="#e2e8f0" horizontal={false} /><XAxis type="number" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} /><YAxis type="category" dataKey="name" width={100} axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} /><Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} /><Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} /><Bar dataKey="Required" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={8} /><Bar dataKey="Employee" radius={[0, 4, 4, 0]} barSize={8}>{chartData.map((skill) => <Cell key={skill.name} fill={skill.status === 'matched' ? '#10b981' : skill.status === 'weak' ? '#f59e0b' : '#f43f5e'} />)}</Bar></BarChart></ResponsiveContainer></div>
      <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3 text-[10px] font-bold uppercase tracking-wider"><span className="inline-flex items-center gap-1.5 text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" />Meets requirement</span><span className="inline-flex items-center gap-1.5 text-amber-700"><span className="size-2 rounded-full bg-amber-400" />Weak</span><span className="inline-flex items-center gap-1.5 text-rose-700"><span className="size-2 rounded-full bg-rose-400" />Missing</span></div>
    </div>
  )
}

export default SkillComparison

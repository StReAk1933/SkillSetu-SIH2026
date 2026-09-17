import { useState } from 'react'
import { ArrowUpRight, BookOpen, CheckCircle2, Clock3, Play, Sparkles, Target, TrendingUp } from 'lucide-react'

const skillGaps = [
  { name: 'Python', value: 82, tone: 'bg-emerald-500' },
  { name: 'SQL', value: 76, tone: 'bg-emerald-500' },
  { name: 'Statistics', value: 61, tone: 'bg-amber-400' },
  { name: 'Machine Learning', value: 42, tone: 'bg-rose-400' },
]

const learningPaths = [
  {
    id: 'machine-learning',
    title: 'Machine Learning Fundamentals',
    reason: 'Recommended because Machine Learning is currently your largest competency gap for your target role.',
    duration: '6 weeks · 12 modules',
    progress: 38,
    priority: 'High priority',
  },
  {
    id: 'statistics',
    title: 'Statistics for Data Analysis',
    reason: 'Build stronger statistical foundations to improve analysis quality and role readiness.',
    duration: '4 weeks · 8 modules',
    progress: 64,
    priority: 'Recommended',
  },
]

function LearningPathCard({ path }) {
  const [progress, setProgress] = useState(path.progress)
  const complete = progress >= 100

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-start gap-3"><span className={`rounded-xl p-2.5 ${path.id === 'machine-learning' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}><BookOpen size={18} /></span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-extrabold text-slate-950">{path.title}</h3><span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${path.id === 'machine-learning' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>{path.priority}</span></div><p className="mt-2 text-sm leading-6 text-slate-500">{path.reason}</p></div></div><ArrowUpRight size={18} className="shrink-0 text-slate-300" /></div>
      <div className="mt-5 rounded-xl bg-slate-50 p-4"><div className="flex items-center justify-between text-xs"><span className="font-bold text-slate-600">Learning progress</span><span className="font-extrabold text-emerald-600">{progress}%</span></div><div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} /></div><div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-slate-400"><span className="inline-flex items-center gap-1.5"><Clock3 size={13} />{path.duration}</span><span>{complete ? 'Completed' : `${100 - progress}% remaining`}</span></div></div>
      <button type="button" onClick={() => setProgress((current) => Math.min(current + 10, 100))} disabled={complete} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-default disabled:bg-emerald-100 disabled:text-emerald-700">{complete ? <CheckCircle2 size={16} /> : <Play size={16} />}{complete ? 'Learning complete' : progress > 0 ? 'Continue Learning' : 'Start Learning'}</button>
    </div>
  )
}

function EmployeeLearningPage() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">My Learning</p><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Rahul Sharma · EMP001</span></div><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">My Learning</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Personalized learning paths based on your competency gaps and target role.</p></div><div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" />Junior Data Analyst pathway</div></div></section>
      <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600"><TrendingUp size={18} /></span><span className="text-xs font-bold text-emerald-600">On track</span></div><p className="mt-4 text-2xl font-extrabold text-slate-950">51%</p><p className="mt-1 text-sm font-bold text-slate-700">Learning progress</p><p className="mt-1 text-xs text-slate-400">Across active paths</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-xl bg-rose-50 p-2.5 text-rose-600"><Target size={18} /></span><span className="text-xs font-bold text-rose-600">Needs focus</span></div><p className="mt-4 text-2xl font-extrabold text-slate-950">42</p><p className="mt-1 text-sm font-bold text-slate-700">Machine Learning</p><p className="mt-1 text-xs text-slate-400">Current proficiency</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center justify-between"><span className="rounded-xl bg-blue-50 p-2.5 text-blue-600"><BookOpen size={18} /></span><span className="text-xs font-bold text-slate-400">Personalized</span></div><p className="mt-4 text-2xl font-extrabold text-slate-950">2</p><p className="mt-1 text-sm font-bold text-slate-700">Active paths</p><p className="mt-1 text-xs text-slate-400">Matched to your target role</p></div></div>
      <div className="grid gap-6 xl:grid-cols-[.85fr_1.15fr]"><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">Current profile</p><h2 className="mt-1 text-lg font-extrabold text-slate-950">Skill gaps to close</h2></div><Sparkles size={18} className="text-emerald-500" /></div><div className="mt-6 space-y-4">{skillGaps.map((skill) => <div key={skill.name}><div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-bold text-slate-700">{skill.name}</span><span className={`font-extrabold ${skill.value >= 70 ? 'text-emerald-600' : skill.value >= 55 ? 'text-amber-600' : 'text-rose-600'}`}>{skill.value}</span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${skill.tone}`} style={{ width: `${skill.value}%` }} /></div></div>)}</div><div className="mt-6 rounded-xl border border-rose-100 bg-rose-50/60 p-3 text-xs font-semibold leading-5 text-rose-700">Machine Learning is currently your largest gap for the Junior Data Analyst target role.</div></section><section className="rounded-2xl bg-slate-900 p-5 text-white shadow-sm sm:p-6"><div className="flex items-center gap-2 text-emerald-300"><span className="rounded-lg bg-emerald-400/15 p-2"><Sparkles size={17} /></span><span className="text-[10px] font-bold uppercase tracking-[0.18em]">AI learning guidance</span></div><h2 className="mt-5 text-2xl font-extrabold tracking-tight">Build capability that unlocks your next opportunity.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Your recommendations are based on the skills that matter most for your target role and the evidence currently in your competency profile.</p><div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-400"><CheckCircle2 size={15} className="text-emerald-400" />Complete a path, then verify the new competency in SkillSetu.</div></section></div>
      <section><div className="mb-4 flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">AI recommendations</p><h2 className="mt-1 text-xl font-extrabold text-slate-950">Learning paths for Rahul</h2></div><span className="text-xs font-semibold text-slate-400">2 paths selected</span></div><div className="grid gap-4 xl:grid-cols-2">{learningPaths.map((path) => <LearningPathCard key={path.id} path={path} />)}</div></section>
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-800"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" /><p><span className="font-bold">Next step:</span> After completing a learning path, return to SkillSetu for competency verification.</p></div>
    </div>
  )
}

export default EmployeeLearningPage

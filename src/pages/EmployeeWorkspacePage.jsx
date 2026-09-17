import { useState } from 'react'
import { ArrowUpRight, BadgeCheck, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronRight, CircleAlert, Clock3, Play, Sparkles, Target, TrendingUp } from 'lucide-react'

const skillGaps = [
  { name: 'Python', value: 82, tone: 'bg-emerald-500' },
  { name: 'SQL', value: 76, tone: 'bg-emerald-500' },
  { name: 'Statistics', value: 61, tone: 'bg-amber-400' },
  { name: 'Machine Learning', value: 42, tone: 'bg-rose-400' },
]

const verificationItems = [
  { name: 'Python', detail: 'Technical assessment', verified: true },
  { name: 'SQL', detail: 'Project evidence', verified: true },
  { name: 'Data Visualization', detail: 'Manager validation', verified: true },
  { name: 'Statistics', detail: 'Peer review', verified: true },
  { name: 'Machine Learning', detail: 'Evidence required', verified: false },
]

function KpiCard({ icon: Icon, label, value, note, tone }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between"><span className={`rounded-xl p-2.5 ${tone}`}><Icon size={18} /></span><TrendingUp size={16} className="text-emerald-500" /></div>
      <p className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-bold text-slate-700">{label}</p>
      <p className="mt-1 text-xs text-slate-400">{note}</p>
    </div>
  )
}

function SkillGapCard() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">My competency profile</p><h2 className="mt-1 text-lg font-extrabold text-slate-950">Skill gap snapshot</h2><p className="mt-1 text-xs text-slate-500">Current proficiency against your role expectations.</p></div><span className="rounded-lg bg-slate-100 p-2 text-slate-500"><Target size={17} /></span></div>
      <div className="mt-6 space-y-4">{skillGaps.map((skill) => <div key={skill.name}><div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-bold text-slate-700">{skill.name}</span><span className={`font-extrabold ${skill.value >= 70 ? 'text-emerald-600' : skill.value >= 55 ? 'text-amber-600' : 'text-rose-600'}`}>{skill.value}</span></div><div className="h-2.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${skill.tone}`} style={{ width: `${skill.value}%` }} /></div></div>)}</div>
      <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500"><CircleAlert size={14} className="text-amber-500" />Machine Learning is your highest-priority growth area.</div>
    </section>
  )
}

function LearningCard() {
  const [started, setStarted] = useState(false)
  return (
    <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-sm sm:p-6"><div className="absolute -right-8 -top-8 size-32 rounded-full border-[18px] border-emerald-400/10" /><div className="relative"><div className="flex items-center gap-2 text-emerald-300"><span className="rounded-lg bg-emerald-400/15 p-2"><Sparkles size={17} /></span><span className="text-[10px] font-bold uppercase tracking-[0.18em]">AI recommended for you</span></div><h2 className="mt-5 max-w-sm text-2xl font-extrabold tracking-tight">Machine Learning Fundamentals</h2><p className="mt-3 max-w-md text-sm leading-6 text-slate-300">Recommended because Machine Learning is a current competency gap in your profile and is important for your next role progression.</p><div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={() => setStarted(true)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-400">{started ? <CheckCircle2 size={16} /> : <Play size={16} />}{started ? 'Learning started' : 'Start Learning'}</button><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400"><Clock3 size={14} />6 weeks · 12 modules</span></div>{started && <p className="mt-4 text-xs font-semibold text-emerald-300">Your learning path is ready. Keep building evidence as you progress.</p>}</div></section>
  )
}

function VerificationSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">Evidence layer</p><h2 className="mt-1 text-lg font-extrabold text-slate-950">Competency verification</h2><p className="mt-1 text-xs text-slate-500">Your verified skills carry more weight in project matching.</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">4 of 5 verified</span></div><div className="mt-5 grid gap-2 sm:grid-cols-2">{verificationItems.map((item) => <div key={item.name} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-3"><div className="flex min-w-0 items-center gap-2.5">{item.verified ? <BadgeCheck size={17} className="shrink-0 text-emerald-500" /> : <CircleAlert size={17} className="shrink-0 text-amber-500" />}<div className="min-w-0"><p className="text-sm font-bold text-slate-700">{item.name}</p><p className="truncate text-[11px] text-slate-400">{item.detail}</p></div></div><span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider ${item.verified ? 'text-emerald-600' : 'text-amber-600'}`}>{item.verified ? 'Verified' : 'Pending'}</span></div>)}</div></section>
  )
}

function RecommendedWork() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">Next opportunity</p><h2 className="mt-1 text-lg font-extrabold text-slate-950">Recommended work</h2><p className="mt-1 text-xs text-slate-500">Projects aligned to your current verified capabilities.</p></div><BriefcaseBusiness size={19} className="text-slate-400" /></div><div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 sm:p-5"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">86% match</span><span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Open for staffing</span></div><h3 className="mt-3 text-xl font-extrabold text-slate-950">Citizen Services Dashboard</h3><p className="mt-1 text-sm font-medium text-slate-500">National Digital Services Mission · 12 weeks</p></div><ArrowUpRight size={20} className="text-emerald-600" /></div><div className="mt-5 grid gap-4 border-t border-emerald-100 pt-4 sm:grid-cols-2"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Matched skills</p><div className="flex flex-wrap gap-1.5"><span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-emerald-700">✓ Python</span><span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-emerald-700">✓ SQL</span><span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-emerald-700">✓ Data Visualization</span></div></div><div><p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-amber-700">Growth skills</p><div className="flex flex-wrap gap-1.5"><span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-amber-700">! React</span><span className="rounded-md bg-white px-2 py-1 text-[11px] font-bold text-amber-700">! Accessibility</span></div></div></div><button type="button" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-800">View project fit <ChevronRight size={16} /></button></div></section>
  )
}

function EmployeeWorkspacePage() {
  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center"><div className="flex items-start gap-4"><div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-slate-900 text-lg font-black text-white">RS</div><div><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">Employee workspace</p><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">EMP001</span></div><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">My SkillSetu</h2><p className="mt-1 text-sm font-medium text-slate-500">Rahul Sharma <span className="mx-1 text-slate-300">/</span> Junior Data Analyst</p><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">Your personal view of capability, learning progress, verification evidence and work opportunities.</p></div></div><div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" />Profile synced</div></div></section>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><KpiCard icon={Target} label="Overall Competency" value="66%" note="Across your active profile" tone="bg-emerald-50 text-emerald-600" /><KpiCard icon={TrendingUp} label="Role Readiness" value="72%" note="Junior Data Analyst role" tone="bg-blue-50 text-blue-600" /><KpiCard icon={BadgeCheck} label="Verified Skills" value="4/5" note="Evidence-backed competencies" tone="bg-violet-50 text-violet-600" /><KpiCard icon={BookOpen} label="Active Learning" value="2" note="Recommended paths available" tone="bg-amber-50 text-amber-600" /></div>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]"><SkillGapCard /><LearningCard /></div>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]"><VerificationSection /><RecommendedWork /></div>
    </div>
  )
}

export default EmployeeWorkspacePage

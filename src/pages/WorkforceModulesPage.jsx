import { useState } from 'react'
import { ArrowUpRight, BookOpen, BrainCircuit, CheckCircle2, ChevronRight, GraduationCap, Play, RotateCcw, Sparkles, Target, TrendingUp, Users, WalletCards } from 'lucide-react'

const programs = [
  { name: 'Python Upskilling Program', skill: 'Python', cost: 120, gain: 28.4, verified: 4, learners: 5 },
  { name: 'Machine Learning Fundamentals', skill: 'Machine Learning', cost: 180, gain: 28.6, verified: 4, learners: 5 },
]

const people = [
  ['Rahul', 'Data Analyst', 72, 'Machine Learning'],
  ['Priya', 'ML Engineer', 84, 'MLOps'],
  ['Arjun', 'Software Engineer', 68, 'Python'],
  ['Sneha', 'Data Analyst', 76, 'Machine Learning'],
  ['Vikram', 'Full Stack Engineer', 81, 'Cloud'],
]

const meta = {
  Dashboard: ['WORKFORCE INTELLIGENCE', 'SkillSetu Dashboard', 'One view of competency, learning, verification, project matching and workforce impact.'],
  Learning: ['MODULE 2 â€¢ LEARNING INTELLIGENCE', 'AI Learning & Skill Gap', 'Turn verified competency gaps into targeted learning plans and measurable skill growth.'],
  Simulation: ['MODULE 5 â€¢ WORKFORCE PLANNING', 'Workforce What-If Simulator', 'Explore how upskilling and deployment scenarios change workforce readiness.'],
  Impact: ['MODULE 6 â€¢ TRAINING ANALYTICS', 'Training Impact & ROI', 'Track competency improvement, verification, training effectiveness and measurable return.'],
}

function Stat({ icon: Icon, label, value, note }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between"><span className="rounded-xl bg-slate-100 p-2.5 text-slate-700"><Icon size={19}/></span><TrendingUp size={17} className="text-emerald-500"/></div>
    <p className="mt-4 text-2xl font-extrabold text-slate-950">{value}</p>
    <p className="text-sm font-semibold text-slate-700">{label}</p>
    <p className="mt-1 text-xs text-slate-400">{note}</p>
  </div>
}

function Progress({ value }) {
  return <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{width: `${Math.min(100, value)}%`}}/></div>
}

function LearningModule() {
  const [selected, setSelected] = useState(0)
  const program = programs[selected]
  return <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-3">
      <Stat icon={Target} label="Employees with skill gaps" value="5" note="Identified from competency profiles"/>
      <Stat icon={BookOpen} label="Learning paths generated" value="10" note="Personalized demo recommendations"/>
      <Stat icon={CheckCircle2} label="Verified improvement" value="83%" note="Evidence-backed progress"/>
    </div>
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold">Recommended learning paths</h2>
        <p className="text-sm text-slate-500">Prioritized from competency gaps.</p>
        <div className="mt-5 space-y-3">{people.map((p,i)=>
          <button key={p[0]} onClick={()=>setSelected(i % programs.length)} className="flex w-full items-center gap-4 rounded-xl border border-slate-100 p-4 text-left hover:border-emerald-200 hover:bg-emerald-50/40">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">{p[0].slice(0,2)}</span>
            <span className="min-w-0 flex-1"><span className="block font-bold">{p[0]} â€¢ {p[1]}</span><span className="text-xs text-slate-500">Gap: <b>{p[3]}</b> â€¢ Readiness {p[2]}%</span><Progress value={p[2]}/></span>
            <ChevronRight size={17} className="text-slate-400"/>
          </button>
        )}</div>
      </section>
      <section className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">
        <div className="flex items-center gap-2 text-emerald-300"><BrainCircuit size={20}/><span className="text-xs font-bold uppercase tracking-widest">AI recommendation</span></div>
        <h2 className="mt-4 text-2xl font-extrabold">{program.name}</h2>
        <p className="mt-2 text-sm text-slate-300">Build {program.skill} capability, then return to SkillSetu for verification and competency-profile updates.</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">Average gain</p><p className="mt-1 text-lg font-bold">+{program.gain} pts</p></div>
          <div className="rounded-xl bg-white/10 p-3"><p className="text-xs text-slate-400">Cost / employee</p><p className="mt-1 text-lg font-bold">â‚¹{program.cost}</p></div>
        </div>
        <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-600"><Play size={16}/> Enroll in learning path</button>
      </section>
    </div>
  </div>
}

function SimulationModule() {
  const [training, setTraining] = useState(20)
  const [deployment, setDeployment] = useState(0)
  const baseline = 74
  const projected = Math.min(99, Math.round(baseline + training * .55 + deployment * .25))
  const capacity = Math.round(5 + training / 15 + deployment / 25)
  return <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-4">
      <Stat icon={Users} label="Employees evaluated" value="8" note="Live workforce model"/>
      <Stat icon={Target} label="Baseline readiness" value={`${baseline}%`} note="Current verified profile"/>
      <Stat icon={TrendingUp} label="Projected readiness" value={`${projected}%`} note="Scenario result"/>
      <Stat icon={CheckCircle2} label="Allocation capacity" value={capacity} note="Scenario-ready employees"/>
    </div>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3"><GraduationCap className="text-emerald-600"/><div><h2 className="text-lg font-extrabold">Scenario controls</h2><p className="text-sm text-slate-500">Move the sliders and see readiness update instantly.</p></div></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <label><div className="flex justify-between text-sm font-bold"><span>Upskilling intensity</span><span>{training}%</span></div><input className="mt-4 w-full accent-emerald-500" type="range" min="0" max="60" value={training} onChange={e=>setTraining(+e.target.value)}/><p className="mt-2 text-xs text-slate-400">Targeted learning completion.</p></label>
        <label><div className="flex justify-between text-sm font-bold"><span>Deployment optimization</span><span>{deployment}%</span></div><input className="mt-4 w-full accent-emerald-500" type="range" min="0" max="80" value={deployment} onChange={e=>setDeployment(+e.target.value)}/><p className="mt-2 text-xs text-slate-400">Better project-to-person allocation.</p></label>
      </div>
      <div className="mt-8 rounded-2xl bg-slate-50 p-5"><div className="flex items-center justify-between"><span className="font-bold">Projected workforce readiness</span><span className="text-2xl font-extrabold text-emerald-600">{projected}%</span></div><Progress value={projected}/><div className="mt-4 flex justify-between text-xs text-slate-500"><span>Baseline {baseline}%</span><span>Scenario uplift +{projected-baseline} pts</span></div></div>
      <button onClick={()=>{setTraining(20);setDeployment(0)}} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-600"><RotateCcw size={15}/> Reset scenario</button>
    </section>
  </div>
}

function ImpactModule() {
  return <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-4">
      <Stat icon={TrendingUp} label="Avg. competency gain" value="+28.5 pts" note="Across demo programs"/>
      <Stat icon={CheckCircle2} label="Verified outcomes" value="83%" note="Evidence-backed outcomes"/>
      <Stat icon={WalletCards} label="Training investment" value="â‚¹1,500" note="Current demo cohort"/>
      <Stat icon={ArrowUpRight} label="Impact index" value="78 / 100" note="Weighted outcome signal"/>
    </div>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold">Training effectiveness & ROI</h2><p className="text-sm text-slate-500">Demo calculations from the project training dataset.</p>
      <div className="mt-5 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400"><th className="pb-3">Program</th><th className="pb-3">Learners</th><th className="pb-3">Avg gain</th><th className="pb-3">Verified</th><th className="pb-3">Impact</th></tr></thead><tbody>{programs.map(p=><tr key={p.name} className="border-b border-slate-50"><td className="py-4 font-bold">{p.name}</td><td>{p.learners}</td><td>+{p.gain} pts</td><td>{p.verified}/{p.learners}</td><td><span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-700">{Math.round(p.gain*3)}</span></td></tr>)}</tbody></table></div>
    </section>
  </div>
}

function DashboardModule() {
  return <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-4">
      <Stat icon={Users} label="Workforce profiles" value="8" note="Connected employee records"/>
      <Stat icon={CheckCircle2} label="Verified competency" value="83%" note="Evidence-backed skills"/>
      <Stat icon={Target} label="Project matches" value="100%" note="Top match for active project"/>
      <Stat icon={TrendingUp} label="Readiness index" value="86 / 100" note="Current workforce signal"/>
    </div>
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-extrabold">Integrated SkillSetu modules</h2><p className="mt-1 text-sm text-slate-500">Competency, learning, verification, projects, simulation and impact now sit in one workspace.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">{['Competency Digital Twin','AI Learning & Skill Gap','Competency Verification','Project Matching','Workforce What-If Simulator','Training Impact & ROI'].map(x=><div key={x} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"><CheckCircle2 size={18} className="text-emerald-500"/><span className="font-bold">{x}</span></div>)}</div>
    </section>
  </div>
}

export default function WorkforceModulesPage({ type = 'Dashboard' }) {
  const [eyebrow, title, description] = meta[type] || meta.Dashboard
  let body = <DashboardModule/>
  if (type === 'Learning') body = <LearningModule/>
  if (type === 'Simulation') body = <SimulationModule/>
  if (type === 'Impact') body = <ImpactModule/>
  return <div className="space-y-7">
    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700"><Sparkles size={13}/>{eyebrow}</span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-3 text-base leading-7 text-slate-500">{description}</p>
        </div>
        <div className="rounded-2xl bg-slate-900 px-5 py-4 text-white"><p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Data layer</p><p className="mt-1 font-bold">Demo / Mock â€¢ Live UI</p></div>
      </div>
    </section>
    {body}
  </div>
}

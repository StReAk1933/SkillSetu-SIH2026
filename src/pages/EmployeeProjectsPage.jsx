import { useState } from 'react'
import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, CheckCircle2, ChevronRight, Clock3, MapPin, Send, Target } from 'lucide-react'

const opportunities = [
  {
    id: 'citizen-services',
    name: 'Citizen Services Dashboard',
    organization: 'National Digital Services Mission',
    match: 78,
    duration: '12 weeks',
    status: 'Recommended',
    availability: 'Open for staffing',
    matched: ['Python', 'SQL', 'Data Visualization'],
    gaps: ['React', 'JavaScript'],
  },
  {
    id: 'district-health',
    name: 'District Health Analytics',
    organization: 'Ministry of Health Programme Office',
    match: 71,
    duration: '16 weeks',
    status: 'Recommended',
    availability: 'Open for staffing',
    matched: ['Python', 'SQL'],
    gaps: ['Azure', 'Statistics'],
  },
]

function OpportunityCard({ opportunity, onView, onInterest, interested, selected }) {
  return (
    <article className={`rounded-2xl border bg-white p-5 shadow-sm transition sm:p-6 ${selected ? 'border-emerald-300 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-emerald-200 hover:shadow-md'}`}>
      <div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">{opportunity.match}% match</span><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">{opportunity.status}</span></div><h3 className="mt-4 text-xl font-extrabold tracking-tight text-slate-950">{opportunity.name}</h3><p className="mt-1 text-sm font-medium text-slate-500">{opportunity.organization}</p></div><span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600"><BriefcaseBusiness size={19} /></span></div>
      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500"><span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{opportunity.duration}</span><span className="inline-flex items-center gap-1.5"><MapPin size={14} />Public sector mission</span><span className="inline-flex items-center gap-1.5 text-emerald-700"><span className="size-1.5 rounded-full bg-emerald-500" />{opportunity.availability}</span></div>
      <div className="mt-5 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2"><div><p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700"><BadgeCheck size={13} />Matched verified skills</p><div className="flex flex-wrap gap-1.5">{opportunity.matched.map((skill) => <span key={skill} className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">✓ {skill}</span>)}</div></div><div><p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700"><Target size={13} />Skills to build</p><div className="flex flex-wrap gap-1.5">{opportunity.gaps.map((skill) => <span key={skill} className="rounded-md bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700">! {skill}</span>)}</div></div></div>
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4"><button type="button" onClick={() => onView(opportunity.id)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700">View Opportunity <ArrowUpRight size={15} /></button><button type="button" onClick={() => onInterest(opportunity.id)} className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold transition ${interested ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}><Send size={15} />{interested ? 'Interest Expressed' : 'Express Interest'}</button></div>{selected && <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"><ChevronRight size={14} className="text-emerald-500" />Your verified profile is being compared against this opportunity.</div>}
    </article>
  )
}

function EmployeeProjectsPage() {
  const [selectedId, setSelectedId] = useState(null)
  const [interestedIds, setInterestedIds] = useState([])

  const expressInterest = (opportunityId) => {
    setInterestedIds((current) => current.includes(opportunityId) ? current : [...current, opportunityId])
  }

  return (
    <div className="mx-auto max-w-[1500px] space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">My Work Opportunities</p><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">Rahul Sharma · EMP001</span></div><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">My Work Opportunities</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Discover projects that match your verified skills and current readiness.</p></div><div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" />2 opportunities found</div></div></section>
      <div className="grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Best match</p><p className="mt-2 text-2xl font-extrabold text-slate-950">78%</p><p className="mt-1 text-xs font-semibold text-slate-500">Citizen Services Dashboard</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified fit</p><p className="mt-2 text-2xl font-extrabold text-slate-950">3 skills</p><p className="mt-1 text-xs font-semibold text-slate-500">Ready to contribute now</p></div><div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Your interest</p><p className="mt-2 text-2xl font-extrabold text-slate-950">{interestedIds.length}</p><p className="mt-1 text-xs font-semibold text-slate-500">Opportunity selected</p></div></div>
      <section><div className="mb-4 flex items-end justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">Personalized for you</p><h2 className="mt-1 text-xl font-extrabold text-slate-950">Recommended opportunities</h2><p className="mt-1 text-xs text-slate-500">Only your fit, verified skills and growth areas are shown.</p></div><span className="text-xs font-semibold text-slate-400">Sorted by match</span></div><div className="grid gap-4 xl:grid-cols-2">{opportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} selected={selectedId === opportunity.id} interested={interestedIds.includes(opportunity.id)} onView={setSelectedId} onInterest={expressInterest} />)}</div></section>
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-800"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" /><p><span className="font-bold">How matching works:</span> opportunities are recommended from your verified competencies, current readiness and the skills needed for each project.</p></div>
    </div>
  )
}

export default EmployeeProjectsPage

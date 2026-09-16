import { AlertTriangle, CalendarDays, CheckCircle2, Flag, Layers3, Users } from 'lucide-react'
import { skillCatalog } from '../../data/projects'

const priorityStyles = {
  High: 'bg-rose-50 text-rose-700 ring-rose-100',
  Medium: 'bg-amber-50 text-amber-700 ring-amber-100',
  Low: 'bg-slate-100 text-slate-600 ring-slate-200',
}

function ProjectRequirements({ project }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1 ${priorityStyles[project.priority]}`}>{project.priority} priority</span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">{project.status}</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{project.name}</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">{project.client} <span className="mx-1 text-slate-300">/</span> {project.department}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:min-w-56">
          <div className="rounded-xl bg-slate-50 p-3"><CalendarDays size={16} className="text-slate-400" /><p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Timeline</p><p className="mt-0.5 text-sm font-bold text-slate-700">{project.timeline}</p></div>
          <div className="rounded-xl bg-slate-50 p-3"><Users size={16} className="text-slate-400" /><p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Open roles</p><p className="mt-0.5 text-sm font-bold text-slate-700">{project.requiredSkills.length} skills</p></div>
        </div>
      </div>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">{project.description}</p>
      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Layers3 size={16} className="text-emerald-600" />Required competency profile</h3>
          <span className="text-xs font-medium text-slate-400">{project.requiredSkills.length} requirements</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {project.requiredSkills.map((skill) => (
            <div key={skill.skillId} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">{skillCatalog[skill.skillId]}</p>
                {skill.critical ? <span title="Critical skill"><AlertTriangle size={14} className="shrink-0 text-amber-500" /></span> : <CheckCircle2 size={14} className="shrink-0 text-slate-300" />}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-500"><span>Required proficiency</span><span className="text-slate-800">Level {skill.requiredLevel}/5</span></div>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => <span key={level} className={`h-1.5 flex-1 rounded-full ${level <= skill.requiredLevel ? 'bg-emerald-500' : 'bg-slate-200'}`} />)}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400"><Flag size={11} />{Math.round(skill.weight * 100)}% weight</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectRequirements

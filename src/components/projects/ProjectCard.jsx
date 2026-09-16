import { ArrowUpRight, CalendarDays, CircleDot, Users } from 'lucide-react'

const priorityStyles = {
  High: 'bg-rose-50 text-rose-700',
  Medium: 'bg-amber-50 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
}

function ProjectCard({ project, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-emerald-400 bg-emerald-50/60 shadow-sm' : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${priorityStyles[project.priority]}`}>{project.priority} priority</span>
        <ArrowUpRight size={17} className={selected ? 'text-emerald-600' : 'text-slate-300'} />
      </div>
      <h3 className="mt-4 text-sm font-bold leading-5 text-slate-900">{project.name}</h3>
      <p className="mt-1 text-xs font-medium text-slate-500">{project.client}</p>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} />{project.timeline}</span>
        <span className="inline-flex items-center gap-1.5"><Users size={13} />{project.requiredSkills.length} skill areas</span>
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
        <CircleDot size={13} className={project.status === 'Planning' ? 'text-amber-500' : 'text-emerald-500'} />
        {project.status}
      </div>
    </button>
  )
}

export default ProjectCard

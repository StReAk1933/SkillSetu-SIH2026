import { ArrowUpRight, CalendarDays, CircleDot, Users } from 'lucide-react'

const priorityStyles = {
  High: { background: '#FFF1F2', color: '#9F1239' },
  Medium: { background: 'var(--color-accent-amber-bg)', color: '#92400E' },
  Low: { background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' },
}

function ProjectCard({ project, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project.id)}
      className="w-full rounded-2xl p-4 text-left transition hover:-translate-y-0.5"
      style={
        selected
          ? {
              border: '1px solid var(--color-primary)',
              background: 'var(--color-primary-bg)',
              boxShadow: '0 0 0 3px var(--color-primary-muted)',
            }
          : {
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-card)',
            }
      }
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,184,122,0.12)'
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={priorityStyles[project.priority]}
        >
          {project.priority} priority
        </span>
        <ArrowUpRight
          size={17}
          style={{ color: selected ? 'var(--color-primary)' : 'var(--color-border)' }}
        />
      </div>
      <h3 className="mt-4 text-sm font-bold leading-5" style={{ color: 'var(--color-text)' }}>
        {project.name}
      </h3>
      <p className="mt-1 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
        {project.client}
      </p>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays size={13} />
          {project.timeline}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users size={13} />
          {project.requiredSkills.length} skill areas
        </span>
      </div>
      <div
        className="mt-4 flex items-center gap-2 pt-3 text-xs font-semibold"
        style={{ borderTop: '1px solid var(--color-border-light)', color: 'var(--color-text-muted)' }}
      >
        <CircleDot
          size={13}
          style={{ color: project.status === 'Planning' ? 'var(--color-accent-amber)' : 'var(--color-primary)' }}
        />
        {project.status}
      </div>
    </button>
  )
}

export default ProjectCard

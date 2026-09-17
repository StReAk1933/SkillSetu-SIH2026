import { AlertTriangle, CalendarDays, CheckCircle2, Flag, Layers3, Users } from 'lucide-react'
import { skillCatalog } from '../../data/projects'

const priorityStyles = {
  High: { background: '#FFF1F2', color: '#9F1239', ring: '#FECDD3' },
  Medium: { background: 'var(--color-accent-amber-bg)', color: '#92400E', ring: '#FDE68A' },
  Low: { background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)', ring: 'var(--color-border)' },
}

function ProjectRequirements({ project }) {
  const ps = priorityStyles[project.priority]
  return (
    <section
      className="rounded-2xl p-5 shadow-sm sm:p-6"
      style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}
    >
      {/* ── Header ──────────────────────────────── */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1"
              style={{ ...ps, ringColor: ps.ring }}
            >
              {project.priority} priority
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)' }}
            >
              {project.status}
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight" style={{ color: 'var(--color-dark)' }}>
            {project.name}
          </h2>
          <p className="mt-1 text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            {project.client}{' '}
            <span className="mx-1" style={{ color: 'var(--color-border)' }}>
              /
            </span>{' '}
            {project.department}
          </p>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-2 sm:min-w-56">
          <div className="rounded-xl p-3" style={{ background: 'var(--color-bg)' }}>
            <CalendarDays size={16} style={{ color: 'var(--color-text-subtle)' }} />
            <p
              className="mt-2 text-[10px] font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Timeline
            </p>
            <p className="mt-0.5 text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {project.timeline}
            </p>
          </div>
          <div className="rounded-xl p-3" style={{ background: 'var(--color-bg)' }}>
            <Users size={16} style={{ color: 'var(--color-text-subtle)' }} />
            <p
              className="mt-2 text-[10px] font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Open roles
            </p>
            <p className="mt-0.5 text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {project.requiredSkills.length} skills
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-6" style={{ color: 'var(--color-text-muted)' }}>
        {project.description}
      </p>

      {/* ── Required competency profile ─────────── */}
      <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--color-border-light)' }}>
        <div className="mb-3 flex items-center justify-between">
          <h3
            className="flex items-center gap-2 text-sm font-bold"
            style={{ color: 'var(--color-text)' }}
          >
            <Layers3 size={16} style={{ color: 'var(--color-primary)' }} />
            Required competency profile
          </h3>
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-subtle)' }}>
            {project.requiredSkills.length} requirements
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {project.requiredSkills.map((skill) => (
            <div
              key={skill.skillId}
              className="rounded-xl p-3"
              style={{ border: '1px solid var(--color-border-light)', background: 'var(--color-bg)' }}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  {skillCatalog[skill.skillId]}
                </p>
                {skill.critical ? (
                  <span title="Critical skill">
                    <AlertTriangle size={14} className="shrink-0" style={{ color: 'var(--color-accent-amber)' }} />
                  </span>
                ) : (
                  <CheckCircle2 size={14} className="shrink-0" style={{ color: 'var(--color-border)' }} />
                )}
              </div>
              <div
                className="mt-3 flex items-center justify-between text-[11px] font-semibold"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span>Required proficiency</span>
                <span style={{ color: 'var(--color-text)' }}>Level {skill.requiredLevel}/5</span>
              </div>
              {/* Level indicator */}
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <span
                    key={level}
                    className="h-1.5 flex-1 rounded-full transition-all"
                    style={{
                      background:
                        level <= skill.requiredLevel ? 'var(--color-primary)' : 'var(--color-border)',
                    }}
                  />
                ))}
              </div>
              <div
                className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-text-subtle)' }}
              >
                <Flag size={11} />
                {Math.round(skill.weight * 100)}% weight
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectRequirements

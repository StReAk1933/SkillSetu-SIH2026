import { Award, CheckCircle2, Users, Zap } from 'lucide-react'

function MatchSummary({ matches, project }) {
  const topMatch = matches[0]
  const verifiedCount = topMatch?.verifiedSkills.length ?? 0

  const cards = [
    {
      icon: Zap,
      iconBg: 'var(--color-primary-bg)',
      iconColor: 'var(--color-primary)',
      badge: 'Live calculation',
      badgeColor: 'var(--color-primary)',
      value: matches.length,
      label: 'Employees evaluated',
    },
    {
      icon: Award,
      iconBg: 'var(--color-secondary-bg)',
      iconColor: 'var(--color-secondary)',
      badge: 'Top result',
      badgeColor: 'var(--color-text-subtle)',
      value: `${topMatch?.finalScore ?? 0}%`,
      label: `${topMatch?.employee.name ?? 'No match'} for ${project.name}`,
      truncate: true,
    },
    {
      icon: CheckCircle2,
      iconBg: 'rgba(6,182,212,0.1)',
      iconColor: 'var(--color-accent-cyan)',
      badge: 'Verified skills',
      badgeColor: 'var(--color-text-subtle)',
      value: `${verifiedCount}/${project.requiredSkills.length}`,
      label: 'Required skills verified',
    },
    {
      icon: Users,
      iconBg: 'var(--color-accent-amber-bg)',
      iconColor: 'var(--color-accent-amber)',
      badge: 'Capacity signal',
      badgeColor: 'var(--color-text-subtle)',
      value: matches.filter((match) => match.employee.availability === 'available').length,
      label: 'Ready for allocation',
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ icon: Icon, iconBg, iconColor, badge, badgeColor, value, label, truncate }) => (
        <div
          key={label}
          className="rounded-2xl p-4 shadow-sm"
          style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-lg p-2" style={{ background: iconBg, color: iconColor }}>
              <Icon size={17} />
            </span>
            <span className="text-xs font-semibold" style={{ color: badgeColor }}>
              {badge}
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>
            {value}
          </p>
          <p
            className={`text-xs font-medium ${truncate ? 'truncate' : ''}`}
            style={{ color: 'var(--color-text-muted)' }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default MatchSummary

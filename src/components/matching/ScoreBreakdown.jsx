import { BarChart3, CheckCircle2, Clock3 } from 'lucide-react'

function ScoreBreakdown({ match }) {
  const items = [
    {
      label: 'Skill coverage',
      value: match.scoreBreakdown.skillCoverage,
      detail: '75% weighting',
      color: 'var(--color-primary)',
      icon: BarChart3,
    },
    {
      label: 'Verified evidence',
      value: match.scoreBreakdown.verification,
      detail: '15% weighting',
      color: 'var(--color-secondary)',
      icon: CheckCircle2,
    },
    {
      label: 'Availability',
      value: match.scoreBreakdown.availability,
      detail: '10% weighting',
      color: 'var(--color-accent-amber)',
      icon: Clock3,
    },
  ]

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 size={16} style={{ color: 'var(--color-primary)' }} />
        <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
          Score breakdown
        </h3>
      </div>
      <div className="space-y-4">
        {items.map(({ label, value, detail, color, icon: Icon }) => (
          <div key={label}>
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span
                className="flex items-center gap-2 font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                <Icon size={14} style={{ color: 'var(--color-text-subtle)' }} />
                {label}
              </span>
              <span className="font-bold" style={{ color: 'var(--color-text)' }}>
                {value}{' '}
                <span className="font-medium" style={{ color: 'var(--color-text-subtle)' }}>
                  / {detail}
                </span>
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full"
              style={{ background: 'var(--color-bg-subtle)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(Math.min(value, 75) / 75) * 100}%`,
                  background: color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScoreBreakdown

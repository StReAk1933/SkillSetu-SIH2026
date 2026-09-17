import { AlertTriangle, ArrowUpRight, BadgeCheck, Briefcase, CircleDashed, MapPin, UserRound } from 'lucide-react'
import VerificationBadge from './VerificationBadge'
import { skillCatalog } from '../../data/projects'

const availabilityStyles = {
  available: { background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)' },
  'partially available': { background: 'var(--color-accent-amber-bg)', color: '#92400E' },
  unavailable: { background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' },
}

function EmployeeMatchCard({ match, rank, onSelect }) {
  const { employee } = match
  return (
    <button
      type="button"
      onClick={() => onSelect(match)}
      className="group w-full rounded-2xl p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:p-5"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-bg-card)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
    >
      {/* ── Header row ──────────────────────────── */}
      <div
        className="flex items-start gap-3 pb-4"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        {/* Avatar + rank badge */}
        <div
          className="relative grid size-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
          style={{ background: 'var(--color-dark)' }}
        >
          <span>{employee.name.split(' ').map((part) => part[0]).join('')}</span>
          <span
            className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full border-2 border-white text-[9px]"
            style={{ background: 'var(--color-primary)' }}
          >
            {rank}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
                {employee.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                {employee.role}
              </p>
            </div>
            <ArrowUpRight
              size={17}
              className="transition"
              style={{ color: 'var(--color-border)' }}
            />
          </div>
          <div
            className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px]"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            <span className="inline-flex items-center gap-1"><MapPin size={12} />{employee.location}</span>
            <span className="inline-flex items-center gap-1"><Briefcase size={12} />{employee.department}</span>
          </div>
        </div>
      </div>

      {/* ── Score row ───────────────────────────── */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--color-text-subtle)' }}>
            Match score
          </p>
          <p className="mt-0.5 text-5xl font-black leading-none tracking-[-0.06em]" style={{ color: 'var(--color-dark)' }}>
            {match.finalScore}
            <span className="text-2xl font-bold tracking-normal" style={{ color: 'var(--color-primary)' }}>
              %
            </span>
          </p>
          <p className="mt-2 text-[11px] font-semibold" style={{ color: 'var(--color-text-muted)' }}>
            {match.finalScore >= 80
              ? 'Excellent skill alignment'
              : match.finalScore >= 60
              ? 'Strong potential match'
              : 'Capability gaps to review'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold capitalize"
            style={availabilityStyles[employee.availability]}
          >
            {employee.availability}
          </span>
          <span className="text-[11px] font-semibold" style={{ color: 'var(--color-text-subtle)' }}>
            {match.matchedSkills.length}/{match.skillResults.length} requirements met
          </span>
        </div>
      </div>

      {/* ── Skill chips ─────────────────────────── */}
      <div
        className="mt-5 grid gap-3 pt-4 sm:grid-cols-3"
        style={{ borderTop: '1px solid var(--color-border-light)' }}
      >
        {/* Matched */}
        <div className="rounded-xl p-3" style={{ background: 'var(--color-primary-bg)' }}>
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary-dark)' }}>
            <BadgeCheck size={13} />Matched
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {match.matchedSkills.length > 0
              ? match.matchedSkills.slice(0, 3).map((skill) => (
                  <span
                    key={skill.skillId}
                    className="rounded-md px-2 py-1 text-[10px] font-semibold shadow-sm"
                    style={{ background: 'var(--color-bg-card)', color: 'var(--color-primary-dark)' }}
                  >
                    {skillCatalog[skill.skillId]}
                  </span>
                ))
              : <span className="text-[10px]" style={{ color: 'var(--color-primary-dark)', opacity: 0.7 }}>None at target</span>}
          </div>
        </div>

        {/* Weak */}
        <div className="rounded-xl p-3" style={{ background: 'var(--color-accent-amber-bg)' }}>
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#92400E' }}>
            <AlertTriangle size={13} />Weak
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {match.weakSkills.length > 0
              ? match.weakSkills.slice(0, 2).map((skill) => (
                  <span
                    key={skill.skillId}
                    className="rounded-md px-2 py-1 text-[10px] font-semibold shadow-sm"
                    style={{ background: 'var(--color-bg-card)', color: '#92400E' }}
                  >
                    {skillCatalog[skill.skillId]}
                  </span>
                ))
              : <span className="text-[10px]" style={{ color: '#92400E', opacity: 0.7 }}>None identified</span>}
          </div>
        </div>

        {/* Missing */}
        <div className="rounded-xl p-3" style={{ background: '#FFF1F2' }}>
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#9F1239' }}>
            <CircleDashed size={13} />Missing
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {match.missingSkills.length > 0
              ? match.missingSkills.slice(0, 2).map((skill) => (
                  <span
                    key={skill.skillId}
                    className="rounded-md px-2 py-1 text-[10px] font-semibold shadow-sm"
                    style={{ background: 'var(--color-bg-card)', color: '#9F1239' }}
                  >
                    {skillCatalog[skill.skillId]}
                  </span>
                ))
              : <span className="text-[10px]" style={{ color: '#9F1239', opacity: 0.7 }}>None identified</span>}
          </div>
        </div>
      </div>

      {/* ── Footer row ──────────────────────────── */}
      <div
        className="mt-4 flex items-center justify-between pt-3"
        style={{ borderTop: '1px solid var(--color-border-light)' }}
      >
        <VerificationBadge verified={match.verifiedSkills.length === match.skillResults.length} compact />
        <span
          className="inline-flex items-center gap-1 text-[11px] font-bold"
          style={{ color: 'var(--color-primary-dark)' }}
        >
          View rationale <UserRound size={13} />
        </span>
      </div>
    </button>
  )
}

export default EmployeeMatchCard

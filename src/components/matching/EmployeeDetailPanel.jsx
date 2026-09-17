import { AlertTriangle, Briefcase, CheckCircle2, MapPin, ShieldCheck, X } from 'lucide-react'
import { skillCatalog } from '../../data/projects'
import SkillComparison from './SkillComparison'
import ScoreBreakdown from './ScoreBreakdown'
import VerificationBadge from './VerificationBadge'

function EmployeeDetailPanel({ match, project, onClose }) {
  if (!match) return null

  const { employee } = match
  const initials = employee.name.split(' ').map((part) => part[0]).join('')
  const displayReason = (reason) =>
    reason.replace(
      /react|javascript|dataVisualization|node|apiDesign|cyberSecurity|projectManagement|accessibility|python|sql|azure/g,
      (skillId) => skillCatalog[skillId],
    )

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <button
        aria-label="Close employee details"
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-[3px]"
        style={{ background: 'rgba(15,23,42,0.5)' }}
      />

      {/* Panel */}
      <aside
        className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-y-auto shadow-2xl"
        style={{ background: 'var(--color-bg)' }}
      >
        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 backdrop-blur sm:px-7"
          style={{
            borderBottom: '1px solid var(--color-border)',
            background: 'rgba(255,255,255,0.95)',
          }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--color-primary)' }}>
              Match rationale
            </p>
            <p className="mt-1 text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {project.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition"
            style={{ color: 'var(--color-text-subtle)' }}
            aria-label="Close details"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg)'
              e.currentTarget.style.color = 'var(--color-text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-text-subtle)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          {/* ── Employee profile card ────────────── */}
          <section
            className="rounded-2xl p-5 shadow-sm sm:p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}
          >
            <div className="flex items-start gap-4">
              <div
                className="grid size-16 shrink-0 place-items-center rounded-2xl text-xl font-bold text-white"
                style={{ background: 'var(--color-dark)' }}
              >
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--color-dark)' }}>
                    {employee.name}
                  </h2>
                  <VerificationBadge verified={match.verifiedSkills.length === match.skillResults.length} />
                </div>
                <p className="mt-1 text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  {employee.role}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="inline-flex items-center gap-1"><MapPin size={13} />{employee.location}</span>
                  <span className="inline-flex items-center gap-1"><Briefcase size={13} />{employee.department}</span>
                </div>
              </div>
            </div>

            {/* Score banner */}
            <div
              className="mt-5 flex items-end justify-between rounded-2xl p-5 text-white sm:p-6"
              style={{ background: 'var(--color-dark)' }}
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: '#94A3B8' }}>
                  Overall match score
                </p>
                <p className="mt-2 text-6xl font-black leading-none tracking-[-0.07em] text-white">
                  {match.finalScore}
                  <span className="text-3xl font-bold tracking-normal" style={{ color: 'var(--color-primary-light)' }}>
                    %
                  </span>
                </p>
                <p className="mt-3 text-xs font-semibold" style={{ color: 'var(--color-primary-light)' }}>
                  {match.finalScore >= 80
                    ? 'Excellent skill alignment'
                    : match.finalScore >= 60
                    ? 'Strong potential match'
                    : 'Capability gaps to review'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold capitalize" style={{ color: 'var(--color-primary-light)' }}>
                  {employee.availability}
                </p>
                <p className="mt-2 text-[11px]" style={{ color: '#94A3B8' }}>
                  {match.matchedSkills.length}/{match.skillResults.length} requirements met
                </p>
              </div>
            </div>
          </section>

          {/* ── Skill comparison ─────────────────── */}
          <section
            className="rounded-2xl p-5 shadow-sm sm:p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--color-primary)' }}>
                  Requirement fit
                </p>
                <h3 className="mt-1 text-base font-bold" style={{ color: 'var(--color-text)' }}>
                  Employee vs project skills
                </h3>
              </div>
              <span
                className="rounded-lg px-2.5 py-1 text-[11px] font-bold"
                style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' }}
              >
                Level 1-5
              </span>
            </div>
            <SkillComparison match={match} />
          </section>

          {/* ── Score breakdown ──────────────────── */}
          <section
            className="rounded-2xl p-5 shadow-sm sm:p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}
          >
            <ScoreBreakdown match={match} />
          </section>

          {/* ── Explainable decision ─────────────── */}
          <section
            className="rounded-2xl p-5 sm:p-6"
            style={{ border: '1px solid var(--color-primary-muted)', background: 'var(--color-primary-bg)' }}
          >
            <div className="mb-4 flex items-center gap-2">
              <span
                className="grid size-8 place-items-center rounded-lg text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                <ShieldCheck size={16} />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--color-primary-dark)' }}>
                  Explainable decision
                </p>
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  Why this employee matches
                </h3>
              </div>
            </div>
            <div className="space-y-2">
              {match.explanation.map((reason) => (
                <div key={reason} className="flex gap-2 text-sm leading-5" style={{ color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--color-primary)' }} />
                  {displayReason(reason)}
                </div>
              ))}
            </div>
          </section>

          {/* ── Matched / Weak & Missing ─────────── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Matched skills */}
            <section className="rounded-2xl p-5" style={{ border: '1px solid var(--color-primary-muted)', background: 'var(--color-primary-bg)' }}>
              <h3
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-primary-dark)' }}
              >
                <CheckCircle2 size={14} />Matched skills
              </h3>
              <div className="mt-4 space-y-2">
                {match.matchedSkills.map((skill) => (
                  <div
                    key={skill.skillId}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm"
                    style={{ background: 'rgba(255,255,255,0.8)' }}
                  >
                    <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                      {skillCatalog[skill.skillId]}
                    </span>
                    <span className="font-bold" style={{ color: 'var(--color-primary-dark)' }}>
                      L{skill.employeeLevel}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Weak & missing */}
            <section className="rounded-2xl p-5" style={{ border: '1px solid #FDE68A', background: 'var(--color-accent-amber-bg)' }}>
              <h3
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                style={{ color: '#92400E' }}
              >
                <AlertTriangle size={14} />Weak and missing
              </h3>
              <div className="mt-4 space-y-2">
                {[...match.weakSkills, ...match.missingSkills].length > 0
                  ? [...match.weakSkills, ...match.missingSkills].map((skill) => (
                      <div
                        key={skill.skillId}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm"
                        style={{ background: 'rgba(255,255,255,0.8)' }}
                      >
                        <span className="font-medium" style={{ color: 'var(--color-text)' }}>
                          {skillCatalog[skill.skillId]}
                        </span>
                        <span className="font-bold" style={{ color: '#92400E' }}>
                          {skill.employeeLevel ? `L${skill.employeeLevel}` : 'Missing'}
                        </span>
                      </div>
                    ))
                  : <p className="text-sm" style={{ color: '#92400E' }}>No skill gaps identified.</p>}
              </div>
            </section>
          </div>

          {/* ── Verification evidence ────────────── */}
          <section
            className="rounded-2xl p-5 shadow-sm sm:p-6"
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-bg-card)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  Verification evidence
                </h3>
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Competencies with supporting evidence
                </p>
              </div>
              <span
                className="rounded-full px-2.5 py-1 text-xs font-bold"
                style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)' }}
              >
                {match.verifiedSkills.length} verified
              </span>
            </div>
            <div className="mt-4 grid gap-2">
              {match.verifiedSkills.map((skill) => (
                <div
                  key={skill.skillId}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-xs"
                  style={{ background: 'var(--color-bg)' }}
                >
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                    {skillCatalog[skill.skillId]}
                  </span>
                  <span className="text-right" style={{ color: 'var(--color-text-muted)' }}>
                    {skill.verificationType}{' '}
                    <span style={{ color: 'var(--color-border)' }}>/</span>{' '}
                    {skill.lastVerified}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  )
}

export default EmployeeDetailPanel

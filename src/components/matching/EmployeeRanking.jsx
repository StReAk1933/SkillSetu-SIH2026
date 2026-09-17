import { SlidersHorizontal, UsersRound } from 'lucide-react'
import EmployeeMatchCard from './EmployeeMatchCard'

function EmployeeRanking({ matches, onSelect }) {
  return (
    <section
      className="rounded-2xl p-4 sm:p-5"
      style={{
        border: '1px solid var(--color-primary-muted)',
        background: 'rgba(0,184,122,0.03)',
      }}
    >
      {/* ── Section header ────────────────────── */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="grid size-8 place-items-center rounded-lg text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              <UsersRound size={17} />
            </span>
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: 'var(--color-primary)' }}
              >
                Decision support
              </p>
              <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                Ranked talent pool
              </h2>
            </div>
          </div>
          <p className="mt-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Sorted by explainable suitability score
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="hidden rounded-full px-3 py-1.5 text-xs font-bold shadow-sm sm:inline-flex"
            style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
          >
            {matches.length} candidates
          </span>
          <button
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold sm:flex"
            style={{
              border: '1px solid var(--color-primary-muted)',
              background: 'var(--color-bg-card)',
              color: 'var(--color-text-muted)',
            }}
          >
            <SlidersHorizontal size={14} />
            Score logic
          </button>
        </div>
      </div>

      {/* ── Cards ─────────────────────────────── */}
      {matches.length > 0 ? (
        <div className="grid gap-3 xl:grid-cols-2">
          {matches.map((match, index) => (
            <EmployeeMatchCard
              key={match.employee.id}
              match={match}
              rank={index + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div
          className="rounded-2xl p-10 text-center"
          style={{ border: '2px dashed var(--color-border)', background: 'var(--color-bg-card)' }}
        >
          <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
            No employees match these filters
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Try lowering the minimum score or clearing the search.
          </p>
        </div>
      )}
    </section>
  )
}

export default EmployeeRanking

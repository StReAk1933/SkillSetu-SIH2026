import { useMemo, useState } from 'react'
import { RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import { employees } from '../data/employees'
import { projects } from '../data/projects'
import { rankEmployees } from '../utils/matching'
import EmployeeDetailPanel from '../components/matching/EmployeeDetailPanel'
import EmployeeRanking from '../components/matching/EmployeeRanking'
import MatchSummary from '../components/matching/MatchSummary'
import ProjectList from '../components/projects/ProjectList'
import ProjectRequirements from '../components/projects/ProjectRequirements'

function ProjectMatchingPage() {
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id)
  const [search, setSearch] = useState('')
  const [availability, setAvailability] = useState('all')
  const [minimumScore, setMinimumScore] = useState(0)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const selectedProject = projects.find((project) => project.id === selectedProjectId) ?? projects[0]

  const rankedMatches = useMemo(() => rankEmployees(employees, selectedProject), [selectedProject])
  const filteredMatches = useMemo(() => rankedMatches.filter((match) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || `${match.employee.name} ${match.employee.role} ${match.employee.department}`.toLowerCase().includes(query)
    const matchesAvailability = availability === 'all' || match.employee.availability === availability
    return matchesSearch && matchesAvailability && match.finalScore >= minimumScore
  }), [availability, minimumScore, rankedMatches, search])

  const resetFilters = () => {
    setSearch('')
    setAvailability('all')
    setMinimumScore(0)
  }

  const selectProject = (projectId) => {
    setSelectedProjectId(projectId)
    setSelectedMatch(null)
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      {/* ── Page header ───────────────────────────── */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
            Projects{' '}
            <span className="mx-1" style={{ color: 'var(--color-border)' }}>
              /
            </span>{' '}
            Staffing intelligence
          </p>
          <h2
            className="mt-2 text-3xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-dark)' }}
          >
            Find the right people for real work
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: 'var(--color-text-muted)' }}>
            Compare verified competencies against live project requirements and make a confident staffing decision.
          </p>
        </div>

        {/* Matching engine badge */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold"
          style={{
            border: '1px solid var(--color-primary-muted)',
            background: 'var(--color-primary-bg)',
            color: 'var(--color-primary-dark)',
          }}
        >
          <span
            className="size-2 rounded-full"
            style={{ background: 'var(--color-primary)' }}
          />
          Matching engine active
        </div>
      </div>

      {/* ── Main grid ─────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <ProjectList projects={projects} selectedProjectId={selectedProjectId} onSelect={selectProject} />

        <div className="min-w-0 space-y-6">
          <ProjectRequirements project={selectedProject} />
          <MatchSummary matches={rankedMatches} project={selectedProject} />

          {/* ── Candidate matching section ─────────── */}
          <section
            className="rounded-2xl p-4 shadow-sm sm:p-5"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-card)',
            }}
          >
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  Candidate matching
                </h2>
                <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {filteredMatches.length} of {rankedMatches.length} employees shown
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
                <label className="relative min-w-48 flex-1 xl:flex-none">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: 'var(--color-text-subtle)' }}
                  />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search employees"
                    className="h-10 w-full rounded-xl pl-9 pr-8 text-sm outline-none transition placeholder:text-slate-400"
                    style={{
                      border: '1px solid var(--color-border)',
                      background: 'var(--color-bg)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)'
                      e.currentTarget.style.background = 'var(--color-bg-card)'
                      e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-muted)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)'
                      e.currentTarget.style.background = 'var(--color-bg)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1"
                      style={{ color: 'var(--color-text-subtle)' }}
                      aria-label="Clear search"
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>

                {/* Availability filter */}
                <select
                  value={availability}
                  onChange={(event) => setAvailability(event.target.value)}
                  className="h-10 rounded-xl px-3 text-sm font-medium outline-none"
                  style={{
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg)',
                    color: 'var(--color-text)',
                  }}
                >
                  <option value="all">All availability</option>
                  <option value="available">Available now</option>
                  <option value="partially available">Partial capacity</option>
                  <option value="unavailable">Unavailable</option>
                </select>

                {/* Reset button */}
                <button
                  onClick={resetFilters}
                  className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold transition"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              </div>
            </div>

            {/* Score slider */}
            <div
              className="mt-5 flex flex-col gap-3 pt-4 sm:flex-row sm:items-center"
              style={{ borderTop: '1px solid var(--color-border-light)' }}
            >
              <div
                className="flex items-center gap-2 text-xs font-semibold"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <SlidersHorizontal size={15} style={{ color: 'var(--color-text-subtle)' }} />
                Minimum match score
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={minimumScore}
                onChange={(event) => setMinimumScore(Number(event.target.value))}
                className="h-1.5 min-w-40 flex-1"
              />
              <span
                className="w-12 rounded-lg px-2 py-1 text-center text-xs font-bold"
                style={{
                  background: 'var(--color-primary-bg)',
                  color: 'var(--color-primary-dark)',
                }}
              >
                {minimumScore}%
              </span>
            </div>
          </section>

          <EmployeeRanking matches={filteredMatches} onSelect={setSelectedMatch} />
        </div>
      </div>

      <EmployeeDetailPanel match={selectedMatch} project={selectedProject} onClose={() => setSelectedMatch(null)} />
    </div>
  )
}

export default ProjectMatchingPage

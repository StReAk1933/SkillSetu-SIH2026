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
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="text-sm font-medium text-slate-500">Projects <span className="mx-1 text-slate-300">/</span> Staffing intelligence</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">Find the right people for real work</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Compare verified competencies against live project requirements and make a confident staffing decision.</p></div>
        <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700"><span className="size-2 rounded-full bg-emerald-500" />Matching engine active</div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <ProjectList projects={projects} selectedProjectId={selectedProjectId} onSelect={selectProject} />
        <div className="min-w-0 space-y-6">
          <ProjectRequirements project={selectedProject} />
          <MatchSummary matches={rankedMatches} project={selectedProject} />
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div><h2 className="text-lg font-bold text-slate-900">Candidate matching</h2><p className="mt-1 text-xs text-slate-500">{filteredMatches.length} of {rankedMatches.length} employees shown</p></div>
              <div className="flex flex-wrap items-center gap-2">
                <label className="relative min-w-48 flex-1 xl:flex-none"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search employees" className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-8 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100" />{search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-200" aria-label="Clear search"><X size={14} /></button>}</label>
                <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"><option value="all">All availability</option><option value="available">Available now</option><option value="partially available">Partial capacity</option><option value="unavailable">Unavailable</option></select>
                <button onClick={resetFilters} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-50"><RotateCcw size={14} />Reset</button>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center"><div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><SlidersHorizontal size={15} className="text-slate-400" />Minimum match score</div><input type="range" min="0" max="100" step="5" value={minimumScore} onChange={(event) => setMinimumScore(Number(event.target.value))} className="h-1.5 min-w-40 flex-1 accent-emerald-500" /><span className="w-12 rounded-lg bg-emerald-50 px-2 py-1 text-center text-xs font-bold text-emerald-700">{minimumScore}%</span></div>
          </section>
          <EmployeeRanking matches={filteredMatches} onSelect={setSelectedMatch} />
        </div>
      </div>
      <EmployeeDetailPanel match={selectedMatch} project={selectedProject} onClose={() => setSelectedMatch(null)} />
    </div>
  )
}

export default ProjectMatchingPage

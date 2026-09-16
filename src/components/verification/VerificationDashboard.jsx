import { useMemo, useState } from 'react'
import {
  Building2,
  Clock,
  Eye,
  FileCheck2,
  FilePlus,
  HelpCircle,
  LayoutGrid,
  MapPin,
  Shield,
  ShieldCheck,
  Sparkles,
  Table as TableIcon,
  Users,
} from 'lucide-react'
import { verificationData as initialVerificationData } from '../../data/verificationData'
import {
  computeEmployeeVerificationMetrics,
  computeGlobalVerificationStats,
  filterCompetencies,
} from '../../utils/verification'
import CompetencyCard from './CompetencyCard'
import VerificationBadge from './VerificationBadge'
import VerificationDetail from './VerificationDetail'
import VerificationFilterBar from './VerificationFilterBar'
import SubmitEvidenceModal from './SubmitEvidenceModal'

function VerificationDashboard() {
  // Local state initialized from master verification dataset
  const [employees, setEmployees] = useState(initialVerificationData)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(initialVerificationData[0].employeeId)

  // Filtering & search state
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortOption, setSortOption] = useState('default')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'

  // Modal / Drawer state
  const [activeCompetency, setActiveCompetency] = useState(null)
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false)
  const [evidenceModalTarget, setEvidenceModalTarget] = useState(null)
  const [notification, setNotification] = useState(null)

  // Current selected employee
  const currentEmployee = useMemo(() => {
    return employees.find((e) => e.employeeId === selectedEmployeeId) || employees[0]
  }, [employees, selectedEmployeeId])

  // Computed metrics for current employee
  const employeeMetrics = useMemo(() => {
    return computeEmployeeVerificationMetrics(currentEmployee)
  }, [currentEmployee])

  // Global workforce statistics
  const globalStats = useMemo(() => {
    return computeGlobalVerificationStats(employees)
  }, [employees])

  // Unique categories for the current employee's competencies
  const availableCategories = useMemo(() => {
    const cats = new Set(currentEmployee.competencies.map((c) => c.category).filter(Boolean))
    return Array.from(cats)
  }, [currentEmployee])

  // Filtered competencies for display
  const filteredCompetencies = useMemo(() => {
    return filterCompetencies(currentEmployee.competencies, {
      status: statusFilter,
      search,
      category: categoryFilter,
      sort: sortOption,
    })
  }, [currentEmployee, statusFilter, search, categoryFilter, sortOption])

  // Status counts for tabs
  const statusCounts = useMemo(() => {
    const comps = currentEmployee.competencies
    return {
      all: comps.length,
      verified: comps.filter((c) => c.status === 'verified' || c.verified).length,
      pending: comps.filter((c) => c.status === 'pending').length,
      unverified: comps.filter((c) => c.status === 'unverified' || (!c.verified && c.status !== 'pending')).length,
    }
  }, [currentEmployee])

  // Handle Quick Verification / Attestation
  const handleQuickVerify = (competency) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.employeeId === currentEmployee.employeeId) {
        const updatedComps = emp.competencies.map((comp) => {
          if (comp.skillId === competency.skillId) {
            return {
              ...comp,
              status: 'verified',
              verified: true,
              evidence: {
                type: comp.evidence?.type !== 'Self reported' ? comp.evidence?.type : 'Manager validation',
                date: new Date().toISOString().split('T')[0],
                source: 'SkillSetu Attestation Engine',
                issuer: 'Workforce Competency Verification Board',
                credentialId: `ATTEST-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                validUntil: 'Permanent',
                verifiedBy: 'Verification Lead',
                verificationScore: 94,
                summary: `Formal verification signed and recorded for ${comp.skill} (Level ${comp.level}).`,
                artifacts: [],
                auditTrail: [
                  ...(comp.evidence?.auditTrail || []),
                  {
                    date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
                    action: 'Attestation Signed & Verified',
                    actor: 'Verification Lead',
                  },
                ],
              },
            }
          }
          return comp
        })
        return { ...emp, competencies: updatedComps }
      }
      return emp
    })

    setEmployees(updatedEmployees)
    setActiveCompetency(null)
    triggerToast(`✓ Verified ${competency.skill} for ${currentEmployee.employeeName}`)
  }

  // Handle Evidence Submission
  const handleSubmitEvidence = (skillId, newEvidence) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.employeeId === currentEmployee.employeeId) {
        const updatedComps = emp.competencies.map((comp) => {
          if (comp.skillId === skillId) {
            return {
              ...comp,
              status: 'verified',
              verified: true,
              evidence: newEvidence,
            }
          }
          return comp
        })
        return { ...emp, competencies: updatedComps }
      }
      return emp
    })

    setEmployees(updatedEmployees)
    triggerToast(`Evidence recorded and verified for ${skillId}!`)
  }

  const triggerToast = (msg) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-950 p-4 text-xs font-bold text-emerald-200 shadow-2xl">
          <ShieldCheck size={18} className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Module Title & Hero Header */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl bg-emerald-500 text-white shadow-xs">
              <ShieldCheck size={18} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Module 3 • Competency Verification
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Evidence Engine
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
            Competency Verification & Traceability
          </h1>
          <p className="mt-1 text-xs text-slate-500 max-w-2xl">
            Answers: <span className="font-semibold text-slate-700">“Does this employee actually have the claimed competency, and what evidence proves it?”</span> Backed by certifications, project PRs, technical assessments, and audit trails.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white sm:self-center">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Workforce Verified Rate</p>
            <p className="text-lg font-black text-emerald-400">{globalStats.overallVerificationRate}%</p>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Evidence Docs</p>
            <p className="text-lg font-black text-white">{globalStats.totalVerified}</p>
          </div>
        </div>
      </div>

      {/* Global & Employee Verification KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* KPI 1 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Competencies</span>
            <span className="grid size-7 place-items-center rounded-lg bg-slate-100 text-slate-700">
              <FileCheck2 size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-950">{employeeMetrics.total}</p>
          <p className="mt-1 text-[11px] text-slate-500">
            {employeeMetrics.verifiedCount} verified with proof
          </p>
        </div>

        {/* KPI 2 */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Verification Rate</span>
            <span className="grid size-7 place-items-center rounded-lg bg-emerald-500 text-white">
              <ShieldCheck size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-950">{employeeMetrics.verifiedRate}%</p>
          <p className="mt-1 text-[11px] font-medium text-emerald-700">
            {employeeMetrics.verifiedRate >= 80 ? 'High Confidence Profile' : 'Pending Evidence Backfill'}
          </p>
        </div>

        {/* KPI 3 */}
        <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Pending Review</span>
            <span className="grid size-7 place-items-center rounded-lg bg-amber-500 text-white">
              <Clock size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-amber-950">{employeeMetrics.pendingCount}</p>
          <p className="mt-1 text-[11px] text-amber-700">
            {employeeMetrics.unverifiedCount} unverified self-claims
          </p>
        </div>

        {/* KPI 4 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trust Index</span>
            <span className="grid size-7 place-items-center rounded-lg bg-slate-900 text-white">
              <Shield size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-950">{employeeMetrics.trustIndex} / 100</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Weighted by evidence quality
          </p>
        </div>
      </div>

      {/* Employee Selector Bar */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-slate-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Select Employee For Competency Verification ({employees.length})
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Click to switch verification records</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {employees.map((emp) => {
            const isSelected = emp.employeeId === selectedEmployeeId
            const empMetrics = computeEmployeeVerificationMetrics(emp)
            return (
              <button
                key={emp.employeeId}
                onClick={() => {
                  setSelectedEmployeeId(emp.employeeId)
                  setStatusFilter('all')
                  setSearch('')
                }}
                className={`flex flex-col items-start rounded-xl p-3 text-left transition-all ${
                  isSelected
                    ? 'border-2 border-emerald-500 bg-emerald-50/60 shadow-sm'
                    : 'border border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span
                    className={`grid size-7 place-items-center rounded-lg text-xs font-bold ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'
                    }`}
                  >
                    {emp.avatar || emp.employeeName.substring(0, 2).toUpperCase()}
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      empMetrics.verifiedRate === 100
                        ? 'text-emerald-700'
                        : empMetrics.verifiedRate >= 60
                        ? 'text-slate-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {empMetrics.verifiedRate}%
                  </span>
                </div>
                <p className="mt-2 text-xs font-bold text-slate-900 truncate w-full">{emp.employeeName}</p>
                <p className="text-[10px] text-slate-500 truncate w-full">{emp.role}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* Selected Employee Profile Hero Banner */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-slate-900 text-2xl font-black text-white shadow-md">
              {currentEmployee.avatar || currentEmployee.employeeName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-black text-slate-950">{currentEmployee.employeeName}</h2>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-600">
                  {currentEmployee.employeeId}
                </span>
                <VerificationBadge
                  verified={employeeMetrics.verifiedCount === employeeMetrics.total}
                  compact={false}
                />
              </div>
              <p className="mt-0.5 text-xs font-semibold text-slate-600">{currentEmployee.role}</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Building2 size={13} className="text-slate-400" />
                  {currentEmployee.department}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  {currentEmployee.location}
                </span>
              </div>
            </div>
          </div>

          {/* Verification Health Breakdown Ring / Meter */}
          <div className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:self-stretch">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verification Health</p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-950">{employeeMetrics.verifiedCount}</span>
                <span className="text-xs font-semibold text-slate-400">/ {employeeMetrics.total} skills verified</span>
              </div>
              {/* Progress Bar */}
              <div className="mt-2 h-2 w-48 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${employeeMetrics.verifiedRate}%` }}
                />
              </div>
            </div>

            <div className="border-l border-slate-200 pl-4">
              <button
                onClick={() => {
                  setEvidenceModalTarget(currentEmployee.competencies[0])
                  setIsEvidenceModalOpen(true)
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800"
              >
                <FilePlus size={14} />
                <span>Submit Proof</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Filter Bar + Competency List */}
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        {/* Header with View Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-950">
              Competencies & Verification Proof ({filteredCompetencies.length})
            </h3>
            <p className="text-xs text-slate-500">
              Inspect supporting evidence, issuers, dates, and test score validity.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={13} />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <TableIcon size={13} />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <VerificationFilterBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={availableCategories}
          sortOption={sortOption}
          onSortChange={setSortOption}
          statusCounts={statusCounts}
        />

        {/* Competencies Display */}
        {filteredCompetencies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
            <HelpCircle size={32} className="mx-auto text-slate-400" />
            <p className="mt-2 text-sm font-bold text-slate-700">No competencies match your filters</p>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your search query or reset status filters.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setStatusFilter('all')
                setCategoryFilter('all')
              }}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompetencies.map((comp) => (
              <CompetencyCard
                key={comp.skillId}
                competency={comp}
                onInspect={(c) => setActiveCompetency(c)}
                onAddEvidence={(c) => {
                  setEvidenceModalTarget(c)
                  setIsEvidenceModalOpen(true)
                }}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Competency</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Evidence Type</th>
                  <th className="px-4 py-3">Verification Source</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredCompetencies.map((comp) => (
                  <tr key={comp.skillId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-900">{comp.skill}</p>
                      <p className="text-[10px] text-slate-400">{comp.category}</p>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono">
                        Level {comp.level}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <VerificationBadge status={comp.status} verified={comp.verified} compact={true} />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {comp.evidence?.type || 'Self reported'}
                    </td>
                    <td className="px-4 py-3 text-slate-600 truncate max-w-[200px]">
                      {comp.evidence?.source || comp.evidence?.issuer || '—'}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                      {comp.evidence?.date || '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setActiveCompetency(comp)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Traceability & Project Matching Integration Info Box */}
      <section className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-emerald-600 text-white">
            <Sparkles size={16} />
          </span>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Project Matching Integration Contract
            </h4>
            <p className="mt-1 text-xs text-emerald-800 leading-relaxed">
              The Project Matching module consumes verified competencies from this module using the <code className="rounded bg-emerald-100/80 px-1.5 py-0.5 font-mono text-[11px] text-emerald-900 font-bold">getVerifiedCompetencyMap(employeeId)</code> utility. Staffing matches are calculated exclusively on competencies with validated proof, eliminating unverified capability assumptions.
            </p>
          </div>
        </div>
      </section>

      {/* Slide-over Inspection Dossier */}
      {activeCompetency && (
        <VerificationDetail
          competency={activeCompetency}
          employee={currentEmployee}
          onClose={() => setActiveCompetency(null)}
          onQuickVerify={handleQuickVerify}
        />
      )}

      {/* Submit Evidence Modal */}
      {isEvidenceModalOpen && (
        <SubmitEvidenceModal
          competency={evidenceModalTarget || currentEmployee.competencies[0]}
          employee={currentEmployee}
          onClose={() => {
            setIsEvidenceModalOpen(false)
            setEvidenceModalTarget(null)
          }}
          onSubmitEvidence={handleSubmitEvidence}
        />
      )}
    </div>
  )
}

export default VerificationDashboard

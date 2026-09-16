import { Award, ChevronRight, FilePlus, Sparkles } from 'lucide-react'
import VerificationBadge from './VerificationBadge'

function CompetencyCard({ competency, onInspect, onAddEvidence }) {
  const { skill, category, level, status, verified, evidence } = competency
  const isVerified = status === 'verified' || verified === true
  const isPending = status === 'pending'

  // Level visual indicators (1 to 5)
  const renderLevelBars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((lvl) => {
          const active = lvl <= level
          return (
            <div
              key={lvl}
              className={`h-1.5 w-4 rounded-full transition-all ${
                active
                  ? isVerified
                    ? 'bg-emerald-500'
                    : isPending
                    ? 'bg-amber-400'
                    : 'bg-slate-400'
                  : 'bg-slate-200'
              }`}
            />
          )
        })}
        <span className="ml-1 text-xs font-bold text-slate-700">L{level}</span>
      </div>
    )
  }

  // Border & background accent based on verification status
  const getCardStyle = () => {
    if (isVerified) {
      return 'border-emerald-200/80 bg-white hover:border-emerald-400/80 shadow-xs hover:shadow-md'
    }
    if (isPending) {
      return 'border-amber-200/80 bg-amber-50/30 hover:border-amber-400/80 shadow-xs'
    }
    return 'border-slate-200 bg-slate-50/40 hover:border-slate-300 shadow-xs'
  }

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${getCardStyle()}`}
    >
      <div>
        {/* Top Header: Category & Verification Badge */}
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            {category || 'Competency'}
          </span>
          <VerificationBadge status={status} verified={verified} />
        </div>

        {/* Skill Title & Proficiency Level */}
        <div className="mt-3.5 flex items-start justify-between gap-2">
          <div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {skill}
            </h4>
            <div className="mt-1.5 flex items-center gap-2">
              {renderLevelBars()}
            </div>
          </div>

          {isVerified && evidence?.verificationScore && (
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Score</span>
              <span className="font-mono text-xs font-black text-emerald-700">{evidence.verificationScore}%</span>
            </div>
          )}
        </div>

        {/* Evidence Quick Breakdown */}
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs">
          {isVerified && evidence ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-2 font-medium text-slate-800">
                <span className="inline-flex items-center gap-1.5 truncate">
                  <Award size={13} className="text-emerald-600 shrink-0" />
                  <span className="truncate">{evidence.type}</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">
                  {evidence.date}
                </span>
              </div>
              <p className="line-clamp-1 text-[11px] text-slate-500">
                Source: <strong className="font-semibold text-slate-700">{evidence.source || evidence.issuer}</strong>
              </p>
            </div>
          ) : isPending ? (
            <div className="flex items-center justify-between gap-2 text-amber-800">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold">
                <Sparkles size={12} className="text-amber-600" />
                Review in progress
              </span>
              <span className="text-[10px] text-amber-600">{evidence?.date || 'Pending'}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2 text-slate-500">
              <span className="text-[11px]">No validated proof recorded</span>
              <span className="text-[10px] text-slate-400">Self reported</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <button
          onClick={() => onInspect(competency)}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 transition-colors hover:text-emerald-700"
        >
          <span>Inspect Evidence</span>
          <ChevronRight size={14} />
        </button>

        {!isVerified && onAddEvidence && (
          <button
            onClick={() => onAddEvidence(competency)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FilePlus size={13} className="text-slate-500" />
            <span>Add Proof</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default CompetencyCard

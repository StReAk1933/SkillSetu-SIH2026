import { BadgeCheck, CircleAlert, HelpCircle } from 'lucide-react'

/**
 * VerificationBadge Component
 * Displays clear visual status:
 * - Verified: Emerald / Green with Check badge
 * - Pending / Needs Evidence: Amber with Alert icon
 * - Unverified: Slate / Gray with Help icon
 */
function VerificationBadge({ status, verified, compact = false, showLabel = true }) {
  // Normalize
  const currentStatus = status || (verified ? 'verified' : 'unverified')

  if (currentStatus === 'verified' || verified === true) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold transition-all ${
          compact
            ? 'text-[11px] text-emerald-700'
            : 'rounded-full border border-emerald-200 bg-emerald-50/90 px-2.5 py-1 text-xs text-emerald-800 shadow-xs'
        }`}
        title="Verified competency backed by verified evidence"
      >
        <BadgeCheck size={compact ? 13 : 15} className="text-emerald-600 shrink-0" />
        {showLabel && (compact ? 'Verified' : '✓ Verified')}
      </span>
    )
  }

  if (currentStatus === 'pending') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold transition-all ${
          compact
            ? 'text-[11px] text-amber-700'
            : 'rounded-full border border-amber-200 bg-amber-50/90 px-2.5 py-1 text-xs text-amber-800 shadow-xs'
        }`}
        title="Evidence submitted and awaiting review"
      >
        <CircleAlert size={compact ? 13 : 15} className="text-amber-600 shrink-0 animate-pulse" />
        {showLabel && (compact ? 'Pending' : 'Pending / Needs evidence')}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium transition-all ${
        compact
          ? 'text-[11px] text-slate-500'
          : 'rounded-full border border-slate-200 bg-slate-100/90 px-2.5 py-1 text-xs text-slate-600 shadow-xs'
      }`}
      title="Unverified competency - no validated proof provided yet"
    >
      <HelpCircle size={compact ? 13 : 15} className="text-slate-400 shrink-0" />
      {showLabel && (compact ? 'Unverified' : 'Unverified')}
    </span>
  )
}

export default VerificationBadge

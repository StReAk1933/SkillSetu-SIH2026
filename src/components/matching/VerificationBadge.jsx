import { BadgeCheck, CircleAlert } from 'lucide-react'

function VerificationBadge({ verified, compact = false }) {
  return verified ? (
    <span className={`inline-flex items-center gap-1 font-semibold text-emerald-700 ${compact ? 'text-[11px]' : 'rounded-full bg-emerald-50 px-2 py-1 text-xs'}`}><BadgeCheck size={compact ? 13 : 14} />{compact ? 'Verified' : 'Verified competency'}</span>
  ) : (
    <span className={`inline-flex items-center gap-1 font-semibold text-amber-700 ${compact ? 'text-[11px]' : 'rounded-full bg-amber-50 px-2 py-1 text-xs'}`}><CircleAlert size={compact ? 13 : 14} />{compact ? 'Needs evidence' : 'Evidence needed'}</span>
  )
}

export default VerificationBadge

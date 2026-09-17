import { BadgeCheck, CircleAlert } from 'lucide-react'

function VerificationBadge({ verified, compact = false }) {
  return verified ? (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        compact ? 'text-[11px]' : 'rounded-full px-2 py-1 text-xs'
      }`}
      style={
        compact
          ? { color: 'var(--color-primary-dark)' }
          : { background: 'var(--color-primary-bg)', color: 'var(--color-primary-dark)' }
      }
    >
      <BadgeCheck size={compact ? 13 : 14} />
      {compact ? 'Verified' : 'Verified competency'}
    </span>
  ) : (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${
        compact ? 'text-[11px]' : 'rounded-full px-2 py-1 text-xs'
      }`}
      style={
        compact
          ? { color: '#92400E' }
          : { background: 'var(--color-accent-amber-bg)', color: '#92400E' }
      }
    >
      <CircleAlert size={compact ? 13 : 14} />
      {compact ? 'Needs evidence' : 'Evidence needed'}
    </span>
  )
}

export default VerificationBadge

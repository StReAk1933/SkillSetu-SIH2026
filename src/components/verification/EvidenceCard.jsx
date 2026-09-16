import {
  Award,
  Calendar,
  CheckCircle,
  ExternalLink,
  FileCode,
  FileText,
  FolderGit2,
  ShieldCheck,
  UserCheck,
} from 'lucide-react'

function EvidenceIcon({ type, size = 16, className = '' }) {
  switch (type) {
    case 'Certification':
      return <Award size={size} className={className} />
    case 'Project evidence':
      return <FolderGit2 size={size} className={className} />
    case 'Technical assessment':
      return <FileCode size={size} className={className} />
    case 'Manager validation':
      return <UserCheck size={size} className={className} />
    case 'Peer review':
    case 'Portfolio review':
      return <CheckCircle size={size} className={className} />
    default:
      return <FileText size={size} className={className} />
  }
}

function EvidenceCard({ evidence, isCompact = false }) {
  if (!evidence) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center text-xs text-slate-500">
        No formal evidence recorded.
      </div>
    )
  }

  if (isCompact) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <EvidenceIcon type={evidence.type} size={14} className="text-slate-500 shrink-0" />
          <span className="truncate font-semibold text-slate-700">{evidence.type}</span>
        </div>
        <span className="shrink-0 text-slate-400 font-mono text-[11px]">
          {evidence.date || 'N/A'}
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-all hover:border-slate-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
            <EvidenceIcon type={evidence.type} size={16} />
          </span>
          <div>
            <p className="text-xs font-bold text-slate-900">{evidence.type}</p>
            <p className="text-[11px] text-slate-500">{evidence.source || 'Verified Source'}</p>
          </div>
        </div>

        {evidence.verificationScore && (
          <div className="text-right">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              <ShieldCheck size={12} />
              {evidence.verificationScore}% Score
            </span>
          </div>
        )}
      </div>

      {evidence.issuer && (
        <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-700">
          <p className="font-semibold text-slate-900">{evidence.issuer}</p>
          {evidence.credentialId && (
            <p className="mt-1 font-mono text-[10px] text-slate-500">
              Credential ID: <span className="font-semibold text-slate-700">{evidence.credentialId}</span>
            </p>
          )}
        </div>
      )}

      {evidence.summary && (
        <p className="mt-3 text-xs leading-relaxed text-slate-600">
          {evidence.summary}
        </p>
      )}

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <Calendar size={12} className="text-slate-400" />
          Verified: <strong className="text-slate-700">{evidence.date}</strong>
        </span>

        {evidence.verifiedBy && (
          <span className="inline-flex items-center gap-1 truncate" title={evidence.verifiedBy}>
            <UserCheck size={12} className="text-slate-400" />
            By: <span className="font-medium text-slate-700 truncate max-w-[140px]">{evidence.verifiedBy}</span>
          </span>
        )}
      </div>

      {evidence.artifacts && evidence.artifacts.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
          {evidence.artifacts.map((art, idx) => (
            <a
              key={idx}
              href={`#${art.name}`}
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700 transition hover:bg-slate-200"
            >
              <ExternalLink size={10} className="text-slate-400" />
              {art.name}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default EvidenceCard

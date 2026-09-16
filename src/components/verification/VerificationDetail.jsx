import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  History,
  ShieldAlert,
  UserCheck,
  X,
} from 'lucide-react'
import VerificationBadge from './VerificationBadge'

function VerificationDetail({ competency, employee, onClose, onQuickVerify }) {
  if (!competency) return null

  const { skill, category, level, status, verified, evidence } = competency
  const isVerified = status === 'verified' || verified === true

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close verification detail modal"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer */}
      <aside className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-slate-50 shadow-2xl">
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
              Competency Traceability Dossier
            </span>
            <h3 className="mt-0.5 text-lg font-extrabold text-slate-950">
              {skill} — Level {level}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close dossier"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Container */}
        <div className="space-y-5 p-6 sm:p-7">
          {/* Employee & Competency Summary Box */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                  {employee?.avatar || employee?.employeeName?.substring(0, 2).toUpperCase() || 'EM'}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{employee?.employeeName || employee?.name}</h4>
                  <p className="text-xs text-slate-500">
                    {employee?.role} • {employee?.department}
                  </p>
                </div>
              </div>
              <VerificationBadge status={status} verified={verified} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</p>
                <p className="mt-1 text-xs font-semibold text-slate-800">{category || 'General'}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Proficiency</p>
                <p className="mt-1 text-xs font-bold text-emerald-700">Level {level} of 5</p>
              </div>
              <div className="col-span-2 rounded-xl bg-slate-50 p-3 sm:col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verification Trust</p>
                <p className="mt-1 text-xs font-bold text-slate-800">
                  {isVerified ? `${evidence?.verificationScore || 95}% Confidence` : 'Pending Proof'}
                </p>
              </div>
            </div>
          </section>

          {/* Evidence Dossier Section */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="grid size-7 place-items-center rounded-lg bg-emerald-50 text-emerald-700">
                <Award size={16} />
              </span>
              <h4 className="text-sm font-bold text-slate-900">Primary Supporting Evidence</h4>
            </div>

            {evidence ? (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evidence Type</p>
                    <p className="mt-1 text-xs font-bold text-slate-900">{evidence.type}</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verification Date</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                      <Calendar size={13} className="text-slate-400" />
                      {evidence.date || 'N/A'}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verification Source</p>
                    <p className="mt-1 text-xs font-semibold text-slate-900">{evidence.source || 'Direct Assessment'}</p>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Credential / Ref ID</p>
                    <p className="mt-1 font-mono text-[11px] font-semibold text-emerald-800">
                      {evidence.credentialId || 'N/A'}
                    </p>
                  </div>
                </div>

                {evidence.issuer && (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3 text-xs">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Issuing / Evaluating Authority
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">{evidence.issuer}</p>
                  </div>
                )}

                {evidence.summary && (
                  <div>
                    <p className="text-xs font-bold text-slate-900">Verification Rationale & Scope</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      {evidence.summary}
                    </p>
                  </div>
                )}

                {evidence.verifiedBy && (
                  <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2.5 text-xs text-slate-700">
                    <UserCheck size={16} className="text-emerald-600 shrink-0" />
                    <span>
                      Verified by <strong className="text-slate-900">{evidence.verifiedBy}</strong>
                    </span>
                  </div>
                )}

                {/* Evidence Artifacts */}
                {evidence.artifacts && evidence.artifacts.length > 0 && (
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-xs font-bold text-slate-900 mb-2">Attached Proof Artifacts</p>
                    <div className="space-y-1.5">
                      {evidence.artifacts.map((art, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
                        >
                          <span className="font-medium text-slate-800">{art.name}</span>
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-700">
                            <ExternalLink size={12} />
                            Verified Artifact
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-amber-200 bg-amber-50/50 p-5 text-center">
                <ShieldAlert size={28} className="mx-auto text-amber-500" />
                <p className="mt-2 text-sm font-bold text-amber-900">No Verified Evidence Attached</p>
                <p className="mt-1 text-xs text-amber-700 max-w-md mx-auto">
                  This competency is currently based on self-reported capability. To verify it for project matching trust calculations, attach a certification, pull request, or assessment signoff.
                </p>
              </div>
            )}
          </section>

          {/* Audit Trail Timeline */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="grid size-7 place-items-center rounded-lg bg-slate-100 text-slate-700">
                <History size={16} />
              </span>
              <h4 className="text-sm font-bold text-slate-900">Verification History & Audit Trail</h4>
            </div>

            {evidence?.auditTrail && evidence.auditTrail.length > 0 ? (
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {evidence.auditTrail.map((event, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-6 top-1 grid size-4 place-items-center rounded-full bg-emerald-500 ring-4 ring-white">
                      <CheckCircle2 size={10} className="text-white" />
                    </span>
                    <p className="text-xs font-bold text-slate-900">{event.action}</p>
                    <div className="mt-0.5 flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} className="text-slate-400" />
                        {event.date}
                      </span>
                      <span>By: <strong className="text-slate-700">{event.actor}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No prior audit logs recorded.</p>
            )}
          </section>

          {/* Quick Verify Simulation Action if not verified */}
          {!isVerified && onQuickVerify && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Simulate Verification Signoff</h4>
                  <p className="text-xs text-emerald-700">
                    Approve this competency and issue a digital verification record for testing.
                  </p>
                </div>
                <button
                  onClick={() => onQuickVerify(competency)}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 shrink-0"
                >
                  Sign & Verify ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

export default VerificationDetail

import { useState } from 'react'
import { FilePlus, ShieldCheck, X } from 'lucide-react'

function SubmitEvidenceModal({ competency, employee, onClose, onSubmitEvidence }) {
  const [evidenceType, setEvidenceType] = useState('Project evidence')
  const [source, setSource] = useState('Project Repository')
  const [issuer, setIssuer] = useState('')
  const [credentialId, setCredentialId] = useState('')
  const [verifiedBy, setVerifiedBy] = useState('Lead Reviewer')
  const [verificationScore, setVerificationScore] = useState(90)
  const [summary, setSummary] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!competency) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newEvidence = {
      type: evidenceType,
      date: new Date().toISOString().split('T')[0],
      source: source || 'Verified Review',
      issuer: issuer || `${evidenceType} Registry`,
      credentialId: credentialId || `VERIF-${Math.floor(10000 + Math.random() * 90000)}`,
      validUntil: 'Permanent',
      verifiedBy: verifiedBy || 'Auditor',
      verificationScore: Number(verificationScore) || 90,
      summary:
        summary ||
        `Demonstrated proficient application of ${competency.skill} during milestone reviews and repository commits.`,
      artifacts: [
        {
          name: 'Direct Verification Attestation',
          type: 'document',
          ref: `verify.skillsetu.gov.in/${competency.skillId}`,
        },
      ],
      auditTrail: [
        {
          date: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          action: 'Evidence Record Submitted and Validated',
          actor: verifiedBy || 'Verification Officer',
        },
      ],
    }

    setTimeout(() => {
      onSubmitEvidence(competency.skillId, newEvidence)
      setIsSubmitting(false)
      onClose()
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <FilePlus size={18} />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-950">Record Competency Evidence</h3>
              <p className="text-xs text-slate-500">
                {employee?.employeeName || employee?.name} • <strong className="text-slate-800">{competency.skill} (L{competency.level})</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Evidence Type
              </label>
              <select
                value={evidenceType}
                onChange={(e) => setEvidenceType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="Certification">Certification</option>
                <option value="Project evidence">Project evidence</option>
                <option value="Technical assessment">Technical assessment</option>
                <option value="Manager validation">Manager validation</option>
                <option value="Peer review">Peer review</option>
                <option value="Portfolio review">Portfolio review</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Verification Source
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. Certification Authority"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Issuing Authority / Organization
            </label>
            <input
              type="text"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. AWS Certified Data Engineer / Project Grievance Repo"
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Credential / Reference ID
              </label>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. CERT-2026-991"
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-mono text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                Confidence Score (1-100%)
              </label>
              <input
                type="number"
                min="60"
                max="100"
                value={verificationScore}
                onChange={(e) => setVerificationScore(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-bold text-emerald-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Verified By (Auditor / Lead)
            </label>
            <input
              type="text"
              value={verifiedBy}
              onChange={(e) => setVerifiedBy(e.target.value)}
              placeholder="e.g. Principal Architect / Evaluation Board"
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              Evidence Scope & Verification Rationale
            </label>
            <textarea
              rows="3"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Describe the proof, metrics, PR link, or assessment criteria that substantiate this competency level..."
              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Recording...</span>
              ) : (
                <>
                  <ShieldCheck size={15} />
                  <span>Attest & Verify Competency</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SubmitEvidenceModal

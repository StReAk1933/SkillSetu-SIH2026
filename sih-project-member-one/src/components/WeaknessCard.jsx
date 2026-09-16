import { FiAlertCircle } from 'react-icons/fi';
import { HiExclamationCircle } from 'react-icons/hi';

export default function WeaknessCard({ improvements }) {
  return (
    <div className="glass-card p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
          <FiAlertCircle className="text-amber-400" size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Areas for Improvement</h3>
          <p className="text-xs text-slate-500">Skills needing development</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {improvements.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 hover:border-amber-500/35 transition-all duration-200 group"
          >
            <HiExclamationCircle className="text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
            <span className="text-sm font-semibold text-slate-200">{skill}</span>
            <div className="ml-auto">
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 font-semibold">
                Upskill
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-4 pt-3 border-t border-slate-800/60">
        <p className="text-xs text-slate-500 text-center">
          {improvements.length} skill{improvements.length !== 1 ? 's' : ''} below target threshold
        </p>
      </div>
    </div>
  );
}

import { FiZap } from 'react-icons/fi';
import { HiCheckCircle } from 'react-icons/hi';

export default function StrengthsCard({ strengths }) {
  return (
    <div className="glass-card p-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
          <FiZap className="text-emerald-400" size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Core Strengths</h3>
          <p className="text-xs text-slate-500">High proficiency areas</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {strengths.map((skill, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 hover:border-emerald-500/35 transition-all duration-200 group"
          >
            <HiCheckCircle className="text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
            <span className="text-sm font-semibold text-slate-200">{skill}</span>
            <div className="ml-auto">
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-400 font-semibold">
                Strong
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-4 pt-3 border-t border-slate-800/60">
        <p className="text-xs text-slate-500 text-center">
          {strengths.length} skill{strengths.length !== 1 ? 's' : ''} above benchmark
        </p>
      </div>
    </div>
  );
}


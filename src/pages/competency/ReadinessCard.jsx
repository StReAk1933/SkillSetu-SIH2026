import { FiTarget } from 'react-icons/fi';

function getGapColor(current, required) {
  const diff = current - required;
  if (diff >= 0) return { bar: 'from-emerald-500 to-teal-400', label: 'Met', badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' };
  if (diff >= -15) return { bar: 'from-amber-500 to-yellow-400', label: 'Gap', badge: 'text-amber-400 bg-amber-400/10 border-amber-400/30' };
  return { bar: 'from-red-500 to-orange-400', label: 'Critical', badge: 'text-red-400 bg-red-400/10 border-red-400/30' };
}

function ReadinessRing({ readiness }) {
  const size = 96;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (readiness / 100) * circ;

  const color =
    readiness >= 80 ? '#34d399' :
    readiness >= 60 ? '#6366f1' :
    '#f59e0b';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(99,102,241,0.12)" strokeWidth={stroke} fill="none" />
        {/* Progress */}
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={circ - fill}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}88)`, transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white font-display leading-none">{readiness}%</span>
        <span className="text-[9px] text-slate-500 font-medium tracking-wide mt-0.5">READY</span>
      </div>
    </div>
  );
}

export default function ReadinessCard({ employee }) {
  return (
    <div className="glass-card p-6 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
          <FiTarget className="text-indigo-400" size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Role Readiness</h3>
          <p className="text-xs text-indigo-400 font-semibold">Target: {employee.targetRole}</p>
        </div>
        <div className="ml-auto">
          <ReadinessRing readiness={employee.readiness} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-indigo-500/20 to-transparent mb-4" />

      {/* Skill gaps */}
      <div className="space-y-3">
        {employee.targetSkills.map((target) => {
          const current = employee.skills.find((s) => s.name === target.name)?.score ?? 0;
          const gap = getGapColor(current, target.required);

          return (
            <div key={target.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-300">{target.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{current} / {target.required}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-semibold ${gap.badge}`}>
                    {gap.label}
                  </span>
                </div>
              </div>
              <div className="relative h-2 rounded-full bg-slate-800/80 overflow-hidden">
                {/* Required marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-10"
                  style={{ left: `${target.required}%` }}
                />
                {/* Current fill */}
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${gap.bar} transition-all duration-1000`}
                  style={{ width: `${Math.min(current, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

function getLevel(score) {
  if (score >= 80) return { label: 'Expert', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' };
  if (score >= 65) return { label: 'Advanced', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/30' };
  if (score >= 50) return { label: 'Proficient', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/30' };
  return { label: 'Needs Work', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' };
}

function getBarColor(score) {
  if (score >= 80) return 'from-emerald-500 to-teal-400';
  if (score >= 65) return 'from-blue-500 to-indigo-400';
  if (score >= 50) return 'from-cyan-500 to-blue-400';
  return 'from-amber-500 to-orange-400';
}

function getTrend(score) {
  if (score >= 70) return <FiTrendingUp className="text-emerald-400" size={13} />;
  if (score >= 50) return <FiMinus className="text-amber-400" size={13} />;
  return <FiTrendingDown className="text-red-400" size={13} />;
}

export default function SkillCard({ skill }) {
  const level = getLevel(skill.score);
  const bar = getBarColor(skill.score);

  return (
    <div className="glass-card p-4 group hover:scale-[1.02] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-200 truncate">{skill.name}</p>
        {getTrend(skill.score)}
      </div>

      {/* Score */}
      <div className="flex items-end gap-1 mb-3">
        <span className="text-3xl font-bold text-white font-display leading-none">{skill.score}</span>
        <span className="text-slate-500 text-sm mb-0.5">/ 100</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-slate-800/80 overflow-hidden mb-3">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${bar} transition-all duration-1000 ease-out`}
          style={{ width: `${skill.score}%` }}
        />
      </div>

      {/* Level badge */}
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${level.bg} ${level.color}`}>
        {level.label}
      </span>
    </div>
  );
}


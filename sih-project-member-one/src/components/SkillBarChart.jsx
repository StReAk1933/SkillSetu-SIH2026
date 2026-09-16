import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

const BAR_COLORS = [
  { start: '#6366f1', end: '#818cf8' },
  { start: '#06b6d4', end: '#22d3ee' },
  { start: '#8b5cf6', end: '#a78bfa' },
  { start: '#f59e0b', end: '#fbbf24' },
  { start: '#10b981', end: '#34d399' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-blue-500/30 rounded-xl px-4 py-2 shadow-xl">
        <p className="text-slate-300 font-semibold text-sm">{label}</p>
        <p className="text-white font-bold text-lg">{payload[0].value}<span className="text-slate-400 text-sm font-normal"> / 100</span></p>
      </div>
    );
  }
  return null;
};

export default function SkillBarChart({ skills }) {
  const data = skills.map((s) => ({ name: s.name, score: s.score }));

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Skill Distribution</h3>
          <p className="text-xs text-slate-500 mt-0.5">Competency proficiency breakdown</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span className="text-xs text-slate-500">Score / 100</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barSize={40} margin={{ top: 16, right: 10, left: -10, bottom: 0 }}>
          <defs>
            {BAR_COLORS.map((c, i) => (
              <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.start} stopOpacity={1} />
                <stop offset="100%" stopColor={c.end} stopOpacity={0.7} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid vertical={false} stroke="rgba(99,102,241,0.1)" />
          <XAxis
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: '#475569', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickCount={6}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)', radius: 6 }} />
          <Bar dataKey="score" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={`url(#barGrad${index % BAR_COLORS.length})`} />
            ))}
            <LabelList dataKey="score" position="top" style={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 700 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

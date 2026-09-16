import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 border border-blue-500/30 rounded-xl px-4 py-2 shadow-xl">
        <p className="text-blue-300 font-semibold text-sm">{payload[0].payload.skill}</p>
        <p className="text-white font-bold text-lg">{payload[0].value}<span className="text-slate-400 text-sm font-normal"> / 100</span></p>
      </div>
    );
  }
  return null;
};

export default function CompetencyRadarChart({ skills }) {
  const data = skills.map((s) => ({ skill: s.name, score: s.score, fullMark: 100 }));

  return (
    <div className="glass-card p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white">Competency Radar</h3>
          <p className="text-xs text-slate-500 mt-0.5">Multi-dimensional skill view</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <span className="text-indigo-400 text-xs">◈</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <defs>
            <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <PolarGrid
            gridType="polygon"
            stroke="rgba(99,102,241,0.15)"
          />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600, fontFamily: 'Inter' }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#475569', fontSize: 9 }}
            tickCount={5}
            axisLine={false}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#radarGrad)"
            dot={{ r: 4, fill: '#818cf8', strokeWidth: 2, stroke: '#312e81' }}
            activeDot={{ r: 6, fill: '#a78bfa', stroke: '#6366f1', strokeWidth: 2 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

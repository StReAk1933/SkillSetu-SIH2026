import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { skillCatalog } from '../../data/projects'

function SkillComparison({ match }) {
  const chartData = match.skillResults.map((skill) => ({
    name: skillCatalog[skill.skillId],
    Required: skill.requiredLevel,
    Employee: skill.employeeLevel,
    status: skill.status,
  }))

  const cellColor = (status) => {
    if (status === 'matched') return '#00B87A'   // primary
    if (status === 'weak')    return '#F59E0B'   // amber
    return '#F43F5E'                              // rose/danger
  }

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
            Skill comparison
          </h3>
          <p className="mt-1 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Employee proficiency against project requirements
          </p>
        </div>
        <span
          className="rounded-lg px-2.5 py-1 text-[11px] font-semibold"
          style={{ background: 'var(--color-bg-subtle)', color: 'var(--color-text-muted)' }}
        >
          Scale 1-5
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
            barGap={3}
          >
            <CartesianGrid stroke="#E2E8F0" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
            />
            <Tooltip
              cursor={{ fill: 'var(--color-bg)' }}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid var(--color-border)',
                fontSize: 12,
                color: 'var(--color-text)',
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
            {/* Required bars — subtle navy */}
            <Bar dataKey="Required" fill="#CBD5E1" radius={[0, 4, 4, 0]} barSize={8} />
            {/* Employee bars — color-coded */}
            <Bar dataKey="Employee" radius={[0, 4, 4, 0]} barSize={8}>
              {chartData.map((skill) => (
                <Cell key={skill.name} fill={cellColor(skill.status)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div
        className="mt-3 flex flex-wrap gap-2 pt-3 text-[10px] font-bold uppercase tracking-wider"
        style={{ borderTop: '1px solid var(--color-border-light)' }}
      >
        <span className="inline-flex items-center gap-1.5" style={{ color: 'var(--color-primary-dark)' }}>
          <span className="size-2 rounded-full" style={{ background: 'var(--color-primary)' }} />
          Meets requirement
        </span>
        <span className="inline-flex items-center gap-1.5" style={{ color: '#92400E' }}>
          <span className="size-2 rounded-full" style={{ background: 'var(--color-accent-amber)' }} />
          Weak
        </span>
        <span className="inline-flex items-center gap-1.5" style={{ color: '#9F1239' }}>
          <span className="size-2 rounded-full bg-rose-400" />
          Missing
        </span>
      </div>
    </div>
  )
}

export default SkillComparison

import { FiUser, FiBriefcase, FiClock, FiAward, FiHash } from 'react-icons/fi';

const avatarColors = {
  RS: 'from-blue-500 to-indigo-600',
  PS: 'from-violet-500 to-purple-600',
  AK: 'from-cyan-500 to-blue-600',
};

export default function EmployeeCard({ employee }) {
  const colorClass = avatarColors[employee.avatar] || 'from-blue-500 to-indigo-600';

  return (
    <div className="glass-card p-6 h-full">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0`}
        >
          {employee.avatar}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white font-display">{employee.name}</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <FiHash className="text-blue-400" size={13} />
            <span className="text-blue-400 text-sm font-semibold tracking-wide">{employee.id}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-transparent mb-5" />

      {/* Info rows */}
      <div className="space-y-3">
        <InfoRow icon={<FiBriefcase size={14} />} label="Department" value={employee.department} />
        <InfoRow icon={<FiAward size={14} />} label="Designation" value={employee.designation} />
        <InfoRow icon={<FiClock size={14} />} label="Experience" value={employee.experience} />
        <InfoRow icon={<FiUser size={14} />} label="Current Role" value={employee.currentRole} />
      </div>

      {/* Status badge */}
      <div className="mt-5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs text-emerald-400 font-semibold tracking-wide">ACTIVE PROFILE</span>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm text-slate-200 font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}

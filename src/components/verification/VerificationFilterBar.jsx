import { ArrowUpDown, Filter, Search } from 'lucide-react'

function VerificationFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  categories,
  sortOption,
  onSortChange,
  statusCounts = { all: 0, verified: 0, pending: 0, unverified: 0 },
}) {
  const statusTabs = [
    { id: 'all', label: 'All Skills', count: statusCounts.all },
    { id: 'verified', label: '✓ Verified', count: statusCounts.verified },
    { id: 'pending', label: 'Pending Review', count: statusCounts.pending },
    { id: 'unverified', label: 'Unverified', count: statusCounts.unverified },
  ]

  return (
    <div className="space-y-3">
      {/* Top Row: Search + Category + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search competencies, credentials, or evidence sources..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Dropdown */}
          <div className="relative inline-flex items-center">
            <Filter size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-8 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative inline-flex items-center">
            <ArrowUpDown size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-8 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="level-desc">Level: High to Low</option>
              <option value="level-asc">Level: Low to High</option>
              <option value="name-asc">Skill: A to Z</option>
              <option value="date-desc">Most Recently Verified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Row: Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-2">
        {statusTabs.map((tab) => {
          const active = statusFilter === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onStatusChange(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                active
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  active ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default VerificationFilterBar

import { Bell, ChevronDown, Search } from 'lucide-react'

function Header() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Workforce intelligence</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Real-work matching</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
          <Search size={16} />
          <span>Search workspace</span>
          <kbd className="ml-4 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400">/</kbd>
        </div>
        <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-emerald-500" />
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-2.5 py-2 text-left transition hover:bg-slate-50">
          <span className="grid size-8 place-items-center rounded-lg bg-slate-900 text-xs font-bold text-white">AM</span>
          <span className="hidden text-sm font-semibold text-slate-700 sm:block">Admin workspace</span>
          <ChevronDown size={15} className="text-slate-400" />
        </button>
      </div>
    </header>
  )
}

export default Header

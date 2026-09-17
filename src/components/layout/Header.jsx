import { useEffect, useRef, useState } from 'react'
import { Bell, BriefcaseBusiness, ChevronDown, Search, UserRound } from 'lucide-react'

function Header({ workspace = 'admin', onWorkspaceChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const selectWorkspace = (nextWorkspace) => {
    onWorkspaceChange?.(nextWorkspace)
    setMenuOpen(false)
  }

  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Workforce intelligence</p>
        <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900">{workspace === 'employee' ? 'Employee workspace' : 'Real-work matching'}</h1>
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
        <div ref={menuRef} className="relative">
          <button type="button" onClick={() => setMenuOpen((isOpen) => !isOpen)} className="flex items-center gap-2 rounded-xl border border-slate-200 px-2.5 py-2 text-left transition hover:bg-slate-50" aria-haspopup="menu" aria-expanded={menuOpen}>
            <span className={`grid size-8 place-items-center rounded-lg text-xs font-bold text-white ${workspace === 'employee' ? 'bg-emerald-600' : 'bg-slate-900'}`}>{workspace === 'employee' ? 'RS' : 'AM'}</span>
            <span className="hidden text-left sm:block">{workspace === 'employee' ? <><span className="block text-sm font-semibold text-slate-700">Rahul Sharma</span><span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-600">Employee workspace</span></> : <span className="text-sm font-semibold text-slate-700">Admin workspace</span>}</span>
            <ChevronDown size={15} className="text-slate-400" />
          </button>
          <div className={`${menuOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0'} absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl transition`} role="menu">
            <button type="button" onClick={() => selectWorkspace('admin')} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${workspace === 'admin' ? 'bg-slate-50 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`} role="menuitem"><BriefcaseBusiness size={16} />Admin workspace</button>
            <button type="button" onClick={() => selectWorkspace('employee')} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${workspace === 'employee' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`} role="menuitem"><UserRound size={16} />Employee workspace</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

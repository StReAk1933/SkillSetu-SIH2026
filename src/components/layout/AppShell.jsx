import { BarChart3, BookOpen, BriefcaseBusiness, CheckCircle2, ChevronRight, GraduationCap, LayoutDashboard, Network, ShieldCheck } from 'lucide-react'
import Header from './Header'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Competency', icon: Network },
  { label: 'Learning', icon: BookOpen },
  { label: 'Verification', icon: ShieldCheck },
  { label: 'Projects', icon: BriefcaseBusiness, active: true },
  { label: 'Simulation', icon: GraduationCap },
  { label: 'Impact', icon: BarChart3 },
]

function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-500 text-lg font-black text-white">S</span>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-slate-950">SkillSetu</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Skill intelligence</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? 'bg-emerald-50 text-emerald-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 2} />
              <span>{label}</span>
              {active && <ChevronRight size={15} className="ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="m-4 rounded-2xl bg-slate-900 p-4 text-white">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-lg bg-emerald-400/15 p-2 text-emerald-300"><CheckCircle2 size={17} /></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">SIH 2026</span>
          </div>
          <p className="text-sm font-semibold">Workforce readiness</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">Use verified capability data to staff the work that matters.</p>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default AppShell

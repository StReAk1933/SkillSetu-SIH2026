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
    <div className="min-h-screen text-slate-900 lg:flex" style={{ background: 'var(--color-bg)' }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        className="hidden w-64 shrink-0 flex-col lg:flex"
        style={{ background: 'var(--color-dark)', borderRight: '1px solid var(--color-dark-muted)' }}
      >
        {/* Logo */}
        <div
          className="flex h-20 items-center gap-3 px-6"
          style={{ borderBottom: '1px solid var(--color-dark-muted)' }}
        >
          <span
            className="grid size-10 place-items-center rounded-xl text-lg font-black text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)' }}
          >
            S
          </span>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-white">SkillSetu</p>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: 'var(--color-text-subtle)' }}
            >
              Skill intelligence
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          <p
            className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: 'var(--color-text-subtle)' }}
          >
            Workspace
          </p>
          {navigation.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition"
              style={
                active
                  ? {
                      background: 'var(--color-primary-muted)',
                      color: 'var(--color-primary-light)',
                      border: '1px solid rgba(0,184,122,0.2)',
                    }
                  : { color: '#94A3B8', border: '1px solid transparent' }
              }
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'var(--color-dark-muted)'
                  e.currentTarget.style.color = '#E2E8F0'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#94A3B8'
                }
              }}
            >
              <Icon size={18} strokeWidth={active ? 2.4 : 2} />
              <span>{label}</span>
              {active && <ChevronRight size={15} className="ml-auto" style={{ color: 'var(--color-primary)' }} />}
            </button>
          ))}
        </nav>

        {/* SIH 2026 promo card */}
        <div
          className="m-4 rounded-2xl p-4 text-white"
          style={{
            background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%)',
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span
              className="rounded-lg p-2"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#E0E7FF' }}
            >
              <CheckCircle2 size={17} />
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: '#C7D2FE' }}
            >
              SIH 2026
            </span>
          </div>
          <p className="text-sm font-semibold">Workforce readiness</p>
          <p className="mt-1 text-xs leading-5" style={{ color: '#C7D2FE' }}>
            Use verified capability data to staff the work that matters.
          </p>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────── */}
      <div className="min-w-0 flex-1">
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default AppShell

import { Bell, ChevronDown, Search } from 'lucide-react'

function Header() {
  return (
    <header
      className="flex min-h-20 items-center justify-between gap-4 px-5 py-4 lg:px-8"
      style={{
        background: 'var(--color-bg-card)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-primary)' }}
        >
          Workforce intelligence
        </p>
        <h1
          className="mt-1 text-xl font-bold tracking-tight"
          style={{ color: 'var(--color-text)' }}
        >
          Real-work matching
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div
          className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm md:flex"
          style={{
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg)',
            color: 'var(--color-text-muted)',
          }}
        >
          <Search size={16} />
          <span>Search workspace</span>
          <kbd
            className="ml-4 rounded px-1.5 py-0.5 text-[10px]"
            style={{
              border: '1px solid var(--color-border)',
              background: 'var(--color-bg-card)',
              color: 'var(--color-text-subtle)',
            }}
          >
            /
          </kbd>
        </div>

        {/* Bell */}
        <button
          className="relative rounded-xl p-2.5 transition"
          style={{
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
          }}
          aria-label="Notifications"
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <Bell size={18} />
          <span
            className="absolute right-2 top-2 size-1.5 rounded-full"
            style={{ background: 'var(--color-primary)' }}
          />
        </button>

        {/* User avatar */}
        <button
          className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-left transition"
          style={{ border: '1px solid var(--color-border)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <span
            className="grid size-8 place-items-center rounded-lg text-xs font-bold text-white"
            style={{ background: 'var(--color-dark)' }}
          >
            AM
          </span>
          <span
            className="hidden text-sm font-semibold sm:block"
            style={{ color: 'var(--color-text)' }}
          >
            Admin workspace
          </span>
          <ChevronDown size={15} style={{ color: 'var(--color-text-subtle)' }} />
        </button>
      </div>
    </header>
  )
}

export default Header

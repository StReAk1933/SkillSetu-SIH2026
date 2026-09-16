function PlaceholderPage({ title, description }) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
            SkillSetu Module
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-3 max-w-2xl text-slate-600">{description}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 font-semibold text-emerald-600">Integrated</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Prototype</p>
              <p className="mt-1 font-semibold text-slate-900">Ready</p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">Data Layer</p>
              <p className="mt-1 font-semibold text-slate-900">Demo / Mock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceholderPage

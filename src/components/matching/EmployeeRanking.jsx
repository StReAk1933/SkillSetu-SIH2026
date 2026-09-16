import { SlidersHorizontal, UsersRound } from 'lucide-react'
import EmployeeMatchCard from './EmployeeMatchCard'

function EmployeeRanking({ matches, onSelect }) {
  return (
    <section className="rounded-2xl border border-emerald-100 bg-emerald-50/25 p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3"><div><div className="flex items-center gap-2"><span className="grid size-8 place-items-center rounded-lg bg-emerald-500 text-white"><UsersRound size={17} /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">Decision support</p><h2 className="text-lg font-bold text-slate-900">Ranked talent pool</h2></div></div><p className="mt-2 text-xs text-slate-500">Sorted by explainable suitability score</p></div><div className="flex items-center gap-2"><span className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm sm:inline-flex">{matches.length} candidates</span><button className="hidden items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-xs font-semibold text-slate-500 sm:flex"><SlidersHorizontal size={14} />Score logic</button></div></div>
      {matches.length > 0 ? <div className="grid gap-3 xl:grid-cols-2">{matches.map((match, index) => <EmployeeMatchCard key={match.employee.id} match={match} rank={index + 1} onSelect={onSelect} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><p className="font-semibold text-slate-700">No employees match these filters</p><p className="mt-1 text-sm text-slate-500">Try lowering the minimum score or clearing the search.</p></div>}
    </section>
  )
}

export default EmployeeRanking

import { FolderKanban } from 'lucide-react'
import ProjectCard from './ProjectCard'

function ProjectList({ projects, selectedProjectId, onSelect }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Project portfolio</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">Available projects</h2>
        </div>
        <span className="rounded-lg bg-slate-100 p-2 text-slate-500"><FolderKanban size={17} /></span>
      </div>
      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} selected={project.id === selectedProjectId} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

export default ProjectList

import { profile } from "../data/profile";
import Section from "./Section";

export default function Projects() {
  return (
    <Section id="projects" eyebrow="what I've built" title="Projects">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {profile.projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:border-[var(--teal)]"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-lg font-medium">{project.name}</h3>
              <span className="shrink-0 font-mono text-xs text-[var(--muted)]">{project.period}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.description}</p>
            <ul className="mt-3 space-y-1.5">
              {project.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-6 text-[var(--muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--muted)]">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-4 font-mono text-sm">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[var(--teal)] hover:underline">
                  Live demo
                </a>
              )}
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[var(--teal)] hover:underline">
                  Source
                </a>
              ) : (
                <span className="text-[var(--muted)]" title="No repo link found in resume — add one in src/data/profile.ts">
                 
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

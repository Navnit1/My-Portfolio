import { profile } from "../data/profile";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" eyebrow="where I've worked" title="Experience">
      <ol className="space-y-8 border-l border-[var(--line)] pl-6">
        {profile.experience.map((job) => (
          <li key={`${job.role}-${job.org}`} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--teal)]" />
            <p className="font-mono text-xs text-[var(--muted)]">{job.period}</p>
            <h3 className="mt-1 font-display text-lg font-medium">{job.role}</h3>
            <p className="text-sm text-[var(--amber)]">{job.org}</p>
            <ul className="mt-3 space-y-1.5">
              {job.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-6 text-[var(--muted)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}

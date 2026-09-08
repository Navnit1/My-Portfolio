import { profile } from "../data/profile";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="education" eyebrow="where I studied" title="Education">
      <ol className="space-y-8 border-l border-[var(--line)] pl-6">
        {profile.education.map((e) => (
          <li key={e.institution} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--teal)]" />
            <p className="font-mono text-xs text-[var(--muted)]">{e.period}</p>
            <h3 className="mt-1 font-display text-lg font-medium">{e.degree}</h3>
            <p className="text-sm text-[var(--muted)]">{e.institution}</p>
           
            <div className="mt-3 flex flex-wrap gap-2">
              {e.coursework.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-[var(--muted)]"
                >
                  {c}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

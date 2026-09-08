import { profile } from "../data/profile";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" eyebrow="what I work with" title="Skills">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {Object.entries(profile.skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-display text-sm font-medium text-[var(--text)]">{category}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--muted)] transition hover:border-[var(--teal)] hover:text-[var(--text)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

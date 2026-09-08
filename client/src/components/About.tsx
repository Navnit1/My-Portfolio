import { profile } from "../data/profile";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" eyebrow="who I am" title="About">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_260px]">
        <p className="max-w-[62ch] text-[15px] leading-7 text-[var(--muted)]">{profile.summary}</p>

        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
          <dl className="space-y-3 font-mono text-xs">
            <div>
              <dt className="text-[var(--muted)]">Email</dt>
              <dd className="mt-0.5 text-[var(--text)]">
                <a href={`mailto:${profile.email}`} className="hover:text-[var(--teal)]">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">Location</dt>
              <dd className="mt-0.5 text-[var(--text)]">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">LinkedIn</dt>
              <dd className="mt-0.5 truncate text-[var(--text)]">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-[var(--teal)]">
                  {profile.links.linkedin.replace("https://", "")}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--muted)]">GitHub</dt>
              <dd className="mt-0.5 truncate text-[var(--text)]">
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-[var(--teal)]">
                  {profile.links.github.replace("https://", "")}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {profile.personalNote && (
  <p className="mt-8 max-w-[62ch] text-[15px] leading-7 text-[var(--muted)]">{profile.personalNote}</p>
)}
    </Section>
  );
}

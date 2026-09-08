import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 font-mono text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Software Web Devloper</span>
      </div>
    </footer>
  );
}

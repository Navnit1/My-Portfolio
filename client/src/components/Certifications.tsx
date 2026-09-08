import { useState } from "react";
import { profile } from "../data/profile";
import Section from "./Section";

export default function Certifications() {
  const [openCert, setOpenCert] = useState<(typeof profile.certifications)[number] | null>(null);

  return (
    <Section id="certifications" eyebrow="what I've certified" title="Certifications">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {profile.certifications.map((cert) => {
          const cardClass =
            "rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 transition hover:border-[var(--teal)]";

          const content = (
            <>
              <div
                className="flex h-32 items-center justify-center overflow-hidden rounded-md border border-dashed border-[var(--line)] bg-[var(--surface-2)]"
                onClick={(e) => {
                  if (cert.file) {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenCert(cert);
                  }
                }}
              >
                {cert.file ? (
                  <img
                    src={cert.file}
                    alt={cert.name}
                    draggable={false}
                    className="h-full w-full cursor-zoom-in object-cover"
                  />
                ) : (
                  <span className="px-3 text-center font-mono text-xs text-[var(--muted)]">
                    Certificate file not uploaded yet
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-sm font-medium leading-5">{cert.name}</h3>
              <p className="mt-1 text-sm text-[var(--amber)]">{cert.org}</p>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                {[cert.date, cert.validTill ? `valid till ${cert.validTill}` : null].filter(Boolean).join(" · ") ||
                  "Date not specified"}
              </p>
              {cert.credentialId && (
                <p className="mt-2 font-mono text-xs text-[var(--muted)]">ID: {cert.credentialId}</p>
              )}
            </>
          );

          return cert.credentialUrl ? (
            <a key={cert.name} href={cert.credentialUrl} target="_blank" rel="noreferrer" className={`block ${cardClass}`}>
              {content}
            </a>
          ) : (
            <div key={cert.name} className={cardClass}>
              {content}
            </div>
          );
        })}
      </div>

      {openCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
          onClick={() => setOpenCert(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setOpenCert(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-[var(--teal)] hover:text-[var(--teal)]"
          >
            ✕
          </button>
          <img
            src={openCert.file ?? ""}
            alt={openCert.name}
            className="max-h-[90vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Section>
  );
}
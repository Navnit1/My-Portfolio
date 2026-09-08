import { useState, type FormEvent } from "react";
import { profile } from "../data/profile";
import Section from "./Section";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // IMPORTANT:
    // Save the form reference before using await.
    const formElement = e.currentTarget;

    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(formElement);

    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success
      setStatus("sent");

      // Reset the form using the saved reference
      formElement.reset();

    } catch (err) {
      setStatus("error");

      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="let's talk"
      title="Contact"
    >
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-[1fr_320px]">

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Name */}
            <input
              name="name"
              required
              placeholder="Your name"
              className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--teal)]"
            />

            {/* Email */}
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--teal)]"
            />

          </div>

          {/* Subject */}
          <input
            name="subject"
            required
            placeholder="Subject"
            className="w-full rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--teal)]"
          />

          {/* Message */}
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            className="w-full rounded-md border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--muted)] focus:border-[var(--teal)]"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-[var(--teal)] px-5 py-2.5 text-sm font-medium text-[#0d1117] transition hover:brightness-110 disabled:opacity-60"
          >
            {status === "sending"
              ? "Sending…"
              : "Send message"}
          </button>

          {/* Success Message */}
          {status === "sent" && (
            <p className="font-mono text-xs text-[var(--teal)]">
              Message sent — thanks for reaching out.
            </p>
          )}

          {/* Error Message */}
          {status === "error" && (
            <p className="font-mono text-xs text-red-400">
              {errorMsg}
            </p>
          )}
        </form>

        {/* Direct Contact Information */}
        <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">

          <p className="font-mono text-xs text-[var(--muted)]">
            Direct
          </p>

          {/* Email */}
          <a
            href={`mailto:${profile.email}`}
            className="mt-1 block text-sm hover:text-[var(--teal)]"
          >
            {profile.email}
          </a>

          {/* Phone */}
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="mt-1 block text-sm hover:text-[var(--teal)]"
          >
            {profile.phone}
          </a>

          {/* Social Links */}
          <div className="mt-4 flex items-center gap-3">

            {/* GitHub */}
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--teal)] hover:text-[var(--teal)]"
            >
              <svg
                viewBox="0 0 19 19"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--teal)] hover:text-[var(--teal)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </Section>
  );
}
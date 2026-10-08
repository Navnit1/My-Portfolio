// ─────────────────────────────────────────────────────────────
// CONTACT PAGE
// Direct channels, copy-to-clipboard, resilient contact form
// with backend API integration and mailto fallback
// ─────────────────────────────────────────────────────────────

import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  Code2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/BrandIcons";
import PageWrapper from "../components/PageWrapper";
import CompanionBot from "../components/CompanionBot";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

interface ContactPageProps {
  onOpenResume?: () => void;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage({ onOpenResume }: ContactPageProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            "Unable to deliver message through local server endpoint."
        );
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.warn("Contact form server error, offering direct email action:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to transmit via server. You can also send directly via email below."
      );
    }
  };

  const handleOpenMailClient = () => {
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  return (
    <PageWrapper
      title={`Contact & Hire — ${PORTFOLIO_CONFIG.name}`}
      description="Connect directly with Navnit Kumar for Software Development Engineer and Full-Stack opportunities, internships, and technical collaboration."
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>/get-in-touch</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Let&rsquo;s Build Something High-Impact Together.
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            I am actively interviewing for <strong className="text-white">Software Development Engineer (SDE)</strong> roles and <strong className="text-white">Full-Stack Developer</strong> opportunities. Reach out directly or dispatch a note below.
          </p>
        </section>

        {/* ────────── Main Grid ────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Channels & Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-semibold">Candidate Status</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                {PORTFOLIO_CONFIG.availabilityStatus}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Available for immediate joining, technical evaluations, algorithmic challenges, and engineering interviews.
              </p>
              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>View Verified Resume</span>
                </button>
              )}
            </div>

            {/* Direct Channels */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-4">
              <h3 className="font-display text-base font-semibold text-white">
                Direct Communication
              </h3>

              {/* Email with copy */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                  <a
                    href={`mailto:${PORTFOLIO_CONFIG.email}`}
                    className="truncate text-slate-200 hover:text-cyan-400"
                  >
                    {PORTFOLIO_CONFIG.email}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_CONFIG.email, "email")}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                  title="Copy email"
                >
                  {copiedField === "email" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone with copy */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-200">{PORTFOLIO_CONFIG.phone}</span>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_CONFIG.phone, "phone")}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition"
                  title="Copy phone"
                >
                  {copiedField === "phone" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs font-mono text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{PORTFOLIO_CONFIG.location}</span>
              </div>
            </div>

            {/* Social Hub */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">
                Professional Networks
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <a
                  href={PORTFOLIO_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-center flex flex-col items-center gap-1.5 hover:text-cyan-300 transition"
                >
                  <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-center flex flex-col items-center gap-1.5 hover:text-cyan-300 transition"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_CONFIG.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-center flex flex-col items-center gap-1.5 hover:text-cyan-300 transition"
                >
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Send a Direct Dispatch
                  </h2>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Integrated with backend mail proxy and fallback routing
                  </p>
                </div>
                <CompanionBot size="sm" showBadge={false} />
              </div>

              {/* Status Message Banners */}
              {status === "success" && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Message Transmitted!</strong>
                    Thank you for reaching out. I typically respond within 24 hours.
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Notice:</strong>
                      {errorMessage}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenMailClient}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-[11px] hover:bg-amber-400 transition"
                  >
                    <span>Click to open in your default mail app</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. SDE Opportunity / Full-Stack Project Collaboration"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your role requirements, team stack, or project scope..."
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 font-semibold text-sm font-mono transition shadow-lg shadow-cyan-950/40 disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <span>Transmitting Dispatch...</span>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT PAGE
// Direct channels, copy-to-clipboard, resilient contact form
// with backend API integration and mailto fallback
// Styled with White + Burgundy design system
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-14">
        {/* ────────── Header Banner ────────── */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1ECE3] border border-[#D8CFC3] text-xs font-mono text-[#7A1F35] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7A1F35] animate-pulse" />
            <span>/get-in-touch</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#211C1D] leading-tight">
            Let&rsquo;s Build Something High-Impact Together.
          </h1>
          <p className="text-[#625A58] text-base sm:text-lg leading-relaxed">
            I am actively interviewing for <strong className="text-[#211C1D]">Software Development Engineer (SDE)</strong> roles and <strong className="text-[#211C1D]">Full-Stack Developer</strong> opportunities. Reach out directly or dispatch a note below.
          </p>
        </section>

        {/* ────────── Main Grid ────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Channels & Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <div className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <span>Candidate Status</span>
              </div>
              <h3 className="font-display text-xl font-bold text-[#211C1D]">
                {PORTFOLIO_CONFIG.availabilityStatus}
              </h3>
              <p className="text-xs sm:text-sm text-[#625A58] leading-relaxed">
                Available for immediate joining, technical evaluations, algorithmic challenges, and engineering interviews.
              </p>
              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D8CFC3] bg-[#F8F5EF] hover:bg-[#F1ECE3] text-[#211C1D] text-xs font-mono transition shadow-xs"
                >
                  <FileText className="w-4 h-4 text-[#7A1F35]" />
                  <span>View Verified Resume</span>
                </button>
              )}
            </div>

            {/* Direct Channels */}
            <div className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card space-y-4">
              <h3 className="font-display text-base font-semibold text-[#211C1D]">
                Direct Communication
              </h3>

              {/* Email with copy */}
              <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#D8CFC3] flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#7A1F35] shrink-0" />
                  <a
                    href={`mailto:${PORTFOLIO_CONFIG.email}`}
                    className="truncate text-[#211C1D] hover:text-[#7A1F35]"
                  >
                    {PORTFOLIO_CONFIG.email}
                  </a>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_CONFIG.email, "email")}
                  className="p-1.5 rounded-lg text-[#625A58] hover:text-[#7A1F35] hover:bg-[#F1ECE3] transition"
                  title="Copy email"
                >
                  {copiedField === "email" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone with copy */}
              <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#D8CFC3] flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#7A1F35] shrink-0" />
                  <span className="text-[#211C1D]">{PORTFOLIO_CONFIG.phone}</span>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_CONFIG.phone, "phone")}
                  className="p-1.5 rounded-lg text-[#625A58] hover:text-[#7A1F35] hover:bg-[#F1ECE3] transition"
                  title="Copy phone"
                >
                  {copiedField === "phone" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#D8CFC3] flex items-center gap-2.5 text-xs font-mono text-[#625A58]">
                <MapPin className="w-4 h-4 text-[#7A1F35] shrink-0" />
                <span className="text-[#211C1D]">{PORTFOLIO_CONFIG.location}</span>
              </div>
            </div>

            {/* Social Hub */}
            <div className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card space-y-3">
              <h3 className="font-display text-sm font-semibold text-[#211C1D]">
                Professional Networks
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <a
                  href={PORTFOLIO_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] hover:border-[#7A1F35]/50 text-center flex flex-col items-center gap-1.5 text-[#211C1D] hover:text-[#7A1F35] transition shadow-xs"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#7A1F35]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] hover:border-[#7A1F35]/50 text-center flex flex-col items-center gap-1.5 text-[#211C1D] hover:text-[#7A1F35] transition shadow-xs"
                >
                  <GithubIcon className="w-4 h-4 text-[#7A1F35]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_CONFIG.leetcodeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] hover:border-[#7A1F35]/50 text-center flex flex-col items-center gap-1.5 text-[#211C1D] hover:text-[#7A1F35] transition shadow-xs"
                >
                  <Code2 className="w-4 h-4 text-[#7A1F35]" />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFCF7] border border-[#D8CFC3] shadow-warm-card relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E6DED3]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#211C1D]">
                    Send a Direct Dispatch
                  </h2>
                  <p className="text-xs font-mono text-[#625A58] mt-0.5">
                    Integrated with backend mail proxy and fallback routing
                  </p>
                </div>
                <CompanionBot size="sm" />
              </div>

              {/* Status Message Banners */}
              {status === "success" && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 text-xs font-mono flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
                  <div>
                    <strong className="block font-semibold">Message Transmitted!</strong>
                    Thank you for reaching out. I typically respond within 24 hours.
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-mono space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                    <div>
                      <strong className="block font-semibold">Notice:</strong>
                      {errorMessage}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenMailClient}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7A1F35] text-white font-semibold text-[11px] hover:bg-[#962D46] transition shadow-xs"
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
                    <label className="block text-xs font-mono text-[#625A58] uppercase tracking-wider font-semibold">
                      Your Name <span className="text-[#7A1F35]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] px-4 py-3 text-sm text-[#211C1D] placeholder:text-[#8B8178] focus:outline-none focus:border-[#7A1F35] transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-[#625A58] uppercase tracking-wider font-semibold">
                      Your Email <span className="text-[#7A1F35]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] px-4 py-3 text-sm text-[#211C1D] placeholder:text-[#8B8178] focus:outline-none focus:border-[#7A1F35] transition"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#625A58] uppercase tracking-wider font-semibold">
                    Subject <span className="text-[#7A1F35]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. SDE Opportunity / Full-Stack Project Collaboration"
                    className="w-full rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] px-4 py-3 text-sm text-[#211C1D] placeholder:text-[#8B8178] focus:outline-none focus:border-[#7A1F35] transition"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-[#625A58] uppercase tracking-wider font-semibold">
                    Message <span className="text-[#7A1F35]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your role requirements, team stack, or project scope..."
                    className="w-full rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] px-4 py-3 text-sm text-[#211C1D] placeholder:text-[#8B8178] focus:outline-none focus:border-[#7A1F35] transition resize-none leading-relaxed"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white font-semibold text-sm font-mono transition shadow-md shadow-[#7A1F35]/20 disabled:opacity-50"
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

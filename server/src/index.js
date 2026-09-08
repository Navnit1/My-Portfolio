import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { Resend } from "resend";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);
const __dirname = dirname(fileURLToPath(import.meta.url));
const MESSAGES_FILE = join(__dirname, "..", "data", "messages.json");

const app = express();
const PORT = process.env.PORT || 5050;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json({ limit: "20kb" }));

// ── Simple, file-based storage ───────────────────────────────
// This starter uses a JSON file so the project runs with zero
// external services. Swap this for a MongoDB model (see
// docs/EDITING_YOUR_PORTFOLIO.md) when you're ready for the full
// Admin Dashboard + database described in the original spec.
async function readMessages() {
  if (!existsSync(MESSAGES_FILE)) return [];
  const raw = await readFile(MESSAGES_FILE, "utf-8");
  return raw.trim() ? JSON.parse(raw) : [];
}
async function appendMessage(message) {
  const messages = await readMessages();
  messages.push(message);
  await writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2));
}

// ── Rate limiting on the contact endpoint ────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages sent. Please try again later." },
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  if (typeof name !== "string" || name.length > 120) {
    return res.status(400).json({ error: "Name is invalid." });
  }
  if (typeof email !== "string" || !isValidEmail(email) || email.length > 200) {
    return res.status(400).json({ error: "Please provide a valid email." });
  }
  if (typeof subject !== "string" || subject.length > 200) {
    return res.status(400).json({ error: "Subject is invalid." });
  }
  if (typeof message !== "string" || message.length < 5 || message.length > 5000) {
    return res.status(400).json({ error: "Message must be between 5 and 5000 characters." });
  }

  try {
    await appendMessage({
      name,
      email,
      subject,
      message,
      receivedAt: new Date().toISOString(),
    });
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.CONTACT_TO_EMAIL || "navnitf57@gmail.com",
        replyTo: email,
        subject: `Portfolio contact: ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
    } catch (mailErr) {
      console.error("Failed to send email notification:", mailErr);
    }

    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Failed to store contact message:", err);
    return res.status(500).json({ error: "Could not save your message right now. Please try again." });
  }
});

// Read-only endpoint for you (the owner) to check messages without a DB browser.
// In production, put this behind the Admin auth described in docs/EDITING_YOUR_PORTFOLIO.md.
app.get("/api/messages", async (_req, res) => {
  const messages = await readMessages();
  res.json(messages);
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Portfolio API listening on http://localhost:${PORT}`);
});

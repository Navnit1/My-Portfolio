// ─────────────────────────────────────────────────────────────
// COMPACT AI CHATBOT COMPONENT
// Grounded in verified portfolio data, unobtrusive floating launcher
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Bot,
  Sparkles,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getBotResponse,
  SUGGESTED_QUESTIONS,
  type ChatMessage,
} from "../services/chatbotService";
import { PORTFOLIO_CONFIG } from "../data/portfolioData";

let chatMsgId = 0;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: `Hi there! I'm ${PORTFOLIO_CONFIG.name}'s virtual coding assistant. Ask me anything about his technical stack, full-stack projects, LeetCode stats, or availability for software roles!`,
      timestamp: "Just now",
      links: [
        { label: "View Projects", url: "/projects" },
        { label: "LeetCode Profile", url: PORTFOLIO_CONFIG.leetcodeUrl, isExternal: true },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMessage: ChatMessage = {
      id: `user-${++chatMsgId}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Realistic typing delay (350 - 650ms)
    setTimeout(() => {
      const response = getBotResponse(query);
      const botMessage: ChatMessage = {
        id: `bot-${++chatMsgId}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: response.links,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: `Chat reset! Feel free to ask about ${PORTFOLIO_CONFIG.name}'s tech stack, simulations, or project case studies.`,
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 border border-slate-700/80 text-white shadow-xl shadow-cyan-950/30 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all"
      >
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/15 text-cyan-400">
          <Bot className="w-4 h-4 animate-bot-float" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900 animate-pulse" />
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="font-display font-semibold text-xs leading-none text-slate-100">
            Ask Assistant
          </span>
          <span className="font-mono text-[10px] text-cyan-400 leading-tight">
            AI Companion
          </span>
        </div>
      </motion.button>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[580px] h-[78vh] flex flex-col bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                    Nexus Companion
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                      Local AI
                    </span>
                  </h3>
                  <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Portfolio Knowledge
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition"
                  title="Reset Chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-300">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-cyan-500 text-slate-950 font-medium rounded-br-xs shadow-md"
                        : "bg-slate-800/90 border border-slate-700/60 text-slate-200 rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional bot action buttons / links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                      {msg.links.map((link, idx) =>
                        link.isExternal ? (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950 border border-cyan-800/60 text-[11px] font-mono text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500 transition"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3 text-cyan-400" />
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            to={link.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-700 text-[11px] font-mono text-slate-200 hover:border-cyan-500 hover:text-cyan-300 transition"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3 h-3 text-cyan-400" />
                          </Link>
                        )
                      )}
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-slate-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 w-fit rounded-bl-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Chips */}
            <div className="px-3 py-2 border-t border-slate-800/80 bg-slate-950/40">
              <p className="text-[10px] font-mono text-slate-500 mb-1.5">
                Suggested questions:
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {SUGGESTED_QUESTIONS.slice(0, 4).map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-[10px] font-mono text-slate-300 hover:text-cyan-300 transition whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-3 border-t border-slate-800 bg-slate-950"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects, LeetCode..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2 rounded-xl bg-cyan-500 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-400 transition"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

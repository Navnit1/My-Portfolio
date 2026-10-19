// ─────────────────────────────────────────────────────────────
// COMPACT AI CHATBOT COMPONENT
// Grounded in verified portfolio data, unobtrusive floating launcher
// Styled with White + Burgundy design system
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  Bot,
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
      text: `Hi there! I'm ${PORTFOLIO_CONFIG.name}'s virtual assistant. Ask me anything about his technical stack, full-stack projects, LeetCode stats, or availability for software engineering roles!`,
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
    if (!textToSend) setInput("");
    setIsTyping(true);

    // Simulate conversational typing delay
    setTimeout(() => {
      const response = getBotResponse(query);
      const botMessage: ChatMessage = {
        id: `bot-${++chatMsgId}`,
        sender: "bot",
        text: response.text,
        links: response.links,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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
        id: "initial-reset",
        sender: "bot",
        text: `Conversation refreshed. How else can I help you explore ${PORTFOLIO_CONFIG.name}'s qualifications?`,
        timestamp: "Just now",
        links: [
          { label: "View Projects", url: "/projects" },
          { label: "Contact Navnit", url: "/contact" },
        ],
      },
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#7A1F35] hover:bg-[#962D46] text-white shadow-lg shadow-[#7A1F35]/25 border border-white/20 transition-all hover:scale-105 select-none"
        aria-label={isOpen ? "Close Assistant" : "Open Assistant"}
      >
        <Bot className="w-5 h-5 text-white" />
        <span className="hidden sm:inline font-mono text-xs font-semibold">
          {isOpen ? "Close Assistant" : "Ask Navnit AI"}
        </span>
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
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
            className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[580px] h-[78vh] flex flex-col bg-[#FFFCF7] border border-[#D8CFC3] rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E6DED3] bg-[#F1ECE3]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#7A1F35]/10 border border-[#7A1F35]/20 flex items-center justify-center text-[#7A1F35]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm text-[#211C1D] flex items-center gap-1.5">
                    Navnit&rsquo;s Assistant
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#7A1F35] text-white">
                      Verified AI
                    </span>
                  </h3>
                  <p className="text-[10px] font-mono text-emerald-800 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Portfolio Grounded
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-[#625A58] hover:text-[#211C1D] hover:bg-[#E6DED3] transition"
                  title="Reset Chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[#625A58] hover:text-[#211C1D] hover:bg-[#E6DED3] transition"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4 text-[#7A1F35]" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-[#211C1D]">
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
                        ? "bg-[#7A1F35] text-white font-medium rounded-br-xs shadow-xs"
                        : "bg-[#F8F5EF] border border-[#D8CFC3] text-[#211C1D] rounded-bl-xs shadow-xs"
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
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-[11px] font-mono text-[#7A1F35] font-semibold hover:bg-[#F1ECE3] transition shadow-xs"
                          >
                            <span>{link.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            to={link.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-[11px] font-mono text-[#7A1F35] font-semibold hover:bg-[#F1ECE3] transition shadow-xs"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )
                      )}
                    </div>
                  )}

                  <span className="text-[9px] font-mono text-[#8B8178] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#F8F5EF] border border-[#D8CFC3] w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F35] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F35] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1F35] animate-bounce [animation-delay:0.3s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Queries */}
            <div className="px-3 py-2 border-t border-[#E6DED3] bg-[#F8F5EF] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-[#FFFCF7] border border-[#D8CFC3] text-[10px] font-mono text-[#625A58] hover:text-[#7A1F35] hover:border-[#7A1F35]/40 transition whitespace-nowrap shadow-xs"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Input Field */}
            <form onSubmit={handleSubmit} className="p-3 bg-[#FFFCF7] border-t border-[#E6DED3]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects, LeetCode..."
                  className="flex-1 rounded-xl bg-[#F8F5EF] border border-[#D8CFC3] px-3.5 py-2 text-xs text-[#211C1D] placeholder:text-[#8B8178] focus:outline-none focus:border-[#7A1F35] font-mono transition"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-2 rounded-xl bg-[#7A1F35] hover:bg-[#962D46] text-white disabled:opacity-40 transition shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

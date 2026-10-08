// ─────────────────────────────────────────────────────────────
// CHATBOT KNOWLEDGE BASE & QUERY ENGINE
// Strictly grounds responses in verified portfolio data.
// Zero hallucination, zero external API keys needed.
// ─────────────────────────────────────────────────────────────

import {
  PORTFOLIO_CONFIG,
  PROJECTS_DATA,
  CERTIFICATIONS_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
} from "../data/portfolioData";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  links?: { label: string; url: string; isExternal?: boolean }[];
}

export const SUGGESTED_QUESTIONS = [
  "What is your tech stack?",
  "Tell me about your projects",
  "What are your LeetCode stats?",
  "What experience & simulations do you have?",
  "Are you available for internships / hiring?",
  "How can I contact you?",
];

export function getBotResponse(userPrompt: string): {
  text: string;
  links?: { label: string; url: string; isExternal?: boolean }[];
} {
  const query = userPrompt.toLowerCase().trim();

  // Who are you / Introduction
  if (
    query.includes("who are you") ||
    query.includes("about you") ||
    query.includes("introduce") ||
    query.includes("bio") ||
    query.includes("who is navnit")
  ) {
    return {
      text: `I'm ${PORTFOLIO_CONFIG.name}, a ${PORTFOLIO_CONFIG.title} and final-year B.Tech (IT) student at IKG Punjab Technical University. I build scalable full-stack web applications and AI-integrated systems using React, Node.js, and modern cloud stacks, while strengthening core algorithmic problem-solving with Striver's A2Z DSA sheet.`,
      links: [
        { label: "View About Page", url: "/about" },
        { label: "Download Resume", url: "#resume" },
      ],
    };
  }

  // Skills & Technologies
  if (
    query.includes("skill") ||
    query.includes("tech") ||
    query.includes("stack") ||
    query.includes("language") ||
    query.includes("framework") ||
    query.includes("react") ||
    query.includes("node")
  ) {
    return {
      text: `Here is a summary of my technical toolkit:\n\n• Frontend: React.js, Next.js, Tailwind CSS, Responsive Design\n• Backend: Node.js, Express.js, REST APIs, JWT Authentication\n• Databases: MongoDB, MySQL, H2 In-Memory\n• AI & Cloud: LLM API Integration, Oracle Cloud AI Associate, Prompt Engineering\n• CS Fundamentals: DSA, OOP, DBMS, OS, Computer Networks\n• Tools: Git, GitHub, Postman, Vercel, VS Code`,
      links: [{ label: "Explore Interactive Skills", url: "/skills" }],
    };
  }

  // Projects
  if (
    query.includes("project") ||
    query.includes("build") ||
    query.includes("work") ||
    query.includes("portfolio") ||
    query.includes("resume analyser") ||
    query.includes("vmc")
  ) {
    const list = PROJECTS_DATA.map(
      (p) => `• ${p.name} (${p.category}): ${p.tagline}`
    ).join("\n");
    return {
      text: `I have delivered key full-stack and AI-integrated applications:\n\n${list}\n\nBoth projects are deployed live in production on Vercel with dedicated case studies!`,
      links: [
        { label: "AI Resume Analyser Case Study", url: "/projects/ai-resume-analyser" },
        { label: "VMC Platform Case Study", url: "/projects/vmc-coaching-site" },
        { label: "All Projects", url: "/projects" },
      ],
    };
  }

  // Strongest project
  if (query.includes("strongest") || query.includes("best project") || query.includes("favorite")) {
    const p = PROJECTS_DATA[0];
    return {
      text: `My standout project is the ${p.name}. It leverages an LLM API to parse candidate resumes against target job descriptions in real time, detecting critical ATS keyword discrepancies, computing match percentages, and generating tailored bullet point improvements. I owned the entire end-to-end delivery from React frontend to backend API integration and Vercel cloud deployment.`,
      links: [
        { label: "View Case Study", url: `/projects/${p.slug}` },
        { label: "Live Demo", url: p.liveUrl, isExternal: true },
      ],
    };
  }

  // LeetCode / DSA / Problem Solving
  if (
    query.includes("leetcode") ||
    query.includes("dsa") ||
    query.includes("algo") ||
    query.includes("problem") ||
    query.includes("striver") ||
    query.includes("coding profile")
  ) {
    return {
      text: `I am an active practitioner on LeetCode (@${PORTFOLIO_CONFIG.leetcodeUsername}), systematically solving problems following the Striver A2Z DSA sheet. I have solved 100+ problems across Arrays, Strings, LinkedLists, Trees, and Dynamic Programming, with a verified Microsoft Coursera DSA certification credential.`,
      links: [
        { label: "View LeetCode Profile", url: PORTFOLIO_CONFIG.leetcodeUrl, isExternal: true },
        { label: "View Achievements & Certs", url: "/achievements" },
      ],
    };
  }

  // GitHub / Repos
  if (query.includes("github") || query.includes("repo") || query.includes("open source")) {
    return {
      text: `My GitHub handle is @${PORTFOLIO_CONFIG.githubUsername}. You can explore repositories covering my full-stack web applications, AI API integrations, and code experiments.`,
      links: [
        { label: "Visit GitHub Profile", url: PORTFOLIO_CONFIG.githubUrl, isExternal: true },
      ],
    };
  }

  // Experience / Internships / Simulations
  if (
    query.includes("experience") ||
    query.includes("intern") ||
    query.includes("job") ||
    query.includes("jpmorgan") ||
    query.includes("deloitte") ||
    query.includes("forage")
  ) {
    const items = EXPERIENCE_DATA.map(
      (e) => `• ${e.role} at ${e.org} (${e.period})`
    ).join("\n");
    return {
      text: `Here is an overview of my professional experience and simulations:\n\n${items}\n\nKey highlights include backend REST controller development and Kafka streaming simulation at JPMorgan Chase, and 6-week hands-on AI and Frontend internships via AICTE + IBM SkillsBuild!`,
      links: [{ label: "View Experience Timeline", url: "/experience" }],
    };
  }

  // Certifications / Achievements
  if (
    query.includes("certif") ||
    query.includes("achievement") ||
    query.includes("oracle") ||
    query.includes("coursera") ||
    query.includes("license")
  ) {
    const certs = CERTIFICATIONS_DATA.map(
      (c) => `• ${c.name} — ${c.org} (${c.date})`
    ).join("\n");
    return {
      text: `I hold 8 verified technical certifications, including:\n\n${certs}\n\nYou can view and zoom in on all original verified certificates in the Achievements gallery.`,
      links: [{ label: "View Certificates Lightbox", url: "/achievements" }],
    };
  }

  // Education
  if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("university")) {
    const edu = EDUCATION_DATA[0];
    return {
      text: `I am pursuing my ${edu.degree} in ${edu.major} at ${edu.institution} (${edu.period}). My key academic coursework includes Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Web Technologies.`,
      links: [{ label: "View About & Education", url: "/about" }],
    };
  }

  // Availability / Hiring / Internships
  if (
    query.includes("available") ||
    query.includes("hire") ||
    query.includes("opportunity") ||
    query.includes("internship") ||
    query.includes("job") ||
    query.includes("join")
  ) {
    return {
      text: `Yes! I am actively looking for SDE (Software Development Engineer) and Full Stack Developer entry-level positions and internships. I am ready to join immediately and contribute to high-impact engineering teams.`,
      links: [
        { label: "Get in Touch", url: "/contact" },
        { label: `Email ${PORTFOLIO_CONFIG.email}`, url: `mailto:${PORTFOLIO_CONFIG.email}`, isExternal: true },
      ],
    };
  }

  // Contact / Social / Email / Phone
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("phone") ||
    query.includes("call") ||
    query.includes("reach") ||
    query.includes("linkedin")
  ) {
    return {
      text: `You can reach me directly via:\n• Email: ${PORTFOLIO_CONFIG.email}\n• Phone: ${PORTFOLIO_CONFIG.phone}\n• Location: ${PORTFOLIO_CONFIG.location}\n• LinkedIn: linkedin.com/in/navnit-kumar-110ab8323\n\nFeel free to send a message through the contact form as well!`,
      links: [
        { label: "Go to Contact Page", url: "/contact" },
        { label: "LinkedIn Profile", url: PORTFOLIO_CONFIG.linkedinUrl, isExternal: true },
      ],
    };
  }

  // Default fallback with helpful menu
  return {
    text: `I'm Navnit's virtual coding assistant. I can answer anything about his technical stack, full-stack projects (AI Resume Analyser, VMC Platform), LeetCode stats, JPMorgan/Deloitte simulations, certifications, and availability for SDE roles. What would you like to explore?`,
    links: [
      { label: "View Projects", url: "/projects" },
      { label: "View Skills", url: "/skills" },
      { label: "Contact Navnit", url: "/contact" },
    ],
  };
}

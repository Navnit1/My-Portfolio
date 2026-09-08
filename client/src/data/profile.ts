// ─────────────────────────────────────────────────────────────
// PORTFOLIO DATA — single source of truth
// Every value here comes from the uploaded resume unless marked
// as a PLACEHOLDER. Edit this file (or wire it to a CMS/backend
// later) to update the live site — no component code changes needed.
// See docs/MISSING_INFORMATION.md for exactly what still needs
// to be filled in.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Navnit Kumar",
  title: "Software Development Engineer",
  subtitle: "Full Stack Developer",
  roles: ["Full Stack Developer.", "SDE Aspirant.", "MERN Builder."],
  email: "navnitf57@gmail.com",
  phone: "+91 88776 20672",
  location: "Muzaffarpur, Bihar, India",
  links: {
    linkedin: "https://linkedin.com/in/navnitkumar",
    github: "https://github.com/Navnit1",
  },
  summary:
    "Final-year B.Tech (IT) student and Full Stack / SDE aspirant with hands-on experience building and deploying full-stack and AI-integrated web applications using the MERN stack. Completed a JPMorgan Chase & Co. Software Engineering Job Simulation covering REST API design, alongside Deloitte's Technology Job Simulation. Active LeetCode practitioner (Striver A2Z) strengthening DSA fundamentals. Seeking SDE / Full Stack Developer internships and entry-level roles.",

  // PLACEHOLDER — no personal narrative was in the resume.
  // Edit this once you have a paragraph you're comfortable sharing publicly.
  personalNote: null as string | null,

  // PLACEHOLDER — no photo was provided with the resume.
  profileImage: null as string | null,

  skills: {
    Languages: ["JavaScript (ES6+)", "Python", "HTML5", "CSS3"],
    Frontend: ["React.js", "Next.js", "Tailwind CSS", "Responsive Web Design"],
    Backend: ["Node.js", "Express.js", "JWT Authentication"],
    Databases: ["MongoDB", "MySQL"],
    "Tools & Platforms": ["Git", "GitHub", "Vercel", "Netlify", "VS Code"],
    "CS Fundamentals": [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "MVC Architecture",
    ],
  } as Record<string, string[]>,

  education: [
    {
      institution: "IKG Punjab Technical University (PTU)",
      degree: "B.Tech, Information Technology",
      period: "2023 – 2027",
      // detail: "CGPA: 8.14 (6th Sem)",
      coursework: [
        "Data Structures",
        "Algorithms",
        "DBMS",
        "Operating Systems",
        "Computer Networks",
        "OOP",
        "Web Technologies",
      ],
    },
  ],

  experience: [
    {
      role: "Software Engineering Job Simulation",
      org: "JPMorgan Chase & Co. (via Forage)",
      period: "May 2026",
      points: [
        "Completed practical backend engineering tasks including project setup, REST API integration, and REST API controller implementation",
        "Implemented Kafka-based service integration for asynchronous data flow and H2 in-memory database integration",
      ],
    },
    {
      role: "Technology Job Simulation (Coding & Development)",
      org: "Deloitte (via Forage)",
      period: "May 2026",
      points: [
        "Completed practical coding and software development tasks modeled on real Deloitte technology consulting workflows",
      ],
    },
    {
      role: "Front-End Web Development Intern",
      org: "AICTE + IBM SkillsBuild, Edunet Foundation",
      period: "Aug – Sep 2025",
      points: [
        "Built responsive web interfaces using HTML5, CSS3, and JavaScript following industry-standard practices",
        "Practiced Git/GitHub deployment workflows",
      ],
    },
    {
      role: "Artificial Intelligence Intern",
      org: "AICTE + IBM SkillsBuild, Edunet Foundation",
      period: "Jun – Jul 2025",
      points: [
        "Completed a structured 6-week program covering foundational AI concepts and applied exercises as part of an AICTE-aligned curriculum",
      ],
    },
  ],

  projects: [
    {
      name: "AI Resume Analyser",
      period: "2025 – Present",
      stack: ["React.js", "Node.js", "LLM API", "JavaScript", "Vercel"],
      description:
        "A full-stack web application that analyses resumes against job descriptions via LLM API integration, providing real-time keyword gap analysis and improvement suggestions.",
      points: [
        "Sole developer — owned end-to-end delivery: React.js frontend, backend API integration, testing, and live Vercel deployment",
      ],
      liveUrl: "https://personalprojecr.vercel.app",
      // PLACEHOLDER — no project-specific GitHub repo link or screenshot was in the resume.
      githubUrl: null as string | null,
      image: null as string | null,
    },

    {
      name: "VMC coaching Site ",
      period: "jul 2026 – Present",
      stack: ["React.js", "Node.js", "JavaScript", "Vercel"],
      description:
        "A full-stack web application for a coaching classes to maintain the coaching virtually share notes, track attendance, provide announcement. Making it easier for admin to notify about fees and maintain revenue.",
      points: [
        "Sole developer — owned end-to-end delivery: React.js frontend, backend API integration, testing, and live Vercel deployment",
      ],
      liveUrl: "https://vanita-math-class.vercel.app",
      // PLACEHOLDER — no project-specific GitHub repo link or screenshot was in the resume.
      githubUrl: null as string | null,
      image: "/certificates/Vmc.png",
    },
  ],

  certifications: [
    {
      name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      org: "Oracle University",
      date: "Oct 2025",
      validTill: "Oct 2027",
      credentialId: null as string | null,
      credentialUrl: null as string | null,
      file: "/certificates/oracle cetificate_page-0001.jpg",
    },
    {
      name: "Data Structures and Algorithms",
      org: "Microsoft, via Coursera",
      date:"oct",
      validTill: null as string | null,
      credentialId: "WCZVCE98FUUG",
      credentialUrl: null as string | null,
      file: "/certificates/Coursera dsa_page-0001.jpg",
    },
    {
      name: "Data Science Essentials with Python",
      org: "Cisco Networking Academy",
      date: "Oct 2025",
      validTill: null as string | null,
      credentialId: null as string | null,
      credentialUrl: null as string | null,
      file: "/certificates/Data_Science_Essentials_with_Python_certificate_navnitf57-gmail-com_165ee49c-02c1-4742-9768-ecaed16a0cce_page-0001.jpg",
    },
    {
      name: "Deloitte technology job simulation",
      org: "Deloitte",
      date: "May 2025",
      validTill: null as string | null,
      credentialId: null as string | null,
      credentialUrl: null as string | null,
      file: "/certificates/delloite.jpg",
    },
     {
      name: "Forage :Software engineering Job simulation",
      org: "JP Morgan chase&co.",
      date: "May 2026",
      validTill: null as string | null,
      credentialId: null as string | null,
      credentialUrl: null as string | null,
      file: "/certificates/forage.jpg",
    },
    {
      name: "Emerging Technologies (Ai & cloud)",
      org: "Edunet foundation",
      date: "july 2024",
      validTill: null as string | null,
      credentialId: null as string | null,
      credentialUrl: null as string | null,
      file: "/certificates/edunet_ai.jpg",
    },
    {
      name: "Frontend Web Developement",
      org: "Edunet foundation",
      date: "september 2025",
      validTill: null as string | null,
      credentialId: null as string | null,
      credentialUrl: null as string | null,
      file: "/certificates/frontend.jpg",
    },
    {
      name: "Artificial Intelligence",
      org: "Edunet foundation",
      date: "july 2025",
      validTill: null as string | null,
      credentialId: null as string | null,
      credentialUrl: null as string | null,
      file: "/certificates/Artificial_intelligence.jpg",
    },
  ],

  achievements: [] as { title: string; detail: string }[], // none listed in resume

  additional: {
    dsa: "Active LeetCode practice (Striver A2Z)",
    languages: ["English", "Hindi (Native)"],
    
  },
};

export type Profile = typeof profile;

// ─────────────────────────────────────────────────────────────
// CENTRALIZED PORTFOLIO DATA & CONSTANTS
// Single source of truth for Navnit Kumar's portfolio
// ─────────────────────────────────────────────────────────────

export interface ProjectDetail {
  slug: string;
  name: string;
  period: string;
  tagline: string;
  category: "Full Stack" | "AI & Cloud" | "Web Application";
  stack: string[];
  description: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string[];
  results: string[];
  liveUrl: string;
  githubUrl: string | null;
  image: string | null;
}

export interface CertificateItem {
  id: string;
  name: string;
  org: string;
  date: string;
  validTill?: string | null;
  credentialId?: string | null;
  credentialUrl?: string | null;
  category: "AI & Cloud" | "DSA & CS" | "Job Simulation" | "Web Development";
  file: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  location?: string;
  period: string;
  type: "Simulation" | "Internship";
  points: string[];
  tech: string[];
  certificateRef?: string;
}

export const PORTFOLIO_CONFIG = {
  name: "Navnit Kumar",
  title: "Software Development Engineer",
  subtitle: "Full Stack Developer & SDE Aspirant",
  tagline: "Building scalable web architectures, AI-integrated systems & mastering algorithmic problem solving.",
  email: "navnitf57@gmail.com",
  phone: "+91 88776 20672",
  location: "Muzaffarpur, Bihar, India",
  leetcodeUsername: "Navnit1",
  githubUsername: "Navnit1",
  linkedinUrl: "https://www.linkedin.com/in/navnit-kumar-110ab8323/",
  githubUrl: "https://github.com/Navnit1",
  leetcodeUrl: "https://leetcode.com/u/Navnit1/",
  resumeFilename: "Navnit_Kumar_Resume.pdf",
  availableForWork: true,
  availabilityStatus: "Open for SDE / Full-Stack Roles & Internships",
};

export const DEVELOPER_STATS = [
  { label: "Verified Certifications", value: 8, suffix: "+", detail: "Oracle AI, Coursera DSA, Cisco, Edunet" },
  { label: "DSA Problems Solved", value: 100, suffix: "+", detail: "Striver A2Z DSA sheet on LeetCode" },
  { label: "Full Stack Projects", value: 2, suffix: "", detail: "End-to-end production web applications" },
  { label: "Job Simulations & Internships", value: 4, suffix: "", detail: "JPMorgan Chase, Deloitte, AICTE IBM" },
];

export const SKILL_CATEGORIES = {
  Languages: [
    { name: "JavaScript (ES6+)", level: "Advanced", icon: "Code2", highlight: true },
    { name: "Python", level: "Intermediate", icon: "FileCode", highlight: true },
    { name: "HTML5", level: "Expert", icon: "Layout" },
    { name: "CSS3", level: "Expert", icon: "Palette" },
  ],
  Frontend: [
    { name: "React.js", level: "Advanced", icon: "Atom", highlight: true },
    { name: "Next.js", level: "Intermediate", icon: "Boxes", highlight: true },
    { name: "Tailwind CSS", level: "Advanced", icon: "Wind", highlight: true },
    { name: "Responsive Web Design", level: "Expert", icon: "MonitorSmartphone" },
  ],
  Backend: [
    { name: "Node.js", level: "Advanced", icon: "Server", highlight: true },
    { name: "Express.js", level: "Advanced", icon: "Cpu", highlight: true },
    { name: "REST APIs", level: "Advanced", icon: "Network", highlight: true },
    { name: "JWT Authentication", level: "Advanced", icon: "ShieldCheck" },
    { name: "Apache Kafka (Basics)", level: "Learned in Simulation", icon: "Activity" },
  ],
  Databases: [
    { name: "MongoDB", level: "Intermediate", icon: "Database", highlight: true },
    { name: "MySQL", level: "Intermediate", icon: "Table2", highlight: true },
    { name: "H2 In-Memory DB", level: "Job Simulation", icon: "HardDrive" },
  ],
  "AI & Cloud": [
    { name: "LLM API Integration", level: "Practiced in Projects", icon: "Sparkles", highlight: true },
    { name: "Oracle Cloud AI Foundations", level: "Certified Associate", icon: "Cloud", highlight: true },
    { name: "Prompt Engineering", level: "Applied", icon: "Cpu" },
  ],
  "Tools & Platforms": [
    { name: "Git", level: "Advanced", icon: "GitBranch", highlight: true },
    { name: "GitHub", level: "Advanced", icon: "Github", highlight: true },
    { name: "Vercel", level: "Deployment", icon: "CloudUpload" },
    { name: "Netlify", level: "Deployment", icon: "Globe" },
    { name: "VS Code", level: "Daily Driver", icon: "Terminal" },
    { name: "Postman", level: "API Testing", icon: "Send" },
  ],
  "CS Fundamentals": [
    { name: "Data Structures & Algorithms", level: "Active LeetCode Practice", icon: "Binary", highlight: true },
    { name: "Object-Oriented Programming (OOP)", level: "Core Strength", icon: "Component" },
    { name: "Database Management Systems (DBMS)", level: "Core Strength", icon: "Database" },
    { name: "Operating Systems", level: "B.Tech Coursework", icon: "Laptop" },
    { name: "Computer Networks", level: "B.Tech Coursework", icon: "Radio" },
    { name: "MVC Architecture", level: "Applied Pattern", icon: "Layers" },
  ],
};

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    slug: "ai-resume-analyser",
    name: "AI Resume Analyser",
    period: "2025 – Present",
    tagline: "Intelligent ATS gap detection and real-time resume enhancement engine powered by LLMs.",
    category: "AI & Cloud",
    stack: ["React.js", "Node.js", "LLM API", "Tailwind CSS", "JavaScript", "Vercel"],
    description:
      "A full-stack web application that analyses resumes against target job descriptions via LLM API integration, providing real-time keyword gap analysis and actionable improvement suggestions.",
    overview:
      "Engineered as a sole developer to solve the black-box dilemma of Applicant Tracking Systems (ATS). The application empowers candidates to evaluate their resume match percentage, pinpoint omitted technical skills, and generate contextual bullet revisions before submitting job applications.",
    problem:
      "Most job applicants get rejected in the first 10 seconds of ATS parsing due to subtle keyword discrepancies, poor phrasing of achievements, and misalignment with specific job requirements. Commercial tools are either behind high paywalls or offer generic feedback without actionable rewrite proposals.",
    solution:
      "Built a streamlined web platform where users provide their current resume text and target job posting. The Node.js service interfaces with an LLM inference API using structured system prompting, returning an instant breakdown of ATS compliance score, hard & soft skill gaps, and contextual bullet rewrites.",
    architecture:
      "Client-side React interface with responsive layout and real-time state management. The backend acts as a secure API gateway, sanitizing incoming payload streams, formatting specialized prompts for the LLM model, and streaming structured JSON metrics back to the frontend with zero credential leakage.",
    features: [
      "Real-time semantic matching between resume content and job requisites",
      "Instant ATS keyword gap breakdown categorizing missing technical competencies",
      "AI-assisted bullet point reformulation highlighting measurable impact",
      "Clean, distraction-free modern UI with responsive mobile and desktop support",
      "Deployed and running live in production on Vercel with zero latency bottlenecks",
    ],
    challenges: [
      "Tuning LLM prompts to output reliable, deterministic JSON response schemas without hallucinating extraneous metrics.",
      "Optimizing client-side rendering for long analysis outputs while keeping the interface responsive.",
      "Protecting API secrets and managing client request rate limits without dedicated paid database tiers.",
    ],
    results: [
      "Successfully launched live web app serving instant resume feedback.",
      "Demonstrated end-to-end full stack ownership: UI design, API integration, deployment, and testing.",
    ],
    liveUrl: "https://personalprojecr.vercel.app",
    githubUrl: "https://github.com/Navnit1",
    image: null,
  },
  {
    slug: "vmc-coaching-site",
    name: "VMC Coaching Platform",
    period: "Jul 2026 – Present",
    tagline: "Comprehensive digital portal for coaching institute operations, notes distribution, and fee management.",
    category: "Web Application",
    stack: ["React.js", "Node.js", "Tailwind CSS", "JavaScript", "Vercel"],
    description:
      "A full-stack web application for coaching classes to manage academic operations virtually: share notes, track student attendance, publish announcements, and streamline tuition fee bookkeeping.",
    overview:
      "Vanita Math Classes (VMC) needed to transition from fragmented paper records and chaotic messaging groups to a centralized, modern digital hub. This application provides a unified portal for students and faculty.",
    problem:
      "Educational coaching centers frequently lose track of fee collections, waste hours sharing scattered PDF notes across chat apps, and fail to keep parents and students updated with attendance reports and scheduling changes.",
    solution:
      "Designed and deployed a tailored digital operations platform. Features dedicated modules for class announcements, downloadable study material repositories by batch, student attendance logs, and fee accounting alerts.",
    architecture:
      "Modular React application leveraging responsive component architecture and state management, backed by a Node.js API service for data coordination and Vercel cloud deployment for continuous availability.",
    features: [
      "Virtual study notes library organized by subject and batch modules",
      "Attendance tracking interface to maintain student participation records",
      "Real-time announcements board for exam timetables and holiday notices",
      "Administrative fee monitoring with revenue logs and outstanding balance visibility",
      "Mobile-optimized interface allowing students to check coursework on the go",
    ],
    challenges: [
      "Designing an intuitive user experience accessible to students of varying technical comfort levels.",
      "Structuring responsive layout components that display tabular fee data and notes cleanly on small mobile viewports.",
    ],
    results: [
      "Delivered live in production, eliminating paper notes dissemination for the institute.",
      "Provided an organized, professional digital presence with active student access.",
    ],
    liveUrl: "https://vanita-math-class.vercel.app",
    githubUrl: "https://github.com/Navnit1",
    image: "/certificates/Vmc.png",
  },
];

export const CERTIFICATIONS_DATA: CertificateItem[] = [
  {
    id: "oracle-ai",
    name: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    org: "Oracle University",
    date: "Oct 2025",
    validTill: "Oct 2027",
    category: "AI & Cloud",
    file: "/certificates/oracle cetificate_page-0001.jpg",
  },
  {
    id: "coursera-dsa",
    name: "Data Structures and Algorithms",
    org: "Microsoft, via Coursera",
    date: "Oct 2024",
    credentialId: "WCZVCE98FUUG",
    category: "DSA & CS",
    file: "/certificates/Coursera dsa_page-0001.jpg",
  },
  {
    id: "cisco-python",
    name: "Data Science Essentials with Python",
    org: "Cisco Networking Academy",
    date: "Oct 2025",
    category: "AI & Cloud",
    file: "/certificates/Data_Science_Essentials_with_Python_certificate_navnitf57-gmail-com_165ee49c-02c1-4742-9768-ecaed16a0cce_page-0001.jpg",
  },
  {
    id: "jpmorgan-simulation",
    name: "Software Engineering Job Simulation",
    org: "JPMorgan Chase & Co. (via Forage)",
    date: "May 2026",
    category: "Job Simulation",
    file: "/certificates/forage.jpg",
  },
  {
    id: "deloitte-simulation",
    name: "Technology Job Simulation (Coding & Development)",
    org: "Deloitte (via Forage)",
    date: "May 2025",
    category: "Job Simulation",
    file: "/certificates/delloite.jpg",
  },
  {
    id: "edunet-emerging-tech",
    name: "Emerging Technologies (AI & Cloud)",
    org: "Edunet Foundation",
    date: "Jul 2024",
    category: "AI & Cloud",
    file: "/certificates/edunet_ai.jpg",
  },
  {
    id: "edunet-frontend",
    name: "Frontend Web Development",
    org: "Edunet Foundation",
    date: "Sep 2025",
    category: "Web Development",
    file: "/certificates/frontend.jpg",
  },
  {
    id: "edunet-ai",
    name: "Artificial Intelligence",
    org: "Edunet Foundation",
    date: "Jul 2025",
    category: "AI & Cloud",
    file: "/certificates/Artificial_intelligence.jpg",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "jpmc",
    role: "Software Engineering Job Simulation",
    org: "JPMorgan Chase & Co. (via Forage)",
    period: "May 2026",
    type: "Simulation",
    points: [
      "Completed practical backend engineering tasks including project initialization, REST API controller implementation, and endpoint contract design.",
      "Implemented Kafka-based service integration for asynchronous streaming data flow alongside H2 in-memory database configuration.",
      "Analyzed financial data models and practiced enterprise-level code organization and unit verification patterns.",
    ],
    tech: ["Java / Spring Boot", "Kafka", "REST APIs", "H2 Database", "Git"],
    certificateRef: "forage.jpg",
  },
  {
    id: "deloitte",
    role: "Technology Job Simulation (Coding & Development)",
    org: "Deloitte (via Forage)",
    period: "May 2025",
    type: "Simulation",
    points: [
      "Completed practical software development and coding modules modeled on enterprise technology consulting workflows.",
      "Evaluated system architectural requirements, proposed modular code patterns, and documented technical specifications.",
    ],
    tech: ["Software Development", "System Design Principles", "Code Quality", "Documentation"],
    certificateRef: "delloite.jpg",
  },
  {
    id: "edunet-fe",
    role: "Front-End Web Development Intern",
    org: "AICTE + IBM SkillsBuild, Edunet Foundation",
    period: "Aug – Sep 2025",
    type: "Internship",
    points: [
      "Built responsive, accessible web interfaces utilizing HTML5, modern CSS3 layouts, and vanilla JavaScript.",
      "Implemented Git/GitHub collaboration workflows, branch management, and cross-browser testing routines.",
      "Collaborated in sprint reviews and optimized webpage asset loading and semantic document hierarchy.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git", "GitHub"],
    certificateRef: "frontend.jpg",
  },
  {
    id: "edunet-ai-intern",
    role: "Artificial Intelligence Intern",
    org: "AICTE + IBM SkillsBuild, Edunet Foundation",
    period: "Jun – Jul 2025",
    type: "Internship",
    points: [
      "Completed an intensive 6-week curriculum covering foundational AI mechanisms, machine learning models, and Python scripting.",
      "Executed hands-on coding labs involving exploratory data analysis, feature preparation, and algorithmic evaluation.",
    ],
    tech: ["Python", "Machine Learning Basics", "Data Analysis", "AI Fundamentals"],
    certificateRef: "Artificial_intelligence.jpg",
  },
];

export const EDUCATION_DATA = [
  {
    institution: "IKG Punjab Technical University (PTU)",
    degree: "Bachelor of Technology (B.Tech)",
    major: "Information Technology",
    period: "2023 – 2027",
    status: "Final-Year Student",
    highlights: [
      "Comprehensive coursework across Data Structures & Algorithms, Database Management Systems, and Web Technologies.",
      "Active participant in technical coding clubs and algorithmic problem-solving communities.",
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Database Management Systems (DBMS)",
      "Operating Systems",
      "Computer Networks",
      "Web Technologies",
      "Software Engineering",
    ],
  },
];

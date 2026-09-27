// Edit this file to personalise the portfolio. Content is taken from the résumé in /public.

export const profile = {
  name: "Maria Angela B. Valencia",
  shortName: "Angela",
  role: "Junior Front-End Developer",
  intro:
    "I build responsive WordPress websites and cross-client email templates, turning Figma designs into clean, reliable pages.",
  location: "Philippines",
  email: "angelavalencia876@gmail.com",
  phone: "+63 916 175 8426",
  phoneHref: "tel:+639161758426",
  portrait: "/portrait.svg", // swap for /portrait.jpg once you add your photo to /public
  avatar: "/avatar.svg",
  cv: "/Valencia-MariaAngela-Resume.pdf",
  cvFileName: "Valencia-MariaAngela-Resume.pdf",
  available: true,
  badge: "FRONT-END DEVELOPER · SINCE 2023 ·",
  linkedin: "https://linkedin.com/in/ma-valencia",
};

export const stats = [
  { value: "3+", label: "Years of experience" },
  { value: "2", label: "Front-end roles" },
];

export const companies = [
  { name: "InGnius Systems", period: "2026" },
  { name: "WHG Philippines", period: "2023–26" },
  { name: "MIESCOR", period: "2023" },
];

export const summary = [
  "Junior Front-End Developer building responsive interfaces with HTML, CSS, JavaScript and PHP across WordPress websites and cross-platform email templates.",
  "I translate Figma designs into clean pages, extend functionality through plugins and APIs, and keep layouts consistent across desktop, mobile and email clients.",
];

export const services = [
  {
    title: "WordPress Development",
    description: "Custom WordPress sites, theme customisation, plugin and API integration — all under Git version control.",
  },
  {
    title: "Responsive Web Design",
    description: "Figma designs built into pixel-accurate pages that work across desktop, mobile and every major browser.",
  },
  {
    title: "Email Template Development",
    description: "Responsive HTML/CSS email templates that render consistently across major email clients.",
  },
  {
    title: "Performance & SEO",
    description: "Optimising performance, accessibility, SEO and cross-browser compatibility for reliable, high-quality sites.",
  },
];

export const experience = [
  {
    period: "Apr 2026 — Sep 2026",
    role: "Junior Front-End Developer",
    company: "InGnius Systems Private Limited",
    location: "Remote",
    highlights: [
      "Built responsive WordPress pages from Figma designs using HTML, CSS, SASS, JavaScript and PHP.",
      "Integrated plugins and APIs to extend WordPress functionality for client requirements.",
      "Optimised performance, accessibility, SEO and cross-browser compatibility.",
      "Customised WordPress themes and templates using best practices and Git version control.",
    ],
  },
  {
    period: "Nov 2023 — Apr 2026",
    role: "HTML Coder / Email Marketing Developer",
    company: "WHG Customer Services Philippines Inc.",
    location: "Parañaque City",
    highlights: [
      "Built responsive HTML/CSS email templates with consistent rendering across major email clients.",
      "Configured outbound messaging — push notifications, in-app toaster messages and SMS.",
      "Managed targeted pop-up campaigns through Online Messages Admin (OMG Admin).",
      "Collaborated in Agile workflows using Jira Software.",
    ],
  },
  {
    period: "Aug 2023 — Nov 2023",
    role: "Digitizer",
    company: "Meralco Industrial Engineering Services Corporation (MIESCOR)",
    location: "Pasig City",
    highlights: [
      "Processed and visualised geospatial field survey data into accurate digital maps.",
      "Aligned infrastructure layouts with surveyed maps for meter and service drop-wire installation.",
    ],
  },
];

export const education = {
  school: "ICCT Colleges",
  degree: "Bachelor of Science in Information Technology",
  date: "May 2023",
  gpa: "1.37",
};

export const certificates = [
  { title: "Career Service Professional Eligibility", issuer: "Civil Service Commission (CSC), Philippines", year: "2023" },
];

// What I've built, grouped by type of work (from the experience above).
export const projects = [
  { title: "Custom WordPress Sites", tag: "InGnius Systems", hue: "from-sky-500 to-indigo-700" },
  { title: "Figma-to-WordPress Pages", tag: "InGnius Systems", hue: "from-violet-500 to-fuchsia-800" },
  { title: "Responsive Email Templates", tag: "WHG Philippines", hue: "from-emerald-500 to-teal-800" },
  { title: "Push, Toaster & SMS Campaigns", tag: "WHG Philippines", hue: "from-amber-400 to-orange-700" },
  { title: "Geospatial Digital Maps", tag: "MIESCOR", hue: "from-neutral-600 to-black" },
];

export const skills = [
  { group: "Technical", items: ["HTML5", "CSS3", "SASS", "JavaScript", "PHP", "AWS"] },
  { group: "WordPress", items: ["Theme customisation", "Plugin integration", "API integration", "SEO optimisation", "Git"] },
  { group: "Front-end delivery", items: ["Responsive design", "Cross-browser compatibility", "Figma", "Jira / Agile"] },
  { group: "Email marketing", items: ["Acoustic Marketing Cloud", "Bloomreach", "OMG Admin", "SMS · Toaster · Push"] },
];

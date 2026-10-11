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
  portrait: "/mv.png",
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

// Featured projects — placeholder content, replace with real details.
// Drop preview images in /public/projects and list them under `images` (first one is the cover).
export const projectCategories = ["WordPress", "Email development"] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const featuredProjects: {
  title: string;
  category: ProjectCategory;
  year: string;
  role: string;
  description: string;
  highlights: string[];
  stack: string[];
  images: string[];
  links: { live?: string; code?: string; download?: string };
}[] = [
  {
    title: "The Coastal Yacht Club",
    category: "WordPress",
    year: "2026",
    role: "WordPress Developer",
    description:
      "A luxury yacht charter site for Mediterranean and worldwide private charters, built on a custom WordPress theme with a yacht search, featured fleet and curated destinations.",
    highlights: [
      "Custom theme built from the design",
      "Yacht search with destination, date and guest filters",
      "Fleet and destination carousels",
      "Charter enquiry forms",
    ],
    stack: ["WordPress", "PHP", "SASS", "JavaScript", "Contact Form 7"],
    images: ["/projects/coastal-yacht-club-1.png", "/projects/coastal-yacht-club-2.png", "/projects/coastal-yacht-club-3.png"],
    links: { live: "https://thecoastalyachtclub.com/" },
  },
  {
    title: "888poker · $25 Freeroll",
    category: "Email development",
    year: "2025",
    role: "Email Developer",
    description:
      "A promotional campaign email for 888poker's regulated German market, built on the brand's regulated template with localised legal footer and account details.",
    highlights: ["Responsive, table-based layout", "Regulated-market template and footer", "Personalisation fields for player details"],
    stack: ["HTML", "CSS", "Acoustic Marketing Cloud"],
    images: ["/projects/888poker-freeroll-1.png", "/projects/888poker-freeroll-2.png"],
    links: { live: "/projects/emails/888poker-freeroll.html", download: "/projects/emails/888poker-freeroll.eml" },
  },
  {
    title: "888poker · Galáxia de Ases",
    category: "Email development",
    year: "2025",
    role: "Email Developer",
    description:
      "A Portuguese-market tournament campaign email promoting the €10 Galáxia de Ases series, with a hero banner, freeroll schedule and terms.",
    highlights: ["Responsive, table-based layout", "Dynamic freeroll listings", "Localised for the Portuguese regulated market"],
    stack: ["HTML", "CSS", "Acoustic Marketing Cloud"],
    images: ["/projects/888poker-galaxia-de-ases-1.png", "/projects/888poker-galaxia-de-ases-2.png"],
    links: { live: "/projects/emails/888poker-galaxia-de-ases.html", download: "/projects/emails/888poker-galaxia-de-ases.eml" },
  },
];

export const skills = [
  { group: "Technical", items: ["HTML5", "CSS3", "SASS", "JavaScript", "PHP", "AWS"] },
  { group: "WordPress", items: ["Theme customisation", "Plugin integration", "API integration", "SEO optimisation", "Git"] },
  { group: "Front-end delivery", items: ["Responsive design", "Cross-browser compatibility", "Figma", "Jira / Agile"] },
  { group: "Email marketing", items: ["Acoustic Marketing Cloud", "Bloomreach", "OMG Admin", "SMS · Toaster · Push"] },
];

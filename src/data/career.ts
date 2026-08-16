export interface Experience {
  title: string
  company: string
  companyUrl: string
  location: string
  period: string
  description: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  period: string
  description: string
  achievements: string[]
}

export interface CertificateImage {
  src: string
  width: number
  height: number
  alt: string
}

export interface Certificate {
  title: string
  issuer: string
  date: string
  image: CertificateImage
  verificationUrl: string
  category: string
}

export interface SkillGroup {
  title: string
  skills: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "ClouDesk Pty. Ltd",
    companyUrl: "https://cloudesk.co/",
    location: "Remote | Sydney, NSW Australia",
    period: "Jan 2025 – Present",
    description: [
      "Led backend development for MemberPulse, a multi-tenant SaaS platform serving professional associations across Australia — CPD tracking, job boards, events, sponsorships, and directories",
      "Integrated Stripe, Xero, HubSpot, and PayPal APIs for cross-tenant payment processing, CRM synchronization, and automated invoicing",
      "Built computer vision pipelines using Ultralytics YOLO to automate product classification and employee tracking for warehouse operations",
      "Stabilized PG Pay, a high-value e-commerce platform for precious metals — resolved critical transaction reliability issues and payment edge cases",
      "Maintained and extended educational platforms for ICOM International School (Malaysia) and a China-based internal learning system using Laravel",
      "Stack: Symfony, PostgreSQL, Bootstrap, Vultr, OAuth2, Bitbucket CI/CD",
    ],
  },
  {
    title: "Software Developer (IT Systems)",
    company: "EduQuest Inc.",
    companyUrl: "https://eduquestph.com/",
    location: "Cagayan De Oro City, Northern Mindanao, Philippines",
    period: "Jul 2024 – Jan 2025",
    description: [
      "Re-architected LMS infrastructure, reducing downtime by 20% and boosting user engagement by 30%",
      "Automated reporting using Google Sheets & Gmail APIs, cutting manual work by 40%",
      "Led platform onboarding for 200+ users (staff, students, parents), driving a 50% increase in LMS adoption",
    ],
  },
  {
    title: "Software Development Intern",
    company: "MORESCO-1",
    companyUrl: "https://moresco1.com/",
    location: "Poblacion, Laguindingan, Misamis Oriental",
    period: "Jan 2024 - May 2024",
    description: [
      "Developed features for M1-HRIS and M1-Helpdesk using Laravel and SQL Server, supporting centralized HR management and IT ticket resolution across multiple offices",
      "Optimized slow-running SQL queries for employee record retrieval, reducing page load times in the HRIS dashboard",
    ],
  },
]

export const EDUCATION: Education[] = [
  {
    degree: "Bachelor of Science in Information Technology Major in Database Systems",
    institution: "Mindanao State University - Naawan",
    location: "Naawan, Misamis Oriental, Philippines",
    period: "2020 - 2024",
    description:
      "Specialized in Database Systems and Web Development. Completed several notable projects including a Human Resources Information System and IT Helpdesk System.",
    achievements: ["Cum Laude", "Dean's Lister", "Best Capstone 3rd Place"],
  },
  {
    degree: "Senior High School - STEM",
    institution: "Initao National Comprehensive High School",
    location: "Initao, Misamis Oriental, Philippines",
    period: "2018 - 2020",
    description:
      "Focused on Science, Technology, Engineering, and Mathematics. Participated in various programming competitions and science fairs.",
    achievements: [
      "Valedictorian",
      "Programming Competition Winner",
      "Science Fair Gold Medalist",
    ],
  },
]

export const CERTIFICATES: Certificate[] = [
  {
    title: "Symfony 7 Fundamentals",
    issuer: "SymfonyCasts",
    date: "March 2025",
    image: {
      src: "/images/certificates/symfony7-fundamentals.png",
      width: 1854,
      height: 691,
      alt: "SymfonyCasts Symfony 7 Fundamentals certificate",
    },
    verificationUrl: "https://symfonycasts.com/certificates/1437702CC155",
    category: "Web Development",
  },
  {
    title: "Advanced React",
    issuer: "Meta",
    date: "January 2025",
    image: {
      src: "/images/certificates/advanced-react.png",
      width: 1057,
      height: 815,
      alt: "Meta Advanced React certificate",
    },
    verificationUrl: "https://coursera.org/verify/2PPLPYD9SZ8B",
    category: "Frontend",
  },
  {
    title: "React Basics",
    issuer: "Meta",
    date: "January 2025",
    image: {
      src: "/images/certificates/react-basics.png",
      width: 1058,
      height: 818,
      alt: "Meta React Basics certificate",
    },
    verificationUrl: "https://coursera.org/verify/SUL3C9D7GZK3",
    category: "Frontend",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "December 2024",
    image: {
      src: "/images/certificates/javascript-algorithms.png",
      width: 1226,
      height: 825,
      alt: "freeCodeCamp JavaScript Algorithms and Data Structures certificate",
    },
    verificationUrl:
      "https://www.freecodecamp.org/certification/Ehnand/javascript-algorithms-and-data-structures-v8",
    category: "Programming",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "December 2024",
    image: {
      src: "/images/certificates/responsive-web-design.png",
      width: 1220,
      height: 820,
      alt: "freeCodeCamp Responsive Web Design certificate",
    },
    verificationUrl:
      "https://www.freecodecamp.org/certification/Ehnand/responsive-web-design",
    category: "Web Development",
  },
  {
    title: "CSX Cybersecurity Fundamentals Certificate (CSXF)",
    issuer: "Cybrary",
    date: "August 2023",
    image: {
      src: "/images/certificates/csxf-cybersecurity.png",
      width: 1123,
      height: 796,
      alt: "Cybrary CSX Cybersecurity Fundamentals certificate",
    },
    verificationUrl:
      "https://app.cybrary.it/profile/SimpleCanidae0202?tab=cert-completion&cert=CC-900adb08-fcfc-4837-b719-e9dcbf3129e4",
    category: "Cybersecurity",
  },
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Backend",
    skills: ["Laravel", "Symfony", "NestJS", "Node.js", "C#.NET", "CodeIgniter"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Bootstrap", "Tailwind CSS", "ShadCN UI"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "SQL Server", "SQLite", "T-SQL"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "Bitbucket CI/CD", "Vultr", "AWS", "UNIX/Linux", "Git"],
  },
  {
    title: "APIs",
    skills: [
      "REST",
      "GraphQL",
      "OAuth2",
      "Google APIs",
      "Xero",
      "Stripe",
      "PayPal",
      "HubSpot",
      "Twilio",
    ],
  },
  {
    title: "Systems & Tools",
    skills: ["GitHub", "VS Code", "Cursor AI", "Ubuntu", "Bitbucket", "Agile"],
  },
]

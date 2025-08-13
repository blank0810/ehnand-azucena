import ProjectCard from "./ProjectCard"

const projects = [
  {
    title: "MemberPulse (SaaS CPD Platform)",
    description:
      "Built from ground up: courses, events, subscriptions, job boards, directories, sponsorship system. Supports individual and organizational members. Multi-tenant design, live infrastructure.",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Symfony", "Bootstrap", "Vultr", "PostgreSQL", "OAuth2"],
    period: "Feb 2025 – Present",
    role: "Lead Developer",
    liveUrl: "https://memberpulse.com",
  },
  {
    title: "PlayNow",
    description:
      "Beta version of a SaaS marketplace for merchants to sell coupons for goods/venues/activities (Project Handed Off).",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Next.js", "NestJS", "Vercel"],
    period: "Mar 2025 – Apr 2025",
    role: "Solo Developer",
  },
  {
    title: "EduTracker System",
    description: "Reduced reporting time by 40% via automation and data consolidation.",
    image: "/images/edutracker.jpg",
    technologies: ["Laravel", "MySQL", "Google APIs"],
    period: "Jul 2024 - Aug 2024",
    role: "Solo Developer",
  },
  {
    title: "Weather App",
    description: "A responsive weather application with real-time data and forecasts.",
    image: "/images/weather_app.png",
    technologies: ["React", "OpenWeather API", "Tailwind CSS"],
    period: "Dec 2024",
    role: "Solo Developer",
    liveUrl: "https://ehnand-weather-app.vercel.app/",
  },
  {
    title: "M1 – HRIS (MORESCO-1)",
    description: "Internal HR platform deployed in a multi-office environment; improved data integrity and access.",
    image: "/images/lgu_hris.jpg",
    technologies: ["Laravel", "SQL Server"],
    period: "Jan 2024 - Jun 2024",
    role: "Team Developer",
  },
  {
    title: "M1-Helpdesk",
    description: "Ticketing system reducing average response time by 35%. Deployed on an internal network.",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Laravel", "SQL Server"],
    period: "Jan 2024 - Jun 2024",
    role: "Lead Developer",
  },
  {
    title: "Email Automation Script",
    description:
      "Python script leveraging MXroute API to automate creation of 500+ email accounts, cutting manual setup time by 70% and ensuring config consistency.",
    image: "/images/email_auto.jpg",
    technologies: ["Python", "MXroute API"],
    period: "Jul 2024 - Aug 2024",
    role: "Solo Developer",
  },
  {
    title: "DESKTOP HRIS",
    description:
      "C#.NET-based desktop app, securing payroll and employee records while speeding processing by 30%. Legacy HR system with secure role-based access and records protection.",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["C#.NET", "SQL Server"],
    period: "Aug 2023 - Jan 2024",
    role: "Lead Developer",
  },
]

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-900 relative">
      <div className="section-container">
        <h2 className="section-title gradient-text">Recent Works</h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Here are some of the projects I've worked on, showcasing my expertise in full-stack development, system
          architecture, and problem-solving.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

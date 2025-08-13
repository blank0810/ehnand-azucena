const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "ClouDesk Pty. Ltd",
      location: "Remote | Sydney, NSW Australia",
      period: "Jan 2025 – Present",
      description: [
        "Maintained and patched educational platform for ICOM International School (Malaysia) and its China-based internal platform",
        "Enhanced stability for PG Pay, a high-value e-commerce platform for precious metals",
        "Led backend development for MemberPulse, a multi-tenant SaaS platform supporting CPD points, job boards, events, sponsorships, and directories",
        "Integrated third-party APIs (Xero, Stripe, HubSpot) into key features, supporting scalable payments and CRM workflows",
        "Stack: Symfony, PostgreSQL, Bootstrap, Vultr, OAuth2, Bitbucket CI/CD",
      ],
      technologies: ["Symfony", "PostgreSQL", "Bootstrap", "Vultr", "OAuth2", "Bitbucket CI/CD"],
    },
    {
      title: "IT Specialist",
      company: "EduQuest Inc.",
      location: "Cagayan De Oro City, Northern Mindanao, Philippines",
      period: "Jul 2024 – Jan 2025",
      description: [
        "Re-architected LMS infrastructure, reducing downtime by 20% and boosting user engagement by 30%",
        "Automated reporting using Google Sheets & Gmail APIs, cutting manual work by 40%",
        "Trained teachers, students, and parents on the updated LMS, increasing platform adoption by 50%",
      ],
      technologies: ["Google APIs", "LMS", "System Architecture"],
    },
    {
      title: "System And Database Specialist | Internship",
      company: "MORESCO-1",
      location: "Poblacion, Laguindingan, Misamis Oriental",
      period: "Jan 2024 - May 2024",
      description: [
        "Delivered M1-HRIS, reducing HR processing time by 40%, and M1-Helpdesk, reducing ticket resolution by 35%",
        "Optimized SQL queries, improving data retrieval speed by 20%",
        "Hardened data security, decreasing vulnerability reports by 50%",
      ],
      technologies: ["Laravel", "SQL Server", "Database Optimization", "Security"],
    },
  ]

  return (
    <div>
      <h2>Professional Experience</h2>
      {experiences.map((experience, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{experience.title}</h3>
          <p>
            <strong>Company:</strong> {experience.company}
          </p>
          <p>
            <strong>Location:</strong> {experience.location}
          </p>
          <p>
            <strong>Period:</strong> {experience.period}
          </p>
          <ul>
            {experience.description.map((desc, descIndex) => (
              <li key={descIndex}>{desc}</li>
            ))}
          </ul>
          <p>
            <strong>Technologies:</strong> {experience.technologies.join(", ")}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Experience

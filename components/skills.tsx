const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      skills: [
        { name: "Laravel", level: 90 },
        { name: "Symfony", level: 85 },
        { name: "NestJS", level: 80 },
        { name: "Node.js", level: 85 },
        { name: "C#.NET", level: 75 },
        { name: "React.js", level: 80 },
        { name: "Next.js", level: 75 },
        { name: "CodeIgniter", level: 70 },
      ],
    },
    {
      title: "Databases & Data",
      skills: [
        { name: "MySQL", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "SQL Server", level: 80 },
        { name: "SQLite", level: 75 },
        { name: "T-SQL", level: 80 },
      ],
    },
    {
      title: "Infrastructure & DevOps",
      skills: [
        { name: "Docker", level: 70 },
        { name: "Bitbucket CI/CD", level: 75 },
        { name: "Vultr", level: 80 },
        { name: "AWS", level: 60 },
        { name: "UNIX/Linux", level: 85 },
        { name: "Git", level: 90 },
      ],
    },
    {
      title: "APIs & Integrations",
      skills: [
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 75 },
        { name: "OAuth2", level: 80 },
        { name: "Google APIs", level: 85 },
        { name: "Stripe", level: 80 },
        { name: "HubSpot", level: 70 },
      ],
    },
    {
      title: "Frontend Technologies",
      skills: [
        { name: "Bootstrap", level: 85 },
        { name: "Tailwind CSS", level: 80 },
        { name: "ShadCN UI", level: 75 },
        { name: "JavaScript", level: 85 },
        { name: "TypeScript", level: 80 },
      ],
    },
  ]

  return (
    <div className="skills">
      {skillCategories.map((category, index) => (
        <div key={index} className="skill-category">
          <h2>{category.title}</h2>
          <ul>
            {category.skills.map((skill, skillIndex) => (
              <li key={skillIndex}>
                {skill.name} - {skill.level}%
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Skills

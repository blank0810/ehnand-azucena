"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import SkillProgress from "./skill-progress"

const skillCategories = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "Laravel", percentage: 90, color: "bg-red-500" },
      { name: "Symfony", percentage: 85, color: "bg-blue-500" },
      { name: "NestJS", percentage: 80, color: "bg-red-600" },
      { name: "Node.js", percentage: 85, color: "bg-green-500" },
      { name: "C#.NET", percentage: 75, color: "bg-purple-500" },
      { name: "React.js", percentage: 80, color: "bg-cyan-500" },
      { name: "Next.js", percentage: 75, color: "bg-gray-800" },
      { name: "CodeIgniter", percentage: 70, color: "bg-orange-500" },
    ],
  },
  {
    title: "Databases & Data",
    skills: [
      { name: "MySQL", percentage: 90, color: "bg-blue-600" },
      { name: "PostgreSQL", percentage: 85, color: "bg-blue-700" },
      { name: "SQL Server", percentage: 80, color: "bg-red-700" },
      { name: "SQLite", percentage: 75, color: "bg-gray-600" },
      { name: "T-SQL", percentage: 80, color: "bg-indigo-600" },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    skills: [
      { name: "Docker", percentage: 70, color: "bg-blue-500" },
      { name: "Bitbucket CI/CD", percentage: 75, color: "bg-blue-600" },
      { name: "Vultr", percentage: 80, color: "bg-purple-600" },
      { name: "AWS", percentage: 60, color: "bg-orange-600" },
      { name: "UNIX/Linux", percentage: 85, color: "bg-yellow-600" },
      { name: "Git", percentage: 90, color: "bg-red-600" },
    ],
  },
  {
    title: "APIs & Integrations",
    skills: [
      { name: "REST APIs", percentage: 90, color: "bg-green-600" },
      { name: "GraphQL", percentage: 75, color: "bg-pink-600" },
      { name: "OAuth2", percentage: 80, color: "bg-indigo-500" },
      { name: "Google APIs", percentage: 85, color: "bg-red-500" },
      { name: "Stripe", percentage: 80, color: "bg-purple-600" },
      { name: "HubSpot", percentage: 70, color: "bg-orange-500" },
    ],
  },
  {
    title: "Frontend Technologies",
    skills: [
      { name: "Bootstrap", percentage: 85, color: "bg-purple-500" },
      { name: "Tailwind CSS", percentage: 80, color: "bg-cyan-500" },
      { name: "ShadCN UI", percentage: 75, color: "bg-gray-700" },
      { name: "JavaScript", percentage: 85, color: "bg-yellow-500" },
      { name: "TypeScript", percentage: 80, color: "bg-blue-600" },
    ],
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-gray-950 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Technical Skills
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          A comprehensive overview of my technical expertise across various technologies, frameworks, and tools.
        </motion.p>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="card"
            >
              <h3 className="section-subtitle mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillProgress key={skillIndex} name={skill.name} percentage={skill.percentage} color={skill.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

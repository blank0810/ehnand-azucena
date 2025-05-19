"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"
import { Code, Database, Server, Globe, Cloud, Webhook } from "lucide-react"
import SkillProgress from "./skill-progress"

const skillCategories = [
  {
    title: "Backend",
    icon: <Server className="h-6 w-6 text-primary" />,
    skills: ["Symfony", "Laravel", "CodeIgniter", "Node.js", "C#.NET"],
    description: "Building robust server-side applications and APIs with modern frameworks and technologies.",
  },
  {
    title: "Frontend",
    icon: <Globe className="h-6 w-6 text-primary" />,
    skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "TSX", "Bootstrap", "ShadCN UI"],
    description:
      "Creating responsive, interactive user interfaces with modern JavaScript frameworks and CSS libraries.",
  },
  {
    title: "Databases",
    icon: <Database className="h-6 w-6 text-primary" />,
    skills: ["MySQL", "PostgreSQL", "SQLite", "SQL Server", "Transact-SQL"],
    description: "Designing and optimizing database schemas, writing efficient queries, and ensuring data integrity.",
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud className="h-6 w-6 text-primary" />,
    skills: ["AWS", "CI/CD", "Docker", "UNIX/Linux", "Virtual Machines"],
    description: "Deploying and managing applications in the cloud with automated pipelines and containerization.",
  },
  {
    title: "APIs",
    icon: <Webhook className="h-6 w-6 text-primary" />,
    skills: ["REST", "SOAP", "GraphQL", "Google APIs", "Github"],
    description: "Designing and implementing APIs for seamless integration between services and applications.",
  },
  {
    title: "Programming",
    icon: <Code className="h-6 w-6 text-primary" />,
    skills: ["JavaScript", "TypeScript", "PHP", "Python", "C#", "SQL"],
    description: "Writing clean, efficient, and maintainable code across multiple programming languages.",
  },
]

const skillProgressData = [
  { name: "Frontend Development", percentage: 90, color: "bg-primary" },
  { name: "Backend Development", percentage: 95, color: "bg-secondary" },
  { name: "Database Management", percentage: 85, color: "bg-accent" },
  { name: "Cloud Infrastructure", percentage: 80, color: "bg-primary" },
  { name: "DevOps", percentage: 75, color: "bg-secondary" },
  { name: "UI/UX Design", percentage: 70, color: "bg-accent" },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeSkill, setActiveSkill] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

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

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`card hover:border-l-4 hover:border-primary relative overflow-hidden transition-all duration-300 ${
                activeSkill === index ? "border-l-4 border-primary transform scale-105 z-10" : ""
              }`}
              onMouseEnter={() => setActiveSkill(index)}
              onMouseLeave={() => setActiveSkill(null)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold ml-2">{category.title}</h3>
              </div>

              <div className="flex flex-wrap mb-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="skill-tag"
                    whileHover={{
                      backgroundColor: "rgba(59, 130, 246, 0.3)",
                      scale: 1.1,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              <motion.p
                className="text-gray-400 text-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeSkill === index ? 1 : 0,
                  height: activeSkill === index ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {category.description}
              </motion.p>

              {/* Animated background elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-xl"></div>
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-secondary/5 rounded-full blur-lg"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Proficiency Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {skillProgressData.map((skill, index) => (
              <SkillProgress key={index} name={skill.name} percentage={skill.percentage} color={skill.color} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

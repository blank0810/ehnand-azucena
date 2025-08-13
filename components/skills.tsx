"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Database, Globe, Cloud, Code, Layers } from "lucide-react"

const skillCategories = [
  {
    title: "Backend",
    icon: Database,
    skills: ["Symfony", "Laravel", "CodeIgniter", "Node.js", "C#.NET"],
  },
  {
    title: "Frontend",
    icon: Globe,
    skills: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "TSX", "Bootstrap", "ShadCN UI"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "SQLite", "SQL Server", "Transact-SQL"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "CI/CD", "Docker", "UNIX/Linux", "Virtual Machines"],
  },
  {
    title: "APIs",
    icon: Layers,
    skills: ["REST", "SOAP", "GraphQL", "Google APIs", "Github"],
  },
  {
    title: "Programming",
    icon: Code,
    skills: ["JavaScript", "TypeScript", "PHP", "Python", "C#", "SQL"],
  },
]

const proficiencyLevels = [
  { name: "Frontend Development", percentage: 90, color: "bg-blue-500" },
  { name: "Backend Development", percentage: 95, color: "bg-green-500" },
  { name: "Database Management", percentage: 85, color: "bg-yellow-500" },
  { name: "Cloud Infrastructure", percentage: 80, color: "bg-blue-600" },
  { name: "DevOps", percentage: 75, color: "bg-green-600" },
  { name: "UI/UX Design", percentage: 70, color: "bg-orange-500" },
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
          className="section-title gradient-text mb-16"
        >
          Technical Skills
        </motion.h2>

        {/* Skills Categories Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                      className="px-3 py-1 bg-gray-700/80 text-gray-300 text-sm rounded-full border border-gray-600/50 hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Proficiency Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Proficiency Levels</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {proficiencyLevels.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-white font-bold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: 1.2 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

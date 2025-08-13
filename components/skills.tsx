"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Database, Globe, Cloud, Layers, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Backend",
    icon: Database,
    skills: ["Laravel", "Symfony", "NestJS", "Node.js", "C#.NET", "CodeIgniter"],
  },
  {
    title: "Frontend",
    icon: Globe,
    skills: ["React.js", "Next.js", "Bootstrap", "Tailwind CSS", "ShadCN UI"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "SQL Server", "SQLite", "T-SQL"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["Docker", "Bitbucket CI/CD", "Vultr", "AWS", "UNIX/Linux", "Git"],
  },
  {
    title: "APIs",
    icon: Layers,
    skills: ["REST", "GraphQL", "OAuth2", "Google APIs", "Xero", "Stripe", "PayPal", "HubSpot", "Twilio"],
  },
  {
    title: "Systems & Tools",
    icon: Settings,
    skills: ["GitHub", "VS Code", "Cursor AI", "Ubuntu", "Bitbucket", "Agile"],
  },
]

const proficiencyLevels = [
  { name: "Backend Development", percentage: 95, color: "bg-green-500" },
  { name: "Frontend Development", percentage: 85, color: "bg-blue-500" },
  { name: "Database Management", percentage: 90, color: "bg-yellow-500" },
  { name: "Cloud Infrastructure", percentage: 75, color: "bg-blue-600" },
  { name: "API Integration", percentage: 88, color: "bg-purple-500" },
  { name: "DevOps & Tools", percentage: 80, color: "bg-orange-500" },
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
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Technical Skills
        </motion.h2>

        {/* Skills Categories Grid - Exact 3x2 layout from original */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-cyan-400" />
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
                      className="px-3 py-1.5 bg-slate-700/80 text-slate-300 text-sm rounded-full border border-slate-600/50 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-slate-600/80 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Proficiency Levels - Exact match to original design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white">Proficiency Levels</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {proficiencyLevels.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium text-lg">{skill.name}</span>
                  <span className="text-white font-bold text-lg">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden border border-slate-600/30">
                  <motion.div
                    className={`h-full rounded-full ${skill.color} shadow-lg`}
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

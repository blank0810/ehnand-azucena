"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"

const education = [
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
    achievements: ["Valedictorian", "Programming Competition Winner", "Science Fair Gold Medalist"],
  },
]

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="education" className="py-20 bg-gray-900 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Education
        </motion.h2>

        <div ref={ref} className="mt-12 space-y-12">
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="card hover:border-l-4 hover:border-primary transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                    {item.degree}
                  </h3>
                  <h4 className="text-lg text-primary mt-1">{item.institution}</h4>
                </div>
                <div className="mt-2 md:mt-0 flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{item.period}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-400 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{item.location}</span>
              </div>

              <p className="text-gray-300 mb-6">{item.description}</p>

              <div>
                <h5 className="font-semibold mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-2 text-primary" />
                  Achievements
                </h5>
                <ul className="list-disc pl-5 text-gray-300">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="mb-1">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

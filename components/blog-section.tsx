"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPosts = [
  {
    title: "Building Scalable Web Applications with React and Laravel",
    excerpt:
      "Learn how to combine React's frontend capabilities with Laravel's robust backend to create scalable web applications.",
    date: "May 15, 2025",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    tags: ["React", "Laravel", "Web Development"],
  },
  {
    title: "Optimizing Database Performance in High-Traffic Applications",
    excerpt:
      "Discover techniques to optimize database performance and ensure smooth operation even under high traffic conditions.",
    date: "April 28, 2025",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    tags: ["Database", "Performance", "Optimization"],
  },
  {
    title: "Implementing Secure Authentication in Modern Web Apps",
    excerpt: "A comprehensive guide to implementing secure authentication systems in modern web applications.",
    date: "April 10, 2025",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    tags: ["Security", "Authentication", "Web Development"],
  },
]

export default function BlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="blog" className="py-20 bg-gray-900 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Latest Articles
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Sharing my knowledge and insights about web development, system engineering, and technology trends.
        </motion.p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-gray-700 text-primary px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link
                  href={post.link}
                  className="text-primary hover:text-white flex items-center transition-colors duration-300 mt-auto"
                >
                  Read more <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="/blog"
            className="btn-outline inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Articles <ArrowRight className="h-4 w-4 ml-2" />
          </motion.a>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CTO at TechCorp",
    image: "/placeholder.svg?height=100&width=100",
    text: "Ehnand delivered an exceptional web application that exceeded our expectations. His technical expertise and attention to detail resulted in a product that has significantly improved our business operations.",
  },
  {
    name: "Michael Chen",
    position: "Product Manager at InnovateSoft",
    image: "/placeholder.svg?height=100&width=100",
    text: "Working with Ehnand was a pleasure. He understood our requirements perfectly and delivered a solution that was not only technically sound but also user-friendly and visually appealing.",
  },
  {
    name: "Jessica Williams",
    position: "CEO at DataDrive",
    image: "/placeholder.svg?height=100&width=100",
    text: "Ehnand's expertise in full-stack development helped us create a robust and scalable platform. His problem-solving skills and commitment to quality are truly impressive.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gray-950 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Client Testimonials
        </motion.h2>

        <div ref={ref} className="mt-12 relative">
          <div className="absolute top-0 left-0 -mt-8 text-primary opacity-20">
            <Quote className="h-24 w-24" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl text-gray-300 italic mb-8 relative z-10">{testimonials[currentIndex].text}</p>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-400">{testimonials[currentIndex].position}</p>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-primary" : "bg-gray-700 hover:bg-gray-600"
                    } transition-colors duration-300`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

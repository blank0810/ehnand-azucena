"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Send, Check } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // This function will be called when the form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Replace "YOUR_FORM_ID" with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage("Thank you for your message! I'll get back to you soon.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
      setSubmitMessage("Oops! Something went wrong. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-950 relative">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title gradient-text"
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <p className="text-gray-300 mb-8">
              Feel free to reach out to me for any inquiries, collaboration opportunities, or just to say hello!
            </p>

            <div className="space-y-6">
              <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-300">09534678287 / 09128956168</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-300">ehnand.azucena00@gmail.com</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-gray-300">Initao, Northern Mindanao 9022, Philippines</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12"
            >
              <div className="terminal-window">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                  </div>
                  <div className="text-xs text-gray-400">contact.sh</div>
                </div>
                <div className="text-sm">
                  <p className="terminal-prompt">
                    <span className="text-terminal-green">send_email</span> --to ehnand.azucena00@gmail.com
                  </p>
                  <p className="terminal-output">Connecting to mail server...</p>
                  <p className="terminal-output terminal-success">Connection established!</p>
                  <p className="terminal-output">
                    Ready to send your message <span className="animate-pulse">_</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  whileFocus={{ scale: 1.01 }}
                ></motion.textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    {submitStatus === "success" ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {submitStatus === "success" ? "Message Sent" : "Send Message"}
                  </>
                )}
              </motion.button>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center mt-4 ${submitStatus === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {submitMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

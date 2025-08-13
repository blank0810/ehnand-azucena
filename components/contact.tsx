"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Linkedin, Github, ExternalLink, Copy, Check, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const copyToClipboard = async (text: string, item: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(item)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ehnand.azucena00@gmail.com",
      href: "mailto:ehnand.azucena00@gmail.com",
      copyable: true,
      id: "email",
      description: "Send me a direct email",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+63 953 467 8287",
      displayValue: "+63 953 467 8287",
      copyValue: "+639534678287",
      href: "https://wa.me/639534678287",
      copyable: true,
      id: "whatsapp",
      description: "Message me on WhatsApp",
      external: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me professionally",
      href: "https://www.linkedin.com/in/ehnand-azucena-3028a7194",
      external: true,
      id: "linkedin",
      description: "Professional networking",
    },
  ]

  const additionalInfo = [
    {
      icon: Github,
      label: "GitHub",
      value: "View my projects and code",
      href: "https://github.com/blank0810",
      external: true,
      id: "github",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Initao, Northern Mindanao 9022, Philippines",
      copyable: true,
      id: "location",
    },
  ]

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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 mb-16 max-w-2xl mx-auto text-lg"
        >
          Ready to collaborate or discuss opportunities? Here are the best ways to reach me directly.
        </motion.p>

        {/* Primary Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="text-center">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-full w-20 h-20 mx-auto mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8 text-primary mx-auto mt-2" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{contact.label}</h3>
                  <p className="text-gray-400 text-sm mb-3">{contact.description}</p>
                  <p className="text-gray-200 mb-6 font-medium">{contact.displayValue || contact.value}</p>

                  <div className="flex gap-3 justify-center">
                    {contact.href && (
                      <motion.a
                        href={contact.href}
                        target={contact.external ? "_blank" : undefined}
                        rel={contact.external ? "noopener noreferrer" : undefined}
                        className="btn-primary flex items-center gap-2 text-sm px-4 py-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {contact.external ? (
                          <>
                            {contact.label === "WhatsApp" ? (
                              <>
                                <MessageCircle className="h-4 w-4" />
                                Chat Now
                              </>
                            ) : (
                              <>
                                Connect <ExternalLink className="h-4 w-4" />
                              </>
                            )}
                          </>
                        ) : contact.label === "Email" ? (
                          <>
                            <Mail className="h-4 w-4" />
                            Email Me
                          </>
                        ) : (
                          <>
                            <Phone className="h-4 w-4" />
                            Call Now
                          </>
                        )}
                      </motion.a>
                    )}

                    {contact.copyable && (
                      <motion.button
                        onClick={() => copyToClipboard(contact.copyValue || contact.value, contact.id)}
                        className="btn-outline flex items-center gap-2 text-sm px-4 py-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {copiedItem === contact.id ? (
                          <>
                            Copied! <Check className="h-4 w-4 text-green-400" />
                          </>
                        ) : (
                          <>
                            Copy <Copy className="h-4 w-4" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {additionalInfo.map((contact, index) => {
            const Icon = contact.icon
            return (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center p-6 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-lg border border-gray-700 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg"
              >
                <div className="bg-primary/20 p-4 rounded-full mr-6 group-hover:bg-primary/30 transition-colors duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl mb-2 text-white">{contact.label}</h4>
                  <p className="text-gray-300">{contact.value}</p>
                </div>
                <div className="flex gap-3">
                  {contact.href && (
                    <motion.a
                      href={contact.href}
                      target={contact.external ? "_blank" : undefined}
                      rel={contact.external ? "noopener noreferrer" : undefined}
                      className="p-3 bg-primary/20 rounded-full hover:bg-primary/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title={`Visit ${contact.label}`}
                    >
                      <ExternalLink className="h-5 w-5 text-primary" />
                    </motion.a>
                  )}

                  {contact.copyable && (
                    <motion.button
                      onClick={() => copyToClipboard(contact.value, contact.id)}
                      className="p-3 bg-primary/20 rounded-full hover:bg-primary/30 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Copy to clipboard"
                    >
                      {copiedItem === contact.id ? (
                        <Check className="h-5 w-5 text-green-400" />
                      ) : (
                        <Copy className="h-5 w-5 text-primary" />
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 p-8 rounded-xl border border-primary/20 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4 gradient-text">Let's Connect</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              I'm always open to discussing new opportunities, collaborations, or just having a conversation about
              technology and development.
            </p>

            {/* Quick Contact Actions */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <motion.a
                href="mailto:ehnand.azucena00@gmail.com"
                className="btn-primary flex items-center gap-2 px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
                Email Me
              </motion.a>
              <motion.a
                href="https://wa.me/639534678287"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ehnand-azucena-3028a7194"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 px-6 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </motion.a>
            </div>

            {/* Response Time Info */}
            <div className="text-sm text-gray-400">
              <p>📧 Email responses within 24 hours</p>
              <p>💬 WhatsApp messages during business hours (GMT+8)</p>
            </div>
          </div>
        </motion.div>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-900/30 border border-green-700 rounded-full backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-semibold text-lg">Available for new opportunities</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

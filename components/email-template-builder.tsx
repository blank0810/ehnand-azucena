"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import EmailPreviewModal from "./email-preview-modal"

export default function EmailTemplateBuilder() {
  const [emailData, setEmailData] = useState({
    subject: "",
    recipient: "",
    content: "",
  })

  const [templates] = useState([
    {
      name: "Welcome Email",
      subject: "Welcome to our platform!",
      content: "Thank you for joining us. We're excited to have you on board!",
    },
    {
      name: "Contact Response",
      subject: "Thank you for contacting us",
      content: "We've received your message and will get back to you soon.",
    },
  ])

  const loadTemplate = (template: (typeof templates)[0]) => {
    setEmailData({
      ...emailData,
      subject: template.subject,
      content: template.content,
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Template Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Email Template Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Templates */}
          <div>
            <label className="text-sm font-medium mb-2 block">Quick Templates:</label>
            <div className="flex gap-2 flex-wrap">
              {templates.map((template, index) => (
                <Button key={index} variant="outline" size="sm" onClick={() => loadTemplate(template)}>
                  {template.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Email Fields */}
          <div>
            <label className="text-sm font-medium mb-2 block">Recipient:</label>
            <Input
              value={emailData.recipient}
              onChange={(e) => setEmailData({ ...emailData, recipient: e.target.value })}
              placeholder="recipient@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Subject:</label>
            <Input
              value={emailData.subject}
              onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
              placeholder="Email subject"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Content:</label>
            <Textarea
              value={emailData.content}
              onChange={(e) => setEmailData({ ...emailData, content: e.target.value })}
              placeholder="Email content..."
              rows={8}
            />
          </div>

          {/* Preview Button */}
          <EmailPreviewModal subject={emailData.subject} content={emailData.content} recipient={emailData.recipient} />
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-white min-h-96">
            <div className="border-b pb-2 mb-4">
              <div className="text-sm text-gray-600">
                <strong>To:</strong> {emailData.recipient || "recipient@example.com"}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Subject:</strong> {emailData.subject || "Email subject"}
              </div>
            </div>
            <div className="prose prose-sm max-w-none">
              {emailData.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: emailData.content.replace(/\n/g, "<br>"),
                  }}
                />
              ) : (
                <p className="text-gray-400 italic">Email content will appear here...</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

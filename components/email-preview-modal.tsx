"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye, Send, Copy } from "lucide-react"

interface EmailPreviewProps {
  subject: string
  content: string
  recipient: string
}

export default function EmailPreviewModal({ subject, content, recipient }: EmailPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  const emailHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { padding: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>${subject}</h2>
            <p><strong>To:</strong> ${recipient}</p>
          </div>
          <div class="content">
            ${content.replace(/\n/g, "<br>")}
          </div>
        </div>
      </body>
    </html>
  `

  const copyEmailHTML = () => {
    navigator.clipboard.writeText(emailHTML)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Eye className="h-4 w-4" />
          Preview Email
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Email Preview</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Email Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Subject:</strong> {subject}
              </div>
              <div>
                <strong>To:</strong> {recipient}
              </div>
            </div>
          </div>

          {/* Preview Iframe */}
          <div className="border rounded-lg overflow-hidden">
            <iframe srcDoc={emailHTML} className="w-full h-96 border-0" title="Email Preview" />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={copyEmailHTML}>
              <Copy className="h-4 w-4 mr-2" />
              Copy HTML
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

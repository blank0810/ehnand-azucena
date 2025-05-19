import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Here you would integrate with an email service like SendGrid, Mailgun, etc.
    // Example with SendGrid (you would need to install @sendgrid/mail):
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    const msg = {
      to: 'ehnand.azucena00@gmail.com',
      from: 'your-verified-sender@example.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }
    
    await sgMail.send(msg)
    */

    // For now, we'll just simulate a successful response
    console.log("Email would be sent with:", { name, email, subject, message })

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
  }
}

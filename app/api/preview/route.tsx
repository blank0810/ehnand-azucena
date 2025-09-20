import { type NextRequest, NextResponse } from "next/server"
import { LinkPreviewGenerator } from "@/lib/link-preview-generator"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const platform = searchParams.get("platform") || undefined
    const format = searchParams.get("format") || "json"

    // Initialize the generator with the actual domain
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "production"
        ? "https://your-portfolio-domain.com"
        : "http://localhost:3000"

    const generator = new LinkPreviewGenerator(baseUrl)
    const result = await generator.generateCompletePreview(platform)

    // Return different formats based on request
    switch (format) {
      case "html":
        return new NextResponse(
          `<!DOCTYPE html>
          <html>
          <head>
            <title>${result.metaTags.title}</title>
            <meta name="description" content="${result.metaTags.description}" />
            <meta property="og:title" content="${result.metaTags["og:title"]}" />
            <meta property="og:description" content="${result.metaTags["og:description"]}" />
            <meta property="og:image" content="${result.metaTags["og:image"]}" />
            <meta property="og:url" content="${result.metaTags["og:url"]}" />
            <meta property="og:type" content="${result.metaTags["og:type"]}" />
            <meta name="twitter:card" content="${result.metaTags["twitter:card"]}" />
            <meta name="twitter:title" content="${result.metaTags["twitter:title"]}" />
            <meta name="twitter:description" content="${result.metaTags["twitter:description"]}" />
            <meta name="twitter:image" content="${result.metaTags["twitter:image"]}" />
          </head>
          <body>
            <h1>${result.preview.title}</h1>
            <p>${result.preview.description}</p>
          </body>
          </html>`,
          {
            headers: {
              "Content-Type": "text/html",
            },
          },
        )

      case "structured-data":
        return NextResponse.json(result.structuredData)

      default:
        return NextResponse.json({
          success: true,
          data: result,
        })
    }
  } catch (error) {
    console.error("Preview API Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate preview data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image, url, platform } = body

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
          message: "Title and description are required",
        },
        { status: 400 },
      )
    }

    const baseUrl =
      url || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://your-portfolio-domain.com"

    const generator = new LinkPreviewGenerator(baseUrl)

    // Override default data with provided data
    const customPreview = {
      title,
      description,
      image: image || generator.generatePreviewData().image,
      url: baseUrl,
      siteName: "Ehnand Azucena Portfolio",
      type: "website",
    }

    const structuredData = generator.generateStructuredData()
    const metaTags = generator.generateMetaTags(platform)

    return NextResponse.json({
      success: true,
      data: {
        preview: customPreview,
        structuredData,
        metaTags,
        meta: {
          generated_at: new Date().toISOString(),
          platform: platform || "custom",
          format: "json",
        },
      },
    })
  } catch (error) {
    console.error("Preview API POST Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process custom preview data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

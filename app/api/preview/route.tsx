import { type NextRequest, NextResponse } from "next/server"
import { createLinkPreviewGenerator } from "@/lib/link-preview-generator"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const platform = searchParams.get("platform") || undefined
    const format = searchParams.get("format") || "json"

    // Get the actual domain from the request
    const protocol = request.headers.get("x-forwarded-proto") || "https"
    const host = request.headers.get("host") || "your-portfolio-domain.com"
    const baseUrl = `${protocol}://${host}`

    const generator = createLinkPreviewGenerator(baseUrl)
    const result = await generator.generateCompletePreview(platform)

    // Return different formats based on request
    switch (format) {
      case "html":
        const metaTags = Object.entries(result.metaTags)
          .map(([key, value]) => {
            if (key.startsWith("og:") || key.startsWith("twitter:")) {
              const property = key.startsWith("og:") ? "property" : "name"
              return `<meta ${property}="${key}" content="${value}" />`
            }
            return `<meta name="${key}" content="${value}" />`
          })
          .join("\n    ")

        return new NextResponse(
          `<!DOCTYPE html>
<html>
<head>
    <title>${result.metaTags.title}</title>
    ${metaTags}
    <script type="application/ld+json">
    ${JSON.stringify(result.structuredData, null, 2)}
    </script>
</head>
<body>
    <h1>${result.preview.title}</h1>
    <p>${result.preview.description}</p>
    <img src="${result.preview.image}" alt="Profile" style="max-width: 300px;" />
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

    // Get the actual domain from the request
    const protocol = request.headers.get("x-forwarded-proto") || "https"
    const host = request.headers.get("host") || "your-portfolio-domain.com"
    const baseUrl = url || `${protocol}://${host}`

    const generator = createLinkPreviewGenerator(baseUrl)

    // Update with custom data
    generator.updatePreviewData({
      title,
      description,
      image: image || `${baseUrl}/images/profile-new.jpg`,
      url: baseUrl,
      siteName: "Ehnand Azucena Portfolio",
      type: "website",
      locale: "en_US",
    })

    const result = await generator.generateCompletePreview(platform)

    return NextResponse.json({
      success: true,
      data: result,
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

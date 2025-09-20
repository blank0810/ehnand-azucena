import { type NextRequest, NextResponse } from "next/server"
import { linkPreviewGenerator } from "@/lib/link-preview-generator"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const platform = searchParams.get("platform") as "facebook" | "twitter" | "linkedin" | "whatsapp" | null
    const format = searchParams.get("format") || "json"

    let previewData
    if (platform) {
      previewData = linkPreviewGenerator.getPreviewDataForPlatform(platform)
    } else {
      previewData = linkPreviewGenerator.getPreviewData()
    }

    const structuredData = linkPreviewGenerator.generateStructuredData()
    const metaTagsData = linkPreviewGenerator.generateMetaTagsData()

    if (format === "structured") {
      return NextResponse.json(structuredData)
    }

    return NextResponse.json({
      success: true,
      data: {
        preview: previewData,
        structuredData,
        metaTags: metaTagsData,
      },
      meta: {
        generated_at: new Date().toISOString(),
        platform: platform || "all",
        format: "json",
      },
    })
  } catch (error) {
    console.error("Error generating preview data:", error)
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
    const { title, description, image, url } = body

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title and description are required",
        },
        { status: 400 },
      )
    }

    // Update preview data
    linkPreviewGenerator.updatePreviewData({
      title,
      description,
      image,
      url,
    })

    return NextResponse.json({
      success: true,
      message: "Preview data updated successfully",
      data: linkPreviewGenerator.getPreviewData(),
    })
  } catch (error) {
    console.error("Error updating preview data:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update preview data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

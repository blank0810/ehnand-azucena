"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Copy, RefreshCw, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PreviewData {
  preview: {
    title: string
    description: string
    image: string
    url: string
    platform: string
    characterLimits: {
      title: number
      description: number
    }
  }
  metaTags: Record<string, string>
  structuredData: object
}

export default function LinkPreviewTester() {
  const [isOpen, setIsOpen] = useState(false)
  const [previewData, setPreviewData] = useState<Record<string, PreviewData>>({})
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const platforms = [
    { id: "facebook", name: "Facebook", color: "bg-blue-600" },
    { id: "twitter", name: "Twitter", color: "bg-sky-500" },
    { id: "linkedin", name: "LinkedIn", color: "bg-blue-700" },
    { id: "whatsapp", name: "WhatsApp", color: "bg-green-600" },
  ]

  const fetchPreviewData = async (platform?: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/preview?platform=${platform || "default"}`)
      const result = await response.json()

      if (result.success) {
        setPreviewData((prev) => ({
          ...prev,
          [platform || "default"]: result.data,
        }))
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch preview data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching preview:", error)
      toast({
        title: "Error",
        description: "Failed to fetch preview data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Copied!",
        description: "Portfolio URL copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      })
    }
  }

  const refreshData = () => {
    setPreviewData({})
    platforms.forEach((platform) => {
      fetchPreviewData(platform.id)
    })
    fetchPreviewData() // Default platform
  }

  const shareUrl = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent("Check out Ehnand Azucena's Full Stack Developer Portfolio")

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
  }

  useEffect(() => {
    if (isOpen && Object.keys(previewData).length === 0) {
      refreshData()
    }
  }, [isOpen])

  const renderPreview = (data: PreviewData, platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId)

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-3 h-3 rounded-full ${platform?.color || "bg-gray-500"}`} />
            <span className="text-sm font-medium">{platform?.name || "Default"}</span>
            <Badge variant="outline" className="text-xs">
              {data.preview.characterLimits.title}ch title
            </Badge>
          </div>

          <div className="border rounded-lg overflow-hidden bg-card">
            <img src={data.preview.image || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">{data.preview.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-3 mb-2">{data.preview.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground truncate">{data.preview.url}</span>
                <Button size="sm" variant="outline" onClick={() => shareUrl(platformId)} className="h-6 px-2 text-xs">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-lg"
        size="icon"
      >
        <Eye className="w-5 h-5" />
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Link Preview Tester</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={refreshData} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={copyUrl}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </CardHeader>

            <CardContent className="overflow-y-auto">
              <Tabs defaultValue="facebook" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {platforms.map((platform) => (
                    <TabsTrigger key={platform.id} value={platform.id}>
                      {platform.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {platforms.map((platform) => (
                  <TabsContent key={platform.id} value={platform.id} className="mt-6">
                    {loading ? (
                      <div className="flex items-center justify-center h-64">
                        <RefreshCw className="w-8 h-8 animate-spin" />
                      </div>
                    ) : previewData[platform.id] ? (
                      <div className="space-y-6">
                        {renderPreview(previewData[platform.id], platform.id)}

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Preview Data</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <strong>Title:</strong> {previewData[platform.id].preview.title}
                              </div>
                              <div>
                                <strong>Platform:</strong> {platform.name}
                              </div>
                              <div className="md:col-span-2">
                                <strong>Description:</strong> {previewData[platform.id].preview.description}
                              </div>
                              <div className="md:col-span-2">
                                <strong>Image:</strong> {previewData[platform.id].preview.image}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p>No preview data available. Click refresh to load.</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

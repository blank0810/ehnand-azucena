"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, X, ExternalLink, Share2, Copy, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

interface PreviewData {
  title: string
  description: string
  image: string
  url: string
  siteName: string
}

interface ApiResponse {
  success: boolean
  data: {
    preview: PreviewData
    structuredData: object
    metaTags: object
  }
  meta: {
    generated_at: string
    platform: string
    format: string
  }
}

export default function LinkPreviewTester() {
  const [isOpen, setIsOpen] = useState(false)
  const [previewData, setPreviewData] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("facebook")

  useEffect(() => {
    if (isOpen && !previewData) {
      fetchPreviewData()
    }
  }, [isOpen, previewData])

  const fetchPreviewData = async (platform?: string) => {
    setLoading(true)
    try {
      const url = platform ? `/api/preview?platform=${platform}` : "/api/preview"
      const response = await fetch(url)
      const result: ApiResponse = await response.json()

      if (result.success) {
        setPreviewData(result.data.preview)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch preview data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to fetch preview data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch preview data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied!",
        description: "URL copied to clipboard",
      })
    } catch (err) {
      console.error("Failed to copy:", err)
      toast({
        title: "Error",
        description: "Failed to copy URL",
        variant: "destructive",
      })
    }
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(previewData?.url || "")}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(previewData?.url || "")}&text=${encodeURIComponent(previewData?.title || "")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(previewData?.url || "")}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${previewData?.title || ""} ${previewData?.url || ""}`)}`,
  }

  const FacebookPreview = () => (
    <Card className="w-full max-w-md bg-white text-black border">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">EA</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Ehnand Azucena</div>
            <div className="text-xs text-gray-500">2 minutes ago • 🌐</div>
          </div>
        </div>
        <p className="text-sm mb-4">Check out my portfolio! 🚀</p>
      </div>
      <div className="border-t">
        {previewData?.image && (
          <div className="relative w-full h-48">
            <Image
              src={previewData.image || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}
        <div className="p-4 bg-gray-50">
          <div className="text-xs text-gray-500 uppercase mb-1">{previewData?.siteName}</div>
          <div className="font-semibold text-lg mb-2 line-clamp-2">{previewData?.title}</div>
          <div className="text-sm text-gray-600 line-clamp-3">{previewData?.description}</div>
        </div>
      </div>
    </Card>
  )

  const TwitterPreview = () => (
    <Card className="w-full max-w-md bg-white text-black border">
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">EA</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">Ehnand Azucena</span>
              <span className="text-gray-500 text-sm">@ehnandazucena</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">2m</span>
            </div>
            <p className="text-sm mt-2">Check out my portfolio! 🚀 #WebDeveloper #Laravel #React</p>
          </div>
        </div>
      </div>
      <div className="border rounded-2xl overflow-hidden mx-4 mb-4">
        {previewData?.image && (
          <div className="relative w-full h-48">
            <Image
              src={previewData.image || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}
        <div className="p-4">
          <div className="font-bold text-sm mb-1 line-clamp-2">{previewData?.title}</div>
          <div className="text-sm text-gray-600 mb-2 line-clamp-2">{previewData?.description}</div>
          <div className="text-sm text-gray-500">{previewData?.url}</div>
        </div>
      </div>
    </Card>
  )

  const LinkedInPreview = () => (
    <Card className="w-full max-w-md bg-white text-black border">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">EA</span>
          </div>
          <div>
            <div className="font-semibold text-sm">Ehnand Azucena</div>
            <div className="text-xs text-gray-500">Full Stack Developer • 1st</div>
            <div className="text-xs text-gray-500">2 minutes ago</div>
          </div>
        </div>
        <p className="text-sm mb-4">
          Excited to share my latest portfolio showcasing my expertise in Laravel, React, and Symfony! 💻
          #FullStackDeveloper #Laravel #React #Symfony
        </p>
      </div>
      <div className="border rounded-lg overflow-hidden mx-4 mb-4">
        {previewData?.image && (
          <div className="relative w-full h-48">
            <Image
              src={previewData.image || "/placeholder.svg"}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}
        <div className="p-4 bg-gray-50">
          <div className="font-bold text-sm mb-2 line-clamp-2">{previewData?.title}</div>
          <div className="text-sm text-gray-600 mb-2 line-clamp-3">{previewData?.description}</div>
          <div className="text-xs text-gray-500">{previewData?.siteName}</div>
        </div>
      </div>
    </Card>
  )

  const WhatsAppPreview = () => (
    <Card className="w-full max-w-md bg-green-50 text-black">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">EA</span>
          </div>
          <div>
            <div className="font-semibold text-sm">You</div>
            <div className="text-xs text-gray-500">Today, 2:30 PM</div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-sm mb-3">Check out my portfolio! 🚀</p>
          <div className="border rounded-lg overflow-hidden">
            {previewData?.image && (
              <div className="relative w-full h-32">
                <Image
                  src={previewData.image || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            )}
            <div className="p-3">
              <div className="font-bold text-sm mb-1 line-clamp-2">{previewData?.title}</div>
              <div className="text-xs text-gray-600 mb-2 line-clamp-2">{previewData?.description}</div>
              <div className="text-xs text-blue-600">{previewData?.url}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
          title="Test Link Preview"
        >
          <Eye className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Link Preview Tester</h2>
                    <p className="text-gray-600 dark:text-gray-400">See how your portfolio appears when shared</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => fetchPreviewData()} disabled={loading}>
                      <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* URL Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Share2 className="w-5 h-5" />
                          Portfolio URL
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <code className="flex-1 text-sm font-mono">{previewData?.url}</code>
                          <Button variant="outline" size="sm" onClick={() => copyToClipboard(previewData?.url || "")}>
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Platform Previews */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Platform Previews</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="facebook">Facebook</TabsTrigger>
                            <TabsTrigger value="twitter">Twitter</TabsTrigger>
                            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                          </TabsList>

                          <div className="mt-6 flex justify-center">
                            <TabsContent value="facebook" className="mt-0">
                              <FacebookPreview />
                            </TabsContent>
                            <TabsContent value="twitter" className="mt-0">
                              <TwitterPreview />
                            </TabsContent>
                            <TabsContent value="linkedin" className="mt-0">
                              <LinkedInPreview />
                            </TabsContent>
                            <TabsContent value="whatsapp" className="mt-0">
                              <WhatsAppPreview />
                            </TabsContent>
                          </div>
                        </Tabs>
                      </CardContent>
                    </Card>

                    {/* Preview Data */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Preview Data</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Title
                          </Badge>
                          <p className="text-sm">{previewData?.title}</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Description
                          </Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{previewData?.description}</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            Image
                          </Badge>
                          <p className="text-sm text-blue-600">{previewData?.image}</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Share Buttons */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Test Real Sharing</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(shareUrls).map(([platform, url]) => (
                            <Button
                              key={platform}
                              variant="outline"
                              onClick={() => window.open(url, "_blank", "width=600,height=400")}
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

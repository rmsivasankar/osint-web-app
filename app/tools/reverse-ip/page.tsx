"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Search, Copy, Check, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ReverseIpLookup() {
  const [ip, setIp] = useState("")
  const [data, setData] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const fetchReverseIpData = async () => {
    if (!ip) return
    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch(`/api/reverse-ip?ip=${ip}`)
      const result = await res.json()

      if (res.ok) {
        setData(result.domains || [])
      } else {
        setError(result.error || "Failed to fetch data.")
      }
    } catch (err) {
      setError("An error occurred.")
    }

    setLoading(false)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-24 px-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Reverse IP Lookup</h1>
        <p className="text-gray-600">Find domains hosted on a specific IP address</p>
      </div>

      {/* Search Box */}
      <Card className="overflow-hidden border-gray-100 shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                className="pl-10 h-11 border-gray-200 focus:border-blue-500"
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchReverseIpData()}
              />
            </div>
            <Button
              onClick={fetchReverseIpData}
              disabled={loading || !ip}
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Lookup"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      {/* Domains Results */}
      {data && (
        <Card className="border border-gray-100 shadow-soft overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium">
                Domains Hosted on <span className="font-mono">{ip}</span>
              </CardTitle>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {data.length} Found
              </Badge>
            </div>
            <CardDescription className="text-blue-100 mt-1">List of domains sharing this IP address</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {data.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {data.map((domain, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 ${index % 2 === 1 ? "bg-gray-50" : ""}`}
                  >
                    <div className="font-mono text-sm">{domain}</div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => window.open(`https://${domain}`, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(domain, `domain-${index}`)}
                      >
                        {copied === `domain-${index}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="py-8">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Domains Found</h3>
                  <p className="text-gray-600">
                    We could not find any domains hosted on {ip}. This could mean the IP is not hosting any public
                    websites or they are not discoverable.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}


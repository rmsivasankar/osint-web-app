"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Globe, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DNSRecord {
  type: string
  value: string
  ttl?: number
  priority?: number
}

export default function DnsLookup() {
  const [domain, setDomain] = useState("")
  const [data, setData] = useState<DNSRecord[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const fetchDnsData = async () => {
    if (!domain) return
    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch(`/api/dns?domain=${domain}`)
      const result = await res.json()

      if (res.ok) {
        setData(result)
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

  // Group records by type
  const recordsByType: Record<string, DNSRecord[]> = {}
  if (data) {
    data.forEach((record) => {
      if (!recordsByType[record.type]) {
        recordsByType[record.type] = []
      }
      recordsByType[record.type].push(record)
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-24 px-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">DNS Lookup</h1>
        <p className="text-gray-600">Analyze DNS records and configurations for any domain</p>
      </div>

      {/* Search Box */}
      <Card className="overflow-hidden border-gray-100 shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                className="pl-10 h-11 border-gray-200 focus:border-blue-500"
                placeholder="Enter domain (example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchDnsData()}
              />
            </div>
            <Button
              onClick={fetchDnsData}
              disabled={loading || !domain}
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Lookup"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

      {/* DNS Records */}
      {data && data.length > 0 && (
        <Card className="border border-gray-100 shadow-soft overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium">
                DNS Records for <span className="font-mono">{domain}</span>
              </CardTitle>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {data.length} Records
              </Badge>
            </div>
            <CardDescription className="text-blue-100 mt-1">
              DNS (Domain Name System) records for this domain
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <div className="border-b border-gray-200">
                <TabsList className="h-auto p-0 bg-transparent">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-3"
                  >
                    All Records ({data.length})
                  </TabsTrigger>
                  {Object.keys(recordsByType).map((type) => (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none border-b-2 border-transparent px-4 py-3"
                    >
                      {type} ({recordsByType[type].length})
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="w-24 font-medium">Type</TableHead>
                      <TableHead className="font-medium">Value</TableHead>
                      <TableHead className="w-24 font-medium">TTL</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((record, index) => (
                      <TableRow key={index} className={index % 2 === 1 ? "bg-gray-50 hover:bg-gray-50" : ""}>
                        <TableCell>
                          <Badge variant="outline" className="font-mono bg-blue-50 text-blue-700 border-blue-200">
                            {record.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm break-all">{record.value}</TableCell>
                        <TableCell>{record.ttl || "N/A"}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-blue-600"
                            onClick={() => copyToClipboard(record.value, `record-${index}`)}
                          >
                            {copied === `record-${index}` ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              {Object.keys(recordsByType).map((type) => (
                <TabsContent key={type} value={type} className="mt-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 hover:bg-gray-50">
                        <TableHead className="w-24 font-medium">Type</TableHead>
                        <TableHead className="font-medium">Value</TableHead>
                        <TableHead className="w-24 font-medium">TTL</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recordsByType[type].map((record, index) => (
                        <TableRow key={index} className={index % 2 === 1 ? "bg-gray-50 hover:bg-gray-50" : ""}>
                          <TableCell>
                            <Badge variant="outline" className="font-mono bg-blue-50 text-blue-700 border-blue-200">
                              {record.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm break-all">{record.value}</TableCell>
                          <TableCell>{record.ttl || "N/A"}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-blue-600"
                              onClick={() => copyToClipboard(record.value, `${type}-${index}`)}
                            >
                              {copied === `${type}-${index}` ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}

      {data && data.length === 0 && (
        <Card className="border border-gray-100 shadow-soft">
          <CardContent className="p-6 text-center">
            <div className="py-8">
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">No DNS Records Found</h3>
              <p className="text-gray-600">
                We could not find any DNS records for {domain}. Please check the domain name and try again.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


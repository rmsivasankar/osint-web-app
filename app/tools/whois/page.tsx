"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Globe, ExternalLink, Copy, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function WhoisLookup() {
  const [domain, setDomain] = useState("")
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState<string | null>(null)

  const fetchWhoisData = async () => {
    if (!domain) return
    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch(`/api/whois?domain=${domain}`)
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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-24 px-4">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">WHOIS Lookup</h1>
        <p className="text-gray-600">Retrieve registration information for any domain name</p>
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
                onKeyDown={(e) => e.key === "Enter" && fetchWhoisData()}
              />
            </div>
            <Button
              onClick={fetchWhoisData}
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

      {/* WHOIS Data Card */}
      {data && (
        <Card className="border border-gray-100 shadow-soft overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-medium">
                WHOIS Data for <span className="font-mono">{domain}</span>
              </CardTitle>
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {data.domain_name ? "Registered" : "Domain Info"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="w-1/3 font-medium">Field</TableHead>
                  <TableHead className="font-medium">Value</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Registrar</TableCell>
                  <TableCell>{data.registrar || "N/A"}</TableCell>
                  <TableCell>
                    {data.registrar && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.registrar, "registrar")}
                      >
                        {copied === "registrar" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableCell className="font-medium">Registrar URL</TableCell>
                  <TableCell>
                    {data.registrar_url ? (
                      <a
                        href={data.registrar_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {data.registrar_url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {data.registrar_url && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.registrar_url, "registrar_url")}
                      >
                        {copied === "registrar_url" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Creation Date</TableCell>
                  <TableCell>
                    {data.creation_date ? new Date(data.creation_date).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>
                    {data.creation_date && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.creation_date, "creation_date")}
                      >
                        {copied === "creation_date" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableCell className="font-medium">Expiration Date</TableCell>
                  <TableCell>
                    {data.expiration_date ? new Date(data.expiration_date).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>
                    {data.expiration_date && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.expiration_date, "expiration_date")}
                      >
                        {copied === "expiration_date" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Organization</TableCell>
                  <TableCell>{data.org || "N/A"}</TableCell>
                  <TableCell>
                    {data.org && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.org, "org")}
                      >
                        {copied === "org" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableCell className="font-medium">Country</TableCell>
                  <TableCell>{data.country || "N/A"}</TableCell>
                  <TableCell>
                    {data.country && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.country, "country")}
                      >
                        {copied === "country" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Name Servers</TableCell>
                  <TableCell>
                    {data.name_servers?.length ? (
                      <div className="space-y-1">
                        {data.name_servers.map((server: string, index: number) => (
                          <div key={index} className="font-mono text-sm">
                            {server}
                          </div>
                        ))}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {data.name_servers?.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.name_servers.join("\n"), "name_servers")}
                      >
                        {copied === "name_servers" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableCell className="font-medium">Emails</TableCell>
                  <TableCell>
                    {data.emails?.length ? (
                      <div className="space-y-1">
                        {data.emails.map((email: string, index: number) => (
                          <div key={index} className="font-mono text-sm text-blue-600">
                            {email}
                          </div>
                        ))}
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {data.emails?.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        onClick={() => copyToClipboard(data.emails.join("\n"), "emails")}
                      >
                        {copied === "emails" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


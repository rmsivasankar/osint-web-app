import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Database, Globe, Search, Server, ArrowRight, Shield } from "lucide-react"

const tools = [
  {
    name: "WHOIS Lookup",
    path: "/tools/whois",
    icon: <Database className="h-6 w-6 text-blue-600" />,
    description: "Retrieve registration information for any domain name.",
  },
  {
    name: "DNS Lookup",
    path: "/tools/dns",
    icon: <Server className="h-6 w-6 text-blue-600" />,
    description: "Analyze DNS records and configurations for any domain.",
  },
  {
    name: "Subdomain Finder",
    path: "/tools/subdomain",
    icon: <Globe className="h-6 w-6 text-blue-600" />,
    description: "Discover subdomains associated with a target domain.",
  },
  {
    name: "Reverse IP Lookup",
    path: "/tools/reverse-ip",
    icon: <Search className="h-6 w-6 text-blue-600" />,
    description: "Find domains hosted on a specific IP address.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-24 pb-16">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Professional <span className="tech-text">OSINT Tools</span> for Security Research
            </h1>
            <p className="text-lg text-gray-600">
              Gather and analyze publicly available intelligence with our comprehensive toolkit designed for security
              professionals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                View Documentation
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-soft border border-gray-100 animate-float">
              <Shield className="h-16 w-16 text-blue-600 mb-4" />
              <div className="w-64 h-4 bg-blue-100 rounded-full mb-3"></div>
              <div className="w-48 h-4 bg-gray-100 rounded-full mb-3"></div>
              <div className="w-56 h-4 bg-gray-100 rounded-full mb-6"></div>
              <div className="w-full h-8 bg-blue-500 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our OSINT Tools</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive suite of tools designed to help security professionals gather and analyze open-source
            intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Card key={tool.path} className="tool-card overflow-hidden">
              <CardHeader className="pb-2">
                <div className="mb-2">{tool.icon}</div>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Link href={tool.path} className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    Open Tool <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built with security professionals in mind, our tools provide accurate and reliable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">All searches are conducted securely with privacy in mind.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Data</h3>
              <p className="text-gray-600">Access accurate and up-to-date information from trusted sources.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-gray-600">Comprehensive data coverage across domains worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


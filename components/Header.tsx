"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, Search, Database, Globe, Server, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "WHOIS Lookup", path: "/tools/whois", icon: <Database className="w-4 h-4" /> },
  { name: "DNS Lookup", path: "/tools/dns", icon: <Server className="w-4 h-4" /> },
  { name: "Subdomain Finder", path: "/tools/subdomain", icon: <Globe className="w-4 h-4" /> },
  { name: "Reverse IP", path: "/tools/reverse-ip", icon: <Search className="w-4 h-4" /> },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold tracking-tight tech-text">Indominus Rex</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "nav-link flex items-center gap-1.5",
                pathname === item.path ? "nav-link-active" : "nav-link-inactive",
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} className="text-gray-800" /> : <Menu size={24} className="text-gray-800" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md absolute top-full left-0 w-full py-4 flex flex-col items-start space-y-1 px-6 border-b border-gray-100 shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "w-full py-2 px-3 rounded-lg flex items-center gap-2 transition-colors",
                pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <div className="pt-2 w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  )
}


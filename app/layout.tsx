import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/Theme-Provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "OSINT Toolkit",
  description: "Gather OSINT data using free APIs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange {...({} as any)}>
          <Header />
          <main className="min-h-screen container mx-auto p-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}


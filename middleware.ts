import { type NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.nextUrl.pathname}`)

  // Security headers
  const res = NextResponse.next()
  res.headers.set("X-Frame-Options", "DENY")
  res.headers.set("X-Content-Type-Options", "nosniff")
  res.headers.set("Referrer-Policy", "no-referrer")
  res.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

  return res
}

// Apply middleware only to API routes
export const config = {
  matcher: "/api/:path*",
}


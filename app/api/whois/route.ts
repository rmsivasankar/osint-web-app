import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const domain = searchParams.get("domain")

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/whois?domain=${domain}`, {
      headers: { "X-Api-Key": process.env.NINJA_API_KEY || "" },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch WHOIS data")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}


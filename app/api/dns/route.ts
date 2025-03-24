import { NextResponse } from 'next/server'

async function fetchDNS(domain: string) {
  try {
    const apiKey = process.env.NINJA_API_KEY
    if (!apiKey) throw new Error('API Key is missing')

    const response = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${domain}`, {
      method: 'GET',
      headers: { 'X-Api-Key': apiKey },
    })

    if (!response.ok) throw new Error(`DNS Lookup failed: ${response.statusText}`)

    return await response.json()
  } catch (error) {
    console.error('Error fetching DNS data:', error)
    return null
  }
}

// This is the handler for GET requests
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const domain = url.searchParams.get('domain')

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
    }

    const dnsData = await fetchDNS(domain)

    if (!dnsData) {
      return NextResponse.json({ error: 'Failed to fetch DNS data' }, { status: 500 })
    }

    return NextResponse.json(dnsData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

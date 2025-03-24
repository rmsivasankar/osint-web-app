import { NextResponse } from 'next/server'

async function fetchSubdomain(domain: string) {
  try {
    const apiKey = process.env.NINJA_API_KEY
    if (!apiKey) throw new Error('API Key is missing')

    const response = await fetch(`https://api.api-ninjas.com/v1/subdomainlookup?domain=${domain}`, {
      method: 'GET',
      headers: { 'X-Api-Key': apiKey },
    })

    if (!response.ok) throw new Error(`Subdomain Lookup failed: ${response.statusText}`)

    return await response.json()
  } catch (error) {
    console.error('Error fetching subdomains:', error)
    return null
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const domain = url.searchParams.get('domain')

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
    }

    const subdomainData = await fetchSubdomain(domain)

    if (!subdomainData) {
      return NextResponse.json({ error: 'Failed to fetch subdomain data' }, { status: 500 })
    }

    return NextResponse.json(subdomainData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

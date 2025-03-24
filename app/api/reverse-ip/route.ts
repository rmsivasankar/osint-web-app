import { NextResponse } from 'next/server'

async function fetchReverseIP(ip: string) {
  try {
    const apiKey = process.env.NINJA_API_KEY // Ensure this matches your .env key
    if (!apiKey) throw new Error('API Key is missing')

    const response = await fetch(`https://api.api-ninjas.com/v1/iplookup?address=${ip}`, {
      method: 'GET',
      headers: { 'X-Api-Key': apiKey },
    })

    if (!response.ok) throw new Error(`Reverse IP Lookup failed: ${response.statusText}`)

    return await response.json()
  } catch (error) {
    console.error('Error fetching Reverse IP data:', error)
    return null
  }
}

// This is the handler for GET requests
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const ip = url.searchParams.get('ip')

    if (!ip) {
      return NextResponse.json({ error: 'IP address is required' }, { status: 400 })
    }

    const reverseIpData = await fetchReverseIP(ip)

    if (!reverseIpData) {
      return NextResponse.json({ error: 'Failed to fetch Reverse IP data' }, { status: 500 })
    }

    return NextResponse.json(reverseIpData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function fetchDNS(domain: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${domain}`, {
      headers: { "X-Api-Key": process.env.NINJAS_API_KEY || "" },
    })

    if (!response.ok) {
      throw new Error(`DNS lookup failed for ${domain}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching DNS data:", error)
    return null
  }
}


export async function fetchWhois(domain: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/whois?domain=${domain}`, {
      headers: { "X-Api-Key": process.env.NINJAS_API_KEY || "" },
    })

    if (!response.ok) {
      throw new Error(`WHOIS lookup failed for ${domain}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching WHOIS data:", error)
    return null
  }
}


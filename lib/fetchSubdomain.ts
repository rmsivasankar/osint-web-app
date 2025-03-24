export async function fetchSubdomains(domain: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/subdomainlookup?domain=${domain}`, {
      headers: { "X-Api-Key": process.env.NINJAS_API_KEY || "" },
    })

    if (!response.ok) {
      throw new Error(`Subdomain lookup failed for ${domain}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching subdomain data:", error)
    return null
  }
}


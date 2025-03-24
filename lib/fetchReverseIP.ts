export async function fetchReverseIP(ip: string) {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/reverseiplookup?ip=${ip}`, {
      headers: { "X-Api-Key": process.env.NINJAS_API_KEY || "" },
    })

    if (!response.ok) {
      throw new Error(`Reverse IP lookup failed for ${ip}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching reverse IP data:", error)
    return null
  }
}


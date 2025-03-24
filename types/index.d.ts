export interface WhoisData {
  domain_name: string
  registrar: string
  creation_date: string
  expiration_date: string
  name_servers: string[]
  status: string
}

export interface DNSRecord {
  type: string
  value: string
}

export interface SubdomainData {
  subdomains: string[]
}

export interface ReverseIPData {
  ip: string
  domains: string[]
}


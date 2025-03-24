export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-8 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Indominus Rex - OSINT Toolkit</h3>
            <p className="text-sm text-gray-600">
              Professional tools for open-source intelligence gathering and analysis.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Tools</h4>
            <ul className="space-y-2">
              <li>
                <a href="/tools/whois" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  WHOIS Lookup
                </a>
              </li>
              <li>
                <a href="/tools/dns" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  DNS Lookup
                </a>
              </li>
              <li>
                <a href="/tools/subdomain" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Subdomain Finder
                </a>
              </li>
              <li>
                <a href="/tools/reverse-ip" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Reverse IP Lookup
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} R M Sivasankar. All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            Built with <span className="text-blue-600">Next.js, TailwindCSS & ShadCN UI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}


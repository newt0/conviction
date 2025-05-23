import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="py-12 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-[#007CFF]">ConvictionFi</h2>
            <p className="text-gray-600 mt-1">Mint your conviction. Automate your belief.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="space-y-2">
              <h3 className="font-medium mb-2">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="hover:text-[#007CFF]">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#007CFF]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#007CFF]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#007CFF]">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium mb-2">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link href="#" className="flex items-center gap-2 hover:text-[#007CFF]">
                    <Github size={16} />
                    <span>GitHub</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center gap-2 hover:text-[#007CFF]">
                    <Twitter size={16} />
                    <span>Twitter</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#007CFF]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ConvictionFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

import React from "react"
import Link from "next/link"
import { quickLinks } from "~/modules/common/data/footerData"

export function QuickLinks() {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-foreground">
        Quick Links
      </h4>
      <ul className="space-y-2 text-sm text-foreground font-medium">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

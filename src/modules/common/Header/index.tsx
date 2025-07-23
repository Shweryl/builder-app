"use client"

import React, { useState } from "react"
import Link from "next/link"
import { BrandLogo } from "./BrandLogo"
import { headerData } from "~/modules/common/data/headerData"
import { Button } from "~/components/ui/button"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-background text-foreground relative">
      <Link href="/" className="flex items-center gap-2">
        <BrandLogo className="h-6 w-auto" />
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-foreground text-2xl hover:text-primary transition-colors duration-200"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-6 bg-popover border border-border rounded-md shadow-md p-4 z-50 min-w-[200px]">
          <nav className="flex flex-col gap-2">
            {headerData.quickLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="hover:text-primary"
                onClick={() => setMenuOpen(false)} // optional: auto-close
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

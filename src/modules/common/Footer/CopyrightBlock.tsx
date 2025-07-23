import React from "react"
// src/modules/common/components/Footer/CopyrightBlock.tsx
import { siteData } from "~/modules/common/data/footerData"

export function CopyrightBlock() {
  return (
    <div className="text-center text-xs text-muted-foreground bg-background border-t border-border py-4">
      © {siteData.year} {siteData.org}
    </div>
  )
}

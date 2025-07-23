import React from "react"
import { brandInfo } from "~/modules/common/data/footerData"

export function BrandBlock() {
  return (
    <div className="space-y-5 flex flex-col items-start">
      <h4 className="text-lg font-semibold mb-3 text-foreground">
        {brandInfo.title}
      </h4>

      <p className="text-sm text-foreground font-medium max-w-xs leading-relaxed">
        {brandInfo.description}
      </p>

      <div className="flex items-center gap-4">
        {brandInfo.partners.map((partner) => (
          <img
            key={partner.alt}
            src={partner.src}
            alt={partner.alt}
            className="h-6 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  )
}

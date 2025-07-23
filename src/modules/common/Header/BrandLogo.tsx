import React from "react"
import { headerData } from "~/modules/common/data/headerData"

export function BrandLogo({ className }: { className?: string }) {
  const { src, alt, className: defaultClass, height } = headerData.logo

  return (
    <img
      src={src}
      alt={alt}
      height={height}
      className={`${defaultClass} ${className ?? ""}`}
    />
  )
}
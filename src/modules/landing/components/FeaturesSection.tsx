"use client"

import React from "react"
import { featuresSection } from "../data/features"
import { LightbulbIcon, ZapIcon, RocketIcon } from "lucide-react"


const iconMap = {
  LightbulbIcon,
  ZapIcon,
  RocketIcon,
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full bg-muted/50 py-20 border-t border-border scroll-mt-16"
    >
      <div className="container px-4 mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          {featuresSection.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresSection.items.map(({ title, description, icon }) => {
            const Icon = iconMap[icon as keyof typeof iconMap]
            return (
              <div
                key={title}
                className="bg-background rounded-2xl p-6 border border-border shadow-sm text-center"
              >
                <Icon className="mx-auto mb-4 h-8 w-8 text-accent" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import React from "react"
import { HeroSection } from "./components/HeroSection"
import { FeaturesSection } from "./components/FeaturesSection"
import { CTASection } from "./components/CTASection"
import { ContactSection } from "./components/ContactSection"


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <ContactSection />
    </div>
  )
}

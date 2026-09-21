import Link from 'next/link'
import { ArrowLeft, ArrowRight, Shield, Cpu, Zap, Server } from 'lucide-react'
import BottomNavbar from '@/components/navigation/BottomNavbar'
import SectionLabel from '@/components/ui/SectionLabel'
import TechCard from '@/components/ui/TechCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { sponsorsData } from '@/data/sponsors'

export default function SponsorsPage() {
  return (
    <div className="relative min-h-screen bg-[#020711] text-[#F2F6FF] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid-bg opacity-30" />
      <div className="scanline-overlay fixed inset-0 z-10" />

      <BottomNavbar />

      <main className="relative z-20 max-w-5xl mx-auto px-6 pt-36 pb-24 space-y-16">
        <div>
          <SectionLabel tag="PARTNERSHIP COHORT" coordinate="INFRASTRUCTURE">
            BACK THE NEXT
          </SectionLabel>

          <h1 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF] mt-4 tracking-tight">
            POWERING THE ARENA. <br />
            <span className="text-[#147DFF]">BACKING THE BUILDERS.</span>
          </h1>

          <p className="mt-6 text-lg text-[#8CA4C4] leading-relaxed max-w-2xl">
            {sponsorsData.subline}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorsData.sponsors.map((sponsor, index) => (
            <TechCard
              key={index}
              codeTag={sponsor.tier}
              status="VERIFIED PARTNER"
            >
              <div className="space-y-4 py-2">
                <div className="font-mono-tech text-xl font-bold text-[#2695FF]">
                  {sponsor.logoText}
                </div>
                <div>
                  <h3 className="hero-title text-xl text-[#F2F6FF]">{sponsor.name}</h3>
                  <p className="text-xs text-[#8CA4C4] mt-1 leading-relaxed">
                    {sponsor.description}
                  </p>
                </div>
              </div>
            </TechCard>
          ))}
        </div>

        <div className="glass-panel p-8 rounded border border-[#2695FF]/40 bg-[#061836]/70 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="hero-title text-2xl text-[#F2F6FF]">BECOME A SPONSOR</h3>
            <p className="text-xs sm:text-sm text-[#8CA4C4] mt-1 font-mono-tech">
              Gain direct access to 128 of the nation’s top student builders and post-hackathon incubation pipelines.
            </p>
          </div>
          <MagneticButton href="mailto:partners@hackfinix.example" icon={<ArrowRight size={15} />}>
            REQUEST DECK
          </MagneticButton>
        </div>

        <div className="flex items-center gap-4">
          <MagneticButton href="/" variant="secondary" icon={<ArrowLeft size={15} />}>
            RETURN TO ARENA
          </MagneticButton>
        </div>
      </main>
    </div>
  )
}

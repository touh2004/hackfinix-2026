import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Cpu } from 'lucide-react'
import BottomNavbar from '@/components/navigation/BottomNavbar'
import SectionLabel from '@/components/ui/SectionLabel'
import TechCard from '@/components/ui/TechCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { themesData } from '@/data/themes'

export default async function ThemeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const mission = themesData.find((t) => t.slug === slug) || themesData[0]

  return (
    <div className="relative min-h-screen bg-[#020711] text-[#F2F6FF] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid-bg opacity-30" />
      <div className="scanline-overlay fixed inset-0 z-10" />

      <BottomNavbar />

      <main className="relative z-20 max-w-4xl mx-auto px-6 pt-36 pb-24 space-y-12">
        <Link
          href="/themes"
          className="inline-flex items-center gap-2 font-mono-tech text-xs text-[#8CA4C4] hover:text-[#2695FF] transition-colors"
        >
          <ArrowLeft size={14} /> ALL MISSIONS
        </Link>

        <div>
          <SectionLabel tag={mission.code} coordinate="MISSION VECTOR">
            TRACK SPECIFICATION
          </SectionLabel>

          <h1 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF] mt-4 tracking-tight">
            {mission.title}
          </h1>

          <p className="mt-2 font-mono-tech text-sm sm:text-base text-[#2695FF]">
            {mission.subtitle}
          </p>

          <p className="mt-6 text-base sm:text-lg text-[#8CA4C4] leading-relaxed">
            {mission.description}
          </p>
        </div>

        {/* Dynamic Specifications Detail Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#147DFF]/25">
          <TechCard codeTag="SPEC // 01" status="INDUSTRY FOCUS">
            <h4 className="font-mono-tech text-xs font-bold text-[#567299] uppercase mb-1">TARGET SECTOR</h4>
            <p className="text-xs text-[#F2F6FF] leading-relaxed">{mission.industryFocus}</p>
          </TechCard>
          
          <TechCard codeTag="SPEC // 02" status="PROBLEM FOCUS">
            <h4 className="font-mono-tech text-xs font-bold text-[#567299] uppercase mb-1">PROBLEM TO SOLVE</h4>
            <p className="text-xs text-[#F2F6FF] leading-relaxed">{mission.problemFocus}</p>
          </TechCard>

          <TechCard codeTag="SPEC // 03" status="EXPECTED OUTPUT">
            <h4 className="font-mono-tech text-xs font-bold text-[#567299] uppercase mb-1">MVP DELIVERABLES</h4>
            <p className="text-xs text-[#F2F6FF] leading-relaxed">{mission.expectedOutput}</p>
          </TechCard>
        </div>

        {/* Deep Dive Focus Areas */}
        <div className="space-y-4">
          <h2 className="hero-title text-2xl text-[#F2F6FF]">CORE OBJECTIVES & PARADIGMS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mission.focusAreas.map((area, index) => (
              <TechCard key={index} codeTag={`FOCUS // 0${index + 1}`} status="CRITICAL">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#00B8D4] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-mono-tech text-sm font-bold text-[#F2F6FF]">{area}</h4>
                    <p className="text-xs text-[#8CA4C4] mt-1">
                      Engineer prototypes addressing scalability, latency, and real-world deployment challenges in this domain.
                    </p>
                  </div>
                </div>
              </TechCard>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-start pt-6">
          <MagneticButton href="/themes" variant="secondary" size="lg">
            BROWSE OTHER TRACKS
          </MagneticButton>
        </div>
      </main>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { ArrowRight, Brain, Globe, Compass, Cpu } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import TechCard from '../ui/TechCard'
import { themesData } from '@/data/themes'

const iconDict: Record<string, React.ReactNode> = {
  Brain: <Brain size={24} className="text-[#2695FF]" />,
  Globe: <Globe size={24} className="text-[#00B8D4]" />,
  Compass: <Compass size={24} className="text-[#147DFF]" />,
}

export default function Themes() {
  return (
    <section id="missions" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <SectionLabel tag="PROBLEM MATRIX" coordinate="ARENA TRACKS">
            THE 2026 MISSIONS
          </SectionLabel>
          <h2 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF] mt-3">
            PICK YOUR <span className="text-[#147DFF]">FRONTIER</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#8CA4C4] max-w-md">
          Three breakthrough problem vectors. No safe or trivial ideas. Build working prototypes that unlock real step-function breakthroughs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {themesData.map((mission) => (
          <TechCard
            key={mission.id}
            codeTag={mission.code}
            status="MISSION ACTIVE"
            className="group"
          >
            <div className="flex flex-col h-full justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded border border-[#147DFF]/30 bg-[#061225] transition-all group-hover:border-[#2695FF] group-hover:shadow-[0_0_15px_#2695FF]">
                    {iconDict[mission.icon] || <Cpu size={24} className="text-[#2695FF]" />}
                  </div>
                  <span className="font-mono-tech text-xs text-[#567299]">
                    TRACK 0{mission.id}
                  </span>
                </div>

                <div>
                  <h3 className="hero-title text-2xl text-[#F2F6FF] group-hover:text-[#2695FF] transition-colors">
                    {mission.title}
                  </h3>
                  <p className="font-mono-tech text-xs text-[#2695FF] mt-1">
                    {mission.subtitle}
                  </p>
                </div>

                <p className="text-xs text-[#8CA4C4] leading-relaxed">
                  {mission.description}
                </p>

                {/* Focus Areas Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {mission.focusAreas.map((tag, i) => (
                    <span
                      key={i}
                      className="border border-[#147DFF]/20 bg-[#030B18]/70 px-2 py-0.5 font-mono-tech text-[10px] text-[#8CA4C4]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action link to Theme page */}
              <div className="border-t border-[#147DFF]/20 pt-4">
                <Link
                  href={`/themes/${mission.slug}`}
                  className="group/link flex items-center justify-between font-mono-tech text-xs text-[#2695FF] hover:text-[#F2F6FF] transition-colors"
                >
                  <span>EXPLORE MISSION DEEP DIVE</span>
                  <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1.5" />
                </Link>
              </div>
            </div>
          </TechCard>
        ))}
      </div>
    </section>
  )
}

'use client'

import { ArrowRight, ArrowDown } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import MagneticButton from '../ui/MagneticButton'
import { eventData } from '@/data/event'

interface HeroProps {
  scrollProgress?: number // 0.0 to 1.0 (from intro scroll)
}

export default function Hero({ scrollProgress = 0 }: HeroProps) {
  // Hero text is 100% visible on load
  const labelOpacity = 1
  const line1Progress = 1
  const line2Progress = 1
  const detailsOpacity = 1

  const line1Y = 0
  const line2Y = 0
  const detailsY = 0

  return (
    <section className="relative w-full flex flex-col justify-center py-4 mt-16 lg:mt-24 z-10">
      <div className="w-full space-y-3">
        {/* Section Category Label */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateY(${(1 - labelOpacity) * 10}px)`,
          }}
        >
          <SectionLabel tag="ARENA READY" coordinate="LAT 13.08° N">
            COLLEGE HACKATHON · {eventData.dates}
          </SectionLabel>
        </div>

        {/* Heading: HACKFINIX */}
        <div className="w-full overflow-hidden">
          <h1
            className="hero-title text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3.1rem] tracking-tight glow-text-blue leading-tight max-w-full break-words bg-gradient-to-r from-white via-[#42B8FF] to-[#147DFF] bg-clip-text text-transparent inline-block"
            style={{
              opacity: line1Progress,
              transform: `translateY(${line1Y}px)`,
              clipPath: `polygon(0 0, 100% 0, 100% ${line1Progress * 100}%, 0 ${line1Progress * 100}%)`,
              background: 'linear-gradient(135deg, #FFFFFF 10%, #42B8FF 55%, #147DFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HACKFINIX
          </h1>
        </div>

        {/* Lede Description */}
        <p
          className="text-xs sm:text-sm lg:text-base text-[#8CA4C4] leading-relaxed max-w-lg break-words"
          style={{
            opacity: detailsOpacity,
            transform: `translateY(${detailsY}px)`,
          }}
        >
          {eventData.subTagline}
        </p>



        {/* Micro Telemetry Badges */}
        <div
          className="grid grid-cols-3 gap-2 pt-1 max-w-sm font-mono-tech text-[10px] text-[#8CA4C4]"
          style={{
            opacity: detailsOpacity,
            transform: `translateY(${detailsY}px)`,
          }}
        >
          <div className="border border-[#147DFF]/20 bg-[#061225]/70 p-2 rounded-sm">
            <span className="text-[#567299] block text-[8px]">DURATION</span>
            <strong className="text-[#F2F6FF] text-[11px]">24 HOURS</strong>
          </div>
          <div className="border border-[#147DFF]/20 bg-[#061225]/70 p-2 rounded-sm">
            <span className="text-[#567299] block text-[8px]">SELECTION</span>
            <strong className="text-[#2695FF] text-[11px]">32 TEAMS</strong>
          </div>
          <div className="border border-[#147DFF]/20 bg-[#061225]/70 p-2 rounded-sm">
            <span className="text-[#567299] block text-[8px]">BOUNTIES</span>
            <strong className="text-[#00B8D4] text-[11px]">₹12,90,000+</strong>
          </div>
        </div>

        {/* Status bar */}
        <div
          className="pt-2.5 border-t border-[#147DFF]/20 flex flex-wrap items-center justify-between gap-3 font-mono-tech text-[10px] text-[#8CA4C4]"
          style={{ opacity: detailsOpacity }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#147DFF] shadow-[0_0_8px_#2695FF] animate-pulse" />
            <span>SYS_STATUS: {eventData.status}</span>
          </div>
          <a href="#missions" className="flex items-center gap-1 text-[#8CA4C4] hover:text-[#2695FF] transition-colors">
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown size={11} className="text-[#147DFF] animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import { MapPin, Navigation, Wifi, ShieldCheck, Cpu, Zap, Bus } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import TechCard from '../ui/TechCard'
import { venueData } from '@/data/venue'

export default function Venue() {
  return (
    <section className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <SectionLabel tag="PHYSICAL VECTOR" coordinate="ARENA GRID">
            LOCATION & VENUE
          </SectionLabel>
          <h2 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF] mt-3">
            THE ARENA <span className="text-[#147DFF]">GROUNDS</span>
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#8CA4C4] max-w-md">
          {venueData.tag} — High-bandwidth compute lab, 24/7 dedicated maker facilities, and rest lounges designed for endurance builders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Venue Info & Facilities */}
        <div className="lg:col-span-7 space-y-6">
          <TechCard codeTag="FACILITY SPEC // 04" status="OPERATIONAL">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[#2695FF] font-mono-tech text-xs mb-1">
                  <MapPin size={14} /> ARENA COMMAND CENTER
                </div>
                <h3 className="hero-title text-3xl text-[#F2F6FF]">
                  {venueData.name}
                </h3>
                <p className="text-sm text-[#8CA4C4] mt-2 font-mono-tech">
                  {venueData.address}
                </p>
              </div>

              {/* Coordinates Badge */}
              <div className="flex flex-wrap gap-4 font-mono-tech text-xs border-y border-[#147DFF]/15 py-3 text-[#2695FF]">
                <span>LAT: {venueData.coordinates.lat}</span>
                <span className="text-[#567299]">//</span>
                <span>LONG: {venueData.coordinates.lng}</span>
                <span className="text-[#567299]">//</span>
                <span>SECTOR: 04</span>
              </div>

              {/* Facilities Checklist */}
              <div className="space-y-2.5 font-mono-tech text-xs text-[#8CA4C4]">
                <div className="text-[10px] text-[#567299] uppercase tracking-wider mb-2">
                  INFRASTRUCTURE & LOGISTICS:
                </div>
                {venueData.facilities.map((fac, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00B8D4]" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>

              {/* Transit Notice */}
              <div className="border border-[#147DFF]/20 bg-[#030B18]/80 p-3 rounded-sm flex items-center gap-3 font-mono-tech text-xs text-[#8CA4C4]">
                <Bus size={18} className="text-[#2695FF] shrink-0" />
                <span>{venueData.travelInfo}</span>
              </div>
            </div>
          </TechCard>
        </div>

        {/* Dark Cyber Map Visual */}
        <div className="lg:col-span-5 relative glass-panel rounded border border-[#147DFF]/25 bg-[#030B18]/90 p-6 flex flex-col justify-between overflow-hidden">
          <div className="scanline-overlay absolute inset-0 opacity-40" />
          
          {/* Simulated Dark Matrix Grid */}
          <div className="cyber-grid-bg absolute inset-0 opacity-30" />

          <div className="relative z-10 flex items-center justify-between font-mono-tech text-xs text-[#8CA4C4]">
            <span className="flex items-center gap-2">
              <Navigation size={14} className="text-[#2695FF]" />
              <span>RADAR SCAN</span>
            </span>
            <span className="text-[#00B8D4]">GPS LOCK: OK</span>
          </div>

          <div className="relative z-10 my-16 flex flex-col items-center justify-center text-center">
            {/* Center target circle */}
            <div className="relative flex h-32 w-32 items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#147DFF]/40 animate-ping opacity-25" />
              <div className="absolute inset-4 rounded-full border border-[#2695FF]/60" />
              <div className="absolute inset-8 rounded-full border border-dashed border-[#00B8D4]/60 animate-orbit-rotate" />
              <div className="h-4 w-4 rounded-full bg-[#2695FF] shadow-[0_0_15px_#2695FF]" />
            </div>
            <div className="mt-4 font-mono-tech text-xs font-bold text-[#F2F6FF]">
              {venueData.name}
            </div>
            <div className="font-mono-tech text-[10px] text-[#567299]">
              TARGET COORDINATE PINPOINT
            </div>
          </div>

          <div className="relative z-10 font-mono-tech text-[10px] text-[#567299] text-center border-t border-[#147DFF]/15 pt-3">
            SECTOR 04 // ENTRY VIA GATES B & C
          </div>
        </div>
      </div>
    </section>
  )
}

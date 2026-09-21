'use client'

import { Shield, Shirt, Zap, Server } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import TechCard from '../ui/TechCard'
import { prizePoolData } from '@/data/prizes'

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="text-[#2695FF]" size={24} />,
  Shirt: <Shirt className="text-[#2695FF]" size={24} />,
  Zap: <Zap className="text-[#00B8D4]" size={24} />,
  Server: <Server className="text-[#147DFF]" size={24} />,
}

export default function Goodies() {
  return (
    <section className="relative py-20 px-6 max-w-7xl mx-auto z-10">
      <div className="text-center flex flex-col items-center mb-16">
        <SectionLabel tag="PARTICIPANT ALLOCATIONS" coordinate="ARMORY">
          PERKS & PROVISIONS
        </SectionLabel>
        <h2 className="hero-title text-3xl sm:text-5xl text-[#F2F6FF] mt-3">
          HACKER <span className="text-[#147DFF]">PROVISIONS & GOODIES</span>
        </h2>
        <p className="text-sm sm:text-base text-[#8CA4C4] max-w-lg mt-3">
          Every verified attendee in the arena receives high-grade provisions, exclusive hardware badges, and developer infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {prizePoolData.goodies.map((item, index) => (
          <TechCard key={index} codeTag={`PROVISION // 0${index + 1}`}>
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded border border-[#147DFF]/30 bg-[#061225]">
                {iconMap[item.icon] || <Shield size={24} className="text-[#2695FF]" />}
              </div>
              <div>
                <h3 className="font-mono-tech text-base font-bold text-[#F2F6FF] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8CA4C4] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </TechCard>
        ))}
      </div>
    </section>
  )
}

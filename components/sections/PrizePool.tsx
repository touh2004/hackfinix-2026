'use client'

import { Trophy, Award, Gift, Sparkles, ArrowRight, Shield } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import TechCard from '../ui/TechCard'
import { prizePoolData } from '@/data/prizes'

export default function PrizePool() {
  return (
    <section id="prizes" className="relative py-20 px-6 max-w-7xl mx-auto z-10 w-full">
      <div className="flex flex-col mb-16 gap-4 max-w-xl">
        <div>
          <SectionLabel tag="BOUNTY PROTOCOL" coordinate="ARENA REWARDS">
            THE STAKES
          </SectionLabel>
          <h2 className="hero-title text-3xl sm:text-5xl lg:text-6xl text-[#F2F6FF] mt-3 leading-tight">
            {prizePoolData.totalPrizeValue} <span className="text-[#147DFF] glow-text-blue">PRIZE POOL</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm lg:text-base text-[#8CA4C4] leading-relaxed max-w-lg">
          Cash bounties, institutional seed grants, high-spec GPU cloud allocations, and titanium physical hardware awards for the top teams.
        </p>
      </div>

      {/* Main 3 Tier Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {prizePoolData.tiers.map((tier) => (
          <TechCard
            key={tier.rank}
            codeTag={`RANK // ${tier.rank}`}
            status={tier.badge}
            className={tier.featured ? 'border-[#2695FF] bg-[#061836]/90 shadow-[0_0_35px_rgba(20,125,255,0.25)]' : ''}
          >
            <div className="flex flex-col h-full justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-tech text-xs text-[#2695FF]">PODIUM 0{tier.rank}</span>
                  <Trophy size={18} className={tier.featured ? 'text-[#00B8D4]' : 'text-[#8CA4C4]'} />
                </div>
                <h3 className="hero-title text-2xl text-[#F2F6FF]">{tier.title}</h3>
                <div className="mt-4 font-mono-tech text-4xl sm:text-5xl font-bold text-[#2695FF] glow-text-blue">
                  {tier.amount}
                </div>
              </div>

              {/* Perks List */}
              <div className="border-t border-[#147DFF]/20 pt-4 space-y-2.5 font-mono-tech text-xs text-[#8CA4C4]">
                {tier.perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#147DFF] font-bold">›</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </TechCard>
        ))}
      </div>

      {/* Special Track Bounties */}
      <div className="mt-12 rounded border border-[#147DFF]/20 bg-[#030B18]/70 p-6 backdrop-blur-md">
        <div className="mb-4 flex items-center justify-between font-mono-tech text-xs text-[#8CA4C4] border-b border-[#147DFF]/15 pb-2">
          <span className="text-[#2695FF] font-bold">SPECIALIZED TRACK BOUNTIES</span>
          <span>ALLOCATION: 4 DOMAINS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prizePoolData.specialTracks.map((track, idx) => (
            <div
              key={idx}
              className="border border-[#147DFF]/15 bg-[#061225]/60 p-3.5 rounded-sm flex items-center justify-between font-mono-tech"
            >
              <span className="text-xs text-[#F2F6FF]">{track.name}</span>
              <strong className="text-sm text-[#00B8D4]">{track.amount}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

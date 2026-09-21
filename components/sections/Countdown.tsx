'use client'

import { useState, useEffect } from 'react'
import { Zap, Clock, ShieldCheck, Radio } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import TechCard from '../ui/TechCard'
import { eventData } from '@/data/event'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 68,
    hours: 14,
    minutes: 32,
    seconds: 45,
  })

  useEffect(() => {
    const target = new Date(eventData.isoDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const diff = Math.max(0, target - now)

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-12 w-full z-10">
      <div className="mb-6 flex flex-col items-start">
        <SectionLabel tag="TEMPORAL TELEMETRY" coordinate="START: SEPT 11, 2026">
          THE ARENA OPENS SEPTEMBER 11
        </SectionLabel>
        <h2 className="hero-title text-xl sm:text-2xl lg:text-[2.2rem] text-[#F2F6FF] mt-2 leading-tight">
          COUNTDOWN TO <span className="text-[#147DFF]">SEPTEMBER 11</span>
        </h2>
      </div>

      {/* Futuristic Control Panel Grid */}
      <div className="grid grid-cols-4 gap-2.5 w-full">
        {/* Days */}
        <TechCard codeTag="TIME_UNIT // 01" status="SYNCED">
          <div className="text-center py-2">
            <div className="hero-title text-2xl sm:text-3xl lg:text-4xl text-[#F2F6FF] font-mono-tech tracking-tighter">
              {String(timeLeft.days).padStart(2, '0')}
            </div>
            <div className="mt-1 font-mono-tech text-[9px] tracking-widest text-[#8CA4C4]">
              DAYS
            </div>
          </div>
        </TechCard>

        {/* Hours */}
        <TechCard codeTag="TIME_UNIT // 02" status="SYNCED">
          <div className="text-center py-2">
            <div className="hero-title text-2xl sm:text-3xl lg:text-4xl text-[#2695FF] font-mono-tech tracking-tighter">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <div className="mt-1 font-mono-tech text-[9px] tracking-widest text-[#8CA4C4]">
              HOURS
            </div>
          </div>
        </TechCard>

        {/* Minutes */}
        <TechCard codeTag="TIME_UNIT // 03" status="SYNCED">
          <div className="text-center py-2">
            <div className="hero-title text-2xl sm:text-3xl lg:text-4xl text-[#F2F6FF] font-mono-tech tracking-tighter">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <div className="mt-1 font-mono-tech text-[9px] tracking-widest text-[#8CA4C4]">
              MINUTES
            </div>
          </div>
        </TechCard>

        {/* Seconds */}
        <TechCard codeTag="TIME_UNIT // 04" status="LIVE">
          <div className="text-center py-2">
            <div className="hero-title text-2xl sm:text-3xl lg:text-4xl text-[#00B8D4] font-mono-tech tracking-tighter">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <div className="mt-1 font-mono-tech text-[9px] tracking-widest text-[#8CA4C4]">
              SECONDS
            </div>
          </div>
        </TechCard>
      </div>

      {/* Sub-panel metadata */}
      <div className="mt-5 w-full font-mono-tech text-[10px] text-[#8CA4C4] border border-[#147DFF]/20 bg-[#061225]/40 py-2 px-3 rounded-sm flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <Radio size={12} className="text-[#2695FF] animate-pulse" />
          <span>PHASE: APPLICATION_WINDOW_ACTIVE</span>
        </span>
        <span className="text-[#567299]">//</span>
        <span>VENUE: {eventData.venue}</span>
      </div>
    </section>
  )
}

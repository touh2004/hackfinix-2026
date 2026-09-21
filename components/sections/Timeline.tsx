'use client'

import { useState, useEffect, useRef } from 'react'
import { Clock, Calendar } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { timelineData } from '@/data/timeline'

export default function Timeline() {
  const [activeItem, setActiveItem] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineTrackRef = useRef<HTMLDivElement>(null)

  // Scroll Progress calculation to dynamically grow the central straight line down
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineTrackRef.current) return
      const rect = timelineTrackRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = rect.height

      // Start growing when the container top enters 65% of viewport height
      const startPoint = windowHeight * 0.65
      const scrollDist = startPoint - rect.top

      let progressPct = (scrollDist / containerHeight) * 100
      progressPct = Math.min(100, Math.max(0, progressPct))
      setScrollProgress(progressPct)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [timelineData.length])

  return (
    <section id="timeline" className="relative pt-10 pb-16 px-4 sm:px-6 max-w-6xl mx-auto z-10 font-mono-tech">
      {/* Header Block */}
      <div className="mb-8 border-b border-[#147DFF]/20 pb-4">
        <SectionLabel tag="24-HOUR HACKATHON RUNWAY" coordinate="CHRONO VECTOR">
          THE TIMELINE
        </SectionLabel>
        <h2 className="hero-title text-2xl sm:text-3xl md:text-4xl text-[#F2F6FF] mt-1.5 font-bold">
          FROM FIRST SPARK <span className="text-[#147DFF]">TO FINAL DEMO</span>
        </h2>
      </div>

      {/* Main Alternating Straight Timeline Container */}
      <div ref={timelineTrackRef} className="relative pt-4 pb-8">
        
        {/* Desktop Central Base Straight Line (Dim) */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#147DFF]/20 pointer-events-none z-0" />
        
        {/* Desktop Central Growing Active Straight Line (Scroll-Driven) */}
        <div
          className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-[#00D9FF] via-[#147DFF] to-[#9333EA] shadow-[0_0_15px_#00D9FF] pointer-events-none z-0 transition-all duration-75 ease-out rounded-full"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Mobile Left Base Straight Line */}
        <div className="block md:hidden absolute top-0 bottom-0 left-4 w-[2px] bg-[#147DFF]/20 pointer-events-none z-0" />
        
        {/* Mobile Left Growing Active Straight Line */}
        <div
          className="block md:hidden absolute top-0 left-4 w-[2.5px] bg-gradient-to-b from-[#00D9FF] via-[#147DFF] to-[#9333EA] shadow-[0_0_15px_#00D9FF] pointer-events-none z-0 transition-all duration-75 ease-out rounded-full"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Timeline Items List */}
        <div className="space-y-6 md:space-y-10">
          {timelineData.map((item, index) => {
            const isLeft = index % 2 === 0
            const isDay2Start = index > 0 && item.date !== timelineData[index - 1].date
            
            // Calculate if the scroll-driven line has reached this node
            const nodePct = (index / Math.max(1, timelineData.length - 1)) * 100
            const isReached = scrollProgress >= nodePct || index === activeItem

            return (
              <div key={item.code} className="relative">
                {/* Day Divider */}
                {isDay2Start && (
                  <div className="relative flex items-center justify-center gap-3 my-10 z-20">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent flex-1" />
                    <span className="border border-[#00D9FF]/50 bg-[#03091b] px-3.5 py-1 rounded-xs text-[10px] font-bold text-[#00D9FF] shadow-[0_0_15px_rgba(0,217,255,0.25)] tracking-widest uppercase">
                      DAY 2 // 12TH SEPTEMBER 2026
                    </span>
                    <div className="h-px bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent flex-1" />
                  </div>
                )}

                <div className="relative flex flex-col md:flex-row items-center">
                  
                  {/* Glowing Node on the Central Straight Line */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-4 z-20 flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-500 ${
                      isReached
                        ? 'border-[#00D9FF] bg-[#F2F6FF] shadow-[0_0_20px_#00D9FF,0_0_10px_#147DFF] scale-110'
                        : 'border-[#147DFF]/50 bg-[#020711]'
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isReached ? 'bg-[#020711]' : 'bg-[#147DFF]/40'
                      }`}
                    />
                  </div>

                  {/* Alternating Card Wrapper */}
                  <div
                    onClick={() => setActiveItem(index)}
                    className={`w-full md:w-[46%] pl-11 md:pl-0 transition-all duration-300 cursor-pointer ${
                      isLeft ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                  >
                    <div
                      className={`relative rounded-xs border p-4 sm:p-5 transition-all duration-300 ${
                        isReached
                          ? 'border-[#00D9FF]/80 bg-[#040e24]/90 shadow-[0_0_30px_rgba(0,217,255,0.18),0_0_15px_rgba(147,51,234,0.12)]'
                          : 'border-[#147DFF]/25 bg-[#03091b]/70 hover:border-[#147DFF]/60 hover:bg-[#040e24]/60'
                      }`}
                    >
                      {/* HUD Corner Accents */}
                      <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-[#00D9FF]/40 pointer-events-none" />
                      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-[#00D9FF]/40 pointer-events-none" />

                      {/* Header Badge Strip */}
                      <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] text-[#8CA4C4] mb-2 border-b border-[#147DFF]/15 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#00D9FF] text-xs">{item.code}</span>
                          <span className="border border-[#147DFF]/20 bg-[#020711] px-1.5 py-0.5 text-[9px] text-[#F2F6FF] tracking-wider uppercase">
                            {item.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px]">
                          <span className="flex items-center gap-1 text-[#2695FF]">
                            <Calendar size={11} /> {item.date}
                          </span>
                          <span className="flex items-center gap-1 text-[#00B8D4]">
                            <Clock size={11} /> {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Smaller Font Title */}
                      <h3 className="hero-title text-sm sm:text-base md:text-lg text-[#F2F6FF] mb-1 tracking-wide font-bold">
                        {item.title}
                      </h3>

                      {/* Smaller Font Description */}
                      <p className="text-[11px] sm:text-xs text-[#8CA4C4] leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Award, Users, Calendar, Layers, ExternalLink } from 'lucide-react'
import gsap from 'gsap'
import BottomNavbar from '@/components/navigation/BottomNavbar'
import SectionLabel from '@/components/ui/SectionLabel'
import TechCard from '@/components/ui/TechCard'
import MagneticButton from '@/components/ui/MagneticButton'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statsGridRef = useRef<HTMLDivElement>(null)
  const buttonGroupRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial opacity resets to avoid flash
    gsap.set([headerRef.current, textRef.current, buttonGroupRef.current], { opacity: 0, y: 30 })
    gsap.set('.stat-card-anim', { opacity: 0, scale: 0.9, y: 20 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Initial atmospheric laser scanner sweep
    tl.fromTo(
      scanlineRef.current,
      { top: '0%', opacity: 1 },
      { top: '100%', opacity: 0, duration: 1.2, ease: 'power2.inOut' }
    )

    // 2. Fade/slide up the header and manifesto text
    tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    tl.to(textRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')

    // 3. Staggered reveal of the specs/stats cards
    tl.to(
      '.stat-card-anim',
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.1)',
      },
      '-=0.4'
    )

    // 4. Staggered count-up animation for numbers
    const counters = document.querySelectorAll('.counter-val')
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || '0', 10)
      const countObj = { val: 0 }
      
      tl.to(
        countObj,
        {
          val: target,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (target === 1290000) {
              counter.textContent = `₹${Math.floor(countObj.val).toLocaleString('en-IN')}`
            } else {
              counter.textContent = String(Math.floor(countObj.val))
            }
          },
        },
        '-=0.8'
      )
    })

    // 5. Fade/slide up action buttons
    tl.to(buttonGroupRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6')
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#020711] text-[#F2F6FF] overflow-x-hidden font-mono-tech"
    >
      {/* Deep Cyber Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid-bg opacity-25" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(20,125,255,0.08)_0%,rgba(2,7,17,1)_80%)]" />
      <div className="scanline-overlay fixed inset-0 z-10 opacity-30 pointer-events-none" />

      {/* Laser Scanning Beam (Entrance Animation) */}
      <div
        ref={scanlineRef}
        className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent shadow-[0_0_15px_#00D9FF] z-30 pointer-events-none"
      />

      {/* Corner Brackets */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[#00D9FF]/30 pointer-events-none z-20" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[#00D9FF]/30 pointer-events-none z-20" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[#00D9FF]/30 pointer-events-none z-20" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[#00D9FF]/30 pointer-events-none z-20" />

      <BottomNavbar />

      <main className="relative z-20 max-w-6xl mx-auto px-6 pt-24 pb-28 space-y-12">
        
        {/* Header Block */}
        <div ref={headerRef} className="space-y-4">
          <SectionLabel tag="SYSTEM BRIEFING" coordinate="HF26 // ORIGIN">
            EVENT SPECIFICATIONS
          </SectionLabel>

          <h1 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF] mt-2 tracking-tight leading-none">
            HACKFINIX <span className="text-[#147DFF]">2026</span>
          </h1>
        </div>

        {/* About manifesto block */}
        <div ref={textRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h3 className="hero-title text-lg sm:text-2xl text-[#00D9FF] tracking-wider uppercase font-bold">
              // ABOUT HACKFINIX
            </h3>
            <p className="text-sm sm:text-base text-[#8CA4C4] leading-relaxed border-l-2 border-[#147DFF]/40 pl-4">
              HackfiniX 2026 is a 24-hour national-level hackathon that brings together students, developers, designers, and innovators from across the country. Participants collaborate, build solutions, and push the boundaries of creativity and technology.
            </p>
            <p className="text-sm sm:text-base text-[#8CA4C4] leading-relaxed border-l-2 border-[#00D9FF]/40 pl-4">
              Hosted by Techfinity Club at Cambridge Institute of Technology North Campus, this event fosters innovation, teamwork, and real-world problem solving.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#030d24]/60 border border-[#147DFF]/25 p-6 rounded-xs shadow-[0_0_20px_rgba(20,125,255,0.1)] space-y-4 self-stretch flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] text-[#567299] tracking-widest uppercase block">ORGANIZING BODY</span>
              <h4 className="text-sm font-bold text-[#F2F6FF] tracking-wider">TECHFINITY CLUB</h4>
              <p className="text-[11px] text-[#8CA4C4] leading-relaxed">
                The technical community driving next-gen software paradigms, hardware innovation, and collaborative compute labs at CITNC.
              </p>
            </div>
            
            {/* CITNC Navigation Button */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Cambridge+Institute+of+Technology+North+Campus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full border border-[#00D9FF]/50 bg-[#00D9FF]/10 hover:bg-[#00D9FF]/20 text-[#F2F6FF] px-4 py-2.5 rounded-xs text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,217,255,0.15)] group"
            >
              <span className="font-bold">CITNC CAMPUS MAP</span>
              <ExternalLink size={14} className="text-[#00D9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Specifications highlights metrics grid */}
        <div 
          ref={statsGridRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {/* Metric 1: 32 Teams */}
          <div className="stat-card-anim">
            <TechCard codeTag="METRIC // 01" status="SHORLIST">
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-[#2695FF]">
                  <Users size={16} />
                  <span className="text-[9px] tracking-widest uppercase">FINALS</span>
                </div>
                <div className="hero-title text-3xl font-black text-[#F2F6FF] tracking-tighter">
                  <span className="counter-val" data-target="32">0</span>
                </div>
                <p className="text-[10px] text-[#8CA4C4] leading-tight font-bold">
                  32 Selected Teams
                </p>
              </div>
            </TechCard>
          </div>

          {/* Metric 2: Dates */}
          <div className="stat-card-anim">
            <TechCard codeTag="METRIC // 02" status="RUNWAY">
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-[#00D9FF]">
                  <Calendar size={16} />
                  <span className="text-[9px] tracking-widest uppercase">SCHEDULE</span>
                </div>
                <div className="hero-title text-lg font-black text-[#F2F6FF] tracking-tight leading-none pt-2 mb-1.5">
                  24-25 SEP
                </div>
                <p className="text-[10px] text-[#8CA4C4] leading-tight font-bold">
                  September 2026
                </p>
              </div>
            </TechCard>
          </div>

          {/* Metric 3: Prizes */}
          <div className="stat-card-anim">
            <TechCard codeTag="METRIC // 03" status="BOUNTY">
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-[#00B8D4]">
                  <Award size={16} />
                  <span className="text-[9px] tracking-widest uppercase">REWARD POOL</span>
                </div>
                <div className="hero-title text-xl sm:text-2xl font-black text-[#00D9FF] glow-text-cyan tracking-tight pt-1">
                  <span className="counter-val" data-target="1290000">₹0</span>
                </div>
                <p className="text-[10px] text-[#8CA4C4] leading-tight font-bold">
                  Total Prize Value
                </p>
              </div>
            </TechCard>
          </div>

          {/* Metric 4: Themes */}
          <div className="stat-card-anim">
            <TechCard codeTag="METRIC // 04" status="DOMAINS">
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-[#2695FF]">
                  <Layers size={16} />
                  <span className="text-[9px] tracking-widest uppercase">TRACKS</span>
                </div>
                <div className="hero-title text-3xl font-black text-[#F2F6FF] tracking-tighter">
                  <span className="counter-val" data-target="4">0</span>
                </div>
                <p className="text-[10px] text-[#8CA4C4] leading-tight font-bold">
                  Active Theme Tracks
                </p>
              </div>
            </TechCard>
          </div>

          {/* Metric 5: Venue */}
          <div className="stat-card-anim">
            <TechCard codeTag="METRIC // 05" status="ARENA">
              <div className="space-y-2 py-1">
                <div className="flex items-center gap-2 text-[#00D9FF]">
                  <MapPin size={16} />
                  <span className="text-[9px] tracking-widest uppercase">LOCATION</span>
                </div>
                <div className="hero-title text-2xl font-black text-[#F2F6FF] tracking-tight pt-1">
                  CITNC
                </div>
                <p className="text-[10px] text-[#8CA4C4] leading-tight font-bold">
                  North Campus Arena
                </p>
              </div>
            </TechCard>
          </div>
        </div>

        {/* Back navigation buttons */}
        <div ref={buttonGroupRef} className="pt-6">
          <MagneticButton href="/" variant="secondary" icon={<ArrowLeft size={15} />}>
            RETURN TO ARENA
          </MagneticButton>
        </div>

      </main>
    </div>
  )
}

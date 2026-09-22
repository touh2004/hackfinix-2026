'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { coreTeamMembers, CoreTeamMember } from '@/data/coreTeam'
import { ArrowUpRight, Shield, User, Terminal, Cpu, Radio, Network } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface CoreTeamSectionProps {
  membersList?: CoreTeamMember[]
}

const normalizeDisplayIds = (members: CoreTeamMember[]) =>
  members
    .filter((member) => member.name && member.name.trim().length > 0)
    .map((member, index) => ({
      ...member,
      id: String(index + 1).padStart(2, '0'),
    }))

// Keep the home-page scroll section aligned with the full core team roster
// so the page can reveal the complete team after the intro operators instead of stopping at only four members.
const mainPageCoreTeamMembers = normalizeDisplayIds(coreTeamMembers)

// Remaining members for /team page, reordered from 01 upward without empty records
export const restTeamMembers = normalizeDisplayIds(
  coreTeamMembers.filter((member) => {
    const upper = member.name.toUpperCase()
    return (
      !upper.includes('SUGUMAR') &&
      !upper.includes('ANKITA') &&
      !upper.includes('SHREYA') &&
      !upper.includes('POOJA')
    )
  })
)

export default function CoreTeamSection({ membersList }: CoreTeamSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinStageRef = useRef<HTMLDivElement>(null)

  const activeCoreTeamMembers = (membersList || mainPageCoreTeamMembers).map((member, index) => ({
    ...member,
    id: String(index + 1).padStart(2, '0'),
  }))

  // Stage Refs
  const transitionLayerRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const titleLayerRef = useRef<HTMLDivElement>(null)
  const commandInterfaceRef = useRef<HTMLDivElement>(null)
  const connectedNetworkLayerRef = useRef<HTMLDivElement>(null)
  const finalStatementRef = useRef<HTMLDivElement>(null)

  // Dynamic Member Card Refs
  const memberCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scanBeamRefs = useRef<(HTMLDivElement | null)[]>([])
  const dossierRefs = useRef<(HTMLDivElement | null)[]>([])
  const navListRef = useRef<HTMLDivElement>(null)

  // State for active member tracking and hover states
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredLinkedIn, setHoveredLinkedIn] = useState(false)
  const [loadingText, setLoadingText] = useState('ACCESSING CORE OPERATORS.')

  // Total dynamic member count formatted
  const totalMembers = activeCoreTeamMembers.length
  const formattedTotal = totalMembers < 10 ? `0${totalMembers}` : `${totalMembers}`

  // Animated loading dots effect for Phase 1
  useEffect(() => {
    let count = 1
    const interval = setInterval(() => {
      count = (count % 3) + 1
      setLoadingText(`ACCESSING CORE OPERATORS${'.'.repeat(count)}`)
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // Keep side nav scroll position aligned with active index
  useEffect(() => {
    if (navListRef.current) {
      const activeItem = navListRef.current.children[activeIndex] as HTMLElement
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }
  }, [activeIndex])

  // Handle manual selection from side navigation by scrolling smoothly to member timeline position
  const handleSelectMember = (idx: number) => {
    setActiveIndex(idx)
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight
      const targetProgress = (idx + 0.5) * (0.80 / totalMembers)
      window.scrollTo({
        top: sectionTop + targetProgress * sectionHeight,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (!sectionRef.current || !pinStageRef.current) return

    // Set initial states — Command Interface is visible immediately
    gsap.set(commandInterfaceRef.current, { opacity: 1, autoAlpha: 1 })
    gsap.set(connectedNetworkLayerRef.current, { opacity: 0, autoAlpha: 0, scale: 0.95 })
    gsap.set(finalStatementRef.current, { opacity: 0, autoAlpha: 0, y: 30 })

    memberCardRefs.current.forEach((card, idx) => {
      if (!card) return
      gsap.set(card, {
        opacity: idx === 0 ? 1 : 0,
        autoAlpha: idx === 0 ? 1 : 0,
        scale: idx === 0 ? 1 : 0.94,
        y: idx === 0 ? 0 : 30,
      })
    })

    // Create master GSAP ScrollTrigger timeline pinned strictly to section height
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinStageRef.current,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Track active member index based on timeline progress (between 0.00 and 0.80)
          const prog = self.progress
          if (prog <= 0.80) {
            const memberProgress = prog / 0.80
            const idx = Math.min(totalMembers - 1, Math.max(0, Math.floor(memberProgress * totalMembers)))
            setActiveIndex(idx)
          }
        },
      },
    })

    // =========================================================================
    // MEMBER CARDS REVEAL (0.00 - 0.80)
    // =========================================================================
    const stepDuration = 0.80 / totalMembers

    activeCoreTeamMembers.forEach((member, idx) => {
      const cardEl = memberCardRefs.current[idx]
      const scanBeam = scanBeamRefs.current[idx]
      if (!cardEl) return

      // Reveal photo frame & scanning beam
      if (scanBeam) {
        masterTl.fromTo(
          scanBeam,
          { top: '0%', opacity: 0 },
          { top: '100%', opacity: 1, duration: stepDuration * 0.4, ease: 'power1.inOut' }
        )
      }

      // Hold current member card
      masterTl.to({}, { duration: stepDuration * 0.4 })

      // Transition out if not the last member
      if (idx < totalMembers - 1) {
        const nextCard = memberCardRefs.current[idx + 1]
        masterTl.to(cardEl, { opacity: 0, autoAlpha: 0, scale: 0.94, y: -20, duration: stepDuration * 0.2 })
        if (nextCard) {
          masterTl.to(nextCard, { opacity: 1, autoAlpha: 1, scale: 1, y: 0, duration: stepDuration * 0.2 }, '<')
        }
      }
    })

    // Fade out command interface for stage 4
    masterTl.to(commandInterfaceRef.current, { opacity: 0, autoAlpha: 0, duration: 0.03 })

    // =========================================================================
    // STAGE 4: CONNECTED NETWORK & FINAL STATEMENT (0.85 - 1.00)
    // =========================================================================
    masterTl.to(connectedNetworkLayerRef.current, { opacity: 1, autoAlpha: 1, scale: 1, duration: 0.04 })
    masterTl.to({}, { duration: 0.04 }) // Hold Network line
    masterTl.to(connectedNetworkLayerRef.current, { opacity: 0, autoAlpha: 0, duration: 0.03 })

    masterTl.to(finalStatementRef.current, { opacity: 1, autoAlpha: 1, y: 0, duration: 0.04 })

    return () => {
      masterTl.kill()
    }
  }, [totalMembers])

  return (
    <div
      ref={sectionRef}
      id="core-team"
      className="relative w-full h-[1400vh] bg-[#01050F] text-[#F2F6FF] font-mono-tech select-none overflow-x-hidden"
    >
      {/* 100vh Sticky Viewport Stage (PINNED BY GSAP SCROLLTRIGGER) */}
      <div
        ref={pinStageRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center px-2 sm:px-4"
      >
        {/* Deep Cyber Environment Background */}
        <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none z-0" />
        <div className="absolute inset-0 vignette-radial pointer-events-none z-0" />
        <div className="scanline-overlay fixed inset-0 z-10 opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(20,125,255,0.12)_0%,rgba(1,5,15,0.95)_75%)]" />

        {/* HUD Corner Brackets */}
        <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-[#00D9FF]/40 pointer-events-none z-20" />
        <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-[#00D9FF]/40 pointer-events-none z-20" />
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-[#00D9FF]/40 pointer-events-none z-20" />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-[#00D9FF]/40 pointer-events-none z-20" />

        {/* HUD Telemetry Labels */}
        <div className="hidden lg:flex absolute top-6 left-16 z-20 items-center gap-3 text-[10px] text-[#567299] tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          <span>HACKFINIX_2026 // CORE_PERSONNEL_DATABASE</span>
          <span>·</span>
          <span>OPERATORS: {formattedTotal} ACTIVE</span>
        </div>

        <div className="hidden lg:flex absolute top-6 right-16 z-20 items-center gap-4 text-[10px] text-[#567299] tracking-widest">
          <span>LATENCY: 12ms</span>
          <span>STATUS: VERIFIED</span>
          <span className="text-[#00D9FF]">SYSTEM: ONLINE</span>
        </div>

        {/* =========================================================================
            COMMAND INTERFACE — DIRECT MEMBER CARDS DISPLAY
            ========================================================================= */}

        {/* =========================================================================
            STAGE 3: CORE OPERATORS COMMAND INTERFACE
            ========================================================================= */}
        <div
          ref={commandInterfaceRef}
          className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-10 z-30 max-w-7xl mx-auto w-full"
        >
          {/* Interface Header */}
          <div className="flex items-center justify-between border-b border-[#147DFF]/30 pb-3 text-xs text-[#8CA4C4]">
            <div className="flex items-center gap-3">
              <span className="hero-title text-sm sm:text-base font-extrabold text-[#F2F6FF] tracking-wider">
                CORE OPERATORS
              </span>
              <span className="text-[#567299]">//</span>
              <span className="text-[#00D9FF] font-bold tracking-widest">
                PERSONNEL {activeCoreTeamMembers[activeIndex]?.id} / {formattedTotal}
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 border border-[#00D9FF]/30 bg-[#041228] px-3 py-1 rounded-xs text-[10px] text-[#00D9FF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              <span>DOSSIER STREAM ACTIVE</span>
            </div>
          </div>

          {/* Main Stage: Scrollable Side Nav + Personnel Card & Dossier */}
          <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 py-3 sm:py-4 my-auto w-full">
            {/* Side Navigation Indicator (Desktop: Vertical Left Scrollable, Mobile: Horizontal Bar) */}
            <div className="lg:absolute left-0 top-1/2 lg:-translate-y-1/2 flex lg:flex-col flex-row gap-1 z-40 bg-[#020A1A]/90 backdrop-blur-md border border-[#147DFF]/30 p-2 rounded-xs max-h-[55vh] overflow-y-auto custom-scrollbar w-full lg:w-auto max-w-full">
              <div className="hidden lg:block text-[9px] text-[#567299] tracking-widest uppercase mb-1 border-b border-[#147DFF]/20 pb-1 text-center">
                INDEX ({formattedTotal})
              </div>
              <div ref={navListRef} className="flex lg:flex-col flex-row gap-1">
                {activeCoreTeamMembers.map((m, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelectMember(idx)}
                      className={`flex items-center justify-between gap-2 px-2 py-1 text-[11px] font-mono-tech transition-all rounded-xs whitespace-nowrap ${
                        isActive
                          ? 'border border-[#00D9FF]/60 bg-[#00D9FF]/20 text-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.4)] font-bold scale-105'
                          : 'text-[#567299] hover:text-[#8CA4C4]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#00D9FF]' : 'bg-[#567299]/40'}`} />
                        <span>{m.id}</span>
                      </div>
                      <span className="hidden lg:inline text-[9px] truncate max-w-[90px] opacity-75">{m.name.split(' ')[0]}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Personnel Cards Stack */}
            <div className="relative w-full max-w-4xl h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center lg:ml-20">
              {activeCoreTeamMembers.map((member, idx) => {
                return (
                  <div
                    key={member.id}
                    ref={(el) => { memberCardRefs.current[idx] = el }}
                    className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 border border-[#147DFF]/50 bg-[#020A1A]/95 backdrop-blur-2xl p-4 sm:p-5 md:p-8 rounded-xs shadow-[0_0_40px_rgba(20,125,255,0.25)]"
                  >
                    {/* LEFT COLUMN: PHOTOGRAPH FRAME WITH SCANNING EFFECT */}
                    <div className="relative w-full max-w-[220px] h-[220px] sm:w-56 sm:h-64 md:w-60 md:h-72 shrink-0 border border-[#00D9FF]/50 bg-[#030E24] rounded-xs overflow-hidden group shadow-[0_0_25px_rgba(0,217,255,0.2)]">
                      {/* Frame Corner Accents */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00D9FF] z-20" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00D9FF] z-20" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00D9FF] z-20" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00D9FF] z-20" />

                      {/* Scanning Beam */}
                      <div
                        ref={(el) => { scanBeamRefs.current[idx] = el }}
                        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent shadow-[0_0_15px_#00D9FF] z-30 opacity-80 pointer-events-none"
                      />

                      {/* Photo Image or Cyber Avatar Fallback */}
                      <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-[#03122E] to-[#010816]">
                        {member.image && member.image !== '/placeholder-user.jpg' ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transition-all duration-500"
                            style={{ objectPosition: member.objectPosition || 'center' }}
                          />
                        ) : (
                          /* High-Tech Cyber Operator Avatar Silhouette Fallback */
                          <div className="flex flex-col items-center justify-center text-center p-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#00D9FF]/40 bg-[#041635] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,217,255,0.2)]">
                              <User size={32} className="text-[#00D9FF]" />
                            </div>
                            <div className="text-[10px] text-[#00D9FF] tracking-widest font-bold">
                              {member.personnelId}
                            </div>
                            <div className="text-[9px] text-[#567299] tracking-wider uppercase mt-1">
                              BIOMETRIC RECORD // SECURE
                            </div>
                          </div>
                        )}

                        {/* Subtle Scanlines overlay on photo */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10 opacity-70" />
                        <div className="absolute top-2 left-2 z-20 text-[9px] text-[#00D9FF] bg-[#020B1C]/80 px-2 py-0.5 border border-[#00D9FF]/30 rounded-xs">
                          {member.personnelId}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN: PERSONNEL DOSSIER PANEL */}
                    <div
                      ref={(el) => { dossierRefs.current[idx] = el }}
                      className="flex-1 w-full flex flex-col justify-between space-y-3 text-left border-l-0 md:border-l border-[#147DFF]/30 md:pl-8"
                    >
                      {/* Top Metadata */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-[#8CA4C4] border-b border-[#147DFF]/20 pb-2">
                          <div>
                            <span className="text-[#567299]">PERSONNEL ID:</span>{' '}
                            <span className="text-[#00D9FF] font-bold">{member.personnelId}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse" />
                            <span className="text-[#00D9FF] font-bold">STATUS // {member.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Name & Role */}
                      <div className="py-2">
                        <h3 className="hero-title text-xl sm:text-2xl md:text-3xl font-black text-[#F2F6FF] tracking-tight glow-text-white break-words">
                          {member.name}
                        </h3>
                        <div className="text-xs sm:text-sm md:text-base font-bold text-[#00D9FF] tracking-wider uppercase mt-1 break-words">
                          {member.role}
                        </div>
                      </div>

                      {/* LinkedIn Futuristic Button */}
                      <div className="pt-2">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setHoveredLinkedIn(true)}
                          onMouseLeave={() => setHoveredLinkedIn(false)}
                          className="inline-flex items-center justify-between gap-4 border border-[#00D9FF]/50 bg-[#00D9FF]/10 hover:bg-[#00D9FF]/25 text-[#F2F6FF] px-5 py-2.5 rounded-xs text-xs tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.25)] hover:shadow-[0_0_30px_rgba(0,217,255,0.45)] group"
                        >
                          <span className="font-bold">
                            {hoveredLinkedIn ? 'ACCESSING PROFILE' : 'CONNECT // LINKEDIN'}
                          </span>
                          <ArrowUpRight size={16} className="text-[#00D9FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Interface Footer */}
          <div className="flex items-center justify-between border-t border-[#147DFF]/30 pt-3 text-[10px] text-[#567299]">
            <span>SYSTEM STATUS // ACTIVE</span>
            <span>NETWORK // {formattedTotal} NODES SECURE</span>
            <span className="hidden sm:inline">HF26 // CORE OPERATORS</span>
          </div>
        </div>

        {/* =========================================================================
            STAGE 4: CONNECTED NETWORK & FINAL REVEAL
            ========================================================================= */}
        <div
          ref={connectedNetworkLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 border border-[#00D9FF]/40 bg-[#020B1C]/90 px-4 py-1.5 text-xs text-[#00D9FF] tracking-[0.25em] rounded-xs shadow-[0_0_20px_rgba(0,217,255,0.2)] mb-6">
            <Network size={14} className="text-[#00D9FF]" />
            <span>ALL {formattedTotal} CORE OPERATORS SYNCHRONIZED</span>
          </div>

          {/* Connected Network Line Grid */}
          <div className="w-full max-h-[50vh] overflow-y-auto custom-scrollbar flex flex-wrap items-center justify-center gap-3 py-6 border-y border-[#147DFF]/30 my-2 bg-[#020A1A]/80 backdrop-blur-md px-4 rounded-xs">
            {activeCoreTeamMembers.map((m, idx) => (
              <div key={m.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2 border border-[#00D9FF]/30 bg-[#03122A] px-2.5 py-1 rounded-xs">
                  <span className="text-[10px] text-[#00D9FF] font-bold">{m.id}</span>
                  <span className="text-[10px] text-[#F2F6FF] font-mono-tech">{m.name.split(' ')[0]}</span>
                </div>
                {idx < activeCoreTeamMembers.length - 1 && (
                  <span className="text-[#147DFF] font-bold text-xs">─</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Statement */}
        <div
          ref={finalStatementRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6"
        >
          <div className="text-sm sm:text-base text-[#8CA4C4] tracking-[0.3em] uppercase mb-2">
            CORE TEAM
          </div>
          <h2 className="hero-title text-4xl sm:text-6xl lg:text-7xl font-black text-[#00D9FF] glow-text-cyan tracking-widest leading-tight mb-4">
            DIFFERENT ROLES.<br />
            ONE MISSION.
          </h2>
          <div className="text-xs sm:text-sm text-[#F2F6FF] tracking-[0.25em] font-bold border-t border-[#147DFF]/30 pt-4">
            HACKFINIX 2026 // READY TO BUILD
          </div>
        </div>
      </div>
    </div>
  )
}

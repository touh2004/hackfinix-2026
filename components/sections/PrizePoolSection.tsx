'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Trophy, Award, Sparkles, Shield, ArrowRight, Terminal, Cpu, Radio, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Isolated Right-Column 3D Holographic Bounty Core Machine
const RewardCoreVisual = dynamic(() => import('../3d/RewardCoreVisual'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

/**
 * PrizePoolSection:
 * Premium Cyberpunk Hackathon Bounty Command Center & Holographic Terminal.
 *
 * Story Progression (100% Scroll-Scrubbed & Reversible):
 * 0.00 - 0.20 -> Transition & Boot Sequence: Scanline sweep, terminal telemetry boot, "BOUNTY SYSTEM // ARENA REWARDS"
 * 0.20 - 0.40 -> Hero Headline Lock: Massive "₹12,90,000+ PRIZE POOL" + 3D Holographic Bounty Core powers up
 * 0.40 - 0.65 -> Technical Reward Breakdown: 3 holographic tier cards (01 Champion ₹40,000, 02 Runner Up ₹20,000, 03 UI/UX ₹10,000)
 * 0.65 - 1.00 -> Continuous Camera Push & Core Energy Surge into the Incubation and Bounty Network
 */
export default function PrizePoolSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        setProgress(self.progress)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  // =========================================================================
  // SCROLL PROGRESS CALCULATIONS (0.0 to 1.0)
  // =========================================================================
  // Scanline laser sweep during section entry (0.00 to 0.15)
  const isEntering = progress >= 0.01 && progress <= 0.20
  const scanSweepY = Math.min(100, progress * 500)

  // HUD Boot & Typography Opacity (0.05 to 1.00)
  const contentOpacity = Math.max(0, Math.min(1, (progress - 0.05) / 0.12))

  // 3D Core Power-up Scale & Brightness (0.08 to 1.00)
  const corePower = Math.max(0, Math.min(1, (progress - 0.08) / 0.15))

  // Reward Cards Visibility (0.35 to 1.00)
  const cardsOpacity = Math.max(0, Math.min(1, (progress - 0.35) / 0.15))

  return (
    <div
      ref={containerRef}
      id="prizes"
      className="relative w-full min-h-[220vh] bg-[#020712] text-[#F2F6FF] font-mono-tech select-none overflow-hidden"
    >
      {/* Sticky Full-Screen Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6 sm:px-12 lg:px-16">
        {/* =========================================================================
            CYBERPUNK ATMOSPHERIC ENVIRONMENT LAYERS
            ========================================================================= */}
        {/* Deep Tech Grid */}
        <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />
        {/* Vignette & Radial Glow */}
        <div className="absolute inset-0 vignette-radial pointer-events-none" />
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#147DFF]/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[#00D9FF]/10 blur-[130px] pointer-events-none" />

        {/* Electric-Blue Horizontal Scanline on Entry */}
        {isEntering && (
          <div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent pointer-events-none z-30 shadow-[0_0_15px_#00D9FF]"
            style={{ top: `${scanSweepY}%` }}
          />
        )}

        {/* Ambient Floating Corner Telemetry HUD Labels */}
        <div className="hidden lg:flex absolute top-8 left-10 z-20 items-center gap-3 text-[10px] text-[#567299] tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          <span>REWARD_STATUS // ACTIVE</span>
          <span>·</span>
          <span>BOUNTY_NODES // 32</span>
          <span>·</span>
          <span>PROTOCOL // HACKFINIX_2026</span>
        </div>

        <div className="hidden lg:flex absolute bottom-8 left-10 z-20 items-center gap-3 text-[10px] text-[#567299] tracking-widest">
          <span>X: 04.291</span>
          <span>Y: 88.102</span>
          <span>Z: 17.440</span>
          <span>·</span>
          <span className="text-[#00D9FF]">SIGNAL_LOCK: 100%</span>
        </div>

        {/* =========================================================================
            MAIN TWO-COLUMN CYBERPUNK COMMAND LAYOUT (LEFT 48% / RIGHT 52%)
            ========================================================================= */}
        <div
          className="w-full max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between gap-8 py-10 z-20 transition-opacity duration-300"
          style={{ opacity: contentOpacity }}
        >
          {/* =======================================================================
              LEFT COLUMN (48%): TERMINAL HEADLINE & HUD CARDS
              ======================================================================= */}
          <div className="w-full lg:w-[48%] flex flex-col justify-center space-y-6">
            {/* Top Terminal System Badge */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 border border-[#00D9FF]/30 bg-[#020B1A]/80 px-3.5 py-1.5 rounded-xs backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-ping" />
                <span className="text-[11px] text-[#00D9FF] font-bold tracking-[0.2em]">
                  THE BOUNTY SYSTEM
                </span>
                <span className="text-[#567299]">|</span>
                <span className="text-[10px] text-[#8CA4C4] tracking-wider">
                  BOUNTY PROTOCOL // ARENA REWARDS
                </span>
              </div>
              <div className="text-[10px] text-[#2695FF] tracking-widest pl-1">
                › REWARD NETWORK // ACTIVE
              </div>
            </div>

            {/* Enormous Premium Headline */}
            <div>
              <div className="hero-title text-5xl sm:text-7xl xl:text-8xl font-extrabold text-[#F2F6FF] tracking-tighter leading-none glow-text-white">
                ₹12,90,000+
              </div>
              <div className="hero-title text-3xl sm:text-5xl xl:text-6xl font-bold text-[#147DFF] tracking-widest glow-text-blue mt-1">
                PRIZE POOL
              </div>
            </div>

            {/* Lede Description */}
            <p className="text-xs sm:text-sm text-[#8CA4C4] leading-relaxed max-w-lg border-l-2 border-[#147DFF]/40 pl-3">
              Cash prizes, incubation opportunities, founder support, and high-value cloud resources engineered for the strongest squads.
            </p>

            {/* Three Futuristic Holographic Reward Cards */}
            <div
              className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 transition-opacity duration-300"
              style={{ opacity: cardsOpacity }}
            >
              {/* 01 First Prize */}
              <div className="border border-[#147DFF]/40 bg-[#030E22]/90 backdrop-blur-md p-3.5 rounded-xs shadow-[0_0_25px_rgba(20,125,255,0.25)] relative overflow-hidden group hover:border-[#00D9FF] transition-colors">
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent" />
                <div className="flex items-center justify-between text-[10px] text-[#2695FF] mb-1">
                  <span>01 // CHAMPION</span>
                  <Trophy size={13} className="text-[#00D9FF]" />
                </div>
                <div className="text-[11px] text-[#8CA4C4] uppercase font-bold flex items-center justify-between">
                  <span>FIRST PRIZE</span>
                  <span className="text-[8px] text-[#00D9FF] bg-[#00D9FF]/10 px-1 py-0.2 border border-[#00D9FF]/30 rounded-xs font-bold">PER THEME</span>
                </div>
                <div className="hero-title text-2xl sm:text-3xl text-[#F2F6FF] glow-text-white my-1 font-extrabold">
                  ₹40,000
                </div>
                <div className="text-[8px] text-[#00D9FF] uppercase font-bold tracking-wider mb-1">
                  FOR EACH THEME TRACK
                </div>
                <div className="text-[9px] text-[#8CA4C4] border-t border-[#147DFF]/20 pt-1.5 mt-1 leading-tight">
                  › Incubation Fast-Track
                </div>
              </div>

              {/* 02 Second Prize */}
              <div className="border border-[#00D9FF]/40 bg-[#020A1A]/90 backdrop-blur-md p-3.5 rounded-xs shadow-[0_0_20px_rgba(0,217,255,0.2)] relative overflow-hidden group hover:border-[#00D9FF] transition-colors">
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#147DFF] to-transparent" />
                <div className="flex items-center justify-between text-[10px] text-[#00D9FF] mb-1">
                  <span>02 // RUNNER UP</span>
                  <Award size={13} className="text-[#00D9FF]" />
                </div>
                <div className="text-[11px] text-[#8CA4C4] uppercase font-bold flex items-center justify-between">
                  <span>SECOND PRIZE</span>
                  <span className="text-[8px] text-[#00D9FF] bg-[#00D9FF]/10 px-1 py-0.2 border border-[#00D9FF]/30 rounded-xs font-bold">PER THEME</span>
                </div>
                <div className="hero-title text-2xl sm:text-3xl text-[#00D9FF] glow-text-cyan my-1 font-extrabold">
                  ₹20,000
                </div>
                <div className="text-[8px] text-[#00D9FF] uppercase font-bold tracking-wider mb-1">
                  FOR EACH THEME TRACK
                </div>
                <div className="text-[9px] text-[#8CA4C4] border-t border-[#00D9FF]/20 pt-1.5 mt-1 leading-tight">
                  › Founder Mentorship
                </div>
              </div>

              {/* 03 Best UI/UX Design */}
              <div className="border border-[#147DFF]/40 bg-[#030D20]/90 backdrop-blur-md p-3.5 rounded-xs shadow-[0_0_20px_rgba(20,125,255,0.2)] relative overflow-hidden group hover:border-[#2695FF] transition-colors">
                <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#2695FF] to-transparent" />
                <div className="flex items-center justify-between text-[10px] text-[#2695FF] mb-1">
                  <span>03 // SPECIAL</span>
                  <Sparkles size={13} className="text-[#2695FF]" />
                </div>
                <div className="text-[11px] text-[#8CA4C4] uppercase font-bold">BEST UI/UX</div>
                <div className="hero-title text-2xl sm:text-3xl text-[#F2F6FF] my-1 font-extrabold">
                  ₹10,000
                </div>
                <div className="text-[9px] text-[#8CA4C4] border-t border-[#147DFF]/20 pt-1.5 mt-1 leading-tight">
                  › Design Lab Grants
                </div>
              </div>
            </div>

            {/* Incubation Accelerator Mention */}
            <div className="w-full flex items-center justify-between border border-[#00D9FF]/20 bg-[#041228]/60 p-3 rounded-xs text-xs text-[#8CA4C4]">
              <span className="flex items-center gap-2">
                <Shield size={14} className="text-[#00D9FF]" />
                <span>INCUBATION PROTOCOL: <strong className="text-[#00D9FF]">UP TO ₹10,00,000</strong></span>
              </span>
              <span className="text-[10px] text-[#567299] tracking-widest hidden sm:inline">SEED ALLOCATION</span>
            </div>
          </div>

          {/* =======================================================================
              RIGHT COLUMN (52%): DEDICATED 3D HOLOGRAPHIC BOUNTY CORE MACHINE
              ======================================================================= */}
          <div className="w-full lg:w-[52%] h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center relative">
            {/* Background Radial Core Glow */}
            <div
              className="absolute w-72 h-72 rounded-full bg-[#00D9FF]/15 blur-[80px] pointer-events-none transition-transform duration-500"
              style={{ transform: `scale(${0.8 + corePower * 0.4})` }}
            />

            {/* HUD Corner Tech Brackets framing the 3D Machine */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#00D9FF]/40 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#00D9FF]/40 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#00D9FF]/40 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#00D9FF]/40 pointer-events-none" />

            {/* Micro Coordinate Labels */}
            <div className="absolute top-6 right-6 text-[9px] text-[#00D9FF]/60 tracking-widest pointer-events-none">
              BOUNTY_CORE // 0x77F
            </div>
            <div className="absolute bottom-6 left-6 text-[9px] text-[#2695FF]/60 tracking-widest pointer-events-none">
              MATRIX_ROT // 32_NODES
            </div>

            {/* The 3D Cyber Machine Canvas */}
            <RewardCoreVisual progress={progress} />
          </div>
        </div>
      </div>
    </div>
  )
}

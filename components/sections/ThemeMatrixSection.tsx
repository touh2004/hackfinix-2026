'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themesData } from '@/data/themes'
import { Terminal, Shield, ArrowRight, Cpu, Layers } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * ThemeMatrixSection:
 * Completely self-contained 2D Cyberpunk Theme Introduction & Matrix Section.
 * Starts immediately AFTER the Prize Pool / Incubation section.
 * 
 * SCROLL TIMELINE (700vh runway, 100vh pinned stage):
 * 0–8%:    Phase 0 — Transition from Prize Pool (Blackout, scanline, SYSTEM TRANSITION, THEME MATRIX LOADING 0% -> 100%)
 * 8–18%:   Phase 1 — Theme Introduction Title ("BUILD WHAT MATTERS. FOUR DOMAINS. ONE ARENA.")
 * 18–28%:  Phase 2 — Theme Matrix Activation (4 Channel Lines STANDBY -> ACTIVE)
 * 28–40%:  Phase 3 — Theme 01 (SMART MANUFACTURING & INDUSTRY 5.0)
 * 40–52%:  Phase 4 — Theme 02 (HUMAN-AI COLLABORATION)
 * 52–64%:  Phase 5 — Theme 03 (SUSTAINABILITY & GREEN TECHNOLOGIES)
 * 64–78%:  Phase 6 — Theme 04 (INDUSTRIAL CYBERSECURITY)
 * 78–90%:  Phase 8 — Complete Theme Matrix Overview (All 4 illuminated sequentially)
 * 90–100%: Phase 9 — Final Cinematic Statement ("THE PROBLEM IS YOURS. THE SOLUTION IS YOURS TO BUILD. BUILD THE FUTURE.")
 */
export default function ThemeMatrixSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinStageRef = useRef<HTMLDivElement>(null)

  // Layer Refs
  const transitionLayerRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const progressTextRef = useRef<HTMLDivElement>(null)

  const titleLayerRef = useRef<HTMLDivElement>(null)
  const word1Ref = useRef<HTMLSpanElement>(null)
  const word2Ref = useRef<HTMLSpanElement>(null)
  const word3Ref = useRef<HTMLSpanElement>(null)

  const themeDisplayLayerRef = useRef<HTMLDivElement>(null)
  const themeCardRefs = useRef<(HTMLDivElement | null)[]>([])

  const matrixOverviewLayerRef = useRef<HTMLDivElement>(null)
  const overviewRowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current || !pinStageRef.current) return

    // Explicit initial states for clean overlay layering
    gsap.set(transitionLayerRef.current, { opacity: 1, autoAlpha: 1 })
    gsap.set(titleLayerRef.current, { opacity: 0, autoAlpha: 0 })
    gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], { opacity: 0, y: 20 })

    gsap.set(themeDisplayLayerRef.current, { opacity: 0, autoAlpha: 0 })
    themeCardRefs.current.forEach((card) => {
      if (card) gsap.set(card, { opacity: 0, autoAlpha: 0, scale: 0.95, y: 30 })
    })

    gsap.set(matrixOverviewLayerRef.current, { opacity: 0, autoAlpha: 0 })
    overviewRowRefs.current.forEach((row) => {
      if (row) gsap.set(row, { opacity: 0.3, x: -20 })
    })

    // Master Timeline Pinned strictly to the 700vh runway
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinStageRef.current,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    })

    // -------------------------------------------------------------------------
    // PHASE 0: TRANSITION & MATRIX LOADING (0–8%)
    // -------------------------------------------------------------------------
    masterTl.to(progressFillRef.current, { width: '100%', duration: 0.06, ease: 'none' })
    masterTl.to(transitionLayerRef.current, { opacity: 0, autoAlpha: 0, duration: 0.04 })

    // -------------------------------------------------------------------------
    // PHASE 1: THEME INTRODUCTION TITLE (8–18%)
    // -------------------------------------------------------------------------
    masterTl.to(titleLayerRef.current, { opacity: 1, autoAlpha: 1, duration: 0.04 })
    masterTl.to(word1Ref.current, { opacity: 1, y: 0, duration: 0.03 })
    masterTl.to(word2Ref.current, { opacity: 1, y: 0, duration: 0.03 })
    masterTl.to(word3Ref.current, { opacity: 1, y: 0, duration: 0.03 })
    masterTl.to({}, { duration: 0.04 }) // Hold Title
    masterTl.to(titleLayerRef.current, { opacity: 0, autoAlpha: 0, duration: 0.04 })

    // -------------------------------------------------------------------------
    // PHASE 2–7: SEQUENTIAL THEME UNLOCKS (18–78%)
    // -------------------------------------------------------------------------
    masterTl.to(themeDisplayLayerRef.current, { opacity: 1, autoAlpha: 1, duration: 0.04 })

    themesData.forEach((theme, idx) => {
      const cardEl = themeCardRefs.current[idx]
      if (!cardEl) return

      // Reveal Theme
      masterTl.to(cardEl, { opacity: 1, autoAlpha: 1, scale: 1, y: 0, duration: 0.08, ease: 'back.out(1.2)' })
      masterTl.to({}, { duration: 0.08 }) // Dedicated scroll hold for theme reading

      // Compress/Exit Theme if not the last one
      if (idx < themesData.length - 1) {
        masterTl.to(cardEl, { opacity: 0, autoAlpha: 0, scale: 0.9, y: -30, duration: 0.06 })
      }
    })

    // Fade out last theme card
    const lastCard = themeCardRefs.current[themesData.length - 1]
    if (lastCard) {
      masterTl.to(lastCard, { opacity: 0, autoAlpha: 0, scale: 0.9, y: -30, duration: 0.04 })
    }
    masterTl.to(themeDisplayLayerRef.current, { opacity: 0, autoAlpha: 0, duration: 0.02 })

    // -------------------------------------------------------------------------
    // PHASE 8: THEME MATRIX OVERVIEW (78–90%)
    // -------------------------------------------------------------------------
    masterTl.to(matrixOverviewLayerRef.current, { opacity: 1, autoAlpha: 1, duration: 0.04 })

    // Illuminate all 5 rows sequentially
    overviewRowRefs.current.forEach((row) => {
      if (row) {
        masterTl.to(row, { opacity: 1, x: 0, duration: 0.03 })
      }
    })

    masterTl.to({}, { duration: 0.12 }) // Overview hold right to section end

     return () => {
      masterTl.kill()
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      id="themes"
      className="relative w-full h-[480vh] bg-[#01050F] text-[#F2F6FF] font-mono-tech select-none"
    >
      {/* 100vh Sticky Viewport Stage (PINNED BY GSAP SCROLLTRIGGER) */}
      <div
        ref={pinStageRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Deep 2D Cyber Atmosphere Background Layers */}
        <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none z-0" />
        <div className="absolute inset-0 vignette-radial pointer-events-none z-0" />
        <div className="scanline-overlay fixed inset-0 z-10 opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(20,125,255,0.12)_0%,rgba(1,5,15,0.95)_75%)]" />

        {/* HUD Corner Brackets */}
        <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-[#00D9FF]/40 pointer-events-none z-20" />
        <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-[#00D9FF]/40 pointer-events-none z-20" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-[#00D9FF]/40 pointer-events-none z-20" />
        <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-[#00D9FF]/40 pointer-events-none z-20" />

        {/* Floating Monospaced Status Tag */}
        <div className="hidden lg:flex absolute top-8 left-20 z-20 items-center gap-3 text-[10px] text-[#567299] tracking-widest uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          <span>HACKFINIX_2026 // THEME_MATRIX</span>
          <span>·</span>
          <span>DOMAINS: 04 ACTIVE</span>
        </div>

        {/* =========================================================================
            PHASE 0: TRANSITION & MATRIX LOADING
            ========================================================================= */}
        <div
          ref={transitionLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 bg-[#01050F] px-6"
        >
          <div className="text-xs text-[#00D9FF] tracking-[0.3em] uppercase mb-2">
            SYSTEM TRANSITION // REWARD PROTOCOL COMPLETE
          </div>
          <div className="hero-title text-3xl sm:text-5xl text-[#F2F6FF] tracking-wider mb-4">
            THEME MATRIX <span className="text-[#147DFF]">LOADING...</span>
          </div>

          {/* Progress Bar */}
          <div className="w-64 sm:w-80 h-2 bg-[#041228] border border-[#147DFF]/40 rounded-full overflow-hidden mb-3">
            <div
              ref={progressFillRef}
              className="h-full w-0 bg-gradient-to-r from-[#147DFF] via-[#00D9FF] to-[#F2F6FF]"
            />
          </div>
          <div className="text-[11px] text-[#00D9FF] tracking-widest uppercase">
            INITIALIZING DOMAIN CHANNELS
          </div>
        </div>

        {/* =========================================================================
            PHASE 1: THEME INTRODUCTION TITLE ("BUILD WHAT MATTERS.")
            ========================================================================= */}
        <div
          ref={titleLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-6"
        >
          <div className="inline-flex items-center gap-2 border border-[#00D9FF]/40 bg-[#020B1C]/90 px-4 py-1.5 text-xs text-[#00D9FF] tracking-[0.25em] rounded-xs shadow-[0_0_20px_rgba(0,217,255,0.2)] mb-6">
            <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <span>HACKFINIX // THEME MATRIX</span>
          </div>

          <h2 className="hero-title text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#F2F6FF] glow-text-white my-2 space-x-3 sm:space-x-5">
            <span ref={word1Ref} className="inline-block">BUILD</span>
            <span ref={word2Ref} className="inline-block text-[#147DFF] glow-text-blue">WHAT</span>
            <span ref={word3Ref} className="inline-block text-[#00D9FF] glow-text-cyan">MATTERS.</span>
          </h2>

          <div className="text-sm sm:text-base text-[#8CA4C4] tracking-[0.3em] uppercase mt-4 border-t border-[#147DFF]/20 pt-4">
            FOUR DOMAINS · ONE ARENA
          </div>
        </div>

        {/* =========================================================================
            PHASE 2–7: SEQUENTIAL THEME CARDS (DISPLAYED ONE BY ONE)
            ========================================================================= */}
        <div
          ref={themeDisplayLayerRef}
          className="absolute inset-0 flex items-center justify-center z-30 px-6"
        >
          {themesData.map((theme, idx) => (
            <div
              key={theme.id}
              ref={(el) => { themeCardRefs.current[idx] = el }}
              className="absolute w-full max-w-3xl border border-[#147DFF]/50 bg-[#020A1A]/95 backdrop-blur-2xl p-8 sm:p-10 rounded-xs shadow-[0_0_40px_rgba(20,125,255,0.2)] text-left space-y-6"
            >
              {/* Card Top Technical Header */}
              <div className="flex items-center justify-between border-b border-[#147DFF]/30 pb-4 text-xs text-[#8CA4C4]">
                <div className="flex items-center gap-3">
                  <span className="hero-title text-lg font-bold text-[#00D9FF]">THEME {theme.id}</span>
                  <span className="text-[#567299]">//</span>
                  <span className="tracking-widest text-[#2695FF]">{theme.code}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[10px] text-[#00D9FF] border border-[#00D9FF]/30 px-2.5 py-1 rounded-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                  <span>SYSTEM ACTIVE</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="hero-title text-3xl sm:text-5xl font-extrabold text-[#F2F6FF] tracking-tight glow-text-white mb-2">
                  {theme.title}
                </h3>
                <div className="text-xs sm:text-sm text-[#2695FF] tracking-wider uppercase font-bold">
                  {theme.subtitle}
                </div>
              </div>

              {/* Structured Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-[#147DFF]/15 text-xs text-[#8CA4C4]">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#567299] tracking-widest uppercase block font-bold">INDUSTRY FOCUS</span>
                  <p className="leading-relaxed text-[11px] pl-3 border-l-2 border-[#147DFF]/40">{theme.industryFocus}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#567299] tracking-widest uppercase block font-bold">PROBLEM FOCUS</span>
                  <p className="leading-relaxed text-[11px] pl-3 border-l-2 border-[#00D9FF]/40">{theme.problemFocus}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#567299] tracking-widest uppercase block font-bold">EXPECTED OUTPUT</span>
                  <p className="leading-relaxed text-[11px] pl-3 border-l-2 border-[#F2F6FF]/40">{theme.expectedOutput}</p>
                </div>
              </div>

              {/* Focus Area Tags */}
              <div className="pt-1">
                <div className="text-[10px] text-[#567299] tracking-widest uppercase mb-2">
                  CORE TECH SEGMENTS
                </div>
                <div className="flex flex-wrap gap-2">
                  {theme.focusAreas.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] border border-[#00D9FF]/30 bg-[#041228] text-[#00D9FF] px-3 py-1 rounded-xs tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            PHASE 8: THEME MATRIX OVERVIEW
            ========================================================================= */}
        <div
          ref={matrixOverviewLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 max-w-4xl mx-auto text-left"
        >
          <div className="inline-flex items-center gap-2 border border-[#00D9FF]/40 bg-[#020B1C]/90 px-4 py-1.5 text-xs text-[#00D9FF] tracking-[0.25em] rounded-xs shadow-[0_0_20px_rgba(0,217,255,0.2)] mb-8 self-center">
            <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <span>HACKFINIX // ALL 4 DOMAINS ACTIVE</span>
          </div>

          <div className="w-full space-y-3">
            {themesData.map((theme, idx) => (
              <div
                key={theme.id}
                ref={(el) => { overviewRowRefs.current[idx] = el }}
                className="w-full flex items-center justify-between border border-[#147DFF]/30 bg-[#030D20]/90 p-4 rounded-xs text-xs text-[#F2F6FF]"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-[#00D9FF] tracking-wider">THEME {theme.id}</span>
                  <span className="text-[#567299]">|</span>
                  <span className="hero-title text-sm sm:text-base font-bold text-[#F2F6FF] tracking-wider">{theme.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-32 h-1 bg-[#041228] border border-[#147DFF]/30 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#00D9FF]" />
                  </div>
                  <span className="text-[10px] text-[#00D9FF] tracking-widest border border-[#00D9FF]/30 px-2 py-0.5 rounded-xs">
                    ACTIVE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}

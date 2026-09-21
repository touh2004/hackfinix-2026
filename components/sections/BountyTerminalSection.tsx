'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lock, Unlock, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/**
 * BountyTerminalSection:
 * FULL-SCREEN CINEMATIC STICKY PINNED SCROLL TIMELINE (700vh runway, 100vh pinned stage).
 * 
 * Strict Cinematic Architecture:
 * - Parent wrapper: relative w-full h-[700vh]
 * - Viewport stage: sticky top-0 w-full h-screen overflow-hidden
 * - All scenes & layers: absolute inset-0 (stacked inside the same 100vh canvas)
 * - Single GSAP ScrollTrigger timeline pins the stage and scrubs opacity/transforms/numbers directly with scroll.
 */
export default function BountyTerminalSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinStageRef = useRef<HTMLDivElement>(null)

  // Layer Refs
  const layerTransitionRef = useRef<HTMLDivElement>(null)
  const layerLoadingRef = useRef<HTMLDivElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const progressTextRef = useRef<HTMLDivElement>(null)
  const accessBadgeRef = useRef<HTMLDivElement>(null)

  const doorContainerRef = useRef<HTMLDivElement>(null)
  const doorBadgeRef = useRef<HTMLDivElement>(null)
  const doorLeftRef = useRef<HTMLDivElement>(null)
  const doorRightRef = useRef<HTMLDivElement>(null)

  const layerPrizeMainRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)
  const holdBadgeRef = useRef<HTMLDivElement>(null)

  const layerShutdownRef = useRef<HTMLDivElement>(null)
  const phil1Ref = useRef<HTMLDivElement>(null)
  const phil2Ref = useRef<HTMLDivElement>(null)

  const layerIncubationRef = useRef<HTMLDivElement>(null)
  const counterTextRef = useRef<HTMLDivElement>(null)
  const incubationCtaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !pinStageRef.current) return

    // Explicit initial states for clean overlay layering
    gsap.set(layerTransitionRef.current, { opacity: 1, autoAlpha: 1 })
    gsap.set(layerLoadingRef.current, { opacity: 0, autoAlpha: 0 })
    gsap.set(doorContainerRef.current, { opacity: 0, autoAlpha: 0 })
    gsap.set(doorLeftRef.current, { xPercent: 0 })
    gsap.set(doorRightRef.current, { xPercent: 0 })

    gsap.set(layerPrizeMainRef.current, { opacity: 0, autoAlpha: 0 })
    gsap.set(card1Ref.current, { opacity: 0, y: 40, scale: 0.9 })
    gsap.set(card2Ref.current, { opacity: 0, y: 40, scale: 0.9 })
    gsap.set(card3Ref.current, { opacity: 0, y: 40, scale: 0.9 })
    gsap.set(holdBadgeRef.current, { opacity: 0, y: 20 })

    gsap.set(layerShutdownRef.current, { opacity: 0, autoAlpha: 0 })
    gsap.set(phil1Ref.current, { opacity: 0, y: 30 })
    gsap.set(phil2Ref.current, { opacity: 0, y: 30 })

    gsap.set(layerIncubationRef.current, { opacity: 0, autoAlpha: 0 })
    gsap.set(incubationCtaRef.current, { opacity: 0, y: 20 })

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
    // TIMELINE STAGE 1: SYSTEM TRANSITION & LOADING (0.0 - 0.20)
    // -------------------------------------------------------------------------
    // Transition Zoom Out -> Loading Screen
    masterTl.to(layerTransitionRef.current, { opacity: 0, autoAlpha: 0, duration: 0.08 })
    masterTl.to(layerLoadingRef.current, { opacity: 1, autoAlpha: 1, duration: 0.08 }, '<')

    // Progress Bar Fill 0% -> 100%
    masterTl.to(progressFillRef.current, { width: '100%', duration: 0.12, ease: 'none' })
    masterTl.to(accessBadgeRef.current, { opacity: 1, scale: 1.05, duration: 0.04 }, '-=0.02')

    // -------------------------------------------------------------------------
    // TIMELINE STAGE 2: CYBER DOOR OPENING (0.20 - 0.32)
    // -------------------------------------------------------------------------
    masterTl.to(layerLoadingRef.current, { opacity: 0, autoAlpha: 0, duration: 0.04 })
    masterTl.to(doorContainerRef.current, { opacity: 1, autoAlpha: 1, duration: 0.04 }, '<')
    masterTl.to(doorBadgeRef.current, { opacity: 1, duration: 0.04 })

    // Split Left & Right Doors
    masterTl.to(doorBadgeRef.current, { opacity: 0, duration: 0.04 })
    masterTl.to(doorLeftRef.current, { xPercent: -100, duration: 0.12, ease: 'power2.inOut' })
    masterTl.to(doorRightRef.current, { xPercent: 100, duration: 0.12, ease: 'power2.inOut' }, '<')
    masterTl.to(doorContainerRef.current, { opacity: 0, autoAlpha: 0, duration: 0.02 })

    // -------------------------------------------------------------------------
    // TIMELINE STAGE 3: SEQUENTIAL CARD REVEALS (0.32 - 0.82)
    // -------------------------------------------------------------------------
    masterTl.to(layerPrizeMainRef.current, { opacity: 1, autoAlpha: 1, duration: 0.04 })

    // Step 1: Reveal ONLY Card 01 (₹40,000)
    masterTl.to(card1Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.12, ease: 'back.out(1.2)' })
    masterTl.to({}, { duration: 0.10 }) // Dedicated scroll distance with only Card 01 visible

    // Step 2: Reveal Card 02 (₹20,000)
    masterTl.to(card2Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.12, ease: 'back.out(1.2)' })
    masterTl.to({}, { duration: 0.10 }) // Dedicated scroll distance with Cards 01 & 02 visible

    // Step 3: Reveal Card 03 (₹10,000 UI/UX)
    masterTl.to(card3Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.12, ease: 'back.out(1.2)' })

    // Step 4: Hold All Three Prizes Stable
    masterTl.to(holdBadgeRef.current, { opacity: 1, y: 0, duration: 0.06 })
    masterTl.to({}, { duration: 0.12 }) // Hold pause before collapse

    // -------------------------------------------------------------------------
    // TIMELINE STAGE 4: COLLAPSE & PHILOSOPHY MOMENT (0.82 - 0.90)
    // -------------------------------------------------------------------------
    masterTl.to(holdBadgeRef.current, { opacity: 0, y: -20, duration: 0.04 })
    masterTl.to([card1Ref.current, card2Ref.current, card3Ref.current], {
      opacity: 0,
      scale: 0.7,
      y: -50,
      stagger: 0.02,
      duration: 0.08,
      ease: 'power2.in',
    })
    masterTl.to(layerPrizeMainRef.current, { opacity: 0, autoAlpha: 0, duration: 0.04 })

    masterTl.to(layerShutdownRef.current, { opacity: 1, autoAlpha: 1, duration: 0.04 })
    masterTl.to(phil1Ref.current, { opacity: 1, y: 0, duration: 0.06 })
    masterTl.to(phil1Ref.current, { opacity: 0, y: -20, duration: 0.04 }, '+=0.04')
    masterTl.to(phil2Ref.current, { opacity: 1, y: 0, duration: 0.06 })
    masterTl.to(phil2Ref.current, { opacity: 0, y: -20, duration: 0.04 }, '+=0.04')
    masterTl.to(layerShutdownRef.current, { opacity: 0, autoAlpha: 0, duration: 0.04 })

    // -------------------------------------------------------------------------
    // TIMELINE STAGE 5: MASSIVE INCUBATION REVEAL (0.90 - 1.00)
    // -------------------------------------------------------------------------
    masterTl.to(layerIncubationRef.current, { opacity: 1, autoAlpha: 1, duration: 0.06 })

    // Number Scrubbing ₹10 -> ₹10,00,000
    const counterObj = { val: 10 }
    const formattedNumbers = ['₹10', '₹100', '₹1,000', '₹10,000', '₹1,00,000', '₹10,00,000']

    masterTl.to(counterObj, {
      val: 5,
      duration: 0.12,
      ease: 'none',
      onUpdate: () => {
        const idx = Math.min(5, Math.floor(counterObj.val))
        if (counterTextRef.current) {
          counterTextRef.current.innerText = formattedNumbers[idx]
        }
      },
    })

    masterTl.to(incubationCtaRef.current, { opacity: 1, y: 0, duration: 0.06 })

    return () => {
      masterTl.kill()
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      id="prizes"
      className="relative w-full h-[700vh] bg-[#01050F] text-[#F2F6FF] font-mono-tech select-none"
    >
      {/* 100vh Sticky Viewport Stage (PINNED BY GSAP SCROLLTRIGGER) */}
      <div
        ref={pinStageRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Deep Cyber Environment Background Layers */}
        {/* Background Video (Revealed Behind Cyber Door) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none z-0 mix-blend-screen"
        >
          <source src="/prize-pool-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#01050F]/40 pointer-events-none z-0" />
        <div className="absolute inset-0 vignette-radial pointer-events-none z-0" />
        <div className="scanline-overlay fixed inset-0 z-10 opacity-30 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(20,125,255,0.15)_0%,rgba(1,5,15,0.85)_75%)]" />

        {/* =========================================================================
            LAYER 1: SYSTEM TRANSITION
            ========================================================================= */}
        <div
          ref={layerTransitionRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 bg-[#01050F] px-6"
        >
          <div className="text-xs text-[#00D9FF] tracking-[0.3em] uppercase mb-2">
            SYSTEM TRANSITION
          </div>
          <div className="hero-title text-3xl sm:text-5xl text-[#F2F6FF] tracking-wider mb-2">
            BOUNTY SYSTEM <span className="text-[#147DFF]">INITIALIZING...</span>
          </div>
        </div>

        {/* =========================================================================
            LAYER 2: LOADING SCREEN
            ========================================================================= */}
        <div
          ref={layerLoadingRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-40 px-6 bg-[#01050F]/90 backdrop-blur-md"
        >
          <div className="text-xs text-[#00D9FF] tracking-[0.3em] uppercase mb-1">
            LOADING PRIZE POOL
          </div>
          <div className="text-[10px] text-[#8CA4C4] tracking-widest mb-4">
            // SECURE CHANNEL INITIALIZED
          </div>

          {/* Futuristic Progress Bar */}
          <div className="w-64 sm:w-80 h-2 bg-[#041228] border border-[#147DFF]/40 rounded-full overflow-hidden mb-3">
            <div
              ref={progressFillRef}
              className="h-full w-0 bg-gradient-to-r from-[#147DFF] via-[#00D9FF] to-[#F2F6FF]"
            />
          </div>

          <div
            ref={accessBadgeRef}
            className="opacity-0 scale-95 transition-transform text-xs text-[#00D9FF] tracking-[0.25em] border border-[#00D9FF]/40 bg-[#021026] px-4 py-1.5 rounded-xs"
          >
            ACCESS GRANTED // BOUNTY GATE READY
          </div>
        </div>

        {/* =========================================================================
            LAYER 3: CYBER DOOR (2D PANELS SPLIT LEFT & RIGHT)
            ========================================================================= */}
        <div
          ref={doorContainerRef}
          className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {/* Gate Lock Badge */}
          <div
            ref={doorBadgeRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center z-50 px-6"
          >
            <div className="p-4 border border-[#00D9FF]/40 bg-[#020B1A]/95 backdrop-blur-xl rounded-sm max-w-sm w-full space-y-2 shadow-[0_0_30px_rgba(0,217,255,0.3)]">
              <div className="flex items-center justify-between text-xs text-[#00D9FF]">
                <span className="font-bold tracking-widest">BOUNTY SYSTEM</span>
                <Unlock size={14} className="text-[#00D9FF]" />
              </div>
              <div className="text-[11px] text-[#8CA4C4]">ACCESS LEVEL // RESTRICTED</div>
              <div className="text-xs font-mono-tech font-bold text-[#F2F6FF] tracking-wider border-t border-[#147DFF]/20 pt-2">
                AUTHENTICATION COMPLETE // ACCESS GRANTED
              </div>
            </div>
          </div>

          {/* Left Vault Panel */}
          <div
            ref={doorLeftRef}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#02091A] border-r-2 border-[#00D9FF]/60 backdrop-blur-2xl flex items-center justify-end pr-8"
          >
            <div className="w-1 h-32 bg-[#00D9FF]/40 rounded-full" />
          </div>

          {/* Right Vault Panel */}
          <div
            ref={doorRightRef}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#02091A] border-l-2 border-[#00D9FF]/60 backdrop-blur-2xl flex items-center justify-start pl-8"
          >
            <div className="w-1 h-32 bg-[#00D9FF]/40 rounded-full" />
          </div>
        </div>

        {/* =========================================================================
            LAYER 4: MAIN PRIZE POOL STAGE & CARDS
            ========================================================================= */}
        <div
          ref={layerPrizeMainRef}
          className="absolute inset-0 flex flex-col justify-center items-center px-6 z-20"
        >


          {/* 3 Sequential Cards */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch my-4">
            {/* Card 01: First Prize (₹40,000 PER THEME) */}
            <div
              ref={card1Ref}
              className="border border-[#147DFF]/50 bg-[#030E22]/90 backdrop-blur-xl p-6 rounded-xs shadow-[0_0_35px_rgba(20,125,255,0.25)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent animate-pulse" />
              <div className="flex items-center justify-between text-[10px] text-[#2695FF] tracking-widest mb-2">
                <span>BOUNTY // 01</span>
                <span className="text-[#00D9FF] font-bold">STATUS // ALLOCATED</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#8CA4C4] font-bold tracking-widest uppercase">01 / FIRST PRIZE</div>
                <span className="text-[9px] text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 border border-[#00D9FF]/30 rounded-xs font-mono-tech font-bold">
                  PER THEME
                </span>
              </div>
              <div className="hero-title text-4xl sm:text-5xl font-black text-[#F2F6FF] glow-text-white mt-3 mb-1">
                ₹40,000
              </div>
              <div className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold mb-3">
                FOR EACH THEME TRACK (4 × ₹40,000)
              </div>
              <div className="border-t border-[#147DFF]/20 pt-3 space-y-1.5 text-xs text-[#8CA4C4]">
                <div>› Direct Incubation Protocol Access</div>
                <div>› Custom Titanium Physical Trophy</div>
                <div>› VC & Partner Pitch Fast-Track</div>
              </div>
            </div>

            {/* Card 02: Second Prize (₹20,000 PER THEME) */}
            <div
              ref={card2Ref}
              className="border border-[#00D9FF]/40 bg-[#020A1A]/90 backdrop-blur-xl p-6 rounded-xs shadow-[0_0_30px_rgba(0,217,255,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#147DFF] to-transparent" />
              <div className="flex items-center justify-between text-[10px] text-[#00D9FF] tracking-widest mb-2">
                <span>BOUNTY // 02</span>
                <span className="text-[#8CA4C4]">STATUS // ALLOCATED</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#8CA4C4] font-bold tracking-widest uppercase">02 / SECOND PRIZE</div>
                <span className="text-[9px] text-[#00D9FF] bg-[#00D9FF]/10 px-2 py-0.5 border border-[#00D9FF]/30 rounded-xs font-mono-tech font-bold">
                  PER THEME
                </span>
              </div>
              <div className="hero-title text-4xl sm:text-5xl font-black text-[#F2F6FF] glow-text-white mt-3 mb-1">
                ₹20,000
              </div>
              <div className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold mb-3">
                FOR EACH THEME TRACK (4 × ₹20,000)
              </div>
              <div className="border-t border-[#147DFF]/20 pt-3 space-y-1.5 text-xs text-[#8CA4C4]">
                <div>› Founder Mentorship Cohort</div>
                <div>› Cloud Compute Grants</div>
                <div>› Hardware Dev Kits</div>
              </div>
            </div>

            {/* Card 03: Best UI/UX Design (₹10,000) */}
            <div
              ref={card3Ref}
              className="border border-[#147DFF]/40 bg-[#030D20]/90 backdrop-blur-xl p-6 rounded-xs shadow-[0_0_30px_rgba(20,125,255,0.2)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#2695FF] to-transparent" />
              <div className="flex items-center justify-between text-[10px] text-[#2695FF] tracking-widest mb-2">
                <span>SPECIAL BOUNTY // 03</span>
                <span className="text-[#8CA4C4]">DESIGN</span>
              </div>
              <div className="text-xs text-[#8CA4C4] font-bold tracking-widest uppercase">03 / BEST UI/UX DESIGN</div>
              <div className="hero-title text-4xl sm:text-5xl font-black text-[#F2F6FF] my-3">
                ₹10,000
              </div>
              <div className="border-t border-[#147DFF]/20 pt-3 space-y-1.5 text-xs text-[#8CA4C4]">
                <div>› Design Lab Recognition</div>
                <div>› Pro Design Tool Licenses</div>
                <div>› Special Design Trophy</div>
              </div>
            </div>
          </div>

          {/* Three Prizes Visual Hold Tag */}
          <div
            ref={holdBadgeRef}
            className="mt-4 inline-flex items-center gap-2 border border-[#00D9FF]/30 bg-[#020B1C]/90 px-4 py-1.5 rounded-xs text-xs text-[#00D9FF] tracking-widest shadow-[0_0_20px_rgba(0,217,255,0.3)]"
          >
            <span>BOUNTY SYSTEM // ACTIVE — ₹40,000 (1ST) & ₹20,000 (2ND) ALLOCATED FOR EACH OF THE 4 THEMES</span>
          </div>
        </div>

        {/* =========================================================================
            LAYER 5: COLLAPSE & PHILOSOPHY MOMENT
            ========================================================================= */}
        <div
          ref={layerShutdownRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
        >
          <div ref={phil1Ref} className="hero-title text-3xl sm:text-5xl text-[#8CA4C4] tracking-wider leading-relaxed">
            BUT THE REAL REWARD<br />
            ISN&apos;T THE PRIZE...
          </div>
          <div ref={phil2Ref} className="hero-title text-4xl sm:text-6xl text-[#00D9FF] glow-text-cyan tracking-widest leading-relaxed">
            IT&apos;S WHAT<br />
            YOU BUILD NEXT.
          </div>
        </div>

        {/* =========================================================================
            LAYER 6: MASSIVE INCUBATION REVEAL (UP TO ₹10,00,000)
            ========================================================================= */}
        <div
          ref={layerIncubationRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 py-10 z-30"
        >
          {/* 2D SVG Cybernetic Incubation Vault Frame */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none opacity-40">
            <svg width="600" height="600" viewBox="0 0 600 600" fill="none" className="animate-spin-slow">
              <circle cx="300" cy="300" r="280" stroke="#00D9FF" strokeWidth="1" strokeDasharray="10 15" opacity="0.6" />
              <circle cx="300" cy="300" r="220" stroke="#147DFF" strokeWidth="2" strokeDasharray="40 20" opacity="0.8" />
              <circle cx="300" cy="300" r="160" stroke="#00D9FF" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 border border-[#00D9FF]/40 bg-[#020B1C]/90 px-4 py-1.5 text-xs text-[#00D9FF] tracking-[0.25em] rounded-xs shadow-[0_0_25px_rgba(0,217,255,0.3)] mb-4">
            <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-ping" />
            <span>HACKFINIX // INCUBATION PROTOCOL</span>
          </div>

          <div className="text-sm sm:text-base text-[#8CA4C4] tracking-[0.3em] uppercase">
            UP TO
          </div>

          {/* Scrubbed Number Text */}
          <div
            ref={counterTextRef}
            className="hero-title text-5xl sm:text-7xl md:text-8xl font-black text-[#00D9FF] glow-text-cyan tracking-tighter leading-none my-2"
          >
            ₹10
          </div>

          <div className="hero-title text-2xl sm:text-4xl md:text-5xl font-bold text-[#147DFF] tracking-widest glow-text-blue leading-none mb-2">
            INCUBATION
          </div>

          <div
            ref={incubationCtaRef}
            className="mt-8 max-w-2xl border-t border-[#147DFF]/30 pt-6 space-y-3"
          >
            <h3 className="hero-title text-2xl sm:text-3xl text-[#F2F6FF] tracking-wider">
              TURN YOUR HACK INTO A STARTUP.
            </h3>
            <p className="text-xs sm:text-sm text-[#8CA4C4] leading-relaxed">
              Selected ideas may receive incubation support and funding of up to <strong className="text-[#00D9FF]">₹10,00,000</strong>.
            </p>
            <div className="text-[10px] text-[#00D9FF] tracking-widest uppercase pt-1">
              INCUBATION PROTOCOL // ACTIVE · IDEA → VALIDATION → BUILD → SCALE
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

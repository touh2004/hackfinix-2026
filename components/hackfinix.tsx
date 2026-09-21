'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { ArrowDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BottomNavbar from './navigation/BottomNavbar'
import BootScreen from './boot/BootScreen'
import Hero from './sections/Hero'
import Countdown from './sections/Countdown'
import BountyTerminalSection from './sections/BountyTerminalSection'
import ThemeMatrixSection from './sections/ThemeMatrixSection'
import CoreTeamSection from './sections/CoreTeamSection'
import CustomCursor from './ui/CustomCursor'
import { CoreControlState } from './3d/HackfinixCore'

gsap.registerPlugin(ScrollTrigger)

// Persistent 3D Canvas Scene
const Scene = dynamic(() => import('./3d/Scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 pointer-events-none z-0" />,
})

export default function Hackfinix() {
  const [bootCompleted, setBootCompleted] = useState(false)
  const [coreActivated, setCoreActivated] = useState(false)
  const [telemetryMessage, setTelemetryMessage] = useState('HACKFINIX // CORE INITIALIZING')
  const [heroScrollProgress, setHeroScrollProgress] = useState(0)
  const [pageScrollProgress, setPageScrollProgress] = useState(0)
  const [prizeTransitionProgress, setPrizeTransitionProgress] = useState(0)
  const [activeNodeIndex, setActiveNodeIndex] = useState(0)

  const introTrackRef = useRef<HTMLDivElement>(null)
  const prizeTrackRef = useRef<HTMLDivElement>(null)

  // Core internal animation state
  const [coreControlState, setCoreControlState] = useState<CoreControlState>({
    coreEnergy: 0,
    nucleusScale: 0,
    shellScale: 0,
    shellSeparation: 0,
    ringScale: 0,
    ringSpeed: 0.2,
    particlesScale: 0,
    nodeScale: 0,
    overallScale: 0.1,
    rotationSpeed: 0.2,
  })

  // 1. Boot completed handler -> Core Activation sequence, then PAUSE for scroll
  const handleBootComplete = () => {
    setBootCompleted(true)

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCoreControlState({
        coreEnergy: 1,
        nucleusScale: 1,
        shellScale: 1,
        shellSeparation: 0,
        ringScale: 1,
        ringSpeed: 1,
        particlesScale: 1,
        nodeScale: 1,
        overallScale: 1,
        rotationSpeed: 1,
      })
      setCoreActivated(true)
      setHeroScrollProgress(1)
      return
    }

    const anim = {
      coreEnergy: 0,
      nucleusScale: 0,
      shellScale: 0,
      shellSeparation: 0,
      ringScale: 0,
      ringSpeed: 0.2,
      particlesScale: 0,
      nodeScale: 0,
      overallScale: 0.1,
      rotationSpeed: 0.2,
    }

    const tl = gsap.timeline({
      onUpdate: () => {
        setCoreControlState({ ...anim })
      },
      onComplete: () => {
        setCoreActivated(true)
        setTelemetryMessage('HACKFINIX // CORE ONLINE — 32 NODES SYNCHRONIZED')
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 150)
      },
    })

    // Center nucleus ignition
    tl.to(
      anim,
      {
        nucleusScale: 1.0,
        coreEnergy: 1.5,
        overallScale: 0.85,
        duration: 0.9,
        ease: 'power3.out',
        onStart: () => setTelemetryMessage('HACKFINIX // NUCLEUS IGNITION'),
      },
      0.1
    )

    // Orbital rings deploy
    tl.to(
      anim,
      {
        ringScale: 1.0,
        ringSpeed: 2.0,
        coreEnergy: 1.1,
        duration: 1.0,
        ease: 'back.out(1.4)',
        onStart: () => setTelemetryMessage('HACKFINIX // ORBITAL RINGS ACTIVE'),
      },
      0.8
    )

    // Shell & Particles assemble
    tl.to(
      anim,
      {
        shellScale: 1.0,
        particlesScale: 1.0,
        nodeScale: 1.0,
        overallScale: 1.0,
        duration: 1.0,
        ease: 'power2.out',
        onStart: () => setTelemetryMessage('HACKFINIX // SHELL & PARTICLES DEPLOYED'),
      },
      1.5
    )

    // Stabilize to calm idle state
    tl.to(
      anim,
      {
        coreEnergy: 1.0,
        ringSpeed: 1.0,
        rotationSpeed: 1.0,
        duration: 0.7,
        ease: 'power2.out',
        onStart: () => setTelemetryMessage('HACKFINIX // CORE ONLINE — 32 NODES SYNCHRONIZED'),
      },
      2.5
    )
  }

  // 2. Map Dedicated Intro Scroll Track to Hero & Countdown Synchronization
  useEffect(() => {
    if (!bootCompleted || !introTrackRef.current) return

    const introTrigger = ScrollTrigger.create({
      trigger: introTrackRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.15,
      onUpdate: (self) => {
        setHeroScrollProgress(self.progress)
      },
    })

    // 3. Track Subsequent Sections Scroll (below intro track)
    const pageTrigger = ScrollTrigger.create({
      start: () => introTrackRef.current ? introTrackRef.current.offsetHeight : 0,
      end: 'bottom bottom',
      scrub: 0.2,
      onUpdate: (self) => {
        setPageScrollProgress(self.progress)
      },
    })

    return () => {
      introTrigger.kill()
      pageTrigger.kill()
    }
  }, [bootCompleted])

  return (
    <div className="relative min-h-screen w-full bg-[#020711] text-[#F2F6FF] selection:bg-[#147DFF]/40 selection:text-white overflow-x-hidden" id="top">
      {/* Desktop Cyber Pointer */}
      <CustomCursor />

      {/* Navbars - Rendered only after loading sequence finishes */}
      {bootCompleted && (
        <BottomNavbar />
      )}

      {/* Cyber Initialization Boot Sequence */}
      {!bootCompleted && (
        <BootScreen onComplete={handleBootComplete} />
      )}

      {/* Atmospheric Background Layers */}
      <div
        className="fixed inset-0 pointer-events-none z-0 cyber-grid-bg transition-opacity duration-700"
        style={{ opacity: 0.12 + heroScrollProgress * 0.22 }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 vignette-radial" />
      <div className="scanline-overlay fixed inset-0 z-10 opacity-50 pointer-events-none" />

      {/* Persistent Full-Width 3D WebGL Canvas */}
      <div className="fixed inset-0 pointer-events-none z-[1]">
        <Scene
          heroScrollProgress={heroScrollProgress}
          transitionProgress={heroScrollProgress}
          pageScrollProgress={pageScrollProgress}
          coreControlState={coreControlState}
        />
      </div>

      {/* Subtle Vertical Divider */}
      <div
        className="hidden lg:block fixed top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#147DFF]/25 to-transparent pointer-events-none z-[2]"
        style={{
          left: `${48 - heroScrollProgress * 4}vw`,
          opacity: 0.5 + heroScrollProgress * 0.5,
        }}
      />

      {/* Center Core Telemetry before user scroll */}
      {bootCompleted && heroScrollProgress < 0.35 && (
        <div
          className="fixed top-8 left-8 z-30 pointer-events-none transition-opacity duration-300 font-mono-tech"
          style={{ opacity: 1 - heroScrollProgress * 3 }}
        >
          <div className="inline-flex items-center gap-2 border border-[#147DFF]/25 bg-[#030B18]/80 px-3.5 py-1.5 text-[11px] text-[#8CA4C4] backdrop-blur-md rounded-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2695FF] animate-pulse" />
            <span className="text-[#2695FF] font-bold">STATUS:</span>
            <span>{telemetryMessage}</span>
          </div>
        </div>
      )}

      {/* ==========================================================
          HTML CONTENT LAYER (Sequential Sections in Document Flow)
          ========================================================== */}
      
      {/* 1. DEDICATED SECTIONS FOR INITIAL 3D, HERO & COUNTDOWN (300vh) */}
      <div ref={introTrackRef} className="relative h-[300vh] w-full pointer-events-none z-10">
        
        {/* SECTION 0: INITIAL STAGE — ONLY CENTRED 3D ELEMENT */}
        <div className="h-screen w-full flex items-center justify-center pointer-events-auto relative">
          {/* Centered empty stage for initial 3D display */}
        </div>

        {/* SECTION 1: HERO (HACKFINIX) — RIGHT COLUMN (45% Width) */}
        <div className="h-screen w-full flex items-center pt-14 pointer-events-auto overflow-hidden relative">
          <div className="hidden lg:block lg:w-1/2" />
          <div className="w-full lg:w-1/2 flex items-center justify-end px-6 sm:px-10 lg:pr-[5vw] z-20">
            <div className="w-full lg:w-[45vw] max-w-[680px]">
              <Hero scrollProgress={heroScrollProgress} />
            </div>
          </div>
        </div>

        {/* SECTION 2: COUNTDOWN — LEFT COLUMN (45% Width) */}
        <div className="h-screen w-full flex items-center pt-14 pointer-events-auto overflow-hidden relative">
          <div className="w-full lg:w-1/2 flex items-center justify-start px-6 sm:px-10 lg:pl-[5vw] z-20">
            <div className="w-full lg:w-[45vw] max-w-[680px]">
              <Countdown />
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2" />
        </div>
      </div>

      {/* 2. SUBSEQUENT CONTENT RUNWAY */}
      <main className="relative z-10 w-full pointer-events-auto">
        {/* 3. Dedicated Editorial Bounty Terminal Section */}
        <BountyTerminalSection />

        {/* 4. Dedicated 2D Cyberpunk Theme Matrix Section */}
        <ThemeMatrixSection />

        {/* 5. Dedicated Core Team / Personnel Command Center Section */}
        <CoreTeamSection />
      </main>
    </div>
  )
}

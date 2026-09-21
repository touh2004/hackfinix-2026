'use client'

import { useEffect, useState, useRef } from 'react'
import { ArrowRight, Terminal, Cpu, Activity, Radio, CheckCircle2, Zap } from 'lucide-react'
import gsap from 'gsap'

interface BootScreenProps {
  onComplete: () => void
}

interface TelemetryItem {
  label: string
  status: string
  activePct: number
}

const BOOT_LOGS = [
  '> establishing secure channel [TLS 1.3 // 4096-bit]...',
  '> scanning HackFinix computational arena...',
  '> synchronizing 32 verified satellite nodes...',
  '> loading challenge protocols & zero-knowledge proofs...',
  '> allocating high-priority GPU clusters...',
  '> initializing 3D Digital Reactor Core...',
  '> handshake confirmed // latency: 0.4ms',
]

const SYSTEM_TELEMETRY: TelemetryItem[] = [
  { label: 'CORE', status: 'ONLINE', activePct: 10 },
  { label: 'NETWORK', status: 'STABLE', activePct: 30 },
  { label: 'NODES', status: '32/32', activePct: 50 },
  { label: 'SIGNAL', status: 'LOCKED', activePct: 70 },
  { label: 'SECURITY', status: 'VERIFIED', activePct: 85 },
]

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [logIndex, setLogIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('SYSTEM INITIALIZATION')
  const [isCompleted, setIsCompleted] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const reactorGlowRef = useRef<HTMLDivElement>(null)
  const syncPulseRef = useRef<HTMLDivElement>(null)

  // Check session storage
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hfx_intro_seen')
    if (hasSeenIntro === 'true') {
      onComplete()
      return
    }

    // Paced overall progress animation (~4.5s total loading duration)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsCompleted(true)
          setStatusText('SYSTEM READY // ACCESS GRANTED')
          return 100
        }
        const increment = prev < 20 ? 3 : prev < 50 ? 2 : prev < 80 ? 3 : 2
        return Math.min(100, prev + increment)
      })
    }, 85)

    return () => {
      clearInterval(progressInterval)
    }
  }, [onComplete])

  // Typewriter effect for terminal logs
  useEffect(() => {
    if (logIndex >= BOOT_LOGS.length) return

    const currentFullLine = BOOT_LOGS[logIndex]
    if (currentCharIndex < currentFullLine.length) {
      const typeTimeout = setTimeout(() => {
        setTypedText((prev) => prev + currentFullLine[currentCharIndex])
        setCurrentCharIndex((prev) => prev + 1)
      }, 14)
      return () => clearTimeout(typeTimeout)
    } else {
      const nextLineTimeout = setTimeout(() => {
        if (logIndex < BOOT_LOGS.length - 1) {
          setLogIndex((prev) => prev + 1)
          setTypedText('')
          setCurrentCharIndex(0)
        }
      }, 300)
      return () => clearTimeout(nextLineTimeout)
    }
  }, [logIndex, currentCharIndex])

  // Trigger completion pulse & smooth transition
  useEffect(() => {
    if (isCompleted) {
      const timer = setTimeout(() => {
        handleFinish()
      }, 750)
      return () => clearTimeout(timer)
    }
  }, [isCompleted])

  const handleFinish = () => {
    if (isUnlocking) return
    setIsUnlocking(true)
    sessionStorage.setItem('hfx_intro_seen', 'true')

    if (containerRef.current) {
      const tl = gsap.timeline({
        onComplete: onComplete,
      })

      // 100% Synchronization Pulse Flash
      if (syncPulseRef.current) {
        tl.to(syncPulseRef.current, {
          scale: 3.5,
          opacity: 0.8,
          duration: 0.45,
          ease: 'power2.out',
        }, 0)
      }

      if (reactorGlowRef.current) {
        tl.to(reactorGlowRef.current, {
          scale: 1.8,
          opacity: 1,
          duration: 0.4,
          ease: 'power1.in',
        }, 0)
      }

      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.75,
        ease: 'power3.inOut',
      }, 0.25)
    } else {
      onComplete()
    }
  }

  // Calculate dynamic reactor parameters based on progress (0 -> 100)
  const coreGlowScale = 0.35 + (progress / 100) * 0.65
  const coreGlowOpacity = 0.25 + (progress / 100) * 0.75
  const ringSpeed1 = Math.max(8, 28 - (progress / 100) * 16)
  const stabilityVal = Math.min(100, Math.floor(88 + (progress / 100) * 12))

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#020711]/85 backdrop-blur-[3px] p-3 sm:p-5 h-screen max-h-screen overflow-hidden text-[#F2F6FF] select-none font-mono-tech"
      role="dialog"
      aria-label="HackFinix System Boot Sequence"
    >
      {/* Deep Cyber Background Layers */}
      <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none z-0" />
      <div className="absolute inset-0 vignette-radial pointer-events-none z-0" />
      <div className="scanline-overlay fixed inset-0 z-10 opacity-30 pointer-events-none" />

      {/* Subtle Blueprint Grid Lines */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#147DFF]/15 to-transparent pointer-events-none z-0" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#147DFF]/15 to-transparent pointer-events-none z-0" />

      {/* Floating Micro-Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-[#00D9FF] animate-ping" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full bg-[#147DFF] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-[#00B8D4] animate-pulse-slow" />
      </div>

      {/* Synchronized 100% Pulse Layer */}
      <div
        ref={syncPulseRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.7)_0%,rgba(20,125,255,0.2)_50%,transparent_70%)] opacity-0 pointer-events-none z-30"
      />

      {/* =========================================================================
          1. TOP NAVIGATION / HEADER AREA (COMPACT)
          ========================================================================= */}
      <div className="relative z-20 flex items-center justify-between border-b border-[#147DFF]/30 pb-2 sm:pb-2.5 text-[11px] sm:text-xs text-[#8CA4C4]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF] animate-pulse" />
          <span className="font-extrabold text-[#F2F6FF] tracking-wider">HACKFINIX // BOOT-SEQ.26</span>
          <span className="hidden md:inline-block text-[#567299]">//</span>
          <span className="hidden md:inline-block text-[#00D9FF] text-[9px] sm:text-[10px] tracking-widest uppercase font-bold">
            STATUS: {progress === 100 ? 'AUTHENTICATED' : 'PROVISIONING'}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-5 text-[9px] sm:text-[10px] text-[#567299] tracking-widest uppercase">
          <div className="flex items-center gap-1.5 border border-[#147DFF]/30 bg-[#030E24] px-2 py-0.5 rounded-xs">
            <Radio size={11} className="text-[#00D9FF] animate-pulse" />
            <span>TLS 1.3 // 4096-BIT</span>
          </div>
          <span>LAT 13.0827° N // LONG 80.2707° E</span>
          <span className="text-[#00D9FF] font-bold">LATENCY: 0.4MS</span>
        </div>

        <button
          onClick={handleFinish}
          className="group flex items-center gap-1.5 border border-[#00D9FF]/40 bg-[#03122A]/80 hover:bg-[#00D9FF]/20 text-[#00D9FF] hover:text-[#F2F6FF] px-2.5 py-1 rounded-xs text-[10px] sm:text-[11px] font-bold tracking-widest transition-all duration-300 shadow-[0_0_12px_rgba(0,217,255,0.15)]"
        >
          <span>SKIP INTRO</span>
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* =========================================================================
          2. MAIN INTERFACE: COMPACT REACTOR + TELEMETRY + SIGNAL + TITLES
          ========================================================================= */}
      <div className="relative z-20 my-auto grid grid-cols-1 md:grid-cols-12 items-center gap-3 w-full max-w-6xl mx-auto py-1 sm:py-2">
        {/* -----------------------------------------------------------------------
            LEFT-SIDE SYSTEM TELEMETRY (Compact Panel)
            ----------------------------------------------------------------------- */}
        <div className="hidden md:flex md:col-span-3 flex-col space-y-2 p-2.5 sm:p-3 border-l-2 border-[#147DFF]/40 bg-[#020A1A]/75 backdrop-blur-md rounded-xs">
          <div className="text-[9px] sm:text-[10px] text-[#00D9FF] font-extrabold tracking-widest border-b border-[#147DFF]/20 pb-1.5 uppercase flex items-center gap-1.5">
            <Zap size={11} className="text-[#00D9FF]" />
            SYSTEM TELEMETRY
          </div>

          <div className="space-y-1.5 text-[10px] sm:text-[11px]">
            {SYSTEM_TELEMETRY.map((item) => {
              const isLocked = progress >= item.activePct
              return (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[#8CA4C4] font-mono-tech">{item.label}</span>
                  <span className="text-[#567299]">......</span>
                  <span
                    className={`font-bold transition-colors ${
                      isLocked ? 'text-[#00D9FF]' : 'text-[#567299]'
                    }`}
                  >
                    {isLocked ? item.status : 'SYNCING'}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="pt-1.5 border-t border-[#147DFF]/15 text-[8px] sm:text-[9px] text-[#567299] space-y-0.5">
            <div>GPU CLUSTER: ACTIVE</div>
            <div>SECURITY LEVEL: ZK-PROOF</div>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            CENTER: COMPACT DIGITAL REACTOR CORE + READOUTS + HERO TITLES
            ----------------------------------------------------------------------- */}
        <div className="md:col-span-6 flex flex-col items-center justify-center text-center">
          {/* COMPACT CENTRAL DIGITAL REACTOR CORE (20-30% smaller) */}
          <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-60 lg:h-60 flex items-center justify-center mb-2 sm:mb-3">
            {/* Atmospheric Blue Core Energy Glow */}
            <div
              ref={reactorGlowRef}
              className="absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.35)_0%,rgba(20,125,255,0.18)_45%,transparent_70%)] blur-xl pointer-events-none transition-all duration-300"
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${coreGlowScale})`,
                opacity: coreGlowOpacity,
              }}
            />

            {/* Concentric Ring 1: Outer Orbit Ring */}
            <div
              className="absolute inset-0 rounded-full border border-[#00D9FF]/30 pointer-events-none"
              style={{ animation: `orbit-rotate ${ringSpeed1}s linear infinite` }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_10px_#00D9FF]" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#147DFF] shadow-[0_0_10px_#147DFF]" />
            </div>

            {/* Concentric Ring 2: Segmented Dotted HUD Ring */}
            <div
              className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-[#147DFF]/40 pointer-events-none"
              style={{ animation: `orbit-rotate ${ringSpeed1 * 1.3}s linear infinite reverse` }}
            />

            {/* Concentric Ring 3: Thin Inner Reticle Ring with Cardinal Brackets */}
            <div className="absolute inset-7 sm:inset-9 rounded-full border border-[#00D9FF]/20 pointer-events-none">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00D9FF]" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00D9FF]" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00D9FF]" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00D9FF]" />
            </div>

            {/* Scanning Radar Wave Pulse */}
            <div className="absolute inset-10 sm:inset-12 rounded-full border border-[#00D9FF]/50 animate-ping opacity-25 pointer-events-none" />

            {/* Central Compact Core Sphere */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#00D9FF]/60 bg-[#03122A]/90 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_22px_rgba(0,217,255,0.3)] z-20">
              <Cpu size={20} className="text-[#00D9FF] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] text-[#00D9FF] font-extrabold tracking-widest mt-0.5">
                {progress}%
              </span>
            </div>

            {/* ===================================================================
                FLOATING TELEMETRY READOUTS (Compact Offset Positioning)
                =================================================================== */}
            {progress >= 20 && (
              <>
                {/* Top-Left Telemetry */}
                <div className="absolute -top-1 -left-2 sm:-left-6 z-30 text-[8px] sm:text-[9px] text-[#00D9FF] bg-[#020A1A]/90 px-1.5 py-0.5 border border-[#00D9FF]/30 rounded-xs backdrop-blur-md shadow-[0_0_8px_rgba(0,217,255,0.2)] flex items-center gap-1 transition-opacity duration-500">
                  <span className="h-1 w-1 rounded-full bg-[#00D9FF] animate-pulse" />
                  <span>CORE STABILITY // {stabilityVal}%</span>
                </div>

                {/* Top-Right Telemetry */}
                <div className="absolute -top-1 -right-2 sm:-right-6 z-30 text-[8px] sm:text-[9px] text-[#2695FF] bg-[#020A1A]/90 px-1.5 py-0.5 border border-[#147DFF]/30 rounded-xs backdrop-blur-md shadow-[0_0_8px_rgba(20,125,255,0.2)] flex items-center gap-1 transition-opacity duration-500">
                  <span>NEURAL LINK // ACTIVE</span>
                </div>

                {/* Bottom-Left Telemetry */}
                <div className="absolute -bottom-1 -left-2 sm:-left-6 z-30 text-[8px] sm:text-[9px] text-[#8CA4C4] bg-[#020A1A]/90 px-1.5 py-0.5 border border-[#147DFF]/30 rounded-xs backdrop-blur-md transition-opacity duration-500">
                  <span>NODE SYNC // 32/32</span>
                </div>

                {/* Bottom-Right Telemetry */}
                <div className="absolute -bottom-1 -right-2 sm:-right-6 z-30 text-[8px] sm:text-[9px] text-[#00D9FF] bg-[#020A1A]/90 px-1.5 py-0.5 border border-[#00D9FF]/30 rounded-xs backdrop-blur-md transition-opacity duration-500">
                  <span>GPU CLUSTER // ONLINE</span>
                </div>
              </>
            )}
          </div>

          {/* MAIN BOOT MESSAGE & TITLE (COMPACT SPACING) */}
          <div className="space-y-1 my-1 sm:my-1.5">
            <div className="inline-flex items-center gap-1.5 border border-[#00D9FF]/40 bg-[#020B1C]/90 px-2.5 py-0.5 text-[10px] sm:text-xs text-[#00D9FF] tracking-[0.2em] rounded-xs shadow-[0_0_15px_rgba(0,217,255,0.2)]">
              <Activity size={11} className="text-[#00D9FF] animate-pulse" />
              <span>{statusText}</span>
              <span className="font-extrabold text-[#F2F6FF]">{progress}%</span>
            </div>

            <h1 className="hero-title text-2xl sm:text-3xl lg:text-4xl font-black text-[#F2F6FF] tracking-tight glow-text-white pt-0.5">
              HACKFINIX <span className="bg-gradient-to-r from-[#F2F6FF] via-[#00D9FF] to-[#147DFF] bg-clip-text text-transparent">2026</span>
            </h1>

            <p className="text-[10px] sm:text-xs font-mono-tech text-[#8CA4C4] tracking-[0.2em] uppercase">
              {progress === 100 ? (
                <span className="text-[#00D9FF] font-extrabold flex items-center justify-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#00D9FF]" />
                  SYSTEM READY // ENTER THE ARENA
                </span>
              ) : (
                'ARENA SYSTEMS COMING ONLINE'
              )}
            </p>
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            RIGHT-SIDE DIGITAL SIGNAL PANEL (Compact Panel)
            ----------------------------------------------------------------------- */}
        <div className="hidden md:flex md:col-span-3 flex-col space-y-2 p-2.5 sm:p-3 border-r-2 border-[#147DFF]/40 bg-[#020A1A]/75 backdrop-blur-md rounded-xs text-right">
          <div className="text-[9px] sm:text-[10px] text-[#00D9FF] font-extrabold tracking-widest border-b border-[#147DFF]/20 pb-1.5 uppercase flex items-center justify-end gap-1.5">
            <span>SIGNAL MONITOR</span>
            <Radio size={11} className="text-[#00D9FF] animate-pulse" />
          </div>

          {/* Animated SVG Waveform Visualizer */}
          <div className="w-full h-7 flex items-center justify-center overflow-hidden opacity-80">
            <svg className="w-full h-6" viewBox="0 0 200 40">
              <path
                d="M 0 20 Q 20 5, 40 20 T 80 20 T 120 5 T 160 35 T 200 20"
                fill="none"
                stroke="#00D9FF"
                strokeWidth="1.5"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Vertical Equalizer Signal Bars */}
          <div className="flex items-end justify-end gap-1 h-6 opacity-75">
            {[40, 70, 30, 90, 60, 85, 45, 100, 65].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-[#00D9FF] rounded-t-xs transition-all duration-300"
                style={{ height: `${Math.min(100, (h * (progress + 20)) / 100)}%` }}
              />
            ))}
          </div>

          <div className="pt-1.5 border-t border-[#147DFF]/15 text-[8px] sm:text-[9px] text-[#567299] space-y-0.5">
            <div>PACKETS: 4096 / SEC</div>
            <div>STREAM: ENCRYPTED</div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM AREA: DIAGNOSTIC TELEMETRY (COMPACT & FITTED IN VIEWPORT)
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-3xl mx-auto space-y-2 mb-1">
        {/* Terminal Output Box */}
        <div className="glass-panel p-2 sm:p-2.5 rounded-xs border border-[#147DFF]/30 bg-[#020A1A]/90 backdrop-blur-md text-left font-mono-tech text-[10px] sm:text-[11px] text-[#8CA4C4] shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between border-b border-[#147DFF]/20 pb-1 mb-1 text-[9px] sm:text-[10px] text-[#567299]">
            <span className="flex items-center gap-1.5">
              <Terminal size={11} className="text-[#00D9FF]" />
              DIAGNOSTIC TELEMETRY
            </span>
            <span className="text-[#00D9FF]">HEAP: OPTIMAL</span>
          </div>

          <div className="flex items-center justify-between text-[#00D9FF] font-semibold min-h-[18px] sm:min-h-[20px]">
            <div className="flex items-center gap-1 truncate">
              <span>{typedText}</span>
              <span className="h-3 w-1.5 bg-[#00D9FF] animate-pulse" />
            </div>
            <span className="hidden sm:inline text-[9px] text-[#567299]">PACKET_SECURE</span>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between border-t border-[#147DFF]/30 pt-1.5 text-[9px] sm:text-[10px] text-[#567299]">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span>SYS_STATUS: {progress === 100 ? 'AUTHENTICATED' : 'PROVISIONING'}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>STABILITY: {stabilityVal}%</span>
            <span>NODES: 32 ACTIVE</span>
          </div>
          <span>UNIVERSITY ARENA // 2026</span>
        </div>
      </div>
    </div>
  )
}

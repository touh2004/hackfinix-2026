'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { CoreControlState } from './HackfinixCore'

interface CoreEntranceProps {
  onStateUpdate: (state: CoreControlState) => void
  onComplete?: () => void
  autoStart?: boolean
}

export default function CoreEntrance({
  onStateUpdate,
  onComplete,
  autoStart = true,
}: CoreEntranceProps) {
  const [currentStep, setCurrentStep] = useState<string>('INITIALIZING')
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Internal mutable state driven by GSAP
  const animState = useRef<CoreControlState>({
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

  useEffect(() => {
    if (!autoStart) return

    const tl = gsap.timeline({
      onUpdate: () => {
        onStateUpdate({ ...animState.current })
      },
      onComplete: () => {
        setCurrentStep('CORE ONLINE // ARENA READY')
        if (onComplete) onComplete()
      },
    })

    timelineRef.current = tl

    // Step 1: Center energy point materializes (0.0s -> 0.8s)
    tl.to(
      animState.current,
      {
        nucleusScale: 1.0,
        coreEnergy: 1.5,
        overallScale: 0.85,
        duration: 0.9,
        ease: 'power3.out',
        onStart: () => setCurrentStep('SYSTEM DETECTED // NUCLEUS IGNITION'),
      },
      0.1
    )

    // Step 2: Nucleus settles and rings unfold (0.8s -> 1.8s)
    tl.to(
      animState.current,
      {
        ringScale: 1.0,
        ringSpeed: 2.2,
        coreEnergy: 1.0,
        duration: 1.0,
        ease: 'back.out(1.4)',
        onStart: () => setCurrentStep('ORBITAL RINGS DEPLOYED'),
      },
      0.8
    )

    // Step 3: Engineered Outer Shell Segments Assemble (1.6s -> 2.6s)
    tl.to(
      animState.current,
      {
        shellScale: 1.0,
        overallScale: 1.0,
        duration: 1.0,
        ease: 'power2.out',
        onStart: () => setCurrentStep('GEOMETRIC SHELL ASSEMBLED'),
      },
      1.5
    )

    // Step 4: Particles & Satellite Nodes emerge (2.2s -> 3.2s)
    tl.to(
      animState.current,
      {
        particlesScale: 1.0,
        nodeScale: 1.0,
        duration: 0.9,
        ease: 'power2.out',
        onStart: () => setCurrentStep('DATA PARTICLES & NODES SYNCHRONIZED'),
      },
      2.1
    )

    // Step 5: Energy Pulse & Transition into Stable Idle (3.0s -> 3.8s)
    tl.to(
      animState.current,
      {
        coreEnergy: 1.0,
        ringSpeed: 1.0,
        rotationSpeed: 1.0,
        duration: 0.8,
        ease: 'power2.inOut',
        onStart: () => setCurrentStep('CORE STABILIZED // IDLE ACTIVE'),
      },
      2.9
    )

    return () => {
      tl.kill()
    }
  }, [autoStart, onComplete, onStateUpdate])

  return (
    <div className="absolute top-8 left-8 z-30 font-mono-tech text-xs pointer-events-none">
      <div className="flex items-center gap-2 text-[#8CA4C4] border border-[#147DFF]/25 bg-[#030B18]/80 px-3 py-1.5 rounded-sm backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2695FF] animate-pulse" />
        <span className="text-[#2695FF] font-bold">CORE TELEMETRY:</span>
        <span>{currentStep}</span>
      </div>
    </div>
  )
}

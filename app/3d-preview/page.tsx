'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, RotateCcw, Zap, Eye, Shield, Terminal } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import HackfinixCore, { CoreControlState } from '@/components/3d/HackfinixCore'
import CoreEntrance from '@/components/3d/CoreEntrance'
import WebGLFallback from '@/components/3d/WebGLFallback'

export default function ThreeDPreviewPage() {
  const [controlState, setControlState] = useState<CoreControlState>({
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

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [materializeKey, setMaterializeKey] = useState(0)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [activeTab, setActiveTab] = useState<'materialize' | 'idle' | 'shell_open'>('materialize')

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const restartMaterialization = () => {
    setActiveTab('materialize')
    setMaterializeKey((k) => k + 1)
  }

  const setPreset = (preset: 'idle' | 'shell_open') => {
    setActiveTab(preset)
    if (preset === 'idle') {
      setControlState({
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
    } else if (preset === 'shell_open') {
      setControlState({
        coreEnergy: 1.4,
        nucleusScale: 1.1,
        shellScale: 1,
        shellSeparation: 0.85,
        ringScale: 1.1,
        ringSpeed: 2.2,
        particlesScale: 1.2,
        nodeScale: 1.2,
        overallScale: 1.05,
        rotationSpeed: 1.4,
      })
    }
  }

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#020711] text-[#F2F6FF] select-none font-mono-tech">
      {/* Background Cyber Grid */}
      <div className="cyber-grid-bg fixed inset-0 pointer-events-none opacity-30" />
      <div className="scanline-overlay fixed inset-0 pointer-events-none z-10 opacity-60" />
      <div className="vignette-radial fixed inset-0 pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-30 flex items-center justify-between border-b border-[#147DFF]/20 bg-[#030B18]/70 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#8CA4C4] hover:text-[#2695FF] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO ARENA</span>
          </Link>
          <span className="text-[#567299]">//</span>
          <span className="text-xs font-bold text-[#2695FF]">
            HACKFINIX DIGITAL CORE // 3D LAB
          </span>
        </div>

        {/* Action Preset Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={restartMaterialization}
            className={`flex items-center gap-1.5 border px-3 py-1.5 transition-all ${
              activeTab === 'materialize'
                ? 'border-[#2695FF] bg-[#147DFF]/20 text-[#2695FF]'
                : 'border-[#147DFF]/25 bg-[#061225]/60 text-[#8CA4C4] hover:text-[#F2F6FF]'
            }`}
          >
            <RotateCcw size={13} />
            <span>REPLAY MATERIALIZATION</span>
          </button>

          <button
            onClick={() => setPreset('idle')}
            className={`flex items-center gap-1.5 border px-3 py-1.5 transition-all ${
              activeTab === 'idle'
                ? 'border-[#2695FF] bg-[#147DFF]/20 text-[#2695FF]'
                : 'border-[#147DFF]/25 bg-[#061225]/60 text-[#8CA4C4] hover:text-[#F2F6FF]'
            }`}
          >
            <Zap size={13} />
            <span>IDLE STATE</span>
          </button>

          <button
            onClick={() => setPreset('shell_open')}
            className={`flex items-center gap-1.5 border px-3 py-1.5 transition-all ${
              activeTab === 'shell_open'
                ? 'border-[#2695FF] bg-[#147DFF]/20 text-[#2695FF]'
                : 'border-[#147DFF]/25 bg-[#061225]/60 text-[#8CA4C4] hover:text-[#F2F6FF]'
            }`}
          >
            <Eye size={13} />
            <span>SHELL SEPARATE</span>
          </button>
        </div>
      </header>

      {/* Core Entrance Step Notification */}
      {activeTab === 'materialize' && (
        <CoreEntrance
          key={materializeKey}
          onStateUpdate={(st) => setControlState(st)}
        />
      )}

      {/* 3D Canvas Viewport */}
      <div className="relative h-[calc(100vh-65px)] w-full">
        {hasWebGL ? (
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
          >
            {/* Cinematic Cyber Lighting */}
            <ambientLight intensity={0.25} />
            <directionalLight position={[4, 5, 4]} intensity={0.75} color="#2695FF" />
            <pointLight position={[-3, -2, 2]} intensity={0.4} color="#00B8D4" />
            <pointLight position={[0, 0, 1.5]} intensity={0.8} color="#147DFF" />

            {/* HackFinix Multi-Layer Digital Core */}
            <HackfinixCore
              controlState={controlState}
              mouse={mouse}
              isMobile={false}
            />
          </Canvas>
        ) : (
          <WebGLFallback />
        )}

        {/* Bottom Telemetry HUD */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4 border-t border-[#147DFF]/20 pt-4 text-[11px] text-[#8CA4C4]">
          <div className="flex items-center gap-4">
            <span>NUCLEUS: GLSL_PROCEDURAL_FRESNEL</span>
            <span>SHELL: SEGMENTED_MULTIMESH</span>
            <span>RINGS: 4_AXIS_INDEPENDENT</span>
          </div>

          <div className="flex items-center gap-3 text-[#567299]">
            <span className="text-[#2695FF]">MOUSE PARALLAX: ACTIVE</span>
            <span>//</span>
            <span>TARGET: 60 FPS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

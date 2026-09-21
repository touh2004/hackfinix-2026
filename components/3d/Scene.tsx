'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import HackfinixCore, { CoreControlState } from './HackfinixCore'
import FinixRobot from './FinixRobot'
import CameraRig from './CameraRig'
import WebGLFallback from './WebGLFallback'

interface SceneProps {
  heroScrollProgress?: number
  transitionProgress?: number
  pageScrollProgress?: number
  coreControlState?: Partial<CoreControlState>
  activeNodeIndex?: number
  showRobot?: boolean
}

export default function Scene({
  heroScrollProgress = 0,
  transitionProgress = 0,
  pageScrollProgress = 0,
  coreControlState = {},
  activeNodeIndex = 0,
  showRobot = true,
}: SceneProps) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [deviceTier, setDeviceTier] = useState<'high' | 'medium' | 'low'>('high')
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setHasWebGL(false)
        return
      }
    } catch {
      setHasWebGL(false)
      return
    }

    const evalDevice = () => {
      const width = window.innerWidth
      const isTouch = window.matchMedia('(pointer: coarse)').matches
      const cores = navigator.hardwareConcurrency || 4
      const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4

      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)

      if (width < 768 || isTouch || cores <= 4 || memory <= 4) {
        setDeviceTier('low')
      } else if (width < 1200 || cores <= 6) {
        setDeviceTier('medium')
      } else {
        setDeviceTier('high')
      }
    }

    evalDevice()
    window.addEventListener('resize', evalDevice)

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', evalDevice)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!hasWebGL) {
    return <WebGLFallback />
  }

  const dpr: [number, number] = deviceTier === 'high'
    ? [1, 1.5]
    : deviceTier === 'medium'
    ? [1, 1.2]
    : [1, 1.0]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 44 }}
        dpr={dpr}
        gl={{
          antialias: deviceTier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Camera Rig */}
        <CameraRig
          heroScrollProgress={heroScrollProgress}
          pageScrollProgress={pageScrollProgress}
          mouse={mouse}
          deviceTier={deviceTier}
          isMobile={isMobile}
          isTablet={isTablet}
        />

        {/* High-Contrast Cyberpunk Studio & Backlight Setup for Obsidian Core */}
        <ambientLight intensity={0.22} color="#01071A" />
        {/* Strong Backlight / Rim Light: Directly behind the object */}
        <directionalLight position={[0, 0.5, -4]} intensity={2.8} color="#147DFF" />
        {/* Key Light: Soft blue from upper-left */}
        <directionalLight position={[-3.5, 4, 3]} intensity={1.1} color="#087BFF" />
        {/* Specular Reflector: Crisp silver-white highlight along top edges */}
        <directionalLight position={[2.5, 4.5, 2.5]} intensity={1.4} color="#F0F8FF" />

        {/* Persistent 3D Digital Core */}
        <HackfinixCore
          heroScrollProgress={heroScrollProgress}
          transitionProgress={transitionProgress}
          pageScrollProgress={pageScrollProgress}
          controlState={coreControlState}
          mouse={mouse}
          isMobile={isMobile}
        />


      </Canvas>
    </div>
  )
}

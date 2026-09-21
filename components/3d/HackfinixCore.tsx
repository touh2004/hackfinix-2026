'use client'

import FluidGlassCore from './FluidGlassCore'

export interface CoreControlState {
  coreEnergy: number
  nucleusScale: number
  shellScale: number
  shellSeparation: number
  ringScale: number
  ringSpeed: number
  particlesScale: number
  nodeScale: number
  activeNodes: number
  overallScale: number
  rotationSpeed: number
}

interface HackfinixCoreProps {
  heroScrollProgress?: number
  transitionProgress?: number
  pageScrollProgress?: number
  controlState?: Partial<CoreControlState>
  mouse?: { x: number; y: number }
  isMobile?: boolean
}

/**
 * HackfinixCore (Liquid Glass Energy Core):
 * Directly renders the fluid holographic liquid glass sculpture inspired by the reference image.
 */
export default function HackfinixCore(props: HackfinixCoreProps) {
  return <FluidGlassCore {...props} />
}

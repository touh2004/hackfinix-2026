'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraRigProps {
  heroScrollProgress: number
  pageScrollProgress: number
  mouse: { x: number; y: number }
  deviceTier: 'high' | 'medium' | 'low'
  isMobile: boolean
  isTablet: boolean
}

export default function CameraRig({
  heroScrollProgress = 0,
  pageScrollProgress = 0,
  mouse = { x: 0, y: 0 },
  isMobile = false,
}: CameraRigProps) {
  const { camera } = useThree()

  useFrame((_, delta) => {
    // Camera is fixed at [0, 0, 4.3], looking straight ahead at [0, 0, 0].
    // The HackfinixCore mesh itself physically translates from x = 0 (Center) to x = -1.75 (Left Panel).
    const targetZ = isMobile ? 4.8 : 4.3

    // Gentle desktop mouse parallax
    const mouseParallaxX = isMobile ? 0 : mouse.x * 0.08
    const mouseParallaxY = isMobile ? 0 : mouse.y * 0.06

    camera.position.x = THREE.MathUtils.damp(camera.position.x, mouseParallaxX, 4, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, mouseParallaxY, 4, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta)
    camera.lookAt(0, 0, 0)
  })

  return null
}

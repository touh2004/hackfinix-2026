'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberScannerProps {
  scale?: number
}

// Thin horizontal beam and circular radar sweep passing through the core
export default function CyberScanner({ scale = 1 }: CyberScannerProps) {
  const beamRef = useRef<THREE.Mesh>(null)
  const radarRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Vertical sweep oscillates up and down through the core
    if (beamRef.current) {
      beamRef.current.position.y = Math.sin(t * 1.5) * 1.1
    }

    // Circular radar beam rotates continuously
    if (radarRef.current) {
      radarRef.current.rotation.y = t * 2.0
    }
  })

  return (
    <group scale={[scale, scale, scale]}>
      {/* 1. Horizontal Scanning Laser Plane */}
      <mesh ref={beamRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 2.8]} />
        <meshBasicMaterial
          color="#00C8FF"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 2. Rotating Radar Line */}
      <group ref={radarRef}>
        <mesh position={[0.9, 0, 0]}>
          <boxGeometry args={[1.8, 0.006, 0.006]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  )
}

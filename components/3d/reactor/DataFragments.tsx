'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DataFragmentsProps {
  scale?: number
}

/**
 * 6. DataFragments:
 * Sparingly used, subtle floating geometric telemetry markers.
 * Strictly 4 small corner bracket framing marks to accentuate depth without clutter.
 */
export default function DataFragments({ scale = 1 }: DataFragmentsProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* 4 Framing Corner Brackets */}
      <mesh position={[-1.1, 0.9, 0]}>
        <boxGeometry args={[0.1, 0.01, 0.01]} />
        <meshBasicMaterial color="#147DFF" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-1.1, 0.85, 0]}>
        <boxGeometry args={[0.01, 0.1, 0.01]} />
        <meshBasicMaterial color="#147DFF" transparent opacity={0.6} />
      </mesh>

      <mesh position={[1.1, -0.9, 0]}>
        <boxGeometry args={[0.1, 0.01, 0.01]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} />
      </mesh>
      <mesh position={[1.1, -0.85, 0]}>
        <boxGeometry args={[0.01, 0.1, 0.01]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

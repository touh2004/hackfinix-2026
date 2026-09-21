'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface EnergyCoreProps {
  energy?: number
  scale?: number
}

/**
 * 1. EnergyCore:
 * The pulsing internal power source.
 * A dense crystalline inner octahedron emitting deep electric blue and cyan,
 * wrapped in a secondary translucent geodesic sphere with internal organic breathing.
 */
export default function EnergyCore({ energy = 1, scale = 1 }: EnergyCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowMeshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    // Subtle organic breathing
    const pulse = 1.0 + Math.sin(t * 1.4) * 0.05 * energy

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25
      coreRef.current.rotation.x = Math.sin(t * 0.8) * 0.1
      coreRef.current.scale.set(pulse, pulse, pulse)
    }

    if (glowMeshRef.current) {
      glowMeshRef.current.rotation.y -= delta * 0.15
      glowMeshRef.current.rotation.z += delta * 0.08
    }
  })

  return (
    <group scale={[scale, scale, scale]}>
      {/* Dense energetic core octahedron */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#041226"
          emissive="#147DFF"
          emissiveIntensity={2.8 * energy}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Internal hot glow mesh */}
      <mesh ref={glowMeshRef}>
        <icosahedronGeometry args={[0.48, 2]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={1.4 * energy}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>

      {/* Internal direct point lights */}
      <pointLight color="#00D9FF" intensity={2.5 * energy} distance={3.0} />
      <pointLight color="#147DFF" intensity={3.5 * energy} distance={4.5} />
    </group>
  )
}

'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreBodyProps {
  phase: number
  glowIntensity: number
}

export default function CoreBody({ phase, glowIntensity }: CoreBodyProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const nucleusRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4
      meshRef.current.rotation.x += delta * 0.2
    }
    if (nucleusRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.08 + phase * 0.05
      nucleusRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group>
      {/* Central Metallic Icosahedron Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#061225"
          emissive="#147DFF"
          emissiveIntensity={0.35 + glowIntensity * 0.5}
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Accent Structure */}
      <mesh>
        <octahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial
          color="#2695FF"
          wireframe
          transparent
          opacity={0.3 + glowIntensity * 0.25}
        />
      </mesh>

      {/* Pulsing Energy Nucleus Sphere */}
      <mesh ref={nucleusRef}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial
          color="#00B8D4"
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

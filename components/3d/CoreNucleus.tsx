'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreNucleusProps {
  energy?: number
  scale?: number
}

export default function CoreNucleus({ energy = 1, scale = 1 }: CoreNucleusProps) {
  const innerOctaRef = useRef<THREE.Mesh>(null)
  const outerIcosaRef = useRef<THREE.Mesh>(null)
  const cageRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (innerOctaRef.current) {
      innerOctaRef.current.rotation.x += delta * 0.4
      innerOctaRef.current.rotation.y -= delta * 0.6
    }
    if (outerIcosaRef.current) {
      outerIcosaRef.current.rotation.y += delta * 0.2
      outerIcosaRef.current.rotation.z = Math.sin(t * 1.2) * 0.15
    }
    if (cageRef.current) {
      cageRef.current.rotation.y += delta * 0.25
      cageRef.current.rotation.z += delta * 0.15
    }
  })

  return (
    <group scale={[scale, scale, scale]}>
      {/* 1. Internal dense metallic octahedron emitting intense electric blue */}
      <mesh ref={innerOctaRef}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#061225"
          emissive="#147DFF"
          emissiveIntensity={2.0 * energy}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* 2. Faceted Crystalline Plasma Surface */}
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[0.58, 1]} />
        <meshStandardMaterial
          color="#020914"
          emissive="#00C8FF"
          emissiveIntensity={1.2 * energy}
          roughness={0.2}
          metalness={0.9}
          wireframe={false}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 3. Outer Diamond Cage Shell with wireframe technical edges */}
      <mesh ref={cageRef}>
        <dodecahedronGeometry args={[0.74, 0]} />
        <meshStandardMaterial
          color="#0B5CFF"
          emissive="#00C8FF"
          emissiveIntensity={0.8 * energy}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Internal Core Point Lights */}
      <pointLight color="#00C8FF" intensity={2.4 * energy} distance={4.0} />
      <pointLight color="#147DFF" intensity={1.8 * energy} distance={5.0} position={[0, -0.3, 0]} />
    </group>
  )
}

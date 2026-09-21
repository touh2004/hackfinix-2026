'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreMechanismsProps {
  scale?: number
  speed?: number
}

/**
 * 2. CoreMechanisms:
 * Internal precision engineering: central cylindrical magnetic conduits,
 * vertical structural guide struts, and counter-rotating mechanical gears/rings.
 */
export default function CoreMechanisms({ scale = 1, speed = 1 }: CoreMechanismsProps) {
  const mechGroup = useRef<THREE.Group>(null)
  const collarTopRef = useRef<THREE.Mesh>(null)
  const collarBottomRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!mechGroup.current) return
    mechGroup.current.rotation.y -= delta * 0.12 * speed

    if (collarTopRef.current) {
      collarTopRef.current.rotation.y += delta * 0.3 * speed
    }
    if (collarBottomRef.current) {
      collarBottomRef.current.rotation.y -= delta * 0.3 * speed
    }
  })

  return (
    <group ref={mechGroup} scale={[scale, scale, scale]}>
      {/* Central Translucent Glass Containment Sphere */}
      <mesh>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshPhysicalMaterial
          color="#061A38"
          roughness={0.1}
          metalness={0.1}
          transmission={0.85}
          thickness={0.5}
          transparent
          opacity={0.4}
          ior={1.45}
        />
      </mesh>

      {/* Top Mechanical Collar */}
      <mesh ref={collarTopRef} position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.34, 0.42, 0.08, 12]} />
        <meshStandardMaterial
          color="#0B1320"
          metalness={0.95}
          roughness={0.25}
          emissive="#147DFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Bottom Mechanical Collar */}
      <mesh ref={collarBottomRef} position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.42, 0.34, 0.08, 12]} />
        <meshStandardMaterial
          color="#0B1320"
          metalness={0.95}
          roughness={0.25}
          emissive="#147DFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 4 Precision Vertical Guide Struts */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2
        const x = Math.cos(angle) * 0.58
        const z = Math.sin(angle) * 0.58
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Dark Graphite Strut */}
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 1.15, 8]} />
              <meshStandardMaterial
                color="#030710"
                metalness={0.95}
                roughness={0.2}
              />
            </mesh>
            {/* Subtle illuminated seam */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.012, 0.95, 0.012]} />
              <meshStandardMaterial
                color="#00D9FF"
                emissive="#00D9FF"
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

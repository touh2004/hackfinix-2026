'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreShellProps {
  separation: number // 0.0 (assembled) to 1.0 (fully open/separated)
  scale: number      // 0.0 to 1.0 (assembly progress)
  opacity?: number
}

export default function CoreShell({
  separation = 0,
  scale = 1,
  opacity = 1,
}: CoreShellProps) {
  const topShellGroup = useRef<THREE.Group>(null)
  const bottomShellGroup = useRef<THREE.Group>(null)
  const leftPanelRef = useRef<THREE.Mesh>(null)
  const rightPanelRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    // Continuous subtle counter-rotation
    if (topShellGroup.current) {
      topShellGroup.current.rotation.y += delta * 0.12
      const targetY = 0.15 + separation * 0.65
      topShellGroup.current.position.y = THREE.MathUtils.lerp(topShellGroup.current.position.y, targetY, 0.08)
    }
    if (bottomShellGroup.current) {
      bottomShellGroup.current.rotation.y -= delta * 0.12
      const targetY = -0.15 - separation * 0.65
      bottomShellGroup.current.position.y = THREE.MathUtils.lerp(bottomShellGroup.current.position.y, targetY, 0.08)
    }

    // Side panels slight lateral separation
    if (leftPanelRef.current) {
      const targetX = -0.75 - separation * 0.35
      leftPanelRef.current.position.x = THREE.MathUtils.lerp(leftPanelRef.current.position.x, targetX, 0.08)
    }
    if (rightPanelRef.current) {
      const targetX = 0.75 + separation * 0.35
      rightPanelRef.current.position.x = THREE.MathUtils.lerp(rightPanelRef.current.position.x, targetX, 0.08)
    }
  })

  if (scale <= 0.01) return null

  return (
    <group scale={[scale, scale, scale]}>
      {/* Top Shell Segment */}
      <group ref={topShellGroup} position={[0, 0.15, 0]}>
        {/* Upper Outer Geometric Facet Dome */}
        <mesh>
          <icosahedronGeometry args={[1.18, 1]} />
          <meshStandardMaterial
            color="#081A32"
            emissive="#061225"
            metalness={0.92}
            roughness={0.22}
            wireframe={true}
            transparent
            opacity={0.45 * opacity}
          />
        </mesh>

        {/* Floating Top Angular Armor Bracket */}
        <mesh position={[0, 0.6, 0]}>
          <coneGeometry args={[0.45, 0.35, 4]} />
          <meshStandardMaterial
            color="#061225"
            emissive="#147DFF"
            emissiveIntensity={0.25}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Bottom Shell Segment */}
      <group ref={bottomShellGroup} position={[0, -0.15, 0]}>
        {/* Lower Outer Geometric Facet Dome */}
        <mesh>
          <icosahedronGeometry args={[1.18, 1]} />
          <meshStandardMaterial
            color="#061225"
            emissive="#030B18"
            metalness={0.92}
            roughness={0.22}
            wireframe={true}
            transparent
            opacity={0.45 * opacity}
          />
        </mesh>

        {/* Floating Bottom Angular Armor Bracket */}
        <mesh position={[0, -0.6, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.45, 0.35, 4]} />
          <meshStandardMaterial
            color="#061225"
            emissive="#147DFF"
            emissiveIntensity={0.25}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      </group>

      {/* Left Segmented Panel Plate */}
      <mesh ref={leftPanelRef} position={[-0.75, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[0.08, 0.65, 0.45]} />
        <meshStandardMaterial
          color="#081A32"
          emissive="#147DFF"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>

      {/* Right Segmented Panel Plate */}
      <mesh ref={rightPanelRef} position={[0.75, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[0.08, 0.65, 0.45]} />
        <meshStandardMaterial
          color="#081A32"
          emissive="#147DFF"
          emissiveIntensity={0.15}
          metalness={0.9}
          roughness={0.25}
        />
      </mesh>
    </group>
  )
}

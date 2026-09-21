'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreGeometryProps {
  scale: number
  opacity?: number
}

export default function CoreGeometry({ scale = 1, opacity = 1 }: CoreGeometryProps) {
  const bracketGroup = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (bracketGroup.current) {
      bracketGroup.current.rotation.y -= delta * 0.08
    }
  })

  if (scale <= 0.01) return null

  return (
    <group ref={bracketGroup} scale={[scale, scale, scale]}>
      {/* 4 Corner Bracket Structural Guides */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => {
        const radius = 1.35
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <group key={idx} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            {/* Vertical Bracket Guide Bar */}
            <mesh>
              <boxGeometry args={[0.025, 0.9, 0.025]} />
              <meshStandardMaterial
                color="#061225"
                emissive="#147DFF"
                emissiveIntensity={0.3}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>

            {/* Corner Node */}
            <mesh position={[0, 0.45, 0]}>
              <boxGeometry args={[0.06, 0.06, 0.06]} />
              <meshBasicMaterial color="#2695FF" transparent opacity={0.8 * opacity} />
            </mesh>
            <mesh position={[0, -0.45, 0]}>
              <boxGeometry args={[0.06, 0.06, 0.06]} />
              <meshBasicMaterial color="#2695FF" transparent opacity={0.8 * opacity} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

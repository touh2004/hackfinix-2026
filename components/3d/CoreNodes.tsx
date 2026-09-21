'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreNodesProps {
  activeCount?: number // Default 6 for preview/idle stage, expand to 32 later
  scale?: number
  spread?: number
}

export default function CoreNodes({
  activeCount = 6,
  scale = 1,
  spread = 1,
}: CoreNodesProps) {
  const groupRef = useRef<THREE.Group>(null)

  const nodePositions = useMemo(() => {
    const total = 32
    return Array.from({ length: total }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / total)
      const theta = Math.sqrt(total * Math.PI) * phi
      const baseRadius = 2.4
      return [
        baseRadius * Math.cos(theta) * Math.sin(phi),
        baseRadius * Math.sin(theta) * Math.sin(phi),
        baseRadius * Math.cos(phi),
      ] as [number, number, number]
    })
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
      groupRef.current.rotation.x += delta * 0.04
    }
  })

  if (scale <= 0.01) return null

  // Only render active preview nodes (4-8 nodes) for this phase
  const visibleNodes = nodePositions.slice(0, activeCount)

  return (
    <group ref={groupRef} scale={[scale * spread, scale * spread, scale * spread]}>
      {visibleNodes.map((pos, idx) => (
        <group key={idx} position={pos}>
          {/* Satellite Node Core */}
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#2695FF' : '#00B8D4'} />
          </mesh>

          {/* Wireframe Orbit Cage */}
          <mesh>
            <octahedronGeometry args={[0.08, 0]} />
            <meshBasicMaterial color="#147DFF" wireframe transparent opacity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

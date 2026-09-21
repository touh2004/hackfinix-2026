'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TeamNodesProps {
  visible?: boolean
  activeCount?: number // 0 to 32
  scale?: number
}

/**
 * 5. TeamNodes:
 * Represents the 32 shortlisted hackathon teams.
 * Kept HIDDEN / DORMANT initially on the hero view to ensure the reactor remains
 * a single focused hero machine, ready to be activated during scroll storytelling.
 */
export default function TeamNodes({
  visible = false,
  activeCount = 0,
  scale = 1,
}: TeamNodesProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Fibonacci distributed 32 node constellation
  const nodes = useMemo(() => {
    const list: [number, number, number][] = []
    const count = 32
    const phi = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i
      const r = 1.3 + (i % 3) * 0.15

      list.push([
        Math.cos(theta) * radiusAtY * r,
        y * r,
        Math.sin(theta) * radiusAtY * r,
      ])
    }
    return list
  }, [])

  useFrame((_, delta) => {
    if (!visible || !groupRef.current) return
    groupRef.current.rotation.y += delta * 0.08
  })

  if (!visible || activeCount === 0) return null

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {nodes.slice(0, activeCount).map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh>
            <boxGeometry args={[0.035, 0.035, 0.035]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={2.0}
              metalness={0.9}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

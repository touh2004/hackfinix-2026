'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NetworkNodesProps {
  activeCount?: number // 0 to 32
  scale?: number
}

// 32 Shortlisted Team Nodes forming a distributed cyber network
export default function NetworkNodes({ activeCount = 8, scale = 1 }: NetworkNodesProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Generate 32 mathematically distributed positions around a Fibonacci sphere
  const nodes = useMemo(() => {
    const list: { pos: [number, number, number]; targetRadius: number; phase: number }[] = []
    const count = 32
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2 // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i

      const r = 1.35 + (i % 4) * 0.15
      const x = Math.cos(theta) * radiusAtY * r
      const z = Math.sin(theta) * radiusAtY * r

      list.push({
        pos: [x, y * r, z],
        targetRadius: r,
        phase: i * 0.25,
      })
    }
    return list
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {nodes.map((node, idx) => {
        const isActive = idx < activeCount
        return (
          <group key={idx} position={node.pos}>
            {/* Satellite Node Core */}
            <mesh>
              <boxGeometry args={[0.045, 0.045, 0.045]} />
              <meshStandardMaterial
                color={isActive ? '#00C8FF' : '#0B5CFF'}
                emissive={isActive ? '#00C8FF' : '#041530'}
                emissiveIntensity={isActive ? 2.2 : 0.4}
                metalness={0.9}
              />
            </mesh>

            {/* Subtle Node Wireframe Bracket */}
            {isActive && (
              <mesh>
                <octahedronGeometry args={[0.065, 0]} />
                <meshBasicMaterial color="#147DFF" wireframe transparent opacity={0.5} />
              </mesh>
            )}
          </group>
        )
      })}
    </group>
  )
}

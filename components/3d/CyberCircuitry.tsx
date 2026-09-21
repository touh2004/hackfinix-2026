'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberCircuitryProps {
  scale?: number
}

// 3D 90-degree orthogonal circuit motherboard pathways floating around the core
export default function CyberCircuitry({ scale = 1 }: CyberCircuitryProps) {
  const circuitRef = useRef<THREE.Group>(null)

  // Generate 12 distinct orthogonal 3D circuit traces using Box tubes
  const traces = useMemo(() => {
    const list: { pos: [number, number, number]; size: [number, number, number]; color: string }[] = []
    const count = 10

    for (let i = 0; i < count; i++) {
      const phi = (i / count) * Math.PI * 2
      const r = 1.05 + (i % 3) * 0.18
      const y = (i % 4 - 1.5) * 0.28
      const col = i % 2 === 0 ? '#147DFF' : '#00C8FF'

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      // Segment A: horizontal
      list.push({ pos: [x, y, z], size: [0.35, 0.015, 0.015], color: col })
      // Segment B: vertical 90-degree turn
      list.push({ pos: [x + 0.17, y + 0.15, z], size: [0.015, 0.3, 0.015], color: col })
      // Solder point cube
      list.push({ pos: [x + 0.17, y + 0.3, z], size: [0.04, 0.04, 0.04], color: '#00C8FF' })
    }

    return list
  }, [])

  useFrame((_, delta) => {
    if (circuitRef.current) {
      circuitRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={circuitRef} scale={[scale, scale, scale]}>
      {traces.map((trace, idx) => (
        <mesh key={idx} position={trace.pos}>
          <boxGeometry args={trace.size} />
          <meshStandardMaterial
            color={trace.color}
            emissive={trace.color}
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

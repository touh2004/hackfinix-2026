'use client'

import { useMemo } from 'react'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface CoreParticlesProps {
  count?: number
  speed?: number
  scale?: number
  color?: string
}

export default function CoreParticles({
  count = 90,
  speed = 0.4,
  scale = 3.8,
  color = '#2695FF',
}: CoreParticlesProps) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.2 + Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
    }
    return p
  }, [count])

  return (
    <group>
      {/* Three.js Sparkles for dynamic floating motes */}
      <Sparkles
        count={count}
        scale={scale}
        size={1.4}
        speed={speed}
        color={color}
        opacity={0.65}
      />

      {/* Orbiting Points Cloud */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[points, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00B8D4"
          size={0.018}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

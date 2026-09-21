'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreParticlesFieldProps {
  scale?: number
  count?: number
  speed?: number
  energy?: number
}

/**
 * CoreParticlesField:
 * A controlled, depth-aware cybernetic particle field.
 * Combines:
 * 1. Ambient orbital dust (sparse, blue/cyan motes).
 * 2. Inflowing data particles that travel along spherical streamline vectors into the core.
 */
export default function CoreParticlesField({
  scale = 1,
  count = 45,
  speed = 1,
  energy = 1,
}: CoreParticlesFieldProps) {
  const ambientPointsRef = useRef<THREE.Points>(null)
  const inflowPointsRef = useRef<THREE.Points>(null)

  // 1. Ambient static-cloud positions
  const ambientPositions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 1.4 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = radius * Math.cos(phi)
    }
    return p
  }, [count])

  // 2. Inflowing Streamline Particles (Data Ingestion)
  const inflowCount = 18
  const inflowData = useMemo(() => {
    const data = []
    for (let i = 0; i < inflowCount; i++) {
      data.push({
        radius: 2.2 + Math.random() * 1.2,
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        speed: 0.25 + Math.random() * 0.35,
        offset: Math.random(),
      })
    }
    return data
  }, [inflowCount])

  const inflowPositions = useMemo(() => new Float32Array(inflowCount * 3), [inflowCount])

  useFrame((state, delta) => {
    const s = delta * speed

    // Ambient swirl
    if (ambientPointsRef.current) {
      ambientPointsRef.current.rotation.y += s * 0.04
      ambientPointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }

    // Inflow animation: particles travel toward origin (0,0,0) and respawn at outer shell
    if (inflowPointsRef.current) {
      const positions = inflowPointsRef.current.geometry.attributes.position.array as Float32Array
      const t = state.clock.elapsedTime

      for (let i = 0; i < inflowCount; i++) {
        const item = inflowData[i]
        // Cycle progress 0.0 (outer) to 1.0 (reaches core)
        const progress = ((t * item.speed * 0.25 + item.offset) % 1)
        const currentR = THREE.MathUtils.lerp(item.radius, 0.3, progress)

        positions[i * 3] = currentR * Math.sin(item.phi) * Math.cos(item.theta + progress * 1.2)
        positions[i * 3 + 1] = currentR * Math.sin(item.phi) * Math.sin(item.theta + progress * 1.2)
        positions[i * 3 + 2] = currentR * Math.cos(item.phi)
      }
      inflowPointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group scale={[scale, scale, scale]}>
      {/* 1. Ambient Sparse Orbital Points */}
      <points ref={ambientPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[ambientPositions, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D9FF"
          size={0.022}
          transparent
          opacity={0.55 * energy}
          sizeAttenuation
        />
      </points>

      {/* 2. Inflowing Streamline Processing Points */}
      <points ref={inflowPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[inflowPositions, 3]}
            count={inflowCount}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#F2F6FF"
          size={0.028}
          transparent
          opacity={0.8 * energy}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

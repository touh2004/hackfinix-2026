'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OrbitalTrajectoriesProps {
  speed?: number
  scale?: number
  energy?: number
}

/**
 * OrbitalTrajectories:
 * Exactly 3 ultra-thin, elegant computational trajectories surrounding the core.
 * Features:
 * - Trajectory 1: Primary inclined orbital ring (Radius ~1.28) with traveling photon nodes.
 * - Trajectory 2: Counter-tilted broken telemetry arc (Radius ~1.46) with pulsing data packet.
 * - Trajectory 3: Fine outer measurement trajectory (Radius ~1.65) with radial hash indicators.
 */
export default function OrbitalTrajectories({
  speed = 1,
  scale = 1,
  energy = 1,
}: OrbitalTrajectoriesProps) {
  const group1Ref = useRef<THREE.Group>(null)
  const group2Ref = useRef<THREE.Group>(null)
  const group3Ref = useRef<THREE.Group>(null)

  const node1Ref = useRef<THREE.Group>(null)
  const node2Ref = useRef<THREE.Group>(null)
  const node3Ref = useRef<THREE.Group>(null)

  // Pre-generate precise arc geometries
  const arcGeo1 = useMemo(() => new THREE.RingGeometry(1.45, 1.458, 64, 1, 0, Math.PI * 0.75), [])
  const arcGeo2 = useMemo(() => new THREE.RingGeometry(1.45, 1.458, 64, 1, Math.PI * 0.95, Math.PI * 0.8), [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const s = delta * speed

    // Trajectory 1: Slow equatorial rotation with subtle precession
    if (group1Ref.current) {
      group1Ref.current.rotation.z += s * 0.12
      group1Ref.current.rotation.y = Math.sin(t * 0.2) * 0.15
    }

    // Trajectory 2: Counter-inclined tilt
    if (group2Ref.current) {
      group2Ref.current.rotation.z -= s * 0.16
      group2Ref.current.rotation.x = -0.55 + Math.cos(t * 0.25) * 0.08
    }

    // Trajectory 3: Outer fine resonance
    if (group3Ref.current) {
      group3Ref.current.rotation.z += s * 0.08
      group3Ref.current.rotation.y += s * 0.04
    }

    // Orbiting packet animation along the trajectories
    if (node1Ref.current) {
      const angle1 = t * 0.8 * speed
      node1Ref.current.position.set(Math.cos(angle1) * 1.28, Math.sin(angle1) * 1.28, 0)
    }

    if (node2Ref.current) {
      const angle2 = -t * 0.65 * speed + Math.PI
      node2Ref.current.position.set(Math.cos(angle2) * 1.455, Math.sin(angle2) * 1.455, 0)
    }

    if (node3Ref.current) {
      const angle3 = t * 0.45 * speed + Math.PI * 0.5
      node3Ref.current.position.set(Math.cos(angle3) * 1.65, Math.sin(angle3) * 1.65, 0)
    }
  })

  return (
    <group scale={[scale, scale, scale]}>
      {/* =========================================================
          TRAJECTORY 1: PRIMARY INCLINED ELLIPTICAL RING (R = 1.28)
          ========================================================= */}
      <group ref={group1Ref} rotation={[0.42, 0, 0]}>
        {/* Continuous ultra-thin line */}
        <mesh>
          <torusGeometry args={[1.28, 0.005, 8, 80]} />
          <meshStandardMaterial
            color="#147DFF"
            emissive="#147DFF"
            emissiveIntensity={1.4 * energy}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* 4 Precision Cardinal Hash Ticks */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.28, Math.sin(angle) * 1.28, 0]}>
              <boxGeometry args={[0.035, 0.008, 0.008]} />
              <meshBasicMaterial color="#00D9FF" />
            </mesh>
          )
        })}

        {/* Traveling Photon Node 1 */}
        <group ref={node1Ref}>
          <mesh>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshBasicMaterial color="#F2F6FF" />
          </mesh>
          <pointLight color="#00D9FF" intensity={0.6 * energy} distance={0.8} />
        </group>
      </group>

      {/* =========================================================
          TRAJECTORY 2: COUNTER-TILTED BROKEN TELEMETRY ARCS (R = 1.455)
          ========================================================= */}
      <group ref={group2Ref} rotation={[-0.55, 0.35, 0]}>
        <mesh geometry={arcGeo1}>
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.65 * energy} side={THREE.DoubleSide} />
        </mesh>
        <mesh geometry={arcGeo2}>
          <meshBasicMaterial color="#147DFF" transparent opacity={0.45 * energy} side={THREE.DoubleSide} />
        </mesh>

        {/* Traveling Photon Node 2 */}
        <group ref={node2Ref}>
          <mesh>
            <boxGeometry args={[0.026, 0.026, 0.026]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={2.5 * energy}
            />
          </mesh>
        </group>
      </group>

      {/* =========================================================
          TRAJECTORY 3: OUTER MEASUREMENT GAUGE (R = 1.65)
          ========================================================= */}
      <group ref={group3Ref} rotation={[Math.PI / 3, -0.4, 0.2]}>
        <mesh>
          <torusGeometry args={[1.65, 0.0035, 6, 80]} />
          <meshBasicMaterial color="#0B254E" transparent opacity={0.4} />
        </mesh>

        {/* Traveling Micro Node 3 */}
        <group ref={node3Ref}>
          <mesh>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshBasicMaterial color="#2695FF" />
          </mesh>
        </group>
      </group>
    </group>
  )
}

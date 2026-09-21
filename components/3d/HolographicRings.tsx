'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HolographicRingsProps {
  speed?: number
  scale?: number
}

export default function HolographicRings({ speed = 1, scale = 1 }: HolographicRingsProps) {
  const ring1 = useRef<THREE.Group>(null)
  const ring2 = useRef<THREE.Group>(null)
  const ring3 = useRef<THREE.Group>(null)
  const scannerRing = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const s = delta * speed
    if (ring1.current) ring1.current.rotation.z += s * 0.4
    if (ring2.current) {
      ring2.current.rotation.y -= s * 0.35
      ring2.current.rotation.x += s * 0.15
    }
    if (ring3.current) {
      ring3.current.rotation.x -= s * 0.3
      ring3.current.rotation.z += s * 0.2
    }
    if (scannerRing.current) {
      scannerRing.current.rotation.z -= s * 0.7
    }
  })

  return (
    <group scale={[scale, scale, scale]}>
      {/* 1. Segmented Hexagonal Data Scanner Ring */}
      <group ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.35, 1.38, 6]} />
          <meshBasicMaterial color="#147DFF" wireframe transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
        {/* Metric tick marks on corners */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.37, Math.sin(angle) * 1.37, 0]}>
              <boxGeometry args={[0.06, 0.02, 0.02]} />
              <meshBasicMaterial color="#00C8FF" />
            </mesh>
          )
        })}
      </group>

      {/* 2. Thin Technical Measurement Ring with degree ticks */}
      <group ref={ring2} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[1.55, 0.008, 8, 48]} />
          <meshStandardMaterial
            color="#0B5CFF"
            emissive="#147DFF"
            emissiveIntensity={1.2}
            roughness={0.1}
          />
        </mesh>
        {/* Orbital data telemetry probe */}
        <mesh position={[1.55, 0, 0]}>
          <boxGeometry args={[0.08, 0.04, 0.04]} />
          <meshStandardMaterial color="#00C8FF" emissive="#00C8FF" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* 3. Broken Holographic Ring with 3 distinct arc segments */}
      <group ref={ring3} rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
        <mesh>
          <ringGeometry args={[1.72, 1.74, 32, 1, 0, Math.PI * 0.7]} />
          <meshBasicMaterial color="#00C8FF" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.72, 1.74, 32, 1, Math.PI * 0.9, Math.PI * 0.5]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.72, 1.74, 32, 1, Math.PI * 1.6, Math.PI * 0.3]} />
          <meshBasicMaterial color="#00C8FF" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 4. High-Speed Rotating Radar Ring */}
      <group ref={scannerRing} rotation={[Math.PI / 2.2, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.88, 1.89, 48]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 1.885, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#D9ECFF" />
        </mesh>
      </group>
    </group>
  )
}

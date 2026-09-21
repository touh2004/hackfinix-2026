'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreRingsProps {
  speed?: number
  scale?: number
}

/**
 * 4. CoreRings:
 * Exactly 2-3 elegant, ultra-thin precision orbital rings only.
 * No screen-filling chaotic geometry.
 * Clean, restrained, technical measurement ticks with slow, cinematic rotation.
 */
export default function CoreRings({ speed = 1, scale = 1 }: CoreRingsProps) {
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)
  const ring3Ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const s = delta * speed
    // Ring 1: Slow equatorial rotation
    if (ring1Ref.current) ring1Ref.current.rotation.z += s * 0.18
    // Ring 2: Tilted counter-rotation
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= s * 0.14
      ring2Ref.current.rotation.x += s * 0.08
    }
    // Ring 3: Subtle outer gauge
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= s * 0.1
    }
  })

  return (
    <group scale={[scale, scale, scale]}>
      {/* Ring 1: Primary Thin Emissive Ring with 4 Cardinal Data Markers (Radius 1.25) */}
      <group ref={ring1Ref} rotation={[0.4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.22, 0.006, 8, 64]} />
          <meshStandardMaterial
            color="#147DFF"
            emissive="#147DFF"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        {/* 4 Precision Metric Ticks */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 1.22, Math.sin(angle) * 1.22, 0]}>
              <boxGeometry args={[0.04, 0.015, 0.015]} />
              <meshBasicMaterial color="#00D9FF" />
            </mesh>
          )
        })}
      </group>

      {/* Ring 2: Tilted Broken Segmented Ring (-35 deg tilt, Radius 1.45) */}
      <group ref={ring2Ref} rotation={[-0.6, 0.3, 0]}>
        <mesh>
          <ringGeometry args={[1.42, 1.43, 48, 1, 0, Math.PI * 0.8]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.42, 1.43, 48, 1, Math.PI * 1.1, Math.PI * 0.7]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
        {/* Single micro telemetry node */}
        <mesh position={[1.425, 0, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#D9ECFF" />
        </mesh>
      </group>

      {/* Ring 3: Outer Fine Measurement Ring (Radius 1.62) */}
      <group ref={ring3Ref} rotation={[Math.PI / 3, -0.4, 0]}>
        <mesh>
          <torusGeometry args={[1.6, 0.004, 6, 64]} />
          <meshBasicMaterial color="#0B254E" transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  )
}

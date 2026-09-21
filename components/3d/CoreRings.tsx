'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreRingsProps {
  speed: number     // Multiplier for rotation velocity
  scale: number     // 0.0 to 1.0 (materialization progress)
  opacity?: number
}

export default function CoreRings({
  speed = 1,
  scale = 1,
  opacity = 1,
}: CoreRingsProps) {
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)
  const ring3Ref = useRef<THREE.Group>(null)
  const ring4Ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    const s = delta * speed
    if (ring1Ref.current) ring1Ref.current.rotation.z += s * 0.4
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += s * 0.35
      ring2Ref.current.rotation.y += s * 0.25
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= s * 0.38
      ring3Ref.current.rotation.z += s * 0.2
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.x -= s * 0.45
    }
  })

  if (scale <= 0.01) return null

  return (
    <group scale={[scale, scale, scale]}>
      {/* Ring 01: Equatorial Thin Emissive Ring */}
      <group ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.42, 0.012, 12, 128]} />
          <meshBasicMaterial color="#2695FF" transparent opacity={0.8 * opacity} />
        </mesh>
        {/* Small Data Markers on Ring 01 */}
        <mesh position={[1.42, 0, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshBasicMaterial color="#00B8D4" />
        </mesh>
        <mesh position={[-1.42, 0, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.04]} />
          <meshBasicMaterial color="#00B8D4" />
        </mesh>
      </group>

      {/* Ring 02: Tilted Ring (+35° inclination) */}
      <group ref={ring2Ref} rotation={[Math.PI / 5.2, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[1.72, 0.009, 12, 128]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.65 * opacity} />
        </mesh>
        <mesh position={[0, 1.72, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#2695FF" />
        </mesh>
      </group>

      {/* Ring 03: Counter-tilted Ring (-45° inclination) */}
      <group ref={ring3Ref} rotation={[-Math.PI / 4, -Math.PI / 6, 0.3]}>
        <mesh>
          <torusGeometry args={[1.98, 0.008, 12, 96]} />
          <meshBasicMaterial color="#00B8D4" transparent opacity={0.55 * opacity} />
        </mesh>
        <mesh position={[0, -1.98, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#00B8D4" />
        </mesh>
      </group>

      {/* Ring 04: Segmented Outer Energy Horizon */}
      <group ref={ring4Ref} rotation={[Math.PI / 3, -Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[2.25, 0.006, 8, 64, Math.PI * 1.5]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.4 * opacity} />
        </mesh>
      </group>
    </group>
  )
}

'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberHudProps {
  scale?: number
}

// 3D Geometric annotation markers without external font dependencies
export default function CyberHud({ scale = 1 }: CyberHudProps) {
  const hudGroup = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (hudGroup.current) {
      hudGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15
    }
  })

  return (
    <group ref={hudGroup} scale={[scale, scale, scale]}>
      {/* HUD Marker 1: Top Left Reticle */}
      <group position={[-1.2, 0.9, 0.3]}>
        <mesh>
          <ringGeometry args={[0.08, 0.09, 4]} />
          <meshBasicMaterial color="#00C8FF" wireframe transparent opacity={0.8} />
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <boxGeometry args={[0.18, 0.015, 0.015]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* HUD Marker 2: Bottom Right Telemetry Box */}
      <group position={[1.25, -0.85, 0.3]}>
        <mesh>
          <boxGeometry args={[0.12, 0.04, 0.02]} />
          <meshBasicMaterial color="#147DFF" wireframe transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <boxGeometry args={[0.08, 0.015, 0.015]} />
          <meshBasicMaterial color="#00C8FF" transparent opacity={0.9} />
        </mesh>
      </group>

      {/* HUD Marker 3: Lateral Target Node */}
      <group position={[-1.1, -0.65, -0.2]}>
        <mesh>
          <octahedronGeometry args={[0.06, 0]} />
          <meshBasicMaterial color="#00C8FF" wireframe transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  )
}

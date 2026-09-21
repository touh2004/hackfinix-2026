'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FracturedShellProps {
  separation?: number // 0.0 (closed) to 1.0 (exploded/separated)
  scale?: number
}

// 8 floating angular armor plates around the nucleus with dark metallic surfaces and glowing edges
export default function FracturedShell({ separation = 0, scale = 1 }: FracturedShellProps) {
  const shellGroup = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!shellGroup.current) return
    shellGroup.current.rotation.y -= delta * 0.12
    shellGroup.current.rotation.x += delta * 0.05
  })

  // Offsets for 6 directional fractured plates
  const sep = 1 + separation * 0.85

  return (
    <group ref={shellGroup} scale={[scale, scale, scale]}>
      {/* Plate 1: Top North */}
      <group position={[0, 0.72 * sep, 0.45 * sep]} rotation={[0.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.48, 0.28, 0.06]} />
          <meshStandardMaterial
            color="#040D1E"
            metalness={0.92}
            roughness={0.25}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.48, 0.28, 0.06)]} />
          <lineBasicMaterial color="#147DFF" transparent opacity={0.7} />
        </lineSegments>
      </group>

      {/* Plate 2: Top South */}
      <group position={[0, 0.72 * sep, -0.45 * sep]} rotation={[-0.4, Math.PI, 0]}>
        <mesh>
          <boxGeometry args={[0.48, 0.28, 0.06]} />
          <meshStandardMaterial
            color="#040D1E"
            metalness={0.92}
            roughness={0.25}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.48, 0.28, 0.06)]} />
          <lineBasicMaterial color="#147DFF" transparent opacity={0.7} />
        </lineSegments>
      </group>

      {/* Plate 3: Bottom East */}
      <group position={[0.62 * sep, -0.65 * sep, 0.2 * sep]} rotation={[-0.3, 0.5, -0.4]}>
        <mesh>
          <boxGeometry args={[0.38, 0.38, 0.06]} />
          <meshStandardMaterial
            color="#061225"
            metalness={0.88}
            roughness={0.3}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.38, 0.38, 0.06)]} />
          <lineBasicMaterial color="#00C8FF" transparent opacity={0.8} />
        </lineSegments>
      </group>

      {/* Plate 4: Bottom West */}
      <group position={[-0.62 * sep, -0.65 * sep, 0.2 * sep]} rotation={[-0.3, -0.5, 0.4]}>
        <mesh>
          <boxGeometry args={[0.38, 0.38, 0.06]} />
          <meshStandardMaterial
            color="#061225"
            metalness={0.88}
            roughness={0.3}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.38, 0.38, 0.06)]} />
          <lineBasicMaterial color="#00C8FF" transparent opacity={0.8} />
        </lineSegments>
      </group>

      {/* Plate 5: Lateral Wing Right */}
      <group position={[0.82 * sep, 0.1 * sep, 0]} rotation={[0, 0.3, -0.2]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.36, 0.08, 6]} />
          <meshStandardMaterial
            color="#020914"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.3, 0.36, 0.08, 6)]} />
          <lineBasicMaterial color="#147DFF" transparent opacity={0.9} />
        </lineSegments>
      </group>

      {/* Plate 6: Lateral Wing Left */}
      <group position={[-0.82 * sep, 0.1 * sep, 0]} rotation={[0, -0.3, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.36, 0.08, 6]} />
          <meshStandardMaterial
            color="#020914"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.3, 0.36, 0.08, 6)]} />
          <lineBasicMaterial color="#147DFF" transparent opacity={0.9} />
        </lineSegments>
      </group>
    </group>
  )
}

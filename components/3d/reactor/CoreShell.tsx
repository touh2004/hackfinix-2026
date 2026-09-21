'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CoreShellProps {
  separation?: number // 0.0 (compact/closed) to 1.0 (opened/revealed)
  scale?: number
}

/**
 * 3. CoreShell:
 * Dark graphite / black metallic outer mechanical armor panels.
 * Segmented into 4 precision quadrants (North-East, North-West, South-East, South-West)
 * with sharp beveled edges, dark matte titanium texture, and thin glowing electric-blue seams.
 */
export default function CoreShell({ separation = 0, scale = 1 }: CoreShellProps) {
  const shellGroup = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!shellGroup.current) return
    // Very slow, deliberate mechanical rotation
    shellGroup.current.rotation.y += delta * 0.08
  })

  // Separation multiplier
  const sep = 1 + separation * 0.65

  return (
    <group ref={shellGroup} scale={[scale, scale, scale]}>
      {/* Quadrant 1: Top-Right (NE) */}
      <group position={[0.42 * sep, 0.42 * sep, 0.42 * sep]} rotation={[0.2, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[0.45, 0.45, 0.12]} />
          <meshStandardMaterial
            color="#050C18"
            metalness={0.94}
            roughness={0.28}
          />
        </mesh>
        {/* Subtle glowing seam perimeter */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.45, 0.45, 0.12)]} />
          <lineBasicMaterial color="#147DFF" transparent opacity={0.65} />
        </lineSegments>
      </group>

      {/* Quadrant 2: Top-Left (NW) */}
      <group position={[-0.42 * sep, 0.42 * sep, -0.42 * sep]} rotation={[0.2, -0.4, 0]}>
        <mesh>
          <boxGeometry args={[0.45, 0.45, 0.12]} />
          <meshStandardMaterial
            color="#050C18"
            metalness={0.94}
            roughness={0.28}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.45, 0.45, 0.12)]} />
          <lineBasicMaterial color="#147DFF" transparent opacity={0.65} />
        </lineSegments>
      </group>

      {/* Quadrant 3: Bottom-Right (SE) */}
      <group position={[0.42 * sep, -0.42 * sep, -0.42 * sep]} rotation={[-0.2, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[0.45, 0.45, 0.12]} />
          <meshStandardMaterial
            color="#050C18"
            metalness={0.94}
            roughness={0.28}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.45, 0.45, 0.12)]} />
          <lineBasicMaterial color="#00D9FF" transparent opacity={0.65} />
        </lineSegments>
      </group>

      {/* Quadrant 4: Bottom-Left (SW) */}
      <group position={[-0.42 * sep, -0.42 * sep, 0.42 * sep]} rotation={[-0.2, -0.4, 0]}>
        <mesh>
          <boxGeometry args={[0.45, 0.45, 0.12]} />
          <meshStandardMaterial
            color="#050C18"
            metalness={0.94}
            roughness={0.28}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.45, 0.45, 0.12)]} />
          <lineBasicMaterial color="#00D9FF" transparent opacity={0.65} />
        </lineSegments>
      </group>

      {/* Equatorial Hexagonal Armor Belt */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.82 * sep, 0.82 * sep, 0.14, 6]} />
        <meshStandardMaterial
          color="#02060F"
          metalness={0.96}
          roughness={0.22}
          wireframe
        />
      </mesh>
    </group>
  )
}

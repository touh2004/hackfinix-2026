'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface FinixRobotProps {
  position?: [number, number, number]
  scale?: number
  mouse?: { x: number; y: number }
}

/**
 * FINIX Robot: Stylized 3D AI companion mascot.
 * Architected to be easily swappable with a future `.glb` / `.gltf` asset model.
 */
export default function FinixRobot({
  position = [1.8, -0.6, 0],
  scale = 0.55,
  mouse = { x: 0, y: 0 },
}: FinixRobotProps) {
  const robotGroup = useRef<THREE.Group>(null)
  const headMesh = useRef<THREE.Mesh>(null)
  const eyeMesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (robotGroup.current) {
      // Gentle mouse look-at interpolation
      robotGroup.current.rotation.y = THREE.MathUtils.lerp(
        robotGroup.current.rotation.y,
        mouse.x * 0.4,
        0.05
      )
      robotGroup.current.rotation.x = THREE.MathUtils.lerp(
        robotGroup.current.rotation.x,
        -mouse.y * 0.3,
        0.05
      )
    }

    if (eyeMesh.current) {
      // Eye visor subtle pulse
      const eyeIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2
      ;(eyeMesh.current.material as THREE.MeshBasicMaterial).opacity = eyeIntensity
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={robotGroup} position={position} scale={scale}>
        {/* Robot Torso / Chassis */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.7, 0.8, 0.5]} />
          <meshStandardMaterial
            color="#061225"
            metalness={0.9}
            roughness={0.2}
            emissive="#081A32"
          />
        </mesh>

        {/* Chassis Armor Plates */}
        <mesh position={[0, 0, 0.26]}>
          <planeGeometry args={[0.55, 0.65]} />
          <meshBasicMaterial color="#147DFF" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Robot Head */}
        <mesh ref={headMesh} position={[0, 0.65, 0]}>
          <boxGeometry args={[0.55, 0.45, 0.45]} />
          <meshStandardMaterial
            color="#081A32"
            metalness={0.85}
            roughness={0.15}
            emissive="#030B18"
          />
        </mesh>

        {/* Cyber Visor / Eye */}
        <mesh ref={eyeMesh} position={[0, 0.65, 0.23]}>
          <planeGeometry args={[0.42, 0.14]} />
          <meshBasicMaterial color="#00B8D4" transparent opacity={0.9} />
        </mesh>

        {/* Antenna / Communication Spike */}
        <mesh position={[0.2, 0.95, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 8]} />
          <meshBasicMaterial color="#2695FF" />
        </mesh>
        <mesh position={[0.2, 1.1, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#00B8D4" />
        </mesh>

        {/* Floating Thruster Rings */}
        <mesh position={[0, -0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.02, 8, 32]} />
          <meshBasicMaterial color="#147DFF" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  )
}

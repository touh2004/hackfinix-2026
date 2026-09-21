'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { energyCoreVertexShader, energyCoreFragmentShader } from './shaders/energyCoreShader'

interface CoreEnergyProps {
  energy: number // 0.0 to 1.0 (controls pulse & shader intensity)
  scale: number  // Overall scale during materialization
}

export default function CoreEnergy({ energy = 1, scale = 1 }: CoreEnergyProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerNucleusRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 1.0 },
      uDistortion: { value: 0.35 },
      uColorA: { value: new THREE.Color('#147DFF') },
      uColorB: { value: new THREE.Color('#00B8D4') },
      uBaseColor: { value: new THREE.Color('#020711') },
    }),
    []
  )

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uIntensity.value = energy * (0.8 + Math.sin(state.clock.elapsedTime * 2.5) * 0.25)
      materialRef.current.uniforms.uDistortion.value = 0.2 + energy * 0.35
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.35
      meshRef.current.rotation.z += delta * 0.18
      const breath = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.035
      meshRef.current.scale.set(scale * breath, scale * breath, scale * breath)
    }

    if (innerNucleusRef.current) {
      innerNucleusRef.current.rotation.y -= delta * 0.6
      const innerBreath = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.06
      innerNucleusRef.current.scale.set(scale * innerBreath, scale * innerBreath, scale * innerBreath)
    }
  })

  return (
    <group>
      {/* Outer Procedural Energy Shader Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.62, 3]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={energyCoreVertexShader}
          fragmentShader={energyCoreFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={true}
        />
      </mesh>

      {/* Inner Dense Emissive Octahedron Nucleus */}
      <mesh ref={innerNucleusRef}>
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#061225"
          emissive="#2695FF"
          emissiveIntensity={0.6 * energy}
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>

      {/* Internal Point Light emitted by the Nucleus */}
      <pointLight
        color="#147DFF"
        intensity={1.2 * energy}
        distance={6}
        decay={2}
      />
      <pointLight
        color="#00B8D4"
        intensity={0.6 * energy}
        distance={4}
        decay={2}
      />
    </group>
  )
}

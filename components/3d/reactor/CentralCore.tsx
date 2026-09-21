'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CentralCoreProps {
  energy?: number
  scale?: number
  separation?: number
  speed?: number
}

/**
 * CentralCore:
 * The single sophisticated holographic energy core of HackFinix.
 * Architecture:
 * 1. Inner Energy Nucleus: Faceted crystalline core with pulsating dual-frequency point lights.
 * 2. Crystalline Resonance Body: Translucent icosahedral glass volume with internal refractions.
 * 3. Precision Cybernetic Lattice: Ultra-thin graphite/titanium geometric structural cage with cyan energy channels.
 * 4. Outer Aerodynamic Glass Shell: Faceted protective containment shell with subtle edge glow.
 */
export default function CentralCore({
  energy = 1,
  scale = 1,
  separation = 0,
  speed = 1,
}: CentralCoreProps) {
  const nucleusRef = useRef<THREE.Mesh>(null)
  const nucleusInnerRef = useRef<THREE.Mesh>(null)
  const crystalMidRef = useRef<THREE.Mesh>(null)
  const latticeGroupRef = useRef<THREE.Group>(null)
  const outerGlassRef = useRef<THREE.Mesh>(null)
  const outerLinesRef = useRef<THREE.LineSegments>(null)
  const internalSparksRef = useRef<THREE.Points>(null)

  // Internal micro energy sparks orbiting inside the crystal nucleus
  const internalSparkPositions = useMemo(() => {
    const count = 28
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 0.18 + Math.random() * 0.22
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
    }
    return pos
  }, [])

  // Geometries for clean edge highlights
  const outerEdgeGeo = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.86, 0))
  }, [])

  const latticeEdgeGeo = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.72, 0))
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const s = delta * speed

    // 1. Slow, synchronized breathing pulse of the energy nucleus
    const breath = 1.0 + Math.sin(t * 1.6) * 0.06 * energy
    const fastPulse = 1.0 + Math.sin(t * 3.2) * 0.03 * energy

    if (nucleusRef.current) {
      nucleusRef.current.scale.set(breath, breath, breath)
      nucleusRef.current.rotation.y += s * 0.22
      nucleusRef.current.rotation.z += s * 0.12
    }

    if (nucleusInnerRef.current) {
      nucleusInnerRef.current.scale.set(fastPulse, fastPulse, fastPulse)
      nucleusInnerRef.current.rotation.x -= s * 0.35
      nucleusInnerRef.current.rotation.y -= s * 0.18
    }

    // 2. Mid crystalline refraction layer (counter-rotation)
    if (crystalMidRef.current) {
      crystalMidRef.current.rotation.y -= s * 0.14
      crystalMidRef.current.rotation.x = Math.sin(t * 0.5) * 0.08
    }

    // 3. Structural cybernetic lattice
    if (latticeGroupRef.current) {
      latticeGroupRef.current.rotation.y += s * 0.09
      latticeGroupRef.current.rotation.z = Math.cos(t * 0.4) * 0.06
    }

    // 4. Outer glass shell
    if (outerGlassRef.current) {
      outerGlassRef.current.rotation.y -= s * 0.05
      outerGlassRef.current.rotation.x = Math.sin(t * 0.3) * 0.04
    }
    if (outerLinesRef.current) {
      outerLinesRef.current.rotation.y = outerGlassRef.current?.rotation.y || 0
      outerLinesRef.current.rotation.x = outerGlassRef.current?.rotation.x || 0
    }

    // 5. Internal energy sparks swirl
    if (internalSparksRef.current) {
      internalSparksRef.current.rotation.y += s * 0.45
      internalSparksRef.current.rotation.x += s * 0.25
    }
  })

  // Separation offset factor during scroll transitions
  const sepFactor = 1.0 + separation * 0.4

  return (
    <group scale={[scale * sepFactor, scale * sepFactor, scale * sepFactor]}>
      {/* =========================================================
          LAYER 1: CENTRAL ENERGY NUCLEUS
          ========================================================= */}
      {/* Dense innermost energy star */}
      <mesh ref={nucleusInnerRef}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#00D9FF" />
      </mesh>

      {/* Pulsing crystalline energy nucleus */}
      <mesh ref={nucleusRef}>
        <dodecahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color="#041838"
          emissive="#147DFF"
          emissiveIntensity={3.2 * energy}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>

      {/* Internal Micro Light Sparks */}
      <points ref={internalSparksRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[internalSparkPositions, 3]}
            count={internalSparkPositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00D9FF"
          size={0.024}
          transparent
          opacity={0.85 * energy}
          sizeAttenuation
        />
      </points>

      {/* Dual Internal Energy Point Lights */}
      <pointLight color="#00D9FF" intensity={2.8 * energy} distance={3.5} decay={2} />
      <pointLight color="#147DFF" intensity={3.8 * energy} distance={5.0} decay={2} />

      {/* =========================================================
          LAYER 2: CRYSTALLINE RESONANCE BODY
          ========================================================= */}
      <mesh ref={crystalMidRef}>
        <icosahedronGeometry args={[0.54, 0]} />
        <meshPhysicalMaterial
          color="#061836"
          emissive="#147DFF"
          emissiveIntensity={0.6 * energy}
          roughness={0.08}
          metalness={0.2}
          transmission={0.88}
          thickness={0.65}
          ior={1.48}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* =========================================================
          LAYER 3: PRECISION CYBERNETIC LATTICE (CAGE)
          ========================================================= */}
      <group ref={latticeGroupRef}>
        {/* Sleek Octahedral Exoskeleton Wireframe */}
        <lineSegments geometry={latticeEdgeGeo}>
          <lineBasicMaterial color="#00D9FF" transparent opacity={0.75 * energy} linewidth={1.5} />
        </lineSegments>

        {/* Equatorial Precision Measurement Collar */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.73, 0.012, 8, 32]} />
          <meshStandardMaterial
            color="#040C1A"
            emissive="#147DFF"
            emissiveIntensity={0.8 * energy}
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>

        {/* 6 Precision Node Mounts at the Octahedron Vertices */}
        {[
          [0.72, 0, 0],
          [-0.72, 0, 0],
          [0, 0.72, 0],
          [0, -0.72, 0],
          [0, 0, 0.72],
          [0, 0, -0.72],
        ].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            <mesh>
              <sphereGeometry args={[0.028, 12, 12]} />
              <meshStandardMaterial
                color="#030814"
                emissive="#00D9FF"
                emissiveIntensity={1.8 * energy}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================
          LAYER 4: OUTER TRANSLUCENT FACETED GLASS SHELL
          ========================================================= */}
      {/* Outer Multi-Faceted Glass Vessel */}
      <mesh ref={outerGlassRef}>
        <icosahedronGeometry args={[0.86, 0]} />
        <meshPhysicalMaterial
          color="#020918"
          roughness={0.06}
          metalness={0.1}
          transmission={0.92}
          thickness={0.4}
          ior={1.42}
          transparent
          opacity={0.4}
          reflectivity={0.9}
        />
      </mesh>

      {/* Outer Precision Cyan Rim Highlights */}
      <lineSegments ref={outerLinesRef} geometry={outerEdgeGeo}>
        <lineBasicMaterial color="#2695FF" transparent opacity={0.38} />
      </lineSegments>
    </group>
  )
}

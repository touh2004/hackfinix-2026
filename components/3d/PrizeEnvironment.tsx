'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface PrizeEnvironmentProps {
  scrollProgress: number // 0.0 to 1.0 (Scrubbed by GSAP ScrollTrigger for Prize Pool track)
  isMobile?: boolean
  mouse?: { x: number; y: number }
}

/**
 * PrizeEnvironment (WebGL 3D Interactive Layer for Prize Pool):
 *
 * 1. Small Holographic Reward Modules & Data Tokens (Phase 0 - 4: 0% - 64%)
 * 2. Particle Disintegration & Implosion (Phase 5 - 6: 64% - 78%)
 * 3. GIGANTIC Incubation Facility & Hyper-Scale Energy Chamber (Phase 7 - 10: 78% - 100%)
 *    - Pulls back camera perspective visually by scaling giant architectural rings, digital pillars,
 *      and laser energy matrix spanning the entire world.
 */
export default function PrizeEnvironment({
  scrollProgress = 0,
  isMobile = false,
  mouse = { x: 0, y: 0 },
}: PrizeEnvironmentProps) {
  const groupRef = useRef<THREE.Group>(null)
  const incubationGroupRef = useRef<THREE.Group>(null)
  const giantRing1Ref = useRef<THREE.Group>(null)
  const giantRing2Ref = useRef<THREE.Group>(null)
  const giantRing3Ref = useRef<THREE.Group>(null)
  const chamberCoreRef = useRef<THREE.Mesh>(null)

  // Floating Cyber Crypto Tokens (Phase 0 - 4)
  const tokens = useMemo(() => {
    const list: { pos: [number, number, number]; rot: [number, number, number]; scale: number }[] = []
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const radius = 0.8 + (i % 2) * 0.25
      const y = ((i - 4) / 4) * 0.6
      list.push({
        pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.08,
      })
    }
    return list
  }, [])

  // Giant Incubation Matrix Data Particles (Phase 7 - 10)
  const incubationParticles = useMemo(() => {
    const count = isMobile ? 60 : 180
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 0.5 + Math.random() * 3.5
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4.0
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    return positions
  }, [isMobile])

  // =========================================================================
  // SCROLL-DRIVEN STATE CALCULATIONS
  // =========================================================================
  // Phase 0-4 (0% to 64%): Small Bounty Module Phase
  const bountyPhaseActive = scrollProgress < 0.72
  let bountyOpacity = 0
  if (scrollProgress >= 0.05 && scrollProgress <= 0.64) {
    bountyOpacity = Math.min(1, (scrollProgress - 0.05) / 0.12)
  } else if (scrollProgress > 0.64 && scrollProgress <= 0.72) {
    bountyOpacity = 1 - (scrollProgress - 0.64) / 0.08
  }

  // Phase 7-10 (78% to 100%): GIGANTIC INCUBATION REVEAL
  const incubationPhaseActive = scrollProgress >= 0.78
  let incubationProgress = 0
  if (incubationPhaseActive) {
    incubationProgress = Math.min(1, (scrollProgress - 0.78) / 0.18)
  }

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Giant Incubation Rings Rotation (Opposing slow cinematic orbits)
    if (giantRing1Ref.current) {
      giantRing1Ref.current.rotation.z += delta * 0.25
      giantRing1Ref.current.rotation.y += delta * 0.1
    }
    if (giantRing2Ref.current) {
      giantRing2Ref.current.rotation.z -= delta * 0.2
      giantRing2Ref.current.rotation.x = Math.sin(t * 0.7) * 0.2
    }
    if (giantRing3Ref.current) {
      giantRing3Ref.current.rotation.z += delta * 0.15
      giantRing3Ref.current.rotation.y -= delta * 0.12
    }

    // Central Incubation Quantum Core Pulsing
    if (chamberCoreRef.current) {
      chamberCoreRef.current.rotation.y += delta * 0.8
      chamberCoreRef.current.rotation.x = Math.sin(t * 1.8) * 0.2
      const pulse = 1.0 + Math.sin(t * 4.0) * 0.12 * incubationProgress
      chamberCoreRef.current.scale.set(pulse, pulse, pulse)
    }

    // Mouse Parallax
    if (groupRef.current && !isMobile) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.05,
        0.04
      )
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouse.x * 0.05,
        0.04
      )
    }
  })

  // If outside active prize sequence, render nothing
  if (scrollProgress <= 0.02 && !bountyPhaseActive && !incubationPhaseActive) {
    return null
  }

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* =========================================================================
          STAGE A: INITIAL BOUNTY VAULT 3D TOKENS (0% - 64%)
          ========================================================================= */}
      {bountyPhaseActive && bountyOpacity > 0.01 && (
        <group position={[isMobile ? 0 : 1.75, 0, 0]} scale={[bountyOpacity * 0.75, bountyOpacity * 0.75, bountyOpacity * 0.75]}>
          <Float speed={1.1} rotationIntensity={0.03} floatIntensity={0.06}>
            {/* Holographic Vault Core */}
            <mesh>
              <octahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial
                color="#020814"
                emissive="#00D9FF"
                emissiveIntensity={2.5 * bountyOpacity}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
            {/* Quantum Cage */}
            <mesh>
              <icosahedronGeometry args={[0.55, 1]} />
              <meshStandardMaterial
                color="#147DFF"
                emissive="#147DFF"
                emissiveIntensity={1.5 * bountyOpacity}
                wireframe
                transparent
                opacity={0.4 * bountyOpacity}
              />
            </mesh>
            {/* Orbiting Crypto Tokens */}
            {tokens.map((tok, idx) => (
              <mesh key={idx} position={tok.pos} rotation={tok.rot} scale={[tok.scale, tok.scale, tok.scale]}>
                <cylinderGeometry args={[1, 1, 0.25, 8]} />
                <meshStandardMaterial
                  color="#00D9FF"
                  emissive="#00D9FF"
                  emissiveIntensity={1.8 * bountyOpacity}
                  metalness={0.95}
                />
              </mesh>
            ))}
          </Float>
        </group>
      )}

      {/* =========================================================================
          STAGE B: GIGANTIC INCUBATION CHAMBER & ARCHITECTURAL STRUCTURE (78% - 100%)
          ========================================================================= */}
      {incubationPhaseActive && incubationProgress > 0.01 && (
        <group
          ref={incubationGroupRef}
          position={[0, 0, -0.5]}
          scale={[
            (0.4 + incubationProgress * 0.8) * (isMobile ? 0.7 : 1.0),
            (0.4 + incubationProgress * 0.8) * (isMobile ? 0.7 : 1.0),
            (0.4 + incubationProgress * 0.8) * (isMobile ? 0.7 : 1.0),
          ]}
        >
          {/* Volumetric Center Lighting */}
          <pointLight color="#00D9FF" intensity={6.0 * incubationProgress} distance={7.0} />
          <pointLight color="#147DFF" intensity={8.0 * incubationProgress} distance={9.0} />

          {/* Central Incubation Hyper-Core */}
          <mesh ref={chamberCoreRef}>
            <octahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color="#010612"
              emissive="#00D9FF"
              emissiveIntensity={4.5 * incubationProgress}
              roughness={0.1}
              metalness={0.98}
            />
          </mesh>

          {/* Inner Incubation Containment Shell */}
          <mesh>
            <dodecahedronGeometry args={[0.95, 0]} />
            <meshStandardMaterial
              color="#147DFF"
              emissive="#147DFF"
              emissiveIntensity={2.2 * incubationProgress}
              wireframe
              transparent
              opacity={0.45 * incubationProgress}
            />
          </mesh>

          {/* 8 Giant Structural Computational Energy Pillars */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2
            const r = 2.4
            return (
              <group key={i} position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}>
                {/* Dark Monolith Pillar */}
                <mesh>
                  <boxGeometry args={[0.12, 3.8, 0.12]} />
                  <meshStandardMaterial color="#020610" metalness={0.96} roughness={0.2} />
                </mesh>
                {/* Glowing Core Energy Seam */}
                <mesh>
                  <boxGeometry args={[0.04, 3.6, 0.04]} />
                  <meshStandardMaterial
                    color="#00D9FF"
                    emissive="#00D9FF"
                    emissiveIntensity={2.8 * incubationProgress}
                  />
                </mesh>
              </group>
            )
          })}

          {/* Giant Equatorial Mega-Ring 1 (Radius: 2.8) */}
          <group ref={giantRing1Ref} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <torusGeometry args={[2.75, 0.015, 12, 64]} />
              <meshStandardMaterial
                color="#00D9FF"
                emissive="#00D9FF"
                emissiveIntensity={2.5 * incubationProgress}
                roughness={0.2}
                metalness={0.9}
              />
            </mesh>
            {/* 12 Cardinal HUD Data Markers */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
              const angle = (i / 12) * Math.PI * 2
              return (
                <mesh key={i} position={[Math.cos(angle) * 2.75, Math.sin(angle) * 2.75, 0]}>
                  <boxGeometry args={[0.1, 0.03, 0.03]} />
                  <meshBasicMaterial color="#F2F6FF" transparent opacity={0.8 * incubationProgress} />
                </mesh>
              )
            })}
          </group>

          {/* Giant Tilted Mega-Ring 2 (Radius: 3.2) */}
          <group ref={giantRing2Ref} rotation={[0.6, 0.4, 0]}>
            <mesh>
              <torusGeometry args={[3.2, 0.012, 8, 64]} />
              <meshStandardMaterial
                color="#147DFF"
                emissive="#147DFF"
                emissiveIntensity={2.0 * incubationProgress}
                roughness={0.2}
                metalness={0.85}
              />
            </mesh>
          </group>

          {/* Giant Outer Boundary Laser Grid Ring 3 (Radius: 3.6) */}
          <group ref={giantRing3Ref} rotation={[-0.5, -0.3, 0]}>
            <mesh>
              <torusGeometry args={[3.6, 0.008, 6, 64]} />
              <meshBasicMaterial color="#00D9FF" transparent opacity={0.55 * incubationProgress} />
            </mesh>
          </group>

          {/* High-Density Atmospheric Incubation Particles */}
          <points>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={incubationParticles.length / 3}
                array={incubationParticles}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={isMobile ? 0.035 : 0.055}
              color="#00D9FF"
              transparent
              opacity={0.75 * incubationProgress}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>
        </group>
      )}
    </group>
  )
}

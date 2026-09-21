'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import * as THREE from 'three'

interface PrizeVaultProps {
  progress?: number // 0.0 to 1.0 (0: fully hidden/unmaterialized, 1: fully unlocked & visible)
  isMobile?: boolean
  mouse?: { x: number; y: number }
}

/**
 * PrizeVault:
 * Futuristic Holographic Reward Chamber / Prize Core.
 *
 * Features:
 * 1. Large transparent holographic cylindrical chamber with glowing top/bottom laser rings
 * 2. Central octahedron/diamond energy core with multi-layer glowing quantum cage
 * 3. Metallic floating reward tokens / digital coins / gold-cyan cyber ingots orbiting within the chamber
 * 4. Laser scanning vertical lines & horizontal scan rings
 * 5. Floating holographic numeric data: "₹3,00,000+", "32 TEAMS", "36 HOURS", "BOUNTY PROTOCOL"
 * 6. Orbiting holographic HUD data panels
 * 7. Ambient golden-cyan cyber particles & digital dust
 */
export default function PrizeVault({
  progress = 0,
  isMobile = false,
  mouse = { x: 0, y: 0 },
}: PrizeVaultProps) {
  const vaultGroup = useRef<THREE.Group>(null)
  const scannerRef = useRef<THREE.Mesh>(null)
  const tokensGroup = useRef<THREE.Group>(null)
  const hudRing1Ref = useRef<THREE.Group>(null)
  const hudRing2Ref = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  // Floating Cyber Tokens (12 metallic golden/cyan crypto chips & reward nodes)
  const tokens = useMemo(() => {
    const list: { pos: [number, number, number]; rot: [number, number, number]; scale: number }[] = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 0.55 + (i % 3) * 0.18
      const y = ((i - 6) / 6) * 0.7
      list.push({
        pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.08 + (i % 3) * 0.03,
      })
    }
    return list
  }, [])

  // Floating Dust Particles
  const particles = useMemo(() => {
    const count = isMobile ? 30 : 70
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 0.2 + Math.random() * 1.4
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.2
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    return positions
  }, [isMobile])

  useFrame((state, delta) => {
    if (!vaultGroup.current || progress <= 0.001) return

    const t = state.clock.elapsedTime

    // Vertical Laser Scanner Oscillation
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(t * 2.2) * 0.85
    }

    // Core pulsing & rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6
      coreRef.current.rotation.x = Math.sin(t * 1.5) * 0.2
      const pulse = 1.0 + Math.sin(t * 3.0) * 0.08
      coreRef.current.scale.set(pulse, pulse, pulse)
    }

    // Orbiting Tokens
    if (tokensGroup.current) {
      tokensGroup.current.rotation.y += delta * 0.35
    }

    // Holographic HUD Rings
    if (hudRing1Ref.current) {
      hudRing1Ref.current.rotation.z += delta * 0.4
    }
    if (hudRing2Ref.current) {
      hudRing2Ref.current.rotation.z -= delta * 0.3
      hudRing2Ref.current.rotation.x = Math.sin(t * 0.8) * 0.15
    }

    // Gentle floating and mouse parallax on Desktop
    if (!isMobile) {
      vaultGroup.current.rotation.x = THREE.MathUtils.lerp(
        vaultGroup.current.rotation.x,
        mouse.y * 0.06,
        0.05
      )
      vaultGroup.current.rotation.z = THREE.MathUtils.lerp(
        vaultGroup.current.rotation.z,
        -mouse.x * 0.06,
        0.05
      )
    }
  })

  if (progress <= 0.001) return null

  // Materialization scaling & opacity derived directly from progress (0 to 1)
  const masterScale = progress * (isMobile ? 0.65 : 0.85)
  const opacity = Math.min(1, progress * 1.4)

  // Position: primarily on the RIGHT side (X: 1.75 on desktop, 0 on mobile)
  const posX = isMobile ? 0 : 1.75
  const posY = 0

  return (
    <group ref={vaultGroup} position={[posX, posY, 0]} scale={[masterScale, masterScale, masterScale]}>
      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.08}>
        {/* =========================================================================
            1. TRANSPARENT HOLOGRAPHIC CYLINDRICAL VAULT CHAMBER
            ========================================================================= */}
        {/* Outer Cylindrical Glass Containment Wall */}
        <mesh>
          <cylinderGeometry args={[0.95, 0.95, 2.0, 32, 1, true]} />
          <meshPhysicalMaterial
            color="#00D9FF"
            emissive="#147DFF"
            emissiveIntensity={0.3 * opacity}
            roughness={0.1}
            metalness={0.2}
            transmission={0.9}
            transparent
            opacity={0.35 * opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        {/* Top Metallic Titanium Cap & Glowing Laser Ring */}
        <group position={[0, 1.05, 0]}>
          <mesh>
            <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
            <meshStandardMaterial
              color="#030814"
              metalness={0.95}
              roughness={0.2}
              emissive="#147DFF"
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <torusGeometry args={[0.96, 0.02, 16, 48]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={2.5 * opacity}
            />
          </mesh>
        </group>

        {/* Bottom Metallic Titanium Base & Glowing Laser Ring */}
        <group position={[0, -1.05, 0]}>
          <mesh>
            <cylinderGeometry args={[1.05, 1.05, 0.1, 32]} />
            <meshStandardMaterial
              color="#030814"
              metalness={0.95}
              roughness={0.2}
              emissive="#147DFF"
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <torusGeometry args={[0.96, 0.02, 16, 48]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={2.5 * opacity}
            />
          </mesh>
        </group>

        {/* 4 Vertical Structural Titanium Reinforcement Pillars with Glowing Circuit Seams */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2
          return (
            <group key={i} position={[Math.cos(angle) * 0.98, 0, Math.sin(angle) * 0.98]}>
              <mesh>
                <cylinderGeometry args={[0.03, 0.03, 2.0, 12]} />
                <meshStandardMaterial color="#050C1A" metalness={0.95} roughness={0.2} />
              </mesh>
              <mesh>
                <boxGeometry args={[0.015, 1.85, 0.015]} />
                <meshStandardMaterial
                  color="#147DFF"
                  emissive="#147DFF"
                  emissiveIntensity={2.0 * opacity}
                />
              </mesh>
            </group>
          )
        })}

        {/* =========================================================================
            2. LASER SCANNING SYSTEM (Vertical Sweeping Hologram)
            ========================================================================= */}
        <mesh ref={scannerRef}>
          <cylinderGeometry args={[0.92, 0.92, 0.01, 32]} />
          <meshBasicMaterial
            color="#00D9FF"
            transparent
            opacity={0.6 * opacity}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* =========================================================================
            3. CENTRAL BOUNTY ENERGY CORE
            ========================================================================= */}
        {/* Core Diamond */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.36, 0]} />
          <meshStandardMaterial
            color="#020814"
            emissive="#00D9FF"
            emissiveIntensity={3.5 * opacity}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>

        {/* Inner Geometric Quantum Cage */}
        <mesh>
          <icosahedronGeometry args={[0.48, 1]} />
          <meshStandardMaterial
            color="#147DFF"
            emissive="#147DFF"
            emissiveIntensity={1.8 * opacity}
            wireframe
            transparent
            opacity={0.5 * opacity}
          />
        </mesh>

        {/* Core Direct Lights */}
        <pointLight color="#00D9FF" intensity={3.5 * opacity} distance={3.5} />
        <pointLight color="#147DFF" intensity={4.5 * opacity} distance={5.0} />

        {/* =========================================================================
            4. FLOATING METALLIC BOUNTY TOKENS / REWARD INGOTS
            ========================================================================= */}
        <group ref={tokensGroup}>
          {tokens.map((tok, idx) => (
            <mesh key={idx} position={tok.pos} rotation={tok.rot} scale={[tok.scale, tok.scale, tok.scale]}>
              <cylinderGeometry args={[1, 1, 0.25, 8]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#0B2347' : '#031228'}
                emissive={idx % 2 === 0 ? '#00D9FF' : '#147DFF'}
                emissiveIntensity={1.8 * opacity}
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>

        {/* =========================================================================
            5. HOLOGRAPHIC NUMERIC DATA & LABELS (₹3,00,000+, 32 TEAMS, 36 HOURS)
            ========================================================================= */}
        {/* Top Header Floating Metric: ₹3,00,000+ */}
        <group position={[0, 1.4, 0]}>
          <Text
            font=""
            fontSize={0.22}
            color="#00D9FF"
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
          >
            ₹3,00,000+
          </Text>
          <Text
            font=""
            fontSize={0.075}
            color="#8CA4C4"
            position={[0, -0.18, 0]}
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
          >
            // TOTAL BOUNTY PROTOCOL
          </Text>
        </group>

        {/* Left Floating Metric: 32 TEAMS */}
        <group position={[-1.3, 0.4, 0]}>
          <Text
            font=""
            fontSize={0.13}
            color="#F2F6FF"
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
          >
            32 TEAMS
          </Text>
          <Text
            font=""
            fontSize={0.065}
            color="#2695FF"
            position={[0, -0.12, 0]}
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
          >
            SHORTLISTED
          </Text>
        </group>

        {/* Right Floating Metric: 36 HOURS */}
        <group position={[1.3, 0.4, 0]}>
          <Text
            font=""
            fontSize={0.13}
            color="#F2F6FF"
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
          >
            36 HOURS
          </Text>
          <Text
            font=""
            fontSize={0.065}
            color="#2695FF"
            position={[0, -0.12, 0]}
            anchorX="center"
            anchorY="middle"
            fillOpacity={opacity}
          >
            COMPUTATION
          </Text>
        </group>

        {/* =========================================================================
            6. ORBITING HOLOGRAPHIC HUD DATA RINGS & TECH PANELS
            ========================================================================= */}
        {/* Equatorial Holographic Gauge Ring */}
        <group ref={hudRing1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[1.35, 0.008, 8, 64]} />
            <meshBasicMaterial color="#147DFF" transparent opacity={0.7 * opacity} />
          </mesh>
          {/* Gauge Markers */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2
            return (
              <mesh key={i} position={[Math.cos(angle) * 1.35, Math.sin(angle) * 1.35, 0]}>
                <boxGeometry args={[0.06, 0.02, 0.02]} />
                <meshBasicMaterial color="#00D9FF" transparent opacity={0.9 * opacity} />
              </mesh>
            )
          })}
        </group>

        {/* Tilted Outer Measurement HUD Ring */}
        <group ref={hudRing2Ref} rotation={[0.45, 0.3, 0]}>
          <mesh>
            <torusGeometry args={[1.55, 0.005, 6, 64]} />
            <meshBasicMaterial color="#00D9FF" transparent opacity={0.45 * opacity} />
          </mesh>
          {/* Holographic corner tech bracket */}
          <mesh position={[1.55, 0, 0]}>
            <boxGeometry args={[0.08, 0.04, 0.02]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={2.0 * opacity}
            />
          </mesh>
        </group>

        {/* =========================================================================
            7. AMBIENT CYBER DUST & REWARD PARTICLES
            ========================================================================= */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length / 3}
              array={particles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.03 : 0.045}
            color="#00D9FF"
            transparent
            opacity={0.65 * opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </Float>
    </group>
  )
}

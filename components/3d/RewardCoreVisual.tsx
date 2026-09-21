'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html } from '@react-three/drei'
import * as THREE from 'three'

interface CyberBountyCoreSceneProps {
  scrollProgress: number // 0.0 to 1.0 (scroll depth inside the Prize Pool section)
  isMobile?: boolean
}

/**
 * CyberBountyCoreScene:
 * Master Holographic Cyberpunk Bounty Core (3D WebGL Machine).
 *
 * Layered Machine Architecture:
 * 1. Hyper-dense Central Energy Nucleus (Dual Octahedron Core with emissive energy pulse & direct point lights)
 * 2. Rotating Inner Geometric Mechanical Containment Cage (Dodecahedron with technical wireframe seams)
 * 3. 4 Opposing Concentric Elliptical Orbital Laser Rings with Cardinal Gauge Notches
 * 4. 8 Orbiting Rectangular Holographic HUD Data Panels with technical coordinate readout labels
 * 5. Multi-tier Technical Wireframe Guides & Laser Scan Beam sweeps
 * 6. Orbiting Golden-Cyan Crypto Reward Nodes & Fibonacci Particle Streams
 * 7. Background Distant Volumetric Grids & Deep Atmospheric Cyber Dust
 */
function CyberBountyCoreScene({ scrollProgress = 0, isMobile = false }: CyberBountyCoreSceneProps) {
  const masterGroupRef = useRef<THREE.Group>(null)
  const nucleusRef = useRef<THREE.Mesh>(null)
  const innerCageRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Group>(null)
  const ring2Ref = useRef<THREE.Group>(null)
  const ring3Ref = useRef<THREE.Group>(null)
  const ring4Ref = useRef<THREE.Group>(null)
  const scanBeamRef = useRef<THREE.Mesh>(null)
  const panelsOrbitRef = useRef<THREE.Group>(null)
  const nodesOrbitRef = useRef<THREE.Group>(null)

  // Floating Cybernetic Data Panels (6 transparent glass HUD cards orbiting the machine)
  const hudPanels = useMemo(() => {
    const list: {
      pos: [number, number, number]
      rot: [number, number, number]
      size: [number, number]
      label: string
      code: string
    }[] = [
      { pos: [1.3, 0.4, 0.4], rot: [0, -0.4, 0], size: [0.35, 0.22], label: 'BOUNTY_SYNC', code: '0x9F4A' },
      { pos: [-1.3, -0.3, 0.3], rot: [0, 0.4, 0], size: [0.38, 0.24], label: 'CORE_ENERGY', code: '100% OK' },
      { pos: [0.3, 1.2, -0.6], rot: [0.3, 0, 0], size: [0.4, 0.2], label: 'NODE_GRID', code: '32 ACTIVE' },
      { pos: [-0.4, -1.1, -0.5], rot: [-0.3, 0, 0], size: [0.36, 0.22], label: 'PROTOCOL_LOCK', code: 'SEC_2026' },
      { pos: [0.9, -0.6, 0.9], rot: [0, -0.8, 0], size: [0.32, 0.18], label: 'VALUATION', code: '₹12.90L' },
      { pos: [-0.9, 0.7, 0.8], rot: [0, 0.8, 0], size: [0.34, 0.2], label: 'INCUBATION', code: 'UP TO ₹10L' },
    ]
    return list
  }, [])

  // Orbiting Golden-Cyan Crypto Reward Nodes
  const cryptoNodes = useMemo(() => {
    const list: { pos: [number, number, number]; scale: number }[] = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 1.1 + (i % 3) * 0.2
      const y = ((i - 6) / 6) * 0.8
      list.push({
        pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        scale: 0.045 + (i % 2) * 0.02,
      })
    }
    return list
  }, [])

  // Deep High-Density Cyber Dust & Data Stream Particles
  const streamParticles = useMemo(() => {
    const count = isMobile ? 60 : 160
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 0.3 + Math.random() * 2.8
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2
      positions[i * 3 + 2] = Math.sin(angle) * r
    }
    return positions
  }, [isMobile])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // Master Machine Rotation
    if (masterGroupRef.current) {
      masterGroupRef.current.rotation.y += delta * 0.12
    }

    // Concentric Ring Orbits (Opposing high-precision speeds)
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35
      ring1Ref.current.rotation.y += delta * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.28
      ring2Ref.current.rotation.x = Math.sin(t * 0.6) * 0.25
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.4
      ring3Ref.current.rotation.x -= delta * 0.15
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.z += delta * 0.2
      ring4Ref.current.rotation.x += delta * 0.3
    }

    // Central Energy Nucleus Pulsing & Rapid Geometric Shift
    if (nucleusRef.current) {
      nucleusRef.current.rotation.y += delta * 0.75
      nucleusRef.current.rotation.x = Math.sin(t * 1.6) * 0.2
      const pulse = 1.0 + Math.sin(t * 4.0) * 0.08
      nucleusRef.current.scale.set(pulse, pulse, pulse)
    }

    // Inner Mechanical Cage Counter-Rotation
    if (innerCageRef.current) {
      innerCageRef.current.rotation.y -= delta * 0.3
      innerCageRef.current.rotation.z = Math.cos(t * 1.2) * 0.15
    }

    // Orbiting Data Panels & Nodes
    if (panelsOrbitRef.current) {
      panelsOrbitRef.current.rotation.y += delta * 0.18
    }
    if (nodesOrbitRef.current) {
      nodesOrbitRef.current.rotation.y -= delta * 0.22
    }

    // Laser Scan Beam Sweep (Vertical oscillation)
    if (scanBeamRef.current) {
      scanBeamRef.current.position.y = Math.sin(t * 2.4) * 1.1
    }
  })

  // Dynamic Camera Zoom/Scale mapped directly to Scroll Progress
  const machineScale = 0.95 + scrollProgress * 0.25

  return (
    <group ref={masterGroupRef} scale={[machineScale, machineScale, machineScale]}>
      {/* Lighting Architecture */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 6, 6]} intensity={1.2} color="#2695FF" />
      <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#00D9FF" />
      <pointLight position={[0, 0, 0]} intensity={4.5} color="#00D9FF" distance={5} />
      <pointLight position={[0, 0, 2]} intensity={3.5} color="#147DFF" distance={6} />

      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.06}>
        {/* =========================================================================
            1. CENTRAL HYPER-DENSE ENERGY NUCLEUS
            ========================================================================= */}
        {/* Primary Emissive Octahedron */}
        <mesh ref={nucleusRef}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial
            color="#020814"
            emissive="#00D9FF"
            emissiveIntensity={3.8}
            roughness={0.08}
            metalness={0.96}
          />
        </mesh>

        {/* Nested Inner Geometric Energy Core */}
        <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.26, 0]} />
          <meshBasicMaterial color="#FFFFFF" wireframe />
        </mesh>

        {/* =========================================================================
            2. ROTATING INNER MECHANICAL CONTAINMENT CAGE
            ========================================================================= */}
        <group ref={innerCageRef}>
          {/* Wireframe Dodecahedron Cage */}
          <mesh>
            <dodecahedronGeometry args={[0.62, 0]} />
            <meshStandardMaterial
              color="#147DFF"
              emissive="#147DFF"
              emissiveIntensity={2.0}
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>

          {/* Translucent Glass Shield Sphere */}
          <mesh>
            <sphereGeometry args={[0.68, 24, 24]} />
            <meshPhysicalMaterial
              color="#00D9FF"
              emissive="#147DFF"
              emissiveIntensity={0.25}
              roughness={0.1}
              metalness={0.2}
              transmission={0.88}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* =========================================================================
            3. FOUR CONCENTRIC ELLIPTICAL ORBITAL LASER RINGS
            ========================================================================= */}
        {/* Ring 1: Equatorial Primary Laser Ring */}
        <group ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.96, 0.014, 12, 64]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={2.8}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          {/* 8 Cardinal Gauge Markers */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i / 8) * Math.PI * 2
            return (
              <mesh key={i} position={[Math.cos(angle) * 0.96, Math.sin(angle) * 0.96, 0]}>
                <boxGeometry args={[0.07, 0.025, 0.025]} />
                <meshBasicMaterial color="#F2F6FF" />
              </mesh>
            )
          })}
        </group>

        {/* Ring 2: Tilted Orbital Measurement Ring */}
        <group ref={ring2Ref} rotation={[0.45, 0.35, 0]}>
          <mesh>
            <torusGeometry args={[1.22, 0.01, 8, 64]} />
            <meshStandardMaterial
              color="#147DFF"
              emissive="#147DFF"
              emissiveIntensity={2.2}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>
          {/* Corner HUD Bracket */}
          <mesh position={[1.22, 0, 0]}>
            <boxGeometry args={[0.09, 0.04, 0.02]} />
            <meshBasicMaterial color="#00D9FF" />
          </mesh>
        </group>

        {/* Ring 3: Vertical Gyroscopic Guidance Ring */}
        <group ref={ring3Ref} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <torusGeometry args={[1.42, 0.008, 6, 64]} />
            <meshBasicMaterial color="#00D9FF" transparent opacity={0.65} />
          </mesh>
        </group>

        {/* Ring 4: Outer Tilted Boundary Ring */}
        <group ref={ring4Ref} rotation={[-0.55, -0.3, 0]}>
          <mesh>
            <torusGeometry args={[1.65, 0.006, 6, 64]} />
            <meshBasicMaterial color="#147DFF" transparent opacity={0.45} />
          </mesh>
        </group>

        {/* =========================================================================
            4. ORBITING HOLOGRAPHIC DATA PANELS
            ========================================================================= */}
        <group ref={panelsOrbitRef}>
          {hudPanels.map((panel, idx) => (
            <group key={idx} position={panel.pos} rotation={panel.rot}>
              {/* Glass Card Plate */}
              <mesh>
                <planeGeometry args={panel.size} />
                <meshPhysicalMaterial
                  color="#00D9FF"
                  emissive="#147DFF"
                  emissiveIntensity={0.5}
                  transmission={0.85}
                  roughness={0.15}
                  metalness={0.2}
                  transparent
                  opacity={0.65}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* Glowing Wireframe Border */}
              <mesh>
                <planeGeometry args={[panel.size[0] + 0.01, panel.size[1] + 0.01]} />
                <meshBasicMaterial color="#00D9FF" wireframe transparent opacity={0.8} />
              </mesh>
            </group>
          ))}
        </group>

        {/* =========================================================================
            5. ORBITING CRYPTO REWARD NODES
            ========================================================================= */}
        <group ref={nodesOrbitRef}>
          {cryptoNodes.map((node, idx) => (
            <mesh key={idx} position={node.pos} scale={[node.scale, node.scale, node.scale]}>
              <cylinderGeometry args={[1, 1, 0.25, 8]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#0B2347' : '#031228'}
                emissive={idx % 2 === 0 ? '#00D9FF' : '#147DFF'}
                emissiveIntensity={2.2}
                metalness={0.95}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>

        {/* =========================================================================
            6. LASER SCANNING BEAM (Sweeping Holographic Disc)
            ========================================================================= */}
        <mesh ref={scanBeamRef}>
          <cylinderGeometry args={[1.25, 1.25, 0.008, 32]} />
          <meshBasicMaterial
            color="#00D9FF"
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* =========================================================================
            7. AMBIENT FIBONACCI DATA PARTICLES
            ========================================================================= */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={streamParticles.length / 3}
              array={streamParticles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.035 : 0.05}
            color="#00D9FF"
            transparent
            opacity={0.75}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </Float>
    </group>
  )
}

export default function RewardCoreVisual({
  progress = 0,
  isIncubation = false,
}: {
  progress?: number
  isIncubation?: boolean
}) {
  return (
    <div className="w-full h-full relative overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <CyberBountyCoreScene scrollProgress={progress} />
      </Canvas>
    </div>
  )
}

'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface FluidGlassCoreProps {
  heroScrollProgress?: number
  transitionProgress?: number
  pageScrollProgress?: number
  controlState?: {
    coreEnergy?: number
    overallScale?: number
    rotationSpeed?: number
  }
  mouse?: { x: number; y: number }
  isMobile?: boolean
}

/**
 * Generates an organic, sculptural ribbon geometry by sweeping an elliptical,
 * beveled-flat cross-section along an open/closed 3D spline curve.
 * This gives ribbons a fluid, varying-width, glass-sculpture appearance rather than round pipes.
 */
function createGlassRibbonGeometry(
  points: THREE.Vector3[],
  tubularSegments = 160,
  radialSegments = 24,
  ribbonWidth = 0.22,
  ribbonThickness = 0.075
): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal')
  const frames = curve.computeFrenetFrames(tubularSegments, true)
  
  const vertices: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments
    const point = curve.getPointAt(u)
    const normal = frames.normals[i]
    const binormal = frames.binormals[i]

    // Width modulation along the ribbon for natural organic flow
    const widthMod = 1.0 + 0.35 * Math.sin(u * Math.PI * 4) + 0.15 * Math.cos(u * Math.PI * 6)
    const w = ribbonWidth * widthMod
    const h = ribbonThickness

    // Local twist angle
    const twist = u * Math.PI * 3

    for (let j = 0; j <= radialSegments; j++) {
      const v = (j / radialSegments) * Math.PI * 2
      // Elliptical cross section rotated by twist
      const localX = Math.cos(v) * w
      const localY = Math.sin(v) * h

      const cosT = Math.cos(twist)
      const sinT = Math.sin(twist)
      const rotX = localX * cosT - localY * sinT
      const rotY = localX * sinT + localY * cosT

      const vx = point.x + normal.x * rotX + binormal.x * rotY
      const vy = point.y + normal.y * rotX + binormal.y * rotY
      const vz = point.z + normal.z * rotX + binormal.z * rotY

      vertices.push(vx, vy, vz)

      // Compute vertex normal
      const nx = normal.x * (Math.cos(v) * cosT) + binormal.x * (Math.cos(v) * sinT)
      const ny = normal.y * (Math.sin(v) * -sinT) + binormal.y * (Math.sin(v) * cosT)
      const nz = normal.z * (Math.cos(v) * cosT) + binormal.z * (Math.sin(v) * sinT)
      const nVec = new THREE.Vector3(nx, ny, nz).normalize()
      normals.push(nVec.x, nVec.y, nVec.z)

      uvs.push(u, j / radialSegments)
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j
      const b = (i + 1) * (radialSegments + 1) + j
      const c = (i + 1) * (radialSegments + 1) + (j + 1)
      const d = i * (radialSegments + 1) + (j + 1)

      indices.push(a, b, d)
      indices.push(b, c, d)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()

  return geometry
}

export default function FluidGlassCore({
  heroScrollProgress = 0,
  transitionProgress = 0,
  pageScrollProgress = 0,
  controlState = {},
  mouse = { x: 0, y: 0 },
  isMobile = false,
}: FluidGlassCoreProps) {
  const rootGroupRef = useRef<THREE.Group>(null)
  const sculptureGroupRef = useRef<THREE.Group>(null)
  const nucleusRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const {
    coreEnergy = 1,
    overallScale = 1,
    rotationSpeed = 1,
  } = controlState

  // =========================================================================
  // 1. GENERATE 3 INTERTWINED FLOWING LIQUID-GLASS RIBBONS
  // =========================================================================

  // Ribbon 1: Primary sweeping loop curving through top and center void
  const ribbonGeo1 = useMemo(() => {
    const pts = [
      new THREE.Vector3(0.0, 0.95, 0.2),
      new THREE.Vector3(0.75, 0.65, -0.35),
      new THREE.Vector3(0.9, -0.15, 0.3),
      new THREE.Vector3(0.35, -0.85, -0.2),
      new THREE.Vector3(-0.45, -0.75, 0.4),
      new THREE.Vector3(-0.85, 0.05, -0.3),
      new THREE.Vector3(-0.55, 0.75, 0.25),
    ]
    return createGlassRibbonGeometry(pts, 180, 24, 0.24, 0.08)
  }, [])

  // Ribbon 2: Counter-weaving harmonic ribbon crossing through the front & back
  const ribbonGeo2 = useMemo(() => {
    const pts = [
      new THREE.Vector3(-0.25, 0.85, -0.3),
      new THREE.Vector3(0.55, 0.45, 0.45),
      new THREE.Vector3(0.85, -0.45, -0.25),
      new THREE.Vector3(0.15, -0.8, 0.35),
      new THREE.Vector3(-0.75, -0.5, -0.35),
      new THREE.Vector3(-0.85, 0.35, 0.3),
      new THREE.Vector3(-0.4, 0.7, -0.15),
    ]
    return createGlassRibbonGeometry(pts, 180, 24, 0.20, 0.07)
  }, [])

  // Ribbon 3: Ascending spiral ribbon weaving through the negative-space void
  const ribbonGeo3 = useMemo(() => {
    const pts = [
      new THREE.Vector3(0.4, 0.8, 0.1),
      new THREE.Vector3(0.8, 0.1, -0.4),
      new THREE.Vector3(0.4, -0.7, 0.1),
      new THREE.Vector3(-0.4, -0.7, -0.2),
      new THREE.Vector3(-0.8, 0.1, 0.4),
      new THREE.Vector3(-0.4, 0.8, -0.2),
    ]
    return createGlassRibbonGeometry(pts, 160, 24, 0.17, 0.065)
  }, [])

  // =========================================================================
  // 2. DARK OBSIDIAN LIQUID-METAL & CYBERPUNK PHYSICAL MATERIALS
  // (Deep Midnight Base, Selective Electric-Blue & Cyan Specular Reflections)
  // =========================================================================
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#020A1E'), // Dark midnight navy / polished obsidian
      emissive: new THREE.Color('#010719'), // Deep dark indigo base
      emissiveIntensity: 0.15,
      roughness: 0.03, // High gloss liquid-metal finish
      metalness: 0.22, // Polished obsidian metal reflectivity
      transmission: 0.92, // Visibly translucent core
      thickness: 0.85,
      ior: 1.56,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      attenuationColor: new THREE.Color('#010514'), // Deep obsidian absorption
      attenuationDistance: 1.0,
      specularColor: new THREE.Color('#147DFF'), // Sharp electric-blue specular reflections
      specularIntensity: 2.2,
      transparent: true,
      opacity: 0.94,
      reflectivity: 0.98,
      side: THREE.DoubleSide,
    })
  }, [])

  // Secondary accent material (Cyan-Rimmed Sapphire Ribbon)
  const glassMaterialCyan = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#031233'),
      emissive: new THREE.Color('#010A24'),
      emissiveIntensity: 0.18,
      roughness: 0.02,
      metalness: 0.25,
      transmission: 0.94,
      thickness: 0.75,
      ior: 1.58,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      attenuationColor: new THREE.Color('#010518'),
      attenuationDistance: 1.2,
      specularColor: new THREE.Color('#00D9FF'), // Sharp cyan edge specular
      specularIntensity: 2.4,
      transparent: true,
      opacity: 0.92,
      reflectivity: 1.0,
      side: THREE.DoubleSide,
    })
  }, [])

  // Wireframe Edge Geometries for Electronic Luminous Lines along curvature
  const edgeGeo1 = useMemo(() => new THREE.EdgesGeometry(ribbonGeo1, 24), [ribbonGeo1])
  const edgeGeo2 = useMemo(() => new THREE.EdgesGeometry(ribbonGeo2, 24), [ribbonGeo2])
  const edgeGeo3 = useMemo(() => new THREE.EdgesGeometry(ribbonGeo3, 24), [ribbonGeo3])

  // 1. Concentrated Electric-Blue Electromagnetic Edge Core Glow Canvas Texture
  const coreBacklightTexture = useMemo(() => {
    if (typeof window === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
    grad.addColorStop(0, 'rgba(0, 217, 255, 0.95)')
    grad.addColorStop(0.25, 'rgba(20, 125, 255, 0.65)')
    grad.addColorStop(0.55, 'rgba(8, 70, 190, 0.28)')
    grad.addColorStop(1, 'rgba(1, 7, 20, 0)')

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  // 2. Volumetric Outer Atmospheric Electromagnetic Aura Canvas Texture (Extends beyond outer borders)
  const outerHaloTexture = useMemo(() => {
    if (typeof window === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
    grad.addColorStop(0, 'rgba(20, 125, 255, 0.50)')
    grad.addColorStop(0.4, 'rgba(4, 50, 150, 0.22)')
    grad.addColorStop(0.75, 'rgba(2, 20, 70, 0.08)')
    grad.addColorStop(1, 'rgba(1, 7, 20, 0)')

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 512)

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  // =========================================================================
  // 3. TINY CENTRAL ENERGY NUCLEUS & MICROSCOPIC PARTICLES
  // =========================================================================
  const particleCount = isMobile ? 14 : 24
  const particlePositions = useMemo(() => {
    const p = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = 0.2 + Math.random() * 0.7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = radius * Math.cos(phi)
    }
    return p
  }, [particleCount])

  // Dim ambient background motes
  const ambientCount = isMobile ? 10 : 18
  const ambientPositions = useMemo(() => {
    const p = new Float32Array(ambientCount * 3)
    for (let i = 0; i < ambientCount; i++) {
      const radius = 1.2 + Math.random() * 0.7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = radius * Math.cos(phi)
    }
    return p
  }, [ambientCount])

  // Internal refs for smooth cursor inertia & light response
  const mouseTiltX = useRef(0)
  const mouseTiltY = useRef(0)
  const dynamicLightRef = useRef<THREE.PointLight>(null)

  // =========================================================================
  // 4. ANIMATION & MOTION CONTROL (Base Idle Rotation + Cursor Parallax)
  // =========================================================================
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const s = delta * rotationSpeed

    // 1. Base Idle Animation: Continuous 360° rotation (~50s cycle)
    if (sculptureGroupRef.current) {
      sculptureGroupRef.current.rotation.y += s * 0.05
      sculptureGroupRef.current.rotation.x = Math.sin(t * 0.16) * 0.05
      sculptureGroupRef.current.rotation.z = Math.cos(t * 0.12) * 0.04
    }

    // 2. Nucleus pulse
    if (nucleusRef.current) {
      const pulse = 1.0 + Math.sin(t * 1.4) * 0.07
      nucleusRef.current.scale.set(pulse, pulse, pulse)
      nucleusRef.current.rotation.y -= s * 0.12
    }

    // 3. Gentle particle drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y += s * 0.06
      particlesRef.current.rotation.x = Math.sin(t * 0.1) * 0.03
    }

    // 4. Slow organic reflection light drift
    const lightDriftX = Math.sin(t * 0.35) * 0.25
    const lightDriftY = Math.cos(t * 0.25) * 0.2

    // =========================================================================
    // 5. CURSOR-REACTIVE PARALLAX & PROXIMITY HIGHLIGHTS (DESKTOP ONLY)
    // =========================================================================
    let cursorScaleBoost = 0

    if (!isMobile) {
      // Calculate target tilt limits: rotateX ±6°, rotateY ±10°
      const targetTiltX = mouse.y * 0.105
      const targetTiltY = mouse.x * 0.175

      // Smooth spring damping (inertia with zero immediate snapping)
      mouseTiltX.current = THREE.MathUtils.damp(mouseTiltX.current, targetTiltX, 4.5, delta)
      mouseTiltY.current = THREE.MathUtils.damp(mouseTiltY.current, targetTiltY, 4.5, delta)

      // Proximity effect: subtle 1.5% scale enhancement when cursor is near center
      const distFromCenter = Math.hypot(mouse.x, mouse.y)
      cursorScaleBoost = Math.max(0, 1 - distFromCenter * 0.85) * 0.015

      // Light/reflection response: shift highlight vector smoothly with cursor + idle drift
      if (dynamicLightRef.current) {
        dynamicLightRef.current.position.x = THREE.MathUtils.damp(
          dynamicLightRef.current.position.x,
          0.3 + mouse.x * 0.6 + lightDriftX,
          4,
          delta
        )
        dynamicLightRef.current.position.y = THREE.MathUtils.damp(
          dynamicLightRef.current.position.y,
          0.3 + mouse.y * 0.6 + lightDriftY,
          4,
          delta
        )
      }
    }

    // =========================================================================
    // 6. VIEWPORT SCALE & SAFE POSITIONING (1.18x Moderate Scale Boost)
    // =========================================================================
    if (rootGroupRef.current) {
      let targetX = 0
      let targetY = 0
      let targetZ = 0
      let targetScale = 1.0

      if (isMobile) {
        targetX = 0
        targetY = THREE.MathUtils.lerp(0, 0.2, heroScrollProgress)
        targetScale = THREE.MathUtils.lerp(0.30, 0.22, heroScrollProgress)
      } else {
        // Sequential 3D Position & Scale Timeline
        // heroScrollProgress = 0.0 (Section 0: Initial empty centered 3D stage) -> x = 0 (CENTER), scale = 0.42
        // heroScrollProgress = 0.5 (Section 1: Hackfinix on right, 3D on left) -> x = -1.75 (LEFT), scale = 0.40
        // heroScrollProgress = 1.0 (Section 2: Countdown on left, 3D on right) -> x = +1.75 (RIGHT), scale = 0.34
        const clampedP = Math.min(1, Math.max(0, heroScrollProgress))
        let currentX = 0
        let targetScale = 0.42

        if (clampedP <= 0.5) {
          const t = clampedP / 0.5
          currentX = THREE.MathUtils.lerp(0, -1.75, t)
          targetScale = THREE.MathUtils.lerp(0.42, 0.40, t)
        } else {
          const t = (clampedP - 0.5) / 0.5
          currentX = THREE.MathUtils.lerp(-1.75, 1.75, t)
          targetScale = THREE.MathUtils.lerp(0.40, 0.34, t)
        }

        // Page scroll down main body (ONLY active after intro sequence completes)
        if (heroScrollProgress >= 0.95 && pageScrollProgress > 0) {
          currentX = 1.75
          if (pageScrollProgress <= 0.08) {
            targetScale = 0.34
          } else if (pageScrollProgress <= 0.16) {
            const exitProgress = (pageScrollProgress - 0.08) / 0.08
            targetScale = (1 - exitProgress) * 0.34
          } else {
            targetScale = 0
          }
        }

        targetX = currentX
        targetY = 0
      }

      rootGroupRef.current.position.x = THREE.MathUtils.damp(rootGroupRef.current.position.x, targetX, 8, delta)
      rootGroupRef.current.position.y = THREE.MathUtils.damp(rootGroupRef.current.position.y, targetY, 5, delta)
      rootGroupRef.current.position.z = THREE.MathUtils.damp(rootGroupRef.current.position.z, 0, 5, delta)
      
      // Apply base scale + subtle proximity boost
      const finalScale = targetScale * (1 + cursorScaleBoost) * overallScale
      rootGroupRef.current.scale.setScalar(finalScale)

      // Apply smooth magnetic cursor rotation on top of base animation
      if (!isMobile && targetScale > 0.01) {
        rootGroupRef.current.rotation.x = mouseTiltX.current
        rootGroupRef.current.rotation.y = mouseTiltY.current
        rootGroupRef.current.rotation.z = -mouseTiltY.current * 0.2
      }
    }
  })

  return (
    <group ref={rootGroupRef} scale={[overallScale, overallScale, overallScale]}>
      <Float
        speed={0.6}
        rotationIntensity={0.012}
        floatIntensity={0.025}
        floatingRange={[-0.02, 0.02]}
      >
        {/* Layer 1: Concentrated Electric-Blue Core Backlight (Extends OUTSIDE outer borders) */}
        {coreBacklightTexture && (
          <mesh position={[0, 0, -0.65]}>
            <planeGeometry args={[4.2, 4.2]} />
            <meshBasicMaterial
              map={coreBacklightTexture}
              transparent
              opacity={0.92 * coreEnergy}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Layer 2: Volumetric Atmospheric Outer Halo (Electromagnetic aura fading into dark navy) */}
        {outerHaloTexture && (
          <mesh position={[0, 0, -0.95]}>
            <planeGeometry args={[6.8, 6.8]} />
            <meshBasicMaterial
              map={outerHaloTexture}
              transparent
              opacity={0.82 * coreEnergy}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Central Luminous Internal Core Light */}
        <pointLight color="#00D9FF" intensity={2.8 * coreEnergy} distance={3.2} decay={2} position={[0, 0, 0]} />
        
        {/* Dynamic Specular Light reacting smoothly to cursor movement + organic drift */}
        <pointLight
          ref={dynamicLightRef}
          color="#147DFF"
          intensity={3.6 * coreEnergy}
          distance={4.2}
          decay={2}
          position={[0.3, 0.3, 0.3]}
        />

        {/* 3D SCULPTURE CONTAINER */}
        <group ref={sculptureGroupRef}>
          {/* Ribbon 1: Primary Flowing Sweeping Loop */}
          <mesh geometry={ribbonGeo1} material={glassMaterial} />
          {/* Subtle Electronic Edge Traces along curvature */}
          <lineSegments geometry={edgeGeo1}>
            <lineBasicMaterial color="#00D9FF" transparent opacity={0.32} />
          </lineSegments>

          {/* Ribbon 2: Counter-Weaving Harmonic Ribbon */}
          <mesh geometry={ribbonGeo2} material={glassMaterial} />
          <lineSegments geometry={edgeGeo2}>
            <lineBasicMaterial color="#147DFF" transparent opacity={0.25} />
          </lineSegments>

          {/* Ribbon 3: Ascending Spiral Ribbon weaving through central void */}
          <mesh geometry={ribbonGeo3} material={glassMaterialCyan} />
          <lineSegments geometry={edgeGeo3}>
            <lineBasicMaterial color="#00D9FF" transparent opacity={0.38} />
          </lineSegments>



          {/* Microscopic Glowing Energy Particles trapped near the core */}
          <points ref={particlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[particlePositions, 3]}
                count={particleCount}
              />
            </bufferGeometry>
            <pointsMaterial
              color="#8DEBFF"
              size={0.024}
              transparent
              opacity={0.8 * coreEnergy}
              blending={THREE.AdditiveBlending}
              sizeAttenuation
            />
          </points>
        </group>

        {/* Dim Ambient Background Motes */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[ambientPositions, 3]}
              count={ambientCount}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#42B8FF"
            size={0.016}
            transparent
            opacity={0.35 * coreEnergy}
            sizeAttenuation
          />
        </points>
      </Float>
    </group>
  )
}

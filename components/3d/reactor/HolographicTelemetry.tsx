'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HolographicTelemetryProps {
  scale?: number
  opacity?: number
}

// Utility to create high-resolution crisp canvas textures for 3D HUD text
function createHUDTexture(text: string, subtext: string = '', dotColor?: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Subtle background frame with tech corner
  ctx.strokeStyle = 'rgba(20, 125, 255, 0.45)'
  ctx.lineWidth = 2
  ctx.strokeRect(10, 10, 492, 108)

  // Tech accent notches
  ctx.fillStyle = '#00D9FF'
  ctx.fillRect(10, 10, 12, 4)
  ctx.fillRect(490, 104, 12, 4)

  let startX = 30
  // Status indicator dot
  if (dotColor) {
    ctx.fillStyle = dotColor
    ctx.beginPath()
    ctx.arc(startX, 64, 8, 0, Math.PI * 2)
    ctx.fill()
    startX += 28
  }

  // Primary Label Text
  ctx.font = 'bold 36px "Courier New", monospace'
  ctx.fillStyle = '#F2F6FF'
  ctx.fillText(text, startX, subtext ? 54 : 74)

  // Subtext / Parameter
  if (subtext) {
    ctx.font = '22px "Courier New", monospace'
    ctx.fillStyle = '#8CA4C4'
    ctx.fillText(subtext, startX, 92)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function HolographicTelemetry({
  scale = 1,
  opacity = 0.7,
}: HolographicTelemetryProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Generate crisp textures for the requested telemetry points
  const textures = useMemo(() => {
    if (typeof window === 'undefined') return []
    return [
      {
        tex: createHUDTexture('CORE_STATUS', 'SYSTEM // ONLINE', '#00D9FF'),
        pos: [-1.45, 0.95, 0.2] as [number, number, number],
      },
      {
        tex: createHUDTexture('SYSTEM_SYNC', 'RATE // 99.98%', '#2695FF'),
        pos: [1.45, 0.85, -0.3] as [number, number, number],
      },
      {
        tex: createHUDTexture('NEURAL_GRID', 'TOPOLOGY // ACTIVE', '#00D9FF'),
        pos: [-1.35, -0.95, -0.2] as [number, number, number],
      },
      {
        tex: createHUDTexture('PROTOCOL', 'MATRIX // HFX-26', '#147DFF'),
        pos: [1.35, -0.95, 0.3] as [number, number, number],
      },
    ]
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    // Subtle orbital floating breathe
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.03
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.04
  })

  if (textures.length === 0) return null

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {textures.map((item, idx) => (
        <group key={idx} position={item.pos}>
          {/* Plane sprite billboard with canvas texture */}
          <mesh>
            <planeGeometry args={[0.75, 0.187]} />
            <meshBasicMaterial
              map={item.tex}
              transparent
              opacity={opacity * 0.75}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Subtle thin connecting coordinate leader */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, -item.pos[0] * 0.2, -item.pos[1] * 0.2, 0]), 3]}
                count={2}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#147DFF" transparent opacity={opacity * 0.3} />
          </lineSegments>
        </group>
      ))}
    </group>
  )
}

'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

type Props = { phase?: number; mouse?: { x: number; y: number } }

function CoreScene({ phase = 0, mouse = { x: 0, y: 0 } }: Props) {
  const group = useRef<THREE.Group>(null)
  const shell = useRef<THREE.Mesh>(null)
  const count = 180
  const points = useMemo(() => new Float32Array(Array.from({ length: count * 3 }, (_, i) => {
    const axis = i % 3
    const r = 1.15 + Math.random() * .75
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    return axis === 0 ? r * Math.sin(phi) * Math.cos(theta) : axis === 1 ? r * Math.sin(phi) * Math.sin(theta) : r * Math.cos(phi)
  })), [])
  const lines = useMemo(() => Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return [[Math.cos(a) * 1.45, -1.45, Math.sin(a) * 1.45], [Math.cos(a + .45) * 1.45, 1.45, Math.sin(a + .45) * 1.45]] as [number, number, number][] }), [])
  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * (.12 + phase * .04)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * .12 + phase * .05, .04)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -mouse.x * .1, .04)
    if (shell.current) { shell.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 1.5) * .025 + phase * .035); shell.current.material.opacity = .045 + phase * .012 }
  })
  return <group ref={group}>
    <Float speed={1.3} rotationIntensity={.18} floatIntensity={.12}>
      <mesh ref={shell}><icosahedronGeometry args={[1.5, 1]} /><meshBasicMaterial color="#2e8bff" wireframe transparent opacity={.035} depthWrite={false} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.34, .008, 8, 96]} /><meshBasicMaterial color="#58b7ff" transparent opacity={.7} /></mesh>
      <mesh rotation={[Math.PI / 3, .5, .2]}><torusGeometry args={[1.1, .005, 8, 96]} /><meshBasicMaterial color="#2e8bff" transparent opacity={.5} /></mesh>
      {lines.map((points, i) => <Line key={i} points={points} color="#2e8bff" transparent opacity={.18 + phase * .04} lineWidth={.5} />)}
      <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} count={count} /><pointsMaterial color="#8dccff" size={.012 + phase * .002} transparent opacity={.32} sizeAttenuation /></bufferGeometry></points>
      <mesh><sphereGeometry args={[.025, 8, 8]} /><meshBasicMaterial color="#58b7ff" transparent opacity={.8} /></mesh>
      <Sparkles count={80 + phase * 45} scale={3.4} size={1.2} speed={.35 + phase * .1} color="#58b7ff" />
    </Float>
  </group>
}

export function DigitalCore({ phase = 0, mouse = { x: 0, y: 0 } }: Props) {
  return <div className="core-canvas"><Canvas camera={{ position: [0, 0, 4.8], fov: 42 }} dpr={[1, 1.5]}><ambientLight intensity={.12} /><pointLight position={[2, 2, 3]} color="#2e8bff" intensity={1.2} /><CoreScene phase={phase} mouse={mouse} /></Canvas></div>
}

export default DigitalCore

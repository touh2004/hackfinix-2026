'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [trailing, setTrailing] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }
    setIsTouch(false)

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('.interactive-target') ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible])

  // Smooth trailing dot animation
  useEffect(() => {
    if (isTouch) return
    let animationFrameId: number

    const updateTrailing = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }))
      animationFrameId = requestAnimationFrame(updateTrailing)
    }

    animationFrameId = requestAnimationFrame(updateTrailing)
    return () => cancelAnimationFrame(animationFrameId)
  }, [position, isTouch])

  if (isTouch || !isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Outer Ring */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#147DFF]/60 transition-[width,height,border-color,background-color] duration-200 ease-out"
        style={{
          left: `${trailing.x}px`,
          top: `${trailing.y}px`,
          width: isHovered ? '46px' : '26px',
          height: isHovered ? '46px' : '26px',
          backgroundColor: isHovered ? 'rgba(20, 125, 255, 0.08)' : 'transparent',
          boxShadow: isHovered ? '0 0 15px rgba(38, 149, 255, 0.4)' : 'none',
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2695FF] shadow-[0_0_8px_#2695FF] transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '6px' : '4px',
          height: isHovered ? '6px' : '4px',
          transform: isHovered ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%) scale(1)',
        }}
      />
    </div>
  )
}

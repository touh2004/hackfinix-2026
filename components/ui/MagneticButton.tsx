'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLElement | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return
    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * 0.25
    const y = (clientY - (top + height / 2)) * 0.25
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles = 'group relative inline-flex items-center justify-center font-mono-tech uppercase font-medium tracking-wider transition-all duration-300 ease-out select-none'
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[11px] gap-2',
    md: 'px-5 py-3 text-xs gap-3',
    lg: 'px-7 py-4 text-sm gap-3.5',
  }[size]

  const variantStyles = {
    primary: 'bg-[#147DFF] text-[#020711] font-bold border border-[#2695FF] hover:bg-[#2695FF] hover:shadow-[0_0_25px_rgba(38,149,255,0.6)]',
    secondary: 'bg-[#061225]/80 text-[#F2F6FF] border border-[#147DFF]/40 hover:border-[#2695FF] hover:bg-[#081A32] hover:shadow-[0_0_20px_rgba(20,125,255,0.25)]',
    ghost: 'bg-transparent text-[#8CA4C4] hover:text-[#2695FF] border border-transparent hover:border-[#147DFF]/30',
  }[variant]

  const content = (
    <>
      <span
        className="relative z-10 flex items-center gap-2 transition-transform duration-200"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {content}
    </button>
  )
}

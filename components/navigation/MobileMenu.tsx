'use client'

import Link from 'next/link'
import { X, ArrowRight, Terminal, Shield, Zap } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#020711]/95 p-6 backdrop-blur-xl md:hidden"
      role="dialog"
      aria-label="Mobile Navigation"
    >
      <div className="scanline-overlay absolute inset-0" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#147DFF]/20 pb-4">
        <div className="font-mono-tech text-sm tracking-widest text-[#F2F6FF]">
          HACK<span className="text-[#147DFF]">FINIX</span>’26
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded border border-[#147DFF]/30 bg-[#061225] text-[#8CA4C4] hover:text-[#2695FF]"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Links */}
      <nav className="relative z-10 my-auto flex flex-col gap-6 font-mono-tech text-lg tracking-wider text-[#F2F6FF]">
        <Link
          href="/#missions"
          onClick={onClose}
          className="flex items-center justify-between border-b border-[#147DFF]/15 pb-3 transition-colors hover:text-[#2695FF]"
        >
          <span>01 // MISSIONS</span>
          <ArrowRight size={16} className="text-[#147DFF]" />
        </Link>
        <Link
          href="/#prizes"
          onClick={onClose}
          className="flex items-center justify-between border-b border-[#147DFF]/15 pb-3 transition-colors hover:text-[#2695FF]"
        >
          <span>02 // PRIZE POOL</span>
          <ArrowRight size={16} className="text-[#147DFF]" />
        </Link>
        <Link
          href="/#the-32"
          onClick={onClose}
          className="flex items-center justify-between border-b border-[#147DFF]/15 pb-3 transition-colors hover:text-[#2695FF]"
        >
          <span>03 // THE 32 TEAMS</span>
          <ArrowRight size={16} className="text-[#147DFF]" />
        </Link>
        <Link
          href="/#timeline"
          onClick={onClose}
          className="flex items-center justify-between border-b border-[#147DFF]/15 pb-3 transition-colors hover:text-[#2695FF]"
        >
          <span>04 // TIMELINE</span>
          <ArrowRight size={16} className="text-[#147DFF]" />
        </Link>
        <Link
          href="/#faq"
          onClick={onClose}
          className="flex items-center justify-between border-b border-[#147DFF]/15 pb-3 transition-colors hover:text-[#2695FF]"
        >
          <span>05 // FAQ</span>
          <ArrowRight size={16} className="text-[#147DFF]" />
        </Link>
        <Link
          href="/about"
          onClick={onClose}
          className="flex items-center justify-between border-b border-[#147DFF]/15 pb-3 transition-colors hover:text-[#2695FF]"
        >
          <span>06 // ABOUT</span>
          <ArrowRight size={16} className="text-[#147DFF]" />
        </Link>
      </nav>

      {/* Footer CTA */}
      <div className="relative z-10 flex flex-col gap-4 border-t border-[#147DFF]/20 pt-4">
        <MagneticButton
          href="#register"
          onClick={onClose}
          size="lg"
          className="w-full"
          icon={<ArrowRight size={16} />}
        >
          START APPLICATION
        </MagneticButton>
        <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#567299]">
          <span>STATUS: ONLINE</span>
          <span>ARENA 2026</span>
        </div>
      </div>
    </div>
  )
}

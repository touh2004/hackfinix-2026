'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X, Terminal, Zap } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#020711]/85 backdrop-blur-md border-b border-[#147DFF]/20 py-3 shadow-[0_4px_30px_rgba(2,7,17,0.8)]'
            : 'bg-transparent py-5 border-b border-[#147DFF]/10'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo / Brandmark */}
          <Link href="/#top" className="group flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-[#147DFF]/40 bg-[#061225] text-xs font-mono-tech font-bold text-[#2695FF] transition-all duration-300 group-hover:border-[#2695FF] group-hover:shadow-[0_0_15px_#2695FF]">
              HF
            </div>
            <div className="font-mono-tech text-sm tracking-widest text-[#F2F6FF]">
              HACK<span className="text-[#147DFF] font-bold">FINIX</span>
              <span className="ml-1 text-[10px] text-[#8CA4C4]">’26</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono-tech text-xs tracking-wider text-[#8CA4C4]">
            <Link href="/#missions" className="transition-colors hover:text-[#2695FF]">
              MISSIONS
            </Link>
            <Link href="/#prizes" className="transition-colors hover:text-[#2695FF]">
              PRIZES
            </Link>
            <Link href="/#the-32" className="transition-colors hover:text-[#2695FF]">
              THE 32
            </Link>
            <Link href="/#timeline" className="transition-colors hover:text-[#2695FF]">
              TIMELINE
            </Link>
            <Link href="/#faq" className="transition-colors hover:text-[#2695FF]">
              FAQ
            </Link>
            <Link href="/about" className="transition-colors hover:text-[#2695FF]">
              ABOUT
            </Link>
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <MagneticButton href="#register" size="sm" icon={<ArrowRight size={13} />}>
                REGISTER
              </MagneticButton>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded border border-[#147DFF]/30 bg-[#061225] text-[#8CA4C4] transition-colors hover:text-[#2695FF] md:hidden"
              aria-label="Open Navigation Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}

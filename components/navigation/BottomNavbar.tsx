'use client'

import Link from 'next/link'
import { Info, Calendar, FileText, LayoutGrid, Download, Users } from 'lucide-react'

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl pointer-events-auto">
      {/* Outer Glow container */}
      <div className="relative border border-[#147DFF]/40 bg-[#03091b]/90 backdrop-blur-md px-3 sm:px-4 py-3 rounded-full shadow-[0_4px_30px_rgba(2,7,17,0.8),_0_0_20px_rgba(20,125,255,0.15)] flex items-center justify-around md:gap-3 font-mono-tech text-[10px] sm:text-xs tracking-wider text-[#8CA4C4]">
        
        {/* Decorative corner indicators on the floating HUD bar */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[#00D9FF]/40 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[#00D9FF]/40 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[#00D9FF]/40 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-[#00D9FF]/40 rounded-br-sm pointer-events-none" />

        {/* Link 1: About Us */}
        <Link 
          href="/about" 
          className="group flex flex-col sm:flex-row items-center gap-1 py-1 px-2 sm:px-3 rounded-full transition-colors hover:text-[#00D9FF] hover:bg-[#00D9FF]/5"
        >
          <Info size={13} className="text-[#147DFF] group-hover:text-[#00D9FF] group-hover:animate-pulse" />
          <span className="text-[9px] sm:text-xs font-medium">ABOUT US</span>
        </Link>

        <span className="hidden sm:inline text-[#147DFF]/30">|</span>

        {/* Link 2: Event Timeline */}
        <Link 
          href="/timeline" 
          className="group flex flex-col sm:flex-row items-center gap-1 py-1 px-2 sm:px-3 rounded-full transition-colors hover:text-[#00D9FF] hover:bg-[#00D9FF]/5"
        >
          <Calendar size={13} className="text-[#147DFF] group-hover:text-[#00D9FF]" />
          <span className="text-[9px] sm:text-xs font-medium">TIMELINE</span>
        </Link>

        <span className="hidden sm:inline text-[#147DFF]/30">|</span>

        {/* Link 3: Rulebook PDF */}
        <a 
          href="/rulebook.pdf" 
          download="HackFinix_2026_Rulebook.pdf"
          className="group flex flex-col sm:flex-row items-center gap-1 py-1 px-2 sm:px-3 rounded-full transition-colors hover:text-[#00D9FF] hover:bg-[#00D9FF]/5"
        >
          <div className="relative">
            <FileText size={13} className="text-[#147DFF] group-hover:text-[#00D9FF]" />
            <Download size={7} className="absolute -bottom-1 -right-1 text-[#00D9FF] bg-[#03091b] rounded-full" />
          </div>
          <span className="text-[9px] sm:text-xs font-medium">RULEBOOK</span>
        </a>

        <span className="hidden sm:inline text-[#147DFF]/30">|</span>

        {/* Link 4: Themes Description */}
        <Link 
          href="/themes" 
          className="group flex flex-col sm:flex-row items-center gap-1 py-1 px-2 sm:px-3 rounded-full transition-colors hover:text-[#00D9FF] hover:bg-[#00D9FF]/5"
        >
          <LayoutGrid size={13} className="text-[#147DFF] group-hover:text-[#00D9FF]" />
          <span className="text-[9px] sm:text-xs font-medium">THEMES</span>
        </Link>

        <span className="hidden sm:inline text-[#147DFF]/30">|</span>

        {/* Link 5: Team */}
        <Link 
          href="/team" 
          className="group flex flex-col sm:flex-row items-center gap-1 py-1 px-2 sm:px-3 rounded-full transition-colors hover:text-[#00D9FF] hover:bg-[#00D9FF]/5"
        >
          <Users size={13} className="text-[#147DFF] group-hover:text-[#00D9FF]" />
          <span className="text-[9px] sm:text-xs font-medium">TEAM</span>
        </Link>
      </div>
    </div>
  )
}

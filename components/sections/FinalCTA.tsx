'use client'

import Link from 'next/link'
import { ArrowRight, Terminal, Github, Disc as Discord, Twitter } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import MagneticButton from '../ui/MagneticButton'
import { eventData } from '@/data/event'

export default function FinalCTA() {
  return (
    <footer className="relative pt-24 pb-12 px-6 max-w-7xl mx-auto z-10">
      {/* Registration Portal Box */}
      <div
        id="register"
        className="glass-panel relative rounded-lg border border-[#2695FF]/50 bg-gradient-to-b from-[#061836] to-[#020711] p-8 sm:p-14 overflow-hidden shadow-[0_10px_50px_rgba(2,7,17,0.9),0_0_40px_rgba(20,125,255,0.15)]"
      >
        <div className="scanline-overlay absolute inset-0 opacity-40" />

        {/* Ambient Big Background Mark */}
        <div className="pointer-events-none absolute -right-12 -bottom-16 text-[180px] sm:text-[260px] font-black text-[#081a32]/35 select-none font-mono-tech">
          HF26
        </div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <SectionLabel tag="APPLICATION PORTAL" coordinate="DIRECT ACCESS">
            THE ARENA AWAITS
          </SectionLabel>

          <h2 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF]">
            BRING THE <br />
            <span className="text-[#147DFF] glow-text-blue">UNEXPECTED.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#8CA4C4] leading-relaxed">
            Applications for HackFinix 2026 are now active. 36 hours. 32 teams. One arena to build what everyone else thought was impossible.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton
              href="mailto:hello@hackfinix.example?subject=HackFinix%202026%20Application"
              size="lg"
              icon={<ArrowRight size={16} />}
            >
              START YOUR APPLICATION
            </MagneticButton>

            <MagneticButton
              href={eventData.discordUrl}
              variant="secondary"
              size="lg"
            >
              JOIN COMMUNITY DISCORD
            </MagneticButton>
          </div>

          <div className="pt-4 font-mono-tech text-xs text-[#567299]">
            FREE PARTICIPATION // MEALS & REST PODS INCLUDED // HARDWARE KITS
          </div>
        </div>
      </div>

      {/* Footer Navigation & Credits */}
      <div className="mt-20 border-t border-[#147DFF]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono-tech text-xs text-[#8CA4C4]">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-[#147DFF]/40 bg-[#061225] text-[10px] font-bold text-[#2695FF]">
            HF
          </div>
          <span className="text-[#F2F6FF] font-bold">HACKFINIX 2026</span>
          <span className="text-[#567299]">// BUILT FOR THE NEXT COMPUTATIONAL POSSIBILITY</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <Link href="/themes" className="hover:text-[#2695FF] transition-colors">
            THEMES
          </Link>
          <Link href="/about" className="hover:text-[#2695FF] transition-colors">
            ABOUT
          </Link>
          <Link href="/team" className="hover:text-[#2695FF] transition-colors">
            TEAM
          </Link>
          <Link href="/sponsors" className="hover:text-[#2695FF] transition-colors">
            SPONSORS
          </Link>
          <a
            href="mailto:hello@hackfinix.example"
            className="text-[#2695FF] hover:underline"
          >
            CONTACT
          </a>
        </div>
      </div>

      <div className="mt-4 text-center font-mono-tech text-[10px] text-[#567299]">
        © 2026 HACKFINIX ARENA. ALL SYSTEMS SECURED AND VERIFIED.
      </div>
    </footer>
  )
}

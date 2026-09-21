'use client'

import { useMemo, useState, useEffect } from 'react'
import { Trophy, Award, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'

interface CinematicPrizePoolProps {
  progress?: number // 0.0 to 1.0 (Scrubbed by scroll)
}

/**
 * CinematicPrizePool:
 *
 * Fully scroll-scrubbed, reversible reward journey for HackFinix 2026:
 *
 * 0–10%   -> BOUNTY PROTOCOL // INITIALIZING
 * 10–20%  -> ₹12,90,000+ PRIZE POOL reveal
 * 20–32%  -> ₹40,000 FIRST PRIZE materializes
 * 32–44%  -> ₹20,000 SECOND PRIZE materializes
 * 44–56%  -> ₹10,000 BEST UI/UX DESIGN materializes
 * 56–64%  -> All three rewards displayed together
 * 64–72%  -> Bounty modules collapse into particles
 * 72–78%  -> BOUNTY SYSTEM OFFLINE
 * 78–83%  -> BUT THE REAL REWARD ISN'T THE PRIZE...
 * 83–87%  -> IT'S WHAT YOU BUILD NEXT.
 * 87–92%  -> INCUBATION PROTOCOL ACTIVATING
 * 92–97%  -> Massive futuristic incubation structure revealed
 * 97–100% -> ₹10,00,000 INCUBATION final reveal
 */
export default function CinematicPrizePool({ progress = 0 }: CinematicPrizePoolProps) {
  // Phase 0: Intro (0 - 20%)
  const introOpacity = Math.max(0, Math.min(1, (progress - 0.02) / 0.08)) * Math.max(0, Math.min(1, (0.64 - progress) / 0.06))

  // Module 1 (First Prize: ₹40,000) -> Materializes 20% to 32%, stays until 64%, collapses 64%-72%
  const mod1Visible = progress >= 0.20 && progress <= 0.72
  const mod1Progress = Math.max(0, Math.min(1, (progress - 0.20) / 0.12))
  const mod1Collapse = progress > 0.64 ? (progress - 0.64) / 0.08 : 0

  // Module 2 (Second Prize: ₹20,000) -> Materializes 32% to 44%, stays until 64%, collapses 64%-72%
  const mod2Visible = progress >= 0.32 && progress <= 0.72
  const mod2Progress = Math.max(0, Math.min(1, (progress - 0.32) / 0.12))
  const mod2Collapse = progress > 0.64 ? (progress - 0.64) / 0.08 : 0

  // Module 3 (Best UI/UX: ₹10,000) -> Materializes 44% to 56%, stays until 64%, collapses 64%-72%
  const mod3Visible = progress >= 0.44 && progress <= 0.72
  const mod3Progress = Math.max(0, Math.min(1, (progress - 0.44) / 0.12))
  const mod3Collapse = progress > 0.64 ? (progress - 0.64) / 0.08 : 0

  // Phase 4: Bounty System Complete Pause Tag (56% to 64%)
  const pauseMessageOpacity = Math.max(0, Math.min(1, (progress - 0.56) / 0.04)) * Math.max(0, Math.min(1, (0.64 - progress) / 0.04))

  // Phase 5: Bounty System Offline (72% to 78%)
  const offlineOpacity = Math.max(0, Math.min(1, (progress - 0.72) / 0.03)) * Math.max(0, Math.min(1, (0.78 - progress) / 0.03))

  // Phase 6: The Philosophy Message (78% to 87%)
  const message1Opacity = Math.max(0, Math.min(1, (progress - 0.78) / 0.03)) * Math.max(0, Math.min(1, (0.83 - progress) / 0.02))
  const message2Opacity = Math.max(0, Math.min(1, (progress - 0.83) / 0.02)) * Math.max(0, Math.min(1, (0.87 - progress) / 0.02))

  // Phase 7: Incubation Activating Pulse (87% to 92%)
  const activatingOpacity = Math.max(0, Math.min(1, (progress - 0.87) / 0.02)) * Math.max(0, Math.min(1, (0.92 - progress) / 0.02))

  // Phase 8-10: Massive Incubation Reveal (92% to 100%)
  const incubationOpacity = Math.max(0, Math.min(1, (progress - 0.92) / 0.04))
  const isLockedIn = progress >= 0.97

  // Rapid Number Counter for ₹10,00,000 (Calculates between 92% and 97%)
  const numberText = useMemo(() => {
    if (progress < 0.92) return '₹10'
    if (progress < 0.93) return '₹100'
    if (progress < 0.94) return '₹1,000'
    if (progress < 0.95) return '₹10,000'
    if (progress < 0.96) return '₹1,00,000'
    return '₹10,00,000'
  }, [progress])

  return (
    <div id="prizes" className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-6 font-mono-tech text-[#F2F6FF] select-none">
      {/* =========================================================================
          PHASE 0: INITIAL HEADER — ₹12,90,000+ PRIZE POOL (0% - 64%)
          ========================================================================= */}
      <div
        className="w-full max-w-7xl mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-opacity duration-200"
        style={{ opacity: introOpacity }}
      >
        <div className="max-w-xl">
          <SectionLabel tag="BOUNTY PROTOCOL // INITIALIZING" coordinate="ARENA STAKES">
            THE STAKES
          </SectionLabel>
          <h2 className="hero-title text-4xl sm:text-6xl lg:text-7xl text-[#F2F6FF] mt-2 leading-none">
            ₹12,90,000+ <span className="text-[#147DFF] glow-text-blue block sm:inline">PRIZE POOL</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#8CA4C4] max-w-sm">
          Cash bounties, institutional grants, high-spec GPU compute, and seed acceleration for the top engineering squads.
        </p>
      </div>

      {/* =========================================================================
          PHASE 1 - 4: THREE HOLOGRAPHIC REWARD MODULES (20% - 72%)
          ========================================================================= */}
      {progress >= 0.20 && progress <= 0.72 && (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch z-20">
          {/* 1. FIRST PRIZE MODULE: ₹40,000 */}
          {mod1Visible && (
            <div
              className="border border-[#147DFF]/50 bg-[#030E22]/90 backdrop-blur-xl p-6 rounded-sm shadow-[0_0_40px_rgba(20,125,255,0.3)] relative overflow-hidden transition-transform duration-150"
              style={{
                opacity: mod1Progress * (1 - mod1Collapse),
                transform: `translateY(${(1 - mod1Progress) * 30 - mod1Collapse * 60}px) scale(${1 - mod1Collapse * 0.2})`,
              }}
            >
              {/* Scanline & Laser seam */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent animate-pulse" />
              <div className="flex items-center justify-between font-mono-tech text-xs text-[#2695FF] mb-3">
                <span className="border border-[#147DFF]/40 bg-[#061836] px-2 py-0.5 rounded-xs">REWARD // 01</span>
                <span className="text-[#00D9FF] font-bold">CHAMPION (PER THEME)</span>
              </div>
              <div className="text-sm font-mono-tech text-[#8CA4C4] tracking-widest uppercase">FIRST PRIZE</div>
              <div className="hero-title text-4xl sm:text-5xl font-bold text-[#F2F6FF] glow-text-white mt-3 mb-1">
                ₹40,000
              </div>
              <div className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold mb-3">
                FOR EACH THEME TRACK (4 × ₹40,000)
              </div>
              <div className="border-t border-[#147DFF]/20 pt-3 space-y-1.5 text-xs text-[#8CA4C4]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#147DFF] font-bold">›</span> Direct Incubation Protocol Access
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#147DFF] font-bold">›</span> Custom Titanium Hardware Trophy
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#147DFF] font-bold">›</span> VC & Partner Pitch Fast-Track
                </div>
              </div>
            </div>
          )}

          {/* 2. SECOND PRIZE MODULE: ₹20,000 PER THEME */}
          {mod2Visible && (
            <div
              className="border border-[#00D9FF]/40 bg-[#020A1A]/90 backdrop-blur-xl p-6 rounded-sm shadow-[0_0_30px_rgba(0,217,255,0.2)] relative overflow-hidden transition-transform duration-150"
              style={{
                opacity: mod2Progress * (1 - mod2Collapse),
                transform: `translateY(${(1 - mod2Progress) * 30 - mod2Collapse * 60}px) scale(${1 - mod2Collapse * 0.2})`,
              }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#147DFF] to-transparent" />
              <div className="flex items-center justify-between font-mono-tech text-xs text-[#00D9FF] mb-3">
                <span className="border border-[#00D9FF]/30 bg-[#03152E] px-2 py-0.5 rounded-xs">REWARD // 02</span>
                <span className="text-[#8CA4C4]">RUNNER UP (PER THEME)</span>
              </div>
              <div className="text-sm font-mono-tech text-[#8CA4C4] tracking-widest uppercase">SECOND PRIZE</div>
              <div className="hero-title text-4xl sm:text-5xl font-bold text-[#00D9FF] glow-text-cyan mt-3 mb-1">
                ₹20,000
              </div>
              <div className="text-[10px] text-[#00D9FF] tracking-wider uppercase font-bold mb-3">
                FOR EACH THEME TRACK (4 × ₹20,000)
              </div>
              <div className="border-t border-[#147DFF]/20 pt-3 space-y-1.5 text-xs text-[#8CA4C4]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#00D9FF] font-bold">›</span> Founder Mentorship Cohort
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#00D9FF] font-bold">›</span> Cloud Compute Grants
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#00D9FF] font-bold">›</span> Hardware Developer Kits
                </div>
              </div>
            </div>
          )}

          {/* 3. BEST UI/UX DESIGN MODULE: ₹10,000 */}
          {mod3Visible && (
            <div
              className="border border-[#147DFF]/40 bg-[#030D20]/90 backdrop-blur-xl p-6 rounded-sm shadow-[0_0_30px_rgba(20,125,255,0.2)] relative overflow-hidden transition-transform duration-150"
              style={{
                opacity: mod3Progress * (1 - mod3Collapse),
                transform: `translateY(${(1 - mod3Progress) * 30 - mod3Collapse * 60}px) scale(${1 - mod3Collapse * 0.2})`,
              }}
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#2695FF] to-transparent" />
              <div className="flex items-center justify-between font-mono-tech text-xs text-[#2695FF] mb-3">
                <span className="border border-[#147DFF]/30 bg-[#041228] px-2 py-0.5 rounded-xs">SPECIAL REWARD</span>
                <span className="text-[#8CA4C4]">DESIGN</span>
              </div>
              <div className="text-sm font-mono-tech text-[#8CA4C4] tracking-widest uppercase">BEST UI/UX DESIGN</div>
              <div className="hero-title text-4xl sm:text-5xl font-bold text-[#F2F6FF] my-3">
                ₹10,000
              </div>
              <div className="border-t border-[#147DFF]/20 pt-3 space-y-1.5 text-xs text-[#8CA4C4]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#147DFF] font-bold">›</span> Design Lab Recognition
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#147DFF] font-bold">›</span> Pro Design Tool Licenses & Perks
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#147DFF] font-bold">›</span> Special Design Trophy
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bounty Protocol Complete Tag (56% - 64%) */}
      {pauseMessageOpacity > 0.01 && (
        <div
          className="mt-6 text-xs text-[#00D9FF] tracking-[0.25em] bg-[#020C1C]/80 border border-[#00D9FF]/30 px-4 py-1.5 rounded-xs"
          style={{ opacity: pauseMessageOpacity }}
        >
          BOUNTY PROTOCOL // COMPLETE — 3 TIERS STABILIZED
        </div>
      )}

      {/* =========================================================================
          PHASE 5: BOUNTY SYSTEM OFFLINE (72% - 78%)
          ========================================================================= */}
      {offlineOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 pointer-events-none"
          style={{ opacity: offlineOpacity }}
        >
          <div className="text-xs text-[#8CA4C4] tracking-[0.3em] mb-2">SYSTEM TELEMETRY</div>
          <div className="hero-title text-3xl sm:text-5xl text-[#8CA4C4] tracking-widest opacity-80">
            BOUNTY SYSTEM OFFLINE
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 6: THE PHILOSOPHY MESSAGE (78% - 87%)
          ========================================================================= */}
      {/* 78% - 83%: BUT THE REAL REWARD ISN'T THE PRIZE... */}
      {message1Opacity > 0.01 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
          style={{ opacity: message1Opacity }}
        >
          <div className="hero-title text-2xl sm:text-4xl md:text-5xl text-[#8CA4C4] tracking-wider leading-relaxed">
            BUT THE REAL REWARD<br />
            ISN&apos;T THE PRIZE...
          </div>
        </div>
      )}

      {/* 83% - 87%: IT'S WHAT YOU BUILD NEXT. */}
      {message2Opacity > 0.01 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
          style={{ opacity: message2Opacity }}
        >
          <div className="hero-title text-3xl sm:text-5xl md:text-6xl text-[#00D9FF] glow-text-cyan tracking-widest leading-relaxed">
            IT&apos;S WHAT YOU BUILD NEXT.
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 7: INCUBATION PROTOCOL ACTIVATING (87% - 92%)
          ========================================================================= */}
      {activatingOpacity > 0.01 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-30 pointer-events-none"
          style={{ opacity: activatingOpacity }}
        >
          <div className="text-xs sm:text-sm text-[#00D9FF] tracking-[0.3em] bg-[#020B1C]/90 border border-[#00D9FF]/40 px-4 py-1.5 rounded-xs mb-3 shadow-[0_0_25px_rgba(0,217,255,0.4)] animate-pulse">
            // CRITICAL SYSTEM OVERRIDE
          </div>
          <div className="hero-title text-3xl sm:text-5xl text-[#F2F6FF] tracking-wider">
            INCUBATION PROTOCOL <span className="text-[#147DFF] glow-text-blue">ACTIVATING...</span>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 8 - 10: MASSIVE INCUBATION REVEAL — UP TO ₹10,00,000 (92% - 100%)
          ========================================================================= */}
      {incubationOpacity > 0.01 && (
        <div
          className="relative z-30 flex flex-col items-center text-center max-w-4xl px-6 py-12"
          style={{ opacity: incubationOpacity }}
        >
          {/* Header Protocol Tag */}
          <div className="inline-flex items-center gap-2 border border-[#00D9FF]/40 bg-[#020A1A]/90 px-4 py-1.5 text-xs text-[#00D9FF] tracking-[0.25em] rounded-xs shadow-[0_0_20px_rgba(0,217,255,0.3)] mb-4">
            <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-ping" />
            <span>HACKFINIX // INCUBATION PROTOCOL ACTIVE</span>
          </div>

          <div className="text-sm sm:text-base md:text-lg text-[#8CA4C4] tracking-[0.3em] uppercase">
            UP TO
          </div>

          {/* GIGANTIC Rapid Number Counter: ₹10,00,000 */}
          <div className="hero-title text-6xl sm:text-8xl md:text-9xl font-extrabold text-[#F2F6FF] tracking-tight glow-text-white my-3 leading-none scale-105">
            <span className="text-[#00D9FF] glow-text-cyan">{numberText}</span>
          </div>

          <div className="hero-title text-3xl sm:text-5xl md:text-6xl text-[#147DFF] tracking-widest glow-text-blue">
            INCUBATION
          </div>

          {/* Core Takeaway & Message */}
          <div className="mt-8 max-w-2xl border-t border-[#147DFF]/30 pt-6">
            <h3 className="hero-title text-xl sm:text-2xl text-[#F2F6FF] tracking-wider mb-2">
              TURN YOUR HACK INTO A STARTUP.
            </h3>
            <p className="text-xs sm:text-sm text-[#8CA4C4] leading-relaxed">
              Selected ideas may receive institutional incubation support, direct VC pitch access, and funding of up to <strong className="text-[#00D9FF]">₹10,00,000</strong>.
            </p>
          </div>

          {/* Lock confirmation indicator */}
          {isLockedIn && (
            <div className="mt-6 flex items-center gap-2 text-xs text-[#00D9FF] border border-[#00D9FF]/20 bg-[#04142D]/60 px-3.5 py-1.5 rounded-sm animate-pulse">
              <ShieldCheck size={14} className="text-[#00D9FF]" />
              <span>PROTOCOL LOCKED // SEED ACCELERATION WINDOW READY</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

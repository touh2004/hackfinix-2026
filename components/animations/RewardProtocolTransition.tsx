'use client'

import { useMemo } from 'react'

interface RewardProtocolTransitionProps {
  progress: number // 0.0 to 1.0 scrubbed by scroll
}

/**
 * RewardProtocolTransition:
 * Full-viewport cinematic scroll-driven transition from COUNTDOWN TO IGNITION into ₹3,00,000+ PRIZE POOL.
 *
 * Scored Stages:
 * 0% - 25%   -> Countdown normally visible (overlay passive / transparent)
 * 25% - 40%  -> Countdown intensifies, electric blue energy builds up, scanning lines & cyber telemetry active
 * 40% - 55%  -> T-00:00:00 IGNITION COMPLETE system message + central bright electric-blue shockwave pulse
 * 55% - 70%  -> Deep electric-blue holographic layer blankets full viewport (gradients, scanlines, digital noise, streaks)
 * 70% - 80%  -> Centered cinematic protocol typography: "REWARD PROTOCOL // UNLOCKED"
 * 80% - 95%  -> Blue layer transforms into digital portal, splits horizontally and vertically from center, light sweep & particles
 * 95% - 100% -> Full reveal of ₹3,00,000+ Prize Pool underneath, transition layer clears completely
 */
export default function RewardProtocolTransition({ progress = 0 }: RewardProtocolTransitionProps) {
  // If outside active transition window, don't render DOM
  if (progress <= 0.01 || progress >= 0.99) {
    return null
  }

  // Phase 2: Ignition System Alert (40% - 55%)
  const ignitionAlertOpacity = Math.max(0, Math.min(1, (progress - 0.40) / 0.08)) * Math.max(0, Math.min(1, (0.55 - progress) / 0.06))

  // Central Ignition Shockwave Pulse (40% - 58%)
  const pulseActive = progress >= 0.40 && progress <= 0.58
  const pulseProgress = pulseActive ? (progress - 0.40) / 0.18 : 0
  const pulseScale = 0.2 + pulseProgress * 4.5
  const pulseOpacity = pulseActive ? Math.sin(pulseProgress * Math.PI) : 0

  // Phase 3 & 4: Blue Holographic Field Opacity (50% to 92%)
  const blueLayerOpacity = Math.max(0, Math.min(1, (progress - 0.48) / 0.10)) * Math.max(0, Math.min(1, (0.95 - progress) / 0.10))

  // Phase 4: Centered Cyber Protocol Typography (58% - 80%)
  const protocolTextOpacity = Math.max(0, Math.min(1, (progress - 0.58) / 0.08)) * Math.max(0, Math.min(1, (0.80 - progress) / 0.06))
  const step2Active = progress >= 0.65
  const step3Active = progress >= 0.72

  // Phase 5: Digital Portal Splitting (80% - 95%)
  const isSplitting = progress >= 0.80
  const splitProgress = isSplitting ? Math.min(1, (progress - 0.80) / 0.15) : 0
  const splitYOffset = splitProgress * 100 // percentage translateY
  const splitXOffset = splitProgress * 100 // percentage translateX

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center font-mono-tech"
      style={{ opacity: 1 }}
    >
      {/* =========================================================================
          1. INTENSIFYING PERIMETER GLOW & HORIZONTAL LASER SCAN LINES (25% - 50%)
          ========================================================================= */}
      {progress >= 0.25 && progress < 0.60 && (
        <div
          className="absolute inset-0 transition-opacity duration-150"
          style={{ opacity: Math.min(1, (progress - 0.25) / 0.2) }}
        >
          {/* Cyan Vignette Surge */}
          <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(20,125,255,0.4)]" />
          {/* Horizontal Scan Rays */}
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent top-1/3 animate-pulse" />
          <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#147DFF] to-transparent bottom-1/3 animate-pulse" />
        </div>
      )}

      {/* =========================================================================
          2. CENTRAL BRIGHT ELECTRIC-BLUE SHOCKWAVE PULSE (40% - 58%)
          ========================================================================= */}
      {pulseActive && (
        <div
          className="absolute rounded-full border border-[#00D9FF] bg-gradient-to-br from-[#147DFF]/40 via-[#00D9FF]/20 to-transparent blur-md"
          style={{
            width: '600px',
            height: '600px',
            transform: `scale(${pulseScale})`,
            opacity: pulseOpacity * 0.9,
          }}
        />
      )}

      {/* =========================================================================
          3. T-00:00:00 IGNITION COMPLETE ALERT (40% - 55%)
          ========================================================================= */}
      {progress >= 0.40 && progress <= 0.55 && (
        <div
          className="absolute flex flex-col items-center justify-center text-center z-30"
          style={{ opacity: ignitionAlertOpacity }}
        >
          <div className="text-xs sm:text-sm tracking-[0.3em] text-[#00D9FF] bg-[#020B1A]/80 border border-[#00D9FF]/40 px-4 py-1.5 rounded-sm backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(0,217,255,0.4)]">
            T-00:00:00 // TELEMETRY CAP
          </div>
          <div className="hero-title text-4xl sm:text-6xl text-[#F2F6FF] tracking-wider text-glow-white">
            IGNITION <span className="text-[#147DFF] glow-text-blue">COMPLETE</span>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. BLUE HOLOGRAPHIC ENVIRONMENT LAYER & 4-QUADRANT PORTAL SPLIT (50% - 95%)
          ========================================================================= */}
      {progress >= 0.48 && (
        <div
          className="absolute inset-0 z-20"
          style={{ opacity: blueLayerOpacity }}
        >
          {/* Top-Left Quadrant */}
          <div
            className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#020D26]/95 via-[#031842]/90 to-[#020712]/95 backdrop-blur-xl border-r border-b border-[#147DFF]/30 transition-transform"
            style={{
              transform: `translate(${-splitXOffset}%, ${-splitYOffset}%)`,
            }}
          >
            {/* Cyber Corner Grid Detail */}
            <div className="absolute top-6 left-6 text-[10px] text-[#2695FF]/60 tracking-widest">
              SEC_QUAD // 01 · SYSTEM_OVERLAY_ENERGIZED
            </div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-[#00D9FF]/50" />
          </div>

          {/* Top-Right Quadrant */}
          <div
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#020D26]/95 via-[#031842]/90 to-[#020712]/95 backdrop-blur-xl border-l border-b border-[#147DFF]/30 transition-transform"
            style={{
              transform: `translate(${splitXOffset}%, ${-splitYOffset}%)`,
            }}
          >
            <div className="absolute top-6 right-6 text-[10px] text-[#2695FF]/60 tracking-widest text-right">
              REWARD_PORTAL // 02 · MATRIX_SYNCED
            </div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-[#00D9FF]/50" />
          </div>

          {/* Bottom-Left Quadrant */}
          <div
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#020D26]/95 via-[#031842]/90 to-[#020712]/95 backdrop-blur-xl border-r border-t border-[#147DFF]/30 transition-transform"
            style={{
              transform: `translate(${-splitXOffset}%, ${splitYOffset}%)`,
            }}
          >
            <div className="absolute bottom-6 left-6 text-[10px] text-[#00D9FF]/60 tracking-widest">
              PROTOCOL // ACCESS_GRANTED · 2026
            </div>
            <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-[#00D9FF]/50" />
          </div>

          {/* Bottom-Right Quadrant */}
          <div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#020D26]/95 via-[#031842]/90 to-[#020712]/95 backdrop-blur-xl border-l border-t border-[#147DFF]/30 transition-transform"
            style={{
              transform: `translate(${splitXOffset}%, ${splitYOffset}%)`,
            }}
          >
            <div className="absolute bottom-6 right-6 text-[10px] text-[#00D9FF]/60 tracking-widest text-right">
              CHAMBER // UNLOCKING_BOUNTY_GRID
            </div>
            <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-[#00D9FF]/50" />
          </div>

          {/* Horizontal Digital Laser Scan Sweep */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.18)_0%,transparent_70%)]" />
        </div>
      )}

      {/* =========================================================================
          5. CENTERED HOLOGRAPHIC REWARD PROTOCOL TYPOGRAPHY (58% - 80%)
          ========================================================================= */}
      {progress >= 0.58 && progress < 0.82 && (
        <div
          className="relative z-30 flex flex-col items-center text-center max-w-xl px-6"
          style={{ opacity: protocolTextOpacity }}
        >
          {/* Step 1: System Status */}
          <div className="text-[11px] sm:text-xs text-[#8CA4C4] tracking-[0.25em] mb-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00D9FF] animate-ping" />
            <span>SYSTEM STATUS // IGNITION COMPLETE</span>
          </div>

          {/* Step 2: Accessing message */}
          {step2Active && !step3Active && (
            <div className="hero-title text-2xl sm:text-4xl text-[#F2F6FF] tracking-wider my-3 animate-pulse">
              ACCESSING REWARD PROTOCOL...
            </div>
          )}

          {/* Step 3: Unlocked Header */}
          {step3Active && (
            <div className="my-2">
              <div className="hero-title text-3xl sm:text-5xl text-[#00D9FF] tracking-wide glow-text-cyan">
                REWARD PROTOCOL
              </div>
              <div className="hero-title text-3xl sm:text-5xl text-[#F2F6FF] tracking-widest mt-1">
                // UNLOCKED
              </div>
            </div>
          )}

          {/* Holographic Security Gauge bar */}
          <div className="w-48 sm:w-64 h-1 bg-[#041226] border border-[#147DFF]/40 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#147DFF] to-[#00D9FF] transition-all duration-100"
              style={{ width: `${Math.min(100, ((progress - 0.58) / 0.22) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

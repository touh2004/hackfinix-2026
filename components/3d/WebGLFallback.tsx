'use client'

export default function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <div className="relative flex h-80 w-80 items-center justify-center">
        {/* CSS-based fallback orbital rings */}
        <div className="absolute inset-0 rounded-full border border-[#147DFF]/40 animate-orbit-rotate" />
        <div className="absolute inset-8 rounded-full border border-[#2695FF]/60 animate-pulse-slow" />
        <div className="absolute inset-16 rounded-full border border-dashed border-[#00B8D4]/50" />
        <div className="h-16 w-16 rounded-full bg-[#147DFF]/30 shadow-[0_0_50px_#2695FF] backdrop-blur-sm" />
      </div>
    </div>
  )
}

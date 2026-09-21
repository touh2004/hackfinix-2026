import React from 'react'

interface SectionLabelProps {
  children: React.ReactNode
  tag?: string
  coordinate?: string
  className?: string
}

export default function SectionLabel({
  children,
  tag,
  coordinate,
  className = '',
}: SectionLabelProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 font-mono-tech text-xs tracking-widest text-[#8CA4C4] uppercase ${className}`}>
      <span className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#147DFF] shadow-[0_0_8px_#2695FF]" />
        <span className="h-px w-6 bg-[#147DFF]/50" />
      </span>
      <span className="text-[#2695FF] font-semibold">{children}</span>
      {tag && (
        <span className="border border-[#147DFF]/25 bg-[#081A32]/60 px-1.5 py-0.5 text-[10px] text-[#8CA4C4]">
          {tag}
        </span>
      )}
      {coordinate && (
        <span className="hidden sm:inline-block text-[10px] text-[#567299]">
          // {coordinate}
        </span>
      )}
    </div>
  )
}

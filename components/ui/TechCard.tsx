import React from 'react'

interface TechCardProps {
  children: React.ReactNode
  className?: string
  cornerAccents?: boolean
  highlightOnHover?: boolean
  codeTag?: string
  status?: string
}

export default function TechCard({
  children,
  className = '',
  cornerAccents = true,
  highlightOnHover = true,
  codeTag,
  status,
}: TechCardProps) {
  return (
    <div
      className={`glass-panel relative overflow-hidden transition-all duration-300 ${
        cornerAccents ? 'corner-brackets' : ''
      } ${
        highlightOnHover
          ? 'hover:border-[#2695FF]/60 hover:bg-[#081A32]/80 hover:shadow-[0_10px_30px_rgba(2,7,17,0.7),0_0_25px_rgba(20,125,255,0.18)]'
          : ''
      } ${className}`}
    >
      {(codeTag || status) && (
        <div className="flex items-center justify-between border-b border-[#147DFF]/15 bg-[#030B18]/60 px-4 py-2 text-[10px] font-mono-tech text-[#8CA4C4]">
          {codeTag && <span>{codeTag}</span>}
          {status && (
            <span className="flex items-center gap-1.5 text-[#2695FF]">
              <span className="h-1 w-1 rounded-full bg-[#2695FF] shadow-[0_0_6px_#2695FF]" />
              {status}
            </span>
          )}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  )
}

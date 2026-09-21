'use client'

import { useState } from 'react'
import { Radio, Search, ShieldCheck, Cpu } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { teamsData } from '@/data/teams'

interface TeamsProps {
  onHoverTeam?: (teamId: number) => void
}

export default function Teams({ onHoverTeam }: TeamsProps) {
  const [filterTrack, setFilterTrack] = useState<string>('ALL')
  const [activeTeamId, setActiveTeamId] = useState<number | null>(null)

  const filteredTeams = filterTrack === 'ALL'
    ? teamsData
    : teamsData.filter((t) => t.track.toUpperCase() === filterTrack)

  const handleMouseEnter = (id: number) => {
    setActiveTeamId(id)
    if (onHoverTeam) onHoverTeam(id - 1)
  }

  return (
    <section id="the-32" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <SectionLabel tag="ARENA SHORTLIST" coordinate="32 NODES">
            THE 32
          </SectionLabel>
          <h2 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF] mt-3">
            32 TEAMS. <span className="text-[#147DFF]">ONE ARENA.</span>
          </h2>
        </div>

        {/* Track Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 font-mono-tech text-xs">
          {['ALL', 'HUMANITY', 'PLANET', 'BEYOND'].map((track) => (
            <button
              key={track}
              onClick={() => setFilterTrack(track)}
              className={`border px-3 py-1.5 transition-all ${
                filterTrack === track
                  ? 'border-[#2695FF] bg-[#147DFF]/20 text-[#2695FF] shadow-[0_0_12px_rgba(38,149,255,0.4)]'
                  : 'border-[#147DFF]/20 bg-[#061225]/60 text-[#8CA4C4] hover:text-[#F2F6FF]'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* 32 Node Telemetry Status Banner */}
      <div className="mb-6 flex items-center justify-between border border-[#147DFF]/25 bg-[#030B18]/90 p-4 font-mono-tech text-xs text-[#8CA4C4] backdrop-blur-md rounded-sm">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-[#2695FF] animate-pulse" />
          <span>NODES VERIFIED: <strong className="text-[#F2F6FF]">32 / 32 REGISTERED</strong></span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#567299]">
          <span>ENCRYPTION: QUANTUM_RESISTANT</span>
          <span>ARENA STATUS: SYNCHRONIZED</span>
        </div>
      </div>

      {/* The 32 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTeams.map((team) => {
          const isCurrentActive = activeTeamId === team.id

          return (
            <div
              key={team.id}
              onMouseEnter={() => handleMouseEnter(team.id)}
              className={`group relative border p-4 transition-all duration-300 ${
                isCurrentActive
                  ? 'border-[#2695FF] bg-[#081A32] shadow-[0_4px_24px_rgba(38,149,255,0.35)] scale-[1.02]'
                  : 'border-[#147DFF]/20 bg-[#061225]/70 hover:border-[#147DFF]/60 hover:bg-[#061836]'
              }`}
            >
              <div className="flex items-center justify-between font-mono-tech text-[10px] text-[#567299] mb-2">
                <span className="text-[#2695FF] font-bold">{team.code}</span>
                <span className="flex items-center gap-1 text-[#00B8D4]">
                  <span className="h-1 w-1 rounded-full bg-[#00B8D4]" />
                  {team.status}
                </span>
              </div>

              <div className="font-mono-tech text-sm font-bold text-[#F2F6FF] group-hover:text-[#2695FF] transition-colors truncate">
                {team.name}
              </div>

              <div className="mt-2 flex items-center justify-between font-mono-tech text-[10px] text-[#8CA4C4]">
                <span className="truncate">{team.domain}</span>
                <span className="border border-[#147DFF]/20 bg-[#030B18] px-1 text-[9px] text-[#8CA4C4]">
                  {team.track}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

'use client'

import BottomNavbar from '@/components/navigation/BottomNavbar'
import CoreTeamSection, { restTeamMembers } from '@/components/sections/CoreTeamSection'

export default function TeamsPage() {
  return (
    <div className="relative min-h-screen bg-[#01050F] text-[#F2F6FF] overflow-x-hidden font-mono-tech select-none">
      <BottomNavbar />
      <main className="relative z-20">
        <CoreTeamSection membersList={restTeamMembers} />
      </main>
    </div>
  )
}

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import BottomNavbar from '@/components/navigation/BottomNavbar'
import Timeline from '@/components/sections/Timeline'
import MagneticButton from '@/components/ui/MagneticButton'

export default function TimelinePage() {
  return (
    <div className="relative min-h-screen bg-[#020711] text-[#F2F6FF] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid-bg opacity-30" />
      <div className="scanline-overlay fixed inset-0 z-10" />

      <BottomNavbar />

      <main className="relative z-20 pt-20">
        {/* Render the full interactive Timeline component */}
        <Timeline />

        {/* Action navigation links at the bottom */}
        <div className="max-w-7xl mx-auto px-6 pb-24 flex items-center justify-start">
          <MagneticButton href="/" variant="secondary" icon={<ArrowLeft size={15} />}>
            RETURN TO ARENA
          </MagneticButton>
        </div>
      </main>
    </div>
  )
}

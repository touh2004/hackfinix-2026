'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Brain, Globe, Compass, Factory, Shield, Leaf } from 'lucide-react'
import BottomNavbar from '@/components/navigation/BottomNavbar'
import SectionLabel from '@/components/ui/SectionLabel'
import MagneticButton from '@/components/ui/MagneticButton'

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={20} className="text-[#2695FF]" />,
  Globe: <Globe size={20} className="text-[#00B8D4]" />,
  Compass: <Compass size={20} className="text-[#147DFF]" />,
  Factory: <Factory size={20} className="text-[#2695FF]" />,
  Shield: <Shield size={20} className="text-[#00D9FF]" />,
  Leaf: <Leaf size={20} className="text-[#00B8D4]" />,
}

// Custom curated short data for visual premium presentation
interface CuratedTheme {
  id: string
  code: string
  title: string
  description: string
  icon: string
  slug: string
  type: string
  difficulty: string
  sectors: string[]
  coreFocus: string[]
}

const curatedThemes: CuratedTheme[] = [
  {
    id: '01',
    code: 'MSN-01',
    title: 'SMART MANUFACTURING & INDUSTRY 5.0',
    description: 'Optimize production with predictive maintenance, robotics, and industrial IoT.',
    icon: 'Factory',
    slug: 'smart-manufacturing',
    type: 'INDUSTRIAL AI',
    difficulty: 'ADVANCED',
    sectors: ['AUTOMOTIVE', 'AEROSPACE', 'ROBOTICS'],
    coreFocus: ['Predictive Maintenance', 'Factory Efficiency', 'Worker Safety', 'Robotics & IoT'],
  },
  {
    id: '02',
    code: 'MSN-02',
    title: 'HUMAN–AI COLLABORATION',
    description: 'Build augmented systems to increase human productivity and decision-making.',
    icon: 'Brain',
    slug: 'human-ai-collaboration',
    type: 'COGNITIVE COMP',
    difficulty: 'ADVANCED',
    sectors: ['ENTERPRISE', 'IT SERVICES', 'HEALTHCARE'],
    coreFocus: ['Explainable AI', 'Skill Augmentation', 'Safety & Reliability', 'Collaboration Hubs'],
  },
  {
    id: '03',
    code: 'MSN-03',
    title: 'SUSTAINABILITY & GREEN TECHNOLOGIES',
    description: 'Monitor energy, reduce carbon emissions, and minimize waste using analytics.',
    icon: 'Leaf',
    slug: 'sustainability-green-tech',
    type: 'ESG MONITOR',
    difficulty: 'ADVANCED',
    sectors: ['RENEWABLE ENERGY', 'GREEN MFG', 'ESG COMPLIANCE'],
    coreFocus: ['Carbon Tracking', 'Energy Monitoring', 'Waste Reduction', 'ESG Compliance'],
  },
  {
    id: '04',
    code: 'MSN-04',
    title: 'INDUSTRIAL CYBERSECURITY',
    description: 'Secure operational tech, detect network threats, and protect IoT endpoints.',
    icon: 'Shield',
    slug: 'industrial-cybersecurity',
    type: 'CYBER SYSTEM',
    difficulty: 'ADVANCED',
    sectors: ['CLOUD SECURITY', 'OT/IT DEFENSE', 'SOC INTELLIGENCE'],
    coreFocus: ['Threat Detection', 'OT/IT Cyber Defense', 'SOC Dashboards', 'Network Protection'],
  },
]

// -------------------------------------------------------------
// PREMIUM THEME VISUALS (Custom Animated Vector Art)
// -------------------------------------------------------------

const SmartManufacturingVisual = () => (
  <svg className="w-full h-full" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid-m" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(20,125,255,0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-m)" />
    
    {/* Factory Line Nodes */}
    <path d="M 50 120 L 140 60 L 260 60 L 350 120" stroke="rgba(20,125,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 80 110 L 140 70 L 260 70 L 320 110" stroke="rgba(0,217,255,0.1)" strokeWidth="1" strokeLinecap="round" />
    
    {/* Floating Packets */}
    <circle r="3" fill="#00D9FF">
      <animateMotion dur="5s" repeatCount="indefinite" path="M 50 120 L 140 60 L 260 60 L 350 120" />
    </circle>
    <circle r="3" fill="#2695FF">
      <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 350 120 L 260 60 L 140 60 L 50 120" />
    </circle>

    {/* Primary Core Nodes */}
    <g transform="translate(140, 60)">
      <circle r="6" fill="#020711" stroke="#2695FF" strokeWidth="1.5" />
      <circle r="2" fill="#00D9FF" className="animate-pulse" />
    </g>
    <g transform="translate(260, 60)">
      <circle r="6" fill="#020711" stroke="#2695FF" strokeWidth="1.5" />
      <circle r="2" fill="#00D9FF" className="animate-pulse" />
    </g>
  </svg>
)

const HumanAIVisual = () => (
  <svg className="w-full h-full" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid-ai" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(20,125,255,0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-ai)" />
    
    {/* Cognitive / Neural Web */}
    <circle cx="130" cy="80" r="30" stroke="rgba(0,217,255,0.15)" strokeWidth="1.5" />
    <circle cx="270" cy="80" r="30" stroke="rgba(20,125,255,0.15)" strokeWidth="1.5" />
    
    <path d="M 130 80 C 175 40, 225 40, 270 80" stroke="rgba(0,217,255,0.25)" strokeWidth="1" strokeDasharray="3,3" />
    <path d="M 130 80 C 175 120, 225 120, 270 80" stroke="rgba(20,125,255,0.25)" strokeWidth="1" strokeDasharray="3,3" />

    {/* Synapse Pulses */}
    <circle r="2.5" fill="#00D9FF">
      <animateMotion dur="3.5s" repeatCount="indefinite" path="M 130 80 C 175 40, 225 40, 270 80" />
    </circle>
    <circle r="2.5" fill="#2695FF">
      <animateMotion dur="4s" begin="1s" repeatCount="indefinite" path="M 270 80 C 225 120, 175 120, 130 80" />
    </circle>

    {/* Core Connectors */}
    <circle cx="130" cy="80" r="5" fill="#F2F6FF" stroke="#00D9FF" strokeWidth="1.5" />
    <circle cx="270" cy="80" r="5" fill="#020711" stroke="#2695FF" strokeWidth="2" />
  </svg>
)

const SustainabilityVisual = () => (
  <svg className="w-full h-full" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid-s" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,184,212,0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-s)" />
    
    {/* Grid Loops */}
    <circle cx="200" cy="80" r="35" stroke="rgba(0,184,212,0.15)" strokeWidth="1.5" />
    <path d="M 200 45 Q 235 80, 200 115" stroke="rgba(0,184,212,0.3)" strokeWidth="1" />
    <path d="M 200 45 Q 165 80, 200 115" stroke="rgba(0,184,212,0.3)" strokeWidth="1" />
    
    <circle r="2.5" fill="#00B8D4">
      <animateMotion dur="4s" repeatCount="indefinite" path="M 200 45 Q 235 80, 200 115" />
    </circle>
    <circle r="2.5" fill="#00B8D4">
      <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 200 115 Q 165 80, 200 45" />
    </circle>

    {/* Solar Nodes */}
    <circle cx="200" cy="45" r="4.5" fill="#F2F6FF" stroke="#00B8D4" strokeWidth="1.5" />
    <circle cx="200" cy="115" r="4.5" fill="#F2F6FF" stroke="#00B8D4" strokeWidth="1.5" />
  </svg>
)

const CybersecurityVisual = () => (
  <svg className="w-full h-full" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid-sec" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,217,255,0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-sec)" />
    
    {/* Shield Network */}
    <path d="M 200 35 L 245 48 L 245 85 Q 200 112, 155 85 L 155 48 Z" stroke="rgba(0,217,255,0.25)" strokeWidth="2" strokeLinejoin="round" />
    <path d="M 200 42 L 235 52 L 235 80 Q 200 102, 165 80 L 165 52 Z" stroke="#00D9FF" strokeWidth="1" strokeDasharray="3,3" strokeLinejoin="round" />

    {/* Focal Central Point */}
    <circle cx="200" cy="72" r="5" fill="#020711" stroke="#00D9FF" strokeWidth="1.5" />
    <circle cx="200" cy="72" r="2" fill="#F2F6FF" className="animate-pulse" />
  </svg>
)

const ThemeCardVisual = ({ code }: { code: string }) => {
  switch (code) {
    case 'MSN-01': return <SmartManufacturingVisual />
    case 'MSN-02': return <HumanAIVisual />
    case 'MSN-03': return <SustainabilityVisual />
    case 'MSN-04': return <CybersecurityVisual />
    default: return <HumanAIVisual />
  }
}

export default function ThemesIndexPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#020711] text-[#F2F6FF] overflow-x-hidden font-mono-tech">
      {/* Laser HUD Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid-bg opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(20,125,255,0.06)_0%,rgba(2,7,17,1)_85%)]" />
      <div className="scanline-overlay fixed inset-0 z-10 opacity-30 pointer-events-none" />

      {/* Embedded Styles for Scanner Sweep & Spin Orbit */}
      <style>{`
        @keyframes scanner-sweep {
          0% { transform: translateY(-160px); opacity: 0.1; }
          40% { opacity: 0.7; }
          60% { opacity: 0.7; }
          100% { transform: translateY(160px); opacity: 0.1; }
        }
        .card-scanner {
          animation: scanner-sweep 3s infinite linear;
        }
        @keyframes spin-dashed {
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-dashed 12s infinite linear;
        }
      `}</style>

      <BottomNavbar />

      <main className="relative z-20 max-w-7xl mx-auto px-6 pt-28 pb-20 space-y-12">
        
        {/* Header Block */}
        <div 
          className={`space-y-3 transition-all duration-1000 transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <SectionLabel tag="MISSION ARCHIVE // 2026" coordinate="CHALLENGE INDEX">
              SELECT YOUR CHALLENGE
            </SectionLabel>
            
            {/* Status Telemetry */}
            <div className="flex items-center gap-2 border border-[#00B8D4]/30 bg-[#020d20]/80 px-3.5 py-1.5 rounded-sm font-mono-tech text-[10px] text-[#00B8D4] shadow-[0_0_15px_rgba(0,184,212,0.15)] self-start sm:self-center">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00B8D4] animate-pulse" />
              <span>04 ACTIVE MISSIONS // SYSTEM ONLINE</span>
            </div>
          </div>

          <h1 className="hero-title text-2xl sm:text-4xl md:text-5xl text-[#F2F6FF] mt-3 tracking-tight leading-none font-bold">
            FOUR DOMAINS. <br />
            <span className="text-[#147DFF]">INFINITE POSSIBILITIES.</span>
          </h1>

          <p className="mt-3 text-[#8CA4C4] leading-relaxed max-w-xl font-mono-tech text-[11px] sm:text-xs tracking-wider">
            Choose your arena track. Build audaciously. Explore the in-depth mission objectives, problem focuses, and expected stacks below.
          </p>
        </div>

        {/* Challenge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {curatedThemes.map((mission, idx) => {
            const staggerDelay = idx * 150
            return (
              <div
                key={mission.id}
                style={{
                  transitionDelay: `${staggerDelay}ms`,
                }}
                className={`group relative flex flex-col justify-between bg-[#03091b]/95 border border-[#147DFF]/20 hover:border-[#00D9FF]/60 rounded-xs p-6 md:p-8 space-y-6 transition-all duration-500 hover:-translate-y-1.5 shadow-[0_4px_30px_rgba(2,7,17,0.7)] hover:shadow-[0_15px_40px_rgba(20,125,255,0.2),0_0_20px_rgba(0,217,255,0.12)] min-h-[480px] transform ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                {/* HUD Corner Accents */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[#147DFF]/40 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[#147DFF]/40 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[#147DFF]/40 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-[#147DFF]/40 group-hover:border-[#00D9FF] transition-colors pointer-events-none" />

                {/* HUD Technical Label Strip */}
                <div className="flex items-center justify-between font-mono-tech text-[9px] text-[#567299] border-b border-[#147DFF]/15 pb-3">
                  <span>{mission.code}</span>
                  <span className="text-[#00B8D4] flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-[#00B8D4] animate-pulse" />
                    ACTIVE BRIEF
                  </span>
                </div>

                {/* VISUAL COMPONENT BOX */}
                <div className="relative w-full h-40 bg-[#020614]/85 border border-[#147DFF]/15 group-hover:border-[#00D9FF]/35 rounded-xs overflow-hidden flex items-center justify-center transition-all duration-500 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
                  {/* Cyber Scanner Sweeper */}
                  <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none overflow-hidden z-10">
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00D9FF]/30 to-transparent card-scanner" />
                  </div>

                  {/* Custom Graphic */}
                  <ThemeCardVisual code={mission.code} />

                  {/* HUD Focal Icon Container */}
                  <div className="absolute flex h-14 w-14 items-center justify-center rounded-full border border-[#147DFF]/25 bg-[#03091b]/95 group-hover:border-[#00D9FF] transition-all duration-500 shadow-[0_4px_15px_rgba(20,125,255,0.15)] group-hover:shadow-[0_0_25px_rgba(0,217,255,0.35)] z-20">
                    <div className="absolute inset-0.5 rounded-full border border-dashed border-[#00D9FF]/20 animate-spin-slow pointer-events-none" />
                    {iconMap[mission.icon] || <Brain size={20} className="text-[#2695FF]" />}
                  </div>
                </div>

                {/* Title & Highlighted Description Block */}
                <div className="space-y-3">
                  <h3 className="hero-title text-lg sm:text-xl text-[#F2F6FF] tracking-wide leading-tight group-hover:text-[#00D9FF] transition-colors font-bold">
                    {mission.title}
                  </h3>
                  
                  {/* Highlighted Mission Description Callout */}
                  <div className="bg-[#020b1f] border-l-2 border-[#00D9FF] p-3 rounded-xs shadow-[inset_0_0_12px_rgba(0,217,255,0.08)]">
                    <p className="text-xs sm:text-sm text-[#E2EDFF] font-medium leading-relaxed font-sans">
                      {mission.description}
                    </p>
                  </div>
                </div>

                {/* Technical Information Grid */}
                <div className="space-y-4">
                  {/* Industry Sectors Monospace Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {mission.sectors.map((sector, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 border border-[#147DFF]/15 bg-[#040e22]/70 text-[#8CA4C4] group-hover:border-[#2695FF]/30 group-hover:text-[#F2F6FF] rounded-xs text-[9px] font-mono-tech uppercase transition-all duration-300"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>

                  {/* Core Objectives Bullet Modules */}
                  <div className="space-y-1.5">
                    <span className="font-mono-tech text-[8px] text-[#567299] tracking-widest uppercase font-bold block">CORE FOCUS</span>
                    <div className="grid grid-cols-2 gap-2">
                      {mission.coreFocus.map((area, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-1.5 text-[10px] text-[#8CA4C4]"
                        >
                          <span className="h-1 w-1 bg-[#00B8D4] rounded-full shrink-0" />
                          <span className="truncate">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

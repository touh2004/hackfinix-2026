'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, Terminal } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import { faqData } from '@/data/faq'

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <section id="faq" className="relative py-28 px-6 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side Header */}
        <div className="lg:col-span-5 space-y-6">
          <SectionLabel tag="KNOWLEDGE BASE" coordinate="DECRYPT PROTOCOLS">
            GOOD TO KNOW
          </SectionLabel>

          <h2 className="hero-title text-4xl sm:text-6xl text-[#F2F6FF]">
            FREQUENTLY <br />
            <span className="text-[#147DFF]">ASKED QUESTIONS</span>
          </h2>

          <p className="text-sm sm:text-base text-[#8CA4C4] leading-relaxed">
            Everything you need to know about eligibility, hardware rules, accommodations, IP ownership, and hacking logistics.
          </p>

          <div className="border border-[#147DFF]/20 bg-[#061225]/60 p-4 font-mono-tech text-xs text-[#8CA4C4] rounded-sm">
            <div className="flex items-center gap-2 text-[#2695FF] mb-1 font-bold">
              <Terminal size={14} /> STILL HAVE QUESTIONS?
            </div>
            <p className="text-[11px] text-[#567299]">
              Reach our organizing core at{' '}
              <a href="mailto:hello@hackfinix.example" className="text-[#2695FF] underline">
                hello@hackfinix.example
              </a>
            </p>
          </div>
        </div>

        {/* Right Side Accordion List */}
        <div className="lg:col-span-7 space-y-3">
          {faqData.map((item, index) => {
            const isOpen = activeFaq === index

            return (
              <div
                key={item.id}
                className={`glass-panel border transition-all duration-300 rounded ${
                  isOpen
                    ? 'border-[#2695FF]/60 bg-[#061836]/90 shadow-[0_4px_24px_rgba(20,125,255,0.15)]'
                    : 'border-[#147DFF]/15 bg-[#061225]/40 hover:border-[#147DFF]/40'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono-tech text-xs text-[#2695FF]">
                      // {item.id}
                    </span>
                    <span className="font-mono-tech text-sm sm:text-base font-bold text-[#F2F6FF]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-[#2695FF] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#147DFF]/15 p-5 pt-3 text-xs sm:text-sm text-[#8CA4C4] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

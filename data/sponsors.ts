export interface Sponsor {
  name: string
  tier: 'TITANIUM' | 'PLATINUM' | 'GOLD' | 'COMMUNITY'
  description: string
  logoText: string
  url?: string
}

export const sponsorsData = {
  headline: 'BACKED BY COMPUTATIONAL LEADERS',
  subline: 'Powering the next generation of builders with cloud infrastructure, venture mentorship, and APIs.',
  sponsors: [
    { name: 'Vortex Cloud', tier: 'TITANIUM', description: 'Next-Gen GPU Cloud & Inference', logoText: 'VORTEX.AI' },
    { name: 'Synapse Capital', tier: 'TITANIUM', description: 'Early Stage Frontier Tech VC', logoText: 'SYNAPSE' },
    { name: 'OmniChain Network', tier: 'PLATINUM', description: 'Zero-Knowledge Layer 1 Protocol', logoText: 'OMNILAYER' },
    { name: 'Nexus DB', tier: 'PLATINUM', description: 'Ultra-low Latency Vector Database', logoText: 'NEXUS.DB' },
    { name: 'Aether Hardware', tier: 'GOLD', description: 'Edge Microcontroller & Sensor Kits', logoText: 'AETHER' },
    { name: 'HyperScale Systems', tier: 'GOLD', description: 'Distributed Compute Orchestration', logoText: 'HYPERSCALE' },
  ] as Sponsor[],
}

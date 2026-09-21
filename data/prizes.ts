export interface PrizeCategory {
  rank: string
  title: string
  amount: string
  perks: string[]
  badge: string
  featured?: boolean
}

export interface GoodieItem {
  icon: string
  title: string
  description: string
}

export const prizePoolData = {
  totalPrizeValue: '₹12,90,000+',
  totalCash: '₹70,000',
  incubationValue: 'UP TO ₹10,00,000',
  grantPool: '₹2,20,000 in Grants & Cloud Bounties',
  tiers: [
    {
      rank: '01',
      title: 'FIRST PRIZE',
      amount: '₹40,000',
      badge: 'CHAMPION',
      featured: true,
      perks: [
        'Direct Incubation Protocol Access',
        'Titanium Physical Trophy',
        'VC & Partner Pitch Fast-Track',
        'Direct Cloud Compute Grants',
      ],
    },
    {
      rank: '02',
      title: 'SECOND PRIZE',
      amount: '₹20,000',
      badge: 'RUNNER UP',
      featured: false,
      perks: [
        'Founder Mentorship Cohort',
        'Cloud Compute Grants',
        'Hardware Dev Kits',
      ],
    },
    {
      rank: '03',
      title: 'BEST UI/UX DESIGN',
      amount: '₹10,000',
      badge: 'SPECIAL AWARD',
      featured: false,
      perks: [
        'Design Lab Recognition',
        'Design Tool Licenses & Perks',
        'Special Recognition Award',
      ],
    },
  ] as PrizeCategory[],
  specialTracks: [
    { name: 'Best AI / Autonomous Agent', amount: '₹15,000' },
    { name: 'Best Planetary Climate Hack', amount: '₹15,000' },
    { name: 'Best Spatial & Web3 Hack', amount: '₹15,000' },
    { name: 'Best Solo / Underdog Project', amount: '₹10,000' },
  ],
  goodies: [
    {
      icon: 'Shield',
      title: 'Exclusive Cyber Hardware Kit',
      description: 'Limited edition HackFinix custom PCB badge, NFC builder pass, and high-spec hardware accessories.',
    },
    {
      icon: 'Shirt',
      title: 'Heavyweight Merch & Swag',
      description: 'Ultra-premium tailored hacker hoodies, tactical tees, waterproof metallic stickers, and field journals.',
    },
    {
      icon: 'Zap',
      title: 'Fuel & Accommodations',
      description: 'Catered high-protein gourmet meals, artisanal coffee bars, midnight snacks, and private rest pods.',
    },
    {
      icon: 'Server',
      title: 'Cloud & API Compute Credits',
      description: 'Over $2,500+ in AI API credits, vector databases, high-performance GPU nodes, and dev subscriptions.',
    },
  ] as GoodieItem[],
}

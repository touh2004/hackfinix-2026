export interface EventInfo {
  name: string
  edition: string
  year: string
  tagline: string
  subTagline: string
  dates: string
  isoDate: string
  venue: string
  city: string
  coordinates: {
    lat: string
    lng: string
  }
  registrationUrl: string
  discordUrl: string
  durationHours: number
  targetHackers: number
  status: string
}

export const eventData: EventInfo = {
  name: 'HACKFINIX',
  edition: '2026',
  year: '2026',
  tagline: 'BUILD THE IMPOSSIBLE.',
  subTagline: 'A 24-hour digital collision of audacious builders, engineers, and visionaries shaping the next computational frontier.',
  dates: 'SEPTEMBER 24—25, 2026',
  isoDate: '2026-09-24T09:00:00+05:30',
  venue: 'University Grand Arena',
  city: 'Tech Corridor',
  coordinates: {
    lat: '13.0827° N',
    lng: '80.2707° E',
  },
  registrationUrl: '#register',
  discordUrl: 'https://discord.gg/hackfinix',
  durationHours: 24,
  targetHackers: 128,
  status: 'SYSTEMS ONLINE // ARENA READY',
}

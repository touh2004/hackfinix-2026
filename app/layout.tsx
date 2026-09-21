import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import SmoothScroll from '@/components/animations/SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
  title: 'HackFinix 2026 — Build The Impossible',
  description: 'A 36-hour digital collision of audacious builders, engineers, and visionaries shaping the next computational frontier.',
  generator: 'HackFinix',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#020711',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-[#020711]">
      <body className="antialiased bg-[#020711] text-[#F2F6FF]">
        <SmoothScroll>{children}</SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

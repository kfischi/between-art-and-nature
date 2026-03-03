import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'

export const metadata: Metadata = {
  title: 'בין אומנות לטבע — נופש בגליל',
  description: 'מתחמי נופש ייחודיים בגליל המערבי — אחוזת קלמנטין, אחוזה בגליל, צוריאל ופקיעין.',
  openGraph: {
    title: 'בין אומנות לטבע',
    description: 'מתחמי נופש ייחודיים בגליל',
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{
        fontFamily: "'Heebo', sans-serif",
        background: 'var(--soil)',
        color: 'var(--cream)',
      }}>
        <Nav />
        <main>{children}</main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  )
}

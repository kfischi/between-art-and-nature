import { Metadata } from 'next'
import { getLocation } from '@/lib/locations'
import PropertyPage from '@/components/PropertyPage'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const loc = getLocation('pekiin')
  if (!loc) return { title: 'פקיעין — בין אומנות לטבע' }

  return {
    title: `${loc.name} — בין אומנות לטבע`,
    description: loc.description,
    keywords: loc.seoKeywords?.join(', ') || 'פקיעין, אירוח אותנטי, גליל',
    openGraph: {
      title: loc.name,
      description: loc.description,
      images: [{ url: loc.imageFeatured || loc.image, width: 1200, height: 630 }],
      locale: 'he_IL',
      type: 'website',
    },
    alternates: { canonical: `https://between-art-and-nature.netlify.app/pekiin` },
  }
}

export default function Page() {
  const loc = getLocation('pekiin')
  if (!loc) notFound()

  return <PropertyPage loc={loc} />
}

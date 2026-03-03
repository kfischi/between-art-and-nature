import { Metadata } from 'next'
import { getLocation } from '@/lib/locations'
import PropertyPage from '@/components/PropertyPage'

export async function generateMetadata(): Promise<Metadata> {
  const loc = getLocation('tzuriel')!
  return {
    title: `${loc.name} — בין אומנות לטבע`,
    description: loc.description,
    keywords: loc.seoKeywords.join(', '),
    openGraph: {
      title: loc.name,
      description: loc.description,
      images: [{ url: loc.imageFeatured || loc.image, width: 1200, height: 630 }],
      locale: 'he_IL',
      type: 'website',
    },
    alternates: { canonical: `https://between-art-and-nature.netlify.app/tzuriel` },
  }
}

export default function Page() {
  const loc = getLocation('tzuriel')!
  return <PropertyPage loc={loc} />
}

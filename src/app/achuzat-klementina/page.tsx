import { Metadata } from 'next'
import { getLocation } from '@/lib/locations'
import PropertyPage from '@/components/PropertyPage'
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  // קריאה לנתונים ללא כפייה (בלי !)
  const loc = getLocation('achuzat-klementina')
  
  // אם הנכס לא נמצא בקובץ locations.ts, נחזיר מטא-דאטה בסיסי ולא נפיל את האתר
  if (!loc) return { title: 'הנכס לא נמצא' }

  return {
    title: `${loc.name} — בין אומנות לטבע`,
    description: loc.description,
    keywords: loc.seoKeywords?.join(', ') || '',
    openGraph: {
      title: loc.name,
      description: loc.description,
      images: [{ url: loc.imageFeatured || loc.image, width: 1200, height: 630 }],
      locale: 'he_IL',
      type: 'website',
    },
    alternates: { canonical: `https://between-art-and-nature.netlify.app/achuzat-klementina` },
  }
}

export default function Page() {
  const loc = getLocation('achuzat-klementina')
  
  // הגנה קריטית: אם הנתונים חסרים, Next.js יציג דף 404 מעוצב במקום לקרוס ב-Build
  if (!loc) {
    notFound()
  }

  return <PropertyPage loc={loc} />
}

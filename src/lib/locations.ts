// src/lib/locations.ts

export interface LocationData {
  name: string;
  description: string;
  image: string;
  imageFeatured?: string;
  gallery: string[];
  seoKeywords: string[];
}

export const locations: Record<string, LocationData> = {
  'achuzah-bagalil': {
    name: "אחוזה בגליל",
    description: "חוויית אירוח סינמטית המשלבת אדריכלות אבן מקומית עם עיצוב מודרני מינימליסטי.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp",
    gallery: [
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401386/3_tgup62.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401389/4_lx73rn.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401399/8_muhjiq.webp"
    ],
    seoKeywords: ["אחוזה בגליל", "אירוח יוקרה"]
  },
  'pekiin': {
    name: "פקיעין",
    description: "בין סמטאות עתיקות לטבע פראי, מתחם האירוח בפקיעין מציע חיבור עמוק לשורשים.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg",
    gallery: [
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466320/6_gsbvpo.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466325/9_bqxpwo.jpg"
    ],
    seoKeywords: ["פקיעין", "אירוח אותנטי"]
  },
  'tzuriel': {
    name: "אחוזת צוריאל",
    description: "מרחב של שקט ויוקרה במושב צוריאל. עיצוב המשלב חומרים טבעיים ונוחות בלתי מתפשרת.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1771705570/WhatsApp_Image_2026-02-19_at_22.03.38_bbqqag.jpg",
    gallery: [
      "https://res.cloudinary.com/decirk3zb/image/upload/v1771705557/WhatsApp_Image_2026-02-19_at_22.03.37_4_wavzxr.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1771707164/1_q49spa.jpg"
    ],
    seoKeywords: ["אחוזת צוריאל", "וילות יוקרה"]
  },
  'achuzat-klementina': {
    name: "אחוזת קלמנטינה",
    description: "אלגנטיות כפרית בלב המושבה. חוויה אינטימית ועוטפת עם תשומת לב לפרטים הקטנים.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466328/11_xsavtz.jpg",
    gallery: [
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466323/8_vyhyhm.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp"
    ],
    seoKeywords: ["אחוזת קלמנטינה", "חופשה רומנטית"]
  }
};

export function getLocation(slug: string): LocationData | null {
  return locations[slug] || null;
}

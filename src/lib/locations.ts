// src/lib/locations.ts

// הגדרת הטיפוס של נכס - פותר את שגיאת ה-Build
export interface LocationData {
  name: string;
  description: string;
  image: string;
  imageFeatured?: string;
  gallery: string[];
  seoKeywords?: string[]; // השדה שהיה חסר וגרם לשגיאה
}

// שימוש בטיפוס עבור האובייקט
export const locations: Record<string, LocationData> = {
  'achuzah-bagalil': {
    name: "אחוזה בגליל",
    description: "חוויית אירוח סינמטית המשלבת אדריכלות אבן מקומית עם עיצוב מודרני מינימליסטי.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp",
    imageFeatured: "https://res.cloudinary.com/decirk3zb/image/upload/v1772401401/9_mwbfrq.webp",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1772401386/3_tgup62.webp", "https://res.cloudinary.com/decirk3zb/image/upload/v1772401389/4_lx73rn.webp"],
    seoKeywords: ["אחוזה בגליל", "אירוח יוקרה"]
  },
  'pekiin': {
    name: "פקיעין",
    description: "מתחם אירוח המציע חיבור עמוק לשורשים ולאומנות מקומית.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1772466320/6_gsbvpo.jpg"],
    seoKeywords: ["פקיעין", "אירוח אותנטי"]
  },
  'tzuriel': {
    name: "אחוזת צוריאל",
    description: "מרחב של שקט ויוקרה המשלב חומרים טבעיים ונוחות בלתי מתפשרת.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1771705570/WhatsApp_Image_2026-02-19_at_22.03.38_bbqqag.jpg",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1771705557/WhatsApp_Image_2026-02-19_at_22.03.37_4_wavzxr.jpg"],
    seoKeywords: ["אחוזת צוריאל", "וילות יוקרה"]
  },
  'achuzat-klementina': {
    name: "אחוזת קלמנטינה",
    description: "אלגנטיות כפרית בלב המושבה עם תשומת לב לפרטים הקטנים ביותר.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466328/11_xsavtz.jpg",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1772466323/8_vyhyhm.jpg"],
    seoKeywords: ["אחוזת קלמנטינה", "חופשה רומנטית"]
  }
};

export function getLocation(slug: string): LocationData | null {
  return locations[slug] || null;
}

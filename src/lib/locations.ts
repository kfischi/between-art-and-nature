// src/lib/locations.ts

export const locations = {
  'achuzah-bagalil': {
    name: "אחוזה בגליל",
    description: "חוויית אירוח סינמטית המשלבת אדריכלות אבן מקומית עם עיצוב מודרני מינימליסטי.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1772401386/3_tgup62.webp", "https://res.cloudinary.com/decirk3zb/image/upload/v1772401389/4_lx73rn.webp"]
  },
  'pekiin': {
    name: "פקיעין",
    description: "מתחם אירוח המציע חיבור עמוק לשורשים ולאומנות מקומית בסמטאות עתיקות.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1772466320/6_gsbvpo.jpg", "https://res.cloudinary.com/decirk3zb/image/upload/v1772466325/9_bqxpwo.jpg"]
  },
  'tzuriel': {
    name: "אחוזת צוריאל",
    description: "מרחב של שקט ויוקרה המשלב חומרים טבעיים ונוחות בלתי מתפשרת.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1771705570/WhatsApp_Image_2026-02-19_at_22.03.38_bbqqag.jpg",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1771705557/WhatsApp_Image_2026-02-19_at_22.03.37_4_wavzxr.jpg", "https://res.cloudinary.com/decirk3zb/image/upload/v1771707164/1_q49spa.jpg"]
  },
  'achuzat-klementina': {
    name: "אחוזת קלמנטינה",
    description: "אלגנטיות כפרית בלב המושבה עם תשומת לב לפרטים הקטנים ביותר.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466328/11_xsavtz.jpg",
    gallery: ["https://res.cloudinary.com/decirk3zb/image/upload/v1772466323/8_vyhyhm.jpg", "https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp"]
  }
};

export function getLocation(slug: string) {
  return locations[slug as keyof typeof locations] || null;
}

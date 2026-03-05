// src/lib/locations.ts

export const locations = {
  'galilee-estate': {
    name: "אחוזה בגליל",
    description: "חוויית אירוח סינמטית המשלבת אדריכלות אבן מקומית עם עיצוב מודרני מינימליסטי, אל מול נופי הגליל העוצמתיים.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp",
    imageFeatured: "https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp",
    gallery: [
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401385/2_wm9hcm.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401386/3_tgup62.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401389/4_lx73rn.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401391/5_oc93v5.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401392/6_bvifvx.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401396/7_uv1fqk.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401399/8_muhjiq.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401401/9_mwbfrq.webp",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772401403/10_wkxsda.webp"
    ],
    seoKeywords: ["אחוזה בגליל", "אירוח יוקרה", "גליל עליון", "אדריכלות"]
  },
  'pekiin': {
    name: "פקיעין",
    description: "בין סמטאות עתיקות לטבע פראי, מתחם האירוח בפקיעין מציע חיבור עמוק לשורשים ולאומנות מקומית.",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg",
    imageFeatured: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466328/11_xsavtz.jpg",
    gallery: [
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466316/3_bzl0rc.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466316/4_htedhv.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466318/5_u599ne.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466320/6_gsbvpo.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466322/7_a09vce.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466323/8_vyhyhm.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466325/9_bqxpwo.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466327/10_fvnm0t.jpg",
      "https://res.cloudinary.com/decirk3zb/image/upload/v1772466328/11_xsavtz.jpg"
    ],
    seoKeywords: ["פקיעין", "אירוח אותנטי", "סוויטות יוקרה", "אומנות"]
  }
};

// ייצוא הפונקציה ש-Next.js מחפש בדפי ה-page.tsx
export function getLocation(slug: string) {
  const location = locations[slug as keyof typeof locations];
  if (!location) return null;
  return location;
}

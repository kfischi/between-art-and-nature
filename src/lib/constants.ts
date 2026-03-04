export interface Property {
  id: string;
  title: string;
  location: string;
  description: string;
  architect: string;
  images: string[];
  vibe: string;
}

export const ATELIER_PROPERTIES: Property[] = [
  {
    id: "caesarea-villa",
    title: "אחוזת הקיסר",
    location: "Caesarea",
    architect: "Hagit Studio",
    vibe: "Quiet Luxury / Stone / Sea",
    description: "דיאלוג בין בטון חשוף לאבן מקומית, המשקיף אל הים התיכון.",
    images: ["https://images.unsplash.com/photo-1600607687940-477a63bd394c", "/images/caesarea-2.jpg"]
  },
  {
    id: "forest-cabin",
    title: "בקתות היער",
    location: "North",
    architect: "Multibrawn Team",
    vibe: "Organic / Wood / Silence",
    description: "מסתור מבודד בלב חורש טבעי, המעניק תחושת ריחוף בין העצים.",
    images: ["https://images.unsplash.com/photo-1449156001437-3a1661acda22", "/images/forest-2.jpg"]
  }
  // כאן תוסיף את שני הנכסים הנוספים
];

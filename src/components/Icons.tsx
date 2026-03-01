// ─────────────────────────────────────────────────────────
// Luxury SVG Line Icons — stroke-only, 24×24 viewBox
// All icons use stroke="currentColor", fill="none"
// ─────────────────────────────────────────────────────────

type P = { size?: number; color?: string; strokeWidth?: number }
const D = { size: 22, color: 'currentColor', strokeWidth: 1 }

const IconBase = ({ size = D.size, color = D.color, sw = D.strokeWidth, children }: { size?: number; color?: string; sw?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
)

// ── ROOMS ─────────────────────────────────────────────────
export const BedIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M2 9V19M22 9V19M2 14H22M6 14V10A1 1 0 0 1 7 9H17A1 1 0 0 1 18 10V14" />
  <path d="M6 9C6 9 6 7 8 7H12" opacity=".5" />
</IconBase>

export const SuiteIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <rect x="3" y="7" width="18" height="13" rx=".5" />
  <path d="M3 12H21M8 12V20M16 12V20" opacity=".4" />
  <path d="M7 7V5C7 4 8 3 9 3H15C16 3 17 4 17 5V7" />
</IconBase>

export const JacuzziIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M4 20H20" />
  <path d="M4 16C4 16 6 14 8 16C10 18 12 14 14 16C16 18 18 14 20 16" />
  <path d="M8 10C8 10 9 8 10 8M12 9C12 9 13 7 14 7M16 10C16 10 17 9 17 8" opacity=".5" />
  <path d="M3 20V16" />
  <path d="M21 20V16" />
</IconBase>

export const TentIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 3L22 20H2L12 3Z" />
  <path d="M12 3L17 20M12 3L7 20" opacity=".4" />
  <path d="M9 20C9 20 9 16 12 16C15 16 15 20 15 20" />
</IconBase>

export const HouseIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M3 10L12 3L21 10V20H15V15H9V20H3V10Z" />
  <path d="M9 20V15H15V20" opacity=".5" />
</IconBase>

// ── FOR WHO ───────────────────────────────────────────────
export const CoupleIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="9" cy="6" r="2.5" />
  <circle cx="15" cy="6" r="2.5" />
  <path d="M3 20C3 16.5 5.5 14 9 14" />
  <path d="M21 20C21 16.5 18.5 14 15 14" />
  <path d="M9 20H15" />
</IconBase>

export const FamilyIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="8" cy="5" r="2" />
  <circle cx="16" cy="5" r="2" />
  <circle cx="12" cy="16" r="1.5" />
  <path d="M4 20C4 17 6 15 8 15M20 20C20 17 18 15 16 15M8 15C8 15 10 13 12 13C14 13 16 15 16 15" />
  <path d="M10.5 20C10.5 18 11 17 12 17C13 17 13.5 18 13.5 20" opacity=".5" />
</IconBase>

export const StarOfDavidIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <polygon points="12,3 14.5,8 20,8 15.5,11.5 17.5,17 12,13.5 6.5,17 8.5,11.5 4,8 9.5,8" opacity=".3" />
  <path d="M12 4L15 9H9L12 4ZM12 20L9 15H15L12 20Z" />
  <path d="M4.5 9.5L8.5 9.5M15.5 9.5L19.5 9.5" opacity=".5" />
  <path d="M5.5 14.5L8.5 14.5M15.5 14.5L18.5 14.5" opacity=".5" />
</IconBase>

export const EventIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <rect x="3" y="5" width="18" height="16" rx=".5" />
  <path d="M3 10H21" />
  <path d="M8 3V7M16 3V7" />
  <path d="M8 14H16M8 17H13" opacity=".5" />
</IconBase>

export const TeamIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="12" cy="7" r="2.5" />
  <circle cx="5" cy="9" r="2" />
  <circle cx="19" cy="9" r="2" />
  <path d="M2 20C2 17 3.5 15 5 15M22 20C22 17 20.5 15 19 15M7 20C7 17 9 15 12 15C15 15 17 17 17 20" />
</IconBase>

export const MeditationIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="12" cy="5" r="2" />
  <path d="M12 7V11L9 14M12 11L15 14" />
  <path d="M7 16C7 16 9 13 12 13C15 13 17 16 17 16" />
  <path d="M5 19H19" opacity=".3" />
</IconBase>

export const CameraIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <rect x="2" y="7" width="20" height="14" rx="1" />
  <circle cx="12" cy="14" r="3.5" />
  <path d="M8 7L9.5 4H14.5L16 7" />
  <circle cx="18" cy="10" r=".5" fill="currentColor" />
</IconBase>

// ── ATTRACTIONS / NATURE ──────────────────────────────────
export const WaterIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 3C12 3 6 10 6 14.5C6 17.5 8.7 20 12 20C15.3 20 18 17.5 18 14.5C18 10 12 3 12 3Z" />
  <path d="M9 16C9 16 9.5 18 12 18" opacity=".4" />
</IconBase>

export const MountainIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M3 20L9 8L13 14L16 10L21 20H3Z" />
  <path d="M16 10L18 7" opacity=".4" />
  <path d="M13 8L14.5 6" opacity=".3" />
</IconBase>

export const TreeIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 3L20 14H4L12 3Z" />
  <path d="M12 10L18 19H6L12 10Z" />
  <line x1="12" y1="19" x2="12" y2="22" />
</IconBase>

export const ArchIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M4 20V12C4 7.5 8 4 12 4C16 4 20 7.5 20 12V20" />
  <path d="M4 20H20" />
  <path d="M9 20V14C9 12.3 10.3 11 12 11C13.7 11 15 12.3 15 14V20" opacity=".5" />
</IconBase>

export const CastleIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M3 20V9H6V6H8V9H10V6H12V9H14V6H16V9H18V6H21V20H3Z" />
  <path d="M9 20V15H15V20" opacity=".5" />
  <path d="M3 13H21" opacity=".3" />
</IconBase>

export const WineIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M8 3H16L14.5 10C14.5 12.5 13.5 14 12 14C10.5 14 9.5 12.5 9.5 10L8 3Z" />
  <line x1="12" y1="14" x2="12" y2="20" />
  <line x1="9" y1="20" x2="15" y2="20" />
</IconBase>

export const TempleCandleIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <line x1="12" y1="2" x2="12" y2="4" />
  <path d="M10 4H14V18H10V4Z" />
  <path d="M8 18H16" />
  <path d="M6 20H18" />
  <path d="M11 4C11 4 11.5 3 12 3C12.5 3 13 4 13 4" opacity=".5" />
</IconBase>

export const WavesIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M3 10C3 10 5 8 7 10C9 12 11 8 13 10C15 12 17 8 19 10C21 12 22 10 22 10" />
  <path d="M3 15C3 15 5 13 7 15C9 17 11 13 13 15C15 17 17 13 19 15C21 17 22 15 22 15" opacity=".5" />
</IconBase>

export const ScrollIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M6 4H18C19 4 20 5 20 6V18C20 19 19 20 18 20H6C5 20 4 19 4 18V6C4 5 5 4 6 4Z" />
  <path d="M8 8H16M8 12H14M8 16H11" opacity=".5" />
</IconBase>

export const HorseIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M5 20V15L7 12L10 11L13 12L16 10L18 7L20 7" />
  <path d="M13 12L14 15L13 20" opacity=".5" />
  <path d="M16 10C16 10 18 9 18 7C18 5 16 4 16 4L20 5" />
  <circle cx="19" cy="6" r="1" />
</IconBase>

export const AnchorIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="12" cy="6" r="2.5" />
  <line x1="12" y1="8" x2="12" y2="20" />
  <path d="M5 13C5 17 8 20 12 20C16 20 19 17 19 13" />
  <line x1="5" y1="13" x2="19" y2="13" opacity=".4" />
</IconBase>

export const PaletteIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 4C7.5 4 4 7.5 4 12C4 16.5 7.5 20 12 20C13 20 14 19.3 14 18C14 17.4 13.8 16.9 13.8 16.4C13.8 15.6 14.5 15 15.3 15H17C19.2 15 20 14.2 20 12C20 7.5 16.5 4 12 4Z" />
  <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
  <circle cx="12" cy="8" r="1.2" fill="currentColor" stroke="none" />
  <circle cx="16" cy="10" r="1.2" fill="currentColor" stroke="none" />
</IconBase>

export const CaveIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M3 20C3 20 3 14 8 10C11 8 13 8 16 10C19 12 21 16 21 20H3Z" />
  <path d="M9 20V16C9 14.3 10.3 13 12 13C13.7 13 15 14.3 15 16V20" opacity=".4" />
</IconBase>

export const SunsetIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 6V3M6 12H3M21 12H18M7.8 7.8L5.6 5.6M18.4 7.8L16.2 5.6" />
  <path d="M5 17C5 13.7 8.1 11 12 11C15.9 11 19 13.7 19 17H5Z" />
  <line x1="3" y1="20" x2="21" y2="20" opacity=".4" />
</IconBase>

// ── FOOD ──────────────────────────────────────────────────
export const RestaurantIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M17 3V21M17 9H20C20 9 21 8 21 6.5C21 5 20 4 18 4" />
  <path d="M5 3V8C5 10 6 11 7 11V21M9 3V11C10 11 11 10 11 8V3" />
</IconBase>

export const CoffeeIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M6 6H17V16C17 18 15.5 19 14 19H9C7.5 19 6 18 6 16V6Z" />
  <path d="M17 8H19C20.1 8 21 8.9 21 10V11C21 12.1 20.1 13 19 13H17" />
  <path d="M3 21H21" opacity=".3" />
  <path d="M9 3C9 3 9 5 10.5 5C12 5 12 3 12 3" opacity=".4" />
</IconBase>

export const MarketIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M3 6H21L19 14H5L3 6Z" />
  <path d="M3 6L2 3H22" opacity=".4" />
  <path d="M5 14V20H19V14" opacity=".5" />
  <path d="M9 14V18M15 14V18" opacity=".3" />
</IconBase>

export const PizzaIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 3L21 20H3L12 3Z" />
  <path d="M12 3L16.5 20M12 3L7.5 20" opacity=".3" />
  <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
  <circle cx="9" cy="16" r=".8" fill="currentColor" stroke="none" />
  <circle cx="15" cy="16" r=".8" fill="currentColor" stroke="none" />
</IconBase>

// ── AMENITIES (used in features list) ────────────────────
export const PoolIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <rect x="3" y="8" width="18" height="10" rx=".5" />
  <path d="M3 13C3 13 5 11 7 13C9 15 11 11 13 13C15 15 17 11 19 13C21 15 21 13 21 13" />
  <path d="M7 8V5M12 8V4M17 8V5" opacity=".4" />
</IconBase>

export const FireIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 3C12 3 14 7 13 10C15 8 15 6 15 6C15 6 19 10 17 16C16 19 14 21 12 21C10 21 8 19 7 16C5 10 9 6 9 6C9 6 9 9 11 10C10 7 12 3 12 3Z" />
</IconBase>

export const WifiIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M2 9C2 9 6.5 5 12 5C17.5 5 22 9 22 9" />
  <path d="M5 13C5 13 8 10 12 10C16 10 19 13 19 13" opacity=".7" />
  <path d="M8 17C8 17 10 15 12 15C14 15 16 17 16 17" opacity=".5" />
  <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
</IconBase>

export const ParkingIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <rect x="3" y="3" width="18" height="18" rx=".5" />
  <path d="M9 7H14C15.7 7 17 8.3 17 10C17 11.7 15.7 13 14 13H9V7Z" />
  <line x1="9" y1="13" x2="9" y2="17" />
</IconBase>

export const AcIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <rect x="2" y="5" width="20" height="9" rx="1" />
  <path d="M6 14V18M10 14V16M14 14V16M18 14V18" opacity=".5" />
  <path d="M6 10H18" opacity=".3" />
  <circle cx="17" cy="9" r="1.5" />
</IconBase>

export const BBQIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="12" cy="12" r="7" />
  <path d="M5 12H19" />
  <path d="M12 5V12" />
  <path d="M12 12L16 16M12 12L8 16" opacity=".5" />
  <path d="M9 20L10 17M15 20L14 17" opacity=".4" />
  <path d="M8 5C8 5 8 3 10 3M12 4C12 4 12 2 14 2" opacity=".35" />
</IconBase>

export const PeaceIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="12" cy="8" r="3" />
  <path d="M12 11V20" />
  <path d="M7 16L12 14L17 16" opacity=".5" />
</IconBase>

export const MapPinIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <path d="M12 3C8.7 3 6 5.7 6 9C6 13.5 12 21 12 21C12 21 18 13.5 18 9C18 5.7 15.3 3 12 3Z" />
  <circle cx="12" cy="9" r="2.5" />
</IconBase>

export const CompassIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="12" cy="12" r="9" />
  <path d="M16.5 7.5L14 14L7.5 16.5L10 10L16.5 7.5Z" />
</IconBase>

export const SunIcon = (p: P) => <IconBase size={p.size} color={p.color} sw={p.strokeWidth}>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.9 4.9L6.3 6.3M17.7 17.7L19.1 19.1M19.1 4.9L17.7 6.3M6.3 17.7L4.9 19.1" />
</IconBase>

// ── ICON MAP — maps string keys from data to components ───
export const ICON_MAP: Record<string, React.FC<P>> = {
  // rooms
  bed: BedIcon, suite: SuiteIcon, jacuzzi: JacuzziIcon,
  tent: TentIcon, house: HouseIcon,
  // for who
  couple: CoupleIcon, family: FamilyIcon, star: StarOfDavidIcon,
  event: EventIcon, team: TeamIcon, meditation: MeditationIcon, camera: CameraIcon,
  // attractions
  water: WaterIcon, mountain: MountainIcon, tree: TreeIcon,
  arch: ArchIcon, castle: CastleIcon, wine: WineIcon, candle: TempleCandleIcon,
  waves: WavesIcon, scroll: ScrollIcon, horse: HorseIcon, anchor: AnchorIcon,
  palette: PaletteIcon, cave: CaveIcon, sunset: SunsetIcon,
  // food
  restaurant: RestaurantIcon, coffee: CoffeeIcon, market: MarketIcon, pizza: PizzaIcon,
  // misc
  pool: PoolIcon, fire: FireIcon, wifi: WifiIcon, parking: ParkingIcon,
  ac: AcIcon, bbq: BBQIcon, peace: PeaceIcon, pin: MapPinIcon,
  compass: CompassIcon, sun: SunIcon,
}

export function Icon({ name, size, color, strokeWidth }: { name: string } & P) {
  const C = ICON_MAP[name]
  if (!C) return null
  return <C size={size} color={color} strokeWidth={strokeWidth} />
}

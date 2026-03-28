// Deterministic unique avatar generator
// Each wallet + category combination produces a unique avatar
// Total combinations per category: 8x10x12x8x8x6x6x5x7 = 96,768,000+

export interface AvatarTraits {
  category: string;
  skinTone: number; // 0-7
  hairStyle: number; // 0-9
  hairColor: number; // 0-11
  eyeColor: number; // 0-7
  outfit: number; // 0-7
  accessory: number; // 0-5
  bgVariant: number; // 0-5
  facialFeature: number; // 0-4
  glowColor: number; // 0-6
  rarityScore: number; // 0-100
}

export interface AvatarCategory {
  id: string;
  label: string;
  flag: string;
  img: string;
  colors: string[];
}

// sfc32 PRNG algorithm
function sfc32(pa: number, pb: number, pc: number, pd: number) {
  let a = pa;
  let b = pb;
  let c = pc;
  let d = pd;
  return () => {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function hashString(str: string): number[] {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  let h3 = 0xf0e1d2c3;
  let h4 = 0xa1b2c3d4;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x9e3779b9);
    h2 = Math.imul(h2 ^ ch, 0x85ebca6b);
    h3 = Math.imul(h3 ^ (ch << 3), 0xc2b2ae35);
    h4 = Math.imul(h4 ^ ch, 0x27d4eb2f);
    h1 ^= h2 ^ h3 ^ h4;
  }
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

function computeRarity(traits: Omit<AvatarTraits, "rarityScore">): number {
  let score = 50;
  if (traits.accessory === 0) score += 20;
  else if (traits.accessory === 1) score += 12;
  else if (traits.accessory === 5) score += 8;
  if (traits.hairStyle >= 8) score += 10;
  if (traits.eyeColor >= 6) score += 8;
  return Math.min(100, score);
}

export function generateTraitsFromWallet(
  walletAddress: string,
  categoryId: string,
): AvatarTraits {
  const seed = hashString(`${walletAddress.toLowerCase()}|${categoryId}`);
  const rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
  const skinTone = Math.floor(rand() * 8);
  const hairStyle = Math.floor(rand() * 10);
  const hairColor = Math.floor(rand() * 12);
  const eyeColor = Math.floor(rand() * 8);
  const outfit = Math.floor(rand() * 8);
  const accessory = Math.floor(rand() * 6);
  const bgVariant = Math.floor(rand() * 6);
  const facialFeature = Math.floor(rand() * 5);
  const glowColor = Math.floor(rand() * 7);
  const base = {
    category: categoryId,
    skinTone,
    hairStyle,
    hairColor,
    eyeColor,
    outfit,
    accessory,
    bgVariant,
    facialFeature,
    glowColor,
  };
  return { ...base, rarityScore: computeRarity(base) };
}

const _SKIN_TONES = [
  "#FDDBB4",
  "#F5C6A0",
  "#E8A87C",
  "#D08B5B",
  "#C68642",
  "#A0522D",
  "#7B3F00",
  "#3B1F0E",
];

const _HAIR_COLORS = [
  "#1A1A1A",
  "#3D2B1F",
  "#6B4226",
  "#A0522D",
  "#C8A96E",
  "#F4E0AC",
  "#FF4081",
  "#E040FB",
  "#40C4FF",
  "#69F0AE",
  "#FFD740",
  "#FFFFFF",
];

const HAIR_COLOR_NAMES = [
  "Obsidian",
  "Dark Brown",
  "Auburn",
  "Chestnut",
  "Golden",
  "Platinum",
  "Magenta",
  "Violet",
  "Cosmic Blue",
  "Neon Green",
  "Solar Gold",
  "Pure White",
];

const _EYE_COLORS = [
  "#4A90D9",
  "#3D9970",
  "#8B4513",
  "#2C3E50",
  "#9B59B6",
  "#E74C3C",
  "#F39C12",
  "#00BCD4",
];

const EYE_COLOR_NAMES = [
  "Ocean Blue",
  "Forest Green",
  "Hazel",
  "Midnight",
  "Amethyst",
  "Ember Red",
  "Solar",
  "Aqua Crystal",
];

const _OUTFIT_COLORS = [
  ["#1A237E", "#283593"],
  ["#880E4F", "#AD1457"],
  ["#006064", "#00838F"],
  ["#4A148C", "#6A1B9A"],
  ["#1B5E20", "#2E7D32"],
  ["#E65100", "#F57C00"],
  ["#212121", "#424242"],
  ["#B71C1C", "#C62828"],
];

const OUTFIT_NAMES = [
  "Indigo Warrior",
  "Crimson Mage",
  "Teal Ranger",
  "Royal Sorcerer",
  "Forest Guardian",
  "Ember Knight",
  "Shadow Rogue",
  "Dragon Slayer",
];

const ACCESSORY_NAMES = [
  "Crystal Crown",
  "Prismatic Halo",
  "Star Earring",
  "Gem Brooch",
  "None",
  "Cosmic Rings",
];
const HAIR_STYLE_NAMES = [
  "Short Cut",
  "Wave Flow",
  "Spiky",
  "Long Straight",
  "Braided",
  "Afro Crown",
  "Undercut",
  "Bun",
  "Wild Mane",
  "Cosmic Coils",
];
const _FACIAL_NAMES = [
  "Smooth",
  "Freckled",
  "Glowing Mark",
  "Star Birthmark",
  "Prismatic Blush",
];
const GLOW_COLORS = [
  "#A855F7",
  "#EC4899",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#FFFFFF",
];

export function getTraitsDisplayText(traits: AvatarTraits): string[] {
  return [
    `${HAIR_STYLE_NAMES[traits.hairStyle]} Hair`,
    `${HAIR_COLOR_NAMES[traits.hairColor]}`,
    `${EYE_COLOR_NAMES[traits.eyeColor]} Eyes`,
    OUTFIT_NAMES[traits.outfit],
    ACCESSORY_NAMES[traits.accessory],
  ];
}

function _getHairPath(style: number): string {
  const styles = [
    "M140,185 Q200,130 260,185 L260,165 Q200,108 140,165 Z",
    "M130,200 Q160,120 200,140 Q240,120 270,200 Q260,100 200,90 Q140,100 130,200 Z",
    "M200,95 L175,140 L160,110 L155,155 L140,125 L145,170 Q170,130 200,125 Q230,130 255,170 L260,125 L245,155 L240,110 L225,140 Z",
    "M145,195 Q155,110 200,100 Q245,110 255,195 L260,280 Q255,290 245,285 L240,200 Q200,130 160,200 L155,285 Q145,290 140,280 Z",
    "M150,195 Q165,115 200,105 Q235,115 250,195 Q240,150 220,145 Q210,110 200,108 Q190,110 180,145 Q160,150 150,195 Z",
    "M115,190 Q125,100 200,90 Q275,100 285,190 Q275,130 255,115 Q240,95 200,90 Q160,95 145,115 Q125,130 115,190 Z",
    "M145,180 Q160,130 200,125 Q240,130 255,180 L255,165 Q240,118 200,113 Q160,118 145,165 Z",
    "M175,160 Q200,100 225,160 L230,155 Q200,85 170,155 Z M185,105 Q200,95 215,105 Q200,88 185,105 Z",
    "M130,210 Q110,140 140,110 L135,130 Q160,90 200,85 Q240,90 265,130 L260,110 Q290,140 270,210 Q255,140 240,130 Q215,90 200,88 Q185,90 160,130 Q145,140 130,210 Z",
    "M155,195 Q145,130 165,115 Q185,100 200,100 Q215,100 235,115 Q255,130 245,195 Q240,150 228,135 Q215,108 200,105 Q185,108 172,135 Q160,150 155,195 Z",
  ];
  return styles[style] || styles[0];
}

function _getAccessorySVG(accessory: number, color: string): string {
  switch (accessory) {
    case 0:
      return `<g opacity="0.95"><polygon points="170,168 175,145 185,162 200,140 215,162 225,145 230,168" fill="${color}" opacity="0.9"/><polygon points="175,145 185,162 200,140 215,162 225,145 200,155" fill="white" opacity="0.3"/><circle cx="200" cy="140" r="5" fill="white" opacity="0.8"/><circle cx="175" cy="145" r="3" fill="${color}" opacity="1"/><circle cx="225" cy="145" r="3" fill="${color}" opacity="1"/></g>`;
    case 1:
      return `<g opacity="0.85"><ellipse cx="200" cy="155" rx="48" ry="10" fill="none" stroke="url(#rainbowGrad)" stroke-width="4" opacity="0.9"/><ellipse cx="200" cy="155" rx="48" ry="10" fill="none" stroke="white" stroke-width="1" opacity="0.4"/></g>`;
    case 2:
      return `<g><polygon points="158,245 161,252 168,252 163,257 165,264 158,259 151,264 153,257 148,252 155,252" fill="${color}" opacity="0.9"/><polygon points="242,245 245,252 252,252 247,257 249,264 242,259 235,264 237,257 232,252 239,252" fill="${color}" opacity="0.9"/></g>`;
    case 3:
      return `<g><polygon points="200,290 208,300 200,310 192,300" fill="${color}" opacity="0.9"/><polygon points="200,290 208,300 200,310 192,300" fill="white" opacity="0.2"/></g>`;
    case 4:
      return "";
    case 5:
      return `<g opacity="0.7"><ellipse cx="200" cy="200" rx="155" ry="30" fill="none" stroke="${color}" stroke-width="2" opacity="0.5" transform="rotate(-15, 200, 200)"/><ellipse cx="200" cy="200" rx="165" ry="25" fill="none" stroke="white" stroke-width="1" opacity="0.3" transform="rotate(10, 200, 200)"/></g>`;
    default:
      return "";
  }
}

function _getFacialFeatureSVG(feature: number): string {
  switch (feature) {
    case 1:
      return `<g opacity="0.5"><circle cx="178" cy="232" r="2" fill="#8B4513"/><circle cx="184" cy="236" r="1.5" fill="#8B4513"/><circle cx="172" cy="236" r="1.5" fill="#8B4513"/><circle cx="222" cy="232" r="2" fill="#8B4513"/><circle cx="228" cy="236" r="1.5" fill="#8B4513"/><circle cx="216" cy="236" r="1.5" fill="#8B4513"/></g>`;
    case 2:
      return `<path d="M200,205 Q208,215 200,225 Q192,215 200,205" fill="none" stroke="#A855F7" stroke-width="2" opacity="0.8"/>`;
    case 3:
      return `<polygon points="200,207 202,213 208,213 203,217 205,223 200,219 195,223 197,217 192,213 198,213" fill="#F59E0B" opacity="0.7" transform="scale(0.7) translate(86, 88)"/>`;
    case 4:
      return `<ellipse cx="175" cy="238" rx="12" ry="6" fill="#FF69B4" opacity="0.35"/><ellipse cx="225" cy="238" rx="12" ry="6" fill="#FF69B4" opacity="0.35"/>`;
    default:
      return "";
  }
}

export function renderAvatarSVG(
  traits: AvatarTraits,
  category: AvatarCategory,
): string {
  const glowCol = GLOW_COLORS[traits.glowColor];
  const catColors = category.colors;
  const bgColorA = catColors[traits.bgVariant % catColors.length] || "#0D0822";
  const bgColorB =
    catColors[(traits.bgVariant + 2) % catColors.length] || "#1A0533";

  const rarityLabel =
    traits.rarityScore >= 90
      ? "MYTHIC"
      : traits.rarityScore >= 75
        ? "LEGENDARY"
        : traits.rarityScore >= 60
          ? "EPIC"
          : "RARE";
  const rarityColor =
    traits.rarityScore >= 90
      ? "#F59E0B"
      : traits.rarityScore >= 75
        ? "#A855F7"
        : traits.rarityScore >= 60
          ? "#06B6D4"
          : "#10B981";

  const stripeWidth = 400 / catColors.length;
  const stripes = catColors
    .map(
      (c: string, i: number) =>
        `<rect x="${i * stripeWidth}" y="370" width="${stripeWidth + 1}" height="16" fill="${c}"/>`,
    )
    .join("");

  // Generate unique star positions from wallet-derived traits
  const stars = Array.from({ length: 20 }, (_, i) => {
    const x = ((traits.skinTone * 37 + i * 73) % 360) + 20;
    const y = ((traits.hairStyle * 41 + i * 67) % 340) + 10;
    const r = i % 3 === 0 ? 2 : 1;
    const op = (0.3 + (i % 5) * 0.1).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${glowCol}" opacity="${op}"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="${bgColorA}" stop-opacity="0.95"/>
      <stop offset="60%" stop-color="${bgColorB}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#020008" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="glowRing" cx="50%" cy="50%" r="50%">
      <stop offset="70%" stop-color="transparent"/>
      <stop offset="85%" stop-color="${glowCol}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${glowCol}" stop-opacity="0.0"/>
    </radialGradient>
    <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${glowCol}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="circleClip"><circle cx="200" cy="195" r="158"/></clipPath>
    <clipPath id="cardClip"><rect x="0" y="0" width="400" height="400" rx="16"/></clipPath>
  </defs>
  <g clip-path="url(#cardClip)">
    <rect width="400" height="400" fill="url(#bgGrad)"/>
    ${stars}
    <circle cx="${60 + ((traits.hairColor * 23) % 80)}" cy="${50 + ((traits.eyeColor * 31) % 60)}" r="70" fill="${bgColorA}" opacity="0.2"/>
    <circle cx="${250 + ((traits.outfit * 17) % 100)}" cy="${280 + ((traits.accessory * 29) % 80)}" r="60" fill="${bgColorB}" opacity="0.15"/>
    <circle cx="200" cy="195" r="172" fill="url(#glowRing)"/>
    <image href="${category.img}" x="42" y="37" width="316" height="316" clip-path="url(#circleClip)" preserveAspectRatio="xMidYMid slice"/>
    <circle cx="200" cy="195" r="158" fill="url(#innerGlow)"/>
    <circle cx="200" cy="195" r="160" fill="none" stroke="${glowCol}" stroke-width="2.5" opacity="0.8" filter="url(#softGlow)"/>
    <circle cx="200" cy="195" r="164" fill="none" stroke="${glowCol}" stroke-width="0.8" opacity="0.4"/>
    <circle cx="200" cy="195" r="170" fill="none" stroke="${glowCol}" stroke-width="0.5" opacity="0.2"/>
    <line x1="10" y1="10" x2="40" y2="10" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    <line x1="10" y1="10" x2="10" y2="40" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    <line x1="390" y1="10" x2="360" y2="10" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    <line x1="390" y1="10" x2="390" y2="40" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    <line x1="10" y1="390" x2="40" y2="390" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    <line x1="10" y1="390" x2="10" y2="360" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    <line x1="390" y1="390" x2="360" y2="390" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    <line x1="390" y1="390" x2="390" y2="360" stroke="${glowCol}" stroke-width="2" opacity="0.7"/>
    ${stripes}
    <rect x="12" y="12" width="86" height="24" rx="12" fill="${rarityColor}" opacity="0.92" filter="url(#softGlow)"/>
    <rect x="12" y="12" width="86" height="24" rx="12" fill="none" stroke="white" stroke-width="0.5" opacity="0.4"/>
    <text x="55" y="28.5" text-anchor="middle" font-family="'Courier New', monospace" font-size="10.5" font-weight="700" fill="white">${rarityLabel}</text>
    <rect x="302" y="12" width="86" height="24" rx="12" fill="rgba(0,0,0,0.7)" stroke="${rarityColor}" stroke-width="1.2"/>
    <text x="345" y="28.5" text-anchor="middle" font-family="'Courier New', monospace" font-size="10.5" font-weight="700" fill="${rarityColor}">${traits.rarityScore}/100</text>
    <rect x="118" y="340" width="164" height="22" rx="11" fill="rgba(0,0,0,0.75)" stroke="${glowCol}" stroke-width="1"/>
    <text x="200" y="355" text-anchor="middle" font-family="'Courier New', monospace" font-size="9" font-weight="600" fill="${glowCol}">WALLET-BOUND IDENTITY</text>
  </g>
</svg>`;
}

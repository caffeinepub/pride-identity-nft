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

const SKIN_TONES = [
  "#FDDBB4",
  "#F5C6A0",
  "#E8A87C",
  "#D08B5B",
  "#C68642",
  "#A0522D",
  "#7B3F00",
  "#3B1F0E",
];

const HAIR_COLORS = [
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

const EYE_COLORS = [
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

const OUTFIT_COLORS = [
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

function getHairPath(style: number): string {
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

function getAccessorySVG(accessory: number, color: string): string {
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

function getFacialFeatureSVG(feature: number): string {
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
  const skinColor = SKIN_TONES[traits.skinTone];
  const hairCol = HAIR_COLORS[traits.hairColor];
  const eyeCol = EYE_COLORS[traits.eyeColor];
  const [outfitA, outfitB] = OUTFIT_COLORS[traits.outfit];
  const glowCol = GLOW_COLORS[traits.glowColor];
  const catColors = category.colors;
  const bgColorA = catColors[traits.bgVariant % catColors.length] || "#0D0822";
  const bgColorB =
    catColors[(traits.bgVariant + 2) % catColors.length] || "#1A0533";
  const hairPath = getHairPath(traits.hairStyle);
  const accessorySVG = getAccessorySVG(traits.accessory, glowCol);
  const facialSVG = getFacialFeatureSVG(traits.facialFeature);
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
        `<rect x="${i * stripeWidth}" y="368" width="${stripeWidth + 1}" height="18" fill="${c}"/>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="${bgColorA}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#050112" stop-opacity="1"/>
    </radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="softGlow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="outfitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${outfitA}"/><stop offset="100%" stop-color="${outfitB}"/>
    </linearGradient>
    <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF5B5B"/><stop offset="33%" stop-color="#FFEB3B"/>
      <stop offset="66%" stop-color="#2196F3"/><stop offset="100%" stop-color="#9C27B0"/>
    </linearGradient>
    <clipPath id="circleClip"><circle cx="200" cy="200" r="185"/></clipPath>
  </defs>
  <circle cx="200" cy="200" r="192" fill="none" stroke="${glowCol}" stroke-width="3" opacity="0.6" filter="url(#glow)"/>
  <circle cx="200" cy="200" r="185" fill="none" stroke="${glowCol}" stroke-width="1.5" opacity="0.4"/>
  <circle cx="200" cy="200" r="185" fill="url(#bgGrad)"/>
  <circle cx="200" cy="160" r="120" fill="${bgColorA}" opacity="0.15"/>
  <circle cx="280" cy="280" r="80" fill="${bgColorB}" opacity="0.1"/>
  <g clip-path="url(#circleClip)">
    <ellipse cx="200" cy="360" rx="90" ry="50" fill="url(#outfitGrad)" opacity="0.95"/>
    <rect x="155" y="315" width="90" height="50" fill="url(#outfitGrad)" opacity="0.95" rx="8"/>
    <rect x="188" y="278" width="24" height="42" fill="${skinColor}" rx="4"/>
    <ellipse cx="155" cy="320" rx="38" ry="22" fill="${outfitA}" opacity="0.9"/>
    <ellipse cx="245" cy="320" rx="38" ry="22" fill="${outfitA}" opacity="0.9"/>
    <ellipse cx="200" cy="222" rx="65" ry="72" fill="${skinColor}" filter="url(#softGlow)"/>
    <ellipse cx="136" cy="222" rx="12" ry="15" fill="${skinColor}"/>
    <ellipse cx="264" cy="222" rx="12" ry="15" fill="${skinColor}"/>
    <ellipse cx="200" cy="175" rx="66" ry="20" fill="${hairCol}" opacity="0.3"/>
    <path d="${hairPath}" fill="${hairCol}" filter="url(#softGlow)"/>
    <ellipse cx="178" cy="220" rx="14" ry="12" fill="white" opacity="0.95"/>
    <ellipse cx="178" cy="220" rx="9" ry="10" fill="${eyeCol}"/>
    <ellipse cx="178" cy="220" rx="5" ry="6" fill="#0D0822"/>
    <circle cx="181" cy="217" r="2.5" fill="white" opacity="0.9"/>
    <ellipse cx="222" cy="220" rx="14" ry="12" fill="white" opacity="0.95"/>
    <ellipse cx="222" cy="220" rx="9" ry="10" fill="${eyeCol}"/>
    <ellipse cx="222" cy="220" rx="5" ry="6" fill="#0D0822"/>
    <circle cx="225" cy="217" r="2.5" fill="white" opacity="0.9"/>
    <path d="M197,235 Q200,245 203,235" fill="none" stroke="${skinColor}" stroke-width="2" opacity="0.6"/>
    <path d="M184,252 Q200,265 216,252" fill="none" stroke="#8B4513" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
    ${facialSVG}
    <path d="M178,315 Q200,305 222,315 L216,325 Q200,315 184,325 Z" fill="${bgColorA}" opacity="0.6"/>
    ${accessorySVG}
    <ellipse cx="178" cy="220" rx="14" ry="12" fill="none" stroke="${eyeCol}" stroke-width="1" opacity="0.4"/>
    <ellipse cx="222" cy="220" rx="14" ry="12" fill="none" stroke="${eyeCol}" stroke-width="1" opacity="0.4"/>
  </g>
  <g clip-path="url(#circleClip)">${stripes}</g>
  <rect x="14" y="14" width="80" height="22" rx="11" fill="${rarityColor}" opacity="0.9"/>
  <text x="54" y="29" text-anchor="middle" font-family="monospace" font-size="10" font-weight="700" fill="white">${rarityLabel}</text>
  <rect x="310" y="14" width="76" height="22" rx="11" fill="rgba(0,0,0,0.6)" stroke="${rarityColor}" stroke-width="1"/>
  <text x="348" y="29" text-anchor="middle" font-family="monospace" font-size="10" font-weight="700" fill="${rarityColor}">${traits.rarityScore}/100</text>
</svg>`;
}

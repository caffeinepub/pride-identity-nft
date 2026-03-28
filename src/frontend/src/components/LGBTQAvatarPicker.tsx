import { motion } from "motion/react";
import {
  generateTraitsFromWallet,
  getTraitsDisplayText,
  renderAvatarSVG,
} from "../utils/avatarGenerator";
import type { AvatarCategory, AvatarTraits } from "../utils/avatarGenerator";

const LGBTQ_CATEGORIES: AvatarCategory[] = [
  {
    id: "gay",
    label: "Gay",
    flag: "🏳️‍🌈",
    img: "/assets/generated/lgbtq-gay-male.dim_400x400.png",
    colors: ["#FF5B5B", "#FF9500", "#FFEB3B", "#4CAF50", "#2196F3", "#9C27B0"],
  },
  {
    id: "lesbian",
    label: "Lesbian",
    flag: "🏳️‍🌈",
    img: "/assets/generated/lgbtq-lesbian.dim_400x400.png",
    colors: ["#D52D00", "#EF7627", "#FF9A56", "#D162A4", "#B55690", "#A50062"],
  },
  {
    id: "bisexual",
    label: "Bisexual",
    flag: "💜",
    img: "/assets/generated/lgbtq-bisexual.dim_400x400.png",
    colors: ["#D60270", "#D60270", "#9B4F96", "#0038A8", "#0038A8"],
  },
  {
    id: "trans-woman",
    label: "Trans Woman",
    flag: "⚧️",
    img: "/assets/generated/lgbtq-trans-woman.dim_400x400.png",
    colors: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
  },
  {
    id: "trans-man",
    label: "Trans Man",
    flag: "⚧️",
    img: "/assets/generated/lgbtq-trans-man.dim_400x400.png",
    colors: ["#55CDFC", "#F7A8B8", "#FFFFFF", "#F7A8B8", "#55CDFC"],
  },
  {
    id: "nonbinary",
    label: "Non-Binary",
    flag: "⚧",
    img: "/assets/generated/lgbtq-nonbinary.dim_400x400.png",
    colors: ["#FCF434", "#FFFFFF", "#9C59D1", "#2C2C2C", "#9C59D1"],
  },
  {
    id: "pansexual",
    label: "Pansexual",
    flag: "💗",
    img: "/assets/generated/lgbtq-pansexual.dim_400x400.png",
    colors: ["#FF218C", "#FF218C", "#FFD800", "#21B1FF", "#21B1FF"],
  },
  {
    id: "asexual",
    label: "Asexual",
    flag: "🖤",
    img: "/assets/generated/lgbtq-asexual.dim_400x400.png",
    colors: ["#000000", "#A3A3A3", "#FFFFFF", "#810081", "#810081"],
  },
];

export { LGBTQ_CATEGORIES };

interface LGBTQAvatarPickerProps {
  selected: string | null;
  walletAddress?: string;
  onSelect: (
    categoryId: string,
    traits: AvatarTraits,
    svgDataUrl: string,
  ) => void;
}

function traitsToSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
}

export function LGBTQAvatarPicker({
  selected,
  walletAddress,
  onSelect,
}: LGBTQAvatarPickerProps) {
  const selectedCat = LGBTQ_CATEGORIES.find((c) => c.id === selected);

  const uniqueTraits =
    selectedCat && walletAddress
      ? generateTraitsFromWallet(walletAddress, selectedCat.id)
      : null;

  const uniqueSvg =
    uniqueTraits && selectedCat
      ? renderAvatarSVG(uniqueTraits, selectedCat)
      : null;
  const uniqueDataUrl = uniqueSvg ? traitsToSvgDataUrl(uniqueSvg) : null;
  const traitLabels = uniqueTraits ? getTraitsDisplayText(uniqueTraits) : [];

  const rarityColor = uniqueTraits
    ? uniqueTraits.rarityScore >= 90
      ? "#F59E0B"
      : uniqueTraits.rarityScore >= 75
        ? "#A855F7"
        : uniqueTraits.rarityScore >= 60
          ? "#06B6D4"
          : "#10B981"
    : "#10B981";

  function handleSelect(catId: string) {
    const cat = LGBTQ_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return;
    if (walletAddress) {
      const traits = generateTraitsFromWallet(walletAddress, catId);
      const svg = renderAvatarSVG(traits, cat);
      onSelect(catId, traits, traitsToSvgDataUrl(svg));
    } else {
      const emptyTraits: AvatarTraits = {
        category: catId,
        skinTone: 0,
        hairStyle: 0,
        hairColor: 0,
        eyeColor: 0,
        outfit: 0,
        accessory: 4,
        bgVariant: 0,
        facialFeature: 0,
        glowColor: 0,
        rarityScore: 0,
      };
      onSelect(catId, emptyTraits, cat.img);
    }
  }

  function handleRandom() {
    const cat =
      LGBTQ_CATEGORIES[Math.floor(Math.random() * LGBTQ_CATEGORIES.length)];
    handleSelect(cat.id);
  }

  return (
    <div className="mt-4">
      <div className="text-center mb-5">
        <h4 className="font-bold text-white text-base mb-1">
          🏳️‍🌈 Choose Your LGBTQ+ Identity Avatar
        </h4>
        <p className="text-white/50 text-xs leading-relaxed max-w-[360px] mx-auto">
          Select your community — your unique avatar is generated from your
          wallet address. No two wallets get the same avatar.
        </p>
      </div>

      {/* Category Grid — shows reference images for selection */}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
        {LGBTQ_CATEGORIES.map((cat, i) => {
          const isSelected = selected === cat.id;
          return (
            <motion.button
              key={cat.id}
              data-ocid={`lgbtq.item.${i + 1}`}
              onClick={() => handleSelect(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-center rounded-2xl overflow-hidden cursor-pointer transition-all"
              style={{
                background: isSelected
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.04)",
                border: isSelected
                  ? "2px solid rgba(255,255,255,0.7)"
                  : "1px solid rgba(255,255,255,0.12)",
                boxShadow: isSelected
                  ? "0 0 18px rgba(255,255,255,0.25), 0 0 40px rgba(200,100,255,0.2)"
                  : "none",
                padding: "10px 6px 0 6px",
              }}
            >
              {isSelected && (
                <div
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "linear-gradient(135deg,#a855f7,#ec4899)",
                  }}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    role="img"
                    aria-label="Selected"
                  >
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              <div
                className="rounded-full overflow-hidden mb-2 flex-shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  border: "2px solid rgba(255,255,255,0.15)",
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <span className="text-white text-[10px] font-semibold text-center mb-2 leading-tight px-1">
                {cat.label}
              </span>
              <div className="flex w-full h-2">
                {cat.colors.map((c) => (
                  <div key={c} className="flex-1" style={{ background: c }} />
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Large Preview — shows uniquely generated avatar */}
      <motion.div
        key={selected || "none"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-5 rounded-2xl p-5 flex flex-col items-center"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: uniqueTraits
            ? `1px solid ${rarityColor}55`
            : "1px solid rgba(255,255,255,0.12)",
          boxShadow: uniqueTraits ? `0 0 30px ${rarityColor}22` : "none",
        }}
      >
        <div className="flex w-full h-1 rounded-full overflow-hidden mb-4">
          {[
            "#FF5B5B",
            "#FF9500",
            "#FFEB3B",
            "#4CAF50",
            "#2196F3",
            "#9C27B0",
          ].map((c) => (
            <div key={c} className="flex-1" style={{ background: c }} />
          ))}
        </div>

        {selectedCat ? (
          <>
            <div
              className="rounded-full overflow-hidden mb-3"
              style={{
                width: 160,
                height: 160,
                border: uniqueDataUrl
                  ? `3px solid ${rarityColor}99`
                  : "3px solid rgba(255,255,255,0.25)",
                boxShadow: uniqueDataUrl
                  ? `0 0 30px ${rarityColor}55, 0 0 60px ${rarityColor}22`
                  : "none",
              }}
            >
              <img
                src={uniqueDataUrl || selectedCat.img}
                alt={uniqueDataUrl ? "Your unique avatar" : selectedCat.label}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center mb-2">
              <div className="text-white font-bold text-sm">
                {selectedCat.label} Identity
              </div>
              {uniqueTraits ? (
                <div
                  className="text-[10px] font-bold mt-1 px-3 py-0.5 rounded-full inline-block"
                  style={{
                    color: rarityColor,
                    border: `1px solid ${rarityColor}55`,
                    background: `${rarityColor}15`,
                  }}
                >
                  🔐 Wallet-Bound · Rarity {uniqueTraits.rarityScore}/100
                </div>
              ) : (
                <div className="text-white/50 text-[10px] mt-0.5">
                  Connect wallet to reveal your unique avatar
                </div>
              )}
            </div>

            {uniqueTraits && (
              <div className="text-white/40 text-[10px] mb-2">
                🔐 Your Unique Identity — Wallet-Bound
              </div>
            )}

            {traitLabels.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center mt-1 max-w-[280px]">
                {traitLabels.map((label) => (
                  <span
                    key={label}
                    className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}

            {!walletAddress && (
              <div
                className="mt-3 text-[10px] text-center px-3 py-2 rounded-xl"
                style={{
                  background: "rgba(168,85,247,0.1)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  color: "rgba(168,85,247,0.9)",
                }}
              >
                🔗 Connect wallet to reveal your unique avatar
              </div>
            )}
          </>
        ) : (
          <>
            <div
              className="rounded-full flex items-center justify-center mb-3"
              style={{
                width: 160,
                height: 160,
                background: "rgba(255,255,255,0.06)",
                border: "2px dashed rgba(255,255,255,0.15)",
              }}
            >
              <span className="text-4xl">🏳️‍🌈</span>
            </div>
            <div className="text-white/40 text-xs text-center">
              No identity selected
            </div>
          </>
        )}

        <motion.button
          data-ocid="lgbtq.button"
          onClick={handleRandom}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 px-5 py-2 rounded-xl text-xs font-bold text-white"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))",
            border: "1px solid rgba(168,85,247,0.4)",
            boxShadow: "0 0 12px rgba(168,85,247,0.2)",
          }}
        >
          ✨ Choose for me randomly
        </motion.button>
      </motion.div>
    </div>
  );
}

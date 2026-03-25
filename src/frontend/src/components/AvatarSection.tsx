import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const sampleAvatars = [
  {
    id: "nebula",
    name: "Cosmic Guardian",
    img: "/assets/generated/avatar-1-nebula.dim_400x500.png",
    rarity: "Epic",
    rarityColor: "#8B5CF6",
    rarityScore: 78,
    traits: [
      { label: "Background", value: "Cosmic Nebula" },
      { label: "Symbol", value: "Rainbow Halo" },
      { label: "Character", value: "Non-Binary" },
      { label: "Accessory", value: "Neon Crown" },
      { label: "Rare Trait", value: "Galaxy Aura" },
    ],
  },
  {
    id: "rainbow",
    name: "Pride Warrior",
    img: "/assets/generated/avatar-2-rainbow.dim_400x500.png",
    rarity: "Rare",
    rarityColor: "#22D3EE",
    rarityScore: 62,
    traits: [
      { label: "Background", value: "Rainbow Gradient" },
      { label: "Symbol", value: "Pride Flag" },
      { label: "Character", value: "Queer Hero" },
      { label: "Accessory", value: "Star Cluster" },
      { label: "Rare Trait", value: "Aurora Aura" },
    ],
  },
  {
    id: "golden",
    name: "Golden Legend",
    img: "/assets/generated/avatar-3-golden.dim_400x500.png",
    rarity: "Legendary",
    rarityColor: "#F5C84C",
    rarityScore: 91,
    traits: [
      { label: "Background", value: "Golden Sunset" },
      { label: "Symbol", value: "Solar Infinity" },
      { label: "Character", value: "Guardian" },
      { label: "Accessory", value: "Diamond Crown" },
      { label: "Rare Trait", value: "Butterfly Wings" },
    ],
  },
  {
    id: "galaxy",
    name: "Mythic Transcendent",
    img: "/assets/generated/avatar-4-galaxy.dim_400x500.png",
    rarity: "Mythic",
    rarityColor: "#FF4FD8",
    rarityScore: 97,
    traits: [
      { label: "Background", value: "Galaxy Pink" },
      { label: "Symbol", value: "Infinity Halo" },
      { label: "Character", value: "Transcendent" },
      { label: "Accessory", value: "Ethereal Wings" },
      { label: "Rare Trait", value: "Pink Galaxy" },
    ],
  },
];

const traitCategories = [
  { label: "Background", color: "#22D3EE" },
  { label: "Character style", color: "#FF4FD8" },
  { label: "Identity symbols", color: "#8B5CF6" },
  { label: "Accessories", color: "#F5C84C" },
  { label: "Rare attributes", color: "#34D399" },
];

const rarityTiers = [
  { name: "Mythic", color: "#FF4FD8", pct: 1, count: 1 },
  { name: "Legendary", color: "#F5C84C", pct: 4, count: 4 },
  { name: "Epic", color: "#8B5CF6", pct: 10, count: 10 },
  { name: "Rare", color: "#22D3EE", pct: 20, count: 20 },
  { name: "Uncommon", color: "#34D399", pct: 30, count: 30 },
  { name: "Common", color: "#94A3B8", pct: 35, count: 35 },
];

const liveTraitCategories = [
  { label: "Background", color: "#22D3EE" },
  { label: "Character", color: "#FF4FD8" },
  { label: "Symbol", color: "#8B5CF6" },
  { label: "Accessory", color: "#F5C84C" },
  { label: "Rare Trait", color: "#34D399" },
];

function getTierLabel(score: number) {
  if (score >= 95) return { label: "Mythic", color: "#FF4FD8" };
  if (score >= 85) return { label: "Legendary", color: "#F5C84C" };
  if (score >= 75) return { label: "Epic", color: "#8B5CF6" };
  if (score >= 60) return { label: "Rare", color: "#22D3EE" };
  if (score >= 45) return { label: "Uncommon", color: "#34D399" };
  return { label: "Common", color: "#94A3B8" };
}

function AnimatedBar({
  pct,
  color,
  delay = 0,
}: { pct: number; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className="flex-1 rounded-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.08)", height: "6px" }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${pct}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

function RarityMeterBar({ score, color }: { score: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white/40 text-[10px]">Rarity Score</span>
        <span className="text-[10px] font-bold" style={{ color }}>
          {score}
        </span>
      </div>
      <div
        ref={ref}
        className="rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)", height: "6px" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${score}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function LiveRarityMeter() {
  const [traitScores, setTraitScores] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRarity = () => {
    setIsAnimating(true);
    setTraitScores(
      liveTraitCategories.map(() => Math.floor(Math.random() * 49) + 50),
    );
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const overallScore = traitScores.length
    ? Math.round(traitScores.reduce((a, b) => a + b, 0) / traitScores.length)
    : null;
  const tierInfo = overallScore !== null ? getTierLabel(overallScore) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgba(20,8,50,0.9), rgba(10,5,25,0.95))",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="text-center mb-6">
        <p
          className="text-xs font-bold tracking-[0.3em] uppercase mb-2"
          style={{ color: "#FF4FD8" }}
        >
          Interactive Preview
        </p>
        <h3 className="font-display font-bold text-2xl text-white">
          Your Identity Rarity
        </h3>
        <p className="text-white/50 text-sm mt-1">
          Preview your potential rarity before minting
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {liveTraitCategories.map((cat, i) => (
          <div key={cat.label} className="flex items-center gap-3">
            <span className="text-white/60 text-xs w-20 flex-shrink-0">
              {cat.label}
            </span>
            <div
              className="flex-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)", height: "6px" }}
            >
              <motion.div
                animate={{
                  width:
                    traitScores[i] !== undefined ? `${traitScores[i]}%` : "0%",
                }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: cat.color }}
              />
            </div>
            <span className="text-white/50 text-[10px] w-8 text-right">
              {traitScores[i] !== undefined ? traitScores[i] : "—"}
            </span>
          </div>
        ))}
      </div>

      {overallScore !== null && tierInfo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between rounded-xl p-4 mb-6"
          style={{
            background: `${tierInfo.color}12`,
            border: `1px solid ${tierInfo.color}33`,
          }}
        >
          <div>
            <p className="text-white/50 text-xs">Overall Rarity Score</p>
            <p className="font-display font-extrabold text-3xl text-white mt-0.5">
              {overallScore}
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-full font-bold text-sm tracking-wider"
            style={{
              background: `${tierInfo.color}22`,
              color: tierInfo.color,
              border: `1px solid ${tierInfo.color}44`,
            }}
          >
            {tierInfo.label}
          </div>
        </motion.div>
      )}

      <button
        type="button"
        onClick={generateRarity}
        disabled={isAnimating}
        data-ocid="avatars.rarity.button"
        className="w-full py-3.5 rounded-full font-bold text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #FF4FD8, #8B5CF6, #22D3EE)",
          color: "white",
          boxShadow: "0 0 30px rgba(255,79,216,0.3)",
        }}
      >
        🎲 Generate Random Rarity
      </button>
    </motion.div>
  );
}

export default function AvatarSection() {
  return (
    <section id="avatars" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-pride-gradient uppercase mb-3">
            Pride Avatars
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white">
            Your Unique Pride Avatar
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Each Pride ID automatically generates a unique avatar using
            algorithmic traits. Every avatar is unique and permanently stored on
            the blockchain.
          </p>
        </motion.div>

        {/* Trait categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-14"
        >
          {traitCategories.map((cat) => (
            <span
              key={cat.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border text-sm font-medium text-white/80"
              style={{ borderColor: `${cat.color}33` }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: cat.color }}
              />
              {cat.label}
            </span>
          ))}
        </motion.div>

        {/* Avatar cards with rarity meters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {sampleAvatars.map((avatar, i) => (
            <motion.div
              key={avatar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden group cursor-pointer hover:scale-[1.03] transition-transform"
              style={{
                border: `1px solid ${avatar.rarityColor}44`,
                background: "rgba(10,5,25,0.8)",
              }}
              data-ocid={`avatars.item.${i + 1}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={avatar.img}
                  alt={avatar.name}
                  className="w-full object-cover"
                  style={{ aspectRatio: "4/5" }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(to bottom, transparent 50%, ${avatar.rarityColor}22)`,
                  }}
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white font-bold text-sm truncate">
                    {avatar.name}
                  </p>
                  <span
                    className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: `${avatar.rarityColor}22`,
                      color: avatar.rarityColor,
                      border: `1px solid ${avatar.rarityColor}44`,
                    }}
                  >
                    {avatar.rarity}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {avatar.traits.slice(0, 3).map((trait) => (
                    <div
                      key={trait.label}
                      className="flex justify-between gap-2"
                    >
                      <span className="text-white/40 text-[10px]">
                        {trait.label}
                      </span>
                      <span className="text-white/70 text-[10px] font-medium truncate max-w-[100px]">
                        {trait.value}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Rarity score meter */}
                <RarityMeterBar
                  score={avatar.rarityScore}
                  color={avatar.rarityColor}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-display font-extrabold text-3xl sm:text-4xl text-pride-gradient">
            No two avatars are ever the same.
          </p>
          <p className="text-white/50 mt-2">
            Every avatar is unique and permanently stored on the blockchain.
          </p>
        </motion.div>

        {/* Rarity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <p
              className="text-xs font-bold tracking-[0.3em] uppercase mb-2"
              style={{ color: "#F5C84C" }}
            >
              Supply Breakdown
            </p>
            <h3 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Rarity Distribution
            </h3>
            <p className="text-white/50 mt-2">
              Total supply breakdown across all tiers
            </p>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,8,50,0.9), rgba(10,5,25,0.95))",
              border: "1px solid transparent",
              backgroundClip: "padding-box",
              boxShadow:
                "0 0 0 1px rgba(255,79,216,0.2), 0 0 40px rgba(139,92,246,0.1), inset 0 0 40px rgba(139,92,246,0.03)",
            }}
          >
            <div className="flex flex-col gap-4">
              {rarityTiers.map((tier, i) => (
                <div key={tier.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-28 flex-shrink-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{
                        background: tier.color,
                        boxShadow: `0 0 6px ${tier.color}`,
                      }}
                    />
                    <span className="text-white/80 text-sm font-semibold">
                      {tier.name}
                    </span>
                  </div>
                  <div className="flex-1">
                    <AnimatedBar
                      pct={tier.pct}
                      color={tier.color}
                      delay={i * 0.08}
                    />
                  </div>
                  <span className="text-white/60 text-xs w-8 text-right">
                    {tier.pct}%
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full w-16 text-center"
                    style={{
                      background: `${tier.color}18`,
                      color: tier.color,
                      border: `1px solid ${tier.color}33`,
                    }}
                  >
                    {tier.count} NFT{tier.count !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="text-white/30 text-xs text-center mt-6 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              Rarity is determined algorithmically at mint time. Each ID is
              unique.
            </p>
          </div>
        </motion.div>

        {/* Live Rarity Meter */}
        <LiveRarityMeter />
      </div>
    </section>
  );
}

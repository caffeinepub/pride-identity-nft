import type { PrydoIdWithPhoto } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Crown,
  ExternalLink,
  Hexagon,
  Shield,
  Star,
  User,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { useActor } from "../hooks/useActor";
import { generateTraits } from "./AvatarBuilder";
import AvatarBuilder from "./AvatarBuilder";
import PrydoBadge from "./PrydoBadge";

const walletLabels: Record<string, string> = {
  metamask: "MetaMask",
  trust: "Trust Wallet",
  walletconnect: "WalletConnect",
};

const walletColors: Record<string, string> = {
  metamask: "#F5841F",
  trust: "#3375BB",
  walletconnect: "#3B99FC",
};

export default function ProfilePanel() {
  const {
    address,
    walletType,
    hasMinted,
    identityType,
    isProfileOpen,
    closeProfile,
  } = useWallet();

  const [onChainRecord, setOnChainRecord] = useState<PrydoIdWithPhoto | null>(
    null,
  );
  const [isFetchingOnChain, setIsFetchingOnChain] = useState(false);
  const { actor } = useActor();

  useEffect(() => {
    if (!address || !isProfileOpen || !actor) return;
    setIsFetchingOnChain(true);
    actor
      .getIdByWallet(address)
      .then((rec) => setOnChainRecord(rec))
      .catch(() => setOnChainRecord(null))
      .finally(() => setIsFetchingOnChain(false));
  }, [address, isProfileOpen, actor]);

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const handleMintCTA = () => {
    closeProfile();
    setTimeout(() => {
      document
        .getElementById("mint")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          <motion.div
            key="profile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80]"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
            }}
            onClick={closeProfile}
          />

          <motion.aside
            key="profile-panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-[90] flex flex-col"
            style={{
              background:
                "linear-gradient(160deg, rgba(20,8,50,0.99) 0%, rgba(10,5,25,0.99) 100%)",
              borderLeft: "1px solid rgba(139,92,246,0.25)",
              boxShadow: "-20px 0 80px rgba(0,0,0,0.6)",
            }}
            data-ocid="profile.panel"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(139,92,246,0.2)",
                    border: "1px solid rgba(139,92,246,0.35)",
                  }}
                >
                  <User className="w-4 h-4" style={{ color: "#8B5CF6" }} />
                </div>
                <h2 className="font-display font-bold text-white text-lg tracking-wide">
                  My Prydo ID
                </h2>
              </div>
              <button
                type="button"
                onClick={closeProfile}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all"
                data-ocid="profile.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
              {/* Wallet Info */}
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">
                  Connected Wallet
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <Wallet className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-white text-sm font-semibold">
                        {shortAddress}
                      </span>
                      {walletType && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide"
                          style={{
                            background: `${walletColors[walletType]}22`,
                            color: walletColors[walletType],
                            border: `1px solid ${walletColors[walletType]}44`,
                          }}
                        >
                          {walletLabels[walletType]}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-green-400"
                        style={{ boxShadow: "0 0 5px #22C55E" }}
                      />
                      <span className="text-white/40 text-xs">
                        Polygon Chain
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
                </div>
              </div>

              {/* Prydo ID Status */}
              {hasMinted ? (
                <MintedCard
                  identityType={identityType}
                  address={address}
                  onChainRecord={onChainRecord}
                  isFetchingOnChain={isFetchingOnChain}
                />
              ) : (
                <EmptyState onMintClick={handleMintCTA} />
              )}

              {/* Stats */}
              <div
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
                  Identity Stats
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Reputation",
                      value: hasMinted ? "0" : "2014",
                      icon: Star,
                    },
                    {
                      label: "Community Rank",
                      value: hasMinted ? "—" : "—",
                      icon: Crown,
                    },
                    {
                      label: "DAO Votes",
                      value: hasMinted ? "0" : "—",
                      icon: Shield,
                    },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: "rgba(139,92,246,0.06)",
                        border: "1px solid rgba(139,92,246,0.15)",
                      }}
                    >
                      <Icon
                        className="w-4 h-4 mx-auto mb-1.5"
                        style={{ color: "rgba(139,92,246,0.7)" }}
                      />
                      <p className="font-display font-bold text-lg text-white leading-none">
                        {value}
                      </p>
                      <p className="text-white/35 text-[9px] mt-1 leading-tight">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div
              className="px-6 py-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-white/30 text-[11px] text-center leading-relaxed">
                🔒 Soulbound NFTs cannot be transferred or sold.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MintedCard({
  identityType,
  address,
  onChainRecord,
  isFetchingOnChain,
}: {
  identityType: "avatar" | "realface" | null;
  address: string | null;
  onChainRecord: PrydoIdWithPhoto | null;
  isFetchingOnChain: boolean;
}) {
  const { faceImageUrl } = useWallet();
  const onChainPhotoUrl = onChainRecord?.photo?.getDirectURL() ?? null;
  const mintedAt = onChainRecord?.idRecord?.timestamp
    ? new Date(
        Number(onChainRecord.idRecord.timestamp) / 1_000_000,
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const seed = address ?? "genesis-default";
  const traits = generateTraits(seed, true);

  const faceUrl = onChainPhotoUrl ?? faceImageUrl;

  const artNode =
    identityType === "avatar" ? (
      <AvatarBuilder seed={seed} size={200} isGenesis={true} />
    ) : identityType === "realface" && faceUrl ? (
      <div
        style={{
          width: "200px",
          height: "220px",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <img
          src={faceUrl}
          alt="Face Identity"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    ) : (
      <div
        style={{
          width: "200px",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(245,200,76,0.2), rgba(245,200,76,0.05))",
        }}
      >
        <Hexagon style={{ width: "64px", height: "64px", color: "#F5C84C" }} />
      </div>
    );

  if (isFetchingOnChain) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-3"
      >
        <Skeleton
          className="h-64 w-full rounded-2xl"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <Skeleton
          className="h-4 w-1/2 rounded-full"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="flex flex-col gap-5 items-center"
    >
      {onChainRecord && (
        <div className="flex items-center justify-between w-full">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(41,171,226,0.15)",
              border: "1px solid rgba(41,171,226,0.4)",
              color: "#29ABE2",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ boxShadow: "0 0 5px #29ABE2" }}
            />
            ICP On-Chain
          </div>
          {mintedAt && (
            <span className="text-white/30 text-[10px]">Minted {mintedAt}</span>
          )}
        </div>
      )}
      {/* PrydoBadge replaces NFTCard */}
      <div style={{ paddingTop: 32 }}>
        <PrydoBadge
          variant="genesis"
          name={
            identityType === "realface"
              ? "Real Face Identity"
              : `${traits.hairStyle} Genesis`
          }
          pronouns="They/Them"
          avatarContent={artNode}
          votingPower={150}
        />
      </div>
    </motion.div>
  );
}

function EmptyState({ onMintClick }: { onMintClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl p-6 text-center"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px dashed rgba(255,255,255,0.12)",
      }}
      data-ocid="profile.empty_state"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{
          background: "rgba(139,92,246,0.08)",
          border: "1px dashed rgba(139,92,246,0.25)",
        }}
      >
        <Hexagon className="w-8 h-8 text-white/20" />
      </div>
      <p className="font-display font-bold text-white text-sm mb-1">
        No Prydo ID Found
      </p>
      <p className="text-white/40 text-xs leading-relaxed mb-5">
        You haven't minted a Prydo ID yet. Mint your Genesis ID to establish
        your on-chain identity.
      </p>
      <button
        type="button"
        onClick={onMintClick}
        className="w-full py-3 rounded-full font-bold text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-95"
        style={{
          background: "linear-gradient(135deg, #F5C84C, #F5C84C88)",
          color: "#0a0515",
          boxShadow: "0 0 20px rgba(245,200,76,0.3)",
        }}
        data-ocid="profile.primary_button"
      >
        Mint Genesis ID
      </button>
    </motion.div>
  );
}

import {
  CheckCircle2,
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
import { useWallet } from "../context/WalletContext";

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
          {/* Backdrop */}
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

          {/* Slide-in panel */}
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
                  My Pride ID
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
                      <span className="text-white/40 text-xs">Base Chain</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
                </div>
              </div>

              {/* Pride ID Status */}
              {hasMinted ? (
                <MintedCard identityType={identityType} />
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
}: {
  identityType: "avatar" | "realface" | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(245,200,76,0.1), rgba(10,5,25,0.9))",
        border: "2px solid rgba(245,200,76,0.45)",
        boxShadow: "0 0 40px rgba(245,200,76,0.15)",
      }}
    >
      {/* Gold shimmer accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #F5C84C 0%, transparent 70%)",
          filter: "blur(20px)",
          transform: "translate(20%, -20%)",
        }}
      />

      {/* Active badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
          style={{
            background: "rgba(245,200,76,0.15)",
            color: "#F5C84C",
            border: "1px solid rgba(245,200,76,0.35)",
          }}
        >
          <Crown className="w-2.5 h-2.5" />
          Genesis Pride ID
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
          style={{
            background: "rgba(34,197,94,0.12)",
            color: "#22C55E",
            border: "1px solid rgba(34,197,94,0.3)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            style={{ boxShadow: "0 0 5px #22C55E" }}
          />
          Active
        </span>
      </div>

      {/* Token ID + Identity */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,200,76,0.2), rgba(245,200,76,0.05))",
            border: "2px solid rgba(245,200,76,0.4)",
          }}
        >
          <Hexagon className="w-7 h-7" style={{ color: "#F5C84C" }} />
          <CheckCircle2
            className="w-4 h-4 absolute -bottom-1 -right-1"
            style={{
              color: "#22C55E",
              background: "#0a0515",
              borderRadius: "50%",
            }}
          />
        </div>
        <div>
          <p
            className="font-display font-extrabold text-xl tracking-widest"
            style={{ color: "#F5C84C" }}
          >
            PRYDO #0001
          </p>
          <p className="text-white/55 text-xs mt-0.5">
            {identityType === "realface"
              ? "Real Face Identity"
              : "Avatar Identity"}
          </p>
        </div>
      </div>

      {/* Metadata grid */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Tier", value: "Genesis", color: "#F5C84C" },
          { label: "Chain", value: "Base", color: "#FFFFFF" },
          { label: "Status", value: "Soulbound", color: "#8B5CF6" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl p-2.5 text-center"
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-white/35 text-[9px] uppercase tracking-wider">
              {label}
            </p>
            <p className="font-bold text-xs mt-0.5" style={{ color }}>
              {value}
            </p>
          </div>
        ))}
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
        No Pride ID Found
      </p>
      <p className="text-white/40 text-xs leading-relaxed mb-5">
        You haven't minted a Pride ID yet. Mint your Genesis ID to establish
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

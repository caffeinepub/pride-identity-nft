import { ExternalBlob } from "@/backend";
import {
  CheckCircle2,
  Crown,
  Loader2,
  Lock,
  PartyPopper,
  Shield,
  Sparkles,
  Star,
  Upload,
  User,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { useActor } from "../hooks/useActor";
import { RandomAvatarPreview } from "./AvatarBuilder";

// TODO: Replace with deployed Soulbound NFT contract address on Polygon
const PRYDO_NFT_CONTRACT = "0x0000000000000000000000000000000000000000";

type LocalIdentityType = "real-face" | "avatar" | null;
type MintState = "idle" | "confirming" | "minting" | "success";

const tiers = [
  {
    id: "genesis",
    badge: "GENESIS",
    name: "Genesis Prydo ID",
    subtitle: "For early pioneers of the Prydo ecosystem",
    tierLabel: "GOLD TIER",
    icon: Crown,
    color: "#F5C84C",
    glowClass: "glow-gold",
    borderColor: "rgba(245,200,76,0.4)",
    bgAccent: "rgba(245,200,76,0.08)",
    buttonText: "Mint Genesis ID",
    price: "FREE",
    priceNote: "Supply: 100",
    featured: true,
    live: true,
    features: [
      "Exclusive Genesis member status",
      "Early governance access",
      "Special community recognition",
      "Golden identity badge",
      "Legendary avatar traits",
    ],
  },
  {
    id: "early",
    badge: "EARLY MEMBER",
    name: "Early Member Prydo ID",
    subtitle: "For early adopters joining Prydo",
    tierLabel: "SILVER TIER",
    icon: Star,
    color: "#CBD5E1",
    glowClass: "glow-silver",
    borderColor: "rgba(203,213,225,0.4)",
    bgAccent: "rgba(203,213,225,0.08)",
    buttonText: "Locked - Coming Soon",
    price: "$10",
    priceNote: "Supply: Limited",
    featured: false,
    live: false,
    features: [
      "Early community access",
      "Future governance eligibility",
      "Participation in ecosystem programs",
      "Silver identity badge",
      "Rare avatar traits",
    ],
  },
  {
    id: "basic",
    badge: "BASIC",
    name: "Basic Prydo ID",
    subtitle: "Open membership for everyone",
    tierLabel: "BRONZE TIER",
    icon: Shield,
    color: "#D97706",
    glowClass: "glow-bronze",
    borderColor: "rgba(217,119,6,0.4)",
    bgAccent: "rgba(217,119,6,0.08)",
    buttonText: "Locked - Coming Soon",
    price: "$20",
    priceNote: "Supply: Unlimited",
    featured: false,
    live: false,
    features: [
      "Access to Prydo platform",
      "Community participation",
      "Future identity utilities",
      "Bronze identity badge",
      "Standard avatar traits",
    ],
  },
];

const includedPills = [
  "Unique Avatar",
  "On-Chain Identity",
  "Community Access",
  "Reputation System",
  "Future Ecosystem Benefits",
];

function FaceUploadPanel({
  faceImageFile,
  facePreviewUrl,
  onFileChange,
  onRemove,
}: {
  faceImageFile: File | null;
  facePreviewUrl: string | null;
  onFileChange: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) onFileChange(file!);
    },
    [onFileChange],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileChange(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div
        className="max-w-2xl mx-auto mt-4 rounded-2xl p-5"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(10,5,25,0.85))",
          border: "1px solid rgba(139,92,246,0.25)",
        }}
      >
        <p className="text-center text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-4">
          Upload Your Face Photo
        </p>

        {!faceImageFile ? (
          <button
            type="button"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className="w-full rounded-xl p-8 flex flex-col items-center gap-3 transition-all cursor-pointer"
            style={{
              border: `2px dashed ${isDragging ? "rgba(139,92,246,0.7)" : "rgba(139,92,246,0.3)"}`,
              background: isDragging
                ? "rgba(139,92,246,0.08)"
                : "rgba(139,92,246,0.03)",
            }}
            data-ocid="mint.face.dropzone"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <Upload className="w-6 h-6" style={{ color: "#8B5CF6" }} />
            </div>
            <div className="text-center">
              <p className="text-white/80 text-sm font-semibold">
                Drop your photo here or{" "}
                <span style={{ color: "#8B5CF6" }}>click to upload</span>
              </p>
              <p className="text-white/35 text-xs mt-1">
                JPG, PNG, WEBP — Max 5MB
              </p>
            </div>
          </button>
        ) : (
          <div
            className="flex items-center gap-4 rounded-xl p-4"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <img
              src={facePreviewUrl!}
              alt="Face preview"
              className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              style={{ border: "2px solid rgba(139,92,246,0.5)" }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                {faceImageFile.name}
              </p>
              <p className="text-white/40 text-xs mt-0.5">
                {formatSize(faceImageFile.size)}
              </p>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mt-2 text-[10px] font-bold"
                style={{
                  background: "rgba(34,197,94,0.12)",
                  color: "#22C55E",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                <CheckCircle2 className="w-3 h-3" />
                Photo ready
              </div>
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              data-ocid="mint.face.delete_button"
            >
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileInput}
        />

        {/* Privacy notice */}
        <div
          className="flex items-start gap-2.5 mt-4 px-4 py-3 rounded-xl"
          style={{
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.15)",
          }}
        >
          <Shield
            className="w-4 h-4 flex-shrink-0 mt-0.5"
            style={{ color: "#8B5CF6" }}
          />
          <p className="text-white/50 text-[11px] leading-relaxed">
            Your photo is{" "}
            <span className="text-white/80 font-semibold">encrypted</span>. Only
            a <span className="text-white/80 font-semibold">zk-proof</span> is
            submitted on-chain. We{" "}
            <span className="text-white/80 font-semibold">never store</span>{" "}
            your real face.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MintConfirmModal({
  identityType,
  onConfirm,
  onCancel,
  mintState,
  mintError,
  mintStep,
  icpStored,
}: {
  identityType: LocalIdentityType;
  onConfirm: () => void;
  onCancel: () => void;
  mintState: MintState;
  mintError: string | null;
  mintStep: "polygon" | "icp";
  icpStored: boolean;
}) {
  const { address } = useWallet();
  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  if (mintState === "success") {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-sm rounded-2xl p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(245,200,76,0.12), rgba(10,5,25,0.98))",
            border: "2px solid rgba(245,200,76,0.5)",
            boxShadow: "0 0 60px rgba(245,200,76,0.3)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background: "rgba(245,200,76,0.15)",
              border: "2px solid rgba(245,200,76,0.5)",
            }}
          >
            <PartyPopper className="w-8 h-8" style={{ color: "#F5C84C" }} />
          </div>
          <h3 className="font-display font-bold text-2xl text-white mb-2">
            Genesis ID Minted!
          </h3>
          <p className="text-white/60 text-sm mb-1">
            Your Prydo Genesis ID has been successfully minted as a Soulbound
            Soulbound NFT on Polygon.
          </p>
          <p className="text-white/40 text-xs mb-6 font-mono">{shortAddress}</p>
          <div className="flex gap-2 mb-4">
            <div
              className="flex-1 rounded-xl p-3 text-center"
              style={{
                background: "rgba(245,200,76,0.1)",
                border: "1px solid rgba(245,200,76,0.2)",
              }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                Type
              </p>
              <p className="text-white text-xs font-bold mt-0.5">
                {identityType === "real-face" ? "Real Face" : "Avatar"}
              </p>
            </div>
            <div
              className="flex-1 rounded-xl p-3 text-center"
              style={{
                background: "rgba(245,200,76,0.1)",
                border: "1px solid rgba(245,200,76,0.2)",
              }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                Tier
              </p>
              <p
                className="text-white text-xs font-bold mt-0.5"
                style={{ color: "#F5C84C" }}
              >
                Genesis
              </p>
            </div>
            <div
              className="flex-1 rounded-xl p-3 text-center"
              style={{
                background: "rgba(245,200,76,0.1)",
                border: "1px solid rgba(245,200,76,0.2)",
              }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                Chain
              </p>
              <p className="text-white text-xs font-bold mt-0.5">Polygon</p>
            </div>
          </div>
          {icpStored && (
            <div
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl mb-4"
              style={{
                background: "rgba(41,171,226,0.12)",
                border: "1px solid rgba(41,171,226,0.3)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full bg-cyan-400"
                style={{ boxShadow: "0 0 6px #29ABE2" }}
              />
              <span className="text-cyan-400 text-xs font-bold tracking-wide">
                Stored on ICP ✓
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 rounded-full font-bold text-sm tracking-wide transition-all"
            style={{
              background: "linear-gradient(135deg, #F5C84C, #F5C84C99)",
              color: "#0a0515",
            }}
          >
            View My Identity
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}
    >
      {mintState === "idle" && (
        <button
          type="button"
          aria-label="Close mint modal"
          className="absolute inset-0 w-full h-full cursor-default"
          onClick={onCancel}
        />
      )}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-sm rounded-2xl p-6 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,8,50,0.98), rgba(10,5,25,0.98))",
          border: "2px solid rgba(245,200,76,0.4)",
          boxShadow: "0 0 60px rgba(245,200,76,0.2)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{
            background: "rgba(245,200,76,0.15)",
            border: "1px solid rgba(245,200,76,0.3)",
          }}
        >
          <Crown className="w-6 h-6" style={{ color: "#F5C84C" }} />
        </div>

        <h3 className="font-display font-bold text-xl text-white text-center mb-1">
          Confirm Mint
        </h3>
        <p className="text-white/50 text-xs text-center mb-5">
          You are about to mint your Genesis Prydo ID
        </p>

        <div
          className="rounded-xl p-4 mb-4 flex flex-col gap-2.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="flex justify-between text-xs">
            <span className="text-white/50">NFT Tier</span>
            <span className="font-bold" style={{ color: "#F5C84C" }}>
              Genesis (Gold)
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/50">Identity Type</span>
            <span className="text-white font-semibold">
              {identityType === "real-face"
                ? "Real Face Identity"
                : "Avatar Identity"}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/50">Wallet</span>
            <span className="text-white font-mono">{shortAddress}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/50">Blockchain</span>
            <span className="text-white font-semibold">Polygon</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-white/50">Cost</span>
            <span className="text-green-400 font-bold">FREE</span>
          </div>
        </div>

        <p className="text-white/30 text-[11px] text-center mb-5 leading-relaxed">
          Soulbound NFTs are non-transferable. This ID will be permanently tied
          to your wallet.
        </p>

        {mintState === "minting" ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#F5C84C" }}
            />
            <div className="flex flex-col items-center gap-1">
              <p className="text-white/60 text-sm">
                {mintStep === "polygon"
                  ? "Minting on Polygon..."
                  : "Storing on ICP..."}
              </p>
              <div className="flex items-center gap-2 text-xs text-white/30 mt-1">
                <span
                  className={
                    mintStep === "icp" ? "text-green-400" : "text-white/30"
                  }
                >
                  {mintStep === "icp" ? "✓ Minted on Polygon" : "⏳ Polygon"}
                </span>
                <span className="text-white/20">→</span>
                <span
                  className={
                    mintStep === "icp" ? "text-cyan-400" : "text-white/20"
                  }
                >
                  ICP
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-full font-bold text-xs tracking-wide text-white/60 hover:text-white border border-white/15 hover:border-white/30 transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="flex-1 py-3 rounded-full font-bold text-xs tracking-wide transition-all"
              style={{
                background: "linear-gradient(135deg, #F5C84C, #F5C84C99)",
                color: "#0a0515",
                boxShadow: "0 0 20px rgba(245,200,76,0.4)",
              }}
            >
              Confirm Mint
            </button>
          </div>
        )}
        {mintError && (
          <p className="text-red-400 text-xs text-center mt-3 px-2">
            {mintError}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default function MintSection() {
  const [identityType, setLocalIdentityType] =
    useState<LocalIdentityType>(null);
  const [mintState, setMintState] = useState<MintState>("idle");
  const [showConfirm, setShowConfirm] = useState(false);
  const [faceImageFile, setFaceImageFile] = useState<File | null>(null);
  const [facePreviewUrl, setFacePreviewUrl] = useState<string | null>(null);
  const [mintError, setMintError] = useState<string | null>(null);
  const [mintStep, setMintStep] = useState<"polygon" | "icp">("polygon");
  const [icpStored, setIcpStored] = useState(false);
  const { actor } = useActor();
  const {
    address,
    openModal,
    hasMinted,
    setHasMinted,
    setIdentityType,
    setFaceImageUrl,
  } = useWallet();

  const handleFaceFileChange = (file: File) => {
    if (facePreviewUrl) URL.revokeObjectURL(facePreviewUrl);
    setFaceImageFile(file);
    setFacePreviewUrl(URL.createObjectURL(file));
  };

  const handleFaceRemove = () => {
    if (facePreviewUrl) URL.revokeObjectURL(facePreviewUrl);
    setFaceImageFile(null);
    setFacePreviewUrl(null);
  };

  const handleIdentitySelect = (type: LocalIdentityType) => {
    if (type !== "real-face") handleFaceRemove();
    setLocalIdentityType(type);
  };

  const handleMintClick = () => {
    if (!address) {
      openModal();
      return;
    }
    if (!identityType) {
      document
        .getElementById("identity-selector")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setShowConfirm(true);
    setMintState("idle");
  };

  const handleConfirmMint = async () => {
    if (!(window as any).ethereum) {
      alert(
        "No Web3 wallet detected. Please install MetaMask or Trust Wallet.",
      );
      return;
    }
    setMintError(null);
    setMintStep("polygon");
    setIcpStored(false);
    setMintState("minting");
    try {
      await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: PRYDO_NFT_CONTRACT,
            data: "0x",
            value: "0x0",
          },
        ],
      });

      // Polygon tx succeeded — now store on ICP
      setMintStep("icp");
      let photoBlob: ExternalBlob | null = null;
      if (identityType === "real-face" && faceImageFile) {
        try {
          const bytes = await faceImageFile.arrayBuffer();
          photoBlob = ExternalBlob.fromBytes(new Uint8Array(bytes));
        } catch {
          // ignore photo conversion error
        }
      }
      try {
        await actor?.mintId(
          address ?? "",
          "genesis",
          identityType === "real-face" ? "realface" : "avatar",
          photoBlob,
        );
        setIcpStored(true);
      } catch (icpErr) {
        console.error("ICP store failed:", icpErr);
        // Don't block success — Polygon mint already happened
      }

      setMintState("success");
      setHasMinted(true);
      setIdentityType(identityType === "real-face" ? "realface" : "avatar");
      if (identityType === "real-face" && faceImageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFaceImageUrl((e.target?.result as string) ?? null);
        };
        reader.readAsDataURL(faceImageFile);
      } else {
        setFaceImageUrl(null);
      }
    } catch (err: any) {
      setMintState("idle");
      setMintError(err?.message ?? "Transaction failed. Please try again.");
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setMintState("idle");
  };

  return (
    <section id="mint" className="py-24 relative overflow-hidden">
      {/* Background decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-64 h-64 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #F5C84C 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-64 h-64 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #FF4FD8 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 w-96 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-0 right-1/3 w-48 h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #22C55E 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-pride-gradient uppercase mb-3">
            Prydo ID NFTs
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-wide uppercase">
            Mint Your Prydo ID
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Your Prydo ID is a unique on-chain identity NFT that represents your
            membership in the Prydo ecosystem.
          </p>
        </motion.div>

        {/* Identity Type Selector */}
        <motion.div
          id="identity-selector"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-6"
        >
          <p className="text-center text-white/50 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Choose Your Identity Type
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              type="button"
              onClick={() => handleIdentitySelect("real-face")}
              data-ocid="mint.real_face.toggle"
              className={`relative rounded-2xl p-5 text-left transition-all duration-300 cursor-pointer ${
                identityType === "real-face"
                  ? "ring-2 scale-[1.02]"
                  : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background:
                  identityType === "real-face"
                    ? "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(10,5,25,0.9))"
                    : "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(10,5,25,0.7))",
                border:
                  identityType === "real-face"
                    ? "2px solid rgba(139,92,246,0.7)"
                    : "1px solid rgba(139,92,246,0.2)",
                boxShadow:
                  identityType === "real-face"
                    ? "0 0 30px rgba(139,92,246,0.3), inset 0 0 30px rgba(139,92,246,0.05)"
                    : "none",
              }}
            >
              {identityType === "real-face" && (
                <div
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#8B5CF6" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <User className="w-5 h-5" style={{ color: "#8B5CF6" }} />
              </div>
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider mb-2"
                style={{
                  background: "rgba(139,92,246,0.15)",
                  color: "#8B5CF6",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                ✓ Verified Identity
              </div>
              <h3 className="font-display font-bold text-base text-white mb-1">
                Real Face Identity
              </h3>
              <p className="text-white/55 text-xs leading-relaxed">
                Mint your Soulbound NFT using your real face. Represents your
                verified on-chain identity.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleIdentitySelect("avatar")}
              data-ocid="mint.avatar.toggle"
              className={`relative rounded-2xl p-5 text-left transition-all duration-300 cursor-pointer ${
                identityType === "avatar"
                  ? "ring-2 scale-[1.02]"
                  : "opacity-60 hover:opacity-80"
              }`}
              style={{
                background:
                  identityType === "avatar"
                    ? "linear-gradient(135deg, rgba(255,79,216,0.18), rgba(10,5,25,0.9))"
                    : "linear-gradient(135deg, rgba(255,79,216,0.06), rgba(10,5,25,0.7))",
                border:
                  identityType === "avatar"
                    ? "2px solid rgba(255,79,216,0.7)"
                    : "1px solid rgba(255,79,216,0.2)",
                boxShadow:
                  identityType === "avatar"
                    ? "0 0 30px rgba(255,79,216,0.3), inset 0 0 30px rgba(255,79,216,0.05)"
                    : "none",
              }}
            >
              {identityType === "avatar" && (
                <div
                  className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#FF4FD8" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "rgba(255,79,216,0.15)",
                  border: "1px solid rgba(255,79,216,0.3)",
                }}
              >
                <Sparkles className="w-5 h-5" style={{ color: "#FF4FD8" }} />
              </div>
              <div
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider mb-2"
                style={{
                  background: "rgba(255,79,216,0.15)",
                  color: "#FF4FD8",
                  border: "1px solid rgba(255,79,216,0.3)",
                }}
              >
                ✦ Generative Art
              </div>
              <h3 className="font-display font-bold text-base text-white mb-1">
                Avatar Identity
              </h3>
              <p className="text-white/55 text-xs leading-relaxed">
                Get an automatically generated avatar based on 50+ unique traits
                and rare graphics.
              </p>
            </button>
          </div>

          {/* Real Face Upload Panel */}
          <AnimatePresence>
            {identityType === "real-face" && (
              <FaceUploadPanel
                faceImageFile={faceImageFile}
                facePreviewUrl={facePreviewUrl}
                onFileChange={handleFaceFileChange}
                onRemove={handleFaceRemove}
              />
            )}
          </AnimatePresence>
          {/* Avatar Identity Panel */}
          <AnimatePresence>
            {identityType === "avatar" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="rounded-2xl p-6 mt-4"
                  style={{
                    background: "rgba(255,79,216,0.04)",
                    border: "1px solid rgba(255,79,216,0.25)",
                    boxShadow: "0 4px 30px rgba(255,79,216,0.08)",
                  }}
                >
                  <div className="text-center mb-5">
                    <h4 className="font-display font-bold text-white text-base mb-1">
                      ✦ Your Generative Prydo Avatar
                    </h4>
                    <p className="text-white/50 text-xs leading-relaxed max-w-[340px] mx-auto">
                      Every mint generates a unique avatar from 50+ trait
                      combinations. Preview a random avatar below.
                    </p>
                  </div>
                  <RandomAvatarPreview />
                  <div
                    className="mt-5 px-4 py-2.5 rounded-xl text-center text-[11px]"
                    style={{
                      background: "rgba(245,200,76,0.08)",
                      border: "1px solid rgba(245,200,76,0.2)",
                      color: "rgba(245,200,76,0.85)",
                    }}
                  >
                    ✦ Genesis avatars have boosted Legendary / Mythic trait
                    rates
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center mt-4">
            <span
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              🔒 Each wallet can mint only one Prydo ID
            </span>
          </div>
        </motion.div>

        {/* Each ID includes pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          <span className="text-white/50 text-xs font-bold tracking-widest uppercase mr-1">
            Each ID includes:
          </span>
          {includedPills.map((pill) => (
            <span
              key={pill}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide glass-card border border-white/15 text-white/80"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative rounded-2xl p-6 flex flex-col gap-4 glass-card transition-all ${
                tier.live
                  ? `hover:scale-[1.02] ${tier.glowClass}`
                  : "opacity-50 grayscale"
              } ${tier.featured ? "ring-2" : ""}`}
              style={{
                border: tier.featured
                  ? `2px solid ${tier.borderColor}`
                  : `1px solid ${tier.borderColor}`,
                background: `linear-gradient(135deg, ${tier.bgAccent}, rgba(10,5,25,0.8))`,
                animation: tier.live
                  ? "glow-pulse-green 3s ease-in-out infinite"
                  : undefined,
              }}
            >
              {tier.live ? (
                <div
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
                  style={{
                    background: "rgba(34,197,94,0.15)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    color: "#22C55E",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-green-400"
                    style={{ boxShadow: "0 0 6px #22C55E" }}
                  />
                  LIVE NOW
                </div>
              ) : (
                <div
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  <Lock className="w-2.5 h-2.5" />
                  COMING SOON
                </div>
              )}

              {tier.featured && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap"
                  style={{ background: tier.color, color: "#0a0515" }}
                >
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="pr-20">
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase"
                    style={{ color: tier.color }}
                  >
                    {tier.tierLabel}
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-1">
                    {tier.name}
                  </h3>
                  <p className="text-white/50 text-xs mt-1">{tier.subtitle}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${tier.color}22`,
                    border: `1px solid ${tier.color}44`,
                  }}
                >
                  <tier.icon
                    className="w-5 h-5"
                    style={{ color: tier.color }}
                  />
                </div>
              </div>

              <div
                className="py-3 border-y"
                style={{ borderColor: `${tier.color}22` }}
              >
                <p
                  className="font-display font-extrabold text-3xl"
                  style={{ color: tier.color }}
                >
                  {tier.price}
                </p>
                {tier.priceNote && (
                  <p className="text-white/40 text-xs mt-0.5">
                    {tier.priceNote}
                  </p>
                )}
              </div>

              <ul className="flex flex-col gap-2">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: tier.color }}
                    />
                    <span className="text-xs text-white/75">{f}</span>
                  </li>
                ))}
              </ul>

              {tier.live ? (
                hasMinted ? (
                  <button
                    type="button"
                    disabled
                    className="mt-auto w-full py-3 rounded-full font-bold text-xs tracking-wide"
                    style={{
                      background: "rgba(34,197,94,0.15)",
                      color: "#22C55E",
                      border: "1px solid rgba(34,197,94,0.3)",
                      cursor: "not-allowed",
                    }}
                  >
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Already Minted
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleMintClick}
                    className="mt-auto w-full py-3 rounded-full font-bold text-xs tracking-wide transition-all hover:scale-[1.02] active:scale-95"
                    style={{
                      background: address
                        ? `linear-gradient(135deg, ${tier.color}, ${tier.color}99)`
                        : "rgba(255,255,255,0.1)",
                      color: address ? "#0a0515" : "rgba(255,255,255,0.8)",
                      boxShadow: address ? `0 0 20px ${tier.color}44` : "none",
                      border: address
                        ? "none"
                        : "1px solid rgba(255,255,255,0.2)",
                    }}
                    data-ocid={`mint.${tier.id}.button`}
                  >
                    {address ? (
                      identityType ? (
                        tier.buttonText
                      ) : (
                        "Select Identity Type First"
                      )
                    ) : (
                      <span className="inline-flex items-center justify-center gap-1.5">
                        <Wallet className="w-3.5 h-3.5" />
                        Connect Wallet to Mint
                      </span>
                    )}
                  </button>
                )
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-auto w-full py-3 rounded-full font-bold text-xs tracking-wide"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.3)",
                    cursor: "not-allowed",
                  }}
                  data-ocid={`mint.${tier.id}.button`}
                >
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <Lock className="w-3 h-3" />
                    {tier.buttonText}
                  </span>
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {showConfirm && (
        <MintConfirmModal
          identityType={identityType}
          onConfirm={handleConfirmMint}
          onCancel={handleCloseConfirm}
          mintState={mintState}
          mintError={mintError}
          mintStep={mintStep}
          icpStored={icpStored}
        />
      )}

      <style>{`
        @keyframes glow-pulse-green {
          0%, 100% { box-shadow: 0 0 20px rgba(34,197,94,0.15); }
          50% { box-shadow: 0 0 40px rgba(34,197,94,0.3), 0 0 80px rgba(34,197,94,0.1); }
        }
      `}</style>
    </section>
  );
}

import { AlertCircle, ExternalLink, Loader2, X } from "lucide-react";
import { useWallet } from "../context/WalletContext";

const wallets = [
  {
    id: "metamask" as const,
    name: "MetaMask",
    description: "Connect using the MetaMask browser extension",
    iconBg: "#F6851B",
    icon: (
      <svg
        viewBox="0 0 35 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        role="img"
        aria-label="MetaMask"
      >
        <title>MetaMask</title>
        <path
          d="M32.96 1L19.37 10.96l2.53-5.98L32.96 1z"
          fill="#E2761B"
          stroke="#E2761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.04 1l13.46 10.05-2.4-6.07L2.04 1zM28.17 23.65l-3.6 5.52 7.71 2.12 2.21-7.52-6.32-.12zM1.56 23.77l2.2 7.52 7.71-2.12-3.6-5.52-6.31.12z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.02 14.26l-2.15 3.25 7.67.34-.26-8.24-5.26 4.65zM24.0 14.26l-5.31-4.74-.17 8.33 7.67-.34-2.19-3.25zM11.47 29.17l4.59-2.24-3.97-3.1-.62 5.34zM18.95 26.93l4.6 2.24-.63-5.34-3.97 3.1z"
          fill="#E4761B"
          stroke="#E4761B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.55 29.17l-4.6-2.24.37 3.01-.04 1.26 4.27-2.03zM11.47 29.17l4.27 2.03-.03-1.26.36-3.01-4.6 2.24z"
          fill="#D7C1B3"
          stroke="#D7C1B3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.79 21.93l-3.83-1.12 2.7-1.24 1.13 2.36zM19.21 21.93l1.13-2.36 2.71 1.24-3.84 1.12z"
          fill="#233447"
          stroke="#233447"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.47 29.17l.65-5.52-4.26.12 3.61 5.4zM22.9 23.65l.64 5.52 3.6-5.4-4.24-.12zM26.18 17.51l-7.67.34.71 3.94 1.13-2.36 2.71 1.24 3.12-3.16zM11.96 20.67l2.7-1.24 1.13 2.36.72-3.94-7.67-.34 3.12 3.16z"
          fill="#CD6116"
          stroke="#CD6116"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.87 17.51l3.22 6.27-.11-3.11-3.11-3.16zM23.05 20.67l-.12 3.11 3.22-6.27-3.1 3.16zM15.68 17.85l-.72 3.94.9 4.64.2-6.12-.38-2.46zM19.51 17.85l-.37 2.45.19 6.13.9-4.64-.72-3.94z"
          fill="#E4751F"
          stroke="#E4751F"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.21 21.93l-.9 4.64.65.44 3.97-3.1.12-3.11-3.84 1.13zM11.96 20.67l.11 3.11 3.97 3.1.64-.44-.9-4.64-3.82-1.13z"
          fill="#F6851B"
          stroke="#F6851B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.25 31.2l.04-1.26-.34-.3h-3.9l-.32.3.03 1.26-4.27-2.03 1.49 1.22 3.02 2.09h5.18l3.03-2.09 1.49-1.22-4.45 2.03z"
          fill="#C0AD9E"
          stroke="#C0AD9E"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.95 26.93l-.65-.44h-3.6l-.64.44-.36 3.01.32-.3h3.9l.34.3-.31-3.01z"
          fill="#161616"
          stroke="#161616"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "trust" as const,
    name: "Trust Wallet",
    description: "Connect using Trust Wallet browser extension or mobile",
    iconBg: "#3375BB",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        role="img"
        aria-label="Trust Wallet"
      >
        <title>Trust Wallet</title>
        <rect width="40" height="40" rx="10" fill="#3375BB" />
        <path
          d="M20 7L9 12.5V21.5C9 27.5 14.5 33 20 35C25.5 33 31 27.5 31 21.5V12.5L20 7Z"
          fill="white"
        />
        <path
          d="M20 11L13 14.8V21.5C13 25.8 16.5 29.8 20 31.5C23.5 29.8 27 25.8 27 21.5V14.8L20 11Z"
          fill="#3375BB"
        />
        <path
          d="M17 21L19 23L24 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "walletconnect" as const,
    name: "WalletConnect",
    description: "Scan QR code with any WalletConnect-compatible wallet",
    iconBg: "#3B99FC",
    icon: (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        role="img"
        aria-label="WalletConnect"
      >
        <title>WalletConnect</title>
        <rect width="40" height="40" rx="10" fill="#3B99FC" />
        <path
          d="M12.5 19C15.8 15.7 21.2 15.7 24.5 19L25.3 19.8C25.5 20 25.5 20.3 25.3 20.5L23.8 22C23.7 22.1 23.5 22.1 23.4 22L22.3 20.9C20.1 18.7 16.9 18.7 14.7 20.9L13.5 22.1C13.4 22.2 13.2 22.2 13.1 22.1L11.6 20.6C11.4 20.4 11.4 20.1 11.6 19.9L12.5 19ZM27.2 21.4L28.5 22.7C28.7 22.9 28.7 23.2 28.5 23.4L23.1 28.8C22.9 29 22.6 29 22.4 28.8L18.6 24.9C18.55 24.85 18.45 24.85 18.4 24.9L14.6 28.8C14.4 29 14.1 29 13.9 28.8L8.5 23.4C8.3 23.2 8.3 22.9 8.5 22.7L9.8 21.4C10 21.2 10.3 21.2 10.5 21.4L14.3 25.3C14.35 25.35 14.45 25.35 14.5 25.3L18.3 21.4C18.5 21.2 18.8 21.2 19 21.4L22.8 25.3C22.85 25.35 22.95 25.35 23 25.3L26.8 21.4C26.9 21.2 27.1 21.2 27.2 21.4Z"
          fill="white"
        />
      </svg>
    ),
  },
];

export default function WalletModal() {
  const {
    isModalOpen,
    closeModal,
    isConnecting,
    connectMetaMask,
    connectTrust,
    connectWalletConnect,
    error,
  } = useWallet();

  if (!isModalOpen) return null;

  const handlers = {
    metamask: connectMetaMask,
    trust: connectTrust,
    walletconnect: connectWalletConnect,
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
    >
      {/* Backdrop click area */}
      <button
        type="button"
        aria-label="Close wallet modal"
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={closeModal}
      />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,8,50,0.98), rgba(10,5,25,0.98))",
          border: "1px solid rgba(139,92,246,0.3)",
          boxShadow:
            "0 0 60px rgba(139,92,246,0.2), 0 25px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-bold text-xl text-white tracking-wide">
              Connect Wallet
            </h2>
            <p className="text-white/50 text-xs mt-1">
              Connect to mint your Prydo Genesis ID
            </p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-start gap-3 p-3 rounded-xl mb-4 text-sm"
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#FCA5A5",
            }}
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Wallet Options */}
        <div className="flex flex-col gap-3">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              type="button"
              disabled={isConnecting}
              onClick={() => handlers[wallet.id]()}
              className="flex items-center gap-4 p-4 rounded-xl text-left transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.border =
                  "1px solid rgba(139,92,246,0.4)";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(139,92,246,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.border =
                  "1px solid rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.04)";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  background: `${wallet.iconBg}22`,
                  border: `1px solid ${wallet.iconBg}44`,
                }}
              >
                {wallet.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">
                  {wallet.name}
                </p>
                <p className="text-white/45 text-xs mt-0.5 truncate">
                  {wallet.description}
                </p>
              </div>
              {isConnecting ? (
                <Loader2 className="w-4 h-4 text-white/30 animate-spin flex-shrink-0" />
              ) : (
                <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* WalletConnect note */}
        <p className="text-white/30 text-[11px] text-center mt-5 leading-relaxed">
          WalletConnect supports 300+ wallets including Rainbow, Coinbase
          Wallet, and more.
          <br />
          By connecting, you agree to our{" "}
          <a
            href="/terms"
            className="underline hover:text-white/60 transition-colors"
          >
            Terms of Use
          </a>
          .
        </p>

        {/* Polygon note */}
        <div
          className="flex items-center justify-center gap-2 mt-3 py-2 px-3 rounded-lg"
          style={{
            background: "rgba(130,71,229,0.08)",
            border: "1px solid rgba(130,71,229,0.2)",
          }}
        >
          <svg
            viewBox="0 0 38 33"
            className="w-4 h-4 flex-shrink-0"
            fill="none"
            role="img"
            aria-label="Polygon"
          >
            <title>Polygon</title>
            <path d="M19 0L0 33h38L19 0z" fill="#8247E5" />
          </svg>
          <span className="text-white/50 text-[11px]">
            Prydo NFTs live on{" "}
            <span className="text-purple-400 font-medium">Polygon Mainnet</span>{" "}
            (MATIC)
          </span>
        </div>
      </div>
    </div>
  );
}

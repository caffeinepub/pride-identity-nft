import { createContext, useCallback, useContext, useState } from "react";

export type WalletType = "metamask" | "trust" | "walletconnect" | null;
export type IdentityType = "avatar" | "realface" | null;

interface WalletContextValue {
  address: string | null;
  walletType: WalletType;
  isConnecting: boolean;
  isModalOpen: boolean;
  hasMinted: boolean;
  identityType: IdentityType;
  isProfileOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  connectMetaMask: () => Promise<void>;
  connectTrust: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnect: () => void;
  setHasMinted: (v: boolean) => void;
  setIdentityType: (v: IdentityType) => void;
  error: string | null;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  const [identityType, setIdentityType] = useState<IdentityType>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => {
    setError(null);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const connectMetaMask = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    try {
      const win = window as Window & {
        ethereum?: {
          request: (args: { method: string }) => Promise<string[]>;
          isMetaMask?: boolean;
        };
      };
      if (!win.ethereum) {
        window.open("https://metamask.io/download/", "_blank");
        throw new Error(
          "MetaMask not installed. Opening MetaMask download page.",
        );
      }
      const accounts = await win.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        setAddress(accounts[0]);
        setWalletType("metamask");
        setIsModalOpen(false);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Connection failed";
      setError(msg);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const connectTrust = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    try {
      const win = window as Window & {
        trustwallet?: {
          request: (args: { method: string }) => Promise<string[]>;
        };
        ethereum?: {
          request: (args: { method: string }) => Promise<string[]>;
          isTrust?: boolean;
        };
      };
      const provider =
        win.trustwallet || (win.ethereum?.isTrust ? win.ethereum : null);
      if (!provider) {
        window.open("https://trustwallet.com/browser-extension", "_blank");
        throw new Error("Trust Wallet not installed. Opening download page.");
      }
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      if (accounts[0]) {
        setAddress(accounts[0]);
        setWalletType("trust");
        setIsModalOpen(false);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Connection failed";
      setError(msg);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const connectWalletConnect = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const mockAddr = `0x${Array.from({ length: 40 }, () =>
      Math.floor(Math.random() * 16).toString(16),
    ).join("")}`;
    setAddress(mockAddr);
    setWalletType("walletconnect");
    setIsModalOpen(false);
    setIsConnecting(false);
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setWalletType(null);
    setHasMinted(false);
    setIdentityType(null);
    setIsProfileOpen(false);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        walletType,
        isConnecting,
        isModalOpen,
        hasMinted,
        identityType,
        isProfileOpen,
        openModal,
        closeModal,
        openProfile,
        closeProfile,
        connectMetaMask,
        connectTrust,
        connectWalletConnect,
        disconnect,
        setHasMinted,
        setIdentityType,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
  return ctx;
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type WalletType = "metamask" | "trust" | "walletconnect" | null;
export type IdentityType = "avatar" | "realface" | null;

interface WalletContextValue {
  address: string | null;
  walletType: WalletType;
  isConnecting: boolean;
  isModalOpen: boolean;
  hasMinted: boolean;
  identityType: IdentityType;
  faceImageUrl: string | null;
  isProfileOpen: boolean;
  chainId: string | null;
  isCorrectNetwork: boolean;
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
  setFaceImageUrl: (v: string | null) => void;
  selectedAvatarDataUrl: string | null;
  selectedAvatarCategory: string | null;
  setSelectedAvatarDataUrl: (v: string | null) => void;
  setSelectedAvatarCategory: (v: string | null) => void;
  switchToPolygon: () => Promise<void>;
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
  const [faceImageUrl, setFaceImageUrl] = useState<string | null>(null);
  const [selectedAvatarDataUrl, setSelectedAvatarDataUrl] = useState<
    string | null
  >(null);
  const [selectedAvatarCategory, setSelectedAvatarCategory] = useState<
    string | null
  >(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);

  const isCorrectNetwork = chainId === "0x89";

  const openModal = () => {
    setError(null);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const openProfile = () => setIsProfileOpen(true);
  const closeProfile = () => setIsProfileOpen(false);

  const getChainId = useCallback(async () => {
    const win = window as any;
    if (!win.ethereum) return;
    const id = await win.ethereum.request({ method: "eth_chainId" });
    setChainId(id);
  }, []);

  const switchToPolygon = useCallback(async () => {
    const win = window as any;
    if (!win.ethereum) return;
    try {
      await win.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await win.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x89",
              chainName: "Polygon Mainnet",
              nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
              rpcUrls: ["https://polygon-rpc.com"],
              blockExplorerUrls: ["https://polygonscan.com"],
            },
          ],
        });
      }
    }
    await getChainId();
  }, [getChainId]);

  useEffect(() => {
    const win = window as any;
    if (!address || !win.ethereum) return;
    const handler = (id: string) => setChainId(id);
    win.ethereum.on("chainChanged", handler);
    win.ethereum
      .request({ method: "eth_chainId" })
      .then((id: string) => setChainId(id));
    return () => win.ethereum.removeListener("chainChanged", handler);
  }, [address]);

  const connectMetaMask = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    try {
      const win = window as any;
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
        await switchToPolygon();
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Connection failed";
      setError(msg);
    } finally {
      setIsConnecting(false);
    }
  }, [switchToPolygon]);

  const connectTrust = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    try {
      const win = window as any;
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
        await switchToPolygon();
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Connection failed";
      setError(msg);
    } finally {
      setIsConnecting(false);
    }
  }, [switchToPolygon]);

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
    // WalletConnect mock — set Polygon chain directly
    setChainId("0x89");
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setWalletType(null);
    setHasMinted(false);
    setIdentityType(null);
    setFaceImageUrl(null);
    setSelectedAvatarDataUrl(null);
    setSelectedAvatarCategory(null);
    setIsProfileOpen(false);
    setChainId(null);
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
        faceImageUrl,
        isProfileOpen,
        chainId,
        isCorrectNetwork,
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
        setFaceImageUrl,
        selectedAvatarDataUrl,
        selectedAvatarCategory,
        setSelectedAvatarDataUrl,
        setSelectedAvatarCategory,
        switchToPolygon,
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

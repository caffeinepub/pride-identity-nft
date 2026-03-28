import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import AvatarSection from "./components/AvatarSection";
import DAOGovernanceModal from "./components/DAOGovernanceModal";
import DecentralizedStoragePanel from "./components/DecentralizedStoragePanel";
import EcosystemSection from "./components/EcosystemSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MintSection from "./components/MintSection";
import NFTDisclaimerModal from "./components/NFTDisclaimerModal";
import NavBar from "./components/NavBar";
import PrivacyPolicyModal from "./components/PrivacyPolicyModal";
import ProfilePanel from "./components/ProfilePanel";
import PrydoIDCardShowcase from "./components/PrydoIDCardShowcase";
import RoadmapSection from "./components/RoadmapSection";
import TechStackSection from "./components/TechStackSection";
import TermsModal from "./components/TermsModal";
import WalletModal from "./components/WalletModal";
import WhitepaperSection from "./components/WhitepaperSection";
import { WalletProvider, useWallet } from "./context/WalletContext";

function AppInner() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [nftDisclaimerOpen, setNftDisclaimerOpen] = useState(false);
  const [daoGovernanceOpen, setDaoGovernanceOpen] = useState(false);
  const { address, isCorrectNetwork, switchToPolygon } = useWallet();

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      {/* Ambient background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #8B5CF6, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #FF4FD8, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #22D3EE, transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10">
        <NavBar />
        {address && !isCorrectNetwork && (
          <div
            className="fixed top-16 left-0 right-0 z-40 flex items-center justify-center gap-3 px-4 py-2.5 text-sm"
            style={{
              background: "rgba(20,10,5,0.95)",
              borderBottom: "1px solid rgba(251,146,60,0.4)",
              backdropFilter: "blur(8px)",
            }}
            data-ocid="network.error_state"
          >
            <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span className="text-orange-200">
              Prydo NFTs require Polygon Mainnet.
            </span>
            <button
              type="button"
              onClick={switchToPolygon}
              className="px-3 py-1 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-80"
              style={{ background: "linear-gradient(135deg,#8B5CF6,#6D28D9)" }}
              data-ocid="network.switch_network.button"
            >
              Switch to Polygon
            </button>
          </div>
        )}
        <main>
          <HeroSection />
          <AboutSection />
          <MintSection />
          <AvatarSection />
          <PrydoIDCardShowcase />
          <EcosystemSection />
          <TechStackSection />
          <DecentralizedStoragePanel />
          <WhitepaperSection />
          <RoadmapSection />
          <FAQSection />
        </main>
        <Footer
          onOpenPrivacyPolicy={() => setPrivacyOpen(true)}
          onOpenTerms={() => setTermsOpen(true)}
          onOpenNFTDisclaimer={() => setNftDisclaimerOpen(true)}
          onOpenDAOGovernance={() => setDaoGovernanceOpen(true)}
        />
      </div>
      <WalletModal />
      <ProfilePanel />
      <PrivacyPolicyModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
      <TermsModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      <NFTDisclaimerModal
        open={nftDisclaimerOpen}
        onClose={() => setNftDisclaimerOpen(false)}
      />
      <DAOGovernanceModal
        open={daoGovernanceOpen}
        onClose={() => setDaoGovernanceOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <AppInner />
    </WalletProvider>
  );
}

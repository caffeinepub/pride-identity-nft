import AboutSection from "./components/AboutSection";
import AvatarSection from "./components/AvatarSection";
import EcosystemSection from "./components/EcosystemSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import MintSection from "./components/MintSection";
import NavBar from "./components/NavBar";
import ProfilePanel from "./components/ProfilePanel";
import RoadmapSection from "./components/RoadmapSection";
import WalletModal from "./components/WalletModal";
import WhitepaperSection from "./components/WhitepaperSection";
import { WalletProvider } from "./context/WalletContext";

export default function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-background font-body overflow-x-hidden">
        {/* Ambient background gradient orbs */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
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
          <main>
            <HeroSection />
            <AboutSection />
            <MintSection />
            <AvatarSection />
            <EcosystemSection />
            <WhitepaperSection />
            <RoadmapSection />
            <FAQSection />
          </main>
          <Footer />
        </div>
        <WalletModal />
        <ProfilePanel />
      </div>
    </WalletProvider>
  );
}

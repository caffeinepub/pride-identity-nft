import { Github, Heart, MessageCircle, Send, Twitter } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Mint Prydo ID", href: "#mint" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Whitepaper", href: "#whitepaper" },
];

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onOpenNFTDisclaimer: () => void;
  onOpenDAOGovernance: () => void;
}

export default function Footer({
  onOpenPrivacyPolicy,
  onOpenTerms,
  onOpenNFTDisclaimer,
  onOpenDAOGovernance,
}: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8 mt-12">
      <div className="absolute top-0 left-0 right-0 h-px pride-gradient-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center btn-gradient font-display font-bold text-white text-sm">
                P
              </div>
              <div>
                <p className="font-display font-bold text-white tracking-widest text-sm">
                  PRYDO
                </p>
                <p className="text-white/50 text-xs">Prydo Identity</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Prydo is a decentralized identity platform powered by blockchain
              technology.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                  data-ocid="footer.link"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="text-white/55 hover:text-white text-sm transition-colors text-left"
                  data-ocid="footer.link"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="text-white/55 hover:text-white text-sm transition-colors text-left"
                  data-ocid="footer.link"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenNFTDisclaimer}
                  className="text-white/55 hover:text-white text-sm transition-colors text-left"
                  data-ocid="footer.link"
                >
                  NFT Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDAOGovernance}
                  className="text-white/55 hover:text-white text-sm transition-colors text-left"
                  data-ocid="footer.link"
                >
                  DAO Governance Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Community
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Twitter", href: "#" },
                { label: "Discord", href: "#" },
                { label: "Telegram", href: "#" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-white/55 hover:text-white text-sm transition-colors"
                    data-ocid="footer.link"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white/40 text-xs">
              &copy; {year} Prydo. All rights reserved.
            </p>
            <p className="text-white/30 text-xs mt-0.5">
              Prydo is a decentralized identity platform powered by blockchain
              technology.
            </p>
          </div>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/60 text-xs flex items-center gap-1.5 transition-colors"
          >
            Built with{" "}
            <Heart className="w-3 h-3 mx-0.5" style={{ color: "#FF4FD8" }} />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

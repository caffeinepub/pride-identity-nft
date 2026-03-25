import { Github, Heart, MessageCircle, Send, Twitter } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Mint Pride ID", href: "#mint" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Whitepaper", href: "#whitepaper" },
  { label: "FAQ", href: "#faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
];

const socials = [
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
  { icon: Send, label: "Telegram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-8 mt-12">
      <div className="absolute top-0 left-0 right-0 h-px pride-gradient-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full flex items-center justify-center btn-gradient font-display font-bold text-white text-sm">
                P
              </div>
              <div>
                <p className="font-display font-bold text-white tracking-widest text-sm">
                  PRYDO
                </p>
                <p className="text-white/50 text-xs">Pride Identity</p>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Empowering identity through Web3. Your pride. Your blockchain.
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

          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Quick Links
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

          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((l) => (
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

          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Join the Community
            </h4>
            <p className="text-white/55 text-sm mb-4">
              Be part of the first decentralized LGBTQ+ identity movement on
              Web3.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white btn-gradient hover:opacity-90 transition-opacity w-full"
              data-ocid="footer.button"
            >
              Mint Your Pride ID
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            &copy; {year} Pride Identity. All Rights Reserved. Empowering
            identity through Web3.
          </p>
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

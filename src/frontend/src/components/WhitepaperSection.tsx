import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const keyFeatures = [
  "Soulbound Prydo ID (non-transferable digital identity)",
  "Advanced Avatar Builder with real face support and rarity system",
  "Creator Marketplace (70% revenue to creators)",
  "Prydo DAO for community voting and grants",
  "zk-Proof privacy technology",
];

const roadmapItems = [
  {
    quarter: "Q1 2026",
    title: "Launch of Prydo ID + Avatar Builder",
    color: "#FF4FD8",
  },
  {
    quarter: "Q2 2026",
    title: "Creator Marketplace & NFT Drops",
    color: "#8B5CF6",
  },
  {
    quarter: "Q3 2026",
    title: "Full DAO Governance + Virtual Pride Events",
    color: "#22D3EE",
  },
  {
    quarter: "Q4 2026",
    title: "Metaverse Integration & Global Partnerships",
    color: "#F5C84C",
  },
];

const tokenomicsCards = [
  {
    label: "Governance Token",
    value: "$PRYDO",
    color: "#8B5CF6",
  },
  {
    label: "Creator Revenue",
    value: "70%",
    color: "#FF4FD8",
  },
  {
    label: "Community Grants",
    value: "Platform Fees",
    color: "#22D3EE",
  },
];

const blockchainData = [
  { label: "Blockchain", value: "Ethereum / Polygon" },
  { label: "NFT Standard", value: "Soulbound NFT" },
  { label: "Contract", value: "Coming Soon" },
  { label: "Storage", value: "Decentralized" },
];

export default function WhitepaperSection() {
  return (
    <section id="whitepaper" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-pride-gradient uppercase mb-3">
            Whitepaper
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-wide uppercase">
            Whitepaper
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Tabs defaultValue="introduction" data-ocid="whitepaper.tab">
            <TabsList className="w-full grid grid-cols-2 sm:grid-cols-5 mb-8 bg-white/5 border border-white/10 rounded-2xl p-1 h-auto">
              <TabsTrigger
                value="introduction"
                className="rounded-xl text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white font-bold text-xs tracking-wide py-2.5"
              >
                Introduction
              </TabsTrigger>
              <TabsTrigger
                value="vision"
                className="rounded-xl text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white font-bold text-xs tracking-wide py-2.5"
              >
                Core Vision
              </TabsTrigger>
              <TabsTrigger
                value="tokenomics"
                className="rounded-xl text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white font-bold text-xs tracking-wide py-2.5"
              >
                Tokenomics
              </TabsTrigger>
              <TabsTrigger
                value="roadmap"
                className="rounded-xl text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white font-bold text-xs tracking-wide py-2.5"
              >
                Roadmap 2026
              </TabsTrigger>
              <TabsTrigger
                value="blockchain"
                className="rounded-xl text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white font-bold text-xs tracking-wide py-2.5"
              >
                Blockchain Info
              </TabsTrigger>
            </TabsList>

            <TabsContent value="introduction">
              <div
                className="glass-card rounded-2xl p-8 border border-white/10"
                style={{ background: "rgba(10,5,25,0.7)" }}
              >
                <p className="text-white/80 leading-relaxed text-lg mb-8">
                  Prydo is a decentralized platform built for the global LGBTQ+
                  community. We combine soulbound NFTs, customizable avatars, a
                  creator economy, and community governance — all with strong
                  privacy protection.
                </p>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-pride-gradient mb-4">
                  Key Features
                </p>
                <ul className="flex flex-col gap-3">
                  {keyFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: "#8B5CF6" }}
                      />
                      <span className="text-white/70 text-sm">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="vision">
              <div
                className="glass-card rounded-2xl p-8 border border-white/10 flex items-center justify-center min-h-[280px]"
                style={{ background: "rgba(10,5,25,0.7)" }}
              >
                <div className="text-center max-w-2xl">
                  <div
                    className="w-1 h-16 mx-auto mb-8 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to bottom, #FF4FD8, #8B5CF6, #22D3EE)",
                    }}
                  />
                  <blockquote className="font-display font-bold text-2xl sm:text-3xl text-white leading-snug">
                    "We believe everyone deserves to own their identity{" "}
                    <span className="text-pride-gradient">without fear.</span>
                  </blockquote>
                  <p className="text-white/60 mt-6 text-base leading-relaxed">
                    Prydo gives you permanent, sovereign control over your
                    digital presence while protecting your privacy.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tokenomics">
              <div
                className="glass-card rounded-2xl p-8 border border-white/10"
                style={{ background: "rgba(10,5,25,0.7)" }}
              >
                <p className="text-white/70 text-base leading-relaxed mb-8">
                  $PRYDO is the governance token. Platform fees support
                  community grants and LGBTQ+ causes worldwide.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {tokenomicsCards.map((card) => (
                    <div
                      key={card.label}
                      className="rounded-2xl p-6 text-center"
                      style={{
                        border: `1px solid ${card.color}33`,
                        background: `${card.color}0d`,
                      }}
                    >
                      <p
                        className="font-display font-extrabold text-2xl"
                        style={{ color: card.color }}
                      >
                        {card.value}
                      </p>
                      <p className="text-white/60 text-xs mt-2 font-medium tracking-wide">
                        {card.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roadmap">
              <div
                className="glass-card rounded-2xl p-8 border border-white/10"
                style={{ background: "rgba(10,5,25,0.7)" }}
              >
                <div className="flex flex-col gap-0">
                  {roadmapItems.map((item, i) => (
                    <div key={item.quarter} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
                          style={{
                            background: item.color,
                            boxShadow: `0 0 12px ${item.color}88`,
                          }}
                        />
                        {i < roadmapItems.length - 1 && (
                          <div
                            className="w-px flex-1 my-1"
                            style={{
                              background: `linear-gradient(to bottom, ${item.color}66, ${roadmapItems[i + 1].color}66)`,
                            }}
                          />
                        )}
                      </div>
                      <div className="pb-8">
                        <p
                          className="text-xs font-bold tracking-[0.2em] uppercase mb-1"
                          style={{ color: item.color }}
                        >
                          {item.quarter}
                        </p>
                        <p className="text-white font-semibold text-base">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="blockchain">
              <div
                className="glass-card rounded-2xl p-8 border border-white/10"
                style={{ background: "rgba(10,5,25,0.7)" }}
              >
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-pride-gradient mb-6">
                  Blockchain Information
                </p>
                <div className="flex flex-col gap-4">
                  {blockchainData.map((row, i) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-xl px-5 py-4"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <span className="text-white/50 text-sm font-medium">
                        {row.label}
                      </span>
                      <span
                        className="font-display font-bold text-sm"
                        style={{
                          color: ["#FF4FD8", "#8B5CF6", "#22D3EE", "#34D399"][
                            i % 4
                          ],
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

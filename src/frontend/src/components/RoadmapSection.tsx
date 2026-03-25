import { Clock, Timer, Zap } from "lucide-react";
import { motion } from "motion/react";

const phases = [
  {
    phase: "Phase 1",
    title: "Identity Launch",
    status: "Active",
    statusColor: "#FF4FD8",
    StatusIcon: Zap,
    side: "left",
    items: [
      "Launch Pride ID NFTs",
      "Genesis Member Mint",
      "Avatar Generation System",
    ],
  },
  {
    phase: "Phase 2",
    title: "Community Layer",
    status: "Upcoming",
    statusColor: "#8B5CF6",
    StatusIcon: Clock,
    side: "right",
    items: ["Community profiles", "Reputation system", "Identity verification"],
  },
  {
    phase: "Phase 3",
    title: "Social Platform",
    status: "Future",
    statusColor: "#22D3EE",
    StatusIcon: Timer,
    side: "left",
    items: [
      "Decentralized social dApp",
      "Creator tools",
      "Community interaction",
    ],
  },
  {
    phase: "Phase 4",
    title: "Governance",
    status: "Future",
    statusColor: "#A7A1B8",
    StatusIcon: Timer,
    side: "right",
    items: ["DAO governance", "Community voting", "Ecosystem grants"],
  },
];

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold tracking-[0.3em] text-pride-gradient uppercase mb-3">
            The Path Forward
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-wide">
            ROADMAP
          </h2>
        </motion.div>

        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(255,79,216,0.5), rgba(139,92,246,0.5), rgba(34,211,238,0.5), transparent)",
            }}
          />

          <div className="flex flex-col gap-12">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: phase.side === "left" ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex items-center ${
                  phase.side === "left" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`glass-card rounded-2xl p-6 flex flex-col gap-3 w-full md:w-[calc(50%-2rem)] ${
                    phase.side === "left" ? "md:mr-auto" : "md:ml-auto"
                  }`}
                  style={{ border: `1px solid ${phase.statusColor}44` }}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase">
                      {phase.phase}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: `${phase.statusColor}22`,
                        color: phase.statusColor,
                      }}
                    >
                      <phase.StatusIcon className="w-3 h-3" />
                      {phase.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">
                    {phase.title}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: phase.statusColor }}
                        />
                        <span className="text-sm text-white/65">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center z-10"
                  style={{
                    background: `radial-gradient(circle, ${phase.statusColor}, ${phase.statusColor}66)`,
                    boxShadow: `0 0 20px ${phase.statusColor}66`,
                    border: `2px solid ${phase.statusColor}`,
                  }}
                >
                  <phase.StatusIcon className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

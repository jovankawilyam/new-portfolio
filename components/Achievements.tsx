"use client";

import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

type Achievement = {
  rank: string;
  title: string;
  year: string;
};

const achievements: Achievement[] = [
  { rank: "3", title: "Bandung Taekwondo International", year: "2017" },
  { rank: "2", title: "Liga Pelajar Taekwondo", year: "2017" },
  { rank: "2", title: "Palagan Open Taekwondo", year: "2018" },
  { rank: "1", title: "Al Irsyad Al Syamsiyyah Taekwondo", year: "2018" },
  { rank: "1", title: "Liga Pelajar Taekwondo", year: "2018" },
  { rank: "3", title: "Menpora Cup Taekwondo", year: "2019" },
  { rank: "2", title: "Pugnator Badung Sport Tourism International", year: "2019" },
  { rank: "1", title: "Koni Cup", year: "2019" },
  { rank: "3", title: "Online Indonesia International Biho Championship", year: "2021" },
  { rank: "1", title: "Speed Kicking", year: "2021" },
  { rank: "2", title: "Kapolri Cup 3", year: "2022" },
];

export default function Achievements() {
  // Bagi menjadi 2 kolom (6 di kiri, 5 di kanan)
  const leftColumn = achievements.slice(0, 6);
  const rightColumn = achievements.slice(6);

  return (
    <section id="achievements" className="relative z-20 bg-neutral-950 px-4 py-24 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-16 text-left md:text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500">
              Milestones & Awards
            </p>
            <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-none tracking-tight text-white">
              ACHIEVEMENTS
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-12 gap-y-0 md:grid-cols-2">
          {/* Kolom Kiri */}
          <div className="flex flex-col">
            {leftColumn.map((item, idx) => (
              <AchievementItem key={idx} item={item} index={idx} />
            ))}
          </div>

          {/* Kolom Kanan */}
          <div className="flex flex-col">
            {rightColumn.map((item, idx) => (
              <AchievementItem key={idx + 6} item={item} index={idx + 6} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AchievementItem({ item, index }: { item: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 6) * 0.1, duration: 0.5 }}
      className="group flex items-center justify-between border-b border-white/5 py-8 transition-colors hover:bg-white/[0.02]"
    >
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-tighter text-neutral-500">Rank</span>
          <span className="text-3xl font-black text-amber-500 sm:text-4xl">{item.rank}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{item.year}</span>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-amber-500 sm:text-xl">
            {item.title}
          </h3>
        </div>
      </div>

      <div className="hidden shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block -translate-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 text-amber-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    </motion.div>
  );
}

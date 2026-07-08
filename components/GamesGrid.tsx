"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "@/components/Reveal";

type Game = {
  title: string;
  href: string;
  image: string;
  type: string;
  tags: string[];
  description: string;
  isMaintenance?: boolean;
  isComingSoon?: boolean;
};

const games: Game[] = [
  {
    title: "Neon Hand Hockey",
    href: "https://gameneonhandhockey-byjovanka.vercel.app/",
    image: "/images/game-neon.png",
    type: "Arcade Game",
    tags: ["Game", "Neon", "Web", "2P"],
    description:
      "Interactive neon-themed hand hockey game with fast-paced gameplay and vibrant visuals.",
      
  },
  {
    title: "Pic Game Puzzle",
    href: "https://pic-puzzle-cam.vercel.app/",
    image: "/images/puzzle-cam.png",
    type: "Game",
    tags: ["Game", "Puzzle", "Web", "1P"],
    description:
      "Play with puzzle and camera, fun to play with friends.",

  },
  {
    title: "Cyber Connect",
    href: "https://cyber-connect-cam.vercel.app/",
    image: "/images/cyber.png",
    type: "Game",
    tags: ["Game", "Web", "Puzzle", "2P"],
    description:
      "Cyber Connect is a puzzle game where players must connect nodes to create secure pathways across a futuristic network grid.",
      
  },
  {
    title: "Car Racer Cam",
    href: "https://car-racer-cam.vercel.app/",
    image: "/images/image.png",
    type: "Game",
    tags: ["Game", "Race", "Web", "2P"],
    description:
      "Race with your car using your hands or noise!",
    isMaintenance: true,
  },
  {
    title: "Mounth Battle",
    href: "https://mounth-battle.vercel.app/",
    image: "/images/mounth-battle.png",
    type: "Game",
    tags: ["Game", "Battle", "Web", "2P"],
    description:
      "Aim your mouth at the target",
    isComingSoon: false,
  },
  {
    title: "Finger Rhythm",
    href: "https://finger-rhythm.vercel.app/",
    image: "/images/comingsoon.png",
    type: "Game",
    tags: ["Game", "Rhythm", "Web", "2P"],
    description:
      "Test your finger rhythm and speed with this fun and addictive game!",
    isComingSoon: true,
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function GamesGrid() {
  const [maintenanceGame, setMaintenanceGame] = useState<string | null>(null);
  const [comingSoonGame, setComingSoonGame] = useState<Game | null>(null);

  const handleLinkClick = (e: React.MouseEvent, game: Game) => {
    e.preventDefault();

    if (game.isMaintenance) {
      setMaintenanceGame(game.title);
      return;
    }

    if (game.isComingSoon) {
      setComingSoonGame(game);
      return;
    }

    // Redirect to a dedicated checkout page in a new tab
    const checkoutUrl = `/checkout?title=${encodeURIComponent(game.title)}&url=${encodeURIComponent(game.href)}`;
    window.open(checkoutUrl, "_blank");
  };

  return (
    <section
      id="games"
      className="relative z-20 bg-neutral-950 px-4 py-24 sm:px-6 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-500 sm:text-sm">
                Click to play
              </p>
              <h2 className="text-[clamp(2.5rem,10vw,6.5rem)] font-bold leading-none tracking-tight text-white">
                GAMES
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400 md:text-right">
              Playable browser experiments built for quick interaction and fun
              mechanics.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {games.map((game, index) => (
            <Reveal key={game.title} delay={index * 0.04} className="h-full">
              <a
                href={game.href}
                onClick={(e) => handleLinkClick(e, game)}
                target={isExternalLink(game.href) ? "_blank" : undefined}
                rel={
                  isExternalLink(game.href) ? "noopener noreferrer" : undefined
                }
                className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-lg border border-white/10 bg-neutral-900 text-white transition duration-500 hover:-translate-y-1 hover:border-amber-500/70 hover:bg-neutral-800 sm:min-h-[400px]"
              >
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-neutral-950">
                  <Image
                    src={game.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="scale-110 object-cover opacity-25 blur-lg"
                    aria-hidden="true"
                  />
                  <Image
                    src={game.image}
                    alt={`${game.title} preview`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-4 opacity-95 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent" />
                  
                  {game.isMaintenance && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                      <div className="rounded-full bg-amber-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black">
                        Under Maintenance
                      </div>
                    </div>
                  )}

                  {game.isComingSoon && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                      <div className="rounded-full bg-blue-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                      {game.type}
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-amber-500 transition-colors group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black">
                        {game.isMaintenance ? "!" : game.isComingSoon ? "★" : "→"}
                    </span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold leading-tight">
                    {game.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-400">
                    {game.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {maintenanceGame && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              key="maintenance-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMaintenanceGame(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />
            <motion.div
              key="maintenance-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center shadow-2xl"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83m-5.83 5.83L3.75 21.75M9 13.5l3.75-3.75m0 0L15 6.75M12.75 9.75l3.75-3.75m0 0L18.75 3m-9.75 6.75c1.242 0 2.25-1.008 2.25-2.25S10.242 4.5 9 4.5 6.75 5.508 6.75 6.75 7.758 9 9 9z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Maintenance</h3>
              <p className="mb-8 text-neutral-400">
                Sorry, <span className="text-amber-500 font-bold">{maintenanceGame}</span> is currently under maintenance for improvements. Please check back later!
              </p>
              <button
                onClick={() => setMaintenanceGame(null)}
                className="w-full rounded-xl bg-white py-4 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-amber-500"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {comingSoonGame && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              key="coming-soon-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setComingSoonGame(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />
            <motion.div
              key="coming-soon-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-8 text-center shadow-2xl"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Coming Soon</h3>
              <p className="mb-2 text-xl font-bold text-blue-400">{comingSoonGame.title}</p>
              <p className="mb-8 text-neutral-400">
                This amazing game is in development and will be ready soon. Stay tuned for updates!
              </p>
              <button
                onClick={() => setComingSoonGame(null)}
                className="w-full rounded-xl bg-white py-4 text-sm font-bold uppercase tracking-widest text-black transition hover:bg-blue-500"
              >
                Got It
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

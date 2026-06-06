"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

const games = [
  {
    title: "Neon Hand Hockey",
    href: "https://gameneonhandhockey-byjovanka.vercel.app/",
    image: "/images/neonhockey.png",
    type: "Arcade Game",
    tags: ["Game", "Neon", "Web"],
    description:
      "Interactive neon-themed hand hockey game with fast-paced gameplay and vibrant visuals.",
  },
  {
    title: "Pic Game Puzzle",
    href: "https://pic-puzzle-cam.vercel.app/",
    image: "/images/puzzle-cam.png",
    type: "Game",
    tags: ["Game", "Puzzle", "Web"],
    description:
      "Play with puzzle and camera, fun to play with friends.",
  },
  {
    title: "Car Racer Cam",
    href: "https://racecar-game-seven.vercel.app/",
    image: "/images/comingsoon.png",
    type: "Game",
    tags: ["Game", "Race", "Web"],
    description:
      "COMING SOON!",
  },
  {
    title: "Cyber Connect",
    href: "https://cyberconnect.vercel.app/",
    image: "/images/comingsoon.png",
    type: "Game",
    tags: ["Game", "Web", "Puzzle"],
    description:
      "COMING SOON!",
  },
];

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export default function GamesGrid() {
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
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                      {game.type}
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-amber-500 transition-colors group-hover:border-amber-500 group-hover:bg-amber-500 group-hover:text-black">
                      -&gt;
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
    </section>
  );
}
